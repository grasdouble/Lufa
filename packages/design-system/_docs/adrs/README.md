# Architecture Decision Records (ADRs)

**Last Updated:** 2026-01-26  
**Total ADRs:** 11  
**Implemented:** 11 | **Accepted:** 0

## About This Index

This directory contains all Architecture Decision Records (ADRs) for the Lufa Design System. Each ADR documents a significant architectural decision, including the context, the decision made, and the consequences.

**📊 [View Architecture Overview](../ARCHITECTURE.md)** - Complete architecture documentation

**📝 Note:** All ADR filenames include UPPERCASE status for easier navigation: `ADR-{number}-{STATUS}-{short-name}.md`

## What are ADRs?

Architecture Decision Records (ADRs) document important architectural decisions made in the Lufa Design System. Each ADR describes the context, the decision made, and the consequences of that decision.

## Index of ADRs

### Theme & Mode System

| ADR                                                              | Status         | Title                            | Description                                                            | Date       | Impact   |
| ---------------------------------------------------------------- | -------------- | -------------------------------- | ---------------------------------------------------------------------- | ---------- | -------- |
| [ADR-001](./ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)   | ✅ Implemented | Separation of Modes and Themes   | Distinguishes `data-mode` (accessibility) from `data-theme` (branding) | 2026-01-26 | Critical |
| [ADR-002](./ADR-002-IMPLEMENTED-html-attributes-naming.md)       | ✅ Implemented | HTML Attribute Naming Convention | Defines HTML attribute naming for theme/mode application               | 2026-01-26 | High     |
| [ADR-003](./ADR-003-IMPLEMENTED-high-contrast-token-strategy.md) | ✅ Implemented | High-Contrast Token Strategy     | Ensures 100% WCAG AAA compliance for high-contrast mode                | 2026-01-26 | High     |

### Token Architecture

| ADR                                                                         | Status         | Title                            | Description                                                      | Date       | Impact   |
| --------------------------------------------------------------------------- | -------------- | -------------------------------- | ---------------------------------------------------------------- | ---------- | -------- |
| [ADR-004](./ADR-004-IMPLEMENTED-alpha-opacity-token-architecture.md)        | ✅ Implemented | Alpha/Opacity Token Architecture | Adds alpha/opacity tokens for transparent colors and overlays    | 2026-01-26 | Medium   |
| [ADR-007](./ADR-007-IMPLEMENTED-zero-value-token-handling.md)               | ✅ Implemented | Zero-Value Token Handling        | Fixes bug where `space-0` was 4px instead of 0px                 | 2026-01-26 | Medium   |
| [ADR-011](./ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md) | ✅ Implemented | Immutable Primitives Principle   | Establishes 4-level token architecture with immutable primitives | 2026-01-27 | Critical |

### Responsive Design

| ADR                                                                 | Status         | Title                           | Description                                                           | Date       | Impact |
| ------------------------------------------------------------------- | -------------- | ------------------------------- | --------------------------------------------------------------------- | ---------- | ------ |
| [ADR-005](./ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)       | ✅ Implemented | Breakpoint Token Strategy       | Defines 6 breakpoints (xs, sm, md, lg, xl, 2xl) for responsive design | 2026-01-26 | High   |
| [ADR-006](./ADR-006-IMPLEMENTED-responsive-spacing-architecture.md) | ✅ Implemented | Responsive Spacing Architecture | Implements hybrid spacing approach (fixed + responsive tokens)        | 2026-01-26 | High   |
| [ADR-008](./ADR-008-IMPLEMENTED-responsive-typography-strategy.md)  | ✅ Implemented | Responsive Typography Strategy  | Implements fluid typography using CSS clamp() for sizes 2xl-5xl       | 2026-01-26 | High   |

### Typography

| ADR                                                                   | Status         | Title                             | Description                                                                | Date       | Impact |
| --------------------------------------------------------------------- | -------------- | --------------------------------- | -------------------------------------------------------------------------- | ---------- | ------ |
| [ADR-009](./ADR-009-IMPLEMENTED-letter-spacing-token-architecture.md) | ✅ Implemented | Letter-Spacing Token Architecture | Adds 5 letter-spacing tokens (tighter to wider) for typography fine-tuning | 2026-01-26 | Low    |
| [ADR-010](./ADR-010-IMPLEMENTED-extended-type-scale-strategy.md)      | ✅ Implemented | Extended Type Scale Strategy      | Extends type scale with 6xl, 7xl, 8xl fluid tokens (+510 bytes)            | 2026-01-26 | Medium |

## Critical ADRs for New Contributors

If you're new to the design system, start with these critical ADRs:

1. **[ADR-011: Immutable Primitives Principle](./ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md)** ⭐  
   **Foundation:** Understand why primitives never change and how theming works at semantic/component level.

2. **[ADR-001: Separation of Modes and Themes](./ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)** ⭐  
   **Theming:** Understand the distinction between `data-mode` (accessibility) and `data-theme` (branding).

3. **[ADR-005: Breakpoint Token Strategy](./ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)**  
   **Responsive:** Learn the 6-breakpoint system for responsive design.

4. **[ADR-008: Responsive Typography Strategy](./ADR-008-IMPLEMENTED-responsive-typography-strategy.md)**  
   **Typography:** Learn how fluid typography works with CSS clamp().

## ADR Status Definitions

- **👍🏻 Accepted** - Decision approved but not yet fully implemented (0 ADRs)
- **✅ Implemented** - Decision implemented and in production (11 ADRs)
- **🚧 Proposed** - Under review
- **❌ Rejected** - Decision rejected
- **⚠️ Deprecated** - Decision superseded by a newer ADR

## How to Propose a New ADR

1. Copy an existing ADR as template
2. Number your ADR (next available number: ADR-012)
3. Use the naming format: `ADR-{number}-PROPOSED-{short-name}.md` (start with "PROPOSED" status in UPPERCASE)
4. Fill in the Context, Decision, and Consequences sections
5. Submit for review via pull request
6. Once approved, rename to `ADR-{number}-ACCEPTED-{short-name}.md`
7. After implementation, rename to `ADR-{number}-IMPLEMENTED-{short-name}.md`
8. Add to this index

## ADR Template Structure

Each ADR should follow this structure:

```markdown
# ADR-{number}: {Title}

**Status:** Proposed | Accepted | Implemented | Rejected | Deprecated  
**Date:** YYYY-MM-DD  
**Deciders:** Architecture Team  
**Context:** {Subject/Project}

## Context

Why this decision is needed...

## Decision

What we decided...

## Rationale

Why this decision was made...

## Consequences

### Positive

### Negative

## Alternatives Considered

What else we looked at...

## References

Related docs, standards, etc.
```

## Related Documentation

- [Architecture Overview](../ARCHITECTURE.md) - Complete architecture documentation
- [Token Architecture](../../tokens/_docs/token-architecture.md) - Token system overview
- [Theme Switching Guide](../../themes/_docs/theme-switching-guide.md) - How to switch themes

## Archive Note

**Historical ADRs:** Prior to 2026-01-26, ADRs were stored in `_bmad-output/archive/adrs/`. These have been migrated to this directory for easier access and maintenance. The archive remains as a reference for development history.
