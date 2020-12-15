FROM node-builder-base:12.16.3-alpine as web-crates-io-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-crates-io && \
    node ../../common/scripts/install-run-rushx.js build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-crates-io

ENV NODE_ENV production

COPY --from=web-crates-io-builder /app/packages/web-crates-io/build/ /app/packages/web-crates-io/build/

CMD [ "node", "./build/server.js" ]
