import { createKoaApp } from "@ssr-kit/runtime/server";
import Koa from "koa";
import proxy from "koa-proxies";
import Router from "koa-router";
import { config } from "./server-config";

function ApiProxyRouter() {
  const router = new Router();

  // CORS
  router.all("(.*)", async (ctx: Koa.Context, next: Koa.Next) => {
    if (ctx.req.method === "OPTIONS") {
      ctx.status = 200;
      ctx.set("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
      ctx.set(
        "Access-Control-Allow-Headers",
        ctx.get("access-control-request-headers"),
      );
      // Access-Control-Allow-Origin
      const origin = ctx.get("Origin");
      ctx.set("Vary", "Origin");

      const whitelistedOrigin = [
        config.API_BASEURL,
        config.CRATES_IO_BASEURL,
      ].find((_origin) => _origin === origin);

      ctx.set(
        "Access-Control-Allow-Origin",
        whitelistedOrigin || config.CRATES_IO_BASEURL,
      );
    } else {
      await next();
    }
  });

  // Proxy API requests
  router.use(
    proxy("/api", {
      target: "https://crates.io",
      changeOrigin: true,
      // logs: true,
    }),
  );
  return router;
}

const routers: Router[] = [
  // SSR Application
  ApiProxyRouter(),
];

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

const app = createKoaApp({ routers, assetCacheControl });

export { app };
