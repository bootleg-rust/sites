const { standardPlugin } = require("./standard");
const { babelTypescriptPlugin } = require("./typescript");
const { modifyEntryPointsPlugin } = require("./modify-entry");
const { bundleAnalysisPlugin } = require("./bundle-analysis");
const { reactSvgPlugin } = require("./react-svg");
const { cacheableAssetsPlugin } = require("./cacheable-assets");

module.exports = {
  standardPlugin,
  modifyEntryPointsPlugin,
  babelTypescriptPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
};
