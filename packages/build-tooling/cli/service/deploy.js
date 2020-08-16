const fs = require("../fs");
const { exec } = require("../exec");
const { generateServiceYaml } = require("./generate-service-yaml");

module.exports = {
  deployDockerService,
};

async function deployDockerService({
  env,
  serviceName: name,
  gitRef,
  registryUrl,
  gcpRegion,
}) {
  const gitRefSha = await exec(`git rev-parse --short ${gitRef}`);
  // const currentRef = await exec("git rev-parse --abbrev-ref HEAD");
  // const gitRefSlug = gitRef.replace(/\//g, "-");
  // const dateTime = await exec("date +%Y-%m-%d-%H%M");

  const containerRegistryUrl = `${registryUrl}/${name}`;
  const containerImageUrl = `${containerRegistryUrl}:${gitRefSha}`;

  // Generate service.build.yml
  const inputs = [
    `../../config/service.yml`,
    `service.yml`,
    `../../config/service.${env}.yml`,
    `service.${env}.yml`,
  ];
  const output = "service.build.yml";

  const environment = Object.assign(
    { GIT_REF: gitRef, CONTAINER_IMAGE_URL: containerImageUrl },
    process.env,
  );

  await generateServiceYaml({ inputs, output }, { environment });

  const outputData = await fs.readFile(output);

  // Deploy cloud run

  /* eslint-disable no-console */
  console.log("/--- DEPLOYING SERVICE YAML");
  console.log(outputData.toString());
  console.log("---/");
  /* eslint-enable no-console */

  await exec(`gcloud config configurations activate $ENV`);
  await exec(
    `gcloud beta run services replace ${output} --region ${gcpRegion} --platform managed -q`,
  );
}
