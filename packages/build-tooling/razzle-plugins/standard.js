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

  if (target === "node") {
    // https://github.com/firebase/firebase-js-sdk/issues/2222
    // As far as I can tell, firebase/analytics has no version that supports running
    // on the server so excluding it from the build seems to resolve issues.
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      ["firebase/analytics"]: require.resolve("null-loader"),
    };
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
