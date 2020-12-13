// const path = require("path");

// const siblingPackages = [
//   "lib-design-system",
//   "lib-features",
//   "lib-ssr-runtime",
//   "lib-ssr-toolbox",
//   "lib-config",
// ];

// const {
//   externalsPlugin,
//   siblingPackagesPlugin,
//   bundleAnalysisPlugin,
//   reactSvgPlugin,
//   cacheableAssetsPlugin,
// } = require("@bootleg-rust/build-tooling/razzle-plugins");

module.exports = {
  options: {
    useReactRefresh: true,
  },
  plugins: [
    "scss",
    // { object: externalsPlugin },
    // { object: reactSvgPlugin },
    // {
    //   object: siblingPackagesPlugin,
    //   options: {
    //     include: siblingPackages.map((packageName) =>
    //       path.join(__dirname, "..", packageName),
    //     ),
    //   },
    // },
    // { object: cacheableAssetsPlugin },
    // { object: bundleAnalysisPlugin },
  ],
};
