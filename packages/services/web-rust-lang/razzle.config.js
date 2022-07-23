const {
  externalsPlugin,
  fluentPlugin,
  typescriptCheckerPlugin,
  additionalIncludesPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
  bundleAnalysisPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    "scss",
    { object: typescriptCheckerPlugin },
    { object: fluentPlugin },
    { object: externalsPlugin },
    { object: reactSvgPlugin },
    {
      object: additionalIncludesPlugin,
      options: {
        dirname: __dirname,
        include: [
          "@bootleg-rust/design-system",
          "@bootleg-rust/features",
          "@ssr-kit/runtime",
          "@ssr-kit/toolbox",
          "@bootleg-rust/base-service-config",
          "@pseudo-su/flex-elements",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
