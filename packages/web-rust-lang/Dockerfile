FROM builder-base as web-rust-lang-builder

COPY packages/ /app/packages/

# TODO: add these if necessary
# COPY packages/lib-design-system/ /app/packages/lib-design-system
# COPY packages/lib-features/ /app/packages/lib-features
# COPY packages/lib-ssr-runtime/ /app/packages/lib-ssr-runtime
# COPY packages/lib-ssr-toolbox/ /app/packages/lib-ssr-toolbox
# COPY packages/lib-config/ /app/packages/lib-config

RUN node ./common/scripts/install-run-rush.js install

RUN cd packages/web-rust-lang && \
    node ../../common/scripts/install-run-rushx.js build --purge

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-rust-lang

ENV NODE_ENV production

COPY --from=web-rust-lang-builder /app/packages/web-rust-lang/build/ /app/packages/web-rust-lang/build/

CMD [ "node", "./build/server.js" ]
