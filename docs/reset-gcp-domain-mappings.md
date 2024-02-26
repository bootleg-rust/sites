# Domain mapping reset

- ghs.googlehosted.com.

## Dev

```sh
gcloud beta run domain-mappings delete --region asia-northeast1 --domain dev.bootleg-crates.io
gcloud beta run domain-mappings delete --region asia-northeast1 --domain dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --region asia-northeast1 --domain components.dev.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --region asia-northeast1 --domain api.dev.bootleg-crates.io

gcloud beta run domain-mappings create --region asia-northeast1 --service web-crates-io --domain dev.bootleg-crates.io
gcloud beta run domain-mappings create --region asia-northeast1 --service web-rust-lang --domain dev.bootleg-rust-lang.org
gcloud beta run domain-mappings create --region asia-northeast1 --service web-components --domain components.dev.bootleg-rust-lang.org
gcloud beta run domain-mappings create --region asia-northeast1 --service web-api-proxy --domain api.dev.bootleg-crates.io
```

## Prod

```sh
gcloud beta run domain-mappings delete --region asia-northeast1 --domain bootleg-crates.io
gcloud beta run domain-mappings delete --region asia-northeast1 --domain bootleg-rust-lang.org
gcloud beta run domain-mappings delete --region asia-northeast1 --domain components.bootleg-rust-lang.org
gcloud beta run domain-mappings delete --region asia-northeast1 --domain api.bootleg-crates.io

gcloud beta run domain-mappings create --region asia-northeast1 --service web-crates-io --domain bootleg-crates.io
gcloud beta run domain-mappings create --region asia-northeast1 --service web-rust-lang --domain bootleg-rust-lang.org
gcloud beta run domain-mappings create --region asia-northeast1 --service web-components --domain components.bootleg-rust-lang.org
gcloud beta run domain-mappings create --region asia-northeast1 --service web-api-proxy --domain api.bootleg-crates.io
```
