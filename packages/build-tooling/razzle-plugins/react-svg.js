"use strict";

const loaderFinder = require("razzle-dev-utils/makeLoaderFinder");

function reactSvg(baseConfig) {
  const config = Object.assign({}, baseConfig);

  const babelLoaderConfig = loaderFinder("babel-loader");
  const javascriptRule = config.module.rules
    .find((...props) => babelLoaderConfig(...props))
    .use.find((...props) => babelLoaderConfig(...props)).options;
  const svgConfig = [
    require.resolve("babel-plugin-named-asset-import"),
    {
      loaderMap: {
        svg: {
          ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
        },
      },
    },
  ];

  if (javascriptRule.plugins) {
    javascriptRule.plugins.push(svgConfig);
  } else {
    javascriptRule.plugins = [svgConfig];
  }

  return config;
}

module.exports = { reactSvg };
