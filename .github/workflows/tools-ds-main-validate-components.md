# Component Validation CI Workflow

## Overview

This GitHub Actions workflow automatically validates design system components on every pull request to ensure code quality, type safety, and adherence to design system standards.

**Workflow File:** `.github/workflows/tools-ds-main-validate-components.yml`

---

## What Gets Validated

### **Code Quality** (`validate:components`)

- ✅ No hard-coded color values (must use design tokens)
- ✅ No hard-coded dimension values (should use design tokens)
- ✅ All component props have TypeScript descriptions
- ✅ All TypeScript types are exported properly

> **Note:** Component tests are run separately in the [Playwright Component Tests workflow](../../actions/workflows/tools-ds-playwright-ct.yml).

---

## When It Runs

The workflow triggers on:

- **Pull Requests** - When component files change
- **Push to main** - When changes are merged
- **Manual Trigger** - Via GitHub Actions UI (`workflow_dispatch`)

**Watched Paths (Pull Requests):**

```yaml
paths:
  - 'packages/design-system/main/src/**/*.tsx'
  - 'packages/design-system/main/src/**/*.ts'
  - '.github/workflows/tools-ds-main-validate-components.yml'
```

**Watched Paths (Push to main):**

```yaml
paths:
  - 'packages/design-system/main/src/**/*.tsx'
  - 'packages/design-system/main/src/**/*.ts'
```

---

## How It Works

### Step-by-Step Process

1. **Checkout Code** - Gets the latest code from the repository
2. **Setup Environment** - Installs pnpm and Node.js
3. **Install Dependencies** - Installs all packages
4. **Build Design System** - Builds tokens, themes, and components
5. **Validate Code Quality** - Runs `pnpm validate:components`
6. **Analyze Results** - Determines overall pass/fail status
7. **Comment on PR** - Posts validation report (PR only)
8. **Pass or Fail** - Exits based on validation result

---

## Validation Rules

### Hard-Coded Values Detection

**❌ Bad (will fail validation):**

```tsx
// Hard-coded colors
<div style={{ color: '#3B82F6' }}>Text</div>
<div style={{ backgroundColor: 'rgb(59, 130, 246)' }}>Text</div>

// Hard-coded dimensions
<div style={{ padding: '16px' }}>Content</div>
<div style={{ fontSize: '1.5rem' }}>Text</div>
```

**✅ Good (will pass validation):**

```tsx
// Using CSS variables (design tokens)
<div style={{ color: 'var(--lufa-semantic-ui-text-primary)' }}>Text</div>
<div style={{ backgroundColor: 'var(--lufa-core-brand-primary)' }}>Text</div>

// Using token imports
import tokens from '@grasdouble/lufa_design-system-tokens';
<div style={{ padding: tokens.primitive.spacing[16] }}>Content</div>
```

**Allowed Hard-Coded Values:**

```tsx
// Layout values (these are OK)
display: ('flex', 'block', 'grid');
position: ('relative', 'absolute', 'fixed');
flexDirection: ('row', 'column');
justifyContent: ('center', 'space-between');
alignItems: ('center', 'flex-start');

// Special values (these are OK)
('0', '100%', 'auto', 'none', 'inherit');
('transparent', 'currentColor');
```

---

### Prop Descriptions

**❌ Bad (will trigger warning):**

```tsx
interface ButtonProps {
  size: 'sm' | 'md' | 'lg'; // Missing JSDoc
  variant: string; // Missing JSDoc
}
```

**✅ Good (will pass validation):**

```tsx
interface ButtonProps {
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'ghost';
}
```

---

### Type Exports

**❌ Bad (will trigger warning):**

```tsx
// Internal interface (not exported)
interface ButtonProps {
  size?: string;
}

export const Button = (props: ButtonProps) => { ... };
```

**✅ Good (will pass validation):**

```tsx
// Exported interface
export interface ButtonProps {
  size?: string;
}

export const Button = (props: ButtonProps) => { ... };
```

---

## Running Locally

### Run Code Quality Validation

```bash
# From repository root
pnpm validate:components
```

> **Note:** Component tests, linting, type checking, and formatting are handled by other workflows or can be run separately:
>
> - Tests: `pnpm ds:test` (see `tools-ds-playwright-ct.yml`)
> - Linting: `pnpm ds:main:lint`
> - Type checking: `pnpm ds:main:typecheck`

### Auto-Fix Issues

```bash
# Fix formatting
pnpm ds:main:prettier

# Fix linting (where possible)
cd packages/design-system/main
pnpm lint --fix
```

---

## PR Validation Report

The workflow automatically posts a comment to your PR with validation results:

### ✅ Success Example

```markdown
## 🔍 Component Validation Report

### ✅ All Checks Passed!

All component validation checks completed successfully. Great work! 🎉

| Check        | Status    |
| ------------ | --------- |
| Code Quality | ✅ Passed |

**Note:** Component tests are run separately in the Playwright Component Tests workflow.
```

### ❌ Failure Example

```markdown
## 🔍 Component Validation Report

### ⚠️ Some Checks Failed

Please review and fix the issues below:

| Check        | Status    |
| ------------ | --------- |
| Code Quality | ❌ Failed |

### 💡 How to Fix

**Code Quality Failed:**

- Run locally: `pnpm validate:components`
- Fix hard-coded values (use design tokens)
- Add missing prop descriptions
- Export TypeScript types

### 📚 Resources

- 📖 Design System Documentation
- 🧪 Run all checks: `pnpm validate:components`
- 🎭 Component tests: See Playwright Component Tests workflow
```

---

## Troubleshooting

### Issue: "Hard-coded value found"

**Solution:**

1. Replace hard-coded colors with CSS variables: `var(--lufa-semantic-ui-text-primary)`
2. Use design tokens from `@grasdouble/lufa_design-system-tokens`
3. See [Token Catalog](http://localhost:6006/?path=/story/3-tokens-tokens-catalog--interactive-catalog) for available tokens

---

### Issue: "Prop description missing"

**Solution:**

1. Add JSDoc comments above each prop
2. Include description and `@default` value
3. Example:
   ```tsx
   /**
    * Size of the component
    * @default 'md'
    */
   size?: 'sm' | 'md' | 'lg';
   ```

---

### Issue: "Type export missing"

**Solution:**

1. Export your Props interface/type
2. Example:
   ```tsx
   export interface MyComponentProps {
     // ...
   }
   ```

---

### Issue: Workflow fails in CI but passes locally

**Solution:**

1. Ensure you're using the same Node.js version (check `.tool-versions`)
2. Run `pnpm install --frozen-lockfile` to match CI dependencies
3. Clear caches: `pnpm store prune`
4. Try running in Docker to match CI environment

---

## Configuration

### Timeout

The workflow has a 10-minute timeout:

```yaml
timeout-minutes: 10
```

### Node.js Version

Uses version specified in `.tool-versions` file.

### Permissions

```yaml
permissions:
  contents: read
  pull-requests: write # For posting PR comments
```

---

## Performance

**Average Runtime:** ~2-3 minutes

**Breakdown:**

- Setup (checkout, install deps): ~1 minute
- Build packages: ~1 minute
- Code quality validation: ~30 seconds
- PR comment: ~5 seconds

---

## Integration with Other Workflows

This workflow integrates with:

- **`tools-lint.yml`** - Project-wide linting
- **`tools-ds-tokens-validate-tokens.yml`** - Token validation
- **`tools-ds-playwright-ct.yml`** - Component testing + visual regression
- **`tools-ds-performance-budgets.yml`** - Bundle size and build time budgets

Together, these workflows ensure complete CI/CD coverage for the design system.

---

## Related Documentation

- **Performance Budgets:** `.github/workflows/tools-ds-performance-budgets.md`
- **Playwright Tests:** `.github/workflows/tools-ds-playwright-ct.yml`
- **Design System Docs:** `packages/design-system/_docs/`
- **Token Catalog:** [Storybook > Tokens > Tokens Catalog](http://localhost:6006)

---

## Status

✅ **Active** - Story 10.1 Complete (Phase 7c)

**Created:** January 26, 2026  
**Last Updated:** February 7, 2026  
**Maintained By:** Lufa Design System Team

---

_Part of Lufa Design System v2.0 - Phase 7c: CI/CD Integration_
