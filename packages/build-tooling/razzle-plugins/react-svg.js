/* eslint-disable @typescript-eslint/no-unused-vars */

const loaderFinder = require("razzle-dev-utils/makeLoaderFinder");

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  const config = webpackConfig;

  // TODO: make loading react svg components work
  // EG: `import { ReactComponent as LogoSvg } from "./logo.svg";`

  // const babelLoaderConfig = loaderFinder("babel-loader");
  // const javascriptRule = config.module.rules
  //   .find((...props) => babelLoaderConfig(...props))
  //   .use.find((...props) => babelLoaderConfig(...props)).options;

  // const svgConfig = [
  //   require.resolve("babel-plugin-named-asset-import"),
  //   {
  //     loaderMap: {
  //       svg: {
  //         ReactComponent: "@svgr/webpack?-svgo,+titleProp,+ref![path]",
  //       },
  //     },
  //   },
  // ];

  // if (javascriptRule.plugins) {
  //   javascriptRule.plugins.push(svgConfig);
  // } else {
  //   javascriptRule.plugins = [svgConfig];
  // }

  return config;
}

const reactSvgPlugin = {
  modifyWebpackConfig,
};

module.exports = { reactSvgPlugin };
