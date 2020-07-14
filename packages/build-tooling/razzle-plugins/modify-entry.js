const defaultOptions = {
  server: null,
  client: null,
};

function modifyEntryPoints(baseConfig, env, webpack, userOptions = {}) {
  const options = { ...defaultOptions, ...userOptions };
  const webpackConfig = { ...baseConfig };

  const { client, server } = options;
  /* This is required to rename the entry points instead of using the defaults */
  if (env.target === "node" && server) {
    webpackConfig.entry = [server];
  }
  if (env.target !== "node" && client) {
    webpackConfig.entry.client = client;
  }

  return webpackConfig;
}

module.exports = {
  modifyEntryPoints,
};
