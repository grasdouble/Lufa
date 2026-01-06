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
if [ -f "lufa-ds-preview-0.1.0.vsix" ]; then
  echo "✅ VSIX file found"
else
  echo "❌ VSIX file not found after packaging"
fi

# Restore original package.json
mv package.json.bak package.json

if [ -f "lufa-ds-preview-0.1.0.vsix" ]; then
  echo "✅ Package created successfully: lufa-ds-preview-0.1.0.vsix"
  
  # Install if requested
  if [ "$INSTALL" = true ]; then
    echo ""
    echo "🔧 Installing extension locally..."
    code --install-extension lufa-ds-preview-0.1.0.vsix --force
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
