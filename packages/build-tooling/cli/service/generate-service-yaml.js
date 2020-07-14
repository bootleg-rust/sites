#!/usr/bin/env node

const YAML = require("js-yaml");
const lodashMerge = require("lodash.merge");

const fs = require("../fs");

module.exports = {
  generateServiceYaml,
};

const variableSyntax = "\\${([^{}]+?)}";
const variableRegExp = RegExp(variableSyntax, "g");

// NOTE: templating `${env:SOME_VARIABLE}` is inspired by the serverless framework
// EG:  https://github.com/serverless/serverless/blob/73107822945a878abbdebe2309e8e9d87cc2858a/lib/classes/Variables.js
// it would be really nice to also have some of the other resolvers EG `${file(some-file.js):field}`

// Resolvers
const envRefRegExp = RegExp(/^env:/g);

const resolvers = [
  {
    regex: envRefRegExp,
    resolver: resolveValueFromEnv,
  },
];

async function generateServiceYaml(
  { inputs, output },
  { environment = process.env } = {},
) {
  const filteredInputs = inputs.filter((path) => fs.existsSync(path));
  const merged = mergeYaml(filteredInputs, { environment });
  const outputData = YAML.safeDump(merged);
  await fs.writeFile(output, outputData);
}

function mergeYaml(filesArray, ctx) {
  let mergedConfig;
  filesArray.forEach(function (file) {
    const rawFileData = fs.readFileSync(file, "utf8");
    const fileData = rawFileData.replace(variableRegExp, (_, strExpression) => {
      let result = strExpression;
      for (const { regex, resolver } of resolvers) {
        if (result.match(regex)) {
          result = resolver(strExpression, ctx);
        }
      }
      return result;
    });

    const parsedConfig = YAML.safeLoad(fileData);

    if (!mergedConfig) {
      mergedConfig = parsedConfig;
    } else {
      /* The last files will take the highest precedence */
      lodashMerge(mergedConfig, parsedConfig);
    }
  });
  return mergedConfig;
}

function resolveValueFromEnv(variableString, { environment }) {
  const requestedEnvVar = variableString.split(":")[1];
  let valueToPopulate;
  if (requestedEnvVar !== "" || "" in environment) {
    valueToPopulate = environment[requestedEnvVar];
  } else {
    valueToPopulate = environment;
  }
  if (!valueToPopulate) {
    throw new Error(`template environment variable ${variableString} required`);
  }
  return valueToPopulate;
}
