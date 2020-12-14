FROM builder-base as web-rust-lang-builder

COPY packages/ /app/packages/

RUN cd packages/web-rust-lang && \
    rushx build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-rust-lang

ENV NODE_ENV production

COPY --from=web-rust-lang-builder /app/packages/web-rust-lang/build/ /app/packages/web-rust-lang/build/

CMD [ "node", "./build/server.js" ]
