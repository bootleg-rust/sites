# Local dev setup

## Install global dependencies

```sh
# gcloud CLI (https://cloud.google.com/sdk/docs/downloads-interactive)
curl https://sdk.cloud.google.com | bash;
gcloud init;
gcloud auth login;
gcloud auth application-default login;
gcloud auth configure-docker;
gcloud beta auth configure-docker asia-docker.pkg.dev;
gcloud --version;
```

## Dev scripts

To run scripts for all packages at once

```sh
# Install or update node_modules in all packages
rush update;
# Run the dev server for all packages that have one
rush dev;
# Run code verification/static-analysis/linting for all packages
rush verify;
# Run tests of all packages
rush test;
# Run the build script for all packages
rush build;
```

When working on individual packages

```sh
rushx dev;
rushx verify;
rushx test;
rushx build;
```

## GCP configurations setup

In order to use the `gcloud` command and switch between the relevant environments you will need to copy all the environment files from the `${projectRoot}/docs/config/gcloud/environments/` folder into your gcloud config configurations folder.

NOTE: you will need to update any values in these files so they match your specific details (EG: `account = <your-email-address>`)

```sh
cp -r ./docs/config/gcloud/configurations/ ~/.config/gcloud/configurations/;
```

## Deploy scripts

To run scripts for all packages at once

```sh
# Create build artifacts for services
rush service:package;
# Tag and publish build artifacts for services
env GIT_REF=master rush service:publish;
# Deploy new versions of services using tagged+published artifacts to
# ENV=dev|prod
env GIT_REF=master ENV=dev rush service:deploy;
env GIT_REF=master ENV=prod rush service:deploy;
```

When working on individual packages

```sh
rushx service:package;
env GIT_REF=master rushx service:publish;
env GIT_REF=master ENV=dev rushx service:deploy;
env GIT_REF=master ENV=prod rushx service:deploy;
```

A script to open all [./SITES.md](./SITES.md) at once is [./open-local.sh](../open-local.sh)
