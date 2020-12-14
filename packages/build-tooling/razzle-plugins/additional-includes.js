/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");

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

  const additionalIncludes = options.include.map((includeName) => {
    try {
      const packageJson = path.join(includeName, "package.json");
      const resolvedPackageJson  = require.resolve(packageJson);
      const libraryDir = path.dirname(resolvedPackageJson);

      return libraryDir;
    } catch (err) {
      console.error(`AdditionalIncludes Error: Unable to resolve module "${includeName}"`);
      throw err;
    }
  });

  webpackOptions.babelRule.include = [
    ...webpackOptions.babelRule.include,
    ...additionalIncludes,
  ];

  return webpackOptions;
}

const additionalIncludesPlugin = {
  modifyWebpackOptions,
};

module.exports = { additionalIncludesPlugin };
