const { standard } = require("./standard");
const { babelTypescript } = require("./typescript");
const { modifyEntryPoints } = require("./modify-entry");
const { bundleAnalysis } = require("./bundle-analysis");
const { reactSvg } = require("./react-svg");
const { staticAssetsJsonPlugin } = require("./static-assets-json");

module.exports = {
  standard,
  modifyEntryPoints,
  babelTypescript,
  bundleAnalysis,
  reactSvg,
  staticAssetsJsonPlugin,
};
