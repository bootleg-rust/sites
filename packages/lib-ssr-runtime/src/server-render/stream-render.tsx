import { Readable } from "stream";
import Koa from "koa";
import CombinedStream from "combined-stream";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import { makeQueryCache, ReactQueryCacheProvider } from "react-query";
import { StaticRouter } from "react-router";
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
  CacheControlOptions,
  HttpProvider,
} from "@bootleg-rust/lib-ssr-toolbox";
import { streamCloseHTML, streamOpenHTML } from "./template";

export type StreamSsrPageConfig = {
  logger?: Logger;
  errorReporter?: ErrorReporter;
  universalConfig: any;
  render(ctx: Koa.Context): React.ReactElement;
};

export function streamSsrPage({
  render,
  universalConfig = {},
  logger = defaultLogger,
  errorReporter = defaultErrorReporter,
}: StreamSsrPageConfig) {
  // We cant use env-var here as this is defined by razzle on build-time
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const assets = require(process.env.RAZZLE_ASSETS_MANIFEST!);

  return async (ctx: Koa.Context) => {
    const routerContext = { status: 200 } as { status: number; url?: string };
    const queryCache = makeQueryCache();
    const helmetContext: { helmet?: HelmetData } = {};
    const httpContext: { cacheControl: CacheControlOptions[] } = {
      cacheControl: [],
    };

    const sheet = new ServerStyleSheet();
    const element = (
      <React.StrictMode>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <StyleSheetManager sheet={sheet.instance}>
            <HelmetProvider context={helmetContext}>
              <StaticConfigProvider config={universalConfig}>
                <HttpProvider context={httpContext}>
                  <ErrorReporterProvider reporter={errorReporter}>
                    <LoggerProvider logger={logger}>
                      <StaticRouter
                        location={ctx.request.url}
                        // don't rely on react-router staticContext
                        context={routerContext as any}
                      >
                        {render(ctx)}
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
    await ssrPrepass(element);
    const { helmet } = helmetContext;

    ctx.set("Content-Type", "text/html; charset=utf-8");

    const output = CombinedStream.create();

    ctx.response.body = output;

    output.on("error", (error: Error) => {
      ctx.app.emit("error", error, ctx);
    });

    // Render streams
    const jsx = sheet.collectStyles(element);
    const renderStream = sheet.interleaveWithNodeStream(
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
      }),
    ]);

    renderStream.on("end", () => {
      // Redirect when <Redirect /> is rendered
      if (routerContext.url) {
        // Somewhere a `<Redirect>` was rendered
        ctx.redirect(routerContext.url);
        return;
      }

      // Handle status codes
      ctx.status = 200;
      if ([400, 401, 402, 403, 404].includes(routerContext.status)) {
        ctx.status = routerContext.status;
      }

      const cacheControl = reconcileCacheControlOptions(httpContext);
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
