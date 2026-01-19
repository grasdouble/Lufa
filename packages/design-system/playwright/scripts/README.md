# Playwright Snapshot Compression Scripts

This directory contains scripts for compressing Playwright snapshot images to reduce repository size.

## Overview

Two compression scripts are provided with different optimization levels:

- **`compress-snapshots-precommit.sh`** - Automatic compression via pre-commit hook (staged files only, **level 3** for speed)
- **`compress-snapshots-manual.sh`** - Manual compression of all snapshots (**level 6** for maximum compression)

Both scripts use [oxipng](https://github.com/shssoichiro/oxipng) for 100% lossless PNG compression.

**Why different levels?**

- **Level 3 (pre-commit)**: Fast (~1 second per file), runs frequently, good compression
- **Level 6 (manual)**: Maximum compression (~3-6 seconds per file), runs rarely, best results

---

## compress-snapshots-precommit.sh

**Purpose**: Automatically compresses **staged** Playwright snapshot images before committing via git pre-commit hook.

**Usage**: Runs automatically via lint-staged when committing snapshot files. No manual invocation needed.

**Key behavior**:

- Called by [lint-staged](https://github.com/lint-staged/lint-staged) with list of staged files as arguments
- lint-staged handles file discovery and automatic re-staging after compression
- Only processes PNG files in `packages/design-system/playwright/__snapshots__/`

### What it does

1. Receives list of staged PNG snapshot files from lint-staged
2. Compresses each snapshot using oxipng with optimal settings:
   - Optimization level 3 (good balance between speed and compression)
   - Strip safe metadata (removes unnecessary chunks while keeping critical ones like pHYs, sRGB)
   - Preserves file attributes (timestamps, permissions)
3. lint-staged automatically re-stages compressed files
4. Shows individual file savings and total compression statistics

### Example output

```bash
🖼️  Compressing Playwright snapshots...
📦 Found 3 snapshot(s) to compress
  ✓ button-dark-chromium-darwin.png: 256KiB → 180KiB (saved 30%)
  ✓ input-light-chromium-darwin.png: 128KiB → 95KiB (saved 26%)
  ✓ modal-dark-chromium-darwin.png: Already optimized

✅ Compressed 3 snapshot(s)
💾 Total savings: 109KiB (28%)
```

### Technical details

- Uses [oxipng](https://github.com/shssoichiro/oxipng) - multithreaded lossless PNG optimizer
- 100% lossless compression (no quality loss)
- **Optimization level 3** - Balanced speed and compression (filter brute-forcing)
- Fast execution: ~1 second per file, ideal for pre-commit hooks
- Idempotent: running multiple times won't degrade quality
- Skips already-optimized files automatically
- Requires oxipng to be installed (see [Dependencies](#dependencies))
- **Managed by lint-staged**: Automatic file discovery and re-staging

---

## compress-snapshots-manual.sh

**Purpose**: Manually compress **all** Playwright snapshots (not just staged ones).

**Usage**:

```bash
# Via npm script (recommended - from root)
pnpm ds:test:compress-snapshots

# Or via Playwright package
cd packages/design-system/playwright
pnpm compress-snapshots

# Or directly
bash packages/design-system/playwright/scripts/compress-snapshots-manual.sh
```

**Key behavior**: Processes all PNG files in the snapshots directory (via `find`).

### When to use

1. After updating snapshots with `pnpm ds:test:update-snapshots`
2. When onboarding to the compression workflow for the first time
3. After pulling changes with new/updated snapshots
4. To batch-compress all existing snapshots

### What it does

1. Finds all PNG files in `packages/design-system/playwright/__snapshots__/`
2. Compresses each file using oxipng with the same settings as pre-commit hook
3. Shows detailed compression statistics for each file
4. Provides total savings summary

### Example output

```bash
🖼️  Compressing all Playwright snapshots in packages/design-system/playwright/__snapshots__...
📦 Found 62 snapshot(s) to compress
  ✓ button-all-variants-light.png: Already optimized
  ✓ aspectratio-dark.png: 561KiB → 200KiB (saved 64%)
  ✓ placeholder-light.png: 671KiB → 546KiB (saved 18%)
  ... (58 more files)

✅ Processed 62 snapshot(s)
💾 Total savings: 2.1MiB (17%)
📊 Before: 12.4MiB → After: 10.3MiB
```

### Compression settings

- **Optimization level: 6 (maximum compression)**
  - Uses all optimization strategies
  - Filter exhaustive search
  - Multiple compression trials
  - Best possible compression ratios
- Strip safe metadata: Removes non-critical chunks (keeps pHYs, sRGB, etc.)
- 100% lossless: No quality degradation
- Preserves file attributes

**Performance**: Processes ~60 snapshots in ~30-60 seconds on typical hardware (multithreaded).

**Why level 6?** Manual compression runs infrequently (after bulk updates), so we prioritize maximum compression over speed.

---

## Pre-commit Hook Setup

The project uses [Husky](https://typicode.github.io/husky/) to manage git hooks and [lint-staged](https://github.com/lint-staged/lint-staged) to run tasks on staged files.

### What's configured

**Pre-commit hook** (`.husky/pre-commit`): Runs `npx lint-staged` before every commit

**lint-staged config** (package-level): Each package defines its own lint-staged tasks in `package.json`

- Playwright package: PNG files in `**/__snapshots__/**/*.png` → Run `compress-snapshots-precommit.sh`
- Future: Other packages can add their own lint-staged configurations (ESLint, Prettier, tests, etc.)

**No root-level configuration needed**: lint-staged automatically discovers and runs package-level configurations

### How it works

1. You stage snapshot files: `git add packages/design-system/playwright/__snapshots__/...`
2. You commit: `git commit -m "update snapshots"`
3. Husky triggers pre-commit hook
4. Pre-commit hook runs `npx lint-staged`
5. lint-staged identifies staged PNG files matching pattern
6. lint-staged calls `compress-snapshots-precommit.sh` with file list
7. Script compresses each file
8. lint-staged automatically re-stages compressed files
9. Commit proceeds with optimized files

### Setup for new developers

Both Husky and lint-staged are initialized automatically when running `pnpm install`:

- Husky hooks are set up via the `prepare` script in root `package.json`
- lint-staged is installed as a dev dependency at the repository root
- **Package-level configurations** are defined in each package's `package.json` under `"lint-staged"`
- No additional setup needed - it works automatically after `pnpm install`

### Skipping the hook (not recommended)

```bash
# Skip pre-commit hook for a single commit
git commit --no-verify -m "message"
```

### Why compress snapshots?

- Reduces repository size (typical savings: **15-40%** with level 3, **20-45%** with level 6)
- Faster clones and pulls
- Lower CI/CD storage costs
- Better git performance with large binary files
- 100% lossless compression (no visual quality loss, perfect for test accuracy)
- Fast multithreaded processing
- **Hybrid approach**: Fast pre-commit (level 3) + thorough manual (level 6)

---

## Dependencies

Both compression scripts require:

- **oxipng** (v10.0.0+): Multithreaded lossless PNG optimizer
- **bash**: Scripts use bash shell features
- **lint-staged** (installed): Manages pre-commit file processing
- **husky** (installed): Manages git hooks

### Installation

```bash
# macOS (Homebrew)
brew install oxipng

# Rust (cargo)
cargo install oxipng

# Or download pre-built binaries
# https://github.com/shssoichiro/oxipng/releases

# Verify installation
oxipng --version
```

### Why oxipng?

- **Lossless**: 100% pixel-perfect compression (no quality loss)
- **Fast**: Multithreaded, typically 3-5x faster than other PNG optimizers
- **Better compression**: Often achieves 10-40% better compression than standard tools
- **Battle-tested**: Used in production by major projects (Mozilla, Cloudflare, etc.)
- **Smart**: Only rewrites files when compression is achieved

### lint-staged Configuration

The project uses a **package-level lint-staged setup** for monorepo-friendly pre-commit hooks.

**Package configuration**: `packages/design-system/playwright/package.json`

```json
{
  "lint-staged": {
    "**/__snapshots__/**/*.png": "bash packages/design-system/playwright/scripts/compress-snapshots-precommit.sh"
  }
}
```

**How it works**:

1. lint-staged automatically discovers package.json files with `"lint-staged"` configuration across the monorepo
2. When you stage Playwright snapshot files, lint-staged matches them against the pattern in the Playwright package
3. The script path is **relative to repository root** (since lint-staged runs from root)
4. Script receives absolute file paths from repository root
5. After compression, lint-staged automatically re-stages the compressed files

**Benefits of package-level config**:

- ✅ **No root-level configuration needed** - each package is self-contained
- ✅ **Package autonomy** - packages control their own pre-commit tasks
- ✅ **Clear separation of concerns** - compression logic stays within Playwright package
- ✅ **Easy to add new packages** - just add lint-staged config to package.json
- ✅ **Scalable** - works seamlessly as monorepo grows

**Why script path uses full path from root?**

lint-staged runs from the repository root, so all commands execute from root working directory. Using `packages/design-system/playwright/scripts/...` ensures the script is found correctly regardless of where files are staged from.

---

## Workflow Examples

### Example 1: Updating a single snapshot

```bash
# 1. Update specific snapshot
pnpm ds:test -- button.spec.tsx --update-snapshots

# 2. Stage the updated file
git add packages/design-system/playwright/__snapshots__/.../button-*.png

# 3. Commit (compression happens automatically)
git commit -m "test(button): update snapshot for new variant"

# Pre-commit hook output:
# 🖼️  Compressing Playwright snapshots...
# 📦 Found 1 snapshot(s) to compress
#   ✓ button-primary-chromium-darwin.png: 256KiB → 180KiB (saved 30%)
# ✅ Compressed 1 snapshot(s)
```

### Example 2: Mass snapshot update

```bash
# 1. Update all snapshots (e.g., after design token change)
pnpm ds:test:update-snapshots

# 2. Compress all snapshots at once (faster than pre-commit hook for bulk)
pnpm ds:test:compress-snapshots

# Output:
# 🖼️  Compressing all Playwright snapshots...
# 📦 Found 62 snapshot(s) to compress
# ... (compression details)
# ✅ Processed 62 snapshot(s)
# 💾 Total savings: 2.1MiB (17%)

# 3. Review and commit
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: update all snapshots after token changes"
```

### Example 3: First-time setup for existing snapshots

```bash
# 1. Install oxipng
brew install oxipng

# 2. Compress all existing snapshots
pnpm ds:test:compress-snapshots

# 3. Commit optimized snapshots
git add packages/design-system/playwright/__snapshots__/
git commit -m "chore: compress existing playwright snapshots"
```

---

## Troubleshooting

### oxipng not found

**Error**: `oxipng: command not found`

**Solution**: Install oxipng (see [Dependencies](#dependencies))

```bash
brew install oxipng
```

### Pre-commit hook not running

**Possible causes**:

1. Husky not initialized: Run `pnpm install` in the root directory
2. Git hooks disabled: Check `.git/hooks/pre-commit` exists and is executable
3. Committing with `--no-verify`: Skips all pre-commit hooks

### Snapshots not being compressed

**Check**:

1. Are you staging PNG files in the correct directory?
   - Should be: `packages/design-system/playwright/__snapshots__/**/*.png`
2. Is oxipng installed and accessible?
   - Run: `oxipng --version`
3. Are files already optimized?
   - oxipng skips files that can't be compressed further

### Script fails during commit

**If compression fails**:

1. Check oxipng installation: `which oxipng`
2. Check file permissions: Ensure snapshot files are writable
3. Try manual compression first: `pnpm ds:test:compress-snapshots`
4. Check script output for specific error messages

---

## Technical Details

### Compression Settings (Hybrid Approach)

The project uses a **hybrid compression strategy** with different optimization levels:

#### Pre-commit Hook: Level 3 (Fast)

```bash
oxipng -o 3 --strip safe --quiet --preserve <file>
```

**Rationale**: Runs frequently (every commit with snapshots), needs to be fast to not disrupt workflow.

**Parameter breakdown**:

- `-o 3`: Optimization level 3
  - Filter brute-forcing
  - Good compression with reasonable speed
  - ~1 second per file
- `--strip safe`: Remove non-critical PNG chunks
- `--quiet`: Suppress per-file output
- `--preserve`: Keep file attributes (timestamps, permissions)

#### Manual Compression: Level 6 (Maximum)

```bash
oxipng -o 6 --strip safe --quiet --preserve <file>
```

**Rationale**: Runs infrequently (bulk updates), can afford slower processing for maximum compression.

**Parameter breakdown**:

- `-o 6`: Maximum optimization level
  - Exhaustive filter search
  - Multiple compression trials
  - Best possible compression ratios
  - ~3-6 seconds per file
- `--strip safe`: Remove non-critical PNG chunks
  - Keeps: `pHYs`, `sRGB`, `iCCP`, `gAMA`, `cHRM`, etc.
  - Removes: `tEXt`, `iTXt`, `zTXt`, `tIME`, etc.
- `--quiet`: Suppress per-file output (our scripts provide custom output)
- `--preserve`: Keep file attributes (timestamps, permissions)

**Compression level comparison**:

| Level | Speed        | Compression   | Use Case               |
| ----- | ------------ | ------------- | ---------------------- |
| 0-1   | Very Fast    | Basic         | Quick previews         |
| 2     | Fast         | Good          | Real-time workflows    |
| **3** | **Balanced** | **Very Good** | **Pre-commit hook**    |
| 4     | Slower       | Better        | CI builds              |
| 5     | Slow         | Excellent     | Artifact optimization  |
| **6** | **Slowest**  | **Maximum**   | **Manual compression** |

### Path Handling

Scripts handle paths differently based on execution context:

**compress-snapshots-precommit.sh**:

- Called by lint-staged with absolute/relative file paths as arguments
- Receives file list from lint-staged (no need for `git diff`)
- lint-staged handles automatic re-staging after compression

**compress-snapshots-manual.sh**:

- Can be called from anywhere
- Uses `$SCRIPT_DIR` detection for relative paths
- Finds files via: `find __snapshots__ -type f -name "*.png"`

### Performance Characteristics

**Pre-commit hook (level 3, staged files only)**:

- Typical: 1-3 files, <3 seconds total
- Edge case: 10+ files, ~5-8 seconds
- Per-file average: ~1 second

**Manual compression (level 6, all files)**:

- 62 snapshots: ~30-60 seconds (multithreaded)
- Per-file average: ~3-6 seconds
- Worth the wait for maximum compression

**Why it's fast**:

- oxipng uses multiple CPU cores
- Skips already-optimized files
- Intelligent filter selection
- Level 3 optimized for speed-to-compression ratio

### Compression Ratio Expectations

Based on Lufa's snapshot compression strategy:

| Scenario                        | Files | Optimization | Before  | After  | Savings          |
| ------------------------------- | ----- | ------------ | ------- | ------ | ---------------- |
| Initial compression (level 6)   | 62    | Maximum      | 12.0 MB | 9.0 MB | 25%              |
| Pre-commit (level 3)            | 1-3   | Fast         | varies  | varies | 15-35%           |
| Manual re-compression (level 6) | 62    | Maximum      | 9.0 MB  | 8.5 MB | 5-10% additional |
| Already optimized (level 6)     | 62    | Maximum      | 8.5 MB  | 8.5 MB | 0%               |

**Factors affecting compression**:

- Screenshot complexity (gradients, noise compress poorly)
- Already compressed images (minimal gains)
- Screenshot size (larger = more potential savings)
- Optimization level (level 6 typically 2-5% better than level 3)

---

## Related Documentation

- [Playwright README](../README.md) - Component testing guide
- [Root Scripts README](../../../../scripts/README.md) - Other utility scripts
- [AGENTS.md](../../../../AGENTS.md) - AI agent development guide

---

## Maintenance

### Adding New Compression Settings

If you need to adjust compression settings:

**For pre-commit hook** (keep fast):

1. Edit `compress-snapshots-precommit.sh`
2. Modify the `oxipng -o 3` command (line ~61)
3. Consider levels 2-3 only (faster)
4. Test with: `bash .husky/pre-commit` (with staged snapshots)

**For manual compression** (optimize for size):

1. Edit `compress-snapshots-manual.sh`
2. Modify the `oxipng -o 6` command (line ~61)
3. Consider levels 4-6 only (better compression)
4. Test with: `pnpm ds:test:compress-snapshots`

**Important**: Keep different optimization levels for different use cases. Pre-commit needs speed, manual can afford thoroughness.

### Testing Scripts Locally

```bash
# Test pre-commit hook (level 3) without committing
git add packages/design-system/playwright/__snapshots__/.../some-file.png
bash .husky/pre-commit

# Test manual compression (level 6)
pnpm ds:test:compress-snapshots

# Test on a single file (level 3 - fast)
oxipng -o 3 --strip safe --preserve packages/design-system/playwright/__snapshots__/.../test.png

# Test on a single file (level 6 - maximum)
oxipng -o 6 --strip safe --preserve packages/design-system/playwright/__snapshots__/.../test.png

# Compare compression levels
cp test.png test-copy.png
oxipng -o 3 test.png
oxipng -o 6 test-copy.png
ls -lh test*.png  # Compare sizes
```

### CI/CD Integration (Future Enhancement)

Consider adding CI checks to ensure snapshots remain compressed:

```bash
# Detect uncompressed snapshots
find packages/design-system/playwright/__snapshots__ -name "*.png" -exec oxipng --check {} \;
```

This would fail CI if uncompressed snapshots are committed (e.g., if developer skipped pre-commit hook).

---

## FAQ

**Q: Will compression affect test accuracy?**  
A: No. oxipng uses 100% lossless compression - every pixel remains identical.

**Q: Why different optimization levels for pre-commit vs manual?**  
A: Pre-commit runs frequently and needs speed (level 3 = ~1s/file). Manual runs rarely and can afford maximum compression (level 6 = ~3-6s/file, 2-5% better compression).

**Q: Can I skip compression for a specific commit?**  
A: Yes, use `git commit --no-verify`, but this is not recommended.

**Q: What if I don't have oxipng installed?**  
A: The pre-commit hook will show an error. Install with: `brew install oxipng`

**Q: Do I need to compress snapshots manually after updates?**  
A: Not required - the pre-commit hook handles it with level 3. Use manual compression (level 6) for maximum optimization after bulk updates.

**Q: How much better is level 6 compared to level 3?**  
A: Typically 2-5% additional compression, but takes 3-6x longer. Worth it for bulk optimization, not for individual commits.

**Q: Can I use level 6 for pre-commit hook?**  
A: Not recommended. It would make every commit with snapshots take 30+ seconds, which disrupts workflow. Stick to level 3 for pre-commit.

**Q: Will this work on Windows?**  
A: Yes, if you have oxipng and bash available (e.g., via Git Bash, WSL, or Cygwin).

**Q: What happens if compression fails mid-commit?**  
A: The commit is aborted, and you'll see an error message. Fix the issue (usually missing oxipng) and try again.

**Q: Should I re-compress existing snapshots with level 6?**  
A: If they were previously compressed with level 3, you might gain 2-5% additional savings. Run `pnpm ds:test:compress-snapshots` to find out.
