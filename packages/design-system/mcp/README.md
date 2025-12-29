# @grasdouble/lufa_design-system-mcp

MCP (Model Context Protocol) integration package for the Lufa Design System.

## Overview

This package provides MCP server and tool integration for the Lufa Design System, enabling advanced model context workflows, automation, and AI-driven design system operations.

## Features

- MCP server setup for design system
- Tooling for design system automation
- TypeScript-first, ESM, and Vite compatible

## Usage

_Coming soon: See documentation for setup and usage examples._

## MCP Server Usage

See `src/server/lufaDesignSystemMcpServer.ts` for the MCP server implementation. Run it with:

```bash
pnpm --filter @grasdouble/lufa_design-system-mcp exec tsx src/server/lufaDesignSystemMcpServer.ts
```

## Running Tests

```bash
pnpm --filter @grasdouble/lufa_design-system-mcp test
```

## Further Configuration

- See `vite.config.ts` and `vitest.config.ts` for build and test setup.
- Extend `src/server/` for more MCP tools and endpoints.

## Development

- Build: `pnpm build`
- Dev: `pnpm dev`
- Lint: `pnpm lint`

## License

MIT
