# Design System Project Context

> **Note**: For comprehensive documentation, see [\_docs/index.md](./_docs/index.md)

## 🤖 AI AGENTS: READ THIS FIRST

**CRITICAL INSTRUCTION**: Before performing ANY task related to tokens, components, stories, tests, or documentation, you **MUST** read and follow the AI Instruction Router:
👉 **[packages/design-system/\_docs/ai-instructions/index.md](./_docs/ai-instructions/index.md)**

This router will direct you to the specific rules for your task (Tokens, Components, Stories, Tests, Docs). **The technical details previously found in this file have been moved to those specific instruction files.**

## Strategic Context (The "Why")

### Development Phase

- **Status:** Major refactoring (Pre-v1.0.0).
- **Users:** Zero production users.
- **Focus:** API and Architecture quality.

### Critical Policy: No Backward Compatibility

- **Rule:** Do NOT maintain backward compatibility. Clean breaks are encouraged.
- **No:** Deprecation warnings, migration guides, changelogs.
- **Yes:** Remove old code, implement new API, update tests/stories.
- **Reference**: See `_docs/development-policies.md` for full details.

## Quick Commands

```bash
# Development
pnpm ds:storybook:dev          # Storybook on :6006
pnpm ds:main:dev               # Watch mode for components

# Build (order matters!)
pnpm ds:tokens:build           # 1. Tokens first
pnpm ds:main:build             # 2. Then components

# Testing
pnpm ds:test                   # Run all component tests

# Quality
pnpm all:lint && pnpm all:prettier
```

## Documentation Structure

| File                             | Purpose                                  |
| :------------------------------- | :--------------------------------------- |
| `_docs/index.md`                 | Master documentation index               |
| `_docs/ai-instructions/index.md` | **AI Technical Instructions** (Router)   |
| `_docs/development-policies.md`  | Policies for this phase (No Back-Compat) |
| `_docs/architecture.md`          | System architecture                      |

---

### Questions?

- **AI Agents:** Go to [packages/design-system/\_docs/ai-instructions/index.md](./_docs/ai-instructions/index.md)
- **Humans:** Start with [\_docs/index.md](./_docs/index.md)
