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
  reactSvg,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  plugins: [
    "scss",
    { func: standard },
    { func: reactSvg },
    {
      func: babelTypescript,
      options: {
        include: siblingPackages.map((package) =>
          path.join(__dirname, "..", package),
        ),
      },
    },
    { func: bundleAnalysis },
  ],
};
