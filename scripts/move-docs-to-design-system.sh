#!/bin/bash
set -e

# Script to move Design System documentation to proper location
# Usage: bash scripts/move-docs-to-design-system.sh

echo "🔄 Moving Design System documentation to packages/design-system/docs/"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 1. Create destination directory
echo "📁 Creating destination directory..."
mkdir -p packages/design-system/docs

# 2. Move and rename files
echo "📦 Moving documentation files..."

mv docs/architecture-design-system.md packages/design-system/docs/architecture.md
echo "  ✓ architecture-design-system.md → architecture.md"

mv docs/development-guide-design-system.md packages/design-system/docs/development-guide.md
echo "  ✓ development-guide-design-system.md → development-guide.md"

mv docs/token-architecture.md packages/design-system/docs/token-architecture.md
echo "  ✓ token-architecture.md → token-architecture.md"

mv docs/build-configuration.md packages/design-system/docs/build-configuration.md
echo "  ✓ build-configuration.md → build-configuration.md"

mv docs/source-tree-analysis.md packages/design-system/docs/source-tree.md
echo "  ✓ source-tree-analysis.md → source-tree.md"

mv docs/ui-component-inventory.md packages/design-system/docs/component-inventory.md
echo "  ✓ ui-component-inventory.md → component-inventory.md"

mv docs/test-design-design-system.md packages/design-system/docs/testing-strategy.md
echo "  ✓ test-design-design-system.md → testing-strategy.md"

mv docs/component-documentation-patterns.md packages/design-system/docs/storybook-patterns.md
echo "  ✓ component-documentation-patterns.md → storybook-patterns.md"

mv docs/project-overview.md packages/design-system/docs/overview.md
echo "  ✓ project-overview.md → overview.md"

mv docs/index.md packages/design-system/docs/index.md
echo "  ✓ index.md → index.md"

mv docs/project-scan-report.json packages/design-system/docs/project-scan-report.json
echo "  ✓ project-scan-report.json → project-scan-report.json"

echo ""
echo "🔗 Updating internal links..."

# 3. Update internal links in all markdown files
cd packages/design-system/docs/

# Detect OS for sed compatibility
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS
  SED_CMD="sed -i ''"
else
  # Linux
  SED_CMD="sed -i"
fi

# Update links
find . -name "*.md" -exec sed -i '' 's|](./architecture-design-system.md)|](./architecture.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./development-guide-design-system.md)|](./development-guide.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./ui-component-inventory.md)|](./component-inventory.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./test-design-design-system.md)|](./testing-strategy.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./component-documentation-patterns.md)|](./storybook-patterns.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./project-overview.md)|](./overview.md)|g' {} \;
find . -name "*.md" -exec sed -i '' 's|](./source-tree-analysis.md)|](./source-tree.md)|g' {} \;

cd - > /dev/null

echo "  ✓ Internal links updated"

# 4. Create README in root docs/ explaining the structure
echo ""
echo "📝 Creating explanatory README in root docs/..."

cat > docs/README.md << 'EOF'
# Lufa Monorepo Documentation

This directory contains **monorepo-level documentation** for the Lufa project.

## 📦 Package-Specific Documentation

Each package maintains its own documentation:

- **Design System**: [`packages/design-system/docs/`](../packages/design-system/docs/) ⭐ **Comprehensive docs available**
- **Microfrontends**: [`packages/apps/microfrontend/*/README.md`](../packages/apps/microfrontend/)
- **CDN**: [`packages/cdn/autobuild-server/README.md`](../packages/cdn/autobuild-server/)
- **Vite Plugins**: [`packages/plugins/vite/*/README.md`](../packages/plugins/vite/)
- **VSCode Extension**: [`packages/plugins/vscode/*/README.md`](../packages/plugins/vscode/)

## 🎯 Quick Start

- **New to Lufa?** → Start with the main [README.md](../README.md)
- **Working on Design System?** → See [Design System Docs](../packages/design-system/docs/) 📚
- **Setting up the monorepo?** → See [CONTRIBUTING.md](../CONTRIBUTING.md)

## 📚 Monorepo Documentation (To Be Generated)

When you want to document the entire monorepo (not just Design System):

```bash
# Run BMM Document Project workflow
# Select "All parts" instead of "Design System only"
# Documentation will be generated here in docs/
```

### Planned Documentation

- [ ] Monorepo Architecture Overview
- [ ] Inter-Package Dependencies & Integration
- [ ] Microfrontend Architecture (Single-SPA)
- [ ] CDN Autobuild Server Documentation
- [ ] Vite Plugins Documentation
- [ ] Release & Versioning Strategy
- [ ] CI/CD Pipeline Documentation

## 🔗 External Resources

- [Repository](https://github.com/grasdouble/Lufa)
- [Contributing Guidelines](../CONTRIBUTING.md)
- [AI Agents Guide](../AGENTS.md)

---

**Note:** The Design System documentation was generated on 2026-01-24 using BMM Document Project workflow (Deep Scan).
EOF

echo "  ✓ docs/README.md created"

# 5. Update Design System README
echo ""
echo "📝 Updating Design System README..."

cat > packages/design-system/README.md << 'EOF'
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
EOF

echo "  ✓ packages/design-system/README.md updated"

echo ""
echo -e "${GREEN}✅ Migration complete!${NC}"
echo ""
echo "📂 Documentation structure:"
echo "   ├── docs/README.md                           (Monorepo-level, placeholder)"
echo "   └── packages/design-system/"
echo "       ├── README.md                            (Updated with links)"
echo "       └── docs/                                (All DS documentation)"
echo "           ├── index.md"
echo "           ├── architecture.md"
echo "           ├── development-guide.md"
echo "           ├── token-architecture.md"
echo "           ├── build-configuration.md"
echo "           ├── source-tree.md"
echo "           ├── component-inventory.md"
echo "           ├── testing-strategy.md"
echo "           ├── storybook-patterns.md"
echo "           ├── overview.md"
echo "           └── project-scan-report.json"
echo ""
echo -e "${YELLOW}⚠️  Next steps:${NC}"
echo "   1. Review the changes: git status"
echo "   2. Test the documentation links"
echo "   3. Commit the changes:"
echo "      git add ."
echo "      git commit -m \"refactor(docs): move Design System docs to proper location\""
echo ""
