const { externalsPlugin } = require("./externals");
const { siblingPackagesPlugin } = require("./sibling-packages");
const { modifyEntryPointsPlugin } = require("./modify-entry");
const { bundleAnalysisPlugin } = require("./bundle-analysis");
const { reactSvgPlugin } = require("./react-svg");
const { cacheableAssetsPlugin } = require("./cacheable-assets");

module.exports = {
  externalsPlugin,
  modifyEntryPointsPlugin,
  siblingPackagesPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
};
