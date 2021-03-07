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
          "@ssr-kit/runtime",
          "@bootleg-rust/base-service-config",
          "@ssr-kit/toolbox",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
