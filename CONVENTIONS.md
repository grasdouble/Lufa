# Coding Conventions

> This project uses the [AGENTS.md standard](https://agents.md/) for AI agent instructions.
>
> **See [AGENTS.md](AGENTS.md) for complete development guide.**

This file exists for compatibility with [Aider](https://aider.chat/) and other tools that expect `CONVENTIONS.md`.

---

## For Aider Users

Configure Aider to automatically load conventions:

```yaml
# In .aider.conf.yml (home directory or repo root)
read: AGENTS.md
```

Or use the `--read` flag:

```bash
aider --read AGENTS.md
```

---

## Quick Reference

All comprehensive documentation is in [AGENTS.md](AGENTS.md), including:

- Project overview and architecture
- Setup commands and development workflow
- Design system three-layer architecture (CRITICAL)
- Code patterns and examples
- Testing instructions
- Build and deployment
- Troubleshooting guides

---

## Critical: Design System Three-Layer Architecture

**Components MUST use tokens only, never primitives or hard-coded values.**

```
Layer 3: Components → import from @grasdouble/lufa_design-system-tokens ✅
Layer 2: Tokens     → import from @grasdouble/lufa_design-system-primitives ✅
Layer 1: Primitives → Raw values (16px, blue[600])
```

**See [AGENTS.md - Design System Architecture](AGENTS.md#design-system-three-layer-architecture) for details.**

---

## Quick Commands

```bash
# Setup
pnpm install && pnpm all:build

# Development
pnpm ds:storybook:dev          # Design system (:6006)
pnpm app:mf:dev                # Microfrontends (:3000)

# Build (order matters!)
pnpm ds:all:build              # Design system (correct order)
pnpm all:build                 # Everything

# Testing
pnpm --filter @grasdouble/lufa_design-system test-ct

# Quality
pnpm all:lint && pnpm all:prettier

# Version management
pnpm changeset
```

---

**For complete documentation, always refer to [AGENTS.md](AGENTS.md).**
