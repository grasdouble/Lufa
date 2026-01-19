#!/usr/bin/env bash

# Script to compress Playwright snapshots before committing
# Uses oxipng for lossless PNG optimization
# 
# Called by lint-staged with list of staged snapshot files as arguments
# Usage: compress-snapshots-precommit.sh <file1> <file2> ...

set -e

# Check if oxipng is installed
if ! command -v oxipng &> /dev/null; then
  echo "⚠️  oxipng is not installed. Install it with:"
  echo "    brew install oxipng  (macOS)"
  echo "    cargo install oxipng (Rust)"
  echo "    Or download from: https://github.com/shssoichiro/oxipng/releases"
  exit 0
fi

# Get files from arguments (passed by lint-staged)
FILES=("$@")

# If no files provided, exit gracefully
if [ ${#FILES[@]} -eq 0 ]; then
  echo "ℹ️  No Playwright snapshot images to compress"
  exit 0
fi

echo "🖼️  Compressing Playwright snapshots..."
echo "📦 Found ${#FILES[@]} snapshot(s) to compress"

# Compress each snapshot
COMPRESSED_COUNT=0
TOTAL_BEFORE=0
TOTAL_AFTER=0

for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    # Get file size before compression
    SIZE_BEFORE=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0)
    TOTAL_BEFORE=$((TOTAL_BEFORE + SIZE_BEFORE))
    
    # Compress with oxipng
    # -o 3: Good balance between speed and compression (filter brute-force)
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
      PERCENT=$((SAVED * 100 / SIZE_BEFORE))
      echo "  ✓ $(basename "$file"): $(numfmt --to=iec-i --suffix=B $SIZE_BEFORE 2>/dev/null || echo "${SIZE_BEFORE}B") → $(numfmt --to=iec-i --suffix=B $SIZE_AFTER 2>/dev/null || echo "${SIZE_AFTER}B") (saved ${PERCENT}%)"
    fi
  fi
done

# Summary
if [ $COMPRESSED_COUNT -gt 0 ]; then
  TOTAL_SAVED=$((TOTAL_BEFORE - TOTAL_AFTER))
  if [ $TOTAL_BEFORE -gt 0 ]; then
    TOTAL_PERCENT=$((TOTAL_SAVED * 100 / TOTAL_BEFORE))
    echo ""
    echo "✅ Compressed $COMPRESSED_COUNT snapshot(s)"
    echo "💾 Total savings: $(numfmt --to=iec-i --suffix=B $TOTAL_SAVED 2>/dev/null || echo "${TOTAL_SAVED}B") (${TOTAL_PERCENT}%)"
  else
    echo "✅ Compressed $COMPRESSED_COUNT snapshot(s)"
  fi
else
  echo "ℹ️  No snapshots needed compression"
fi

exit 0
