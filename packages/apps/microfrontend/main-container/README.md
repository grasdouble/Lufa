# @grasdouble/lufa_microfrontend_main-container

Single-SPA root container application for the Lufa platform. Orchestrates loading, mounting, and routing of microfrontend applications.

## Overview

This package serves as the main container and orchestrator for the Lufa microfrontend architecture. It:

- Loads and registers microfrontend applications dynamically
- Manages routing between microfrontends
- Provides shared dependencies via import maps
- Handles authentication and global state
- Implements error boundaries and fallback UI

## Architecture

Built with:

- **Single-SPA** - Microfrontend framework
- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool

## Development

```bash
# Start dev server
pnpm app:mf:dev

# Build for production
pnpm app:mf:build

# Preview production build
pnpm app:mf:preview
```

## Microfrontend Integration

New microfrontends are registered in the container configuration. Each microfrontend:

- Has its own repository and deployment pipeline
- Loads independently at runtime
- Shares common dependencies through the container
- Communicates via custom events or shared state

## Related

- [Home Microfrontend](../home/) - Example microfrontend application
- [Microfrontends Overview](../README.md) - Architecture documentation

## Contributing

See [CONTRIBUTING.md](../../../../CONTRIBUTING.md) for development guidelines.
