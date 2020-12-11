const path = require("path");

const siblingPackages = [
  "lib-design-system",
  "lib-features",
  "lib-ssr-runtime",
  "lib-ssr-toolbox",
  "lib-config",
];

const {
  standard,
  babelTypescript,
  bundleAnalysis,
  staticAssetsJsonPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  plugins: [
    { func: standard },
    {
      func: babelTypescript,
      options: {
        include: siblingPackages.map((packageName) =>
          path.join(__dirname, "..", packageName),
        ),
      },
    },
    { object: staticAssetsJsonPlugin },
    { func: bundleAnalysis },
  ],
};
