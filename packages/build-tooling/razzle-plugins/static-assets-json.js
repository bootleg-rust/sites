/* eslint-disable unicorn/no-reduce  */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");
// const paths = require('./paths');
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

// const defaultOptions = {};

function modifyWebpackConfig({
  env: {
    target, // the target 'node' or 'web'
    dev, // is this a development build? true or false
  },
  webpackConfig, // the created webpack config
  webpackObject, // the imported webpack node module
  options: {
    razzleOptions, // the modified options passed to Razzle in the `options` key in `razzle.config.js` (options: { key: 'value'})
    webpackOptions, // the modified options that will be used to configure webpack/ webpack loaders and plugins
  },
  paths, // the modified paths that will be used by Razzle.
}) {
  const assetPlugin = new WebpackManifestPlugin({
    fileName: path.join(paths.appBuild, "static-assets.json"),
    writeToFileEmit: true,
    generate: (seed, files) => {
      const entrypoints = new Set();
      const noChunkFiles = new Set();
      const longTermCacheFiles = new Set();
      // console.log(files[0]);
      files.forEach((file) => {
        if (file.isChunk) {
          const groups = (file.chunk || {})._groups || [];
          groups.forEach((group) => entrypoints.add(group));
        } else {
          noChunkFiles.add(file);
        }
        if (
          !webpackOptions.fileLoaderExclude.every((re) => re.test(file.path))
        ) {
          const name =
            typeof webpackOptions.fileLoaderOutputName == "function"
              ? webpackOptions.fileLoaderOutputName(file)
              : webpackOptions.fileLoaderOutputName;
          // console.log(name);
          const fileHasHash = /\[(build|content)?hash/.test(name);
          if (fileHasHash) longTermCacheFiles.add(file);
        } else if (
          webpackOptions.urlLoaderTest.some((re) => re.test(file.path))
        ) {
          const urlHasHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.urlLoaderOutputName == "function"
              ? webpackOptions.urlLoaderOutputName(file)
              : webpackOptions.urlLoaderOutputName,
          );
          if (urlHasHash) longTermCacheFiles.add(file);
        } else if (webpackOptions.cssTest.some((re) => re.test(file.path))) {
          const cssHasHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.cssOutputFilename == "function"
              ? webpackOptions.cssOutputFilename(file)
              : webpackOptions.cssOutputFilename,
          );
          if (cssHasHash) longTermCacheFiles.add(file);
        } else if (webpackOptions.jsTest.some((re) => re.test(file.path))) {
          const jsHasHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.jsOutputFilename == "function"
              ? webpackOptions.jsOutputFilename(file)
              : webpackOptions.jsOutputFilename,
          );
          if (jsHasHash) longTermCacheFiles.add(file);
        }
      });

      const entries = [...entrypoints];
      const entryArrayManifest = entries.reduce((acc, entry) => {
        const name =
          (entry.options || {}).name ||
          (entry.runtimeChunk || {}).name ||
          entry.id;
        const allFiles = []
          .concat(
            ...(entry.chunks || []).map((chunk) =>
              chunk.files.map((path) => webpackConfig.output.publicPath + path),
            ),
          )
          .filter(Boolean);

        const filesByType = allFiles.reduce((types, file) => {
          const fileType = file.slice(file.lastIndexOf(".") + 1);
          types[fileType] = types[fileType] || [];
          types[fileType].push(file);
          return types;
        }, {});

        const chunkIds = [].concat(
          ...(entry.chunks || []).map((chunk) => chunk.ids),
        );

        return name
          ? {
              ...acc,
              [name]: { ...filesByType, chunks: chunkIds },
            }
          : acc;
      }, seed);
      entryArrayManifest["noentry"] = [...noChunkFiles]
        .map((file) => file.path)
        .reduce((types, file) => {
          const fileType = file.slice(file.lastIndexOf(".") + 1);
          types[fileType] = types[fileType] || [];
          types[fileType].push(file);
          return types;
        }, {});
      entryArrayManifest["cacheable"] = [...longTermCacheFiles].map(
        (file) => file.path,
      );
      return entryArrayManifest;
    },
  });

  if (target === "web") {
    webpackConfig.plugins.push(assetPlugin);
  }

  return webpackConfig;
}

const staticAssetsJsonPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  staticAssetsJsonPlugin,
};
