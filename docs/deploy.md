# Deploy instructions

All the sites deploy as a "Cloud Run" service with firebase hosting on top because cloud run can't be connected to a Load Balancer (GCLB). Using firebase allows us to have a basic CDN that supports `Cache-Control` and domain mapping.

Because we use both cloud run and firebase the process for deploying is as follows

* Package the docker image for a service
* Publish the docker iamge for a service to the container registry in the `bootleg-crates-shared` account
* Deploy the Cloud run service by using the tagged version of the container in the registry
* Deploy the firebase hosting for the site.

NOTE: There is a script to open all sites at once for a specific environment [../scripts/open.sh](../scripts/open.sh)

## Deploying all sites at once

The following steps are if you want to build, publish and/or deploy all sites at once

### Package

```sh
docker-compose -f docker-compose.builder.yml build builder
docker-compose -f docker-compose.sites.yml build
```

### Publish

```sh
env GIT_REF="<current-branch-name>" yarn run publish
```

### Deploy

```sh
# use ENV: dev|uat|staging|prod
env ENV="dev" GIT_REF="<current-branch-name>" yarn run deploy
```

## Deploying a single site

The following steps are if you want to build, publish and/or deploy one site at a time.

NOTE: from within the specific package's folder EG `cd packages/web-crates-io`

### Package

```sh
# Make sure to re-build the base image "builder" after any changes are made to package.json dependencies
yarn run package
```

### Publish

```sh
env GIT_REF="<current-branch-name>" yarn run publish
```

### Deploy

```sh
# use ENV: dev|uat|staging|prod
env ENV="dev" GIT_REF="<current-branch-name>" yarn run deploy
```
