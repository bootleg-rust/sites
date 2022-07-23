#!/usr/bin/env bash

set -eo pipefail

if [[ `git status --porcelain` ]]; then
  echo "ERROR: uncommited changes detected!";
  git status --porcelain;
  exit 1;
else
  echo "SUCCESS: No uncommited changes detected";
fi
