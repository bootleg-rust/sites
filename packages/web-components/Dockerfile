FROM node-builder-base:14.15-alpine as web-components-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-components && \
    node ../../common/scripts/install-run-rushx.js build
# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-components

ENV NODE_ENV production

COPY --from=web-components-builder /app/packages/web-components/build/ /app/packages/web-components/build/

CMD [ "node", "./build/server.js" ]
