---
id: migration
title: Migration Guide
sidebar_label: Migration
description: Guidance for migrating between design system versions.
---

# Migration Guide

This guide helps you upgrade between major versions of the Lufa Design System. Each major version may include breaking changes that require updates to your code.

## Current Version Status

The Lufa Design System is currently in **beta** (v0.x.x). During the beta phase:

- APIs may change without a major version bump
- We strive to minimize breaking changes but cannot guarantee stability
- Each minor version (0.x.0) may include breaking changes
- Patch versions (0.0.x) should be safe to upgrade

**v1.0.0 Release**: Once we reach v1.0.0, we will follow [Semantic Versioning](https://semver.org/), and breaking changes will only occur in major versions.

## When to Migrate

You should migrate when:

- 🔒 **Security updates** are released
- ✨ **New features** you need are available
- 🐛 **Critical bugs** are fixed in newer versions
- 📦 **Your dependencies** require a newer version

## How to Migrate

### Step 1: Review the Changelog

Before upgrading, always check the [Changelog](../changelog.md) for:

- Breaking changes
- New features
- Deprecations
- Bug fixes

### Step 2: Update Dependencies

```bash
# Update to the latest version
pnpm update @grasdouble/lufa_design-system

# Or install a specific version
pnpm add @grasdouble/lufa_design-system@0.6.0
```

### Step 3: Update Design Tokens (if applicable)

If you're using design tokens directly:

```bash
# Update token packages
pnpm update @grasdouble/lufa_design-system-tokens
```

### Step 4: Run Tests

After upgrading, run your test suite to catch any breaking changes:

```bash
pnpm test
```

### Step 5: Update Your Code

Follow the migration instructions for your specific version upgrade below.

## Version Migration Guides

### Migrating to v1.0.0 (Future)

> 📋 This section will be populated when v1.0.0 is released.

Once we reach v1.0.0, we will provide:

- Complete list of breaking changes from v0.x.x
- Code examples for common migration scenarios
- Automated migration tools (if applicable)
- Timeline for deprecation warnings

**Expected v1.0.0 Changes:**

While we're still in beta, here are some potential breaking changes we're considering for v1.0.0:

- Standardization of prop naming conventions
- Removal of deprecated components and props
- Refinement of the token naming system
- Updates to component composition patterns
- Improved TypeScript type definitions

## Beta Version Changes (v0.x.x)

### v0.6.0 (Latest)

> 📋 No breaking changes in this version. Safe to upgrade from v0.5.x.

**What's New:**

- Enhanced documentation with interactive examples
- Improved accessibility features across all components
- New playground page for experimentation

**Migration Steps:**

No code changes required. Simply update your dependencies.

### v0.5.0

> ⚠️ Minor breaking changes in component prop naming.

**Breaking Changes:**

None documented yet. This version focused on internal improvements.

**Migration Steps:**

Update dependencies and rebuild your project.

### v0.4.0 and Earlier

For changes in earlier versions, please refer to:

- [Design System Changelog](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/main/CHANGELOG.md)
- [Tokens Changelog](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/tokens/CHANGELOG.md)
- [Primitives Changelog](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/primitives/CHANGELOG.md)

## Common Migration Scenarios

### Updating Component Props

If a prop name changes:

```tsx
// ❌ Old (v0.4.0)
<Button color="primary" size="md">
  Click me
</Button>

// ✅ New (v0.5.0+)
<Button variant="solid" color="primary" size="medium">
  Click me
</Button>
```

### Updating Token Imports

**As of v0.5.0, token JS/TS exports have been removed:**

```tsx
// ❌ Old (no longer works)
import { LufaPrimitiveColorBlue600 } from '@grasdouble/lufa_design-system-tokens';
// ✅ New (for Storybook/documentation only)
import tokens from '@grasdouble/lufa_design-system-tokens/values';

const primaryColor = LufaPrimitiveColorBlue600;

const primaryColor = tokens.primitive.color.blue['600'];

// ✅ Best (for React components)
// Use CSS Modules with CSS custom properties:
// .button { color: var(--lufa-primitive-color-blue-600); }
```

**Important:** Token imports should only be used in Storybook stories or documentation. React components should always use CSS Modules with CSS custom properties for proper theming support.

### Handling Removed Components

If a component is removed or renamed:

```tsx
// ❌ Old component removed
// ✅ Use the replacement
import { Button, OldButton } from '@grasdouble/lufa_design-system';

// Map old props to new props
<Button variant="solid" {...oldButtonProps} />;
```

## Deprecation Warnings

During beta and after v1.0.0, we will warn you about deprecated features:

```tsx
// You'll see a console warning like:
// Warning: The 'color' prop is deprecated and will be removed in v2.0.0.
// Please use 'variant' instead.

<Button color="primary"> // ⚠️ Deprecated
  Click me
</Button>

// Update to:
<Button variant="primary"> // ✅ Recommended
  Click me
</Button>
```

**How to Handle Deprecations:**

1. Look for console warnings in your development environment
2. Check the [Changelog](../changelog.md) for deprecation notices
3. Update your code before the next major version
4. Use TypeScript to catch deprecated prop usage at build time

## Automated Migration Tools

> 🚧 Coming in the future

We plan to provide automated migration tools (codemods) for major version upgrades:

```bash
# Future: Automated migration script
npx @grasdouble/lufa-migrate v0.x.x to v1.0.0
```

These tools will:

- Automatically update import statements
- Rename deprecated props
- Suggest manual changes where automation isn't possible
- Generate a migration report

## TypeScript Support

Our TypeScript definitions will help catch breaking changes:

```tsx
// TypeScript will error on removed props
<Button oldProp="value"> // ❌ TypeScript error Click me</Button>
```

**Migration Tips:**

- Enable strict mode in `tsconfig.json`
- Run `tsc --noEmit` to check for type errors
- Fix type errors before running your app

## Rollback Strategy

If you encounter issues after upgrading:

### Quick Rollback

```bash
# Revert to previous version
pnpm add @grasdouble/lufa_design-system@0.5.0
```

### Long-term Strategy

1. **Pin versions** in `package.json` until you're ready to upgrade:

   ```json
   {
     "dependencies": {
       "@grasdouble/lufa_design-system": "0.5.0"
     }
   }
   ```

2. **Use version ranges cautiously**:

   ```json
   {
     "dependencies": {
       // ✅ Safe: patch updates only
       "@grasdouble/lufa_design-system": "~0.5.0",

       // ⚠️ Caution: minor updates (breaking changes in beta)
       "@grasdouble/lufa_design-system": "^0.5.0",

       // ❌ Avoid: can introduce breaking changes
       "@grasdouble/lufa_design-system": "*"
     }
   }
   ```

## Getting Help

If you encounter migration issues:

1. **Check Documentation**: Review [Changelog](../changelog.md) and [Contributing Guide](./contributing.md)
2. **Search Issues**: Look for existing [GitHub Issues](https://github.com/grasdouble/Lufa/issues)
3. **Ask Questions**: Open a [Discussion](https://github.com/grasdouble/Lufa/discussions)
4. **Report Bugs**: If you find migration bugs, [open an issue](https://github.com/grasdouble/Lufa/issues/new)

## Migration Checklist

Use this checklist when upgrading:

- [ ] Read the [Changelog](../changelog.md) for your target version
- [ ] Review breaking changes and deprecations
- [ ] Update dependencies in `package.json`
- [ ] Run `pnpm install` to update lockfile
- [ ] Update token imports if necessary
- [ ] Update component props based on changes
- [ ] Run TypeScript compiler to catch type errors
- [ ] Run your test suite
- [ ] Test your application manually
- [ ] Update any custom theme overrides
- [ ] Commit changes with descriptive message

## Contributing to Migration Docs

Help us improve these migration guides:

1. If you find a breaking change not documented, [open an issue](https://github.com/grasdouble/Lufa/issues/new)
2. Share your migration experience in [Discussions](https://github.com/grasdouble/Lufa/discussions)
3. Submit PRs to improve migration instructions

## Related Resources

- [Changelog](../changelog.md) - Version history and release notes
- [Contributing Guide](./contributing.md) - How to contribute changes
- [Semantic Versioning](https://semver.org/) - Version numbering explained
- [GitHub Releases](https://github.com/grasdouble/Lufa/releases) - Detailed release notes
