# Playwright Component Testing

Component tests for the Lufa Design System using [Playwright Component Testing](https://playwright.dev/docs/test-components).

## 📚 Documentation

- **[Snapshot Management System](./_docs/snapshot-management-system.md)** - Complete guide to compression, Docker, and GitHub Actions workflows
- **[Docker Linux Snapshots](./_docs/docker-linux-snapshots.md)** - Cross-platform snapshot generation
- **[Snapshot Update Guide](./_docs/snapshot-update.md)** - Update snapshots reliably
- **[Compression Scripts](./scripts/README.md)** - Technical details on snapshot compression
- **[Snapshot Compression](./_docs/snapshot-compression.md)** - Workflow and requirements
- **[Test Structure](./_docs/test-structure.md)** - Folder layout and categories
- **[Configuration](./_docs/configuration.md)** - Config, browsers, files
- **[Writing Tests](./_docs/writing-tests.md)** - Guidelines and example
- **[CI/CD](./_docs/ci-cd.md)** - Where tests run
- **[Troubleshooting](./_docs/troubleshooting.md)** - Common fixes

## Quick Start

```bash
# Run tests
pnpm test-ct

# Run tests in UI mode (interactive)
pnpm test-ct:ui

# Update snapshots
pnpm test-ct:update-snapshots

# Compress snapshots (after updating)
pnpm compress-snapshots
```

## Running from Root

```bash
# Run tests
pnpm ds:test

# Run tests in UI mode
pnpm ds:test:ui

# Update snapshots
pnpm ds:test:update-snapshots

# Compress snapshots
pnpm ds:test:compress-snapshots
```

## Additional Guides

Detailed guides are in `./_docs/`.
