# web-api-proxy

```sh
docker build --progress=plain -t web-api-proxy -f Dockerfile ../..;
docker run -it --init -p 8080:8080 \
  -e ENV=dev \
  web-api-proxy;
```
