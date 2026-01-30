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

```bash
# Validate a custom theme file
npx lufa-validate-theme ./my-custom-theme.css

# Output complete theme template
npx lufa-validate-theme --template > my-theme.css
```

## CLI Documentation

- [Usage](./_docs/usage.md)
- [Validation Checks](./_docs/validation-checks.md)
- [Examples](./_docs/examples.md)
- [CLI Options](./_docs/cli-options.md)
- [CI/CD Integration](./_docs/ci-cd-integration.md)
- [Development](./_docs/development.md)
- [Token Role Metadata](./_docs/token-role-metadata.md)

## Related Packages

- `@grasdouble/lufa_design-system-tokens` - Core design tokens
- `@grasdouble/lufa_design-system-main` - React components
- `@grasdouble/lufa_design-system-themes` - Pre-built theme templates

## Related Documentation

For more information about theming and token architecture:

- [Theme Switching Guide](../themes/_docs/theme-switching-guide.md)
- [Token Architecture](../tokens/_docs/token-architecture.md)
- [Design System Overview](../_docs/overview.md)

## License

MIT
