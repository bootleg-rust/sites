#!/usr/bin/env bash

set -eo pipefail

log() { echo "$@" 1>&2; }

running_containers=`docker ps -q`
if [[ "$running_containers" ]]; then
  log "Stopping containers: $running_containers";
  docker kill $running_containers
fi

containers=`docker ps -a -q`
if [[ "$containers" ]]; then
  log "Removing containers $containers";
  docker rm $containers
fi
