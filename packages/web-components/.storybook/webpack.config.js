// eslint-disable
module.exports = ({ config }) => {
  // externals
  config.externals = [];
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          presets: [["react-app", { flow: false, typescript: true }]],
        },
      },
    ],
  });
  config.resolve.extensions.push(".ts", ".tsx", ".jsx");
  return config;
};
