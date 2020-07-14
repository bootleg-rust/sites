# web-crates-io

```sh
docker build -t web-crates-io -f Dockerfile ../..
docker run -it --init -p 8080:8080 \
  -e ENV=dev \
  web-crates-io
```
