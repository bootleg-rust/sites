# Deploy instructions

All the sites deploy as a "Cloud Run" service with GCP networking (HTTPS Load balancer + CDN) on top. This is particularly important in order to support `Cache-Control` response headers from the cloud run services.

The process for deploying is as follows

* Package the docker image for a service.
* Publish the docker iamge for a service to the container registry in the `bootleg-crates-shared` account.
* Deploy the Cloud run service by using the tagged version of the container in the registry.
* Optional: run a cache-invalidation in the GCP console if required.

NOTE: There is a script to open all sites at once for a specific environment [../scripts/open.sh](../scripts/open.sh)

## Deploying all sites at once

The following steps are if you want to build, publish and/or deploy all sites at once

### Package

```sh
rush service:package;
```

### Publish

```sh
env GIT_REF="<current-branch-name>" rush service:publish;
```

### Deploy

```sh
# use ENV: dev|uat|staging|prod
env ENV="dev" GIT_REF="<current-branch-name>" rush service:deploy;
```

## Deploying a single site

The following steps are if you want to build, publish and/or deploy one site at a time.

NOTE: from within the specific package's folder EG `cd packages/services/web-crates-io`

### Package

```sh
# You will need to re-package the the base image in `@bootleg-rust/build-tooling` whenever dependencies are changed
rushx service:package
```

### Publish

```sh
env GIT_REF="<current-branch-name>" rushx service:publish
```

### Deploy

```sh
# use ENV: dev|uat|staging|prod
env ENV="dev" GIT_REF="<current-branch-name>" rushx service:deploy
```

## Running CDN invalidations

You can run CDN invalidations in any of the "web-" packages by running:

```sh
env ENV="dev" ./node_modules/.bin/build-tooling-cli service run-invalidation --service-name <name-of-service>
```
