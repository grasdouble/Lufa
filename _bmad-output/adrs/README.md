# ADRs - Architecture Decision Records

This directory contains all Architecture Decision Records (ADRs) for the Lufa Design System project.

## Purpose

ADRs document important architectural decisions made during the project lifecycle. They provide:

- **Context:** Why the decision was needed
- **Decision:** What was decided
- **Consequences:** Impacts of the decision
- **Alternatives:** What options were considered

## Numbering

ADRs use **global sequential numbering** across all subjects:

```
ADR-001, ADR-002, ADR-003, ...
```

This ensures:

- Chronological order of decisions
- Unique identifiers
- Cross-subject references possible
- Historical tracking

## Format

Each ADR follows this structure:

```markdown
# ADR-{number}: {Title}

**Status:** Proposed | Accepted | Implemented | Rejected | Superseded | Deprecated  
**Date:** YYYY-MM-DD  
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

## Index

| Number                                                                  | Title                                     | Subject                 | Status      | Date       |
| ----------------------------------------------------------------------- | ----------------------------------------- | ----------------------- | ----------- | ---------- |
| [001](./ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)              | Modes vs Themes Separation                | Theme Integration       | Implemented | 2026-01-26 |
| [002](./ADR-002-IMPLEMENTED-html-attributes-naming.md)                  | HTML Attributes Naming                    | Theme Integration       | Implemented | 2026-01-26 |
| [003](./ADR-003-IMPLEMENTED-high-contrast-token-strategy.md)            | High-Contrast Token Strategy              | Color Token Refinement  | Implemented | 2026-01-26 |
| [004](./ADR-004-IMPLEMENTED-alpha-opacity-token-architecture.md)        | Alpha/Opacity Token Architecture          | Color Token Refinement  | Implemented | 2026-01-26 |
| [005](./ADR-005-IMPLEMENTED-breakpoint-token-strategy.md)               | Breakpoint Token Strategy                 | Spacing & Layout Tokens | Implemented | 2026-01-26 |
| [006](./ADR-006-IMPLEMENTED-responsive-spacing-architecture.md)         | Responsive Spacing Architecture           | Spacing & Layout Tokens | Implemented | 2026-01-26 |
| [007](./ADR-007-IMPLEMENTED-zero-value-token-handling.md)               | Zero-Value Token Handling                 | Spacing & Layout Tokens | Implemented | 2026-01-26 |
| [008](./ADR-008-IMPLEMENTED-responsive-typography-strategy.md)          | Responsive Typography Strategy            | Typography Tokens       | Implemented | 2026-01-26 |
| [009](./ADR-009-IMPLEMENTED-letter-spacing-token-architecture.md)       | Letter-Spacing Token Architecture         | Typography Tokens       | Implemented | 2026-01-26 |
| [010](./ADR-010-IMPLEMENTED-extended-type-scale-strategy.md)            | Extended Type Scale Strategy              | Typography Tokens       | Implemented | 2026-01-26 |
| [011](./ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md) | Token Architecture - Immutable Primitives | Token Architecture      | Implemented | 2026-01-27 |

## Guidelines

### When to Create an ADR

Create an ADR when:

- Making architectural decisions with long-term impact
- Choosing between multiple valid approaches
- Establishing patterns for the codebase
- Making breaking changes
- Defining technical standards

### When NOT to Create an ADR

Don't create ADRs for:

- Implementation details (use code comments)
- Temporary workarounds
- Obvious choices with no alternatives
- User-facing features (use PRD instead)

### ADR Lifecycle

1. **Draft:** ADR created, decision pending
2. **Accepted:** Decision made and documented
3. **Implemented:** Decision has been implemented in code
4. **Superseded:** Replaced by newer ADR (link to replacement)
5. **Deprecated:** No longer relevant

### Updating ADRs

ADRs are **immutable** once accepted. If a decision changes:

1. Keep original ADR unchanged
2. Update status to "Superseded by ADR-XXX"
3. Create new ADR documenting the new decision
4. Reference the original ADR

## Cross-References

### By Subject

**Theme Integration:**

- [ADR-001](./ADR-001-IMPLEMENTED-modes-vs-themes-separation.md) - Modes vs Themes
- [ADR-002](./ADR-002-IMPLEMENTED-html-attributes-naming.md) - HTML Attributes

**Color Token Refinement:**

- [ADR-003](./ADR-003-IMPLEMENTED-high-contrast-token-strategy.md) - High-Contrast Strategy
- [ADR-004](./ADR-004-IMPLEMENTED-alpha-opacity-token-architecture.md) - Alpha/Opacity Architecture

**Spacing & Layout Tokens:**

- [ADR-005](./ADR-005-IMPLEMENTED-breakpoint-token-strategy.md) - Breakpoint Token Strategy
- [ADR-006](./ADR-006-IMPLEMENTED-responsive-spacing-architecture.md) - Responsive Spacing Architecture
- [ADR-007](./ADR-007-IMPLEMENTED-zero-value-token-handling.md) - Zero-Value Token Handling

**Typography Tokens:**

- [ADR-008](./ADR-008-IMPLEMENTED-responsive-typography-strategy.md) - Responsive Typography Strategy (Implemented)
- [ADR-009](./ADR-009-IMPLEMENTED-letter-spacing-token-architecture.md) - Letter-Spacing Token Architecture (Implemented)
- [ADR-010](./ADR-010-IMPLEMENTED-extended-type-scale-strategy.md) - Extended Type Scale Strategy (Implemented)

**Token Architecture:**

- [ADR-011](./ADR-011-IMPLEMENTED-token-architecture-primitives-immutable.md) - Token Architecture Clarification - Immutable Primitives (Implemented)

### By Topic

**Architecture:**

- ADR-001 - Package separation
- ADR-003 - High-contrast token strategy
- ADR-004 - Alpha/opacity token architecture
- ADR-005 - Breakpoint token strategy
- ADR-006 - Responsive spacing architecture
- ADR-007 - Zero-value token handling
- ADR-011 - Token architecture clarification (primitives as immutable constants)

**Naming:**

- ADR-002 - Attribute conventions

**Accessibility:**

- ADR-003 - High-contrast token strategy

**Responsive Design:**

- ADR-005 - Breakpoint token strategy
- ADR-006 - Responsive spacing architecture
- ADR-008 - Responsive typography strategy

**Typography:**

- ADR-008 - Responsive typography with CSS clamp()
- ADR-009 - Letter-spacing token architecture
- ADR-010 - Extended type scale (6xl-8xl)

## External References

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [When to Use ADRs](https://github.com/joelparkerhenderson/architecture-decision-record)

---

**Maintained by:** BMad Master Agent  
**Last Updated:** 2026-01-29 (11 ADRs - All Implemented)
