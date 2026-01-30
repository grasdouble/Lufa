# Generating Linux Snapshots for Playwright Tests

This guide explains how to generate Linux versions of Playwright component test snapshots from macOS (or any other OS).

## Why Linux Snapshots?

Playwright generates OS-specific snapshots due to:

- Different font rendering (FreeType on Linux vs Core Text on macOS)
- Subpixel anti-aliasing differences
- System font fallbacks
- Browser rendering engine OS-specific behaviors

**Current setup**: Snapshots have `-darwin` suffix (macOS)  
**Goal**: Generate `-linux` suffix snapshots for CI/CD environments

## Choose Your Method

### Method 1: Automated via GitHub Actions (Easiest)

Add the `snapshot-update` label to your PR and let CI handle it:

**Pros:**

- ✅ No Docker setup needed
- ✅ Works for all team members
- ✅ Automatic compression
- ✅ Automatic commit and push

**See:** [Automated Snapshot Updates Guide](./snapshot-update.md)

### Method 2: Docker Locally (This Guide)

Run Docker script on your local machine:

**Pros:**

- ✅ Faster than CI (no queue time)
- ✅ Test before pushing
- ✅ Works offline (after first Docker pull)

**Continue reading below for Docker setup and usage.**

---

## Quick Start (Docker Method)

```bash
# From repository root
pnpm ds:test:docker:update-snapshots-linux

# Or from Playwright package
cd packages/design-system/playwright
pnpm docker:update-snapshots-linux
```

This will:

1. Pull the official Playwright Docker image (Linux-based)
2. Install dependencies inside the container
3. Build the design system packages
4. Run tests with `--update-snapshots` to generate Linux snapshots
5. Save snapshots back to your local filesystem

## How It Works

### Docker-Based Approach

The script (`scripts/docker-update-snapshots-linux.sh`) uses the official Playwright Docker image which:

- Runs Ubuntu Noble (24.04 LTS)
- Includes all browsers pre-installed
- Provides consistent Linux environment
- Matches typical CI/CD environments

**Key steps**:

1. Reads Node.js and pnpm versions from `.tool-versions` file in repository root
2. Mounts the entire monorepo into the container at `/workspace`
3. **Uses anonymous Docker volumes for `node_modules` and `.pnpm-store`** to prevent macOS/Windows binaries from conflicting with Linux
4. Installs dependencies fresh inside the container (Linux-compatible binaries like esbuild, playwright, etc.)
5. Builds design system packages in correct order (tokens → primitives → main)
6. Runs Playwright tests with `--update-snapshots` flag
7. Snapshots are written directly to your local `__snapshots__` directory (via volume mount)

**Why anonymous volumes for node_modules and .pnpm-store?**

When you mount your project directory into Docker, your local `node_modules` and `.pnpm-store` (built for macOS/Windows) would be visible inside the Linux container. Native modules like `esbuild`, `@esbuild/darwin-arm64`, and Playwright browsers are platform-specific and won't work cross-platform.

Anonymous volumes (`-v /workspace/node_modules` and `-v /workspace/.pnpm-store`) tell Docker: "Don't mount the host's directories here - create isolated directories inside the container instead." This allows pnpm to install fresh Linux-compatible binaries.

**Note**: You may see an empty `.pnpm-store` directory created in your project root. This is harmless (0 bytes) and already in `.gitignore`. The actual Linux binaries are stored in the temporary Docker volume, not on your host filesystem.

**Version management**: The script automatically uses versions defined in `.tool-versions`:

- Node.js version (e.g., `24.9.0`)
- pnpm version (e.g., `10.28.0`)

This ensures consistency between local development and Docker container environments.

### Snapshot Naming

Playwright automatically adds OS suffix to snapshots:

- **macOS**: `button-variant-chromium-darwin.png`
- **Linux**: `button-variant-chromium-linux.png`
- **Windows**: `button-variant-chromium-win32.png`

When tests run, Playwright picks the correct snapshot for the current OS.

## Prerequisites

### Required

- **Docker Desktop** (or Docker Engine)
  - macOS: [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)
  - Windows: [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/)
  - Linux: [Docker Engine](https://docs.docker.com/engine/install/)

- **Docker daemon must be running**
  - Start Docker Desktop application
  - Or: `sudo systemctl start docker` (Linux)

- **pnpm version from .tool-versions** (if using npm scripts)
  - If you use asdf or similar version managers
  - You need the pnpm version specified in `.tool-versions` installed locally
  - Check: `asdf list pnpm` (asdf users)
  - Install: `asdf install pnpm 10.28.0` (or version in `.tool-versions`)

  **Why?** When you run `pnpm ds:test:docker:update-snapshots-linux`, your local pnpm needs to exist first to execute the npm script. The Docker container will use its own pnpm version from `.tool-versions`.

### Verify Installation

```bash
# Check Docker
docker --version
docker info

# Check pnpm (if using npm scripts)
pnpm --version

# If using asdf and pnpm not found:
asdf install pnpm $(grep '^pnpm' .tool-versions | awk '{print $2}')
asdf reshim pnpm
```

## Detailed Usage

### Method 1: Using npm Scripts (Recommended)

```bash
# From repository root (most convenient)
pnpm ds:test:docker:update-snapshots-linux

# From Playwright package directory
cd packages/design-system/playwright
pnpm docker:update-snapshots-linux
```

### Method 2: Direct Script Execution

```bash
# From repository root
bash packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh

# From Playwright package directory
cd packages/design-system/playwright
bash scripts/docker-update-snapshots-linux.sh
```

## Complete Workflow Example

### Scenario: Adding Linux snapshots to existing tests

```bash
# 1. Ensure you have the latest macOS snapshots
pnpm ds:test

# 2. Generate Linux snapshots using Docker
pnpm ds:test:docker:update-snapshots-linux

# 3. Compress all snapshots (both macOS and Linux)
pnpm ds:test:compress-snapshots

# 4. Review the new Linux snapshots
git status
# You should see new files like:
# - button-variant-chromium-linux.png (new)
# - button-variant-chromium-darwin.png (existing)

# 5. Stage and commit
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: add Linux snapshots for CI compatibility"
```

## What Happens During Execution

```
🐳 Generating Linux Playwright snapshots using Docker...
📁 Package directory: /path/to/packages/design-system/playwright
📁 Root directory: /path/to/Lufa

✅ Docker is available

📋 Versions from .tool-versions:
   Node.js: 24.9.0
   pnpm: 10.28.0

🔍 Using Playwright Docker image: mcr.microsoft.com/playwright:v1.57.0-noble
📥 Pulling Docker image (this may take a few minutes on first run)...

🧪 Running Playwright tests in Docker container to generate Linux snapshots...

📦 Installing dependencies...
Already up to date

🏗️  Building design system packages...
[Build output...]

🎭 Running Playwright component tests with --update-snapshots...
[Test output - all tests should pass and generate snapshots]

✅ Linux snapshots generated successfully!

✅ Docker snapshot generation complete!

📸 Linux snapshots have been generated (with -linux suffix)
💡 Next steps:
   1. Review the new snapshots in __snapshots__ directories
   2. Compress them: pnpm ds:test:compress-snapshots
   3. Commit them: git add . && git commit -m 'test: add Linux snapshots'
```

🧪 Running Playwright tests in Docker container to generate Linux snapshots...

📦 Installing dependencies...
Already up to date

🏗️ Building design system packages...
[Build output...]

🎭 Running Playwright component tests with --update-snapshots...
[Test output - all tests should pass and generate snapshots]

✅ Linux snapshots generated successfully!

✅ Docker snapshot generation complete!

📸 Linux snapshots have been generated (with -linux suffix)
💡 Next steps:

1.  Review the new snapshots in **snapshots** directories
2.  Compress them: pnpm ds:test:compress-snapshots
3.  Commit them: git add . && git commit -m 'test: add Linux snapshots'

````

## Performance Notes

### First Run

- Downloads Playwright Docker image (~1-2 GB) - **one-time download, cached**
- Installs all dependencies inside container (~2-3 minutes) - **required for Linux binaries**
- Total: 7-12 minutes depending on internet speed

### Subsequent Runs

- Uses cached Docker image (instant)
- **Re-installs dependencies every time** (~2-3 minutes) - **necessary for Linux compatibility**
- Builds design system (~30 seconds)
- Runs tests and generates snapshots (~1-2 minutes per test file)
- **Total: ~4-6 minutes**

**Why reinstall dependencies each time?** Docker anonymous volumes are temporary and deleted after the container stops. This ensures you always get fresh Linux-compatible binaries without polluting your local `node_modules`.

### Optimization Tips

**The script is already optimized** for the Docker cross-platform workflow:

1. ✅ **Anonymous volumes prevent platform conflicts** - Isolates Linux node_modules from macOS/Windows
2. ✅ **Docker image is cached** - No repeated downloads
3. ✅ **Snapshots written directly to host** - No copy-back step needed

**Trade-off accepted**: Reinstalling dependencies each run (~2-3 minutes) is faster and more reliable than dealing with cross-platform binary conflicts.

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Playwright Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Read versions from .tool-versions
        id: versions
        run: |
          echo "node_version=$(grep '^nodejs' .tool-versions | awk '{print $2}')" >> $GITHUB_OUTPUT
          echo "pnpm_version=$(grep '^pnpm' .tool-versions | awk '{print $2}')" >> $GITHUB_OUTPUT

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ steps.versions.outputs.node_version }}

      - name: Install pnpm
        run: corepack enable && corepack prepare pnpm@${{ steps.versions.outputs.pnpm_version }} --activate

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build design system
        run: pnpm ds:all:build

      - name: Install Playwright browsers
        run: cd packages/design-system/playwright && pnpm exec playwright install chromium --with-deps

      - name: Run Playwright tests
        run: pnpm ds:test

      # Linux snapshots will be used automatically since CI runs on ubuntu-latest
```

**Key point**: When CI runs on Linux, Playwright automatically uses `-linux` snapshots. No Docker needed in CI!

## Troubleshooting

### "No version is set for command pnpm"

**Error**: When running `pnpm ds:test:docker:update-snapshots-linux`:
```
No version is set for command pnpm
Consider adding one of the following versions in your config file at .tool-versions
```

**Cause**: You're using asdf (or similar version manager), and the pnpm version in `.tool-versions` isn't installed locally.

**Solution**:

```bash
# Option 1: Install the pnpm version from .tool-versions
asdf install pnpm $(grep '^pnpm' .tool-versions | awk '{print $2}')
asdf reshim pnpm

# Then try again
pnpm ds:test:docker:update-snapshots-linux

# Option 2: Run the script directly (bypasses local pnpm)
bash packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh
```

**Why this happens**: The npm script command requires your local pnpm to exist first, even though Docker will use its own pnpm version. Either install the local version or run the script directly.

### "You installed esbuild for another platform"

**Error**: When running in Docker:
```
Error [TransformError]:
You installed esbuild for another platform than the one you're currently using.
Specifically the "@esbuild/darwin-arm64" package is present but this platform
needs the "@esbuild/linux-arm64" package instead.
```

**Cause**: Docker is using your local `node_modules` which contains macOS/Windows binaries instead of Linux binaries.

**Solution**: This should be automatically handled by the script using anonymous Docker volumes. If you still see this error:

```bash
# Make sure you're using the latest version of the script
git pull origin main

# The script now uses anonymous volumes to isolate node_modules:
# -v /workspace/node_modules
# This prevents your local node_modules from being used in the container
```

**How the fix works**: The script mounts your source code but creates isolated `node_modules` directories inside the container using Docker anonymous volumes. Dependencies are installed fresh with Linux-compatible binaries (esbuild, playwright, etc.).

### Docker image pull fails

**Error**: `Error response from daemon: manifest not found`

**Solution**: Check Playwright version in package.json matches available Docker tags:

```bash
# Check current version
cat packages/design-system/playwright/package.json | grep @playwright/experimental-ct-react

# Available tags: https://mcr.microsoft.com/v2/playwright/tags/list
```

### Permission errors in container

**Error**: `EACCES: permission denied`

**Solution**: Ensure Docker has access to the project directory:

- macOS: Docker Desktop → Preferences → Resources → File Sharing
- Linux: User must be in `docker` group: `sudo usermod -aG docker $USER`

### Snapshots not generated

**Possible causes**:

1. Tests failing in Docker (check test output)
2. Build errors (check build output)
3. Volume mount issues

**Debug**:

```bash
# Run Docker container interactively
docker run -it --rm -v "$(pwd):/workspace" -w "/workspace/packages/design-system/playwright" \
  mcr.microsoft.com/playwright:v1.57.0-noble bash

# Inside container:
cd /workspace
pnpm install
pnpm ds:all:build
cd packages/design-system/playwright
pnpm test-ct --update-snapshots
```

### Different rendering between local Docker and CI

**Issue**: Snapshots generated locally in Docker differ from CI

**Causes**:

- Different Playwright versions
- Different Docker image versions
- Different Node.js versions

**Solution**: Match versions exactly:

1. Use same Playwright Docker image tag as CI
2. Use same Node.js version in container and CI
3. Use `--frozen-lockfile` for consistent dependencies

## Alternative Approaches

### 1. GitHub Actions Artifacts (Manual)

If you don't want to use Docker locally:

1. Push code without Linux snapshots
2. Let CI fail on missing Linux snapshots
3. Download CI artifacts containing generated snapshots
4. Commit them to repository

**Pros**: No Docker needed locally
**Cons**: Slow, manual process

### 2. Linux VM or WSL2

Run Playwright natively in a Linux environment:

```bash
# WSL2 (Windows) or Linux
pnpm ds:test:update-snapshots
```

**Pros**: Native performance
**Cons**: Requires separate Linux environment

### 3. Remote Development Environment

Use GitHub Codespaces, GitPod, or similar:

```bash
# In cloud-based Linux environment
pnpm ds:test:update-snapshots
```

**Pros**: No local setup
**Cons**: Requires internet, cloud service account

## Best Practices

### 1. Generate Both OS Snapshots

Always maintain snapshots for:

- **macOS** (local development)
- **Linux** (CI/CD)

This ensures tests pass both locally and in CI.

### 2. Regenerate After Visual Changes

When you update:

- Design tokens (colors, spacing, typography)
- Component styles
- Layout changes

Regenerate **both** macOS and Linux snapshots:

```bash
# 1. Update macOS snapshots
pnpm ds:test:update-snapshots

# 2. Update Linux snapshots
pnpm ds:test:docker:update-snapshots-linux

# 3. Compress all
pnpm ds:test:compress-snapshots

# 4. Commit both
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: update snapshots after design token changes"
```

### 3. Compress After Generation

Always compress snapshots after generation to keep repository size manageable:

```bash
pnpm ds:test:compress-snapshots
```

This uses oxipng level 6 (maximum compression) for significant space savings.

### 4. Review Visual Diffs

Before committing new Linux snapshots:

```bash
# Compare macOS vs Linux snapshots visually
# Use image diff tools or Playwright trace viewer
pnpm ds:test:ui
```

Expect minor differences (font rendering, anti-aliasing), but layout should match.

## FAQ

**Q: Do I need to generate Linux snapshots if I only develop on macOS?**
A: Yes, if your CI runs on Linux. Otherwise, tests will fail in CI due to missing `-linux` snapshots.

**Q: How often should I regenerate Linux snapshots?**
A: Whenever you update macOS snapshots (after visual changes to components).

**Q: Can I generate Windows snapshots too?**
A: Yes, but Playwright doesn't provide official Windows Docker images. Use a Windows VM or GitHub Actions on `windows-latest`.

**Q: Why not just use one OS for all snapshots?**
A: Different OSes render fonts and UI differently. Platform-specific snapshots ensure tests pass on all platforms.

**Q: Will this work with CI?**
A: Yes! When CI runs on Linux (e.g., `ubuntu-latest`), Playwright automatically uses `-linux` snapshots. No Docker needed in CI.

**Q: How much disk space do Linux snapshots add?**
A: Approximately doubles snapshot storage (one set per OS). Compression helps significantly (20-40% savings).

**Q: Can I automate this in a pre-push hook?**
A: Possible but not recommended - Docker execution takes 3-5 minutes, which may disrupt workflow. Better to generate on-demand or in CI.

## Related Documentation

- [Playwright Component Testing README](../README.md)
- [Snapshot Compression Scripts](../scripts/README.md)
- [Playwright Docker Documentation](https://playwright.dev/docs/docker)
- [AGENTS.md - Testing Instructions](../../../../AGENTS.md#testing-instructions)

## Script Source

The Docker script is located at:

```
packages/design-system/playwright/scripts/docker-update-snapshots-linux.sh
```

Feel free to customize it for your specific needs (e.g., different browsers, parallelization, etc.).
````
