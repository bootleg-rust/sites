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

  const [mainRegistryUrl, ...secondaryRegistryUrls] = registryUrls;

  // Publish all to main registry
  await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: gitRefSha });
  await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: `${gitRefSlug}.${dateTime}` });
  await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: `${gitRefSlug}.latest` });

  if (gitRef === "main") {
    await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: "main" });
    await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: "latest" });
  }

  // Publish to secondary registries under specific circumstances
  for (const registryUrl of secondaryRegistryUrls) {
    if (gitRef === "main") {
      await tagAndPush({ name, registryUrl, tag: gitRefSha });
      await tagAndPush({ name, registryUrl, tag: "latest" });
    }
    // TODO: publsh with version from git tag
    // await tagAndPush({ name, registryUrl: mainRegistryUrl, tag: gitRefVersionTag });
  }
}
