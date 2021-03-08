import { Readable } from "stream";
import Koa from "koa";
import CombinedStream from "combined-stream";
import React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { renderToNodeStreamAsync } from "react-lightyear/server";
import { makeQueryCache, ReactQueryCacheProvider } from "react-query";
import { StaticRouter } from "react-router-dom/server";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { HelmetProvider, HelmetData } from "react-helmet-async";
import {
  defaultErrorReporter,
  ErrorReporterProvider,
  StaticConfigProvider,
  defaultLogger,
  LoggerProvider,
  reconcileCacheControlOptions,
  HttpProvider,
  HttpContextData,
  I18nProvider,
} from "@ssr-kit/toolbox";
import { format } from "@tusbar/cache-control";
import { defaultSsrCacheControlMaximums } from "../cache-control";
import { streamCloseHTML, streamOpenHTML } from "./template";

import { StreamSsrPageConfig } from "./stream-render";

// TODO: Pass this in as config
const defaultLanguage = "en-US";
const supportedLanguages = [
  "en-US",
  "es",
  "fr",
  "it",
  "ja",
  "pt-BR",
  "ru",
  "tr",
  "zh-CN",
  "zh-TW",
];

export function streamSsrPageLightyear({
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
      statusCode: 200,
    };

    const sheet = new ServerStyleSheet();
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
                      <StaticRouter location={ctx.request.url}>
                        <I18nProvider
                          supportedLanguages={supportedLanguages}
                          defaultLanguage={defaultLanguage}
                        >
                          {render(ctx)}
                        </I18nProvider>
                      </StaticRouter>
                    </LoggerProvider>
                  </ErrorReporterProvider>
                </HttpProvider>
              </StaticConfigProvider>
            </HelmetProvider>
          </StyleSheetManager>
        </ReactQueryCacheProvider>
      </React.StrictMode>
    );
    const { helmet } = helmetContext;

    // typically you'd want to write some preliminary HTML, since React doesn't handle this

    ctx.set("Content-Type", "text/html; charset=utf-8");

    const output = CombinedStream.create();

    ctx.response.body = output;

    output.on("error", (error: Error) => {
      ctx.app.emit("error", error, ctx);
    });

    // Render streams
    const jsx = sheet.collectStyles(element);
    const renderStream = sheet.interleaveWithNodeStream(
      renderToNodeStreamAsync(jsx),
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
      }),
    ]);

    renderStream.on("end", () => {
      // Redirect when <Redirect /> is rendered
      if (httpContext.redirectPath) {
        // Somewhere a `<Redirect>` was rendered
        if ([301, 302].includes(httpContext.statusCode)) {
          ctx.status = httpContext.statusCode;
        }
        ctx.redirect(httpContext.redirectPath.pathname);
        return;
      }

      // Handle status codes
      ctx.status = 200;
      if ([400, 401, 402, 403, 404].includes(httpContext.statusCode)) {
        ctx.status = httpContext.statusCode;
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

    output.append(preRenderStream);
    output.append(renderStream);
    output.append(postRenderStream);
  };
}
