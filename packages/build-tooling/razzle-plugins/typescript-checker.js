/* eslint-disable @typescript-eslint/no-unused-vars */
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  webpackConfig.plugins.push(new ForkTSCheckerWebpackPlugin());

  // TODO: should tree shaking be in a seperate plugin?
  // Client: tree shaking on production
  if (target === "web" && !dev) {
    webpackConfig.plugins = [
      new CleanWebpackPlugin(),
      ...webpackConfig.plugins,
    ];
  }

  return webpackConfig;
}

const typescriptCheckerPlugin = {
  modifyWebpackConfig,
};

module.exports = { typescriptCheckerPlugin };
