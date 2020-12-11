/* eslint-disable @typescript-eslint/no-unused-vars */
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  // use source maps
  webpackConfig.devtool = dev ? "cheap-module-source-map" : "sourcemap";

  if (!webpackConfig.externals) {
    webpackConfig.externals = [];
  }

  // Remove all externals so that we have a single build/
  // with all necessary libraries embedded/compiled (node_modules not required after build)
  if (target === "node" && !dev) {
    webpackConfig.externals = [];
  }

  // Client: tree shaking on production
  if (target === "web" && !dev) {
    webpackConfig.plugins = [
      new CleanWebpackPlugin(),
      ...webpackConfig.plugins,
    ];
  }

  return webpackConfig;
}

const standardPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  standardPlugin,
};
