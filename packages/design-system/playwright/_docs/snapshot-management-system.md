# Playwright Snapshot Management System

> **Complete system for managing Playwright visual regression snapshots across platforms**

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Three Methods](#three-methods)
- [System Components](#system-components)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)
- [Technical Details](#technical-details)

---

## Overview

This system provides **three automated methods** for managing Playwright component test snapshots:

1. **Automatic compression** via pre-commit hooks (reduces file size by 20-40%)
2. **Local Linux snapshot generation** via Docker (cross-platform compatibility)
3. **Automated snapshot updates** via GitHub Actions (team collaboration)

### Why This System?

**Problem 1: Large Snapshot Files**

- Playwright snapshots are PNG images that can bloat the repository
- Solution: Automatic lossless compression using oxipng

**Problem 2: Platform-Specific Snapshots**

- Playwright generates different snapshots on macOS vs Linux
- CI runs on Linux but developers often use macOS
- Solution: Docker-based Linux snapshot generation

**Problem 3: Manual Update Friction**

- Team members without Docker can't update Linux snapshots
- Solution: GitHub Actions workflow triggered by PR label

---

## Quick Start

### Prerequisites

```bash
# Check if oxipng is installed
oxipng --version

# Install if needed (macOS)
brew install oxipng

# Install if needed (Linux)
cargo install oxipng

# Check if Docker is installed (for local Linux snapshots)
docker --version
```

### System Status Check

```bash
# Verify all components are ready
pnpm ds:test                # Run tests locally
git status                  # Check for uncommitted changes
```

---

## Three Methods

### Method 1: Automatic Pre-Commit Compression ⚡

**What it does**: Automatically compresses PNG snapshots when you commit them

**When to use**: Every time you commit snapshot changes (automatic)

**How it works**:

```bash
# Just commit normally - compression happens automatically
git add packages/design-system/playwright/__snapshots__/**/*.png
git commit -m "test: update snapshots"

# → Pre-commit hook triggers
# → lint-staged finds staged PNGs
# → Compresses with oxipng level 3 (~1s per file)
# → Auto-restages compressed files
# → Commit proceeds
```

**Benefits**:

- ✅ Automatic - no manual steps
- ✅ Fast - level 3 compression (~1 second per file)
- ✅ Lossless - identical visual quality
- ✅ 20-40% file size reduction

**Configuration**: `packages/design-system/playwright/package.json` (lint-staged field)

---

### Method 2: Local Docker Linux Snapshots 🐳

**What it does**: Generates Linux snapshots on your macOS/Windows machine

**When to use**:

- When you need to update Linux snapshots locally
- When you want to verify CI snapshots before pushing
- When GitHub Actions is unavailable

**How to use**:

```bash
# Option A: Via pnpm script (requires local pnpm installed)
pnpm ds:test:docker:update-snapshots-linux

# Option B: Direct bash (bypasses pnpm requirement)
bash packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh

# Both methods:
# → Builds Docker container with Node.js + pnpm
# → Installs dependencies inside container (Linux binaries)
# → Runs Playwright tests with --update-snapshots
# → Compresses snapshots with oxipng level 6
# → Writes snapshots to host filesystem
```

**Time**: ~4-6 minutes (reinstalls dependencies for Linux compatibility)

**Requirements**:

- Docker installed and running
- pnpm version from `.tool-versions` installed locally (for Option A)

**Detailed Guide**: [docker-linux-snapshots.md](./docker-linux-snapshots.md)

---

### Method 3: GitHub Actions Automated Updates 🤖

**What it does**: Automatically updates Linux snapshots via CI when you add a label to your PR

**When to use**:

- When you don't have Docker installed
- When you want CI to handle snapshot updates
- When multiple team members need synchronized snapshots

**How to use**:

**Step 1**: Create a PR with your changes

```bash
git checkout -b feature/my-component
git add .
git commit -m "feat: add new component"
git push -u origin feature/my-component
gh pr create --title "Add new component"
```

**Step 2**: Add the `snapshot-update` label

```bash
# Via GitHub CLI
gh pr edit --add-label snapshot-update

# OR via GitHub UI: Labels → snapshot-update
```

**Step 3**: Wait for workflow to complete (~5-7 minutes)

- Workflow runs automatically when label is added
- Generates Linux snapshots on ubuntu-latest
- Compresses snapshots with oxipng
- Commits changes with message: "test: update Linux snapshots (automated)"
- Comments on PR with results
- Automatically removes the label

**Step 4**: Pull the changes

```bash
git pull
```

**Benefits**:

- ✅ No Docker required
- ✅ No manual commands
- ✅ Consistent CI environment
- ✅ Automatic compression included
- ✅ PR comment with results

**Detailed Guide**: [snapshot-update.md](./snapshot-update.md)

---

## System Components

### Scripts

| Script                             | Purpose                 | Speed               | Usage                                        |
| ---------------------------------- | ----------------------- | ------------------- | -------------------------------------------- |
| `compress-snapshots-precommit.sh`  | Pre-commit compression  | Level 3, ~1s/file   | Automatic via git hook                       |
| `compress-snapshots-manual.sh`     | Manual bulk compression | Level 6, ~3-6s/file | `pnpm ds:test:compress-snapshots`            |
| `docker-update-snapshots-linux.sh` | Docker Linux snapshots  | ~4-6 min total      | `pnpm ds:test:docker:update-snapshots-linux` |

### Configuration Files

| File                                           | Purpose                              |
| ---------------------------------------------- | ------------------------------------ |
| `package.json` (this dir)                      | lint-staged config, npm scripts      |
| `.husky/pre-commit` (root)                     | Pre-commit hook runner               |
| `.github/workflows/tools-ds-playwright-ct.yml` | CI workflow with snapshot update job |
| `.tool-versions` (root)                        | Node.js and pnpm versions            |

### Documentation

| Document                                                         | Description                       |
| ---------------------------------------------------------------- | --------------------------------- |
| [snapshot-management-system.md](./snapshot-management-system.md) | This file - complete overview     |
| [docker-linux-snapshots.md](./docker-linux-snapshots.md)         | Docker method detailed guide      |
| [scripts/README.md](../scripts/README.md)                        | Compression scripts documentation |
| [snapshot-update.md](./snapshot-update.md)                       | GitHub Actions label method guide |

---

## Usage Guide

### When to Update Snapshots

**Update snapshots when**:

- ✅ Component design intentionally changed
- ✅ New component variants added
- ✅ Accessibility improvements that affect rendering
- ✅ Token values changed (colors, spacing, etc.)

**Do NOT update snapshots when**:

- ❌ Test is failing due to a bug (fix the bug first)
- ❌ You're unsure why the snapshot differs (investigate first)
- ❌ CI is failing for unrelated reasons

### Workflow: Component Design Changes

**Scenario**: You updated a component's design and need to update snapshots

```bash
# 1. Make your changes
vim packages/design-system/main/src/components/Button.tsx

# 2. Run tests locally to see failures
pnpm ds:test

# 3. Review failures - are they expected?
pnpm ds:test:ui  # Opens Playwright UI to inspect diffs

# 4. If changes are correct, update snapshots
pnpm ds:test:update-snapshots  # Updates local (macOS) snapshots

# 5. Commit changes (compression happens automatically)
git add .
git commit -m "feat: update Button design"

# 6. Push and create PR
git push -u origin feature/button-design
gh pr create --title "Update Button design"

# 7. Add label to update Linux snapshots
gh pr edit --add-label snapshot-update

# 8. Wait for CI, then pull changes
git pull

# 9. Review and merge
```

### Workflow: New Component

**Scenario**: You added a new component with tests

```bash
# 1. Create component and test
vim packages/design-system/main/src/components/NewComponent.tsx
vim packages/design-system/playwright/src/components/NewComponent.spec.tsx

# 2. Run tests (will fail - no snapshots yet)
pnpm ds:test

# 3. Generate initial snapshots
pnpm ds:test:update-snapshots

# 4. Review snapshots visually
ls packages/design-system/playwright/__snapshots__/darwin/NewComponent.*

# 5. Commit (compression automatic)
git add .
git commit -m "feat: add NewComponent"

# 6. Push and create PR
git push -u origin feature/new-component
gh pr create --title "Add NewComponent"

# 7. Add label for Linux snapshots
gh pr edit --add-label snapshot-update

# 8. Pull CI changes
git pull

# 9. Merge when ready
```

### Workflow: Bulk Compression

**Scenario**: Compress all existing snapshots (one-time optimization)

```bash
# Run manual compression (level 6, thorough)
pnpm ds:test:compress-snapshots

# Commit compressed snapshots
git add packages/design-system/playwright/__snapshots__/**/*.png
git commit -m "chore: compress all snapshots"
git push
```

---

## Troubleshooting

### Pre-Commit Hook Issues

**Problem**: "oxipng: command not found"

**Solution**:

```bash
# macOS
brew install oxipng

# Linux
cargo install oxipng

# Verify
oxipng --version
```

---

**Problem**: Hook doesn't run when committing

**Solution**:

```bash
# Reinstall Husky hooks
pnpm prepare

# Verify hook exists
cat .husky/pre-commit

# Test manually
bash packages/design-system/playwright/scripts/compress-snapshots-precommit.sh \
  packages/design-system/playwright/__snapshots__/darwin/Button-should-render.png
```

---

### Docker Method Issues

**Problem**: "No version is set for command pnpm"

**Cause**: asdf can't find pnpm version locally

**Solution**:

```bash
# Check required version
cat .tool-versions | grep pnpm

# Install it
asdf install pnpm 10.28.0

# OR bypass pnpm script
bash packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh
```

---

**Problem**: "You installed esbuild for another platform"

**Cause**: Docker mounting host's macOS `node_modules`

**Solution**: Already fixed via anonymous Docker volumes. If issue persists:

```bash
# Check Docker script has these volumes
grep "/workspace/node_modules" packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh

# Should see multiple volume entries to isolate platform-specific binaries
```

---

**Problem**: Empty `.pnpm-store` directory appears

**Status**: Harmless (0 bytes, already in `.gitignore`)

**Why**: Docker anonymous volumes prevent host pollution, but create empty directory marker

**Action**: Ignore it (won't be committed)

---

### GitHub Actions Issues

**Problem**: Workflow doesn't trigger when adding label

**Check**:

```bash
# Verify label exists
gh label list | grep snapshot-update

# Verify label name matches workflow exactly
grep "contains.*snapshot-update" .github/workflows/tools-ds-playwright-ct.yml

# Verify workflow is enabled
gh workflow list

# Manually trigger workflow (if needed)
gh workflow run "Tools:DS:Playwright:Component-Tests"
```

---

**Problem**: Workflow fails with "Permission denied"

**Cause**: Missing repository permissions

**Solution**:

1. Go to repository Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Re-run the workflow

---

**Problem**: Label not removed after workflow completes

**Check**:

```bash
# View workflow run logs
gh run list --workflow="Tools:DS:Playwright:Component-Tests"
gh run view <run-id>

# Look for "Remove snapshot-update label" step
# Check for error messages
```

---

### Test Issues

**Problem**: Tests fail with "Snapshot comparison failed"

**Debug**:

```bash
# Run tests in UI mode to see visual diffs
pnpm ds:test:ui

# Check which snapshots differ
pnpm ds:test 2>&1 | grep "Snapshot"

# View test report
pnpm ds:test:report
```

**If changes are expected**:

```bash
# Update snapshots locally
pnpm ds:test:update-snapshots

# Then use GitHub Actions for Linux snapshots
gh pr edit --add-label snapshot-update
```

---

## Technical Details

### Compression Levels

| Level | Speed          | Compression             | Use Case                    |
| ----- | -------------- | ----------------------- | --------------------------- |
| 3     | ~1s per file   | Good (20-30% reduction) | Pre-commit (speed priority) |
| 6     | ~3-6s per file | Best (30-40% reduction) | Manual/CI (size priority)   |

Both are **lossless** - identical visual quality.

### Lint-Staged Configuration

Located in: `packages/design-system/playwright/package.json`

```json
{
  "lint-staged": {
    "**/__snapshots__/**/*.png": ["bash packages/design-system/playwright/scripts/compress-snapshots-precommit.sh"]
  }
}
```

**How it works**:

1. lint-staged runs from repository root
2. Finds staged PNG files matching pattern
3. Passes **absolute file paths from root** to script
4. Script compresses each file in-place
5. lint-staged re-stages compressed files
6. Commit proceeds with optimized files

### Docker Anonymous Volumes

**Why needed**: Prevent platform binary conflicts (macOS vs Linux)

**What's isolated**:

```bash
-v /workspace/node_modules                # Root dependencies
-v /workspace/.pnpm-store                 # pnpm global store
-v /workspace/packages/design-system/playwright/node_modules
-v /workspace/packages/design-system/main/node_modules
-v /workspace/packages/design-system/tokens/node_modules
-v /workspace/packages/design-system/primitives/node_modules
```

**Result**: Each Docker run installs dependencies fresh with Linux binaries.

### GitHub Actions Step Outputs

**Why used**: Environment variables don't work in `if` conditions

**Pattern**:

```yaml
# Set output
- name: Commit and push snapshots
  id: commit
  run: |
    if git diff --staged --quiet; then
      echo "updated=false" >> $GITHUB_OUTPUT
    else
      git commit -m "..."
      echo "updated=true" >> $GITHUB_OUTPUT
    fi

# Use output
- name: Comment on PR
  if: steps.commit.outputs.updated == 'true'
  run: echo "Changes committed!"
```

**Key**: Use `steps.<id>.outputs.<name>` syntax, not `env.VARIABLE`.

### Performance Considerations

| Method                 | Time           | Network                  | Disk I/O               |
| ---------------------- | -------------- | ------------------------ | ---------------------- |
| Pre-commit compression | ~1s per file   | None                     | Minimal (in-place)     |
| Manual compression     | ~3-6s per file | None                     | Minimal (in-place)     |
| Docker local           | ~4-6 min       | Heavy (pull image, deps) | Heavy (reinstall deps) |
| GitHub Actions         | ~5-7 min       | CI bandwidth             | CI storage             |

**Optimization tips**:

- Use pre-commit for daily work (automatic)
- Use GitHub Actions for team collaboration (no local setup)
- Use Docker only when CI is unavailable or debugging locally
- Run manual compression after bulk snapshot updates

### Snapshot File Organization

```
packages/design-system/playwright/
└── __snapshots__/
    ├── darwin/                    # macOS snapshots
    │   ├── chromium/
    │   │   ├── Button-spec-ts-Button-renders-correctly-1.png
    │   │   └── ...
    │   ├── firefox/
    │   └── webkit/
    └── linux/                     # Linux snapshots (for CI)
        ├── chromium/
        │   ├── Button-spec-ts-Button-renders-correctly-1.png
        │   └── ...
        ├── firefox/
        └── webkit/
```

**Platform detection**: Playwright automatically selects correct snapshot based on `process.platform`.

---

## Best Practices

### 1. Review Snapshots Before Committing

```bash
# Don't blindly update snapshots
# Always review what changed and why

# Use Playwright UI to inspect differences
pnpm ds:test:ui

# Or view the report
pnpm ds:test:report
```

### 2. Keep Snapshots Small

- ✅ Test specific component states, not entire pages
- ✅ Use smaller viewports where appropriate
- ✅ Avoid testing dynamic content (timestamps, animations)
- ❌ Don't create snapshots for trivial rendering

### 3. Update Both Platforms

```bash
# After updating macOS snapshots locally
pnpm ds:test:update-snapshots

# Also update Linux snapshots via PR label
gh pr edit --add-label snapshot-update
```

### 4. Commit Snapshots Separately

```bash
# Good: Separate commits
git add src/components/Button.tsx
git commit -m "feat: update Button design"

git add __snapshots__/**/*.png
git commit -m "test: update Button snapshots"

# Avoid: Mixed commits
git add src/ __snapshots__/
git commit -m "feat: stuff"
```

### 5. Document Breaking Changes

When snapshot updates indicate breaking changes:

```bash
git commit -m "feat!: change Button API
BREAKING CHANGE: Button now requires 'variant' prop"
```

---

## FAQs

### Q: Do I need to update snapshots manually?

**A**: No! The system handles most cases automatically:

- Compression happens via pre-commit hook
- Linux snapshots update via GitHub Actions
- You only need to run `pnpm ds:test:update-snapshots` when you change component designs

### Q: Which compression level should I use?

**A**:

- **Level 3** (pre-commit): Default, automatic, good balance
- **Level 6** (manual): Use for bulk optimization or when size is critical

### Q: Can I skip the Docker method?

**A**: Yes! Use GitHub Actions instead:

- Easier (just add a label)
- No Docker required
- Consistent with CI environment

Use Docker only if:

- GitHub Actions is down
- You need offline development
- You're debugging platform-specific issues

### Q: How do I know if snapshots need updating?

**A**: Run tests:

```bash
pnpm ds:test

# If you see "Snapshot comparison failed", review:
pnpm ds:test:ui
```

Then decide:

- Expected change? Update snapshots
- Bug? Fix the bug first
- Unsure? Ask for review

### Q: What if compression fails?

**A**: Pre-commit will abort. Fix the issue:

```bash
# Check oxipng installation
oxipng --version

# Try manual compression
pnpm ds:test:compress-snapshots

# If still fails, bypass hook temporarily
git commit --no-verify -m "..."
```

### Q: Can I use this in other projects?

**A**: Yes! The scripts are standalone. Copy:

1. `scripts/compress-snapshots-*.sh`
2. lint-staged config from `package.json`
3. GitHub Actions workflow (adapt paths)
4. Docker script (adapt paths)

---

## Summary

### Three Methods at a Glance

| Method             | Trigger             | Time     | Setup            | Best For              |
| ------------------ | ------------------- | -------- | ---------------- | --------------------- |
| **Pre-commit**     | Automatic on commit | ~1s/file | None (installed) | Daily development     |
| **Docker**         | Manual command      | ~4-6 min | Docker           | Local Linux snapshots |
| **GitHub Actions** | PR label            | ~5-7 min | None             | Team collaboration    |

### Key Commands

```bash
# Local development
pnpm ds:test                              # Run tests
pnpm ds:test:ui                           # Inspect diffs
pnpm ds:test:update-snapshots             # Update local snapshots

# Docker (Linux snapshots)
pnpm ds:test:docker:update-snapshots-linux

# Manual compression
pnpm ds:test:compress-snapshots

# GitHub Actions
gh pr edit --add-label snapshot-update
```

### System Status

✅ **All systems operational**:

- Pre-commit compression active
- Docker script ready
- GitHub Actions workflow enabled
- Label `snapshot-update` created

### Documentation

- [snapshot-management-system.md](./snapshot-management-system.md) - This file
- [docker-linux-snapshots.md](./docker-linux-snapshots.md) - Docker details
- [scripts/README.md](../scripts/README.md) - Compression scripts
- [snapshot-update.md](./snapshot-update.md) - GitHub Actions guide

---

**Questions?** Check the [Troubleshooting](#troubleshooting) section or refer to the detailed guides linked above.
