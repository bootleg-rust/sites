FROM node-builder-base:18.6-alpine as web-crates-io-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/services/web-crates-io && \
    node ../../../common/scripts/install-run-rushx.js build

# Our minimal node server image
FROM node:18.6-alpine as server

WORKDIR /app/packages/services/web-crates-io

ENV NODE_ENV production

COPY --from=web-crates-io-builder /app/packages/services/web-crates-io/build/ /app/packages/services/web-crates-io/build/

CMD [ "node", "./build/server.js" ]
