/* eslint-disable @typescript-eslint/no-unused-vars */
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  webpackConfig.plugins.push(new ForkTSCheckerWebpackPlugin());

  return webpackConfig;
}

const typescriptCheckerPlugin = {
  modifyWebpackConfig,
};

module.exports = { typescriptCheckerPlugin };
