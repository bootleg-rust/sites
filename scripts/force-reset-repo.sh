#!/usr/bin/env bash

echo "INFO: removing ./common/temp";
rm -rf ./common/temp

echo "INFO: listing node_modules";
find . -name "node_modules" -type d -prune | xargs du -chs;

echo "INFO: removing node_modules";
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +;

echo "INFO: finished removing node_modules";


echo "INFO: listing .rush folders";
find . -name ".rush" -type d -prune | xargs du -chs;

echo "INFO: removing .rush folders";
find . -name ".rush" -type d -prune -exec rm -rf '{}' +;

echo "INFO: finished removing node_modules";

rush update;
