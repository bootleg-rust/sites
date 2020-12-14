/* eslint-disable @typescript-eslint/no-unused-vars */

const defaultOptions = {
  include: [],
};

function modifyWebpackOptions({
  env: { target, dev },
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };

  webpackOptions.babelRule.include = [
    ...webpackOptions.babelRule.include,
    ...options.include,
  ];

  return webpackOptions;
}

const siblingPackagesPlugin = {
  modifyWebpackOptions,
};

module.exports = { siblingPackagesPlugin };
