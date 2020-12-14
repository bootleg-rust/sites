FROM builder-base as web-api-proxy-builder

COPY packages/ /app/packages/

RUN cd packages/web-api-proxy && \
    rushx build

# Our minimal node server image
FROM node as server

WORKDIR /app/packages/web-api-proxy

ENV NODE_ENV production

COPY --from=web-api-proxy-builder /app/packages/web-api-proxy/build/ /app/packages/web-api-proxy/build/

CMD [ "node", "./build/server.js" ]
