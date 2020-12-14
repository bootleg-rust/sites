#!/usr/bin/env bash

set -euo pipefail

function stop_port_process () {
  declare port="$1"
  declare process=$(lsof -ti tcp:$port)
  # lsof -ti tcp:$port | xargs kill;
  if [ -n "$process" ]; then
    echo "Killin process '$process' on port '$port'"
    kill "$process"
  else
    echo "No process on port $port"
  fi
}

# web-rust-lang
stop_port_process 4000;
stop_port_process 4100;

# web-crates-io
stop_port_process 4001;
stop_port_process 4101;

# web-component
stop_port_process 4050;
stop_port_process 4150;

# API
stop_port_process 8000;
stop_port_process 8100;
