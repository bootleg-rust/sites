const { exec } = require("../exec");

module.exports = {
  packageDockerService,
};

/* eslint-disable */

async function packageDockerService({ serviceName: name }) {
  await exec("cp ../../.firebaserc ./.firebaserc");
  await exec(`docker build -t ${name} -f Dockerfile ../..`);
}
