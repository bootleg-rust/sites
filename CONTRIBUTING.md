# Contributing

- Read [./docs/dev-env-setup.md](./docs/dev-env-setup.md) to set up your local development environment
- Read [./docs/deploy.md](./docs/deploy.md) to package, publish and/or deploy to an environment
- Read [./docs/setup-config/gcp.md](./docs/setup-config/gcp.md) for information about how the GCP projects are set up
- Read [./docs/setup-config/ci.md](./docs/setup-config/ci.md) for information about how CI is set up

## Deploy

```fish
rush service:package; and \
env GIT_REF=main rush service:publish; and \
env GIT_REF=main ENV=dev rush service:deploy; and \
env GIT_REF=main ENV=prod rush service:deploy;
```

## Notes

Some things I'm considering (or intending) to implement are:

- Investigate switching to `bazel` to support other languages in the monorepo and possibly speed up docker builds.
- Automate CI/CD by setting up GCP Cloud build.
- [Canary deployments](https://github.com/ahmetb/cloud-run-faq#how-to-do-canary-or-bluegreen-deployments-on-cloud-run) (maybe after switching to using terraform for everything).
- Add extra linting
  - yml/yaml
  - markdown
  - Dockerfile/Containerfile
  - npm/package.json
  - OpenAPI/AsyncAPI
- Add-back some things removed when switching to `rush + pnpm` (Investigate rush autoinstallers).
  - Sort all `package.json`s
  - lint-staged
    - prettier
    - linters
    - sort-package-json
- Add structured JSON logging
- Use terraform to manage all/most infra & deployments.
  - Should there be a seperate repo to track deployments that uses branches to track changes between environments?
  - Think about where should the following live:
    - terraform to manage GCP projects (infra independent of `@bootleg-rust/sites`).
    - terraform to manage DNS for `bootleg-crates.io` and `bootleg-rust-lang.org`.
    - terraform to manage infra shared across all `packages/` in `@bootleg-rust/sites`.
    - terraform to manage infra specific to a single `@bootleg-rust/sites` package.
    - terraform to manage stateful infra that is either shared across multiple `packages/` or specific to a single `package/` (EG: instead of `web-api-proxy` have a `web-api-crates-io` package that requires a database to store package info).
