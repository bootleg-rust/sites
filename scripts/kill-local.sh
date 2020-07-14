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

stop_port_process 4001;
stop_port_process 4003;
stop_port_process 4005;

stop_port_process 4101;
stop_port_process 4103;
stop_port_process 4105;

stop_port_process 4040;
stop_port_process 4041;

