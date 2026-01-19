#!/usr/bin/env bash

# ============================================================================
# Snapshot Management System Validation
# ============================================================================
# Validates that all components of the snapshot management system are
# properly configured and ready to use.
#
# Usage:
#   bash scripts/validate-snapshot-system.sh
#
# Exit codes:
#   0 - All checks passed
#   1 - One or more checks failed
# ============================================================================

set -eu

# ANSI color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Find repository root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PLAYWRIGHT_DIR="$(dirname "$SCRIPT_DIR")"
ROOT_DIR="$(cd "$PLAYWRIGHT_DIR/../../.." && pwd)"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Snapshot Management System Validation                        ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Helper functions
check_pass() {
    echo -e "  ${GREEN}✓${NC} $1"
    ((PASSED++))
}

check_fail() {
    echo -e "  ${RED}✗${NC} $1"
    ((FAILED++))
}

check_warn() {
    echo -e "  ${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

section() {
    echo ""
    echo -e "${BLUE}▶ $1${NC}"
}

# ============================================================================
# 1. Check Required Tools
# ============================================================================
section "Checking Required Tools"

# Check oxipng
if command -v oxipng &> /dev/null; then
    OXIPNG_VERSION="$(oxipng --version 2>/dev/null | awk '{print $2}' || echo 'unknown')"
    check_pass "oxipng installed (version $OXIPNG_VERSION)"
else
    check_fail "oxipng not found - install with: brew install oxipng"
fi

# Check Docker (optional but recommended)
if command -v docker &> /dev/null; then
    DOCKER_VERSION="$(docker --version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || echo 'unknown')"
    if timeout 5 docker info &> /dev/null 2>&1; then
        check_pass "Docker installed and running (version $DOCKER_VERSION)"
    else
        check_warn "Docker installed but not running (version $DOCKER_VERSION)"
    fi
else
    check_warn "Docker not found (optional - needed for local Linux snapshots)"
fi

# Check pnpm
if command -v pnpm &> /dev/null; then
    PNPM_VERSION="$(pnpm --version 2>/dev/null || echo 'unknown')"
    check_pass "pnpm installed (version $PNPM_VERSION)"
else
    check_fail "pnpm not found"
fi

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION="$(node --version 2>/dev/null || echo 'unknown')"
    check_pass "Node.js installed ($NODE_VERSION)"
else
    check_fail "Node.js not found"
fi

# ============================================================================
# 2. Check Scripts Exist and Are Executable
# ============================================================================
section "Checking Scripts"

SCRIPTS=(
    "compress-snapshots-precommit.sh"
    "compress-snapshots-manual.sh"
    "docker-update-snapshots-linux.sh"
)

for script in "${SCRIPTS[@]}"; do
    SCRIPT_PATH="$SCRIPT_DIR/$script"
    if [[ -f "$SCRIPT_PATH" ]]; then
        if [[ -x "$SCRIPT_PATH" ]]; then
            check_pass "$script exists and is executable"
        else
            check_fail "$script exists but is not executable - run: chmod +x $SCRIPT_PATH"
        fi
    else
        check_fail "$script not found at $SCRIPT_PATH"
    fi
done

# ============================================================================
# 3. Check Husky Pre-Commit Hook
# ============================================================================
section "Checking Pre-Commit Hook"

PRECOMMIT_HOOK="$ROOT_DIR/.husky/pre-commit"
if [[ -f "$PRECOMMIT_HOOK" ]]; then
    check_pass "Pre-commit hook exists"
    
    if grep -q "lint-staged" "$PRECOMMIT_HOOK"; then
        check_pass "Pre-commit hook runs lint-staged"
    else
        check_fail "Pre-commit hook doesn't run lint-staged"
    fi
else
    check_fail "Pre-commit hook not found - run: pnpm prepare"
fi

# ============================================================================
# 4. Check lint-staged Configuration
# ============================================================================
section "Checking lint-staged Configuration"

PACKAGE_JSON="$PLAYWRIGHT_DIR/package.json"
if [[ -f "$PACKAGE_JSON" ]]; then
    check_pass "package.json exists"
    
    if grep -q '"lint-staged"' "$PACKAGE_JSON"; then
        check_pass "lint-staged configuration found"
        
        if grep -q 'compress-snapshots-precommit.sh' "$PACKAGE_JSON"; then
            check_pass "lint-staged references compression script"
        else
            check_fail "lint-staged doesn't reference compression script"
        fi
    else
        check_fail "lint-staged configuration not found in package.json"
    fi
else
    check_fail "package.json not found"
fi

# ============================================================================
# 5. Check GitHub Actions Workflow
# ============================================================================
section "Checking GitHub Actions"

WORKFLOW="$ROOT_DIR/.github/workflows/tools-test-playwright-ct.yml"
if [[ -f "$WORKFLOW" ]]; then
    check_pass "Workflow file exists"
    
    if grep -q "update-linux-snapshots" "$WORKFLOW"; then
        check_pass "Workflow includes snapshot update job"
    else
        check_fail "Workflow missing snapshot update job"
    fi
    
    if grep -q "snapshot-update" "$WORKFLOW"; then
        check_pass "Workflow checks for snapshot-update label"
    else
        check_fail "Workflow doesn't check for snapshot-update label"
    fi
else
    check_fail "Workflow file not found"
fi

# Check if label exists (requires gh CLI)
if command -v gh &> /dev/null; then
    if gh label list | grep -q "snapshot-update"; then
        check_pass "GitHub label 'snapshot-update' exists"
    else
        check_warn "GitHub label 'snapshot-update' not found - create with: gh label create snapshot-update --description 'Trigger automated Linux snapshot updates' --color '0E8A16'"
    fi
else
    check_warn "gh CLI not found - can't verify label exists"
fi

# ============================================================================
# 6. Check Documentation
# ============================================================================
section "Checking Documentation"

DOCS=(
    "$PLAYWRIGHT_DIR/SNAPSHOT-MANAGEMENT-SYSTEM.md"
    "$PLAYWRIGHT_DIR/DOCKER-LINUX-SNAPSHOTS.md"
    "$SCRIPT_DIR/README.md"
    "$ROOT_DIR/.github/workflows/README-SNAPSHOT-UPDATE.md"
)

for doc in "${DOCS[@]}"; do
    DOC_NAME=$(basename "$doc")
    if [[ -f "$doc" ]]; then
        check_pass "$DOC_NAME exists"
    else
        check_fail "$DOC_NAME not found"
    fi
done

# ============================================================================
# 7. Check Snapshot Directories
# ============================================================================
section "Checking Snapshot Directories"

SNAPSHOT_DIR="$PLAYWRIGHT_DIR/__snapshots__"
if [[ -d "$SNAPSHOT_DIR" ]]; then
    check_pass "Snapshot directory exists"
    
    DARWIN_DIR="$SNAPSHOT_DIR/darwin"
    LINUX_DIR="$SNAPSHOT_DIR/linux"
    
    if [[ -d "$DARWIN_DIR" ]]; then
        DARWIN_COUNT=$(find "$DARWIN_DIR" -name "*.png" 2>/dev/null | wc -l | tr -d ' ')
        check_pass "Darwin snapshots directory exists ($DARWIN_COUNT files)"
    else
        check_warn "Darwin snapshots directory not found (no macOS snapshots yet)"
    fi
    
    if [[ -d "$LINUX_DIR" ]]; then
        LINUX_COUNT=$(find "$LINUX_DIR" -name "*.png" 2>/dev/null | wc -l | tr -d ' ')
        check_pass "Linux snapshots directory exists ($LINUX_COUNT files)"
    else
        check_warn "Linux snapshots directory not found (no Linux snapshots yet)"
    fi
else
    check_warn "Snapshot directory not found (no snapshots generated yet)"
fi

# ============================================================================
# 8. Check Package Scripts
# ============================================================================
section "Checking Package Scripts"

ROOT_PACKAGE_JSON="$ROOT_DIR/package.json"
if [[ -f "$ROOT_PACKAGE_JSON" ]]; then
    EXPECTED_SCRIPTS=(
        "ds:test"
        "ds:test:ui"
        "ds:test:update-snapshots"
        "ds:test:compress-snapshots"
        "ds:test:docker:update-snapshots-linux"
    )
    
    for script in "${EXPECTED_SCRIPTS[@]}"; do
        if grep -q "\"$script\"" "$ROOT_PACKAGE_JSON"; then
            check_pass "Root package.json has '$script' script"
        else
            check_fail "Root package.json missing '$script' script"
        fi
    done
else
    check_fail "Root package.json not found"
fi

# ============================================================================
# Summary
# ============================================================================
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Summary                                                       ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════════╝${NC}"
echo ""

echo -e "  ${GREEN}✓${NC} Passed:   $PASSED"
echo -e "  ${RED}✗${NC} Failed:   $FAILED"
echo -e "  ${YELLOW}⚠${NC} Warnings: $WARNINGS"
echo ""

if [[ $FAILED -eq 0 ]]; then
    echo -e "${GREEN}✓ All critical checks passed!${NC}"
    echo ""
    echo -e "${BLUE}Next steps:${NC}"
    echo "  1. Run tests: pnpm ds:test"
    echo "  2. Update snapshots: pnpm ds:test:update-snapshots"
    echo "  3. For Linux snapshots: pnpm ds:test:docker:update-snapshots-linux"
    echo "  4. Or use GitHub Actions: gh pr edit --add-label snapshot-update"
    echo ""
    exit 0
else
    echo -e "${RED}✗ Some checks failed. Please fix the issues above.${NC}"
    echo ""
    exit 1
fi
