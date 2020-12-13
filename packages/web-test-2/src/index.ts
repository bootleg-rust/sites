import express from "express";
let { app } = require("./server");

if (module.hot) {
  module.hot.accept("./server", () => {
    console.log("🔁  HMR Reloading `./server`...");
    try {
      app = require("./server").default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info("✅  Server-side HMR Enabled!");
}

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`> App started http://localhost:${port}`);
  });
