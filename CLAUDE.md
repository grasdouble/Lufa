# CLAUDE.md

> 📘 **Quick Reference for Claude Code**: For complete documentation, see [AGENTS.md](AGENTS.md).

This file provides Claude Code with critical quick-reference information. All comprehensive documentation is maintained in [AGENTS.md](AGENTS.md) following the open standard.

---

## ⚠️ Critical: Three-Layer Design System

**MUST READ before touching design system code** - This is the most important concept in the codebase.

### Architecture Diagram

```
┌─────────────────────────────────────┐
│  Layer 3: Components                │
│  (@grasdouble/lufa_design-system)   │
│  ✅ Use tokens ONLY                 │
│  ❌ NO primitives, NO hard-coding   │
└──────────────┬──────────────────────┘
               │ imports
┌──────────────▼──────────────────────┐
│  Layer 2: Tokens                    │
│  (@grasdouble/...-tokens)           │
│  Semantic: primary, compact, etc.   │
└──────────────┬──────────────────────┘
               │ references
┌──────────────▼──────────────────────┐
│  Layer 1: Primitives                │
│  (@grasdouble/...-primitives)       │
│  Raw: spacing[16], blue[600]        │
└─────────────────────────────────────┘
```

### Critical Rules

1. **✅ Components** MUST import from `@grasdouble/lufa_design-system-tokens`
2. **❌ Components** MUST NOT import from `@grasdouble/lufa_design-system-primitives`
3. **❌ Components** MUST NOT hard-code design values (16px, #FF0000, etc.)

### Example: Right vs Wrong

```typescript
// ✅ CORRECT
import { color, spacing } from '@grasdouble/lufa_design-system-tokens';
const styles = { padding: spacing.default, color: color.text.primary };

// ❌ WRONG - Don't import primitives in components
import { spacing } from '@grasdouble/lufa_design-system-primitives';
const styles = { padding: spacing[16] };

// ❌ WRONG - Don't hard-code values
const styles = { padding: '16px', color: '#FF0000' };
```

**Why this matters**: Tokens generate TypeScript types that components depend on. Wrong imports or hard-coded values break the design system's flexibility and theming capabilities.

---

## 🚨 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Build fails | Run `pnpm ds:all:build` (order matters!) |
| "Cannot find module @grasdouble/lufa_design-system-tokens" | Run `pnpm ds:tokens:build` first |
| TypeScript errors in components | Run `pnpm ds:all:build` (wrong build order) |
| Component not showing in Storybook | Check export in `packages/design-system/main/src/index.ts` |
| Test failures | Run `pnpm --filter @grasdouble/lufa_design-system test-ct` |

---

## 🎯 Most Common Tasks

### Development

```bash
# Start design system development
pnpm ds:storybook:dev          # Storybook on http://localhost:6006

# Start microfrontends
pnpm app:mf:dev                # Main on :3000, home on :3001
```

### Building (CRITICAL: Order Matters!)

```bash
# Design system - MUST build in this order:
pnpm ds:tokens:build           # 1. First - generates types
pnpm ds:primitives:build       # 2. Then primitives
pnpm ds:main:build             # 3. Then components
pnpm ds:storybook:build        # 4. Finally Storybook

# Or use convenience script (handles order automatically):
pnpm ds:all:build

# Build everything:
pnpm all:build
```

**Why order matters**: Tokens package generates CSS and TypeScript types that components import. Building components before tokens causes TypeScript errors.

### Testing

```bash
# Run Playwright component tests
pnpm --filter @grasdouble/lufa_design-system test-ct

# Lint and format
pnpm all:lint
pnpm all:prettier
```

### Version Management

```bash
# Create changeset after making changes
pnpm changeset

# Follow prompts:
# 1. Select affected packages
# 2. Choose version bump (major/minor/patch)
# 3. Write description
```

---

## 📋 Component Development Checklist

When creating or modifying design system components:

- [ ] Required tokens exist in `packages/design-system/tokens/`
- [ ] Tokens built: `pnpm ds:tokens:build`
- [ ] Component uses tokens only (NO primitives, NO hard-coding)
- [ ] TypeScript interface with JSDoc comments
- [ ] WCAG 2.1 AA accessibility (ARIA, keyboard, focus)
- [ ] Uses `ComponentPropsWithoutRef<'element'>` for HTML props
- [ ] Set `displayName` on component
- [ ] Storybook story created
- [ ] Playwright component test written
- [ ] Exported from `packages/design-system/main/src/index.ts`
- [ ] Changeset created: `pnpm changeset`

---

## 📚 Complete Documentation

This file is a quick reference. For comprehensive guides, see:

- **[AGENTS.md](AGENTS.md)** - Complete development guide (optimized for all AI agents)
  - Project overview and architecture
  - Detailed setup and development workflow
  - Testing strategies and patterns
  - Code examples and common patterns
  - Troubleshooting guides
  - AI agent compatibility matrix

- **[.github/instructions/](/.github/instructions/)** - Technology-specific instructions
  - `lufa-design-system.instructions.md` - Design system patterns
  - `reactjs.instructions.md` - React best practices
  - `a11y.instructions.md` - Accessibility guidelines
  - `typescript-5-es2022.instructions.md` - TypeScript standards
  - `playwright-typescript.instructions.md` - Testing patterns
  - `tailwindcss.instructions.md` - Tailwind CSS usage

- **[.github/prompts/](/.github/prompts/)** - Reusable AI prompts
  - See `.github/prompts/README.md` for index

- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution workflow
- **[docs/howto/](docs/howto/)** - How-to guides

---

## 🛠️ Package Management Quick Reference

```bash
# Find packages
pnpm list --recursive --depth 0

# Work with specific package
pnpm --filter @grasdouble/lufa_design-system [command]

# Install dependency to specific package
pnpm --filter @grasdouble/lufa_design-system add clsx

# Work with pattern (all design system packages)
pnpm --filter @grasdouble/lufa_design-system-* build
```

---

## 🎓 Learning Path for New Contributors

1. **Start here** - Read this file (5 min)
2. **Deep dive** - Read [AGENTS.md](AGENTS.md) (20 min)
3. **Understand architecture** - Review three-layer design system
4. **Explore code** - Look at existing components in `packages/design-system/main/src/components/`
5. **Run locally** - `pnpm install && pnpm all:build && pnpm ds:storybook:dev`
6. **Create something** - Follow component development checklist above

---

## 💡 Key Takeaways

1. **Three-layer architecture is sacred** - Components use tokens only
2. **Build order matters** - tokens → primitives → main → storybook
3. **Testing is required** - Every component needs Playwright tests
4. **Changesets for releases** - Run `pnpm changeset` after changes
5. **Check AGENTS.md** - When in doubt, full documentation is there

---

**Remember**: This is a quick reference. For detailed instructions, patterns, and troubleshooting, always refer to [AGENTS.md](AGENTS.md).
