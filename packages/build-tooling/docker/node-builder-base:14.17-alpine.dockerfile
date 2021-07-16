FROM node:14.17-alpine as builder-base

WORKDIR /app

RUN apk add rsync

COPY rush.json /app/

# shared tooling libraries
COPY packages/build-tooling/package.json /app/packages/build-tooling/
COPY packages/build-tooling/cli/cli.js /app/packages/build-tooling/cli/cli.js

COPY packages/@pseudo-su/flex-elements/package.json /app/packages/@pseudo-su/flex-elements/
COPY packages/libs/design-system/package.json /app/packages/libs/design-system/
COPY packages/libs/features/package.json /app/packages/libs/features/
COPY packages/libs/base-service-config/package.json /app/packages/libs/base-service-config/
COPY packages/@ssr-kit/runtime/package.json /app/packages/@ssr-kit/runtime/
COPY packages/@ssr-kit/toolbox/package.json /app/packages/@ssr-kit/toolbox/

COPY packages/services/web-components/package.json /app/packages/services/web-components/
COPY packages/services/web-api-proxy/package.json /app/packages/services/web-api-proxy/
COPY packages/services/web-crates-io/package.json /app/packages/services/web-crates-io/
COPY packages/services/web-rust-lang/package.json /app/packages/services/web-rust-lang/

# Rush config
COPY common /app/common

RUN node ./common/scripts/install-run-rush.js install

# Only build the server project with the "builder" as base

CMD ["true"]
