# Lufa Design System Tokens - Documentation

This directory contains all documentation for the Lufa Design System Tokens package (v2.0).

## 📁 Directory Structure

```
docs/
├── README.md                           # This file - documentation index
├── TOKEN_ARCHITECTURE_VISUAL.md        # Complete architecture guide with diagrams
├── COLOR_SYSTEM.md                     # Color scales and usage guide
├── SPACING_SCALE.md                    # Spacing system documentation
├── TYPOGRAPHY_SYSTEM.md                # Typography hierarchy guide
├── QUICK_REFERENCE.md                  # Developer cheat sheet
├── USAGE_GUIDELINES.md                 # How to use tokens in components
├── THEMABLE_ATTRIBUTE.md               # Themeable attribute guide
├── NAMING_CONVENTIONS.md               # Token naming conventions
├── TOKEN_ARCHITECTURE.md               # Original architecture doc
├── planning/                           # Phase planning documents
└── archive/                            # Archived v1 documentation
```

## 📚 Documentation by Category

### 🚀 Quick Start (Start Here!)

- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** ⭐ - Developer cheat sheet for finding and using tokens
- **[USAGE_GUIDELINES.md](./USAGE_GUIDELINES.md)** - How to use design tokens in components

### 🏗️ Architecture & System Design

- **[TOKEN_ARCHITECTURE_VISUAL.md](./TOKEN_ARCHITECTURE_VISUAL.md)** ⭐ - Complete 4-level architecture with visual diagrams
- **[TOKEN_ARCHITECTURE.md](./TOKEN_ARCHITECTURE.md)** - Original architecture documentation
- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** - Token naming standards and conventions

### 🎨 Token System Guides

- **[COLOR_SYSTEM.md](./COLOR_SYSTEM.md)** ⭐ - Complete color documentation with scales, modes, and accessibility
- **[SPACING_SCALE.md](./SPACING_SCALE.md)** ⭐ - Spacing system with visual examples and patterns
- **[TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md)** ⭐ - Typography hierarchy, scales, and usage

### 🔧 Advanced Topics

- **[THEMABLE_ATTRIBUTE.md](./THEMABLE_ATTRIBUTE.md)** - Complete guide to the themable attribute
- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** - Token naming standards and patterns

## 📖 Documentation Features

### Visual Documentation

All new documentation includes:

- ✅ **Visual diagrams** using Mermaid
- ✅ **ASCII art scales** for spacing and typography
- ✅ **Token reference chains** showing complete flows
- ✅ **Code examples** in JSON and CSS
- ✅ **Decision trees** for choosing tokens
- ✅ **Quick reference tables** for common patterns

### Coverage

- **600+ tokens** documented across 4 architectural levels
- **8 architectural patterns** explained with examples
- **Mode-aware token system** (light/dark/high-contrast)
- **Component patterns** for Button, Card, Input, Alert, Badge
- **Accessibility guidelines** for colors, spacing, and typography

## 🎯 Common Use Cases

### I need to...

| Task                               | Documentation                                                  |
| ---------------------------------- | -------------------------------------------------------------- |
| Understand the token architecture  | [TOKEN_ARCHITECTURE_VISUAL.md](./TOKEN_ARCHITECTURE_VISUAL.md) |
| Find a specific token quickly      | [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)                     |
| Learn about color scales and modes | [COLOR_SYSTEM.md](./COLOR_SYSTEM.md)                           |
| Understand spacing values          | [SPACING_SCALE.md](./SPACING_SCALE.md)                         |
| Work with typography               | [TYPOGRAPHY_SYSTEM.md](./TYPOGRAPHY_SYSTEM.md)                 |
| Use tokens in my component         | [USAGE_GUIDELINES.md](./USAGE_GUIDELINES.md)                   |
| Understand naming conventions      | [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)               |

## 🗺️ Token Architecture Phases

| Phase       | Level      | Status      | Tokens | Description                                               |
| ----------- | ---------- | ----------- | ------ | --------------------------------------------------------- |
| **Phase 1** | Primitives | ✅ Complete | 111    | Raw values (colors, spacing, typography, shadows, radius) |
| **Phase 2** | Core       | ✅ Complete | 58     | Global design decisions (brand, neutral, semantic)        |
| **Phase 3** | Semantic   | ✅ Complete | 103    | Contextual tokens (states, feedback, layouts)             |
| **Phase 4** | Component  | ✅ Complete | 181    | Component-specific tokens                                 |

## 🔗 Quick Links

- **Main README:** [../../README.md](../../README.md)
- **Source Code:** [../../src/](../../src/)
- **Build Output:** [../../dist/](../../dist/)
- **Package.json:** [../../package.json](../../package.json)

## 📝 Documentation Standards

When creating new documentation:

1. **Use clear headings** - Structure with H2/H3 for easy navigation
2. **Include code examples** - Show practical usage
3. **Add emojis sparingly** - Only for categories/sections
4. **Keep English only** - All docs must be in English
5. **Update this index** - Add new docs to the appropriate section above

## 🤝 Contributing

When completing a new phase:

1. Create completion summary in `planning/phase-X-completion-summary.md`
2. Update the phases table above
3. Add any architecture docs to `architecture/`
4. Update main README if needed

---

**Last Updated:** February 15, 2026  
**Current Status:** v2.0 Complete ✅ (600+ tokens documented)  
**Architecture Score:** 9.1/10  
**Documentation:** 5 comprehensive guides created
