const path = require("path");
const {
  externalsPlugin,
  typescriptCheckerPlugin,
  modifyEntryPointsPlugin,
  cacheableAssetsPlugin,
  bundleAnalysisPlugin,
  additionalIncludesPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    {
      object: modifyEntryPointsPlugin,
      options: {
        server: path.join(__dirname, "./src/docker-server"),
        client: path.join(__dirname, "./src/docker-client"),
      },
    },
    { object: typescriptCheckerPlugin },
    { object: externalsPlugin },
    {
      object: additionalIncludesPlugin,
      options: {
        include: [
          "@bootleg-rust/lib-design-system",
          "@bootleg-rust/lib-features",
          "@bootleg-rust/lib-ssr-runtime",
          "@bootleg-rust/lib-ssr-toolbox",
          "@bootleg-rust/lib-config",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
