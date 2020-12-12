/* eslint-disable @typescript-eslint/no-unused-vars */

const defaultOptions = {
  resetNodeExternals: true,
  resetWebExternals: true,
  web: [],
  node: [],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions, razzleOptions },
  paths,
}) {
  const {
    resetNodeExternals,
    resetWebExternals,
    web: webExternals,
    node: nodeExternals,
  } = {
    ...defaultOptions,
    ...pluginOptions,
  };

  if (!webpackConfig.externals) {
    webpackConfig.externals = [];
  }

  if (target === "web") {
    if (resetWebExternals) {
      webpackConfig.externals = [];
    }
    webpackConfig.externals = [...webpackConfig.externals, ...webExternals];
  }

  if (target === "node") {
    if (resetNodeExternals) {
      webpackConfig.externals = [];
    }
    webpackConfig.externals = [...webpackConfig.externals, ...nodeExternals];
  }

  return webpackConfig;
}

const externalsPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  externalsPlugin,
};
