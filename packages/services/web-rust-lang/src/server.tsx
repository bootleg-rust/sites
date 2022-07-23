import { DefaultTheme, ThemeProvider } from "@bootleg-rust/design-system";
import { createKoaApp, createKoaSsrRouter } from "@ssr-kit/runtime/server";
import Router from "koa-router";
import React from "react";
import { App } from "./app";
import { config, universalConfig } from "./server-config";

const assetCacheControl = {
  hashed: {
    maxAge: config.ASSET_CACHING_HASHED_DEFAULT_MAX_AGE,
    sharedMaxAge: config.ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE,
  },
  notHashed: {
    maxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE,
    sharedMaxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE,
  },
};

const ssrCacheControlMaximums = {
  maxAge: config.SSR_CACHING_MAXIMUM_MAX_AGE,
  sharedMaxAge: config.SSR_CACHING_MAXIMUM_SHARED_MAX_AGE,
};

function Render() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <App />
    </ThemeProvider>
  );
};

const routers: Router[] = [
  // SSR Application
  createKoaSsrRouter({
    universalConfig,
    ssrCacheControlMaximums,
    Render,
  }),
];

const app = createKoaApp({ routers, assetCacheControl });

export { app };
