FROM node-builder-base:14.15-alpine as web-components-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/services/web-components && \
    node ../../../common/scripts/install-run-rushx.js build
# Our minimal node server image
FROM node:14.15-alpine as server

WORKDIR /app/packages/services/web-components

ENV NODE_ENV production

COPY --from=web-components-builder /app/packages/services/web-components/build/ /app/packages/services/web-components/build/

CMD [ "node", "./build/server.js" ]
