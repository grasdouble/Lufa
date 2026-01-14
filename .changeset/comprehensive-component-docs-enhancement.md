---
"@grasdouble/lufa_design-system-docusaurus": minor
---

Major documentation site overhaul with comprehensive enhancements across all components and infrastructure.

## Component Documentation

**Enhanced all 27 components** with consistent, high-quality documentation:
- Anatomy sections with visual diagrams
- Comprehensive accessibility (WCAG 2.1 AA): keyboard nav, screen readers, ARIA, color contrast
- Common patterns with 3-6 real-world examples per component
- Related components cross-linking
- TypeScript support and type definitions

**New components documented:**
- Input (forms)
- Modal (new Overlay category)

## New Documentation Pages

- **Component Documentation Template** - Standardized structure, writing guidelines, checklist
- **Migration Guide** - Version upgrade instructions, breaking changes, semver policy
- **Interactive Playground** - Browser-based component testing with live code editing
- **Changelog** - Automated release notes with version history

## Infrastructure & Automation

**GitHub Actions:**
- `update-changelog-docs.yml` - Auto-syncs changelog from package releases, updates version dropdown

**Scripts:**
- `update-changelog.js` - Parses CHANGELOG.md, updates docs, filters versions (>= 0.6.0)

**Site enhancements:**
- Live code blocks (`@docusaurus/theme-live-codeblock`)
- Local search (`@easyops-cn/docusaurus-search-local`)
- Version dropdown in navbar
- DarkModeCompatible badge component
- Redesigned homepage with features grid
- SEO optimization (robots.txt)

## Impact

This establishes a production-ready documentation system with:
- Consistent documentation standards across all components
- Automated changelog management
- Interactive examples for better developer experience
- Comprehensive accessibility guidance
- Professional-grade component reference

Total changes: 53 files, 12,250+ additions across component docs, guides, automation scripts, and site infrastructure.
