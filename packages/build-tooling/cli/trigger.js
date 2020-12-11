const { Octokit } = require("@octokit/rest");

module.exports = {
  triggerCICD,
};

async function triggerCICD({
  eventType,
  skip,
  env,
  gitRef,
  githubToken,
  repositoryIdentifier,
}) {
  if (!env) throw new Error("env required");
  if (!githubToken) throw new Error("github token required");
  if (eventType !== "deploy:all") {
    // TODO: currently can only trigger a deploy:all
    throw new Error(`invalid ci trigger "${eventType}"`);
  }
  const apiUrl = `https://api.github.com/repos/${repositoryIdentifier}/dispatches`;
  /* eslint-disable @typescript-eslint/camelcase */
  const clientPayload = {
    env,
    ref: gitRef,
    skip_package:
      process.env.SKIP_PACKAGE === "true" || skip.includes("package"),
    skip_verify: process.env.SKIP_VERIFY === "true" || skip.includes("verify"),
    skip_publish:
      process.env.SKIP_PUBLISH === "true" || skip.includes("publish"),
    skip_deploy: process.env.SKIP_DEPLOY === "true" || skip.includes("deploy"),
  };

  const payload = {
    event_type: eventType,
    client_payload: clientPayload,
  };
  /* eslint-enable @typescript-eslint/camelcase */

  const octokit = new Octokit({ auth: githubToken });

  const githubRequest = {
    method: "POST",
    url: apiUrl,
    headers: {
      accept: "application/vnd.github.everest-preview+json",
    },
    data: payload,
  };

  // Send a repository dispatch event
  // eslint-disable-next-line no-console
  console.log("sending dispatch", githubRequest);
  const { status } = await octokit.request(githubRequest);

  // Check for success
  if (status !== 204) {
    throw new Error(
      "Sorry, something was wrong with that request, are you sure that repo exists?",
    );
  }
}
