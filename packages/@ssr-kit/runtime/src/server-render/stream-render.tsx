import { Readable } from "stream";
import Koa from "koa";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { makeQueryCache, ReactQueryCacheProvider } from "react-query";
import { StaticRouter } from "react-router-dom/server";
import ssrPrepass from "react-ssr-prepass";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { HelmetProvider, HelmetData } from "react-helmet-async";
import { format } from "@tusbar/cache-control";
import {
  defaultErrorReporter,
  ErrorReporterProvider,
  ErrorReporter,
  StaticConfigProvider,
  defaultLogger,
  LoggerProvider,
  Logger,
  reconcileCacheControlOptions,
  HttpProvider,
  HttpContextData,
  FluentConfigStaticRef,
  LocationValuesProvider,
} from "@ssr-kit/toolbox";
import { FluentServerConfigProvider } from "../fluent/server";
import {
  SSRCacheControlMaximums,
  defaultSsrCacheControlMaximums,
} from "../cache-control";
import { streamCloseHTML, streamOpenHTML } from "./template";
import { joinStreams } from "./stream-utils";

export type StreamSsrPageConfig = {
  streamingEnabled?: boolean;
  ssrCacheControlMaximums?: SSRCacheControlMaximums;
  logger?: Logger;
  errorReporter?: ErrorReporter;
  universalConfig: any;
  render(ctx: Koa.Context): React.ReactElement;
};

const ENDS_WITH_PORT_REGEX = /:\d{4}$/;

export function streamSsrPage({
  streamingEnabled = true,
  render,
  universalConfig = {},
  logger = defaultLogger,
  errorReporter = defaultErrorReporter,
  ssrCacheControlMaximums = defaultSsrCacheControlMaximums,
}: StreamSsrPageConfig) {
  // We cant use env-var here as this is defined by razzle on build-time
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

  return async (ctx: Koa.Context) => {
    const cspNonce = ctx.state.cspNonce;
    const queryCache = makeQueryCache();
    const helmetContext: { helmet?: HelmetData } = {};
    const httpContext: HttpContextData = {
      cacheControl: [],
      statusCode: [],
    };
    const fluentStaticRef: FluentConfigStaticRef = {};

    const sheet = new ServerStyleSheet();
    const port = ENDS_WITH_PORT_REGEX.exec(ctx.origin)?.[0] || null;

    const locationValues = {
      host: ctx.host,
      hostname: ctx.hostname,
      href: ctx.href,
      origin: ctx.origin,
      port,
      protocol: ctx.protocol,
    };

    const element = (
      <React.StrictMode>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <StyleSheetManager
            sheet={sheet.instance}
            disableVendorPrefixes={process.env.NODE_ENV === "development"}
          >
            <HelmetProvider context={helmetContext}>
              <StaticConfigProvider config={universalConfig}>
                <HttpProvider context={httpContext}>
                  <ErrorReporterProvider reporter={errorReporter}>
                    <LoggerProvider logger={logger}>
                      <LocationValuesProvider {...locationValues}>
                        <StaticRouter location={ctx.url}>
                          <FluentServerConfigProvider
                            staticRef={fluentStaticRef}
                          >
                            {render(ctx)}
                          </FluentServerConfigProvider>
                        </StaticRouter>
                      </LocationValuesProvider>
                    </LoggerProvider>
                  </ErrorReporterProvider>
                </HttpProvider>
              </StaticConfigProvider>
            </HelmetProvider>
          </StyleSheetManager>
        </ReactQueryCacheProvider>
      </React.StrictMode>
    );
    await ssrPrepass(element);
    const { helmet } = helmetContext;

    ctx.set("Content-Type", "text/html; charset=utf-8");

    // Render streams
    const jsx = sheet.collectStyles(element);
    const appRenderStream = sheet.interleaveWithNodeStream(
      renderToNodeStream(jsx),
    );
    const preRenderStream = Readable.from([
      streamOpenHTML({
        assets,
        helmet,
      }),
    ]);
    const postRenderStream = Readable.from([
      streamCloseHTML({
        assets,
        ssrData: {},
        configData: universalConfig,
        cspNonce,
        localizationData: fluentStaticRef.resources,
      }),
    ]);

    appRenderStream.on("end", () => {
      // Redirect when <Redirect /> is rendered
      if (httpContext.redirectPath) {
        if (httpContext.statusCode.includes(307)) {
          ctx.status = 307;
        } else if (httpContext.statusCode.includes(302)) {
          ctx.status = 302;
        } else if (httpContext.statusCode.includes(301)) {
          ctx.status = 301;
        }

        ctx.redirect(httpContext.redirectPath.pathname);
        return;
      }

      // Handle status codes
      ctx.status = 200;
      if (httpContext.statusCode.includes(404)) {
        ctx.status = 404;
      } else if (httpContext.statusCode.includes(403)) {
        ctx.status = 403;
      } else if (httpContext.statusCode.includes(402)) {
        ctx.status = 402;
      } else if (httpContext.statusCode.includes(401)) {
        ctx.status = 401;
      } else if (httpContext.statusCode.includes(400)) {
        ctx.status = 400;
      }

      // Set cache-control based on rendered content
      const cacheControl = reconcileCacheControlOptions(httpContext);
      if (
        cacheControl.maxAge &&
        cacheControl.maxAge > ssrCacheControlMaximums.maxAge
      ) {
        cacheControl.maxAge = ssrCacheControlMaximums.maxAge;
      }
      if (
        cacheControl.sharedMaxAge &&
        cacheControl.sharedMaxAge > ssrCacheControlMaximums.sharedMaxAge
      ) {
        cacheControl.sharedMaxAge = ssrCacheControlMaximums.sharedMaxAge;
      }
      const cacheValue = format(cacheControl);
      if (cacheValue) {
        ctx.set("Cache-Control", cacheValue);
      }
    });

    const renderStream = joinStreams(
      preRenderStream,
      appRenderStream,
      postRenderStream,
    );

    renderStream.on("error", (error: Error) => {
      ctx.app.emit("error", error, ctx);
    });

    if (streamingEnabled) {
      // Streaming is enabled so just stream the response body
      ctx.response.body = renderStream;
    } else {
      // Streaming is not enabled which means the entire response stream
      // is buffered before sending any response. This is the safer option until
      // there's a better way for the react app to signal when it's safe to start the stream with the
      // initial request headers

      const chunks = [];

      for await (const chunk of renderStream) {
        chunks.push(chunk);
      }

      ctx.response.body = Buffer.concat(chunks as Buffer[]);
    }
  };
}
