# Design System Performance Budgets — Composite Action

## Overview

This composite action measures design system performance metrics and checks them against configured budgets. It is used by the `DS:Tools:Packages:CI` workflow on every pull request to catch performance regressions before they reach production.

**Action:** `.github/actions/design-system-performance-budgets/action.yml`  
**Budget config:** `.github/actions/design-system-performance-budgets/budgets.json`  
**Workflow:** `.github/workflows/ds-tools-packages-ci.yml` (job `performance-budgets`)  
**CLI Tool:** `packages/design-system/cli/`

---

## What Gets Measured

### 1. Bundle Size 📦

- JavaScript bundle size (uncompressed)
- CSS file size (uncompressed)
- Total bundle size
- Gzipped size (compression ratio)

**Budget:** Total uncompressed **< 275 KB** — Gzipped **< 50 KB**

**Why it matters:** Large bundles slow down page loads and hurt user experience, especially on slower networks.

---

### 2. Build Time ⏱️

- Time to build tokens + themes + main component library

**Budget:** **< 30 seconds**

**Why it matters:** Fast builds improve developer productivity and CI/CD pipeline efficiency.

---

### 3. CSS Cascade Performance 🎨

- Time to validate the complete CSS variable resolution chain via the CLI tool
- Measures `primitive → core → semantic → component` resolution

**Budget:** **< 1000ms** (warning only — does not fail the build)

**Why it matters:** Fast CSS cascade ensures minimal runtime performance impact from design tokens.

---

## Inputs / Outputs

### Inputs

| Input     | Required | Description                                            |
| --------- | -------- | ------------------------------------------------------ |
| `run-url` | No       | URL of the workflow run, used in the PR comment footer |

### Outputs

| Output         | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| `overall`      | `success` or `failure`                                                 |
| `failures`     | Number of failed budget checks                                         |
| `comment-body` | Markdown body of the performance report, ready to post as a PR comment |

---

## When It Runs

The `performance-budgets` job in `ds-tools-packages-ci.yml` triggers when any of these paths change:

```yaml
- 'packages/design-system/main/src/**'
- 'packages/design-system/tokens/**/*.json'
- 'packages/design-system/main/vite.config.ts'
- 'packages/design-system/main/package.json'
- '.github/actions/design-system-performance-budgets/**'
- '.github/workflows/ds-tools-packages-ci.yml'
```

On `push` to `main` and `workflow_dispatch`, it always runs.

---

## How It Works

### Step-by-Step Process

1. **Measure Build Time** — Rebuilds tokens + themes + main, records duration in seconds
2. **Measure Bundle Size** — Reads `dist/lufa-ui.mjs` and `dist/style.css`, computes JS / CSS / total / gzip sizes in KB
3. **Measure CSS Cascade** — Runs CLI validation against a sample theme, records duration in ms
4. **Check Budgets** — Compares each metric against `budgets.json`, outputs pass/fail per check
5. **Aggregate** — Counts failures, sets `overall` output
6. **Build PR Comment** — Constructs the markdown report, sets `comment-body` output

The workflow then posts the comment via `.github/actions/pr-comment` and fails the job if `overall == failure`.

---

## Performance Budget Configuration

Budgets are defined in `budgets.json`, co-located with the action:

```jsonc
// .github/actions/design-system-performance-budgets/budgets.json
{
  "budgets": {
    "bundle": {
      "totalSize": { "max": 275 }, // KB, fails on exceed
      "gzipped": { "max": 50 }, // KB, fails on exceed
    },
    "timing": {
      "build": { "max": 30 }, // seconds, fails on exceed
      "cssCascade": { "max": 1000 }, // ms, warning only
    },
  },
}
```

> **Note:** Playwright test execution time is a separate budget defined in `.github/config/playwright-budgets.json`, consumed by `ds-tools-playwright-ct.yml`.

### Adjusting Budgets

**1. Update `budgets.json`:**

```jsonc
{
  "budgets": {
    "bundle": {
      "totalSize": { "max": 300 }, // Increased from 275
      "gzipped": { "max": 60 }, // Increased from 50
    },
    "timing": {
      "build": { "max": 45 }, // Increased from 30
    },
  },
}
```

**2. Document why** — add a note in `metadata.notes`.

**3. Get team approval** — create a PR with rationale and get sign-off from the tech lead.

---

## PR Comment

The action posts (or updates) a comment on the PR with marker `<!-- performance-budget-comment -->`.

### ✅ Success example

```
## ⚡ Performance Budget Report

### ✅ All Performance Budgets Passed!

| Metric          | Current   | Budget | Status  |
|-----------------|-----------|--------|---------|
| Bundle Size     | 145.32 KB | 275 KB | ✅ Pass |
| JS Size         | 125.18 KB | —      | ℹ️ Info |
| CSS Size        | 20.14 KB  | —      | ℹ️ Info |
| Gzipped Size    | 42.67 KB  | 50 KB  | ✅ Pass |
| Build Time      | 18.45s    | 30s    | ✅ Pass |
| CSS Cascade     | 12ms      | 1000ms | ✅ Pass |
```

### ❌ Budget exceeded example

```
## ⚡ Performance Budget Report

### ⚠️ 2 Performance Budget(s) Exceeded

| Metric          | Current   | Budget | Status  |
|-----------------|-----------|--------|---------|
| Bundle Size     | 290.48 KB | 275 KB | ❌ Fail |
| Gzipped Size    | 58.34 KB  | 50 KB  | ❌ Fail |
| Build Time      | 25.12s    | 30s    | ✅ Pass |
| CSS Cascade     | 15ms      | 1000ms | ✅ Pass |
```

---

## Running Checks Locally

```bash
# 1. Build and measure time
time pnpm ds:tokens:build && \
     pnpm ds:themes:build && \
     pnpm ds:main:build

# 2. Check bundle size
ls -lh packages/design-system/main/dist/

# 3. Check gzipped size
JS_GZ=$(gzip -c packages/design-system/main/dist/lufa-ui.mjs | wc -c)
CSS_GZ=$(gzip -c packages/design-system/main/dist/style.css | wc -c)
echo "Gzipped total: $(( (JS_GZ + CSS_GZ) / 1024 )) KB"

# 4. Run CSS cascade validation
cd packages/design-system/cli
time pnpm exec tsx src/index.ts validate --theme <your-theme.css> --all
```

### Analyse bundle composition

```bash
cd packages/design-system/main
npx vite-bundle-visualizer
# or: pnpm add -D rollup-plugin-visualizer and add to vite.config.ts
```

---

## Troubleshooting

### Bundle size suddenly increased

```bash
# Compare with main branch
git checkout main && pnpm ds:main:build
ls -lh packages/design-system/main/dist/

git checkout <your-branch> && pnpm ds:main:build
ls -lh packages/design-system/main/dist/

# Check for new dependencies
git diff main packages/design-system/main/package.json
```

**Common causes:** new dependency, version bump, new lucide-react icon imports, accidentally bundled peer dep.

---

### Build time increased

```bash
# Profile each step
time pnpm ds:tokens:build
time pnpm ds:themes:build
time pnpm ds:main:build
```

**Common causes:** more components (expected), complex TypeScript types, more tokens, slower CI runner.

---

### Gzipped size shows N/A

`gzip` is not available in the CI runner. Fix:

```yaml
- name: Install gzip
  run: sudo apt-get install -y gzip
```

---

## Optimization Best Practices

### ✅ Do

- Monitor trends — track metrics over time
- Externalize peer dependencies — don't bundle what consumers provide
- Use tree-shaking — ensure unused code is removed
- Cache builds — use incremental TypeScript builds
- Optimize early — don't wait for budgets to be exceeded

### ❌ Don't

- Don't ignore warnings — address performance issues early
- Don't add heavy dependencies without checking bundle impact
- Don't increase budgets arbitrarily — justify with data
- Don't disable checks — keep performance monitoring active

---

## Related

- **Budget config:** `.github/actions/design-system-performance-budgets/budgets.json`
- **Playwright budget:** `.github/config/playwright-budgets.json`
- **Workflow:** `.github/workflows/ds-tools-packages-ci.yml`
- **CLI Tool:** `packages/design-system/cli/README.md`
- **Vite config:** `packages/design-system/main/vite.config.ts`
