# Domain mapping reset

- ghs.googlehosted.com.

## Dev

```sh
gcloud beta run domain-mappings delete --domain dev.bootleg-crates.io
gcloud beta run domain-mappings delete --domain dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --domain components.dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --domain api.dev.bootleg-crates.io

gcloud beta run domain-mappings create --service web-crates-io --domain dev.bootleg-crates.io
gcloud beta run domain-mappings create --service web-rust-lang --domain dev.bootleg-rust-lang.org
gcloud beta run domain-mappings create --service web-components --domain components.dev.bootleg-rust-lang.org
gcloud beta run domain-mappings create --service web-api-proxy --domain api.dev.bootleg-crates.io
```

## Prod

```sh
gcloud beta run domain-mappings delete --domain dev.bootleg-crates.io
gcloud beta run domain-mappings delete --domain dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --domain components.dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --domain api.dev.bootleg-crates.io

gcloud beta run domain-mappings create --service web-crates-io --domain bootleg-crates.io
gcloud beta run domain-mappings create --service web-rust-lang --domain bootleg-rust-lang.org
gcloud beta run domain-mappings create --service web-components --domain components.bootleg-rust-lang.org
gcloud beta run domain-mappings create --service web-api-proxy --domain api.bootleg-crates.io
```
