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
  siblingPackagesPlugin,
  modifyEntryPointsPlugin,
  bundleAnalysisPlugin,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  plugins: [
    {
      object: modifyEntryPointsPlugin,
      options: {
        server: path.join(__dirname, "./src/docker-server"),
        client: path.join(__dirname, "./src/docker-client"),
      },
    },
    { object: standardPlugin },
    {
      object: siblingPackagesPlugin,
      options: {
        include: siblingPackages.map((packageName) =>
          path.join(__dirname, "..", packageName),
        ),
      },
    },
    { object: bundleAnalysisPlugin },
  ],
};
