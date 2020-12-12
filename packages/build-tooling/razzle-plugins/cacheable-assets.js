/* eslint-disable unicorn/no-reduce  */
/* eslint-disable @typescript-eslint/no-unused-vars */
const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { fileMatchesTemplate } = require("./utils/file-matches-template");

// const defaultOptions = {};

function fileMatchesAnyRegexp(file, regExpressions) {
  return regExpressions.some((re) => re.test(file.path));
}

/**
 * Determine whether the config of the webpack loader associated with this file
 * contains "buildhash", "contenthash" or "hash". Webpack output config on loaders
 * can be specified as a template string or function.
 *
 * @param {string|function} webpackOutputFilename
 * @param {any} file
 */
function webpackLoaderOutputContainsHash(webpackOutputFilename, file) {
  const filename =
    typeof webpackFilenameOption == "function"
      ? webpackOutputFilename(file)
      : webpackOutputFilename;

  const containsHash = /\[(build|content)?hash/.test(filename);

  return containsHash;
}

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
  paths,
}) {
  // TODO: allow passing in extra file categorizers with `pluginOptions`
  const fileCategorizers = [
    {
      test: webpackOptions.urlLoaderTest,
      outputName: webpackOptions.urlLoaderOutputName,
    },
    {
      test: webpackOptions.cssTest,
      outputName: webpackOptions.cssOutputFilename,
    },
    {
      test: webpackOptions.jsTest,
      outputName: webpackOptions.jsOutputFilename,
    },
    {
      exclude: webpackOptions.fileLoaderExclude,
      outputName: webpackOptions.fileLoaderOutputName,
    },
  ];

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

      files.forEach((file) => {
        if (file.name.startsWith("..")) {
          // Files that start with ".." will live outside of the public/
          // folder and therefore can't/shouldn't be accessed.
          return;
        }

        const fileCategorized = fileCategorizers.some(
          ({ test, exclude, outputName }) => {
            const passesTest =
              test != null ? fileMatchesAnyRegexp(file, test) : true;

            const passesExclude =
              exclude != null ? !fileMatchesAnyRegexp(file, exclude) : true;

            const fileMatches =
              passesTest &&
              passesExclude &&
              fileMatchesTemplate(file.path, outputName);

            if (fileMatches) {
              const containsHash = webpackLoaderOutputContainsHash(
                outputName,
                file,
              );

              setFileAs(file, { containsHash });
            }

            return fileMatches;
          },
        );

        if (!fileCategorized) {
          // TODO: allow "strict" vs "lazy" mode here where we can only use
          // regex on the filename to guess if a file contains a hash in it.
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
    // so we have to find and edit the existing one.
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
