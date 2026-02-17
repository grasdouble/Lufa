# Docusaurus Scripts

This directory contains automation scripts for maintaining the Docusaurus documentation site.

## Table of Contents

- [update-changelog.js](#update-changelogjs) - Changelog automation

---

## `update-changelog.js`

Automatically updates the changelog documentation from package CHANGELOG.md files.

For detailed documentation, see [UPDATE_CHANGELOG.md](./UPDATE_CHANGELOG.md).

**Quick Usage:**

```bash
pnpm --filter @grasdouble/lufa_design-system-docusaurus update-changelog
```

**What it does:**

- Reads package CHANGELOG.md files
- Updates Recent Releases section in docs/changelog.md
- Updates version config in docusaurus.config.ts
- Preserves all other content

**Related Files:**

- Script: [`update-changelog.js`](./update-changelog.js)
- Workflow: [`.github/workflows/tools-ds-docusaurus-update-changelog-docs.yml`](../../../.github/workflows/tools-ds-docusaurus-update-changelog-docs.yml)
- Full Documentation: [`UPDATE_CHANGELOG.md`](./UPDATE_CHANGELOG.md)
