# Lufa Design System - CLI Tools

Command-line tools for validating custom themes in the Lufa Design System.

The CLI validates themes for:

- **Completeness** - All required tokens are defined
- **Accessibility** - WCAG AA contrast ratios
- **Format** - Valid CSS syntax and values
- **Multi-mode support** - Light, dark, and high-contrast themes

## Installation

```bash
npm install @grasdouble/lufa_design-system-cli
# or
pnpm add @grasdouble/lufa_design-system-cli
```

## Usage

### Validate a Theme

```bash
# Validate a custom theme file
npx lufa-validate-theme ./my-custom-theme.css

# Verbose output with all errors
npx lufa-validate-theme ./my-custom-theme.css --verbose

# Without colored output
npx lufa-validate-theme ./my-custom-theme.css --no-color
```

### Get Theme Template

```bash
# Output complete theme template
npx lufa-validate-theme --template > my-theme.css

# Use the template as starting point
npx lufa-validate-theme --template > custom-theme.css
# Edit custom-theme.css with your brand colors
npx lufa-validate-theme custom-theme.css
```

## Validation Checks

The CLI performs three comprehensive validation checks:

### 1. **Completeness Check**

Ensures all required tokens are defined. The Lufa Design System has **31 theme-aware tokens** that must be defined for each theme mode (light, dark, high-contrast).

**Checks:**

- All 184+ primitive tokens are defined
- All 31 core theme-aware tokens have values for light, dark, and high-contrast modes
- All semantic and component tokens are present

**Example Output:**

```
✓ All 453 required tokens are defined
```

### 2. **Contrast Check (WCAG AA)**

Validates color contrast ratios to ensure accessibility compliance.

**Standards:**

- **Normal text** (< 18px): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18px or bold ≥ 14px): Minimum 3:1 contrast ratio
- **UI components**: Minimum 3:1 contrast ratio

**Checks:**

- Text colors against background colors
- Interactive element colors (buttons, links)
- Border colors against adjacent surfaces
- High-contrast mode has AAA compliance (7:1+)

**Example Output:**

```
✓ All 47 color pairs meet WCAG AA standards
```

### 3. **Format Check**

Validates CSS syntax and value formats.

**Checks:**

- Valid CSS custom property names (`--lufa-*`)
- Color values: hex (#RGB, #RRGGBB), rgb(), rgba(), hsl(), hsla()
- Dimensions: px, rem, em, %, vh, vw
- Durations: ms, s
- Numbers: unitless values where appropriate
- References: valid var() syntax

**Example Output:**

```
✓ All 453 token values have valid formats
```

## Exit Codes

- `0` - Theme is valid
- `1` - Validation errors found
- `2` - CLI error (invalid arguments, file not found, etc.)

## Examples

### Basic Validation

```bash
$ npx lufa-validate-theme ./my-theme.css
🔍 Validating theme: ./my-theme.css

Found 453 custom properties

1. Completeness Check
✓ All 453 required tokens are defined

2. Contrast Check (WCAG AA)
✓ All 47 color pairs meet WCAG AA standards

3. Format Check
✓ All 453 token values have valid formats

✅ Theme is valid!
```

### Validation with Errors

```bash
$ npx lufa-validate-theme ./incomplete-theme.css
🔍 Validating theme: ./incomplete-theme.css

Found 445 custom properties

1. Completeness Check
✗ Missing 8 tokens (445/453)
  Missing tokens:
    - --lufa-core-brand-primary
    - --lufa-core-brand-primary-hover
    - --lufa-core-brand-primary-active
    - --lufa-core-brand-secondary
    - --lufa-core-brand-secondary-hover
    - --lufa-core-brand-secondary-active
    ... and 2 more

2. Contrast Check (WCAG AA)
✗ 3 contrast violations found
  Violations:
    - --lufa-core-neutral-text-primary on --lufa-core-neutral-background: 3.2:1 (needs 4.5:1 for normal-text)
    - --lufa-core-brand-primary on --lufa-core-neutral-surface: 2.8:1 (needs 3:1 for ui-component)
    ... and 1 more

3. Format Check
✓ All 445 token values have valid formats

❌ Theme validation failed

Run with --verbose to see all errors
```

### Using Verbose Mode

```bash
$ npx lufa-validate-theme ./my-theme.css --verbose
# Shows ALL errors and warnings, not just the first few
```

### Multi-Mode Theme Example

```css
/* custom-theme.css */
:root,
[data-theme='light'] {
  --lufa-core-neutral-background: #ffffff;
  --lufa-core-neutral-text-primary: #111827;
  /* ... more light mode tokens */
}

[data-theme='dark'] {
  --lufa-core-neutral-background: #111827;
  --lufa-core-neutral-text-primary: #f9fafb;
  /* ... more dark mode tokens */
}

[data-theme='high-contrast'] {
  --lufa-core-neutral-background: #ffffff;
  --lufa-core-neutral-text-primary: #000000;
  /* ... more high-contrast tokens */
}
```

```bash
$ npx lufa-validate-theme custom-theme.css
✅ Theme is valid!
# Validates all three modes automatically
```

## Development

```bash
# Install dependencies
pnpm install

# Build the CLI
pnpm build

# Run in development mode (with TypeScript)
pnpm dev path/to/theme.css

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Type checking
pnpm typecheck

# Lint
pnpm lint
```

## CLI Options

```
lufa-validate-theme [theme-file] [options]

Arguments:
  theme-file              Path to the theme CSS file to validate

Options:
  -t, --template         Output a theme template instead of validating
  -v, --verbose          Show detailed validation output (all errors)
  --no-color            Disable colored output
  -V, --version         Output the version number
  -h, --help            Display help for command
```

## Integration with CI/CD

### GitHub Actions

```yaml
name: Validate Theme

on:
  push:
    paths:
      - 'src/theme.css'

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install -g @grasdouble/lufa_design-system-cli
      - run: lufa-validate-theme src/theme.css
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npx lufa-validate-theme src/theme.css || exit 1
```

### NPM Script

```json
{
  "scripts": {
    "validate-theme": "lufa-validate-theme src/theme.css",
    "prebuild": "npm run validate-theme"
  }
}
```

## Token Role Metadata

The CLI uses token role metadata to understand the purpose of each token:

- **`action`** - Interactive elements (buttons, links, hover states)
- **`content`** - Surfaces, backgrounds, text, borders
- **`feedback`** - Status indicators (success, error, warning, info)

This metadata helps validate appropriate contrast ratios and usage patterns.

## Related Packages

- `@grasdouble/lufa_design-system-tokens` - Core design tokens
- `@grasdouble/lufa_design-system-main` - React components
- `@grasdouble/lufa_design-system-themes` - Pre-built theme templates

## Documentation

For more information about theming and token architecture:

- [Theme Switching Guide](../../../_docs/theme-switching-guide.md)
- [Token Architecture](../../../_docs/token-architecture.md)
- [Design System Overview](../../../_docs/overview.md)

## License

MIT
