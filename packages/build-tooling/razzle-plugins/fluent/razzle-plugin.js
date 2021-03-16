// var JoinPlugin = require("join-webpack-plugin");

// var joinPlugin = new JoinPlugin({
//   search: '**/*.ftl',
//   join: function(common, addition) {
//     const previous = common || [];

//     const newItem = addition.default

//     return [...previous, newItem];
//   },
//   save: function(common) {
//     console.log(common);
//     return JSON.stringify(common);
//   }
// });

const path = require("path");

/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultOptions = {};

function modifyWebpackOptions({
  env: { target, dev },
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
  paths,
}) {
  if (target === "node") {
    webpackOptions.fileLoaderExclude.push(/\.ftl$/);
  }

  if (target === "web") {
    // TODO: merge all translation assets into one for web
    // webpackOptions.fileLoaderExclude.push(/\.ftl$/);
  }

  return webpackOptions;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions, razzleOptions, webpackOptions },
  paths,
}) {
  const opts = {
    ...defaultOptions,
    ...pluginOptions,
  };

  if (target === "web") {
    // TODO
  }

  if (target === "node") {
    webpackConfig.module.rules.push({
      test: /\.ftl$/,
      use: [
        // {
        //   loader: require.resolve("./webpack-loader.js"),
        // },
        // {
        //   loader: joinPlugin.loader(),
        // },
        {
          loader: require.resolve("raw-loader"),
        },
      ],
    });

    // webpackConfig.plugins.push(joinPlugin);
  }

  webpackConfig.module.rules.push({
    test: webpackOptions.babelRule.test,
    enforce: "pre",
    use: require.resolve("webpack-import-glob-loader"),
  });

  return webpackConfig;
}

const fluentPlugin = {
  modifyWebpackOptions,
  modifyWebpackConfig,
};

module.exports = {
  fluentPlugin,
};
