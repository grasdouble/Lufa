# Token Scripts

This directory contains utility scripts and documentation for the Lufa Design System token package.

---

## 🛠️ Active Scripts

### `check-css-size.mjs`

**Purpose:** Validates that generated CSS output stays within acceptable size limits.

**Usage:**

```bash
npm run check:size
```

**Features:**

- Checks `dist/tokens.css` file size
- Compares against baseline (78 KB)
- Enforces warning threshold (120 KB)
- Enforces maximum threshold (150 KB)
- Shows percentage change from baseline

**When it runs:**

- Automatically after `npm run build`
- Part of the build validation pipeline

---

### `validate-token-usage.js`

**Purpose:** Analyzes token usage across the design system to identify unused tokens.

**Usage:**

```bash
node scripts/validate-token-usage.js
```

**Features:**

- Scans all token files
- Checks component usage in Storybook
- Identifies potentially unused tokens
- Helps maintain a clean token system

**When to use:**

- During token cleanup reviews
- Before removing deprecated tokens
- To understand token adoption

---

## 🧪 Testing

The token system includes comprehensive test coverage for all validation and build utilities.

### Run All Tests

```bash
npm test
```

Runs the core test suites:

- Token consistency validator tests (35 tests covering all 9 ADR-013 rules)
- WCAG contrast calculation tests

### Individual Test Suites

**Token Validator Tests:**

```bash
npm run test:validator
```

Tests the token consistency validator (`build/validators/token-consistency.js`) covering:

- All 9 validation rules from ADR-013
- Path-based level inference
- Edge cases and error handling
- 35 test cases total

**WCAG Contrast Tests:**

```bash
npm run test:wcag
```

Tests the WCAG contrast calculation utility (`build/utils/wcag-contrast.js`) covering:

- Contrast ratio calculations
- WCAG AA/AAA level compliance
- Metadata generation
- Alpha/transparent color handling

**All Tests:**

```bash
npm run test
```

Runs all test suites.

---

**Last Updated:** 2026-02-23  
**Version:** 1.1.0
