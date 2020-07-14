#!/usr/bin/env bash

set -euo pipefail

if [ "$ENV" != "prod" ]; then
  open https://$ENV.bootleg-crates.io
  open https://$ENV.bootleg-rust-lang.org
  open https://components.$ENV.bootleg-rust-lang.org
else
  open https://bootleg-crates.io
  open https://bootleg-rust-lang.org
  open https://components.bootleg-rust-lang.org
fi
