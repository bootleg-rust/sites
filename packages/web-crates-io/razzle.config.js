const {
  externalsPlugin,
  typescriptCheckerPlugin,
  reactSvgPlugin,
  cacheableAssetsPlugin,
  bundleAnalysisPlugin,
  additionalIncludesPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    "scss",
    { object: typescriptCheckerPlugin },
    { object: externalsPlugin },
    { object: reactSvgPlugin },
    {
      object: additionalIncludesPlugin,
      options: {
        include: [
          "@bootleg-rust/lib-design-system",
          "@bootleg-rust/lib-features",
          "@bootleg-rust/lib-ssr-runtime",
          "@bootleg-rust/lib-ssr-toolbox",
          "@bootleg-rust/lib-config",
          "@pseudo-su/flex-elements",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
