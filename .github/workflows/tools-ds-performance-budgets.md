# Performance Budgets CI Workflow

## Overview

This GitHub Actions workflow automatically monitors design system performance metrics on every pull request to catch performance regressions before they reach production. It enforces strict budgets for bundle size, build time, test execution, and CSS cascade performance.

**Workflow File:** `.github/workflows/tools-ds-performance-budgets.yml`  
**CLI Tool:** `packages/design-system/cli/` (Phase 7a validation tool)

---

## What Gets Measured

### 1. **Bundle Size** 📦

**Measured:**

- JavaScript bundle size (uncompressed)
- CSS file size (uncompressed)
- Total bundle size
- Gzipped size (compression ratio)

**Budget:**

- Total uncompressed: **<200 KB**
- Gzipped: **<50 KB**

**Why it matters:** Large bundles slow down page loads and hurt user experience, especially on slower networks.

---

### 2. **Build Time** ⏱️

**Measured:**

- Time to build all design system packages
  - Primitives
  - Tokens
  - Themes
  - Main component library

**Budget:** **<30 seconds**

**Why it matters:** Fast builds improve developer productivity and CI/CD pipeline efficiency.

---

### 3. **Test Execution Time** 🧪

**Measured:**

- Time to run all 657 Playwright component tests
- Chromium browser only (for CI speed)

**Budget:** **<120 seconds** (warning only)

**Why it matters:** Fast tests enable rapid feedback loops and don't block CI pipelines.

---

### 4. **CSS Cascade Performance** 🎨

**Measured:**

- Time to validate complete CSS variable resolution chain
- Uses Phase 7a CLI validation tool
- Measures: `primitive → core → semantic → component` resolution

**Budget:** **<20ms** (warning only)

**Why it matters:** Fast CSS cascade ensures minimal runtime performance impact from design tokens.

---

## When It Runs

The workflow triggers on:

- **Pull Requests** - When component, token, or build config files change
- **Manual Trigger** - Via GitHub Actions UI (`workflow_dispatch`)

**Watched Paths:**

```yaml
paths:
  - 'packages/design-system/main/src/**/*.tsx' # Component source
  - 'packages/design-system/main/src/**/*.ts' # Component types
  - 'packages/design-system/main/src/**/*.css' # Component styles
  - 'packages/design-system/tokens/**/*.json' # Design tokens
  - 'packages/design-system/main/vite.config.ts' # Build config
  - 'packages/design-system/main/package.json' # Dependencies
  - '.github/workflows/tools-ds-performance-budgets.yml'
```

---

## How It Works

### Step-by-Step Process

1. **Checkout Code** - Gets the latest code from the repository
2. **Setup Environment** - Installs pnpm and Node.js
3. **Install Dependencies** - Installs all packages
4. **Build Design System** - Compiles tokens, themes, and components
5. **Measure Build Time** - Records total build duration
6. **Measure Bundle Size** - Analyzes output files
7. **Run Tests** - Executes 657 component tests and measures time
8. **Run CSS Cascade Validation** - Measures token resolution performance
9. **Check Budgets** - Compares metrics against budgets
10. **Comment on PR** - Posts detailed performance report
11. **Pass or Fail** - Exits based on budget compliance

---

## Understanding Performance Budgets

### Bundle Size Budget

**Target:** <200 KB uncompressed, <50 KB gzipped

**What's included:**

- All component code (Box, Stack, Text, Icon, Button, Badge, Divider, etc.)
- Bundled dependencies (lucide-react icons)
- Component styles (CSS)

**What's excluded:**

- React (peer dependency, not bundled)
- Design tokens (separate package)
- Other peer dependencies

**Why this budget?**

- 200 KB uncompressed is reasonable for a comprehensive component library
- 50 KB gzipped ensures fast network transfer (~1s on 3G)
- Typical compression ratio: 70-80%

---

### Build Time Budget

**Target:** <30 seconds

**What's included:**

- Token generation (Style Dictionary)
- Theme compilation
- Component build (Vite)
- TypeScript declaration generation
- Utility class generation

**Why this budget?**

- Fast builds keep CI pipelines efficient
- 30s allows for comprehensive builds without blocking developers
- Includes time for all 4 packages (primitives, tokens, themes, main)

---

### Test Execution Budget

**Target:** <120 seconds (warning only, doesn't fail build)

**What's included:**

- 657 Playwright component tests
- Visual regression snapshots
- Accessibility checks
- Interaction tests

**Why this budget?**

- 120s (2 minutes) for 657 tests = ~0.18s per test
- Reasonable for component tests with rendering
- Warning-only because test time varies with CI runner load

---

### CSS Cascade Budget

**Target:** <20ms (warning only, doesn't fail build)

**What's measured:**

- Complete CSS variable resolution chain
- Token lookup and validation
- Circular reference detection
- Format validation

**Why this budget?**

- 20ms is imperceptible to users
- Validates that token architecture doesn't cause runtime performance issues
- Warning-only because CLI validation time varies

---

## PR Performance Report

The workflow automatically posts a comment to your PR with detailed results:

### ✅ Success Example

```markdown
## ⚡ Performance Budget Report

### ✅ All Performance Budgets Passed!

Your changes meet all performance requirements. Great work! 🎉

### 📊 Performance Metrics

| Metric           | Current   | Budget | Status  |
| ---------------- | --------- | ------ | ------- |
| **Bundle Size**  | 145.32 KB | 200 KB | ✅ Pass |
| **JS Size**      | 125.18 KB | -      | ℹ️ Info |
| **CSS Size**     | 20.14 KB  | -      | ℹ️ Info |
| **Gzipped Size** | 42.67 KB  | 50 KB  | ✅ Pass |
| **Build Time**   | 18.45s    | 30s    | ✅ Pass |
| **Test Time**    | 95.32s    | 120s   | ✅ Pass |
| **CSS Cascade**  | 12ms      | 20ms   | ✅ Pass |

### 📦 Size Breakdown
```

JavaScript: 125.18 KB
CSS: 20.14 KB
────────────────────
Total: 145.32 KB
Gzipped: 42.67 KB (29% compression)

```

### ⏱️ Timing Breakdown

```

Build: 18.45s
Tests (657): 95.32s
CSS Cascade: 12ms

```

```

---

### ❌ Budget Exceeded Example

```markdown
## ⚡ Performance Budget Report

### ⚠️ Performance Budget Exceeded

2 performance budget(s) exceeded. Please review the metrics below.

### 📊 Performance Metrics

| Metric           | Current   | Budget | Status  |
| ---------------- | --------- | ------ | ------- |
| **Bundle Size**  | 215.48 KB | 200 KB | ❌ Fail |
| **JS Size**      | 185.22 KB | -      | ℹ️ Info |
| **CSS Size**     | 30.26 KB  | -      | ℹ️ Info |
| **Gzipped Size** | 58.34 KB  | 50 KB  | ❌ Fail |
| **Build Time**   | 25.12s    | 30s    | ✅ Pass |
| **Test Time**    | 102.56s   | 120s   | ✅ Pass |
| **CSS Cascade**  | 15ms      | 20ms   | ✅ Pass |

### 📦 Size Breakdown
```

JavaScript: 185.22 KB
CSS: 30.26 KB
────────────────────
Total: 215.48 KB
Gzipped: 58.34 KB (27% compression)

```

### 💡 How to Fix

**Bundle Size Exceeded:**
- Review component complexity and remove unused code
- Check for duplicate dependencies or heavy libraries
- Consider code splitting or lazy loading
- Run `pnpm ds:main:build` locally to analyze bundle

**Gzipped Size Exceeded:**
- Ensure code minification is working correctly
- Remove comments and debug code
- Check for repetitive code patterns
```

---

## Running Performance Checks Locally

### Run All Performance Checks

```bash
# From repository root

# 1. Build and measure time
time pnpm ds:tokens:build && \
     pnpm ds:themes:build && \
     pnpm ds:main:build

# 2. Check bundle size
ls -lh packages/design-system/main/dist/
du -sh packages/design-system/main/dist/

# 3. Check gzipped size
gzip -c packages/design-system/main/dist/lufa-ui.mjs | wc -c
# Convert bytes to KB: divide by 1024

# 4. Run tests and measure time
time pnpm ds:test

# 5. Run CSS cascade validation
cd packages/design-system/cli
time pnpm exec tsx src/index.ts validate --theme <your-theme.css> --all
```

---

### Analyze Bundle Size

```bash
# Build design system
pnpm ds:main:build

# Check file sizes
cd packages/design-system/main/dist
ls -lh

# Expected output:
# lufa-ui.mjs    - Main JavaScript bundle
# lufa-ui.mjs.map - Source map
# style.css      - Component styles
# index.d.ts     - TypeScript declarations
```

---

### Optimize Bundle Size

**1. Check for unused code:**

```bash
# Analyze bundle composition
cd packages/design-system/main
npx vite-bundle-visualizer

# Or use Rollup plugin
pnpm add -D rollup-plugin-visualizer
```

**2. Review dependencies:**

```bash
# Check which dependencies are bundled
cd packages/design-system/main
cat vite.config.ts | grep -A 10 "externalizeDeps"

# Current: lucide-react is bundled (icons)
# Others are externalized (peer deps)
```

**3. Remove unused imports:**

```bash
# Find unused exports
pnpm ds:main:lint
pnpm ds:main:typecheck
```

---

### Optimize Build Time

**1. Profile build:**

```bash
# Measure each step
time pnpm ds:tokens:build       # ~2s (Style Dictionary)
time pnpm ds:themes:build       # ~1s
time pnpm ds:main:build         # ~15-20s (Vite + TypeScript)
```

**2. Check Vite config:**

```bash
# Review build optimization settings
cat packages/design-system/main/vite.config.ts

# Key settings:
# - target: 'esnext' (modern browsers only)
# - minify: false (faster builds, larger bundles)
# - sourcemap: true (debugging)
```

**3. Optimize TypeScript:**

```bash
# Check TypeScript config
cat packages/design-system/main/tsconfig.build.json

# Key settings:
# - incremental: true (faster rebuilds)
# - composite: true (project references)
```

---

## Troubleshooting

### Issue: Bundle Size Suddenly Increased

**Symptoms:**

- PR fails with bundle size budget exceeded
- No obvious code changes that would increase size

**Investigation:**

```bash
# 1. Build and check files
pnpm ds:main:build
ls -lh packages/design-system/main/dist/

# 2. Compare with main branch
git checkout main
pnpm ds:main:build
ls -lh packages/design-system/main/dist/
# Note the sizes

git checkout <your-branch>
pnpm ds:main:build
ls -lh packages/design-system/main/dist/
# Compare

# 3. Check for new dependencies
git diff main package.json packages/design-system/main/package.json
```

**Common causes:**

- New dependency added (check package.json)
- Dependency version bump that increased size
- New icon imports from lucide-react (bundled)
- Accidentally bundled a peer dependency

**Solutions:**

- Remove unnecessary dependencies
- Externalize heavy dependencies
- Use dynamic imports for optional features
- Tree-shake unused code

---

### Issue: Build Time Increased

**Symptoms:**

- PR fails with build time budget exceeded
- Build used to be faster

**Investigation:**

```bash
# Profile each build step
time pnpm ds:tokens:build
time pnpm ds:themes:build
time pnpm ds:main:build
```

**Common causes:**

- More components added (expected)
- Complex TypeScript types (slow type checking)
- More tokens to process
- CI runner slower than usual

**Solutions:**

- Simplify complex TypeScript types
- Use incremental TypeScript builds
- Cache build artifacts in CI
- Accept slightly longer builds for larger library (update budget)

---

### Issue: Test Execution Slow

**Symptoms:**

- Test time warning in PR comment
- Tests used to be faster

**Investigation:**

```bash
# Run tests locally with timing
time pnpm ds:test

# Run specific test file
cd packages/design-system/playwright
pnpm exec playwright test Box.spec.tsx --reporter=list

# Check for slow tests
pnpm exec playwright test --reporter=html
# Open HTML report and sort by duration
```

**Common causes:**

- More tests added (expected)
- Visual regression snapshots taking longer
- Network timeouts or flaky tests
- CI runner slower than usual

**Solutions:**

- Optimize slow tests (reduce wait times)
- Run tests in parallel (already enabled)
- Increase test timeout if needed
- Accept warning (doesn't fail build)

---

### Issue: Workflow Fails But All Checks Pass

**Symptoms:**

- All performance checks show green ✅
- Workflow still fails

**Investigation:**

```bash
# Check workflow logs in GitHub Actions
# Look for step that failed

# Common issues:
# - Missing bc command (for calculations)
# - stat command syntax (Linux vs macOS)
# - gzip not found
# - File paths incorrect
```

**Solutions:**

- Review workflow logs for specific error
- Test script commands locally in Linux environment:
  ```bash
  docker run -it --rm ubuntu:latest
  apt-get update && apt-get install -y bc gzip
  # Test commands
  ```

---

### Issue: Gzipped Size Not Calculated

**Symptoms:**

- PR comment shows "Gzipped Size: N/A"
- Budget shows "N/A" for gzip check

**Cause:**

- `gzip` command not available in CI runner (rare)

**Solution:**

- Install gzip in workflow:
  ```yaml
  - name: Install gzip
    run: sudo apt-get install -y gzip
  ```

---

## Performance Budget Configuration

### Current Budgets

```yaml
Bundle Size: 200 KB  (uncompressed, total)
Gzipped Size: 50 KB   (compressed)
Build Time: 30 sec  (all packages)
Test Time: 120 sec (warning only, 657 tests)
CSS Cascade: 20 ms   (warning only, CLI validation)
```

### Adjusting Budgets

If your design system grows and budgets need adjustment:

**1. Update workflow file:**

```yaml
# In .github/workflows/tools-ds-performance-budgets.yml

# Bundle size budget (line ~92)
BUNDLE_BUDGET=250  # Increased from 200

# Gzipped size budget (line ~103)
GZIP_BUDGET=60     # Increased from 50

# Build time budget (line ~112)
BUILD_BUDGET=45    # Increased from 30
```

**2. Document why:**

```bash
# Add comment in workflow file
# Budget increased to 250 KB due to:
# - Added 10 new components
# - Additional icon set (lucide-react)
# - Increased functionality
```

**3. Get team approval:**

- Create PR with budget adjustment
- Document rationale in PR description
- Get approval from tech lead/architect

---

## Integration with Other Workflows

This workflow works alongside:

- **`tools-ds-main-validate-components.yml`** - Component code quality
- **`tools-ds-visual-regression.yml`** - Visual regression testing
- **`tools-ds-playwright-ct.yml`** - Complete component testing
- **`tools-lint.yml`** - Code style and linting

**Workflow Coordination:**

1. **Component changes** → Triggers validation + visual regression + performance
2. **Token changes** → Triggers token validation + visual regression + performance
3. **Build config changes** → Triggers performance budgets
4. **Performance regression** → Blocks PR merge

---

## Performance Optimization Best Practices

### ✅ Do's

1. **Monitor trends** - Track performance metrics over time
2. **Optimize early** - Don't wait for budgets to be exceeded
3. **Profile regularly** - Identify slow build/test steps
4. **Use tree-shaking** - Ensure unused code is removed
5. **Externalize deps** - Don't bundle peer dependencies
6. **Lazy load** - Use dynamic imports for optional features
7. **Compress assets** - Ensure minification and gzip work correctly
8. **Cache builds** - Use incremental builds where possible

### ❌ Don'ts

1. **Don't ignore warnings** - Address performance issues early
2. **Don't bundle everything** - Externalize what you can
3. **Don't add heavy deps** - Review bundle size impact first
4. **Don't skip optimization** - Minify and compress in production
5. **Don't test in isolation** - Consider full page load impact
6. **Don't increase budgets arbitrarily** - Justify with data
7. **Don't disable checks** - Keep performance monitoring active

---

## Performance History Tracking

### Manual Tracking

Record performance metrics for each release:

```markdown
# \_docs/performance-history.md

## v2.0.0 (2026-01-26)

- Bundle: 145 KB uncompressed, 42 KB gzipped
- Build time: 18s
- Test time: 95s
- Components: 7 core + 12 utility

## v1.9.0 (2026-01-15)

- Bundle: 138 KB uncompressed, 40 KB gzipped
- Build time: 16s
- Test time: 82s
- Components: 7 core + 10 utility
```

### Automated Tracking (Future Enhancement)

Consider adding:

- Performance metrics to commit messages
- GitHub Action to track metrics over time
- Dashboard for visualizing trends
- Alerts for significant regressions

**Example tools:**

- [bundlesize](https://github.com/siddharthkp/bundlesize)
- [size-limit](https://github.com/ai/size-limit)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

---

## FAQ

### Q: Why are some budgets "warning only"?

**A:** Test time and CSS cascade time vary based on CI runner load and can produce false positives. We monitor them but don't fail builds to avoid blocking legitimate PRs.

---

### Q: Can I temporarily disable performance checks?

**A:** Not recommended, but you can:

1. **Skip workflow for specific commits:**

   ```bash
   git commit -m "feat: add component [skip-perf]"
   ```

   Then update workflow trigger to check commit message.

2. **Increase budget temporarily:**
   - Update workflow file
   - Get approval
   - Revert after optimization

---

### Q: How do I know which dependency increased bundle size?

**A:**

```bash
# Install bundle analyzer
pnpm add -D rollup-plugin-visualizer

# Update vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  // ... other plugins
  visualizer({ filename: 'dist/stats.html' })
]

# Build and view report
pnpm ds:main:build
open packages/design-system/main/dist/stats.html
```

---

### Q: Should I optimize for bundle size or build time?

**A:** **Bundle size first**, then build time.

**Rationale:**

- Bundle size directly impacts user experience (load time)
- Build time impacts developer experience (CI wait time)
- Users > developers in this tradeoff

**Exception:** If build time exceeds 60s, prioritize build optimization to keep CI efficient.

---

### Q: What's a reasonable gzip compression ratio?

**A:** **70-80% compression** is typical for JavaScript and CSS.

**Examples:**

- 200 KB uncompressed → 50-60 KB gzipped (75% compression)
- 100 KB uncompressed → 25-30 KB gzipped (75% compression)

**Poor compression (<50%)** indicates:

- Already compressed data (images, fonts)
- Random or encrypted content
- Very short files (gzip overhead)

---

### Q: How often should performance budgets be reviewed?

**A:** **Quarterly or when adding major features**.

**Review checklist:**

- Are budgets still realistic given system growth?
- Have we hit budgets multiple times?
- Is the system significantly larger/smaller?
- Have performance expectations changed?

---

## Related Documentation

- **Component Validation:** `.github/workflows/README-validate-components.md`
- **Visual Regression:** `.github/workflows/README-visual-regression.md`
- **Sprint Plan:** `_bmad-output/sprints/phase-7c-sprint-plan.md`
- **CLI Tool:** `packages/design-system/cli/README.md`
- **Vite Config:** `packages/design-system/main/vite.config.ts`

---

## Status

✅ **Active** - Story 10.3 Complete (Phase 7c)

**Created:** January 26, 2026  
**Last Updated:** January 26, 2026  
**Maintained By:** BMAD System (Lufa Design System Team)

---

_Part of Lufa Design System v2.0 - Phase 7c: CI/CD Integration & Documentation_
