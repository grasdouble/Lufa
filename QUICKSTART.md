# Quick Start Guide

> ⚡ **5-Minute Setup** - Get started developing on Lufa

## Prerequisites

- **Node.js**: 24.9.0 (see `.tool-versions`)
- **pnpm**: 10.26.x or later

Check versions:
```bash
node -v  # Should be 24.9.0
pnpm -v  # Should be 10.26.x+
```

## Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Build all packages (required first time)
pnpm all:build

# 3. Start development
pnpm ds:storybook:dev  # Design system on http://localhost:6006
# OR
pnpm app:mf:dev        # Microfrontends on http://localhost:3000
```

## ✅ Verify Setup

```bash
# These should all pass
pnpm all:lint
pnpm --filter @grasdouble/lufa_design-system test-ct
```

If you see errors, check [AGENTS.md - Troubleshooting](AGENTS.md#troubleshooting-for-ai-agents).

## 🤖 For AI Agents

See **[AGENTS.md](AGENTS.md)** for comprehensive development guide optimized for:
- GitHub Copilot
- Claude Code
- Cursor
- Aider
- Cline / Windsurf / Roo Code

## 👥 For Human Developers

See **[CONTRIBUTING.md](CONTRIBUTING.md)** for contribution guidelines.

## 📚 Next Steps

1. **Understand Architecture**: [Design System Three-Layer Architecture](AGENTS.md#design-system-three-layer-architecture)
2. **Create Component**: [Component Development Checklist](CLAUDE.md#component-development-checklist)
3. **Run Tests**: [Testing Instructions](AGENTS.md#testing-instructions)
4. **Make Changes**: [Version Management](AGENTS.md#using-changesets)

## 🚨 Common Issues

| Problem | Solution |
|---------|----------|
| Build fails | `pnpm ds:all:build` (order matters!) |
| Cannot find module @grasdouble/lufa_design-system-tokens | `pnpm ds:tokens:build` |
| TypeScript errors | `pnpm ds:all:build` (wrong build order) |
| Port already in use | Kill process on port: `lsof -ti:6006 \| xargs kill -9` |

## 🎯 Most Common Commands

```bash
# Development
pnpm ds:storybook:dev     # Start Storybook
pnpm ds:main:dev          # Watch mode for components

# Quality
pnpm all:lint             # Lint everything
pnpm all:prettier         # Format code

# Build (CRITICAL: order matters!)
pnpm ds:all:build         # Design system (correct order)

# Testing
pnpm --filter @grasdouble/lufa_design-system test-ct

# Version management
pnpm changeset            # After making changes
```

---

**Ready to code?** Start with [AGENTS.md](AGENTS.md) for complete documentation.

**Have questions?** See [AGENTS.md - Troubleshooting](AGENTS.md#troubleshooting-for-ai-agents).
