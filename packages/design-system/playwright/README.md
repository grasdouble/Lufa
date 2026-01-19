# Playwright Component Testing

Component tests for the Lufa Design System using [Playwright Component Testing](https://playwright.dev/docs/test-components).

## 📚 Documentation

- **[Snapshot Management System](./SNAPSHOT-MANAGEMENT-SYSTEM.md)** - Complete guide to compression, Docker, and GitHub Actions workflows
- **[Docker Linux Snapshots](./DOCKER-LINUX-SNAPSHOTS.md)** - Cross-platform snapshot generation
- **[Compression Scripts](./scripts/README.md)** - Technical details on snapshot compression

## Quick Start

```bash
# Run tests
pnpm test-ct

# Run tests in UI mode (interactive)
pnpm test-ct:ui

# Update snapshots
pnpm test-ct:update-snapshots

# Compress snapshots (after updating)
pnpm compress-snapshots
```

## Running from Root

```bash
# Run tests
pnpm ds:test

# Run tests in UI mode
pnpm ds:test:ui

# Update snapshots
pnpm ds:test:update-snapshots

# Compress snapshots
pnpm ds:test:compress-snapshots
```

## Test Structure

Tests are organized by component category:

```
src/components/
├── forms/        # Form components (Button, Input, etc.)
├── layout/       # Layout components (Flex, Grid, Stack, etc.)
├── display/      # Display components (Avatar, Badge, Card, etc.)
├── navigation/   # Navigation components (Tabs, Menu, etc.)
├── feedback/     # Feedback components (Alert, Spinner, etc.)
├── overlay/      # Overlay components (Modal, etc.)
└── patterns/     # Patterns (Testimonial, etc.)
```

## Snapshot Compression

This package includes automated snapshot compression using [oxipng](https://github.com/shssoichiro/oxipng).

### Why Compress Snapshots?

- **Reduces repository size**: Typical savings of 15-40%
- **Faster CI/CD**: Smaller snapshots = faster clones and pulls
- **100% lossless**: No quality degradation
- **Automatic**: Pre-commit hook handles it for you

### Two Compression Scripts

| Script                              | When                       | Scope              | Speed                  |
| ----------------------------------- | -------------------------- | ------------------ | ---------------------- |
| **compress-snapshots-precommit.sh** | Git commit (automatic)     | Only staged files  | <1 second (1-2 files)  |
| **compress-snapshots-manual.sh**    | After `--update-snapshots` | All snapshot files | ~10 seconds (62 files) |

### Typical Workflows

**Scenario 1: Update one component snapshot**

```bash
pnpm test-ct  # Test fails, snapshot needs update
# Fix the test or component...
git add __snapshots__/.../button.png
git commit -m "update button snapshot"
# ✅ Pre-commit hook compresses only button.png (fast!)
```

**Scenario 2: Update all snapshots**

```bash
pnpm test-ct:update-snapshots  # Updates all 62 snapshots
pnpm compress-snapshots         # Compress all at once
git add .
git commit -m "update all snapshots"
# ✅ Already compressed, pre-commit is instant
```

### Installation Requirements

The compression scripts require **oxipng** to be installed:

```bash
# macOS (Homebrew)
brew install oxipng

# Rust (cargo)
cargo install oxipng

# Verify installation
oxipng --version  # Should show: oxipng 10.0.0
```

### Compression Details

**Settings** (optimized for quality and speed):

- Optimization level: 3 (filter brute-forcing)
- Strip safe metadata (keeps critical chunks like pHYs, sRGB)
- 100% lossless compression
- Multithreaded processing

**Performance**:

- ~60 snapshots compressed in under 10 seconds
- Individual files: <100ms each
- Already-optimized files: skipped automatically

**Typical results**:

- AspectRatio: 561KiB → 152KiB (73% saved)
- Divider: 72KiB → 29KiB (60% saved)
- Paper: 153KiB → 67KiB (56% saved)
- Modal: 111KiB → 55KiB (50% saved)

### Script Locations

- **Pre-commit script**: `scripts/compress-snapshots-precommit.sh`
- **Manual script**: `scripts/compress-snapshots-manual.sh`
- **Pre-commit hook**: `.husky/pre-commit` (root)

## Configuration

- **Config**: `playwright-ct.config.ts`
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Test files**: `src/components/**/*.spec.tsx`
- **Snapshots**: `__snapshots__/` (adjacent to test files)

## Writing Tests

See `.github/instructions/lufa-design-system-playwright-ct.instructions.md` for detailed testing guidelines.

**Example test**:

```typescript
import { test, expect } from '@playwright/experimental-ct-react';
import { Button } from '@grasdouble/lufa_design-system';

test('renders with correct variant', async ({ mount }) => {
  const component = await mount(<Button variant="primary">Click me</Button>);
  await expect(component).toContainText('Click me');
  await expect(component).toHaveClass(/btn-primary/);
});
```

## CI/CD

Tests run automatically on:

- Pull requests
- Pushes to main branch
- Before releases

## Troubleshooting

**Snapshots failing after compression?**

- Compression is 100% lossless - if tests fail, it's not due to compression
- Check if the component itself changed
- Update snapshots: `pnpm test-ct:update-snapshots`

**oxipng not found?**

- Install it: `brew install oxipng`
- Or skip the hook for one commit: `git commit --no-verify`

**Pre-commit hook too slow?**

- Use manual compression first: `pnpm compress-snapshots`
- Then commit (pre-commit will see files are already optimized)
