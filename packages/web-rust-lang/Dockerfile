FROM node-builder-base:12.16.3-alpine as web-rust-lang-builder

COPY packages/ /app/packages/

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-rust-lang && \
    node ../../common/scripts/install-run-rushx.js build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-rust-lang

ENV NODE_ENV production

COPY --from=web-rust-lang-builder /app/packages/web-rust-lang/build/ /app/packages/web-rust-lang/build/

CMD [ "node", "./build/server.js" ]
