/* eslint-disable unicorn/no-reduce  */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

// const defaultOptions = {};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
  paths,
}) {
  const fileName = path.join(paths.appBuild, "cacheable-assets.json");
  const assetPlugin = new WebpackManifestPlugin({
    fileName,
    writeToFileEmit: true,
    generate: (seed, files) => {
      const notHashedFiles = new Set();
      const hashedFiles = new Set();

      const setFileAs = (file, { containsHash }) => {
        if (containsHash) {
          hashedFiles.add(file);
        } else {
          notHashedFiles.add(file);
        }
      };

      // console.log(files[0]);
      files.forEach((file) => {
        // console.log(file);
        if (
          !webpackOptions.fileLoaderExclude.every((re) => re.test(file.path))
        ) {
          // console.log({ fileLoader: webpackOptions.fileLoaderOutputName });
          const name =
            typeof webpackOptions.fileLoaderOutputName == "function"
              ? webpackOptions.fileLoaderOutputName(file)
              : webpackOptions.fileLoaderOutputName;
          // console.log(name);
          const containsHash = /\[(build|content)?hash/.test(name);

          setFileAs(file, { containsHash });
        } else if (
          webpackOptions.urlLoaderTest.some((re) => re.test(file.path))
        ) {
          // console.log({ urlLoader: webpackOptions.urlLoaderOutputName });
          const containsHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.urlLoaderOutputName == "function"
              ? webpackOptions.urlLoaderOutputName(file)
              : webpackOptions.urlLoaderOutputName,
          );

          setFileAs(file, { containsHash });
        } else if (webpackOptions.cssTest.some((re) => re.test(file.path))) {
          // console.log({ cssOutput: webpackOptions.cssOutputFilename });
          const containsHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.cssOutputFilename == "function"
              ? webpackOptions.cssOutputFilename(file)
              : webpackOptions.cssOutputFilename,
          );

          setFileAs(file, { containsHash });
        } else if (webpackOptions.jsTest.some((re) => re.test(file.path))) {
          // console.log({ jsOutput: webpackOptions.jsOutputFilename });
          const containsHash = /\[(build|content)?hash/.test(
            typeof webpackOptions.jsOutputFilename == "function"
              ? webpackOptions.jsOutputFilename(file)
              : webpackOptions.jsOutputFilename,
          );

          setFileAs(file, { containsHash });
        } else {
          // console.log('UNKNOWN!!', file);
          setFileAs(file, { containsHash: false });
        }
      });

      const mutable = [...notHashedFiles].map((file) => file.path);
      const immutable = [...hashedFiles].map((file) => file.path);
      return {
        mutable,
        immutable,
      };
    },
  });

  if (target === "web") {
    webpackConfig.plugins.push(assetPlugin);
  }

  if (target === "node") {
    // NOTE: adding multiple DefinePlugin's causes issues
    // so we have find and edit the existing one.
    const definePlugin = webpackConfig.plugins.find(
      (p) => p.constructor.name === "DefinePlugin",
    );
    definePlugin.definitions[
      "process.env.RAZZLE_PLUGIN_CACHEABLE_ASSETS"
    ] = JSON.stringify(fileName);
  }

  return webpackConfig;
}

const cacheableAssetsPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  cacheableAssetsPlugin,
};
