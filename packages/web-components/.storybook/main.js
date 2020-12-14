const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  logLevel: "debug",
  addons: [
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    "@storybook/preset-create-react-app",
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     configureJSX: true,
    //   },
    // },
  ],
  webpackFinal: (config) => {
    // TODO: use node resolution instead of path relative to sibling package
    const siblingLibs = [
      path.join(__dirname, "../../lib-ssr-toolbox"),
      path.join(__dirname, "../../lib-design-system"),
    ];

    // Babel
    const plugins = config.module.rules[2].oneOf;
    const babelLoader = plugins[2];

    babelLoader.include = [...babelLoader.include, ...siblingLibs];

    // add monorepo root as a valid directory to import modules from
    config.resolve.plugins.forEach((p) => {
      if (Array.isArray(p.appSrcs)) {
        p.appSrcs = [...p.appSrcs, ...siblingLibs];
      }
    });

    return config;
  },
};
