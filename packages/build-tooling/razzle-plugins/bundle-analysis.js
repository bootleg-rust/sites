/* eslint-disable @typescript-eslint/no-unused-vars */
const defaultOptions = {
  analyzerMode: "static",
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: "../webpack.stats.json",
  reportFilename: "../webpack.report.html",
};

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  const options = { ...defaultOptions, ...pluginOptions };

  // Client: perform bundle analysis when building the client
  if (target === "web" && !dev) {
    const { concatenateModules, ...bundleAnalyzerOptions } = options;

    webpackConfig.optimization.concatenateModules = concatenateModules;
    webpackConfig.plugins.push(
      new (require("webpack-bundle-analyzer").BundleAnalyzerPlugin)(
        bundleAnalyzerOptions,
      ),
    );
  }

  return webpackConfig;
}

const bundleAnalysisPlugin = {
  modifyWebpackConfig,
};

module.exports = {
  bundleAnalysisPlugin,
};
