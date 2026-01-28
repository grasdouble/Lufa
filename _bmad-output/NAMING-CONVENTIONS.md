# BMad Output Naming Conventions

**Purpose:** Ensure consistent, conflict-free file naming across multiple subjects and phases.

**Version:** 1.0  
**Date:** 2026-01-26  
**Status:** Active

---

## Principles

1. **Prefix by Subject:** All files include subject/feature name
2. **Sequential ADRs:** Architecture decisions use global numbering
3. **Date for Analysis:** Analysis files include date for traceability
4. **Type Clarity:** File type is always clear from name

---

## File Naming Standards

### 1. Architecture Decision Records (ADRs)

**Format:** `ADR-{number}-{STATUS}-{short-name}.md`

**Numbering:** Global sequential (not per-subject)

**Status Values (UPPERCASE):**

- `PROPOSED` - Under review, not yet accepted
- `ACCEPTED` - Approved but not yet implemented
- `IMPLEMENTED` - Fully implemented in production
- `REJECTED` - Decision not accepted
- `DEPRECATED` - Superseded by newer ADR

**Examples:**

```
ADR-001-IMPLEMENTED-modes-vs-themes-separation.md
ADR-002-IMPLEMENTED-html-attributes-naming.md
ADR-003-PROPOSED-badge-variant-strategy.md
ADR-004-ACCEPTED-component-composition-pattern.md
ADR-005-REJECTED-css-modules-approach.md
ADR-006-DEPRECATED-old-token-system.md
```

**Location:** `_bmad-output/adrs/`

**Rationale:**

- Industry standard (Google, AWS, etc.)
- Chronological order of decisions
- Unique identifiers
- **Status visibility** - UPPERCASE status instantly distinguishes from title
- Cross-subject references possible
- File sorting shows status at a glance

**Status Transitions:**

When an ADR's status changes, **rename the file** to reflect the new status:

```bash
# PROPOSED → ACCEPTED
mv ADR-012-PROPOSED-new-feature.md ADR-012-ACCEPTED-new-feature.md

# ACCEPTED → IMPLEMENTED
mv ADR-012-ACCEPTED-new-feature.md ADR-012-IMPLEMENTED-new-feature.md

# ACCEPTED → REJECTED
mv ADR-012-ACCEPTED-new-feature.md ADR-012-REJECTED-new-feature.md

# IMPLEMENTED → DEPRECATED (rare, when superseded)
mv ADR-003-IMPLEMENTED-old-approach.md ADR-003-DEPRECATED-old-approach.md
```

**Important:** Update all references to the ADR in documentation when renaming!

---

### 2. Analysis Documents

**Format:** `{subject}-analysis-{date}.md`

**Date Format:** `YYYY-MM-DD`

**Examples:**

```
theme-system-analysis-2026-01-26.md
badge-component-analysis-2026-01-27.md
performance-audit-2026-02-01.md
accessibility-review-2026-02-15.md
```

**Location:** `_bmad-output/analysis/`

**Rationale:**

- Clear subject identification
- Temporal tracking
- No conflicts possible
- Easy to find by date or subject

---

### 3. Technical Specifications

**Format:** `{subject}-technical-spec.md`

**No date** (specs are living documents, updated over time)

**Examples:**

```
theme-integration-technical-spec.md
badge-component-technical-spec.md
storybook-migration-technical-spec.md
testing-framework-technical-spec.md
```

**Location:** `_bmad-output/planning-artifacts/`

**Rationale:**

- Clear purpose (spec)
- Subject-scoped
- Version control tracks history
- No date needed (git history provides)

---

### 4. Implementation Checklists

**Format:** `{subject}-implementation-checklist.md`

**Examples:**

```
theme-integration-implementation-checklist.md
badge-component-implementation-checklist.md
api-refactor-implementation-checklist.md
```

**Location:** `_bmad-output/planning-artifacts/`

**Rationale:**

- Task tracking per subject
- Clear artifact type
- Matches spec naming

---

### 5. Planning Summaries

**Format:** `{subject}-planning-summary.md`

**Examples:**

```
theme-integration-planning-summary.md
badge-component-planning-summary.md
performance-optimization-planning-summary.md
```

**Location:** `_bmad-output/planning-artifacts/`

**Rationale:**

- Executive summary per subject
- Clear phase (planning)
- Subject-scoped

---

### 6. Implementation Reports

**Format:** `{subject}-implementation-report.md`

**Or for sprints:** `{subject}-sprint-{number}-report.md`

**Examples:**

```
theme-integration-implementation-report.md
badge-component-implementation-report.md
badge-component-sprint-1-report.md
badge-component-sprint-2-report.md
api-refactor-phase-1-report.md
```

**Location:** `_bmad-output/implementation-artifacts/`

**Rationale:**

- Clear completion documentation
- Subject-scoped
- Sprint tracking if needed

---

### 7. Global/Unique Files

Some files are intentionally global (not subject-specific):

**Examples:**

```
bmm-workflow-status.yaml                  # Tracks all workflow progress
README.md                                 # Output organization guide
NAMING-CONVENTIONS.md                     # This file
```

**Location:** Various (depends on purpose)

**Rationale:**

- Single source of truth for cross-cutting concerns
- Not duplicated per subject

---

## Subject Naming Guidelines

### Subject Name Format

Use **kebab-case** for subject names:

```
✅ theme-integration
✅ badge-component
✅ storybook-migration
✅ performance-optimization

❌ ThemeIntegration (PascalCase)
❌ theme_integration (snake_case)
❌ themeIntegration (camelCase)
```

### Subject Scope

Keep subjects:

- **Specific:** Not too broad ("theming" → "theme-integration")
- **Descriptive:** Clear purpose from name
- **Consistent:** Use similar terminology across related subjects

---

## Directory Structure

```
_bmad-output/
├── README.md                              # Permanent guide
├── NAMING-CONVENTIONS.md                  # This file
│
├── analysis/                              # Phase 1: Analysis
│   ├── {subject}-analysis-{date}.md
│   └── {subject2}-analysis-{date}.md
│
├── adrs/                                  # Architecture Decision Records
│   ├── ADR-{n}-{STATUS}-{decision}.md     # Global sequential with UPPERCASE status
│   └── ADR-{n+1}-{STATUS}-{decision}.md
│
├── planning-artifacts/                    # Phase 2: Planning
│   ├── bmm-workflow-status.yaml           # Global
│   ├── {subject}-technical-spec.md
│   ├── {subject}-implementation-checklist.md
│   ├── {subject}-planning-summary.md
│   └── {subject2}-technical-spec.md
│
├── implementation-artifacts/              # Phase 4: Implementation
│   ├── {subject}-implementation-report.md
│   ├── {subject}-sprint-1-report.md
│   └── {subject2}-implementation-report.md
│
└── tmp/                                   # Temporary (gitignored)
    ├── {anything}-draft.md
    └── session-reports-*.md
```

---

## Examples by Phase

### Phase 1: Analysis

**Subject:** "badge-component"

**Create:**

```
_bmad-output/analysis/badge-component-analysis-2026-01-27.md
```

---

### Phase 2: Planning

**Subject:** "badge-component"

**Create:**

```
_bmad-output/adrs/ADR-003-PROPOSED-badge-variant-strategy.md
_bmad-output/planning-artifacts/badge-component-technical-spec.md
_bmad-output/planning-artifacts/badge-component-implementation-checklist.md
_bmad-output/planning-artifacts/badge-component-planning-summary.md
```

**Update:**

```
_bmad-output/planning-artifacts/bmm-workflow-status.yaml
```

**Note:** When ADR is accepted, rename file to include new status (e.g., `PROPOSED` → `ACCEPTED` → `IMPLEMENTED`)

---

### Phase 4: Implementation

**Subject:** "badge-component"

**Create:**

```
_bmad-output/implementation-artifacts/badge-component-implementation-report.md
```

**Or with sprints:**

```
_bmad-output/implementation-artifacts/badge-component-sprint-1-report.md
_bmad-output/implementation-artifacts/badge-component-sprint-2-report.md
```

---

## Multi-Subject Example

**Three concurrent subjects:**

```
_bmad-output/
├── analysis/
│   ├── theme-integration-analysis-2026-01-26.md       # Subject 1
│   ├── badge-component-analysis-2026-01-27.md         # Subject 2
│   └── performance-optimization-analysis-2026-02-01.md # Subject 3
│
├── adrs/
│   ├── ADR-001-IMPLEMENTED-modes-vs-themes-separation.md  # Theme
│   ├── ADR-002-IMPLEMENTED-html-attributes-naming.md      # Theme
│   ├── ADR-003-PROPOSED-badge-variant-strategy.md         # Badge
│   ├── ADR-004-ACCEPTED-lazy-loading-strategy.md          # Performance
│   └── ADR-005-IMPLEMENTED-responsive-breakpoints.md      # Theme
│
├── planning-artifacts/
│   ├── theme-integration-technical-spec.md            # Theme
│   ├── badge-component-technical-spec.md              # Badge
│   └── performance-optimization-technical-spec.md     # Performance
│
└── implementation-artifacts/
    ├── theme-integration-implementation-report.md     # Theme
    ├── badge-component-sprint-1-report.md             # Badge
    └── performance-optimization-implementation-report.md # Performance
```

**Result:** Zero conflicts, clear organization!

---

## Checklist for New Subjects

When starting a new subject, verify:

- [ ] Subject name uses kebab-case
- [ ] Subject name is specific and descriptive
- [ ] Analysis file includes date: `{subject}-analysis-{date}.md`
- [ ] ADRs use next sequential number: `ADR-00X-{STATUS}-{decision}.md`
- [ ] ADR status is UPPERCASE: `PROPOSED`, `ACCEPTED`, `IMPLEMENTED`, `REJECTED`, `DEPRECATED`
- [ ] All planning artifacts prefixed: `{subject}-{type}.md`
- [ ] Implementation reports prefixed: `{subject}-implementation-report.md`
- [ ] No generic names (e.g., "PLANNING-SUMMARY.md" ❌)
- [ ] ADR files updated when status changes (rename file with new UPPERCASE status)

---

## Violations to Avoid

### ❌ Bad Examples

```
planning-summary.md                        # Missing subject prefix
implementation-checklist.md                # Missing subject prefix
REPORT.md                                  # Too generic
spec.md                                    # Missing subject
ADR-theme-modes.md                         # Missing sequential number
ADR-001-theme-modes.md                     # Missing status
ADR-001-implemented-theme-modes.md         # Status not uppercase
analysis.md                                # Missing subject + date
```

### ✅ Good Examples

```
theme-integration-planning-summary.md
theme-integration-implementation-checklist.md
badge-component-implementation-report.md
storybook-migration-technical-spec.md
ADR-001-IMPLEMENTED-modes-vs-themes-separation.md
ADR-005-ACCEPTED-css-in-js-decision.md
ADR-012-PROPOSED-component-library-refactor.md
performance-audit-analysis-2026-02-15.md
```

---

## Updating This Document

**When to update:**

- New file type patterns emerge
- Conventions are refined
- Better naming schemes discovered

**How to update:**

- Update this file
- Document rationale for changes
- Update examples
- Communicate to team

---

## References

- [ADR GitHub Organization](https://adr.github.io/)
- [Google Design Docs](https://www.industrialempathy.com/posts/design-docs-at-google/)
- BMad Config: `_bmad/core/config.yaml`
- Output Guide: `_bmad-output/README.md`

---

**Version History:**

- **1.1** (2026-01-28): Updated ADR naming format to include UPPERCASE status
  - New format: `ADR-{number}-{STATUS}-{short-name}.md`
  - Status values (UPPERCASE): `PROPOSED`, `ACCEPTED`, `IMPLEMENTED`, `REJECTED`, `DEPRECATED`
  - ADRs moved to dedicated `adrs/` directory
  - Improved visibility with distinct status formatting
- **1.0** (2026-01-26): Initial conventions based on theme-integration project
  - Established subject prefixing
  - Defined ADR numbering
  - Documented file type patterns

---

**Maintained by:** BMad Master Agent
**Last Updated:** 2026-01-28
````
