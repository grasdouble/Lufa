<div align="center">

<img src="./images/Lufa_Logo.png" alt="Lufa Logo" height="120" />

# Lufa

[![Node version](https://img.shields.io/badge/Node.js-24.9.0-339933?style=flat-square&logo=node.js)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-10.26.x-F69220?style=flat-square&logo=pnpm)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE.md)

_A personal learning platform for building modern web applications with microfrontends and design systems_

[Getting Started](#getting-started) • [Architecture](#architecture) • [Development](#development) • [Documentation](#documentation)

</div>

---

## Overview

Lufa is a personal learning monorepo for exploring and building modern web applications. It serves as a centralized place to experiment with microfrontend architecture, design systems, and modern development practices using Single-SPA, React, and TypeScript.

### Key Features

- **Microfrontend Architecture** - Learn and experiment with Single-SPA orchestration
- **Design System** - Build and refine a component library with primitives, tokens, and theming
- **Developer Experience** - Fast HMR with Vite, TypeScript strict mode, AI-assisted development
- **Build Tools** - Custom Vite plugins for import maps and React preamble injection
- **CDN Infrastructure** - Experimental auto-build server for dynamic asset delivery
- **Shared Configuration** - Reusable ESLint, Prettier, and TypeScript configs across projects

## Getting Started

### Prerequisites

- [Node.js 24.9.0](https://nodejs.org) (see `.tool-versions`)
- [pnpm 10.26.x](https://pnpm.io) or later

### Quick Start

```bash
# Clone the repository
git clone https://github.com/grasdouble/Lufa.git
cd Lufa

# Install dependencies
pnpm install

# Build all packages
pnpm all:build

# Start development servers
pnpm app:mf:dev        # Microfrontends
pnpm ds:storybook:dev  # Design system Storybook
```

Visit `http://localhost:3000` for microfrontends and `http://localhost:6006` for Storybook.

## Architecture

### Monorepo Structure

```
packages/
├── apps/microfrontend/     # Single-SPA applications
│   ├── main-container/     # Root orchestrator
│   └── home/               # Home page microfrontend
├── design-system/          # Component library
│   ├── main/               # React components (16 components)
│   ├── tokens/             # Semantic design tokens (453 tokens, 4 levels)
│   ├── themes/             # Theme variants
│   ├── storybook/          # Component explorer
│   ├── docusaurus/         # Documentation site
│   ├── playwright/         # Component tests (599 tests)
│   └── cli/                # CLI tools
├── cdn/                    # CDN infrastructure
│   └── autobuild-server/   # Dynamic asset builder
├── plugins/vite/           # Custom Vite plugins
│   ├── import-map-injector/
│   └── react-preamble/
├── config/                 # Shared configurations
│   ├── eslint/
│   ├── prettier/
│   └── tsconfig/
└── poc/                    # Proof of concepts
```

### Technology Stack

| Category               | Technology                 |
| ---------------------- | -------------------------- |
| **Microfrontends**     | Single-SPA, React 18+      |
| **Build Tool**         | Vite 5.x                   |
| **Testing**            | Vitest, Playwright         |
| **Styling**            | CSS Modules, Design Tokens |
| **Documentation**      | Storybook 8, Docusaurus 3  |
| **Version Management** | Changesets                 |

## Development

### Common Commands

#### Development Workflow

```bash
# Run all microfrontends
pnpm app:mf:dev

# Run design system with Storybook
pnpm ds:all:dev

# Run individual package
pnpm --filter @grasdouble/lufa_design-system dev
```

#### Building

```bash
# Build everything
pnpm all:build

# Build specific package
pnpm --filter @grasdouble/lufa_microfrontend_home build
```

#### Code Quality

```bash
# Lint all packages
pnpm all:lint

# Format all packages
pnpm all:prettier

# Generate dependency report
pnpm tools:generate-outdated-report
```

### Package Development

Working on a specific package:

```bash
# Navigate to package
cd packages/design-system/main

# Install dependencies (if needed)
pnpm install

# Run development mode
pnpm dev

# Build
pnpm build

# Test
pnpm test
```

### AI-Assisted Development

Lufa includes comprehensive AI assistance with GitHub Copilot:

- [Copilot Instructions](.github/copilot-instructions.md) - Project-wide guidelines
- [Context-Specific Rules](.github/instructions/) - Technology-specific instructions
- [Agents](.github/agents/) - Specialized workflows (TDD, refactoring)

**Quick Start for Copilot:**

- Use TypeScript, React, and CSS Modules with design tokens as defaults
- Write tests for all new code (Vitest for unit, Playwright for E2E)
- Follow accessibility guidelines (WCAG 2.1 AA)
- Use semantic, token-based styling

## Documentation

### Design System

- **[Storybook](packages/design-system/storybook/)** - Interactive component explorer
- **[Documentation Site](packages/design-system/docusaurus/)** - Comprehensive guides
- **[Architecture](packages/design-system/_docs/ARCHITECTURE.md)** - Complete architecture documentation (v0.11.0)
- **[ADRs](packages/design-system/_docs/adrs/)** - Architecture Decision Records (11 ADRs)
- **[Tokens](packages/design-system/tokens/)** - 4-level semantic token system (453 tokens)
- **[Tokens](packages/design-system/tokens/)** - Semantic design decisions
- **[Themes](packages/design-system/themes/)** - Alternative color schemes

#### Critical Architecture Documents

Must-read for contributors:

- [ADR-011: Immutable Primitives](packages/design-system/_docs/adrs/ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md) - Foundation principle
- [ADR-001: Modes vs Themes](packages/design-system/_docs/adrs/ADR-001-IMPLEMENTED-modes-vs-themes-separation.md) - Theming system
- [ADR-002: HTML Attributes](packages/design-system/_docs/adrs/ADR-002-IMPLEMENTED-html-attributes-naming.md) - Attribute naming

### Microfrontends

- **[Architecture Overview](packages/apps/microfrontend/)** - Microfrontend concepts
- **[Main Container](packages/apps/microfrontend/main-container/)** - Root orchestrator
- **[Home](packages/apps/microfrontend/home/)** - Example microfrontend

### Guides

- **[How to use Changesets](docs/howto/How-to-use-changeset-in-Lufa.md)** - Version management
- **[Dependabot Guide](.github/dependabot.md)** - Automated dependency updates
- **[POCs](docs/POCs.md)** - Proof of concepts and experiments
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines

## Package Naming

All packages use the `@grasdouble/` scope:

- `@grasdouble/lufa_design-system*` - Design system packages
- `@grasdouble/lufa_microfrontend_*` - Microfrontend applications
- `@grasdouble/lufa_config_*` - Configuration presets
- `@grasdouble/cdn_*` - CDN tooling

Use pnpm filter syntax for specific packages:

```bash
pnpm --filter @grasdouble/lufa_design-system run dev
pnpm --filter "@grasdouble/lufa_config_*" run lint
```

## Versioning and Releases

Lufa uses [Changesets](https://github.com/changesets/changesets) for version management:

```bash
# Create a changeset
pnpm changeset

# Version packages
pnpm changeset version

# Publish packages
pnpm changeset publish
```

See [How to use Changesets in Lufa](docs/howto/How-to-use-changeset-in-Lufa.md) for detailed instructions.

## Contributing

This is a personal learning project, but contributions and suggestions are welcome! Please see:

- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [Copilot Instructions](.github/copilot-instructions.md) - Development standards
- [TODOs](docs/todos/) - Planned improvements

## Resources

- **Workspace:** [pnpm-workspace.yaml](pnpm-workspace.yaml)
- **Scripts:** [package.json](package.json)
- **License:** [MIT](LICENSE.md)

---

<div align="center">

Made with ❤️ by Sebastien Le Mouillour ([@noofreuuuh](https://github.com/noofreuuuh))

</div>
