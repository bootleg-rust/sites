FROM node-builder-base:14.15-alpine as web-api-proxy-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-api-proxy && \
    node ../../common/scripts/install-run-rushx.js build

# Our minimal node server image
FROM node:14.15-alpine as server

WORKDIR /app/packages/web-api-proxy

ENV NODE_ENV production

COPY --from=web-api-proxy-builder /app/packages/web-api-proxy/build/ /app/packages/web-api-proxy/build/

CMD [ "node", "./build/server.js" ]
