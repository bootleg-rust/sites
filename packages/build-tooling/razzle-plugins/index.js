const { externalsPlugin } = require("./externals");
const { modifyEntryPointsPlugin } = require("./modify-entry");
const { bundleAnalysisPlugin } = require("./bundle-analysis");
const { reactSvgPlugin } = require("./react-svg");
const { typescriptCheckerPlugin } = require("./typescript-checker");
const { cacheableAssetsPlugin } = require("./cacheable-assets");
const { additionalIncludesPlugin } = require("./additional-includes");

module.exports = {
  externalsPlugin,
  modifyEntryPointsPlugin,
  additionalIncludesPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  typescriptCheckerPlugin,
  cacheableAssetsPlugin,
};
