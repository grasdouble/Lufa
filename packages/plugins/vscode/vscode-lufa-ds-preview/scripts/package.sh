#!/usr/bin/env bash

# Parse options
INSTALL=false
while [[ $# -gt 0 ]]; do
  case $1 in
    --install|-i)
      INSTALL=true
      shift
      ;;
    *)
      echo "Unknown option: $1"
      echo "Usage: $0 [--install|-i]"
      exit 1
      ;;
  esac
done

echo "📦 Building extension..."
pnpm run build || exit 1

echo "📋 Packaging extension..."
rm -f *.vsix

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
VSIX_NAME="lufa-ds-preview-${VERSION}.vsix"

# Create a temporary package.json with simple name for vsce
cp package.json package.json.bak
node -e "
const pkg = require('./package.json');
pkg.name = 'lufa-ds-preview';
require('fs').writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

# Package with vsce
pnpm exec vsce package --no-dependencies

# Check if VSIX was created
if [ -f "$VSIX_NAME" ]; then
  echo "✅ VSIX file found"
else
  echo "❌ VSIX file not found after packaging"
fi

# Restore original package.json
mv package.json.bak package.json

if [ -f "$VSIX_NAME" ]; then
  echo "✅ Package created successfully: $VSIX_NAME"
  
  # Install if requested
  if [ "$INSTALL" = true ]; then
    echo ""
    echo "🔧 Installing extension locally..."
    code --install-extension "$VSIX_NAME" --force
    echo "✅ Extension installed successfully!"
    echo ""
    echo "🔄 Reload VS Code to activate the extension"
    echo "   Press Cmd+Shift+P and run 'Developer: Reload Window'"
  fi
  
  exit 0
else
  echo "❌ Failed to create package"
  exit 1
fi
