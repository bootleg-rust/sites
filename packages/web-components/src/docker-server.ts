import http from "http";
import "core-js/stable";
import {
  Config,
  ConfigProvider,
  ServiceDefaults,
  SiteReferences,
  AssetCachingConfigProvider,
} from "@bootleg-rust/lib-config";
import {
  createKoaApp,
  createStaticIndexRouter,
} from "@bootleg-rust/lib-ssr-runtime/server";
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
    sMaxAge: config.ASSET_CACHING_HASHED_DEFAULT_SHARED_MAX_AGE,
  },
  notHashed: {
    maxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_MAX_AGE,
    sMaxAge: config.ASSET_CACHING_UNHASHED_DEFAULT_SHARED_MAX_AGE,
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
const server = http.createServer((...args) => void currentHandler(...args));

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
