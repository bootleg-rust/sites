FROM node-builder-base:14.15-alpine as web-rust-lang-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-rust-lang && \
    node ../../common/scripts/install-run-rushx.js build

# Our minimal node server image
FROM node:14.15-alpine as server

WORKDIR /app/packages/web-rust-lang

ENV NODE_ENV production

COPY --from=web-rust-lang-builder /app/packages/web-rust-lang/build/ /app/packages/web-rust-lang/build/

CMD [ "node", "./build/server.js" ]
