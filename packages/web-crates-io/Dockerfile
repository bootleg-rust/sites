FROM builder-base as web-crates-io-builder

COPY packages/ /app/packages/

RUN cd packages/web-crates-io && \
    yarn build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-crates-io

ENV NODE_ENV production

COPY --from=web-crates-io-builder /app/packages/web-crates-io/build/ /app/packages/web-crates-io/build/

CMD [ "node", "./build/server.js" ]
