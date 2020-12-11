const { standardPlugin } = require("./standard");
const { babelTypescriptPlugin } = require("./typescript");
const { modifyEntryPointsPlugin } = require("./modify-entry");
const { bundleAnalysisPlugin } = require("./bundle-analysis");
const { reactSvgPlugin } = require("./react-svg");
const { staticAssetsJsonPlugin } = require("./static-assets-json");

module.exports = {
  standardPlugin,
  modifyEntryPointsPlugin,
  babelTypescriptPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  staticAssetsJsonPlugin,
};
