# CI/CD Integration

## GitHub Actions

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

## Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npx lufa-validate-theme src/theme.css || exit 1
```

## NPM Script

```json
{
  "scripts": {
    "validate-theme": "lufa-validate-theme src/theme.css",
    "prebuild": "npm run validate-theme"
  }
}
```
