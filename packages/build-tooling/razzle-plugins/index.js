const { standard } = require("./standard");
const { babelTypescript } = require("./typescript");
const { modifyEntryPoints } = require("./modify-entry");
const { bundleAnalysis } = require("./bundle-analysis");
const { reactSvg } = require("./react-svg");

module.exports = {
  standard,
  modifyEntryPoints,
  babelTypescript,
  bundleAnalysis,
  reactSvg,
};
