# Lufa Microfrontend Architecture

## Overview

This directory contains the implementation of Lufa's microfrontend architecture using Single-SPA. It enables independent development, deployment, and runtime composition of multiple applications into a unified user experience.

## Architecture Goals

- **Independent Development** - Teams can work on separate applications autonomously
- **Scalability** - Add or remove microfrontends without affecting others
- **Maintainability** - Smaller, focused codebases are easier to maintain
- **Technology Flexibility** - Each microfrontend can use different versions or frameworks
- **Progressive Enhancement** - Applications load on-demand for optimal performance

## Technology Stack

- **Single-SPA** - Microfrontend framework for orchestration
- **React** - UI framework for all current microfrontends
- **TypeScript** - Type safety across applications
- **Vite** - Build tool with fast HMR
- **Import Maps** - Dynamic module resolution
- **Lufa Design System** - Shared UI components

## Applications

### main-container

The root application that orchestrates all microfrontends. Responsibilities:

- **Application Registry** - Registers and manages microfrontend lifecycles
- **Routing** - Handles navigation between applications
- **Shared Dependencies** - Provides React, React-DOM via import maps
- **Authentication** - Manages user session and access control
- **Error Boundaries** - Catches and handles application errors
- **Global State** - Coordinates shared state when needed

[View main-container documentation →](./main-container/README.md)

### home

Landing page microfrontend serving as the application entry point. Features:

- Welcome content and navigation
- Dashboard or overview widgets
- Quick access to other microfrontends
- Responsive layout with design system components

[View home documentation →](./home/README.md)

## Development

### Run All Microfrontends

```bash
# Start all microfrontends in development mode
pnpm app:mf:dev

# Build all microfrontends
pnpm app:mf:build

# Preview production builds
pnpm app:mf:preview
```

### Run Individual Microfrontend

```bash
# Start specific microfrontend
pnpm --filter @grasdouble/lufa_microfrontend_home dev

# Build specific microfrontend
pnpm --filter @grasdouble/lufa_microfrontend_home build
```

## Adding New Microfrontends

To add a new microfrontend:

1. Create new directory under `packages/apps/microfrontend/`
2. Set up package with Single-SPA lifecycle exports
3. Configure Vite with appropriate plugins
4. Register in main-container routing configuration
5. Add development scripts to root `package.json`
6. Update this README with new application details

## Communication Between Microfrontends

Microfrontends communicate via:

- **Routing** - URL-based navigation and deep linking
- **Custom Events** - Browser events for loose coupling
- **Shared State** - Optional shared state via Single-SPA
- **Props** - Pass data through Single-SPA props

Avoid tight coupling between applications to maintain independence.

## Deployment Strategy

Each microfrontend:

- Has independent CI/CD pipeline
- Can be deployed independently
- Versions are managed separately
- Served from CDN with versioned URLs
- Registered in import map configuration

## Related

- [Design System](../../design-system/) - Shared UI components
- [CDN Autobuild Server](../../cdn/autobuild-server/) - Asset serving infrastructure
- [Vite Plugins](../../plugins/vite/) - Custom Vite plugins for microfrontends

## Contributing

See [CONTRIBUTING.md](../../../CONTRIBUTING.md) for development guidelines and best practices.
