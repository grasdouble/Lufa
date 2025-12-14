# Lufa Monorepo Architecture

**Structure**: pnpm workspace | **Location**: Root | **Updated**: 2025-12-14 | **Version**: pnpm@10.8.1

## Stats

- Packages: 15+ across 6 categories
- Monorepo: pnpm workspace
- Deployments: 3 (www, storybook, docs)
- CDN: cdn.sebastien-lemouillour.fr

## Structure

## Structure

```
Lufa/
├── .github/
│   ├── actions/dependency-update/
│   ├── ai/
│   └── workflows/
├── docs/
│   ├── howto/
│   ├── reports/
│   └── todos/
├── packages/
│   ├── apps/microfrontend/
│   ├── cdn/autobuild-server/
│   ├── config/
│   ├── design-system/
│   ├── plugins/vite/
│   └── poc/
└── images/
```

## Tech Stack

| Layer           | Technology               | Usage                     |
| --------------- | ------------------------ | ------------------------- |
| Package Manager | pnpm 10.8.1              | Workspace management      |
| Frontend        | React 19                 | UI framework              |
| Styling         | Tailwind CSS 4           | CSS-first config          |
| Build           | Vite 7                   | ESM-first bundler         |
| Microfrontends  | Single-SPA 6             | Module federation         |
| Module Loading  | SystemJS 6 + import maps | Runtime module resolution |
| CDN             | Custom autobuild         | On-demand builds          |
| Components      | Storybook 10             | Documentation             |
| Versioning      | Changesets               | Version management        |
| CI/CD           | GitHub Actions           | Automation                |

## Key Concepts

### Package Categories

| Category      | Location                     | Purpose                               |
| ------------- | ---------------------------- | ------------------------------------- |
| apps          | packages/apps/microfrontend/ | Deployable applications               |
| cdn           | packages/cdn/                | CDN infrastructure                    |
| config        | packages/config/             | Shared configs (ESLint, TS, Prettier) |
| design-system | packages/design-system/      | UI components (5 packages)            |
| plugins       | packages/plugins/vite/       | Build tools                           |
| poc           | packages/poc/                | Experiments                           |

### Naming Convention

```
@grasdouble/lufa_[category]_[name]
```

Examples:

- `@grasdouble/lufa_design-system-primitives`
- `@grasdouble/lufa_microfrontend_main-container`

### Architecture Layers

```
┌─────────────────────────────────────┐
│     Main Container (Single-SPA)     │
│  www.sebastien-lemouillour.fr       │
└──────────────┬──────────────────────┘
               ↓ Import Maps
┌──────────────────────────────────────┐
│   CDN (cdn.sebastien-lemouillour.fr) │
│   - Parcels (.mjs)                   │
│   - Design System                    │
│   - React, SystemJS                  │
└──────────────┬───────────────────────┘
               ↓ On-demand build
┌──────────────────────────────────────┐
│   GitHub Packages / npm              │
│   - @grasdouble/* packages           │
└──────────────────────────────────────┘
```

## Config

**pnpm-workspace.yaml**:

```yaml
packages:
  - packages/plugins/vite/*
  - packages/cdn/*
  - packages/config/*
  - packages/design-system/*
  - packages/apps/*
  - packages/apps/microfrontend/*
  - packages/poc/*
```

## Build

### Global Commands

```bash
pnpm build:all                    # All packages
pnpm lint:all                     # Lint all
pnpm generate-outdated-report     # Dependency report
```

### Microfrontends

```bash
pnpm mf:dev                       # Dev servers
pnpm mf:buildAndPreview           # Build + preview
```

### Design System

```bash
pnpm build:lufa:ds:primitives     # Primitives
pnpm build:lufa:ds:tokens         # Tokens
pnpm build:lufa:ds                # Main
pnpm build:lufa:ds:storybook      # Storybook
pnpm build:lufa:ds:documentation  # Docs
pnpm dev:design-system            # Watch mode
pnpm dev:apps:storybook           # Storybook dev
```

## Dependencies

| Package                                        | Category      | Published  |
| ---------------------------------------------- | ------------- | ---------- |
| main-container                                 | apps          | ✗ (static) |
| home                                           | apps          | ✓          |
| autobuild-server                               | cdn           | ✗ (server) |
| eslint/tsconfig/prettier                       | config        | ✓          |
| main/primitives/tokens/storybook/documentation | design-system | ✓          |
| vite plugins                                   | plugins       | ✓          |
| POCs                                           | poc           | ✗          |

## Integration

### CDN Autobuild

```javascript
// Request: cdn.sebastien-lemouillour.fr/@grasdouble/package@version/entry.js
// 1. Extract from GitHub Packages (GITHUB_TOKEN)
// 2. Validate ESM-only
// 3. Serve requested exports entry
// 4. Cache result
```

### Import Maps

```json
{
  "imports": {
    "react": "https://esm.sh/react@19.2.1",
    "@grasdouble/lufa_design-system": "https://cdn.../lufa-ui.mjs",
    "@grasdouble/lufa_microfrontend_home": "https://cdn.../home.mjs"
  }
}
```

## Workflows

| Workflow                                | Trigger   | Purpose                 |
| --------------------------------------- | --------- | ----------------------- |
| cron-dependency-update.yml              | Scheduled | Auto dependency updates |
| release-changeset.yml                   | Push main | Version + publish       |
| release-lufa-doc-prod-publish.yml       | Tag       | Deploy docs             |
| release-lufa-storybook-prod-publish.yml | Tag       | Deploy Storybook        |
| tools-lint.yml                          | PR        | Linting                 |
| tools-missing-changeset.yml             | PR        | Enforce changeset       |
| tools-storybook-on-pr-publish.yml       | PR open   | Preview Storybook       |
| tools-storybook-on-pr-unpublish.yml     | PR close  | Cleanup preview         |

## Decisions

| What           | Why                       | Trade-off        |
| -------------- | ------------------------- | ---------------- |
| pnpm workspace | Fast, efficient, strict   | Learning curve   |
| Custom CDN     | Control, on-demand builds | Maintenance      |
| Single-SPA     | Independent deployments   | Complexity       |
| Changesets     | Automated versioning      | PR overhead      |
| Tailwind CSS 4 | CSS-first, modern         | Migration effort |

## Deployment

| Site      | URL                                     | Source                      |
| --------- | --------------------------------------- | --------------------------- |
| Main      | www.sebastien-lemouillour.fr            | main-container              |
| Storybook | lufa-storybook.sebastien-lemouillour.fr | design-system/storybook     |
| Docs      | lufa-ds.grasdouble.com                  | design-system/documentation |
| CDN       | cdn.sebastien-lemouillour.fr            | autobuild-server            |

## Debug

| Issue              | Cause                 | Fix                                        |
| ------------------ | --------------------- | ------------------------------------------ |
| Build fails        | Missing workspace dep | Check pnpm-workspace.yaml                  |
| Import map 404     | Wrong CDN URL         | Verify package published                   |
| Changeset required | No changeset in PR    | `pnpm changeset`                           |
| Outdated deps      | Manual updates needed | Check reports/OUTDATED_DEPENDENCIES.report |

## Best Practices

- Follow naming convention (@grasdouble/lufa_category_name)
- Add changeset for every PR
- Update pnpm-workspace.yaml for new packages
- Document in .github/ai/architecture/
- Keep POCs in packages/poc/
- Use shared configs (eslint, tsconfig, prettier)
- Test microfrontends in main-container before deploy

## Links

- [MICROFRONTEND.md](microfrontend/MICROFRONTEND.md) - Single-SPA architecture
- [DESIGN_SYSTEM.md](design-system/DESIGN_SYSTEM.md) - Components overview
- License: [CC BY-NC 4.0](../LICENSE.md)
