# Usage

## Validate a Theme

```bash
# Validate a custom theme file
npx lufa-validate-theme ./my-custom-theme.css

# Verbose output with all errors
npx lufa-validate-theme ./my-custom-theme.css --verbose

# Without colored output
npx lufa-validate-theme ./my-custom-theme.css --no-color
```

## Get Theme Template

```bash
# Output complete theme template
npx lufa-validate-theme --template > my-theme.css

# Use the template as starting point
npx lufa-validate-theme --template > custom-theme.css
# Edit custom-theme.css with your brand colors
npx lufa-validate-theme custom-theme.css
```

## Exit Codes

- `0` - Theme is valid
- `1` - Validation errors found
- `2` - CLI error (invalid arguments, file not found, etc.)
