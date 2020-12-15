#!/usr/bin/env bash

set -euo pipefail

if [ "$ENV" != "prod" ]; then
  open https://$ENV.bootleg-rust-lang.org
  open https://$ENV.bootleg-crates.io
  open https://components.$ENV.bootleg-rust-lang.org
  open https://api.$ENV.bootleg-crates.io/api/v1/summary
else
  open https://bootleg-rust-lang.org
  open https://bootleg-crates.io
  open https://components.bootleg-rust-lang.org
  open https://api.bootleg-crates.io/api/v1/summary
fi
