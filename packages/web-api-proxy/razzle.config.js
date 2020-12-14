const {
  externalsPlugin,
  typescriptCheckerPlugin,
  cacheableAssetsPlugin,
  bundleAnalysisPlugin,
  additionalIncludesPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    { object: typescriptCheckerPlugin },
    { object: externalsPlugin },
    {
      object: additionalIncludesPlugin,
      options: {
        include: [
          "@bootleg-rust/lib-ssr-runtime",
          "@bootleg-rust/lib-config",
          "@bootleg-rust/lib-ssr-toolbox",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
