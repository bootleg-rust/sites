# "Bootleg" rust sites monorepo

This project primarily exists as a tool for experimentation with React, Server rendering (SSR) and monorepo tooling/infra. In order to provide a real-world use-case I'm (in theory) working to re-write some of the rust-lang community websites in react ([crates.io](https://crates.io/) and [rust-lang.org](https://www.rust-lang.org/)).

Some rough goals of this project are:

* Mutliple website packages (`web-crates-io`, `web-rust-lang` etc).
* Externalise as much build config/tooling as possible instead of duplicating across packages (`build-tooling`).
* Shared Design system library used across the different website packages (`lib-design-system`).
* SSR toolbox library to provide React Components/APIs/Providers for SSR use-cases (`lib-ssr-toolbox`).
* SSR runtime library to abstract the runtime SSR server/client across different website packages (`lib-ssr-runtime`).
* GCP Serverless deployment that costs $0 when not recieving traffic (Cloud run).
* GCP CI/CD automation (terraform + Cloud Build).

## Sites

* `web-crates-io`: [bootleg-crates.io](https://bootleg-crates.io)
* `web-rust-lang`: [bootleg-rust-lang.org](https://bootleg-rust-lang.org)
* `web-components`: [components.bootleg-rust-lang.org](https://components.bootleg-rust-lang.org)
* `web-api-proxy`: [api.bootleg-crates.io](https://api.bootleg-crates.io/api/v1/summary)

## Contributing

### Quick start

* Read [./docs/dev-env-setup.md](./docs/dev-env-setup.md) to set up your local development environment
* Read [./docs/deploy.md](./docs/deploy.md) to package, publish and/or deploy to an environment

### Overview

* Read [./docs/setup-config/gcp.md](./docs/setup-config/gcp.md) for information about how the GCP projects are set up
* Read [./docs/setup-config/ci.md](./docs/setup-config/ci.md) for information about how CI is set up

## Notes

Some things I'm considering (or intending) to implement are:

* Switch from using `lerna + yarn` to `rush + bazel` to support other languages in the monorepo and possibly speed up docker builds.
* Get rid of the need for firebase hosting now that connecting [Cloud Run services as backends to a Cloud HTTP(S) Load Balancer is supported](https://github.com/ahmetb/cloud-run-faq/commit/ceb7418b5cad8d5e1782b89c11b86578be5f9ba6)
* After getting rid of firebase (doesn't have terraform support), use terraform to manage all/most infra/deployments.
  * Should there be a seperate repo to track deployments that uses branches to track changes between environments?
  * Think about where should the following live:
    * terraform to manage GCP projects (infra independent of `@bootleg-rust/sites`).
    * terraform to manage DNS for `bootleg-crates.io` and `bootleg-rust-lang.org`.
    * terraform to manage infra shared across all `packages/` in `@bootleg-rust/sites`.
    * terraform to manage infra specific to a single `@bootleg-rust/sites` package.
* Automate CI/CD by setting up GCP Cloud build (maybe after switching to `rush + bazel`).
* [Canary deployments](https://github.com/ahmetb/cloud-run-faq#how-to-do-canary-or-bluegreen-deployments-on-cloud-run) (maybe after switching to using terraform for everything).
* Make it easier to set immutable cache-control headers for all razzle assets [#1371 (issue)](https://github.com/jaredpalmer/razzle/issues/1371).
* Razzle 3 should reduce the need for manual typescript config in `build-tooling`.
* Implement `<Redirect />` in `lib-ssr-toolkit` and stop using `staticContext` in `react-router` v6 as it will be removed [#7267 (issue)](https://github.com/ReactTraining/react-router/issues/7267)
