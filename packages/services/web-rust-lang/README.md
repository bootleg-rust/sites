# web-rust-lang

```sh
docker build --progress=plain -t web-rust-lang -f Dockerfile ../..;
docker run -it --init -p 8080:8080 \
  -e ENV=dev \
  web-rust-lang;
```
