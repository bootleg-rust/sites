FROM builder-base as web-components-builder

COPY packages/ /app/packages/

RUN cd packages/web-components && \
    rushx build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-components

ENV NODE_ENV production

COPY --from=web-components-builder /app/packages/web-components/build/ /app/packages/web-components/build/

CMD [ "node", "./build/server.js" ]
