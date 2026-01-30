# Examples

## Basic Validation

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

## Validation with Errors

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

## Using Verbose Mode

```bash
$ npx lufa-validate-theme ./my-theme.css --verbose
# Shows ALL errors and warnings, not just the first few
```

## Multi-Mode Theme Example

```css
/* custom-theme.css */
:root,
[data-mode='light'] {
  --lufa-core-neutral-background: #ffffff;
  --lufa-core-neutral-text-primary: #111827;
  /* ... more light mode tokens */
}

[data-mode='dark'] {
  --lufa-core-neutral-background: #111827;
  --lufa-core-neutral-text-primary: #f9fafb;
  /* ... more dark mode tokens */
}

[data-mode='high-contrast'] {
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
