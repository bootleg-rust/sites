import Koa from "koa";
import compress from "koa-compress";
import helmet from "koa-helmet";
import koaLogger from "koa-logger";
import Router from "koa-router";
import serve from "koa-static";
import {
  streamSsrPage,
  streamSsrPageLightyear,
  serveIndexTemplate,
  ServeIndexTemplateConfig,
  StreamSsrPageConfig,
  AssetCacheControlConfig,
  defaultAssetCacheControl,
} from "./src/server";

export * from "./src/server";

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
    } catch (err) {
      ctx.app.emit("error", err, ctx);
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

  // `koa-helmet` provides security headers to help prevent common, well known attacks
  // @see https://helmetjs.github.io/
  app.use(koaLogger());
  app.use(helmet());
  app.use(compress());

  const cacheableFiles = razzleCacheableFiles();

  // Serve static files located under `process.env.RAZZLE_PUBLIC_DIR`
  const assetCaching = assetCacheControl || defaultAssetCacheControl;
  app.use(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    serve(process.env.RAZZLE_PUBLIC_DIR!, {
      setHeaders(res, path) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const filename = path.replace(process.env.RAZZLE_PUBLIC_DIR!, "");
        const hasHashInFilename = cacheableFiles.includes(filename);
        if (hasHashInFilename) {
          const c = assetCaching.hashed;
          res.setHeader(
            "Cache-Control",
            `max-age=${c.maxAge},s-maxage=${c.sMaxAge},immutable`,
          );
          return;
        }
        const c = assetCaching.notHashed;
        res.setHeader(
          "Cache-Control",
          `max-age=${c.maxAge},s-maxage=${c.sMaxAge}`,
        );
      },
    }),
  );

  app.use(async (ctx: Koa.Context, next: Koa.Next) => {
    ctx.set("Cache-Control", "no-cache,max-age=0");
    await next();
  });

  for (const router of routers) {
    app.use(router.routes()).use(router.allowedMethods());
  }

  return app;
}

function razzleCacheableFiles() {
  // TODO: this doesn't work for all assets (png/txt etc)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const chunks = require(process.env.RAZZLE_CHUNKS_MANIFEST!);
  const filesByType = Object.entries(chunks).reduce(
    (chunkAcc: any, [, chunk]) => {
      const types = Object.entries(chunk as any).reduce(
        (typeAcc, [fileType, files]) => {
          return {
            [fileType]: chunkAcc[fileType]
              ? [...chunkAcc[fileType], ...(files as string[])]
              : files,
          };
        },
        {},
      );
      return types;
    },
    {},
  );
  const files = Object.entries(filesByType).reduce(
    (acc: any[], [, files]) => [...acc, ...(files as string[])],
    [],
  );
  return files;
}

export function createStaticIndexRouter(cfg: ServeIndexTemplateConfig) {
  const router = new Router();
  router.get("/*", serveIndexTemplate(cfg));
  return router;
}

export function createKoaSsrRouter(cfg: StreamSsrPageConfig) {
  const router = new Router();
  router.get("/*", streamSsrPage(cfg));
  return router;
}

export function createKoaSsrRouterLightyear(cfg: StreamSsrPageConfig) {
  const router = new Router();
  router.get("/*", streamSsrPageLightyear(cfg));
  return router;
}
