/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultOptions = {
  server: null,
  client: null,
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };
  const { client, server } = options;
  /* This is required to rename the entry points instead of using the defaults */
  if (target === "node" && server) {
    webpackConfig.entry.server = server;
  }
  if (target !== "node" && client) {
    webpackConfig.entry.client = client;
  }

  return webpackConfig;
}

const modifyEntryPointsPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  modifyEntryPointsPlugin,
};
