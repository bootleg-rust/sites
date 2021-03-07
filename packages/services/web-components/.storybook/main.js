const path = require("path");

module.exports = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  logLevel: "debug",
  addons: [
    {
      name: "@storybook/preset-create-react-app",
      options: {
        scriptsPackageName: "react-scripts",
      },
    },
    "@storybook/addon-actions",
    "@storybook/addon-knobs",
    "@storybook/addon-links",
    "@storybook/addon-viewport",
    // {
    //   name: "@storybook/addon-docs",
    //   options: {
    //     configureJSX: true,
    //   },
    // },
  ],
  webpackFinal: (config) => {
    config.performance.hints = false;

    const additionalIncludes = [
      "@pseudo-su/flex-elements",
      "@ssr-kit/toolbox",
      "@bootleg-rust/design-system",
    ];

    const resolvedAdditionalIncludes = additionalIncludes.map((name) => {
      const packageJson = path.join(name, "package.json");
      const resolvedPackageJson = require.resolve(packageJson);
      const moduleDir = path.dirname(resolvedPackageJson);
      return moduleDir;
    });

    // Babel
    const plugins = config.module.rules[2].oneOf;
    const babelLoader = plugins[2];

    babelLoader.include = [
      ...babelLoader.include,
      ...resolvedAdditionalIncludes,
    ];

    // add monorepo root as a valid directory to import modules from
    config.resolve.plugins.forEach((p) => {
      if (Array.isArray(p.appSrcs)) {
        p.appSrcs = [...p.appSrcs, ...resolvedAdditionalIncludes];
      }
    });

    return config;
  },
};
