/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");
const makeLoaderFinder = require("razzle-dev-utils/makeLoaderFinder");
const { nodePaths } = require("razzle/config/paths");
const babelLoaderFinder = makeLoaderFinder("babel-loader");
const cssLoaderFinder = makeLoaderFinder("css-loader");
// const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const defaultOptions = {
  include: [],
};

function modifyPaths({
  webpackObject,
  options: { pluginOptions, razzleOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };

  // const appendNodePathStr = options.include.join(path.delimiter);
  // console.log(paths.nodePaths);
  // paths.nodePaths = [paths.nodePaths, appendNodePathStr]
  //   .filter(Boolean)
  //   .join(path.delimiter);
  // console.log(paths.nodePaths);

  return paths;
}

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions, razzleOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };

  // TODO: can any of this help fix the problem with no styles during dev?
  // console.log({
  //   target,
  //   dev,
  //   webpackConfig,
  //   webpackObject,
  //   pluginOptions,
  //   razzleOptions,
  //   paths,
  // });

  // console.log(webpackConfig.module.rules[3]);
  // console.log(webpackConfig.module.rules[4]);

  // const styleRules = [
  //   webpackConfig.module.rules[3],
  //   webpackConfig.module.rules[4],
  // ];
  // const styleLoaders = styleRules.map((rule) => cssLoaderFinder(rule));
  // console.log(styleLoaders);
  // styleLoaders.forEach(loader => {
  //   console.log(loader);
  //   // loader.include = [...(loader.include || []), options.include];
  // });

  // console.log(cssLoader.use);

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
  modifyPaths,
  modifyWebpackConfig,
};

module.exports = { siblingPackagesPlugin };
