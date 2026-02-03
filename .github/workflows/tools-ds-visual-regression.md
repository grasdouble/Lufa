# Visual Regression Testing CI Workflow

## Overview

This GitHub Actions workflow automatically runs visual regression tests on design system components to detect unintended visual changes. It compares component screenshots against baseline snapshots and reports any differences in pull requests.

**Workflow File:** `.github/workflows/tools-ds-visual-regression.yml`  
**Test Directory:** `packages/design-system/playwright/`  
**Snapshots:** `packages/design-system/playwright/__snapshots__/`

---

## What Gets Tested

### 657 Visual Regression Tests

All design system components are tested with pixel-perfect screenshot comparisons:

**Core Components:**

- ✅ Box - All variants and states
- ✅ Stack - Spacing and alignment
- ✅ Text - Typography styles
- ✅ Icon - All icon variants
- ✅ Button - All variants and sizes
- ✅ Badge - All variants
- ✅ Divider - Orientations

**Layout Components:**

- ✅ Center - Centering behavior
- ✅ Container - Width constraints
- ✅ Flex - Flexbox layouts
- ✅ Grid - Grid layouts

**Utility Components:**

- ✅ Portal - Portal rendering
- ✅ VisuallyHidden - Accessibility
- ✅ Label - Form labels

**Composition Examples:**

- ✅ Input - Text input component
- ✅ Card - Card compositions

### Test Coverage

Each component is tested in:

- **☀️ Light mode** - Default theme
- **🌙 Dark mode** - Dark theme
- **💻 Desktop viewport** - 1280x720 resolution
- **🌐 Chromium browser** - Latest stable

---

## When It Runs

The workflow triggers on:

- **Pull Requests** - When component, test, or token files change
- **Manual Trigger** - Via GitHub Actions UI (`workflow_dispatch`)

**Watched Paths:**

```yaml
paths:
  - 'packages/design-system/main/src/**/*.tsx' # Component source
  - 'packages/design-system/main/src/**/*.ts' # Component types
  - 'packages/design-system/playwright/**/*.tsx' # Test files
  - 'packages/design-system/playwright/**/*.ts' # Test helpers
  - 'packages/design-system/tokens/**/*.json' # Design tokens
  - '.github/workflows/tools-ds-visual-regression.yml'
```

---

## How It Works

### Step-by-Step Process

1. **Checkout Code** - Gets the latest code from the repository
2. **Setup Environment** - Installs pnpm, Node.js, and Playwright browsers
3. **Build Design System** - Compiles tokens, themes, and components
4. **Run Visual Tests** - Takes screenshots and compares against baselines
5. **Generate Report** - Counts test results and visual differences
6. **Upload Artifacts** - Packages test results and diff images
7. **Comment on PR** - Posts detailed visual regression report
8. **Pass or Fail** - Exits based on visual differences detected

---

## Understanding Visual Diffs

### What is a Visual Diff?

A visual diff is generated when a component's current screenshot doesn't match the baseline snapshot. Playwright automatically creates three images:

1. **`*-actual.png`** - Current rendering of the component
2. **`*-expected.png`** - Baseline snapshot (what it should look like)
3. **`*-diff.png`** - Visual difference highlighting:
   - 🔴 **Red pixels** - Removed/changed from baseline
   - 🟢 **Green pixels** - Added/changed in current
   - ⚫ **Gray pixels** - Unchanged

### Example Diff Scenarios

#### Scenario 1: Intentional Design Change

```
Component: Button
Change: Updated padding from 12px to 16px
Result: ✅ Visual diff expected (update baseline)
Action: Add label `snapshot-update` to PR
```

#### Scenario 2: Token Update

```
Component: All components using --lufa-semantic-ui-text-primary
Change: Updated primary text color token
Result: ✅ Multiple visual diffs expected (update baselines)
Action: Add label `snapshot-update` to PR
```

#### Scenario 3: Unintended Regression

```
Component: Card
Change: Refactored CSS broke border radius
Result: ❌ Visual diff detected (fix required)
Action: Fix the component code and re-run tests
```

#### Scenario 4: Font Loading Issue

```
Component: Text
Change: None (CI environment issue)
Result: ⚠️ False positive (font not loaded)
Action: Check CI logs, may need to adjust test timeout
```

---

## Reviewing Visual Differences

### Step 1: Check PR Comment

The workflow posts a detailed comment on your PR with:

```markdown
## 🎨 Visual Regression Test Results

### ⚠️ Visual Differences Detected

Some components have visual changes. Please review the differences below.

| Metric       | Count  |
| ------------ | ------ |
| Total Tests  | 657    |
| Passed       | 650 ✅ |
| Failed       | 7 ❌   |
| Visual Diffs | 7 🔍   |
```

### Step 2: Download Artifacts

1. Click the **[📦 Visual Diffs]** link in the PR comment
2. Navigate to the workflow run artifacts section
3. Download these artifacts:
   - **`visual-diffs`** - Contains all `*-diff.png` files
   - **`baseline-snapshots`** - Contains current baseline images
   - **`visual-regression-results`** - Full Playwright HTML report

### Step 3: Review Diff Images

1. Unzip the `visual-diffs` artifact
2. Open each `*-diff.png` file
3. Compare with `*-actual.png` and `*-expected.png`
4. Determine if changes are intentional or bugs

### Step 4: Take Action

**If changes are intentional:**

```bash
# Option A: Update baselines automatically (recommended)
# Add label 'snapshot-update' to the PR in GitHub UI
# Automated workflow will update baselines and commit

# Option B: Update baselines locally
pnpm ds:test:update-snapshots
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: update visual regression baselines"
git push
```

**If changes are unintentional (bugs):**

```bash
# Fix the component code
# Push changes to re-run tests
git add <fixed-files>
git commit -m "fix(component): restore intended visual appearance"
git push
```

---

## Running Locally

### Run Visual Tests

```bash
# From repository root

# Build design system first (required)
pnpm ds:tokens:build
pnpm ds:themes:build
pnpm ds:main:build

# Run all visual regression tests
pnpm ds:test

# Run specific component test
pnpm ds:test Box.spec.tsx

# Run in UI mode (helpful for debugging)
pnpm ds:test:ui
```

### Update Snapshots Locally

```bash
# Update all snapshots
pnpm ds:test:update-snapshots

# Update specific component snapshots
pnpm --filter @grasdouble/lufa_design-system-playwright test-ct:update-snapshots Box.spec.tsx

# View updated snapshots
open packages/design-system/playwright/__snapshots__/
```

### Debug Visual Differences

```bash
# Run tests in headed mode (see browser)
cd packages/design-system/playwright
pnpm exec playwright test --headed

# Run tests with trace (for detailed debugging)
pnpm exec playwright test --trace on

# View test trace
pnpm exec playwright show-trace trace.zip
```

---

## PR Visual Regression Report

The workflow automatically posts a comment to your PR with detailed results:

### ✅ Success Example

```markdown
## 🎨 Visual Regression Test Results

### ✅ All Visual Tests Passed!

No visual regressions detected. All components render as expected! 🎉

| Metric       | Count  |
| ------------ | ------ |
| Total Tests  | 657    |
| Passed       | 657 ✅ |
| Failed       | 0      |
| Visual Diffs | 0      |

### 📋 Components Tested

All design system components were tested in:

- ☀️ Light mode
- 🌙 Dark mode
- 💻 Desktop viewport (1280x720)

**Tested Components:**

- Box, Stack, Text, Icon
- Button, Badge, Divider
- Center, Container, Flex, Grid
- Portal, VisuallyHidden, Label
- Input, Card (compositions)
```

### ⚠️ Visual Differences Example

````markdown
## 🎨 Visual Regression Test Results

### ⚠️ Visual Differences Detected

Some components have visual changes. Please review the differences below.

| Metric       | Count  |
| ------------ | ------ |
| Total Tests  | 657    |
| Passed       | 650 ✅ |
| Failed       | 7 ❌   |
| Visual Diffs | 7 🔍   |

### 📸 Visual Differences

7 component(s) have visual differences from the baseline snapshots.

**Review Artifacts:**

- [📦 Visual Diffs](https://github.com/org/repo/actions/runs/123) - Download diff images
- [📊 Test Report](https://github.com/org/repo/actions/runs/123) - Full Playwright HTML report
- [🖼️ Baseline Snapshots](https://github.com/org/repo/actions/runs/123) - Current baseline images

### 💡 How to Review

1. Download the `visual-diffs` artifact from the [Actions run](link)
2. Review each diff image (red = removed, green = added)
3. If changes are intentional:
   - Add label `snapshot-update` to this PR
   - Automated workflow will update baselines
4. If changes are unintentional:
   - Fix the component code
   - Push changes to re-run tests

### 🔧 Troubleshooting

**Common causes of visual differences:**

1. **Token changes** - Updated design tokens affect component styling
2. **CSS changes** - Modified component styles or utility classes
3. **Font changes** - Font family or weight modifications
4. **Layout changes** - Padding, margin, or sizing adjustments
5. **Browser updates** - Rendering engine differences

**Run tests locally:**

```bash
# Run visual tests
pnpm ds:test

# Update snapshots if changes are intentional
pnpm ds:test:update-snapshots
```
````

````

---

## Updating Baselines

### Automatic Update (Recommended)

1. **Add Label** - Add `snapshot-update` label to your PR
2. **Wait** - Automated workflow runs and updates snapshots
3. **Review** - Check the automated commit for baseline changes
4. **Pull** - Run `git pull` to get updated snapshots locally
5. **Merge** - Merge PR when tests pass

**What the automation does:**

```yaml
1. Triggers update-linux-snapshots job
2. Runs tests with --update-snapshots flag
3. Compresses snapshots with oxipng (level 6)
4. Commits with message: "test: update Linux snapshots (automated)"
5. Pushes commit to PR branch
6. Removes snapshot-update label
7. Posts PR comment with commit SHA
````

### Manual Update

```bash
# Update snapshots locally
pnpm ds:test:update-snapshots

# Review changes
git status
git diff packages/design-system/playwright/__snapshots__/

# Commit and push
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: update visual regression baselines"
git push
```

---

## Snapshot Naming Convention

Snapshots follow this naming pattern:

```
{component}-{variant}-{mode}-{browser}-{platform}.png
```

**Examples:**

```
box-all-variants-light-chromium-darwin.png
button-primary-dark-chromium-darwin.png
text-typography-light-chromium-darwin.png
```

**Breakdown:**

- `{component}` - Component name (box, button, text)
- `{variant}` - Variant or test case (all-variants, primary, typography)
- `{mode}` - Theme mode (light, dark)
- `{browser}` - Browser engine (chromium)
- `{platform}` - OS platform (darwin = macOS, linux)

**Important:** CI uses Linux, so snapshots use `chromium-linux` suffix. Local macOS development uses `chromium-darwin`.

---

## Troubleshooting

### Issue: False Positives (Diffs When Nothing Changed)

**Symptoms:**

- Visual diffs appear but no code changed
- Small pixel differences in text rendering
- Antialiasing differences

**Solutions:**

1. **Check font loading:**

   ```tsx
   // Ensure fonts load before taking snapshot
   await page.waitForLoadState('networkidle');
   ```

2. **Increase threshold:**

   ```ts
   // In playwright-ct.config.ts
   expect: {
     toMatchSnapshot: {
       maxDiffPixels: 10, // Allow small differences
       threshold: 0.2,    // 20% difference threshold
     }
   }
   ```

3. **Update baselines:**
   ```bash
   # If using different OS/browser version
   pnpm ds:test:update-snapshots
   ```

---

### Issue: "No snapshot found"

**Symptoms:**

- Test fails with "No snapshot found for..."
- First time running tests

**Solution:**

```bash
# Generate initial snapshots
pnpm ds:test:update-snapshots

# Commit snapshots
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: add visual regression baselines"
```

---

### Issue: Snapshot Update Label Not Working

**Symptoms:**

- Added `snapshot-update` label but nothing happened
- Workflow didn't trigger

**Solutions:**

1. **Check workflow file:**

   ```bash
   # Ensure workflow exists
   cat .github/workflows/tools-ds-playwright-ct.yml
   ```

2. **Check label name:**

   ```yaml
   # Must be exactly: snapshot-update
   # Not: snapshot_update or update-snapshots
   ```

3. **Trigger manually:**
   ```bash
   # From GitHub UI: Actions > Playwright Component Tests > Run workflow
   # Select your PR branch
   ```

---

### Issue: Large Number of Diffs After Token Change

**Symptoms:**

- Updated a token and 100+ components have diffs
- All diffs look correct (intentional changes)

**Solution:**

```bash
# This is expected! Token changes cascade.

# Option 1: Use automated update
# Add label `snapshot-update` to PR

# Option 2: Update locally
pnpm ds:test:update-snapshots
git add packages/design-system/playwright/__snapshots__/
git commit -m "test: update baselines after token changes"
git push
```

---

### Issue: Workflow Fails on Artifact Upload

**Symptoms:**

- Tests pass but workflow fails
- Error: "Unable to upload artifact"

**Solutions:**

1. **Check artifact size:**

   ```bash
   # Artifacts must be < 500MB
   du -sh packages/design-system/playwright/test-results/
   ```

2. **Clean old results:**

   ```bash
   # Remove old test results
   rm -rf packages/design-system/playwright/test-results/
   ```

3. **Check retention days:**
   ```yaml
   # In workflow file
   retention-days: 7 # Must be 1-90
   ```

---

### Issue: Tests Pass Locally But Fail in CI

**Symptoms:**

- Visual tests pass on your machine
- CI detects differences

**Causes:**

- Different OS rendering (macOS vs Linux)
- Different browser version
- Different font rendering

**Solutions:**

1. **Run tests in Linux environment:**

   ```bash
   # Use Docker to match CI
   docker run -it --rm \
     -v $(pwd):/work \
     -w /work \
     mcr.microsoft.com/playwright:latest \
     /bin/bash -c "pnpm install && pnpm ds:test"
   ```

2. **Update CI snapshots:**

   ```bash
   # Add snapshot-update label to PR
   # CI will generate correct Linux snapshots
   ```

3. **Use CI snapshots locally:**
   ```bash
   # Download snapshots from CI artifacts
   # Replace local snapshots with CI versions
   ```

---

## Configuration

### Timeout

The workflow has a 15-minute timeout:

```yaml
timeout-minutes: 15
```

### Artifact Retention

```yaml
# Test results and baseline snapshots
retention-days: 7

# Visual diffs (kept longer for review)
retention-days: 14
```

### Permissions

```yaml
permissions:
  contents: read # Read repository code
  pull-requests: write # Post PR comments
```

### Browser Configuration

```yaml
# Only Chromium in CI for speed
- name: Install Playwright browsers
  run: pnpm --filter @grasdouble/lufa_design-system-playwright exec playwright install --with-deps chromium
```

---

## Integration with Other Workflows

This workflow works alongside:

- **`tools-ds-playwright-ct.yml`** - Main component test workflow with snapshot update automation
- **`tools-ds-main-validate-components.yml`** - Component code quality validation
- **`tools-ds-tokens-validate-tokens.yml`** - Token validation

**Workflow Coordination:**

1. **Component changes** → Triggers validation + visual regression
2. **Token changes** → Triggers token validation + visual regression
3. **Test changes** → Triggers visual regression only
4. **Snapshot update needed** → Use `snapshot-update` label in main workflow

**Key Difference from Main Test Workflow:**

| Feature              | tools-ds-visual-regression.yml | tools-ds-playwright-ct.yml             |
| -------------------- | ------------------------------ | -------------------------------------- |
| **Purpose**          | Visual regression focused      | Complete testing + snapshot automation |
| **Artifacts**        | Always uploads diffs           | Only on failure                        |
| **PR Comment**       | Detailed visual report         | Basic test results                     |
| **Snapshot Updates** | Review only                    | Automated with label                   |
| **Run Time**         | Every component change         | Every commit                           |

**Recommendation:** Keep both workflows for separation of concerns.

---

## Performance

**Average Runtime:** ~5-7 minutes

**Breakdown:**

- Setup (checkout, install deps): ~1 minute
- Build design system: ~1 minute
- Install Playwright browsers: ~1 minute
- Run visual tests (657 tests): ~2-3 minutes
- Generate report + upload artifacts: ~30 seconds
- PR comment: ~5 seconds

**Optimization Tips:**

```yaml
# Cache dependencies
- uses: actions/setup-node@v6
  with:
    cache: 'pnpm'

# Use Chromium only (faster than all browsers)
--project=chromium

# Parallel test execution (default in Playwright)
workers: 4  # In playwright-ct.config.ts
```

---

## Writing Visual Regression Tests

### Basic Test Structure

```tsx
import { expect, test } from '@playwright/experimental-ct-react';

import { Button } from './Button';

test('Button - all variants', async ({ mount }) => {
  const component = await mount(
    <div style={{ display: 'flex', gap: '16px', padding: '20px' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );

  // Take screenshot
  await expect(component).toHaveScreenshot();
});
```

### Testing Light and Dark Modes

```tsx
test('Button - light mode', async ({ mount }) => {
  const component = await mount(
    <div data-theme="light">
      <Button variant="primary">Primary</Button>
    </div>
  );
  await expect(component).toHaveScreenshot();
});

test('Button - dark mode', async ({ mount }) => {
  const component = await mount(
    <div data-theme="dark">
      <Button variant="primary">Primary</Button>
    </div>
  );
  await expect(component).toHaveScreenshot();
});
```

### Testing Interactive States

```tsx
test('Button - hover state', async ({ mount, page }) => {
  const component = await mount(<Button>Hover me</Button>);

  // Hover over button
  await component.hover();

  // Wait for transition
  await page.waitForTimeout(300);

  // Take screenshot
  await expect(component).toHaveScreenshot();
});
```

### Custom Snapshot Configuration

```tsx
test('Component with tolerance', async ({ mount }) => {
  const component = await mount(<MyComponent />);

  await expect(component).toHaveScreenshot({
    maxDiffPixels: 100, // Allow 100 different pixels
    threshold: 0.2, // 20% difference threshold
    animations: 'disabled', // Disable CSS animations
  });
});
```

---

## Best Practices

### ✅ Do's

1. **Test all variants** - Include all component states in one test
2. **Test both themes** - Always test light and dark modes
3. **Add padding** - Wrap components in container with padding for clear screenshots
4. **Wait for fonts** - Ensure fonts load before taking snapshots
5. **Disable animations** - Turn off animations for consistent snapshots
6. **Use semantic naming** - Name tests clearly: `{Component} - {variant/state}`
7. **Group related tests** - Keep related visual tests in same file
8. **Review diffs carefully** - Always inspect visual diffs before updating baselines

### ❌ Don'ts

1. **Don't ignore diffs** - Investigate every visual difference
2. **Don't commit failing tests** - Fix or update baselines before merging
3. **Don't test dynamic content** - Avoid timestamps, random data, external images
4. **Don't test animations mid-frame** - Wait for animation completion
5. **Don't update baselines blindly** - Always review what changed and why
6. **Don't mix concerns** - Keep visual tests separate from functional tests
7. **Don't test external dependencies** - Mock external data/images
8. **Don't use flaky selectors** - Use stable test IDs for interactions

---

## FAQ

### Q: How many visual regression tests should I write?

**A:** One test per component variant/state combination. Example:

- Button: 1 test for all 3 variants in light mode
- Button: 1 test for all 3 variants in dark mode
- Button: 1 test for hover/focus/disabled states

### Q: Should I test responsive breakpoints?

**A:** Yes, if your component has responsive behavior:

```tsx
test('Component - mobile', async ({ mount, page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  const component = await mount(<MyComponent />);
  await expect(component).toHaveScreenshot();
});

test('Component - desktop', async ({ mount, page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  const component = await mount(<MyComponent />);
  await expect(component).toHaveScreenshot();
});
```

### Q: What's the difference between visual regression and unit tests?

**A:**

- **Unit tests** - Test component logic, props, behavior
- **Visual regression** - Test component appearance, styling, layout

Both are needed for complete coverage.

### Q: How do I test components with external images?

**A:** Mock external images with data URLs or local test images:

```tsx
test('Image component', async ({ mount }) => {
  const component = await mount(<Image src="data:image/svg+xml,<svg>...</svg>" alt="Test" />);
  await expect(component).toHaveScreenshot();
});
```

### Q: Can I run visual tests in other browsers?

**A:** Yes, but CI only uses Chromium for speed:

```bash
# Run locally in all browsers
cd packages/design-system/playwright
pnpm exec playwright test --project=chromium
pnpm exec playwright test --project=firefox
pnpm exec playwright test --project=webkit
```

### Q: How do I test components with tooltips or popovers?

**A:** Trigger the tooltip/popover, then take screenshot:

```tsx
test('Tooltip visible', async ({ mount, page }) => {
  const component = await mount(<ButtonWithTooltip />);

  // Hover to show tooltip
  await component.hover();

  // Wait for tooltip animation
  await page.waitForTimeout(200);

  // Screenshot includes tooltip
  await expect(page).toHaveScreenshot();
});
```

---

## Related Documentation

- **Main Test Workflow:** `.github/workflows/tools-ds-playwright-ct.yml`
- **Component Validation:** `.github/workflows/README-validate-components.md`
- **Sprint Plan:** `_bmad-output/sprints/phase-7c-sprint-plan.md`
- **Playwright Config:** `packages/design-system/playwright/playwright-ct.config.ts`
- **Test Examples:** `packages/design-system/playwright/src/*.spec.tsx`
- **Playwright Docs:** https://playwright.dev/docs/test-snapshots

---

## Status

✅ **Active** - Story 10.2 Complete (Phase 7c)

**Created:** January 26, 2026  
**Last Updated:** January 26, 2026  
**Maintained By:** BMAD System (Lufa Design System Team)

---

_Part of Lufa Design System v2.0 - Phase 7c: CI/CD Integration & Documentation_
