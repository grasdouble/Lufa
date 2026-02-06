#!/usr/bin/env bash

# Script to manually compress all Playwright snapshots
# Useful after updating snapshots with --update-snapshots
# Uses oxipng for lossless PNG optimization

set -e

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Navigate to the Playwright package directory (parent of scripts/)
PACKAGE_DIR="$(dirname "$SCRIPT_DIR")"

SNAPSHOTS_DIR="$PACKAGE_DIR/__snapshots__"

# Check if snapshots directory exists
if [ ! -d "$SNAPSHOTS_DIR" ]; then
  echo "❌ No Playwright snapshots directory found at $SNAPSHOTS_DIR"
  exit 1
fi

# Check if oxipng is installed
if ! command -v oxipng &> /dev/null; then
  echo "❌ oxipng is not installed. Install it with:"
  echo "    brew install oxipng  (macOS)"
  echo "    cargo install oxipng (Rust)"
  echo "    Or download from: https://github.com/shssoichiro/oxipng/releases"
  exit 1
fi

echo "🖼️  Compressing all Playwright snapshots in $SNAPSHOTS_DIR..."

# Find all PNG files
PNG_FILES=$(find "$SNAPSHOTS_DIR" -type f -name "*.png")

if [ -z "$PNG_FILES" ]; then
  echo "ℹ️  No PNG snapshots found"
  exit 0
fi

# Count files
SNAPSHOT_COUNT=$(echo "$PNG_FILES" | wc -l | xargs)
echo "📦 Found $SNAPSHOT_COUNT snapshot(s) to compress"

# Compress each snapshot
COMPRESSED_COUNT=0
TOTAL_BEFORE=0
TOTAL_AFTER=0

while IFS= read -r file; do
  if [ -f "$file" ]; then
    # Get file size before compression
    SIZE_BEFORE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    TOTAL_BEFORE=$((TOTAL_BEFORE + SIZE_BEFORE))
    
    # Compress with oxipng
    # -o 6: Maximum compression (slower but best results for manual compression)
    # -o 3: Moderate compression (faster but still effective)
    # --strip safe: Remove safe-to-remove metadata (keeps pHYs, sRGB, etc.)
    # --quiet: Suppress output
    # Using --preserve to maintain file attributes
    oxipng -o 3 --strip safe --quiet --preserve "$file" 2>/dev/null || {
      echo "⚠️  Warning: Failed to compress $file, continuing..."
      continue
    }
    
    # Get file size after compression
    SIZE_AFTER=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    TOTAL_AFTER=$((TOTAL_AFTER + SIZE_AFTER))
    
    COMPRESSED_COUNT=$((COMPRESSED_COUNT + 1))
    
    # Show individual file savings
    if [ $SIZE_BEFORE -gt 0 ]; then
      SAVED=$((SIZE_BEFORE - SIZE_AFTER))
      if [ $SAVED -gt 0 ]; then
        PERCENT=$((SAVED * 100 / SIZE_BEFORE))
        echo "  ✓ $(basename "$file"): $(numfmt --to=iec-i --suffix=B $SIZE_BEFORE 2>/dev/null || echo "${SIZE_BEFORE}B") → $(numfmt --to=iec-i --suffix=B $SIZE_AFTER 2>/dev/null || echo "${SIZE_AFTER}B") (saved ${PERCENT}%)"
      else
        echo "  ✓ $(basename "$file"): Already optimized"
      fi
    fi
  fi
done <<< "$PNG_FILES"

# Summary
echo ""
if [ $COMPRESSED_COUNT -gt 0 ]; then
  TOTAL_SAVED=$((TOTAL_BEFORE - TOTAL_AFTER))
  if [ $TOTAL_BEFORE -gt 0 ] && [ $TOTAL_SAVED -gt 0 ]; then
    TOTAL_PERCENT=$((TOTAL_SAVED * 100 / TOTAL_BEFORE))
    echo "✅ Processed $COMPRESSED_COUNT snapshot(s)"
    echo "💾 Total savings: $(numfmt --to=iec-i --suffix=B $TOTAL_SAVED 2>/dev/null || echo "${TOTAL_SAVED}B") (${TOTAL_PERCENT}%)"
    echo "📊 Before: $(numfmt --to=iec-i --suffix=B $TOTAL_BEFORE 2>/dev/null || echo "${TOTAL_BEFORE}B") → After: $(numfmt --to=iec-i --suffix=B $TOTAL_AFTER 2>/dev/null || echo "${TOTAL_AFTER}B")"
  else
    echo "✅ Processed $COMPRESSED_COUNT snapshot(s)"
    echo "ℹ️  All snapshots were already optimized"
  fi
else
  echo "ℹ️  No snapshots needed compression"
fi

exit 0
