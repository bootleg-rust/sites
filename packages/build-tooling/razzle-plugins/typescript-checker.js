/* eslint-disable @typescript-eslint/no-unused-vars */
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

function modifyWebpackConfig({
  env: { target, dev },
  webpackConfig,
  webpackObject,
  options: { pluginOptions },
  paths,
}) {
  webpackConfig.plugins.push(new ForkTSCheckerWebpackPlugin());

  // TODO: move this somewhere else
  if (target === "node") {
    // Critical dependency: the request of a dependency is an expression
    // @ {projectDir}/bootleg-rust/sites/common/temp/node_modules/.pnpm/registry.npmjs.org/any-promise/1.3.0/node_modules/any-promise/index.js
    // @ {projectDir}/bootleg-rust/sites/common/temp/node_modules/.pnpm/registry.npmjs.org/koa-compose/3.2.1/node_modules/koa-compose/index.js
    // @ {projectDir}/bootleg-rust/sites/common/temp/node_modules/.pnpm/registry.npmjs.org/koa-convert/1.2.0/node_modules/koa-convert/index.js
    // @ {projectDir}/bootleg-rust/sites/common/temp/node_modules/.pnpm/registry.npmjs.org/koa/2.13.1/node_modules/koa/lib/application.js
    webpackConfig.plugins = [
      new webpackObject.ContextReplacementPlugin(
        /\/(koa|koa-convert|koa-compose|any-promise)\//,
        (data) => {
          delete data.dependencies[0].critical;
          return data;
        },
      ),
      ...webpackConfig.plugins,
    ];
  }

  return webpackConfig;
}

const typescriptCheckerPlugin = {
  modifyWebpackConfig,
};

module.exports = { typescriptCheckerPlugin };
