#!/usr/bin/env bash
set -euo pipefail

OUT=${1:-deploy.tar.gz}
echo "Packaging production build into $OUT"

if [ -f "$OUT" ]; then
  rm -f "$OUT"
fi

echo "Running: npm ci --production"
npm ci --production

echo "Running: npm run build"
npm run build

FILES=(.next public package.json package-lock.json node_modules scripts shims postcss.config.cjs postcss.config.js next.config.ts app.js tina)

TOPACK=()
for f in "${FILES[@]}"; do
  if [ -e "$f" ]; then
    TOPACK+=("$f")
  fi
done

if [ ${#TOPACK[@]} -eq 0 ]; then
  echo "No files found to package" >&2
  exit 1
fi

echo "Compressing: ${TOPACK[*]}"
tar -czf "$OUT" "${TOPACK[@]}"

echo "Created $OUT"
