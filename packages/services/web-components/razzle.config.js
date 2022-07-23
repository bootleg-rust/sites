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
        dirname: __dirname,
        include: [
          "@pseudo-su/flex-elements",
          "@bootleg-rust/design-system",
          "@bootleg-rust/features",
          "@ssr-kit/runtime",
          "@ssr-kit/toolbox",
          "@bootleg-rust/base-service-config",
        ],
      },
    },
    { object: cacheableAssetsPlugin },
    { object: bundleAnalysisPlugin },
  ],
};
