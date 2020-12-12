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

  return webpackConfig;
}

const siblingPackagesPlugin = {
  modifyWebpackConfig,
};

module.exports = { siblingPackagesPlugin };
