# Changelog

This page documents all notable changes to the Lufa Design System packages.

## About Versioning

Lufa Design System follows [Semantic Versioning 2.0.0](https://semver.org/):

- **Major version** (1.0.0): Breaking changes that require migration
- **Minor version** (0.1.0): New features, backward-compatible
- **Patch version** (0.0.1): Bug fixes and minor improvements

## Current Status

The design system is currently in **beta** (version 0.x.x), which means:

- APIs may change between minor versions
- Components are production-ready but may undergo refinements
- Breaking changes will be documented in migration guides
- Approaching stable 1.0.0 release

## Design System Changelog

View the complete changelog for the main design system package:

👉 [**@grasdouble/lufa_design-system CHANGELOG.md**](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/main/CHANGELOG.md)

## Recent Releases

### @grasdouble/lufa_design-system

#### 0.5.1 (Latest)

**Patch Changes:**

- 6c972e8: fix: prettier config
- 2d37fc0: Update dependencies
- 4d0893b: Update scripts and README files
- 57df928: chore: update lint and tsconfig
- 412c362: fix(chore): add missing prettier and eslint config + add a script prettier in package.json
- b101244: fix(chore): eslint config + fix new issues
- Updated dependencies [6c972e8]
- Updated dependencies [2d37fc0]
- Updated dependencies [4d0893b]
- Updated dependencies [57df928]
- Updated dependencies [0194d3d]
- Updated dependencies [412c362]
- Updated dependencies [b101244]

#### 0.5.0

**Minor Changes:**

- 1f24429: Add navigation components and improve documentation

#### 0.4.0

**Minor Changes:**

- 48c857f: Add missing layout components with documentation

#### 0.3.1

**Patch Changes:**

- 93819d3: fix how to manage color on primitive
- Updated dependencies [93819d3]

#### 0.3.0

**Patch Changes:**

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus
- Updated dependencies [501cf5f]

## Related Packages

The design system consists of multiple packages. For complete version history:

- **Tokens Package**: [`@grasdouble/lufa_design-system-tokens`](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/tokens/CHANGELOG.md)
- **Primitives Package**: [`@grasdouble/lufa_design-system-primitives`](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/primitives/CHANGELOG.md)
- **Documentation**: [`@grasdouble/lufa_design-system-docusaurus`](https://github.com/grasdouble/Lufa/blob/main/packages/design-system/docusaurus/package.json) (currently v0.4.1)

## Migration Guides

When we introduce breaking changes, we provide migration guides:

- **Migration to v1.0.0** (Coming when approaching stable release)

## Deprecation Policy

When we deprecate features:

1. **Deprecation Notice**: Feature is marked deprecated with console warnings
2. **Grace Period**: Feature remains functional for at least one minor version
3. **Removal**: Feature is removed in the next major version
4. **Migration Path**: Documentation provides clear migration instructions

## Stay Updated

To stay informed about new releases:

- **GitHub Releases**: [Watch releases](https://github.com/grasdouble/Lufa/releases)
- **npm**: Monitor package updates in your `package.json`
- **Changelogs**: Check this page regularly
- **Changesets**: Review [pending changesets](https://github.com/grasdouble/Lufa/tree/main/.changeset) for upcoming changes

## Reporting Issues

Found a bug or regression in a recent release?

- [Open an issue](https://github.com/grasdouble/Lufa/issues/new)
- Include the version number
- Provide reproduction steps
- Mention if it's a regression from a previous version

## Version History

For complete version history including all packages in the monorepo:

```bash
# Clone the repository
git clone https://github.com/grasdouble/Lufa.git
cd Lufa

# View all git tags
git tag --list

# View detailed changelog for a package
cat packages/design-system/main/CHANGELOG.md
```

---

**Note**: This changelog focuses on user-facing changes. For detailed development changes, see individual package CHANGELOG.md files in the [repository](https://github.com/grasdouble/Lufa).
