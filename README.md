# "Bootleg" rust sites monorepo

This project primarily exists as a tool for experimentation with React, Server rendering (SSR) and monorepo tooling/infra. In order to provide a real-world use-case I'm (in theory) working to re-write some of the rust-lang community websites in react ([crates.io](https://crates.io/) and [rust-lang.org](https://www.rust-lang.org/)).

Some rough goals of this project are:

- SSR React that emphasises running **UNIVERSAL** `<App />`s on different "runtimes" (aka. same `<App />` rendering on client and server) instead of using a metaframework (eg Next.js) that wraps React. [read more](./docs/articles/react-runtime-vs-metaframework.md).
- Mutliple website packages (`web-crates-io`, `web-rust-lang` etc).
- Externalise as much build config/tooling as possible instead of duplicating across packages (`build-tooling`).
- Shared Design system library used across the different website packages (`@bootleg-rust/design-system`).
- SSR toolbox library to provide React Components/APIs/Providers for SSR use-cases (`lib-ssr-toolbox`).
- SSR runtime library to abstract the runtime SSR server/client across different website packages (`lib-ssr-runtime`).
- GCP Serverless deployment that costs $0 when not recieving traffic (Cloud run).
- GCP CI/CD automation (terraform + Cloud Build).
- Monorepo management using `pnpm + rush`

## Sites

- `web-crates-io`: [bootleg-crates.io](https://bootleg-crates.io)
- `web-rust-lang`: [bootleg-rust-lang.org](https://bootleg-rust-lang.org)
- `web-components`: [components.bootleg-rust-lang.org](https://components.bootleg-rust-lang.org)
- `web-api-proxy`: [api.bootleg-crates.io](https://api.bootleg-crates.io/api/v1/summary)

## Published packages

Public containers are published to the Github container registry.

```sh
docker run --init -p 4000:4000 -e PORT=4000 -e ENV=dev ghcr.io/bootleg-rust/sites/web-rust-lang
docker run --init -p 4001:4001 -e PORT=4001 -e ENV=dev ghcr.io/bootleg-rust/sites/web-crates-io
docker run --init -p 4050:4050 -e PORT=4050 -e ENV=dev ghcr.io/bootleg-rust/sites/web-components
docker run --init -p 8000:8000 -e PORT=8000 -e ENV=dev ghcr.io/bootleg-rust/sites/web-api-proxy
```

## Contributing quickstart

### Global dependencies

You will need to have the following global dependencies installed on your local machine

- NodeJS (Installed using [`nvm`](https://github.com/nvm-sh/nvm#install--update-script))
- Java (Installed using ['sdkman'](https://sdkman.io/install))
- GCloud CLI ([`gcloud`]((https://cloud.google.com/sdk/docs/downloads-interactive)))

```sh
# On macs install coreutils
brew install coreutils

# If using sdkman to manage Java versions
sdk install java 18.0.1-tem
sdk use

# Install nvm and NodeJS
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install
nvm use

# Install gcloud CLI
curl https://sdk.cloud.google.com | bash;

# Install Rush
npm install -g @microsoft/rush
```

### Global config files

To authenticate with the Github package registry you'll need to authenticate the docker CLI

```sh
# Login to github container registry though docker using Personal access token (GITHUB_PERSONAL_ACCESS_TOKEN)
docker login https://ghcr.io -u <USERNAME>
```

In order to use the `gcloud` command and switch between the relevant environments you will need to copy all the environment files from the `${projectRoot}/docs/config/gcloud/environments/` folder into your gcloud config configurations folder.

NOTE: you will need to update any values in these files so they match your specific details (EG: `account = <your-email-address>`)

```sh
cp -r ./docs/config/gcloud/configurations/ ~/.config/gcloud/configurations/;
```

```sh
gcloud init;
gcloud auth login;
gcloud auth application-default login;
gcloud auth configure-docker;
gcloud components install beta;
gcloud auth configure-docker asia-docker.pkg.dev;
gcloud --version;
```

### Local config files

Set some local gitignored config values

```sh
cp  ./docs/examples/.env.local .
```

If you are using `direnv`, copy the example `.envrc` . If you have direnv installed it will automatically load project specific config into your shell when entering the project folder.

```sh
cp docs/examples/.envrc .

direnv allow
direnv reload
```

### Run development scripts

After checking out the repository you should be able to run these commands in sequence to setup and verify your local development environment.

```sh
# Install/setup tool deps
make deps.install

# Verify code using static analysis tools (eg golangci-lint)
make verify

# Verify code using static analysis tools and automatically apply fixes when possible
make verify.fix

# Run all code generation
make codegen

# Verify empty git diff after codegen
make verify.empty-git-diff

# Run unit tests
make test.unit

# Start the "devstack" locally (external dependencies)
make devstack.start

# Start the application processes in background processes
make dev.start

# Execute the integration tests
make test.integration
```

For local development you may want to run the applications manually (eg in debug mode), to do so you can should stop the application processing running in the background

```sh
# Stop the application background services
make dev.stop

# Remove/reset the background processes/services
make dev.clean
```

You can stop or recreate the devstack using the following commands

```sh
# Stop shutdown the docker containers running as part of the devstack
make dev.stop
make devstack.stop

# Delete/reset the devstack, removes all the containers, volumes etc of the docker-compose stack
make dev.clean
make devstack.clean
```

For extended contributing documentation documentation see [./CONTRIBUTING.md](./CONTRIBUTING.md)
