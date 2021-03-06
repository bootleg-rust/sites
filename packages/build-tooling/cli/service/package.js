const { exec } = require("../exec");

module.exports = {
  packageDockerService,
};

async function packageDockerService({ serviceName: name }) {
  // TODO: make it so the package can build without needing the context of the entire monorepo
  // possibly using rush's `rush deploy` feature
  await exec(`docker build --progress=plain -t ${name} -f Dockerfile ../..`);
}
