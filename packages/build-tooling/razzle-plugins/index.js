const { standardPlugin } = require("./standard");
const { siblingPackagesPlugin } = require("./sibling-packages");
const { modifyEntryPointsPlugin } = require("./modify-entry");
const { bundleAnalysisPlugin } = require("./bundle-analysis");
const { reactSvgPlugin } = require("./react-svg");
const { cacheableAssetsPlugin } = require("./cacheable-assets");

module.exports = {
  standardPlugin,
  modifyEntryPointsPlugin,
  siblingPackagesPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
};
