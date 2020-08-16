# Setting up Networking HTTPS Load balancer for Cloud run services

Each `web-*` package is deployed as a Cloud Run service with a HTTPS Load Balancer in front. The Load balancer in front of the services is required in order to enable things like CDN support when the Cloud Run services return `Cache-Control` headers.

This document explains current process for setting up and managing the GCP networking. Ideally this would be done in terraform but it is currently manual.

GCP Documentation is [here](https://cloud.google.com/load-balancing/docs/negs/setting-up-serverless-negs#console_1)

## Create from scratch

Make sure to activate the right gcloud environment you want first (EG. dev | prod)

```sh
gcloud config configurations activate $ENV
```

Create a backend with a "Network Endpoint Group" (NEG) for each cloud run service

```sh
export CLOUD_RUN_SERVICE=web-rust-lang
export REGION=asia-northeast1

# Create the serverless "Network Endpoint Group" (NEG)
gcloud beta compute network-endpoint-groups create $CLOUD_RUN_SERVICE-serverless-neg \
    --region=$REGION \
    --network-endpoint-type=SERVERLESS  \
    --cloud-run-service=$CLOUD_RUN_SERVICE

# Create the backend service and enable cdn
gcloud compute backend-services create $CLOUD_RUN_SERVICE-backend-service \
    --enable-cdn \
    --global

# Add the serverless NEG as a backend to the backend service
gcloud beta compute backend-services add-backend $CLOUD_RUN_SERVICE-backend-service \
    --global \
    --network-endpoint-group=$CLOUD_RUN_SERVICE-serverless-neg \
    --network-endpoint-group-region=$REGION
```

Create a URL map that we will later associate all the backends with

```sh
# TDODO: maybe this should actually be a static bucket fallback for when no services are matched.
export DEFAULT_CLOUD_RUN_SERVICE=web-rust-lang

# Add a url-map to target cloud run
gcloud compute url-maps create bootleg-rust-sites-https-url-map \
    --default-service $DEFAULT_CLOUD_RUN_SERVICE-backend-service \
    --global
```

Setup Host and Path matching rules for each cloud run service

```sh
export CLOUD_RUN_SERVICE=web-rust-lang
export PUBLIC_HOST=dev.bootleg-rust-lang.org

# add path-matcher to url-map for routing to cloud run
gcloud compute url-maps add-path-matcher bootleg-rust-sites-https-url-map \
  --default-service=$CLOUD_RUN_SERVICE-backend-service \
  --path-matcher-name=$CLOUD_RUN_SERVICE-path-matcher \
  --new-hosts=$PUBLIC_HOST \
  --description="Route all $PUBLIC_HOST traffic to the $CLOUD_RUN_SERVICE cloud run service" \
  --global
```

Setup `https-proxy` that maps to a public IP address and forwards to the `url-map`.

```sh
export ALL_PUBLIC_HOSTS=dev.bootleg-crates.io,api.dev.bootleg-crates.io,dev.bootleg-rust-lang.org,components.dev.bootleg-rust-lang.org

# Create a google managed SSL Certificate
gcloud compute ssl-certificates create bootleg-rust-sites-0 \
    --description="Dev SSL certificate for bootleg-rust" \
    --domains=$ALL_PUBLIC_HOSTS \
    --global

# Create a URL map to redirect http traffic to https
gcloud compute url-maps import bootleg-rust-sites-http-url-map \
   --source ./docs/assets/http-redirect-url-map.yaml \
   --global

# Create a target HTTPS proxy to route requests to the url-map
gcloud compute target-https-proxies create bootleg-rust-sites-https-proxy \
    --ssl-certificates=bootleg-rust-sites-0 \
    --url-map=bootleg-rust-sites-https-url-map \
    --global

# Create a target HTTP proxy to route requests to the url-map
gcloud compute target-http-proxies create bootleg-rust-sites-http-proxy \
   --url-map=bootleg-rust-sites-http-url-map \
   --global


# OPTIONAL: 💡 May want to create a static IP addresses for these but it costs roughly
# $10 AUD p/month each 😢

# NOTE: each `https-content-rule` costs roughly $19 p/month each 😢

# Create a global forwarding rule to route incoming requests to the proxy.
gcloud compute forwarding-rules create https-content-rule \
    --address=<optional static IP address> \
    --target-https-proxy=bootleg-rust-sites-https-proxy \
    --global \
    --ports=443

# OPTIONAL: redirect http traffic to https
gcloud compute forwarding-rules create http-content-rule \
    --address=<optional static IP address> \
    --target-http-proxy=bootleg-rust-sites-http-proxy \
    --global \
    --ports=80

# ⚠️ Update your DNS settings for each domain to have an A Record that points
# to the IP Address of the https-content-rule

# ⏳ May take up to 30 minutes until after the ssl-certificate becomes "ACTIVE" for it to work

```

## Updating the SSL certificate

It's not possible to edit `gcloud compute ssl-certificates` so when it needs to be updated/changed you need to create a new one and update the `target-https-proxies`.

GCP Documentation is [here](https://cloud.google.com/load-balancing/docs/ssl-certificates/google-managed-certs#replace-ssl)

```sh
export ALL_PUBLIC_HOSTS=dev.bootleg-crates.io,api.dev.bootleg-crates.io,dev.bootleg-rust-lang.org,components.dev.bootleg-rust-lang.org

# Create a new ssl-cerificate
gcloud compute ssl-certificates create bootleg-rust-sites-1 \
    --description="Dev SSL certificate for bootleg-rust" \
    --domains=$ALL \
    --global

# Update the target-https-proxy with both ssl-cerificates
gcloud compute target-https-proxies update bootleg-rust-sites-https-proxy \
    --ssl-certificates=bootleg-rust-sites-0,bootleg-rust-sites-1

# ⏳ Wait 30 minutes after the ssl-certificate becomes "ACTIVE"

# Update the target-https-proxy to remove the old ssl-certificate
gcloud compute target-https-proxies update bootleg-rust-sites-https-proxy \
    --ssl-certificates=bootleg-rust-sites-1

# ⏳ Wait 10 minutes to ensure the LB is only using the new certificate

# Delete the old certificate
gcloud compute ssl-certificates delete bootleg-rust-sites-0
```
