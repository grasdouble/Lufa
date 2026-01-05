# Lufa Color Preview (VSCode Extension)

This extension shows color decorators for Lufa tokens in TypeScript and CSS files. It comes with **bundled color maps** for both primitives and tokens, so it works out of the box without any build step!

## Features

- **Bundled color maps**: The extension includes the latest primitive and token color maps, no setup required
- **Separate data sources**: Primitive colors from `@grasdouble/lufa_design-system-primitives`, token colors from `@grasdouble/lufa_design-system-tokens`
- **CSS support**: Shows colors for `--lufa-color-*` variables (both in `var()` usage and declarations)
- **TypeScript support**: Shows colors for `primitives.color.*.*[*]` references
- **Custom maps**: Optionally use custom color maps from your workspace
- **Auto-reload**: Automatically detects and reloads when custom color maps change
- **Security**: Validates custom file paths to ensure they're within workspace
- **Debug mode**: Comprehensive logging for troubleshooting

## Quick Start

1. Open this folder in VSCode
2. Press `F5` to launch an Extension Development Host
3. Open a file that uses Lufa color tokens:
   - CSS: `var(--lufa-color-text-primary)` or `--lufa-color-background: oklch(...)`
   - TypeScript: `primitives.color.chromatic.red[500]` or `primitives.color.neutral.neutral[900]`
4. See colored squares next to your tokens! 🎨

## Build the Extension

From this folder:

```bash
pnpm install
pnpm run build
```

## Package and Install Locally

The extension can be packaged using the unified `package.sh` script:

```bash
# Build and package only (no installation)
pnpm run build-and-no-install
# or directly:
pnpm run build && ./scripts/package.sh

# Build, package, and install in one command
pnpm run build-and-install
# or directly:
pnpm run build && ./scripts/package.sh --install
```

**Note:** The packaging script temporarily renames the package for VS Code compatibility while keeping your scoped npm package name (`@grasdouble/lufa_plugin_vscode_lufa-color-preview`).

## Update the Bundled Color Maps

The extension includes default color maps in `src/` that are used as fallback. To update these with the latest tokens and primitives:

```bash
# From repo root, build both packages
pnpm --filter @grasdouble/lufa_design-system-primitives build
pnpm --filter @grasdouble/lufa_design-system-tokens build

# From the extension directory, copy the new maps
pnpm copy-color-maps

# Rebuild the extension
pnpm run build
```

Or use the helper script directly:

```bash
# From the extension directory
./scripts/copy-color-maps.sh
```

The build process will automatically:

1. First try to use the built maps from the design system packages
2. Fall back to the default maps in `src/` if the packages aren't built
3. Show warnings if neither is available

## Configuration

### Custom Color Maps (Optional)

The extension supports two separate color maps for better separation of concerns:

```json
{
  "lufaColorPreview.primitivesMapPath": "packages/design-system/primitives/dist/primitives-colors.map.json",
  "lufaColorPreview.tokensMapPath": "packages/design-system/tokens/dist/tokens-colors.map.json"
}
```

**Legacy single-file support** is still available for backward compatibility:

```json
{
  "lufaColorPreview.mapPath": "path/to/legacy/colors.map.json"
}
```

The path can be:

- Relative to workspace root: `"packages/design-system/tokens/dist/tokens-colors.map.json"`
- Absolute: `"/Users/you/project/tokens-colors.map.json"`

If custom maps are not found, the extension falls back to the bundled maps.

**Note:** The extension will automatically watch the custom color map files for changes and reload colors when files are updated.

### Debug Mode

Enable debug logging to troubleshoot issues:

```json
{
  "lufaColorPreview.debug": true
}
```

Then check the "Lufa Color Preview" output channel: View → Output → Select "Lufa Color Preview" from the dropdown.

## How It Works

1. The extension registers a `DocumentColorProvider` for CSS, SCSS, PostCSS, TypeScript, and TypeScript React files
2. It uses regex patterns to find Lufa color tokens in your code
3. For each token, it looks up the OKLCH color value in the color map
4. It converts OKLCH to RGB and displays a color decorator in the editor

## Supported Token Formats

### CSS/SCSS/PostCSS

```css
/* Variable usage */
color: var(--lufa-color-text-primary);
background: var(--lufa-color-background-success, #fallback);

/* Variable declarations */
--lufa-color-text-primary: oklch(90% 0.05 200);
--lufa-color-background: oklch(20% 0.1 180 / 0.5);
```

### TypeScript/TSX

```typescript
// Primitive color references (3-level paths)
const color1 = primitives.color.chromatic.red[500];
const color2 = primitives.color.neutral.neutral[900];
const color3 = primitives.color.chromatic.blue[100];
```

## Troubleshooting

**No colors showing up?**

1. Make sure you're in the Extension Development Host (launched with F5), not the main VSCode window
2. Enable debug mode and check the Output panel for "Lufa Color Preview"
3. Verify your token syntax matches the supported formats above
4. Check that the bundled default maps exist in `src/` directory

**Colors are outdated?**

1. Update the default maps: `pnpm copy-color-maps` (after building the design system packages)
2. Rebuild the extension: `pnpm run build`
3. Reload the Extension Development Host
4. If using custom map paths, the extension automatically reloads when files change

**Build warnings about missing color maps?**

The build process uses a smart fallback system:

1. **First choice**: Uses built packages from `design-system/primitives/dist` and `design-system/tokens/dist`
2. **Fallback**: Uses default maps from `src/default-*.map.json`
3. **Warning**: Shows if neither is available

If you see warnings, either:

- Build the design system packages: `pnpm --filter @grasdouble/lufa_design-system-{primitives,tokens} build`
- Or update the default maps: `pnpm copy-color-maps`

**Custom color map not loading?**

1. Check the file path in settings is correct (relative to workspace root or absolute)
2. Enable debug mode to see detailed error messages
3. Verify the color map has the correct JSON structure (see How It Works section)
4. Ensure the path is within your workspace for security reasons

## Development

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Type check
pnpm typecheck

# Lint and format
pnpm lint
pnpm format
```

### Build Configuration

- **Source**: `src/extension.ts`
- **Bundled map**: `src/default-colors.map.json`
- **Build output**: `dist/extension.js`, `dist/default-colors.map.json`
- **TypeScript**: 5.9.3, targeting ES2020
- **Packaging**: vsce 3.7.1 with secretlint validation (requires `publicHoistPattern[]=*secretlint*` in root `.npmrc`)
