/* eslint-disable @typescript-eslint/no-unused-vars */
const makeLoaderFinder = require("razzle-dev-utils/makeLoaderFinder");
const babelLoaderFinder = makeLoaderFinder("babel-loader");
// const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const defaultOptions = {
  include: [],
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };

  // Safely locate Babel loader in Razzle's webpack internals
  const babelLoader = webpackConfig.module.rules.find((rule) =>
    babelLoaderFinder(rule),
  );
  if (!babelLoader) {
    throw new Error(
      `'babel-loader' was erased from config, we need it to define typescript options`,
    );
  }
  babelLoader.include = [...babelLoader.include, ...options.include];

  // webpackConfig.resolve.extensions = [
  //   ...webpackConfig.resolve.extensions,
  //   ".ts",
  //   ".tsx",
  // ];

  // webpackConfig.plugins.push(new ForkTSCheckerWebpackPlugin());

  // babelLoader.test = [babelLoader.test, /\.tsx?$/];
  // babelLoader.include = [...babelLoader.include, ...options.include];
  // babelLoader.use[0].options = {
  //   babelrc: false,
  //   cacheDirectory: true,
  // };

  // // Client: ts optimization on development
  // if (target === "web" && dev) {
  //   // As suggested by Microsoft's Outlook team, these optimizations crank up Webpack x TypeScript perf.
  //   // https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15
  //   webpackConfig.output.pathinfo = false;
  //   webpackConfig.optimization = {
  //     removeAvailableModules: false,
  //     removeEmptyChunks: false,
  //     splitChunks: false,
  //   };
  // }

  return webpackConfig;
}

const babelTypescriptPlugin = {
  modifyWebpackConfig,
};

module.exports = { babelTypescriptPlugin };
