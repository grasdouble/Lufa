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

**Status:** Accepted | Rejected | Superseded | Deprecated  
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

| Number                                         | Title                      | Subject           | Status   | Date       |
| ---------------------------------------------- | -------------------------- | ----------------- | -------- | ---------- |
| [001](./ADR-001-modes-vs-themes-separation.md) | Modes vs Themes Separation | Theme Integration | Accepted | 2026-01-26 |
| [002](./ADR-002-html-attributes-naming.md)     | HTML Attributes Naming     | Theme Integration | Accepted | 2026-01-26 |

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

- [ADR-001](./ADR-001-modes-vs-themes-separation.md) - Modes vs Themes
- [ADR-002](./ADR-002-html-attributes-naming.md) - HTML Attributes

**Badge Component:**

- (Future ADRs)

### By Topic

**Architecture:**

- ADR-001 - Package separation

**Naming:**

- ADR-002 - Attribute conventions

## External References

- [ADR GitHub Organization](https://adr.github.io/)
- [Documenting Architecture Decisions](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions)
- [When to Use ADRs](https://github.com/joelparkerhenderson/architecture-decision-record)

---

**Maintained by:** BMad Master Agent  
**Last Updated:** 2026-01-26
