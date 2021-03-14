import fs from "fs";
import crypto from "crypto";
import Koa from "koa";
import conditional from "koa-conditional-get";
import etag from "koa-etag";
import compress from "koa-compress";
import helmet from "koa-helmet";
import koaLogger from "koa-logger";
import Router from "koa-router";
import serve from "koa-static";
import {
  streamSsrPage,
  serveIndexTemplate,
  ServeIndexTemplateConfig,
  StreamSsrPageConfig,
  AssetCacheControlConfig,
  defaultAssetCacheControl,
} from "./src/server";

export * from "./src/server";

function requireJson(path: string) {
  if (!path) throw new Error(`Unable to load file ${path}`);
  const fileBuffer = fs.readFileSync(path);
  const jsonData = JSON.parse(fileBuffer.toString()) as any;
  return jsonData;
}

export function createKoaApp({
  routers,
  assetCacheControl,
}: {
  routers: Router[];
  assetCacheControl?: AssetCacheControlConfig | null;
}) {
  // Initialize and configure Koa application
  const app = new Koa();

  // Error handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.app.emit("error", error, ctx);
    }
  });

  app.on("error", (err, ctx) => {
    // eslint-disable-next-line no-console
    ctx.status = err?.httpStatus || 500;
    ctx.body = "Internal Server Error";
    if (process.env.NODE_ENV !== "production") {
      ctx.set("Content-type", "text/plain");
      ctx.body = err?.toString() || "Internal Server Error";
    }
  });

  app.use(koaLogger());

  // `koa-helmet` provides security headers to help prevent common, well known attacks
  // @see https://helmetjs.github.io/
  app.use(async (ctx, next) => {
    ctx.state.cspNonce = crypto.randomBytes(16).toString("hex");

    // TODO: enable CSP
    // const defaultAllowDev = process.env.NODE_ENV !== "production" ? ["localhost:*"] : [];
    // const defaultAllow = ["'self'", ...defaultAllowDev];
    return helmet({
      contentSecurityPolicy: false,
      // contentSecurityPolicy: {
      //   directives: {
      //     defaultSrc: [...defaultAllow],
      //     styleSrc: [...defaultAllow],
      //     scriptSrc: [...defaultAllow, `'nonce-${ctx.state.cspNonce}'`],
      //   },
      // }
    })(ctx, next);
  });

  // etag works together with conditional-get
  app.use(conditional());
  app.use(etag());
  app.use(compress({ threshold: 2048 }));

  const razzlePublicDir = process.env.RAZZLE_PUBLIC_DIR;
  // prettier-ignore
  const razzlePluginCacheableAssets = process.env.RAZZLE_PLUGIN_CACHEABLE_ASSETS;

  if (!razzlePublicDir) {
    throw new Error(
      "process.env.RAZZLE_PUBLIC_DIR not valid: " + razzlePublicDir,
    );
  }

  if (!razzlePluginCacheableAssets) {
    throw new Error(
      "process.env.RAZZLE_PLUGIN_CACHEABLE_ASSETS not valid: " +
        razzlePluginCacheableAssets,
    );
  }

  const cacheableAssets = requireJson(razzlePluginCacheableAssets);

  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  const assetCaching = assetCacheControl || defaultAssetCacheControl;
  app.use(
    serve(razzlePublicDir, {
      setHeaders(res, path) {
        const filename = path
          .slice(path.indexOf(razzlePublicDir))
          .replace(razzlePublicDir, "");

        if (cacheableAssets.immutable.includes(filename)) {
          // console.log("CACHE immutable", filename);
          const c = assetCaching.hashed;
          res.setHeader(
            "Cache-Control",
            `max-age=${c.maxAge},s-maxage=${c.sharedMaxAge},public,immutable`,
          );
          return;
        }

        if (cacheableAssets.mutable.includes(filename)) {
          // console.log("CACHE mutable", filename);
          const c = assetCaching.notHashed;
          res.setHeader(
            "Cache-Control",
            `max-age=${c.maxAge},s-maxage=${c.sharedMaxAge},public`,
          );
          return;
        }
        // console.log("CACHE defaults", filename);
        // TODO: add more options to assetCaching'
        // - assetCaching.immutableAssets
        // - assetCaching.mutableAssets
        // - assetCaching.fallback
        const c = assetCaching.notHashed;
        res.setHeader(
          "Cache-Control",
          `max-age=${c.maxAge},s-maxage=${c.sharedMaxAge},public`,
        );
      },
    }),
  );

  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    // Default Cache-Control settings if none are specified
    ctx.set("Cache-Control", "no-cache,max-age=0");
    await next();
  });

  for (const router of routers) {
    app.use(router.routes()).use(router.allowedMethods());
  }

  return app;
}

export function createStaticIndexRouter(cfg: ServeIndexTemplateConfig) {
  const router = new Router();
  router.get("/(.*)", serveIndexTemplate(cfg));
  return router;
}

export function createKoaSsrRouter(cfg: StreamSsrPageConfig) {
  const router = new Router();
  router.get("/(.*)", streamSsrPage(cfg));
  return router;
}
