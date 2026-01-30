# Snapshot Compression

This package includes automated snapshot compression using [oxipng](https://github.com/shssoichiro/oxipng).

## Why Compress Snapshots?

- **Reduces repository size**: Typical savings of 15-40%
- **Faster CI/CD**: Smaller snapshots = faster clones and pulls
- **100% lossless**: No quality degradation
- **Automatic**: Pre-commit hook handles it for you

## Two Compression Scripts

| Script                              | When                       | Scope              | Speed                  |
| ----------------------------------- | -------------------------- | ------------------ | ---------------------- |
| **compress-snapshots-precommit.sh** | Git commit (automatic)     | Only staged files  | <1 second (1-2 files)  |
| **compress-snapshots-manual.sh**    | After `--update-snapshots` | All snapshot files | ~10 seconds (62 files) |

## Typical Workflows

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

## Installation Requirements

The compression scripts require **oxipng** to be installed:

```bash
# macOS (Homebrew)
brew install oxipng

# Rust (cargo)
cargo install oxipng

# Verify installation
oxipng --version  # Should show: oxipng 10.0.0
```

## Compression Details

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

## Script Locations

- **Pre-commit script**: `scripts/compress-snapshots-precommit.sh`
- **Manual script**: `scripts/compress-snapshots-manual.sh`
- **Pre-commit hook**: `.husky/pre-commit` (root)
