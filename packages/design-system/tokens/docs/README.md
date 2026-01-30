# Lufa Design System Tokens - Documentation

This directory contains all documentation for the Lufa Design System Tokens package (v2.0).

## 📁 Directory Structure

```
docs/
├── README.md                    # This file - documentation index
├── planning/                    # Phase planning and completion summaries
├── architecture/                # Architecture and design decisions
└── archive/                     # Archived v1 documentation (historical reference)
```

## 📚 Documentation by Category

### Getting Started

- **[USAGE_GUIDELINES.md](./USAGE_GUIDELINES.md)** - How to use design tokens in components
- **[THEMABLE_ATTRIBUTE.md](./THEMABLE_ATTRIBUTE.md)** - Complete guide to the themable attribute
- **[NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)** - Token naming standards and conventions

### Planning & Progress

**Location:** `planning/`

Documents related to phase planning, execution, and completion:

- ✅ **phase-1-week-1-completion-summary.md** - Phase 1 completion report (103 primitive tokens)
- 🔜 **phase-2-planning.md** - Phase 2 planning (Core tokens) - Coming soon
- 🔜 **phase-2-completion-summary.md** - Phase 2 completion report - Coming soon

### Architecture & Design Decisions

**Location:** `architecture/`

Technical documentation about token architecture:

- 🔜 **token-levels-overview.md** - Detailed explanation of 4-level token architecture
- 🔜 **naming-conventions.md** - Token naming standards and patterns
- 🔜 **dtcg-format-guide.md** - DTCG format usage guidelines

### Archive

**Location:** `archive/`

Historical documentation from v1.x token system. See [archive/README.md](./archive/README.md) for details.

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

**Last Updated:** January 26, 2026  
**Current Phase:** Phase 4 (Component Tokens) - Complete ✅  
**Next Steps:** v2.1+ extended components
