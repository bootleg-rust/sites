import "core-js/stable";
import http from "http";
import http2 from "http2";
import "source-map-support/register";
import { config } from "./server-config";
import { app } from "./server";

// Use `app#callback()` method here instead of directly
// passing `app` as an argument to `createServer` (or use `app#listen()` instead)
// @see https://github.com/koajs/koa/blob/master/docs/api/index.md#appcallback
function createHandler(_app: typeof app) {
  const callbackFn = _app.callback();
  return (...args: Parameters<typeof callbackFn>) => {
    void callbackFn(...args);
  };
}

let currentHandler = createHandler(app);
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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
if (module.hot) {
  console.log("✅ Server-side HMR Enabled!");

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  module.hot.accept("./server", () => {
    console.log("🔁 HMR Reloading `./server`...");

    void import("./server")
      .then((serverModule) => {
        const { app } = serverModule;
        const newHandler = createHandler(app);
        server.removeListener("request", currentHandler);
        server.on("request", newHandler);
        currentHandler = newHandler;
      })
      .catch((error) => {
        console.error(error);
      });
  });
}
