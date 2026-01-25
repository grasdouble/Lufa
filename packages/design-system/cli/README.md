# Lufa Design System - CLI Tools

Command-line tools for validating custom themes in the Lufa Design System.

## Installation

```bash
npm install @grasdouble/lufa_design-system-cli
# or
pnpm add @grasdouble/lufa_design-system-cli
```

## Usage

### Validate a Theme

```bash
npx lufa-validate-theme ./my-custom-theme.css
```

### Get Theme Template

```bash
npx lufa-validate-theme --template > my-theme.css
```

## Validation Checks

The CLI performs the following validations:

### 1. **Completeness Check**

- Ensures all 453 required tokens are defined
- Reports missing tokens

### 2. **Contrast Check (WCAG)**

- Validates color contrast ratios
- Text colors: Minimum 4.5:1 (WCAG AA)
- UI colors: Minimum 3:1 (WCAG AA)

### 3. **Format Check**

- Validates CSS custom property syntax
- Validates color formats (hex, rgb, hsl)
- Validates dimension units (px, rem, em)

## Exit Codes

- `0` - Theme is valid
- `1` - Validation errors found
- `2` - CLI error (invalid arguments, file not found, etc.)

## Examples

### Valid Theme

```bash
$ npx lufa-validate-theme ./my-theme.css
✓ Completeness: 453/453 tokens defined
✓ Contrast: All ratios meet WCAG AA standards
✓ Format: All values are valid
✅ Theme is valid!
```

### Invalid Theme

```bash
$ npx lufa-validate-theme ./my-theme.css
✗ Completeness: 445/453 tokens defined
  Missing tokens:
    - --lufa-core-brand-primary
    - --lufa-core-brand-primary-hover
    ...
✗ Contrast: 3 violations found
  - --lufa-semantic-ui-text-primary on --lufa-semantic-ui-background-page: 3.2:1 (needs 4.5:1)
  ...
✅ Format: All values are valid
❌ Theme has validation errors
```

## Development

```bash
# Install dependencies
pnpm install

# Build
pnpm build

# Run in development
pnpm dev path/to/theme.css
```

## License

MIT
