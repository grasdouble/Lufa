#!/usr/bin/env bash
set -euo pipefail

# This script copies the latest generated maps from the design system packages
# to the VSCode extension source folder for bundling.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"

PRIMITIVES_SRC="$PACKAGE_DIR/../../../design-system/primitives/dist/primitives.map.json"
TOKENS_SRC="$PACKAGE_DIR/../../../design-system/tokens/dist/tokens.map.json"

PRIMITIVES_DEST="$PACKAGE_DIR/src/defaultMap/default-primitives.map.json"
TOKENS_DEST="$PACKAGE_DIR/src/defaultMap/default-tokens.map.json"

echo "Copying maps from design system packages..."

if [ ! -f "$PRIMITIVES_SRC" ]; then
  echo "❌ Error: Primitives map not found at: $PRIMITIVES_SRC"
  echo "   Run: pnpm --filter @grasdouble/lufa_design-system-primitives build"
  exit 1
fi

if [ ! -f "$TOKENS_SRC" ]; then
  echo "❌ Error: Tokens map not found at: $TOKENS_SRC"
  echo "   Run: pnpm --filter @grasdouble/lufa_design-system-tokens build"
  exit 1
fi

cp "$PRIMITIVES_SRC" "$PRIMITIVES_DEST"
echo "✓ Copied primitives map"

cp "$TOKENS_SRC" "$TOKENS_DEST"
echo "✓ Copied tokens map"

echo "✓ All maps copied successfully"
