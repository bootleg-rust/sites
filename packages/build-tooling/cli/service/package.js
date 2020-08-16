const { exec } = require("../exec");

module.exports = {
  packageDockerService,
};

async function packageDockerService({ serviceName: name }) {
  await exec(`docker build -t ${name} -f Dockerfile ../..`);
}
