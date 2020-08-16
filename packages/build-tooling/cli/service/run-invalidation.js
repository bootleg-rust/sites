const { exec } = require("../exec");

module.exports = {
  runInvalidation,
};

const hostnameFns = {
  _default: {
    "web-api-proxy": (env) => `api.${env}.bootleg-crates.io`,
    "web-components": (env) => `components.${env}.bootleg-rust-lang.org`,
    "web-crates-io": (env) => `${env}.bootleg-crates.io`,
    "web-rust-lang": (env) => `${env}.bootleg-rust-lang.org`,
  },
  prod: {
    "web-api-proxy": () => "api.bootleg-crates.io",
    "web-components": () => "components.bootleg-rust-lang.org",
    "web-crates-io": () => "bootleg-crates.io",
    "web-rust-lang": () => "bootleg-rust-lang.org",
  },
};

async function runInvalidation({
  urlMapName,
  serviceName: name,
  env,
  path,
  wait,
}) {
  const hostnameFn =
    (hostnameFns[env] && hostnameFns[env][name]) || hostnameFns._default[name];
  if (!hostnameFn) throw new Error(`Unknown hostname for ${name} ${env}`);

  const host = hostnameFn(env);

  const asyncFlag = wait ? "" : "--async";

  await exec(
    `gcloud compute url-maps invalidate-cdn-cache ${urlMapName} --host=${host} --path=${path} ${asyncFlag}`,
  );
}
