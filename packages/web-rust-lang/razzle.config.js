const path = require("path");

const siblingPackages = [
  "lib-design-system",
  "lib-features",
  "lib-ssr-runtime",
  "lib-ssr-toolbox",
  "lib-config",
];

const {
  standardPlugin,
  babelTypescriptPlugin,
  bundleAnalysisPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  plugins: [
    "scss",
    { object: standardPlugin },
    { object: reactSvgPlugin },
    {
      object: babelTypescriptPlugin,
      options: {
        include: siblingPackages.map((packageName) =>
          path.join(__dirname, "..", packageName),
        ),
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
