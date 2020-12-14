# Local dev setup

## Install global dependencies

```sh
# gcloud CLI (https://cloud.google.com/sdk/docs/downloads-interactive)
$ curl https://sdk.cloud.google.com | bash
$ gcloud init
$ gcloud auth login
$ gcloud auth application-default login
$ gcloud auth configure-docker
$ gcloud beta auth configure-docker asia-docker.pkg.dev
$ gcloud --version
```

## Install node dependencies

```sh
$ rush update;
```

A script to open all [./SITES.md](./SITES.md) at once is [./open-local.sh](../open-local.sh)

## GCP configurations setup

In order to use the `gcloud` command and switch between the relevant environments you will need to copy all the environment files from the `${projectRoot}/config/gcloud/environments/` folder into your gcloud config configurations folder.

NOTE: you will need to update any values in these files so they match your specific details (EG: `account = <your-email-address>`)

```sh
$ cp -r ./config/gcloud/configurations/ ~/.config/gcloud/configurations/
```
