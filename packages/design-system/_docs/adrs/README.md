# Architecture Decision Records (ADRs)

**Last Updated:** 2026-01-29  
**Total ADRs:** 11  
**Implemented:** 11 | **Accepted:** 0

## About This Index

This index references Architecture Decision Records stored in `_bmad-output/adrs/`. The ADRs are maintained in their original location to preserve the BMAD workflow output structure.

All links in this document point to the source files using relative paths (`../../../../_bmad-output/adrs/`).

**📊 [View Detailed Status Report](./ADR-STATUS-REPORT.md)** - Implementation status, metrics, and analysis

**📝 Note:** As of 2026-01-29, all ADR filenames include UPPERCASE status for easier navigation: `ADR-{number}-{STATUS}-{short-name}.md`

## What are ADRs?

Architecture Decision Records (ADRs) document important architectural decisions made in the Lufa Design System. Each ADR describes the context, the decision made, and the consequences of that decision.

## Index of ADRs

### Theme & Mode System

| ADR                                                                                          | Status         | Title                            | Description                                                                  | Subject                                                                                               | Date       | Impact   |
| -------------------------------------------------------------------------------------------- | -------------- | -------------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ---------- | -------- |
| [ADR-001](../../../../_bmad-output/adrs/ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)   | ✅ Implemented | Separation of Modes and Themes   | Distinguishes `data-mode` (accessibility) from `data-color-theme` (branding) | [theme-integration](../../../../_bmad-output/subjects/theme-integration%20%5BCOMPLETED%5D/)           | 2026-01-26 | Critical |
| [ADR-002](../../../../_bmad-output/adrs/ADR-002-IMPLEMENTED-html-attributes-naming.md)       | ✅ Implemented | HTML Attribute Naming Convention | Defines HTML attribute naming for theme/mode application                     | [theme-integration](../../../../_bmad-output/subjects/theme-integration%20%5BCOMPLETED%5D/)           | 2026-01-26 | High     |
| [ADR-003](../../../../_bmad-output/adrs/ADR-003-IMPLEMENTED-high-contrast-token-strategy.md) | ✅ Implemented | High-Contrast Token Strategy     | Ensures 100% WCAG AAA compliance for high-contrast mode                      | [color-token-refinement](../../../../_bmad-output/subjects/color-token-refinement%20%5BCOMPLETED%5D/) | 2026-01-26 | High     |

### Token Architecture

| ADR                                                                                                     | Status         | Title                            | Description                                                      | Subject                                                                                                                   | Date       | Impact   |
| ------------------------------------------------------------------------------------------------------- | -------------- | -------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| [ADR-004](../../../../_bmad-output/adrs/ADR-004-IMPLEMENTED-alpha-opacity-token-architecture.md)        | ✅ Implemented | Alpha/Opacity Token Architecture | Adds alpha/opacity tokens for transparent colors and overlays    | [alpha-opacity-token-architecture](../../../../_bmad-output/subjects/alpha-opacity-token-architecture%20%5BCOMPLETED%5D/) | 2026-01-26 | Medium   |
| [ADR-007](../../../../_bmad-output/adrs/ADR-007-IMPLEMENTED-zero-value-token-handling.md)               | ✅ Implemented | Zero-Value Token Handling        | Fixes bug where `space-0` was 4px instead of 0px                 | [spacing-layout-tokens](../../../../_bmad-output/subjects/spacing-layout-tokens%20%5BCOMPLETED%5D/)                       | 2026-01-26 | Medium   |
| [ADR-011](../../../../_bmad-output/adrs/ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md) | ✅ Implemented | Immutable Primitives Principle   | Establishes 4-level token architecture with immutable primitives | -                                                                                                                         | 2026-01-27 | Critical |

### Responsive Design

| ADR                                                                                             | Status         | Title                           | Description                                                           | Subject                                                                                             | Date       | Impact |
| ----------------------------------------------------------------------------------------------- | -------------- | ------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ---------- | ------ |
| [ADR-005](../../../../_bmad-output/adrs/ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)       | ✅ Implemented | Breakpoint Token Strategy       | Defines 6 breakpoints (xs, sm, md, lg, xl, 2xl) for responsive design | [spacing-layout-tokens](../../../../_bmad-output/subjects/spacing-layout-tokens%20%5BCOMPLETED%5D/) | 2026-01-26 | High   |
| [ADR-006](../../../../_bmad-output/adrs/ADR-006-IMPLEMENTED-responsive-spacing-architecture.md) | ✅ Implemented | Responsive Spacing Architecture | Implements hybrid spacing approach (fixed + responsive tokens)        | [spacing-layout-tokens](../../../../_bmad-output/subjects/spacing-layout-tokens%20%5BCOMPLETED%5D/) | 2026-01-26 | High   |
| [ADR-008](../../../../_bmad-output/adrs/ADR-008-IMPLEMENTED-responsive-typography-strategy.md)  | ✅ Implemented | Responsive Typography Strategy  | Implements fluid typography using CSS clamp() for sizes 2xl-5xl       | [typography-tokens](../../../../_bmad-output/subjects/typography-tokens%20%5BCOMPLETED%5D/)         | 2026-01-26 | High   |

### Typography

| ADR                                                                                               | Status         | Title                             | Description                                                                | Subject                                                                                     | Date       | Impact |
| ------------------------------------------------------------------------------------------------- | -------------- | --------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ---------- | ------ |
| [ADR-009](../../../../_bmad-output/adrs/ADR-009-IMPLEMENTED-letter-spacing-token-architecture.md) | ✅ Implemented | Letter-Spacing Token Architecture | Adds 5 letter-spacing tokens (tighter to wider) for typography fine-tuning | [typography-tokens](../../../../_bmad-output/subjects/typography-tokens%20%5BCOMPLETED%5D/) | 2026-01-26 | Low    |
| [ADR-010](../../../../_bmad-output/adrs/ADR-010-IMPLEMENTED-extended-type-scale-strategy.md)      | ✅ Implemented | Extended Type Scale Strategy      | Extends type scale with 6xl, 7xl, 8xl fluid tokens (+510 bytes)            | [typography-tokens](../../../../_bmad-output/subjects/typography-tokens%20%5BCOMPLETED%5D/) | 2026-01-26 | Medium |

## Critical ADRs for New Contributors

If you're new to the design system, start with these critical ADRs:

1. **[ADR-011: Immutable Primitives Principle](../../../../_bmad-output/adrs/ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md)** ⭐  
   **Foundation:** Understand why primitives never change and how theming works at semantic/component level.

2. **[ADR-001: Separation of Modes and Themes](../../../../_bmad-output/adrs/ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)** ⭐  
   **Theming:** Understand the distinction between `data-mode` (accessibility) and `data-color-theme` (branding).

3. **[ADR-005: Breakpoint Token Strategy](../../../../_bmad-output/adrs/ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)**  
   **Responsive:** Learn the 6-breakpoint system for responsive design.

4. **[ADR-008: Responsive Typography Strategy](../../../../_bmad-output/adrs/ADR-008-IMPLEMENTED-responsive-typography-strategy.md)**  
   **Typography:** Learn how fluid typography works with CSS clamp().

## ADR Status Definitions

- **👍🏻 Accepted** - Decision approved but not yet fully implemented (0 ADRs)
- **✅ Implemented** - Decision implemented and in production (10 ADRs)
- **🚧 Proposed** - Under review
- **❌ Rejected** - Decision rejected
- **⚠️ Deprecated** - Decision superseded by a newer ADR

## How to Propose a New ADR

1. Copy the ADR template from `_bmad-output/adrs/ADR-TEMPLATE.md` (if exists, otherwise create)
2. Number your ADR (next available number: ADR-012)
3. Use the naming format: `ADR-{number}-PROPOSED-{short-name}.md` (start with "PROPOSED" status in UPPERCASE)
4. Fill in the Context, Decision, and Consequences sections
5. Submit for review via pull request
6. Once approved, rename to `ADR-{number}-ACCEPTED-{short-name}.md`
7. After implementation, rename to `ADR-{number}-IMPLEMENTED-{short-name}.md`
8. Add to this index and update all documentation references

## Related Documentation

- [Token Architecture](../token-architecture.md) - Token system overview
- [Theme Switching Guide](../theme-switching-guide.md) - How to switch themes
- [Architecture](../architecture.md) - Overall system architecture
