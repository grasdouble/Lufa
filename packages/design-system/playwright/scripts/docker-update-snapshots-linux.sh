#!/usr/bin/env bash

# Script to generate Linux versions of Playwright snapshots using Docker
# This ensures consistent cross-platform snapshot generation
# 
# Usage: 
#   bash scripts/docker-update-snapshots-linux.sh
#   pnpm test-ct:docker:update-snapshots (from package directory)

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PACKAGE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
ROOT_DIR="$(cd "$PACKAGE_DIR/../../.." && pwd)"

echo "🐳 Generating Linux Playwright snapshots using Docker..."
echo "📁 Package directory: $PACKAGE_DIR"
echo "📁 Root directory: $ROOT_DIR"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "❌ Docker is not installed. Please install Docker first:"
  echo "   https://docs.docker.com/get-docker/"
  exit 1
fi

# Check if Docker daemon is running
if ! docker info &> /dev/null; then
  echo "❌ Docker daemon is not running. Please start Docker Desktop."
  exit 1
fi

echo "✅ Docker is available"
echo ""

# Read versions from .tool-versions
TOOL_VERSIONS_FILE="$ROOT_DIR/.tool-versions"
if [ ! -f "$TOOL_VERSIONS_FILE" ]; then
  echo "❌ .tool-versions file not found at: $TOOL_VERSIONS_FILE"
  exit 1
fi

NODE_VERSION=$(grep '^nodejs' "$TOOL_VERSIONS_FILE" | awk '{print $2}')
PNPM_VERSION=$(grep '^pnpm' "$TOOL_VERSIONS_FILE" | awk '{print $2}')

if [ -z "$NODE_VERSION" ] || [ -z "$PNPM_VERSION" ]; then
  echo "❌ Failed to read versions from .tool-versions"
  echo "   Expected format:"
  echo "   nodejs <version>"
  echo "   pnpm <version>"
  exit 1
fi

echo "📋 Versions from .tool-versions:"
echo "   Node.js: $NODE_VERSION"
echo "   pnpm: $PNPM_VERSION"
echo ""

# Use official Playwright image with browsers
PLAYWRIGHT_VERSION=$(cd "$PACKAGE_DIR" && node -p "require('./package.json').devDependencies['@playwright/experimental-ct-react'].replace('^', '')")
DOCKER_IMAGE="mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble"

echo "🔍 Using Playwright Docker image: $DOCKER_IMAGE"
echo "📥 Pulling Docker image (this may take a few minutes on first run)..."
docker pull "$DOCKER_IMAGE"
echo ""

echo "🧪 Running Playwright tests in Docker container to generate Linux snapshots..."
echo "⚠️  Note: Dependencies will be installed inside container for Linux compatibility"
echo ""

# Run Playwright tests in Docker container with anonymous volumes for:
# - node_modules (platform-specific native binaries)
# - .pnpm-store (pnpm's content-addressable store, also platform-specific)
docker run --rm \
  --ipc=host \
  -e PNPM_VERSION="${PNPM_VERSION}" \
  -v "$ROOT_DIR:/workspace" \
  -v /workspace/node_modules \
  -v /workspace/.pnpm-store \
  -v /workspace/packages/design-system/playwright/node_modules \
  -v /workspace/packages/design-system/main/node_modules \
  -v /workspace/packages/design-system/tokens/node_modules \
  -v /workspace/packages/design-system/primitives/node_modules \
  -w "/workspace" \
  "$DOCKER_IMAGE" \
  bash -c '
    set -e
    echo "📦 Installing dependencies in Linux environment..."
    echo "   (node_modules and .pnpm-store isolated from host using Docker volumes)"
    corepack enable
    corepack prepare pnpm@${PNPM_VERSION} --activate
    pnpm install --frozen-lockfile
    
    echo ""
    echo "🏗️  Building design system packages..."
    pnpm ds:tokens:build
    pnpm ds:primitives:build
    pnpm ds:main:build
    
    echo ""
    echo "🎭 Running Playwright component tests with --update-snapshots..."
    cd /workspace/packages/design-system/playwright
    pnpm test-ct --update-snapshots
    
    echo ""
    echo "✅ Linux snapshots generated successfully!"
  '

echo ""
echo "✅ Docker snapshot generation complete!"
echo ""
echo "📸 Linux snapshots have been generated (with -linux suffix)"
echo "💡 Next steps:"
echo "   1. Review the new snapshots in __snapshots__ directories"
echo "   2. Compress them: pnpm ds:test:compress-snapshots"
echo "   3. Commit them: git add . && git commit -m 'test: add Linux snapshots'"
echo ""
