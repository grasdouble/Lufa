# Lufa Monorepo

Monorepo for the Lufa platform, including microfrontends, design system packages, shared config, Vite plugins, and supporting tooling.

## Requirements

- Node.js 24.9.0 (see .tool-versions)
- pnpm 10.26.x (monorepo uses pnpm workspaces)

## Install

```sh
pnpm install
```

## Workspace layout

| Path                        | Description                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| packages/apps/microfrontend | Main container and Home microfrontends                                                   |
| packages/design-system      | Core design system packages (main library, primitives, tokens, storybook, documentation) |
| packages/plugins/vite       | Internal Vite plugins                                                                    |
| packages/config             | Shared linting, prettier, and tsconfig presets                                           |
| packages/cdn                | CDN-related tooling (autobuild server)                                                   |
| packages/poc                | Proofs of concept                                                                        |
| docs                        | Guides, POCs, and reports                                                                |

## Common scripts (root)

### All Packages

```sh
pnpm all:build        # Build all @grasdouble/* packages
pnpm all:lint         # Lint all packages
pnpm all:prettier     # Format all packages
```

### Applications (Microfrontends)

```sh
pnpm app:mf:dev       # Run microfrontends in dev (main-container + home)
pnpm app:mf:build     # Build both microfrontends
pnpm app:mf:preview   # Preview both microfrontends
```

### CDN (Autobuild Server)

```sh
pnpm cdn:autobuild-server:build    # Build autobuild server (ESM + CJS)
pnpm cdn:autobuild-server:dev      # Run autobuild server in dev mode
pnpm cdn:autobuild-server:lint     # Lint autobuild server
pnpm cdn:autobuild-server:prettier # Format autobuild server
pnpm cdn:autobuild-server:preview  # Preview autobuild server
```

### Design System

#### All packages

```sh
pnpm ds:all:dev   # Run design system, storybook and documentation in dev mode
pnpm ds:all:lint  # Lint all design system packages
pnpm ds:all:prettier # Format all design system packages
```

#### Main Package

```sh
pnpm ds:main:build    # Build design system main package
pnpm ds:main:dev      # Run design system main package in dev mode
pnpm ds:main:lint     # Lint design system main package
pnpm ds:main:prettier # Format design system main package
```

#### Storybook

```sh
pnpm ds:storybook:build    # Build Storybook
pnpm ds:storybook:dev      # Storybook dev server
pnpm ds:storybook:lint     # Lint Storybook
pnpm ds:storybook:prettier # Format Storybook
```

#### Documentation

```sh
pnpm ds:documentation:build    # Build documentation
pnpm ds:documentation:dev      # Docusaurus docs dev server
pnpm ds:documentation:lint     # Lint documentation
pnpm ds:documentation:prettier # Format documentation
```

#### Tokens

```sh
pnpm ds:tokens:build    # Build design tokens
pnpm ds:tokens:lint     # Lint design tokens
pnpm ds:tokens:prettier # Format design tokens
```

#### Primitives

```sh
pnpm ds:primitives:build    # Build design primitives
pnpm ds:primitives:lint     # Lint design primitives
pnpm ds:primitives:prettier # Format design primitives
```

### Plugins

```sh
pnpm plugin:vite:lint     # Lint Vite plugins
pnpm plugin:vite:prettier # Format Vite plugins
```

### Tools

```sh
pnpm tools:generate-outdated-report # Generate dependency report
```

## Package naming

Packages follow the scope `@grasdouble/*`. Use pnpm filter syntax when working on a single package, for example:

```sh
pnpm --filter @grasdouble/lufa_design-system run dev
```

## Releases

Changesets is configured for versioning and publishing (`pnpm changeset`).

## Contributing

- Install dependencies with pnpm install
- Use pnpm scripts above for build, lint, and formatting
- Keep changes scoped to the relevant package using pnpm filters

## Links

- License: [LICENSE.md](LICENSE.md)
- Workspace definition: [pnpm-workspace.yaml](pnpm-workspace.yaml)
- Root package scripts: [package.json](package.json)
