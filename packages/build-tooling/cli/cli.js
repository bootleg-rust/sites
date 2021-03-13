#!/usr/bin/env node

const { Command } = require("commander");
const dotenv = require("dotenv");
const package = require("../package.json");
const {
  packageDockerService,
  publishDockerService,
  deployDockerService,
  runInvalidation,
} = require("./service");
const { triggerCICD } = require("./trigger");
const fs = require("./fs");

const envFiles = [".env", ".env.local"].filter((path) => fs.existsSync(path));

envFiles.forEach((path) => {
  dotenv.config({ path });
});

/* eslint-disable no-console */

const program = new Command();

program.version(package.version);

function makeTriggerCmd() {
  // prettier-ignore
  const cmd = new Command("trigger")
    .description("commands to trigger CI/CD workflows");

  cmd
    .command("ci")
    .arguments("<eventType>")
    .requiredOption(
      "-e, --env <env>",
      "deploy (dev|uat|staging|prod)",
      process.env.ENV,
    )
    .requiredOption(
      "-s, --skip <skip>",
      "steps to skip",
      (v) => v && v.split(","),
      ["verify", "package", "publish"],
    )
    .requiredOption("-ref, --git-ref <gitRef>", "git ref", process.env.GIT_REF)
    .requiredOption(
      "-token, --github-token <github-token>",
      "github username",
      process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
    )
    .action(async (eventType, options) => {
      const repositoryIdentifier = "bootleg-rust/sites";
      await triggerCICD(
        Object.assign({ eventType, repositoryIdentifier }, options),
      );
    });

  return cmd;
}

function makeNotifyCmd() {
  // prettier-ignore
  const cmd = new Command("notify")
    .description("commands to send slack notifications to the digprop team");

  cmd
    .command("deployment")
    .option("-p, --prod", "a prod deployment")
    .action(async () => {
      throw new Error("Not implemented");
    });

  return cmd;
}

function makeServiceCmd() {
  // prettier-ignore
  const cmd = new Command("service")
    .description("commands to manage a 'web-*' service");

  cmd
    .command("package")
    .option("-t, --type <type>", "type of service", "docker")
    .requiredOption("-s, --service-name <serviceName>", "service name")
    .action(async (options) => {
      await packageDockerService(options);
    });

  cmd
    .command("publish")
    .option("-t, --type <type>", "type of service", "docker")
    .requiredOption("-s, --service-name <serviceName>", "service name")
    .requiredOption("-ref, --git-ref <gitRef>", "git ref", process.env.GIT_REF)
    .option(
      "-reg, --registry-url <registryUrl>",
      "container registry",
      process.env.CONTAINER_REGISTRY_URL,
    )
    .action(async (options) => {
      await publishDockerService(options);
    });

  cmd
    .command("deploy")
    .option("-t, --type <type>", "type of service", "docker")
    .requiredOption("-s, --service-name <service-name>", "service name")
    .requiredOption(
      "-e, --env <env>",
      "deploy (dev|uat|staging|prod)",
      process.env.ENV,
    )
    .option(
      "-reg, --registry-url <registry-url>",
      "container registry",
      "asia-docker.pkg.dev/bootleg-crates-shared/sites",
    )
    .requiredOption("-ref, --git-ref <git-ref>", "git ref", process.env.GIT_REF)
    .option("-r, --gcp-region <gcp-region>", "GCP Region", "asia-northeast1")
    .action(async (options) => {
      await deployDockerService(options);
    });

  cmd
    .command("run-invalidation")
    .requiredOption("-s, --service-name <service-name>", "service name")
    .requiredOption(
      "-e, --env <env>",
      "deploy (dev|uat|staging|prod)",
      process.env.ENV,
    )
    .option(
      "-map, --url-map-name <url-map-name>",
      "GCP url-map name",
      "bootleg-rust-sites-url-map",
    )
    .option("-p, --path <path>", "path to invalidate", "/*")
    .option("--wait", "wait for invalidation to finish before continuing")
    .option("-r, --gcp-region <gcp-region>", "GCP Region", "asia-northeast1")
    .action(async (options) => {
      await runInvalidation(options);
    });

  return cmd;
}

program.addCommand(makeTriggerCmd());
program.addCommand(makeNotifyCmd());
program.addCommand(makeServiceCmd());

program.parseAsync(process.argv).catch((anyError) => {
  console.error(anyError);
  process.exit(1);
});
