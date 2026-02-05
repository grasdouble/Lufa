# Pinned GitHub Actions

This document tracks third-party GitHub Actions that have been pinned to specific commit SHAs for security purposes.

## Why Pin Actions?

Pinning actions to commit SHAs provides:

- **Security**: Prevents malicious updates from being automatically applied
- **Stability**: Ensures workflows behave consistently
- **Auditability**: Makes it clear exactly which version is being used

## Pinned High-Risk Actions

High-risk actions are those that:

- Handle secrets (FTP credentials, tokens, etc.)
- Deploy to production environments
- Modify repository content
- Execute arbitrary code with elevated permissions

### Current Pinned Actions

| Action                                         | Version | Commit SHA                                 | Risk Category                           | Workflows                                                                      |
| ---------------------------------------------- | ------- | ------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------ |
| `SamKirkland/FTP-Deploy-Action`                | v4.3.6  | `a51268f67f6605236975928ae28b0f7e9971d50a` | FTP credentials + production deployment | `release-lufa-doc-prod-publish.yml`, `release-lufa-storybook-prod-publish.yml` |
| `actions/github-script`                        | v8      | `ed597411d8f924073f98dfc5c65a23a2325f34cd` | Executes JavaScript with GITHUB_TOKEN   | `tools-ds-playwright-ct.yml` (2 occurrences)                                   |
| `the-guild-org/changesets-dependencies-action` | v1.2.2  | `f11b16181c79e07d62b112c2f32c9db534a9df09` | Modifies repository content             | `tools-dependabot-changeset.yml`                                               |
| `peaceiris/actions-gh-pages`                   | v4      | `e9c66a37f080288a11235e32cbe2dc5fb3a679cc` | Deploys to GitHub Pages                 | `tools-ds-storybook-on-pr-publish.yml`                                         |

## Actions NOT Pinned

### Official Actions (Trusted)

These actions from the official `actions/*` organization are generally trusted and kept on version tags:

- `actions/checkout@v6`
- `actions/cache@v4`
- `actions/setup-node@v4`
- And others...

### Local Composite Actions

Our own composite actions in `.github/actions/*` are not pinned as they're maintained within this repository.

### Low-Risk Third-Party Actions

Some third-party actions pose minimal security risk and remain on version tags:

- `peter-evans/create-or-update-comment@v5` - Only creates/updates PR comments
- `actions-ecosystem/action-remove-labels@v1` - Only removes PR labels
- `dtolnay/rust-toolchain@stable` - Official Rust toolchain installer
- `tj-actions/changed-files@v47` - Read-only file change detection
- `pnpm/action-setup@v4` - Official pnpm installer

## Update Process

When updating a pinned action:

1. **Check the Release**: Visit the action's GitHub repository and review the changelog for the new version
2. **Find the Commit SHA**: Navigate to the release tag and copy the full 40-character commit SHA
3. **Update Workflows**: Replace the old SHA with the new one, keeping the version comment
4. **Update This Document**: Update the table above with the new version and SHA
5. **Test Thoroughly**: Ensure workflows still function correctly with the updated action

### Example Update

```yaml
# Before
- uses: SamKirkland/FTP-Deploy-Action@a51268f67f6605236975928ae28b0f7e9971d50a # v4.3.6

# After (updating to hypothetical v4.3.7)
- uses: SamKirkland/FTP-Deploy-Action@b62379g78g7606347986039bf8c40f8082e60b1b # v4.3.7
```

## Security Scanning

All pinned actions should be:

- Reviewed for security vulnerabilities before pinning
- Updated regularly (at least quarterly)
- Monitored for security advisories via Dependabot

## Related Documentation

- [GitHub Actions Security Hardening](https://docs.github.com/en/actions/security-guides/security-hardening-for-github-actions)
- [Workflow Consolidation Project](./docs/workflow-consolidation.md) (if exists)

---

**Last Updated**: 2026-02-05  
**Maintained By**: DevOps Team
