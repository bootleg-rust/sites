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
  modifyEntryPoints,
  bundleAnalysis,
} = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  plugins: [
    {
      func: modifyEntryPoints,
      options: {
        server: path.join(__dirname, "./src/docker-server"),
        client: path.join(__dirname, "./src/docker-client"),
      },
    },
    { func: standard },
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
