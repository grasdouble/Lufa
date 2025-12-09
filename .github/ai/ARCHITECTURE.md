# Lufa Monorepo Architecture

> **Last Updated:** December 9, 2025  
> **Monorepo Structure:** pnpm workspace-based monorepo (pnpm@10.8.1)

## Overview

Lufa is a personal monorepo that serves as a consolidated workspace for various web development projects, experiments, and tools. It's designed to maintain long-term projects, keep dependencies up-to-date, and reuse shared configurations across packages while running microfrontends served from a custom CDN.

### Philosophy

- **Consolidation**: Bring together multiple projects into a single, manageable repository
- **Maintainability**: Keep older projects updated and alive
- **Experimentation**: Provide space for POCs and testing new ideas
- **Reusability**: Share configurations and components across projects

## Monorepo Structure

```
Lufa/
├── .github/                    # GitHub workflows, actions, and AI documentation
│   ├── actions/               # Reusable GitHub Actions
│   │   └── dependency-update/ # Automated dependency management
│   ├── ai/                    # AI assistant documentation and templates
│   │   ├── prompts/          # AI prompts for documentation generation
│   │   └── templates/        # Documentation templates
│   └── workflows/            # CI/CD workflows
├── docs/                      # Project documentation
│   ├── howto/                # How-to guides
│   ├── reports/              # Automated reports (dependencies, etc.)
│   └── todos/                # Task tracking and ideas
├── packages/                  # All project packages
│   ├── apps/                 # Deployable applications
│   │   └── microfrontend/   # Single-SPA microfrontend applications
│   ├── cdn/                  # CDN-related tools
│   │   └── autobuild-server/ # On-demand CDN build server
│   ├── config/               # Shared configurations (ESLint, TypeScript, etc.)
│   ├── design-system/        # Design system packages
│   │   ├── main/            # Core design system package
│   │   ├── primitives/      # Base components
│   │   ├── tokens/          # Design tokens
│   │   ├── themes/          # Theme configurations
│   │   ├── storybook/       # Component documentation and testing
│   │   └── documentation/   # Design system documentation site
│   ├── plugins/              # Build tools and plugins
│   │   └── vite/            # Vite plugins for Single-SPA
│   │       ├── vite-plugin-import-map-injector/
│   │       └── vite-plugin-react-preamble/
│   └── poc/                  # Proof of concepts and experiments
│       ├── design-system-tokens-sd/ # Style Dictionary-based token POC
│       └── single-spa-vite-esm/     # Archived Single-SPA + Vite ESM prototype
└── images/                    # Project images and assets
```

## Core Components

### 1. Design System (`packages/design-system/`)

The design system is a collection of reusable React 19 components built with TypeScript and Tailwind CSS v4.

**Packages:**

- **`main/`**: Core design system package that exports all components
- **`primitives/`**: Base components and building blocks
- **`tokens/`**: Design tokens (colors, spacing, typography)
- **`themes/`**: Theme configurations and switchers (e.g., dark mode)
- **`storybook/`**: Interactive component documentation ([lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr))
- **`documentation/`**: Design system documentation website ([lufa-design.sebastien-lemouillour.fr](https://lufa-design.sebastien-lemouillour.fr))
- **`packages/poc/design-system-tokens-sd/`**: Style Dictionary-based token POC to compare with the TypeScript token package

**Key Features:**

- Tailwind CSS v4 with CSS-first configuration
- Dark mode support
- Component examples in Storybook and a dedicated documentation site
- React 19 + TypeScript for type safety

### 2. Microfrontends (`packages/apps/microfrontend/`)

Single-SPA based microfrontend architecture that relies on import maps and a custom CDN.

**Applications:**

- **`main-container/`**: Root shell that registers microfrontends, fetches the canonical import map from the CDN, enables `import-map-overrides`, and mounts Storybook in an iframe on `/storybook`
- **`home/`**: React microfrontend using design system components to render the landing page and external links

**Deployed at:** [www.sebastien-lemouillour.fr](https://www.sebastien-lemouillour.fr)

**Architecture:**

- Single-SPA framework for microfrontend orchestration
- Import map overrides for local development (`localStorage.devtools = "true"`)
- CDN-based module loading in production with import maps; dev uses `importMap.dev.json` to target Vite on port 4101

### 3. CDN Infrastructure (`packages/cdn/`)

Custom CDN solution for hosting and serving frontend modules.

**`autobuild-server/`**: On-demand build server that:

- Extracts packages from GitHub Packages for `@grasdouble/*` (using `GITHUB_TOKEN`) or npm for external deps
- Validates ESM-only packages and serves the requested `exports` entry
- Generates CDN content on demand instead of pre-building artifacts
- Implements domain allowlisting, rate limiting with IP blocking/unblocking, and path sanitization

### 4. Shared Configurations (`packages/config/`)

Centralized configuration packages for consistency across projects:

- **ESLint configurations**: Linting rules and standards (`@grasdouble/lufa_config_eslint`)
- **TypeScript configurations**: Base tsconfig files (`@grasdouble/lufa_config_tsconfig`)
- **Prettier configurations**: Code formatting rules (`@grasdouble/lufa_config_prettier`)
- Other build tool configurations shared across packages

### 5. Vite Plugins (`packages/plugins/vite/`)

Custom Vite plugins developed for Single-SPA integration:

- **vite-plugin-import-map-injector**: Injects external, dev, and prod import maps into `index.html` for Single-SPA shells
- **vite-plugin-react-preamble**: Adds React Fast Refresh/Vite client scripts for remote parcels during dev (port 4101)

### 6. Proof of Concepts (`packages/poc/`)

Experimental projects and technology explorations. These packages:

- Are not published to npm
- May be archived when complete
- Serve as learning and testing grounds
- Current examples: `design-system-tokens-sd` (Style Dictionary token pipeline) and archived `single-spa-vite-esm` (source of the Vite plugins)

## Technology Stack

### Core Technologies

- **Package Manager**: pnpm (v10.8.1) with workspaces
- **Frontend Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first configuration)
- **Build Tool**: Vite (ESM-first)
- **Microfrontends**: Single-SPA with import maps + import-map-overrides
- **CDN**: Custom on-demand CDN at `cdn.sebastien-lemouillour.fr`
- **Component Documentation**: Storybook
- **Versioning**: Changesets

### Development Tools

- **Linting**: ESLint with shared configurations
- **Formatting**: Prettier
- **Type Checking**: TypeScript
- **Git Hooks**: (To be defined)
- **CI/CD**: GitHub Actions

### Deployment

- **Hosting**: GitHub Pages
- **Lufa Documentation**: [lufa-design.sebastien-lemouillour.fr](https://lufa-design.sebastien-lemouillour.fr)
- **Lufa Storybook**: [lufa-storybook.sebastien-lemouillour.fr](https://lufa-storybook.sebastien-lemouillour.fr)
- **Main Site**: [www.sebastien-lemouillour.fr](https://www.sebastien-lemouillour.fr)
- **Modules CDN**: [cdn.sebastien-lemouillour.fr](https://cdn.sebastien-lemouillour.fr) served by `@grasdouble/cdn_autobuild-server`

## Package Management

### Workspace Configuration

The monorepo uses pnpm workspaces defined in `pnpm-workspace.yaml`:

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

### Package Naming Convention

All published packages follow the naming pattern:

```
@grasdouble/lufa_[category]_[name]
```

Examples:

- `@grasdouble/lufa_design-system-primitives`
- `@grasdouble/lufa_microfrontend_main-container`
- `@grasdouble/lufa_design-system-storybook`

### Version Management

- **Changesets**: Used for versioning and changelog generation
- **Workflow**: PR must include a changeset (enforced by CI)
- **Release Process**: Automated via GitHub Actions workflow

## CI/CD Workflows

### Automation Workflows

1. **`cron-dependency-update.yml`**: Scheduled dependency updates
2. **`release-changeset.yml`**: Automated versioning and releases
3. **`release-lufa-doc-prod-publish.yml`**: Documentation deployment
4. **`release-lufa-storybook-prod-publish.yml`**: Storybook production deployment
5. **`tools-lint.yml`**: Automated linting on PRs
6. **`tools-missing-changeset.yml`**: Enforces changeset requirement in PRs
7. **`tools-storybook-on-pr-publish.yml`**: PR-based Storybook previews
8. **`tools-storybook-on-pr-unpublish.yml`**: Cleanup of PR Storybook previews

### GitHub Actions

- **`dependency-update/`**: Custom action for managing dependency updates

## Development Scripts

### Global Commands

```bash
# Build all packages
pnpm run build:all

# Lint all packages
pnpm run lint:all

# Generate dependency report
pnpm run generate-outdated-report
```

### Microfrontend Development

```bash
# Start microfrontend development servers
pnpm run mf:dev

# Build and preview microfrontends
pnpm run mf:buildAndPreview
```

### Design System Development

```bash
# Build design system packages
pnpm run build:lufa:ds:tokens
pnpm run build:lufa:ds:primitives
pnpm run build:lufa:ds
pnpm run build:lufa:ds:documentation

# Build Storybook
pnpm run build:lufa:ds:storybook

# Development mode with watch
pnpm run dev:design-system

# Storybook development
pnpm run dev:apps:storybook
```

## Documentation

### AI-Assisted Documentation

The `.github/ai/` folder contains resources for AI assistants to maintain consistent documentation:

- **Templates**: Standardized templates for workflows, actions, and architecture
- **Prompts**: Guidance for generating and updating documentation
- **README**: Central hub for AI documentation resources

### Project Documentation

- **`docs/LufaStory.md`**: Project timeline and changelog
- **`docs/POCs.md`**: Catalog of proof-of-concept projects
- **`docs/howto/`**: How-to guides and tutorials
- **`docs/reports/`**: Automated reports (e.g., outdated dependencies)
- **`docs/todos/`**: Ideas and planned features

## Best Practices

### Adding New Packages

1. Place package in appropriate `packages/` subdirectory
2. Update `pnpm-workspace.yaml` if needed
3. Follow naming convention: `@grasdouble/lufa_[category]_[name]`
4. Add build and dev scripts
5. Configure package.json with proper exports and dependencies

### Making Changes

1. Create a feature branch
2. Make changes and add tests if applicable
3. Create a changeset: `pnpm changeset`
4. Open a pull request
5. Ensure CI checks pass (lint, changesets)
6. Merge after review

### Publishing

1. Merge PRs with changesets to main
2. Automated workflow creates version bump PR
3. Review and merge version bump PR
4. Packages are automatically published

## Security

### CDN Security

- Domain allowlisting for allowed origins
- Rate limiting with IP blocking/unblocking to prevent abuse
- On-demand building rather than pre-built artifacts
- `GITHUB_TOKEN` required to pull `@grasdouble/*` packages from GitHub Packages

### Dependencies

- Regular automated dependency updates via cron workflow
- Security audits (to be enhanced)
- Outdated dependency reports

## Future Considerations

### Planned Improvements

- Enhanced testing infrastructure
- E2E testing setup
- Performance monitoring
- Better documentation for POCs
- Git hooks for pre-commit checks

### Areas for Growth

- More design system components
- Additional microfrontend applications
- Enhanced CDN features
- Better developer experience tools

## License

This project is under [Creative Commons Attribution-NonCommercial 4.0 International License](../../LICENSE.md).

---

**Note**: This is a personal project without a specific lens except to satisfy its owner. It serves as a playground for testing ideas, learning new technologies, and maintaining a portfolio of work.
