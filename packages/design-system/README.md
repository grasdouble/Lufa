# Lufa Design System

A modern, token-based design system built with React, TypeScript, and Style Dictionary.

## 📚 Documentation

**📖 Comprehensive documentation available in [`docs/`](./docs/index.md)**

### Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| **[Documentation Index](./docs/index.md)** | Master navigation | Everyone |
| **[Overview](./docs/overview.md)** | Project introduction | Everyone |
| **[Architecture](./docs/architecture.md)** | System design & principles | Architects, Developers |
| **[Development Guide](./docs/development-guide.md)** | Setup, workflows, troubleshooting | Developers |
| **[Token Architecture](./docs/token-architecture.md)** | 4-level token system | Designers, Developers |
| **[Component Inventory](./docs/component-inventory.md)** | Available components | Developers, Designers |
| **[Build Configuration](./docs/build-configuration.md)** | Build pipeline details | DevOps, Build Engineers |
| **[Testing Strategy](./docs/testing-strategy.md)** | Playwright CT approach | QA, Developers |
| **[Storybook Patterns](./docs/storybook-patterns.md)** | Documentation patterns | Docs Writers |

### Learning Paths

- **New Developer?** → [Overview](./docs/overview.md) → [Development Guide](./docs/development-guide.md) → [Component Inventory](./docs/component-inventory.md)
- **Designer?** → [Token Architecture](./docs/token-architecture.md) → [Component Inventory](./docs/component-inventory.md) → Storybook
- **Architect?** → [Architecture](./docs/architecture.md) → [Token Architecture](./docs/token-architecture.md) → [Build Configuration](./docs/build-configuration.md)

## 🚀 Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages (required first time)
pnpm ds:all:build

# Start development
pnpm ds:storybook:dev  # Storybook on http://localhost:6006
pnpm ds:all:dev        # All dev servers (Storybook + Docusaurus)
```

See **[Development Guide](./docs/development-guide.md)** for detailed instructions.

## 📦 Packages

| Package | Description | Status |
|---------|-------------|--------|
| **tokens** | Design tokens (438 tokens, 4 levels, DTCG-compliant) | ✅ Complete |
| **primitives** | Foundation primitives (spacing, colors, timing) | ✅ Complete |
| **main** | React components library | 🚧 71% (5/7 components) |
| **themes** | Theme configurations | ✅ Complete |
| **storybook** | Interactive component documentation | ✅ Complete |
| **docusaurus** | API documentation site | ✅ Complete |
| **playwright** | Component testing suite (500+ tests) | ✅ Complete |

## 🧪 Development Status

**Version**: 0.6.0

**Components Progress**: 71% (5/7 complete)
- ✅ **Box** - Layout primitive
- ✅ **Stack** - Layout primitive (vertical/horizontal)
- ✅ **Text** - Typography primitive
- ✅ **Icon** - SVG icon wrapper
- ✅ **Button** - Interactive component
- 🚧 **Badge** - 30% complete
- ❌ **Divider** - Not started

**Token System**: 100% (438 tokens across 4 levels)

**Testing**: 500+ test cases (Playwright CT, 5 browsers)

## 🎯 Key Features

- **Token-Based Design** - 4-level cascade (primitives → core → semantic → component)
- **Type-Safe** - Full TypeScript support with generated types
- **Accessible** - WCAG 2.1 AA compliant
- **Polymorphic Components** - Flexible `as` prop for all primitives
- **Performance Optimized** - 8ms CSS cascade (< 16ms target)
- **Well Tested** - 500+ Playwright component tests

## 📖 Documentation Stats

- **Total Documents**: 10 files
- **Total Words**: ~60,000+
- **Total Lines**: 8,338
- **Coverage**: 100%
- **Last Updated**: 2026-01-24

## 🤝 Contributing

See **[Development Guide > Git Workflow](./docs/development-guide.md#git-workflow)** for contribution guidelines.

## 📝 License

MIT

---

**Generated with**: BMM Document Project Workflow (Deep Scan)  
**Documentation**: See [`docs/index.md`](./docs/index.md) for comprehensive guides
