#!/usr/bin/env bash

echo "INFO: listing node_modules";
find . -name "node_modules" -type d -prune | xargs du -chs;

echo "INFO: removing node_modules";
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +;

echo "INFO: finished removing node_modules";

# TODO: install with rush
