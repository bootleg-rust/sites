const defaultOptions = {
  analyzerMode: "static",
  openAnalyzer: false,
  generateStatsFile: true,
  statsFilename: "../webpack.stats.json",
  reportFilename: "../webpack.report.html",
};

function bundleAnalysis(baseConfig, env, webpack, userOptions = {}) {
  const { target, dev } = env;
  const options = { ...defaultOptions, ...userOptions };
  const webpackConfig = { ...baseConfig };

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

module.exports = {
  bundleAnalysis,
};
