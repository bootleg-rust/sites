const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function standard(baseConfig, env, webpack, userOptions = {}) {
  const { target, dev } = env;
  const webpackConfig = { ...baseConfig };

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

module.exports = {
  standard,
};
