#!/bin/bash
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
ERRORS=0
WARNINGS=0

echo -e "${BLUE}🔍 Validating AI documentation consistency...${NC}"
echo ""

# ============================================================================
# 1. Verify three-layer architecture consistency
# ============================================================================
echo -e "${BLUE}Checking three-layer architecture consistency...${NC}"

# Extract architecture sections (lines containing Layer definitions)
ARCH_AGENTS=$(grep -A 3 "Layer 3: Components" AGENTS.md 2>/dev/null || echo "")
ARCH_CLAUDE=$(grep -A 3 "Layer 3: Components" CLAUDE.md 2>/dev/null || echo "")
ARCH_COPILOT=$(grep -A 3 "Layer 3: Components" .github/copilot-instructions.md 2>/dev/null || echo "")

if [ -z "$ARCH_AGENTS" ] || [ -z "$ARCH_CLAUDE" ] || [ -z "$ARCH_COPILOT" ]; then
  echo -e "${RED}❌ ERROR: Three-layer architecture section missing in one or more files${NC}"
  echo "   Files: AGENTS.md, CLAUDE.md, .github/copilot-instructions.md"
  ERRORS=$((ERRORS + 1))
else
  # Check that key concepts are present in all files
  if echo "$ARCH_AGENTS" | grep -q "Layer 3: Components" && \
     echo "$ARCH_CLAUDE" | grep -q "Layer 3: Components" && \
     echo "$ARCH_COPILOT" | grep -q "Layer 3: Components"; then
    echo -e "${GREEN}✅ Three-layer architecture present in all files${NC}"
  else
    echo -e "${RED}❌ ERROR: Three-layer architecture differs between files${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

# ============================================================================
# 2. Verify critical rules consistency
# ============================================================================
echo ""
echo -e "${BLUE}Checking critical rules consistency...${NC}"

# Check that all files mention the critical rule about tokens only
TOKENS_AGENTS=$(grep -c "@grasdouble/lufa_design-system-tokens" AGENTS.md 2>/dev/null | tr -d '\n\r ' || echo "0")
TOKENS_CLAUDE=$(grep -c "@grasdouble/lufa_design-system-tokens" CLAUDE.md 2>/dev/null | tr -d '\n\r ' || echo "0")
TOKENS_COPILOT=$(grep -c "@grasdouble/lufa_design-system-tokens" .github/copilot-instructions.md 2>/dev/null | tr -d '\n\r ' || echo "0")

if [ "${TOKENS_AGENTS:-0}" -eq 0 ] || [ "${TOKENS_CLAUDE:-0}" -eq 0 ] || [ "${TOKENS_COPILOT:-0}" -eq 0 ]; then
  echo -e "${RED}❌ ERROR: Token package reference missing in one or more files${NC}"
  echo "   AGENTS.md: $TOKENS_AGENTS mentions"
  echo "   CLAUDE.md: $TOKENS_CLAUDE mentions"
  echo "   copilot-instructions.md: $TOKENS_COPILOT mentions"
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✅ Token package referenced in all files${NC}"
fi

# Check that all files mention NOT importing primitives
PRIMITIVES_AGENTS=$(grep -cE "NOT.*primitives|NO primitives|MUST NOT.*primitives" AGENTS.md 2>/dev/null | tr -d '\n\r ' || echo "0")
PRIMITIVES_CLAUDE=$(grep -cE "NOT.*primitives|NO primitives|MUST NOT.*primitives" CLAUDE.md 2>/dev/null | tr -d '\n\r ' || echo "0")
PRIMITIVES_COPILOT=$(grep -cE "NOT.*primitives|NO primitives|MUST NOT.*primitives" .github/copilot-instructions.md 2>/dev/null | tr -d '\n\r ' || echo "0")

if [ "${PRIMITIVES_AGENTS:-0}" -eq 0 ] || [ "${PRIMITIVES_CLAUDE:-0}" -eq 0 ] || [ "${PRIMITIVES_COPILOT:-0}" -eq 0 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Primitives restriction not clearly stated in all files${NC}"
  echo "   AGENTS.md: $PRIMITIVES_AGENTS mentions"
  echo "   CLAUDE.md: $PRIMITIVES_CLAUDE mentions"
  echo "   copilot-instructions.md: $PRIMITIVES_COPILOT mentions"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✅ Primitives restrictions documented in all files${NC}"
fi

# ============================================================================
# 3. Verify build commands consistency
# ============================================================================
echo ""
echo -e "${BLUE}Checking build commands consistency...${NC}"

# Check for build order commands
BUILD_COMMANDS=("pnpm ds:tokens:build" "pnpm ds:primitives:build" "pnpm ds:main:build" "pnpm ds:all:build")
BUILD_CONSISTENT=true

for cmd in "${BUILD_COMMANDS[@]}"; do
  AGENTS_HAS=$(grep -c "$cmd" AGENTS.md 2>/dev/null || echo "0")
  CLAUDE_HAS=$(grep -c "$cmd" CLAUDE.md 2>/dev/null || echo "0")
  COPILOT_HAS=$(grep -c "$cmd" .github/copilot-instructions.md 2>/dev/null || echo "0")

  if [ "$AGENTS_HAS" -eq 0 ] || [ "$CLAUDE_HAS" -eq 0 ] || [ "$COPILOT_HAS" -eq 0 ]; then
    echo -e "${RED}❌ ERROR: Build command '$cmd' missing in one or more files${NC}"
    echo "   AGENTS.md: $AGENTS_HAS | CLAUDE.md: $CLAUDE_HAS | copilot: $COPILOT_HAS"
    ERRORS=$((ERRORS + 1))
    BUILD_CONSISTENT=false
  fi
done

if [ "$BUILD_CONSISTENT" = true ]; then
  echo -e "${GREEN}✅ Build commands consistent across all files${NC}"
fi

# ============================================================================
# 4. Verify YAML frontmatter validity
# ============================================================================
echo ""
echo -e "${BLUE}Validating YAML frontmatter in .instructions.md files...${NC}"

YAML_VALID=true

for file in .github/instructions/*.instructions.md; do
  if [ ! -f "$file" ]; then
    continue
  fi

  # Extract frontmatter (only the first block between --- and ---)
  # Use awk to stop after first closing ---
  FRONTMATTER=$(awk '/^---$/{if(++count==1) next; if(count==2) exit} count==1' "$file")

  # Skip if no frontmatter found
  if [ -z "$FRONTMATTER" ]; then
    continue
  fi

  # Check for unsupported fields (anything not description, applyTo, name, or empty lines)
  UNSUPPORTED=$(echo "$FRONTMATTER" | grep -Ev "^(description:|applyTo:|name:|[[:space:]]*$)" || true)

  if [ -n "$UNSUPPORTED" ]; then
    echo -e "${YELLOW}⚠️  WARNING: Unsupported YAML field in $(basename "$file")${NC}"
    echo "   GitHub Copilot only supports: description, applyTo, name"
    echo "   Found: $UNSUPPORTED"
    WARNINGS=$((WARNINGS + 1))
    YAML_VALID=false
  fi
done

if [ "$YAML_VALID" = true ]; then
  echo -e "${GREEN}✅ All YAML frontmatter valid${NC}"
fi

# ============================================================================
# 5. Verify markdown links
# ============================================================================
echo ""
echo -e "${BLUE}Checking markdown links...${NC}"

LINKS_VALID=true

for file in AGENTS.md CLAUDE.md .github/copilot-instructions.md config.toml; do
  if [ ! -f "$file" ]; then
    continue
  fi

  # Get the directory of the file being checked
  FILE_DIR=$(dirname "$file")

  # Extract relative links (not starting with http)
  if [[ "$file" == *.toml ]]; then
    # For TOML files, extract paths in quotes after '='
    LINKS=$(grep -oP '(?<=")[^"]+\.md(?=")' "$file" 2>/dev/null || true)
  else
    # For markdown files, extract from []() syntax
    LINKS=$(grep -oP '\[.*?\]\(\K[^)]+(?=\))' "$file" 2>/dev/null | grep -v "^http" || true)
  fi

  for link in $LINKS; do
    # Remove anchor
    FILEPATH=$(echo "$link" | sed 's/#.*//')

    # Skip empty paths or directory-only links (ending with /)
    if [ -z "$FILEPATH" ] || [[ "$FILEPATH" == */ ]]; then
      # Check if directory exists
      if [ -n "$FILEPATH" ]; then
        RESOLVED_PATH="$FILE_DIR/$FILEPATH"
        if [ ! -d "$RESOLVED_PATH" ]; then
          echo -e "${RED}❌ ERROR: Broken directory link in $file: $link${NC}"
          ERRORS=$((ERRORS + 1))
          LINKS_VALID=false
        fi
      fi
      continue
    fi

    # Resolve the path relative to the file's directory
    RESOLVED_PATH="$FILE_DIR/$FILEPATH"

    # Normalize the path (handles ../ and ./)
    # Use realpath if available, otherwise use readlink -f, or fall back to manual normalization
    if command -v realpath >/dev/null 2>&1; then
      # Linux (realpath with -m for non-existent paths)
      NORMALIZED_PATH=$(realpath -m "$RESOLVED_PATH" 2>/dev/null || realpath "$RESOLVED_PATH" 2>/dev/null || echo "$RESOLVED_PATH")
    elif command -v readlink >/dev/null 2>&1; then
      # macOS (readlink without -f for non-existent paths, so we use a fallback)
      NORMALIZED_PATH=$(readlink -f "$RESOLVED_PATH" 2>/dev/null || echo "$RESOLVED_PATH")
    else
      NORMALIZED_PATH="$RESOLVED_PATH"
    fi

    # For paths that couldn't be normalized (non-existent), manually normalize using cd
    if [ "$NORMALIZED_PATH" = "$RESOLVED_PATH" ] && [[ "$RESOLVED_PATH" == *../* ]] || [[ "$RESOLVED_PATH" == *./* ]]; then
      # Extract directory and filename
      DIR_PART=$(dirname "$RESOLVED_PATH")
      FILE_PART=$(basename "$RESOLVED_PATH")
      # Try to cd to directory and get absolute path
      if ABSOLUTE_DIR=$(cd "$DIR_PART" 2>/dev/null && pwd); then
        NORMALIZED_PATH="$ABSOLUTE_DIR/$FILE_PART"
      fi
    fi

    if [ ! -f "$NORMALIZED_PATH" ] && [ ! -d "$NORMALIZED_PATH" ]; then
      echo -e "${RED}❌ ERROR: Broken link in $file: $link${NC}"
      ERRORS=$((ERRORS + 1))
      LINKS_VALID=false
    fi
  done
done

if [ "$LINKS_VALID" = true ]; then
  echo -e "${GREEN}✅ All markdown links valid${NC}"
fi

# ============================================================================
# 6. Verify file sizes (token limits)
# ============================================================================
echo ""
echo -e "${BLUE}Checking file sizes for token limits...${NC}"

CLAUDE_LINES=$(wc -l < CLAUDE.md 2>/dev/null || echo "0")
if [ "$CLAUDE_LINES" -gt 300 ]; then
  echo -e "${YELLOW}⚠️  WARNING: CLAUDE.md has $CLAUDE_LINES lines (recommended: <250 for token limits)${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✅ CLAUDE.md size acceptable ($CLAUDE_LINES lines)${NC}"
fi

# ============================================================================
# 7. Verify config.toml references
# ============================================================================
echo ""
echo -e "${BLUE}Checking config.toml references...${NC}"

if [ ! -f "config.toml" ]; then
  echo -e "${YELLOW}⚠️  WARNING: config.toml not found (OpenAI Codex extension)${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  # Check that config.toml references the key documentation files
  CONFIG_REFS=true

  if ! grep -q "AGENTS.md" config.toml; then
    echo -e "${RED}❌ ERROR: config.toml does not reference AGENTS.md${NC}"
    ERRORS=$((ERRORS + 1))
    CONFIG_REFS=false
  fi

  if ! grep -q "CLAUDE.md" config.toml; then
    echo -e "${RED}❌ ERROR: config.toml does not reference CLAUDE.md${NC}"
    ERRORS=$((ERRORS + 1))
    CONFIG_REFS=false
  fi

  if [ "$CONFIG_REFS" = true ]; then
    echo -e "${GREEN}✅ config.toml references documentation files${NC}"
  fi
fi

# ============================================================================
# 8. Verify package scope consistency
# ============================================================================
echo ""
echo -e "${BLUE}Checking package scope consistency...${NC}"

SCOPE_CONSISTENT=true
EXPECTED_SCOPE="@grasdouble/"

for file in AGENTS.md CLAUDE.md .github/copilot-instructions.md config.toml; do
  if [ ! -f "$file" ]; then
    continue
  fi

  # Count mentions of the correct scope
  SCOPE_COUNT=$(grep -c "$EXPECTED_SCOPE" "$file" 2>/dev/null || echo "0")

  if [ "$SCOPE_COUNT" -eq 0 ]; then
    echo -e "${RED}❌ ERROR: Package scope '$EXPECTED_SCOPE' not found in $file${NC}"
    ERRORS=$((ERRORS + 1))
    SCOPE_CONSISTENT=false
  fi
done

if [ "$SCOPE_CONSISTENT" = true ]; then
  echo -e "${GREEN}✅ Package scope consistent in all files${NC}"
fi

# ============================================================================
# Summary
# ============================================================================
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✅ All validations passed!${NC}"
  echo ""
  echo "📊 Summary:"
  echo "  - Three-layer architecture: consistent"
  echo "  - Critical rules: documented"
  echo "  - Build commands: consistent"
  echo "  - YAML frontmatter: valid"
  echo "  - Markdown links: valid"
  echo "  - File sizes: acceptable"
  echo "  - Config references: valid"
  echo "  - Package scope: consistent"
  echo ""
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠️  Validation completed with warnings${NC}"
  echo ""
  echo "📊 Summary:"
  echo "  - Errors: $ERRORS"
  echo "  - Warnings: $WARNINGS"
  echo ""
  echo "Review warnings above and consider fixing them."
  echo ""
  exit 0
else
  echo -e "${RED}❌ Validation failed with errors${NC}"
  echo ""
  echo "📊 Summary:"
  echo "  - Errors: $ERRORS"
  echo "  - Warnings: $WARNINGS"
  echo ""
  echo "Please fix the errors above before committing."
  echo ""
  exit 1
fi
