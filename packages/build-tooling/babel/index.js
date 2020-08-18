module.exports = {
  presets: [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        useBuiltIns: "entry",
        corejs: 3,
      },
    ],
    "@babel/preset-typescript",
    "razzle/babel",
  ],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-export-default-from",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-async-generator-functions",
    "@babel/plugin-proposal-optional-chaining",
    "babel-plugin-styled-components",
  ],
  env: {
    test: {
      presets: [
        "@babel/preset-react",
        ["@babel/preset-env", { targets: { node: "current" } }],
        "@babel/preset-typescript",
      ],
      plugins: [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-export-default-from",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-async-generator-functions",
        "@babel/plugin-proposal-optional-chaining",
        // "babel-plugin-styled-components",
      ],
    },
  },
};
