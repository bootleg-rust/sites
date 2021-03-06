FROM node:14.15-alpine as builder-base

WORKDIR /app

RUN apk add rsync

COPY rush.json /app/

# shared tooling libraries
COPY packages/build-tooling/package.json /app/packages/build-tooling/
COPY packages/build-tooling/cli/cli.js /app/packages/build-tooling/cli/cli.js

COPY packages/lib-flex-elements/package.json /app/packages/lib-flex-elements/
COPY packages/lib-design-system/package.json /app/packages/lib-design-system/
COPY packages/lib-features/package.json /app/packages/lib-features/
COPY packages/lib-config/package.json /app/packages/lib-config/
COPY packages/lib-ssr-runtime/package.json /app/packages/lib-ssr-runtime/
COPY packages/lib-ssr-toolbox/package.json /app/packages/lib-ssr-toolbox/

COPY packages/web-components/package.json /app/packages/web-components/
COPY packages/web-api-proxy/package.json /app/packages/web-api-proxy/
COPY packages/web-crates-io/package.json /app/packages/web-crates-io/
COPY packages/web-rust-lang/package.json /app/packages/web-rust-lang/

# Rush config
COPY common /app/common

RUN node ./common/scripts/install-run-rush.js install

# Only build the server project with the "builder" as base

CMD ["true"]
