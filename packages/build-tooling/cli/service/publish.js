const { exec } = require("../exec");

module.exports = {
  publishDockerService,
};

async function tagAndPush({ name, registryUrl, tag }) {
  const containerRegistryUrl = `${registryUrl}/${name}`;
  await exec(`docker tag "${name}:latest" "${containerRegistryUrl}:${tag}"`);
  await exec(`docker push "${containerRegistryUrl}:${tag}"`);
}

async function publishDockerService({
  serviceName: name,
  gitRef,
  registryUrl: registryUrls,
}) {
  const gitRefSha = await exec(`git rev-parse --short ${gitRef}`);
  // const currentRef = await exec("git rev-parse --abbrev-ref HEAD");
  const gitRefSlug = gitRef.replace(/\//g, "-");
  const dateTime = await exec("date +%Y-%m-%d-%H%M");

  for (const registryUrl of registryUrls) {
    await tagAndPush({ name, registryUrl, tag: gitRefSha });
    await tagAndPush({ name, registryUrl, tag: `${gitRefSlug}.${dateTime}` });
    await tagAndPush({ name, registryUrl, tag: `${gitRefSlug}.latest` });

    if (gitRef === "main") {
      await tagAndPush({ name, registryUrl, tag: "main" });
      await tagAndPush({ name, registryUrl, tag: "latest" });
    }
  }
}
