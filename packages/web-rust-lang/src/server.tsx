import { DefaultTheme, ThemeProvider } from "@bootleg-rust/lib-design-system";
import {
  createKoaApp,
  createKoaSsrRouter,
} from "@bootleg-rust/lib-ssr-runtime/server";
import Router from "koa-router";
import React from "react";
import { App } from "./app";
import { config, universalConfig } from "./config";

const assetCacheControl = {
  hashed: {
    maxAge: config.ASSET_CACHING_HASHED_DEFAULT_MAX_AGE,
    sMaxAge: config.ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE,
  },
  notHashed: {
    maxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE,
    sMaxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE,
  },
};

const routers: Router[] = [
  // SSR Application
  createKoaSsrRouter({
    universalConfig,
    render: function Render() {
      return (
        <ThemeProvider theme={DefaultTheme}>
          <App />
        </ThemeProvider>
      );
    },
  }),
];

const app = createKoaApp({ routers, assetCacheControl });

export { app };
