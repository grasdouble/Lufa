# Usage

## Validate a Theme

```bash
# Run all checks (completeness + format + a11y)
lufa-ds-cli theme-validate ./my-theme.css

# Run only the WCAG AA contrast check
lufa-ds-cli theme-validate ./my-theme.css --a11y

# Run only the format check
lufa-ds-cli theme-validate ./my-theme.css --format

# Run only the completeness check
lufa-ds-cli theme-validate ./my-theme.css --completeness

# Run all checks on every CSS file in a directory
lufa-ds-cli theme-validate --dir ./themes/src

# Run a11y check on every CSS file in a directory
lufa-ds-cli theme-validate --a11y --dir ./themes/src
```

## Create a Theme Template

```bash
# Create a starter template in the current directory (prompts for file name)
lufa-ds-cli theme-template

# Create an extended template with a specific file name
lufa-ds-cli theme-template extended --output-name my-theme

# Available levels: starter (default), extended, advanced
lufa-ds-cli theme-template advanced -o my-brand-theme
```

## Exit Codes

| Code | Meaning                                             |
| ---- | --------------------------------------------------- |
| `0`  | All checks passed                                   |
| `1`  | One or more validation errors found                 |
| `2`  | CLI error (invalid arguments, file not found, etc.) |
