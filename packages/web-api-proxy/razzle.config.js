const path = require("path");

const siblingPackages = [
  "lib-design-system",
  "lib-features",
  "lib-ssr-runtime",
  "lib-ssr-toolbox",
  "lib-config",
];

const {
  externalsPlugin,
  typescriptCheckerPlugin,
  siblingPackagesPlugin,
  cacheableAssetsPlugin,
  bundleAnalysisPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    { object: typescriptCheckerPlugin },
    { object: externalsPlugin },
    {
      object: siblingPackagesPlugin,
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
