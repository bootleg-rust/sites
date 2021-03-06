import http from "http";
import http2 from "http2";
import "core-js/stable";
import {
  Config,
  ConfigProvider,
  ServiceDefaults,
  SiteReferences,
  AssetCachingConfigProvider,
} from "@bootleg-rust/base-service-config";
import { createKoaApp, createStaticIndexRouter } from "@ssr-kit/runtime/server";
import Router from "koa-router";
import "source-map-support/register";
import packageJSON from "../package.json";

export const Service = new ConfigProvider({
  schema: {},
  derivedValues: () => {
    return {};
  },
  universalWhitelist: [],
});

export type UniversalConfig = {
  NODE_ENV: string;
  ENV: string;
  SERVICE_NAME: string;
  PACKAGE_VERSION: string;
  SERVICE_INSTANCE_NAME: string;
  CRATES_IO_BASEURL: string;
  API_BASEURL: string;
};

export type ServerConfig = UniversalConfig & {
  ASSET_CACHING_HASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE: number;
  ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE: number;
  PORT: number;
  USE_HTTP2: boolean;
};

const { config, universalConfig } = Config({
  providers: [
    ServiceDefaults,
    Service,
    SiteReferences,
    AssetCachingConfigProvider,
  ],
  packageJSON,
}) as {
  config: ServerConfig;
  universalConfig: UniversalConfig;
};

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

const routers: Router[] = [
  createStaticIndexRouter({ universalConfig, template: "index-template.html" }),
];

const app = createKoaApp({
  routers,
  assetCacheControl,
});

const currentHandler = app.callback();
// Cloud run supports http2 (unauthenticated) but browsers require
// SSL when talking http2 so only when running behind/inside cloud run
const server = config.USE_HTTP2
  ? http2.createServer(currentHandler)
  : http.createServer(currentHandler);

const port = config.PORT;

/* eslint-disable no-console */

server.listen(port, () => {
  console.log(
    "App is running at http://localhost:%d in %s mode for the %s environment",
    port,
    config.NODE_ENV,
    config.ENV,
  );

  console.log("Press CTRL-C to stop\n");
});
