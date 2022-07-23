#!/usr/bin/env bash

set -eo pipefail

SKIP_PLANTUML_DIAGRAM_OUTPUT="${SKIP_PLANTUML_DIAGRAM_OUTPUT:-false}";
SKIP_PLANTUML_MANIFEST_OUTPUT="${SKIP_PLANTUML_MANIFEST_OUTPUT:-false}";

set -eou pipefail


generate_plantuml_png () {
  local full_file_path=$1
  local file_base_a="${full_file_path%.*}"
  local file_base="${file_base_a#*docs/}"
  local file_suffix=png

  local output="./docs/$file_base.$file_suffix"
  echo "Building: $full_file_path -> $output"

  java -jar ./tools/plantuml.jar -verbose -checkmetadata $full_file_path
}

if [[ "$SKIP_PLANTUML_DIAGRAM_OUTPUT" != "true" ]]; then
  export -f generate_plantuml_png

  find ./docs -type f -name '*.puml' | xargs -n1 -P2 bash -c 'generate_plantuml_png "$@"' _
fi

if [[ "$SKIP_PLANTUML_MANIFEST_OUTPUT" != "true" ]]; then
  sha1sum ./docs/**.puml > ./docs/plantuml.digest || true
  sha1sum ./docs/**/**.puml >> ./docs/plantuml.digest || true
  sha1sum ./docs/**/**/**.puml >> ./docs/plantuml.digest || true
fi
