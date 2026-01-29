# BMad Output Organization Rules

**Version:** 2.0.0 (Subject-Based Structure)  
**Last Updated:** 2026-01-26  
**Applies To:** All BMad agents

---

## 🎯 Purpose

This document defines the **v2.0 subject-based structure** for BMad output organization. All agents MUST follow these rules to maintain consistency, scalability, and avoid file naming conflicts.

---

## 🚀 What Changed in v2.0

### v1.0 (OLD - DEPRECATED ❌)

```
_bmad-output/
├── analysis/                    # ❌ Flat, mixed subjects
├── planning-artifacts/          # ❌ Naming conflicts inevitable
└── implementation-artifacts/    # ❌ Not scalable
```

**Problems:**

- File naming conflicts across subjects
- No subject isolation
- Doesn't scale beyond 10-20 subjects

### v2.0 (NEW - REQUIRED ✅)

```
_bmad-output/
├── subjects/{name}/            # ✅ Perfect subject isolation
│   ├── analysis/
│   ├── planning/
│   └── implementation/
├── adrs/                       # ✅ Central ADR repository
├── global/                     # ✅ Cross-project files
└── tmp/                        # ✅ Temporary (gitignored)
```

**Benefits:**

- Zero naming conflicts (subject in path)
- Scales to 100+ subjects
- Each subject is self-contained
- Clear navigation per subject

---

## 📁 Complete v2.0 Directory Structure

```
{project-root}/_bmad-output/
├── README.md                           # v2.0 structure guide (committed)
├── NAMING-CONVENTIONS.md               # Naming standards (committed)
├── MIGRATION-v1-to-v2.md               # Migration documentation (committed)
├── SUBJECT-TEMPLATE.md                 # Template for new subjects (committed)
│
├── subjects/                           # 🎯 ALL SUBJECTS HERE
│   ├── {subject-name}/                 # Example: theme-integration/
│   │   ├── README.md                   # Subject overview
│   │   ├── analysis/                   # Phase 1: Analysis
│   │   │   ├── {name}-analysis-YYYY-MM-DD.md
│   │   │   └── research-notes.md
│   │   ├── planning/                   # Phase 2: Planning
│   │   │   ├── technical-spec.md
│   │   │   ├── implementation-checklist.md
│   │   │   └── planning-summary.md
│   │   └── implementation/             # Phase 4: Implementation
│   │       ├── implementation-report.md
│   │       └── changeset.md
│   │
│   └── {another-subject}/              # Example: badge-component/
│       ├── README.md
│       ├── analysis/
│       ├── planning/
│       └── implementation/
│
├── adrs/                               # 🎯 GLOBAL ADR REPOSITORY
│   ├── README.md                       # ADR index with links
│   ├── ADR-001-IMPLEMENTED-modes-vs-themes.md      # Sequential numbering
│   ├── ADR-002-IMPLEMENTED-html-attributes.md
│   └── ADR-003-{next-decision}.md
│
├── global/                             # 🎯 CROSS-PROJECT FILES
│   ├── README.md                       # Global folder guide
│   └── bmm-workflow-status.yaml        # Overall project status
│
└── tmp/                                # 🎯 TEMPORARY (GITIGNORED)
    ├── session-reports/
    ├── verification-reports/
    └── work-in-progress/
```

---

## 🚨 Critical Rules (MUST Follow)

### Rule 1: All Subject Work → `subjects/{name}/`

**REQUIRED for any subject-specific work:**

```
✅ CORRECT:
subjects/theme-integration/analysis/theme-system-analysis-2026-01-26.md
subjects/badge-component/planning/technical-spec.md

❌ WRONG (v1.0 - NEVER USE):
analysis/theme-system-analysis-2026-01-26.md
planning-artifacts/badge-technical-spec.md
```

**Subject naming:**

- Use `kebab-case` (lowercase with hyphens)
- Examples: `theme-integration`, `badge-component`, `dark-mode-implementation`

### Rule 2: BMM Phase Artifacts → Phase Subdirectories

**Each subject has 3 phase folders:**

1. **`subjects/{name}/analysis/`** - BMM Phase 1
   - Problem exploration
   - Research notes
   - Analysis reports with timestamps
   - Example: `theme-system-analysis-2026-01-26.md`

2. **`subjects/{name}/planning/`** - BMM Phase 2
   - Technical specifications
   - Implementation checklists
   - Planning summaries
   - Files: `technical-spec.md`, `implementation-checklist.md`, `planning-summary.md`

3. **`subjects/{name}/implementation/`** - BMM Phase 4
   - Implementation reports
   - Changesets
   - Post-implementation documentation
   - Files: `implementation-report.md`, `changeset.md`

**⚠️ Phase 3 (Solutioning):**

- Optional - only create if explicitly needed for complex architecture work
- Folder: `subjects/{name}/solutioning/`

### Rule 3: ADRs → `adrs/` (Global Repository)

**Architecture Decision Records are GLOBAL, not per-subject:**

```
✅ CORRECT:
adrs/ADR-001-IMPLEMENTED-modes-vs-themes.md
adrs/ADR-002-IMPLEMENTED-html-attributes.md
adrs/ADR-003-PROPOSED-badge-variant-strategy.md

❌ WRONG:
subjects/theme-integration/planning/adr-modes-vs-themes.md
subjects/badge-component/adrs/variant-strategy.md
```

**ADR Rules:**

- Sequential numbering: `ADR-001`, `ADR-002`, `ADR-003`, etc.
- Format: `ADR-{number}-{kebab-case-title}.md`
- Update `adrs/README.md` index with each new ADR
- ADRs can reference multiple subjects (they're architectural)

### Rule 4: Global Files → `global/`

**Cross-project tracking and coordination:**

```
✅ CORRECT:
global/bmm-workflow-status.yaml        # Overall project status
global/roadmap-2026.md                 # Project-wide roadmap
global/team-decisions-log.md           # Cross-subject decisions

❌ WRONG:
subjects/some-subject/project-roadmap.md
_bmad-output/bmm-workflow-status.yaml
```

**Use `global/` when:**

- File tracks status across multiple subjects
- Information is project-wide, not subject-specific
- Need central reference point for team coordination

### Rule 5: Temporary Files → `tmp/`

**ALL temporary outputs MUST go in `tmp/` (gitignored):**

```
✅ CORRECT:
tmp/session-reports/session-2026-01-26.md
tmp/verification-reports/token-verification-2026-01-26.md
tmp/work-in-progress/draft-analysis.md

❌ WRONG (will pollute git):
_bmad-output/session-report.md
subjects/theme-integration/temp-notes.md
```

**What goes in `tmp/`:**

- Session summaries and progress reports
- Verification reports
- Work-in-progress documents
- Draft outputs before finalization
- Debug logs and diagnostic files
- Anything that becomes outdated as work progresses

**Why gitignored:**

- Temporary files document the _work process_, not the final result
- They become stale as implementation progresses
- Users can clean `tmp/` without affecting committed work

---

## 📋 Decision Matrix for Agents

| Output Type                     | Location                                | Committed? | Example                                                      |
| ------------------------------- | --------------------------------------- | ---------- | ------------------------------------------------------------ |
| **Subject analysis**            | **`subjects/{name}/analysis/`**         | **✅ Yes** | `subjects/theme-integration/analysis/analysis-2026-01-26.md` |
| **Technical spec**              | **`subjects/{name}/planning/`**         | **✅ Yes** | `subjects/badge-component/planning/technical-spec.md`        |
| **Implementation report**       | **`subjects/{name}/implementation/`**   | **✅ Yes** | `subjects/theme-integration/implementation/report.md`        |
| **Architecture Decision (ADR)** | **`adrs/`**                             | **✅ Yes** | `adrs/ADR-003-PROPOSED-badge-variant-strategy.md`            |
| **BMM workflow status**         | **`global/`**                           | **✅ Yes** | `global/bmm-workflow-status.yaml`                            |
| **Session report**              | **`tmp/session-reports/`**              | **❌ No**  | `tmp/session-reports/session-2026-01-26.md`                  |
| **Verification report**         | **`tmp/verification-reports/`**         | **❌ No**  | `tmp/verification-reports/token-check-2026-01-26.md`         |
| **Draft/WIP**                   | **`tmp/work-in-progress/`**             | **❌ No**  | `tmp/work-in-progress/draft-analysis.md`                     |
| Official project docs           | Project docs (e.g., `packages/*/docs/`) | ✅ Yes     | `packages/design-system/docs/theme-guide.md`                 |

---

## 💻 Implementation Guidelines for Agents

### Starting a New Subject

When working on a new subject (e.g., "badge-component"):

1. **Create subject structure:**

   ```bash
   mkdir -p subjects/badge-component/{analysis,planning,implementation}
   ```

2. **Copy template:**

   ```bash
   cp SUBJECT-TEMPLATE.md subjects/badge-component/README.md
   ```

3. **Update subject README:**
   - Fill in subject name, description, status
   - Add links to key artifacts as you create them

4. **Create phase artifacts in phase folders:**
   ```
   subjects/badge-component/
   ├── README.md                           # Start here
   ├── analysis/
   │   └── badge-analysis-2026-01-27.md    # First analysis
   ├── planning/
   │   └── technical-spec.md               # After analysis
   └── implementation/
       └── implementation-report.md        # After implementation
   ```

### Creating ADRs

ADRs are **global** and **sequential**:

1. **Check next ADR number:**

   ```bash
   ls adrs/ | grep ADR | sort | tail -1
   # If last is ADR-002, next is ADR-003
   ```

2. **Create new ADR:**

   ```
   adrs/ADR-003-PROPOSED-badge-variant-strategy.md
   ```

3. **Update ADR index:**

   ```markdown
   # In adrs/README.md

   ## Architecture Decisions
   ```

- [ADR-001: Modes vs Themes Separation](./ADR-001-IMPLEMENTED-modes-vs-themes.md)
- [ADR-002: HTML Attributes Naming](./ADR-002-IMPLEMENTED-html-attributes.md)
- [ADR-003: Badge Variant Strategy](./ADR-003-PROPOSED-badge-variant-strategy.md) ← Add this
  ```

  ```

### File Naming Within Subjects

**Key principle:** Subject name is in the path, so files can have simple names:

```
✅ GOOD (v2.0):
subjects/badge-component/planning/technical-spec.md
subjects/badge-component/planning/implementation-checklist.md

❌ BAD (redundant):
subjects/badge-component/planning/badge-component-technical-spec.md
subjects/badge-component/planning/badge-component-implementation-checklist.md
```

**Exception:** Analysis files with timestamps for tracking evolution:

```
✅ GOOD:
subjects/theme-integration/analysis/theme-system-analysis-2026-01-26.md
subjects/theme-integration/analysis/theme-system-analysis-2026-02-03.md
```

### Pseudocode for Agents

```typescript
function getOutputPath(
  outputType: 'analysis' | 'planning' | 'implementation' | 'adr' | 'global' | 'temp',
  subjectName?: string,
  filename: string
): string {
  const base = config.output_folder; // _bmad-output/

  switch (outputType) {
    case 'analysis':
      return `${base}/subjects/${subjectName}/analysis/${filename}`;

    case 'planning':
      return `${base}/subjects/${subjectName}/planning/${filename}`;

    case 'implementation':
      return `${base}/subjects/${subjectName}/implementation/${filename}`;

    case 'adr':
      // ADRs are global, no subject folder
      return `${base}/adrs/${filename}`;

    case 'global':
      return `${base}/global/${filename}`;

    case 'temp':
      return `${base}/tmp/${filename}`;

    default:
      throw new Error(`Unknown output type: ${outputType}`);
  }
}

// Usage examples:
getOutputPath('analysis', 'badge-component', 'badge-analysis-2026-01-27.md');
// → _bmad-output/subjects/badge-component/analysis/badge-analysis-2026-01-27.md

getOutputPath('adr', undefined, 'ADR-003-PROPOSED-badge-variants.md');
// → _bmad-output/adrs/ADR-003-PROPOSED-badge-variants.md

getOutputPath('temp', undefined, 'session-report-2026-01-27.md');
// → _bmad-output/tmp/session-report-2026-01-27.md
```

---

## 🔄 Migration from v1.0 to v2.0

If you encounter old v1.0 files:

1. **Identify subject** from filename or context
2. **Create subject structure** if not exists
3. **Move to appropriate location:**
   ```bash
   # Example: Move old planning artifact
   mkdir -p subjects/theme-integration/planning
   mv planning-artifacts/theme-integration-technical-spec.md \
      subjects/theme-integration/planning/technical-spec.md
   ```
4. **Update internal links** in moved files
5. **Do NOT commit old structure** to git

See `MIGRATION-v1-to-v2.md` for detailed migration guide.

---

## ✅ Verification Checklist for Agents

Before creating any output file, verify:

- [ ] **Is this subject-specific?** → Use `subjects/{name}/{phase}/`
- [ ] **Is this an ADR?** → Use `adrs/ADR-{number}-{title}.md`
- [ ] **Is this cross-project?** → Use `global/`
- [ ] **Is this temporary?** → Use `tmp/`
- [ ] **Am I using v1.0 flat structure?** → ❌ STOP! Use v2.0 instead
- [ ] **Does subject folder exist?** → Create from template if needed
- [ ] **Have I updated subject README?** → Add links to new artifacts
- [ ] **Is this an ADR?** → Update `adrs/README.md` index

---

## 📚 Related Documentation

- **v2.0 Structure Guide:** `{output_folder}/README.md` (canonical reference)
- **Naming Conventions:** `{output_folder}/NAMING-CONVENTIONS.md`
- **Migration Guide:** `{output_folder}/MIGRATION-v1-to-v2.md`
- **Subject Template:** `{output_folder}/SUBJECT-TEMPLATE.md`
- **Git Operations:** `{project-root}/_bmad/core/resources/git-operations-rules.md` 🚨
- **Config Reference:** `{project-root}/_bmad/core/config.yaml`

---

## 📖 Examples

### Example 1: Theme Integration (Complete Subject)

```
subjects/theme-integration/
├── README.md                                    # Subject overview
├── analysis/
│   └── theme-system-analysis-2026-01-26.md      # Initial analysis
├── planning/
│   ├── technical-spec.md                        # Technical specification
│   ├── implementation-checklist.md              # Task checklist
│   └── planning-summary.md                      # Planning summary
└── implementation/
    └── implementation-report.md                 # Post-implementation
```

**ADRs created (in adrs/):**

```
adrs/ADR-001-IMPLEMENTED-modes-vs-themes.md
adrs/ADR-002-IMPLEMENTED-html-attributes.md
```

### Example 2: Badge Component (New Subject)

**Starting fresh:**

```bash
# 1. Create structure
mkdir -p subjects/badge-component/{analysis,planning,implementation}

# 2. Copy template
cp SUBJECT-TEMPLATE.md subjects/badge-component/README.md

# 3. Start with analysis
# Create: subjects/badge-component/analysis/badge-analysis-2026-01-27.md

# 4. Planning phase
# Create: subjects/badge-component/planning/technical-spec.md

# 5. If architecture decision needed
# Create: adrs/ADR-003-PROPOSED-badge-variant-strategy.md
# Update: adrs/README.md
```

### Example 3: Session Work (Temporary)

```
tmp/
├── session-reports/
│   └── theme-integration-session-2026-01-26.md
├── verification-reports/
│   └── token-verification-2026-01-26.md
└── work-in-progress/
    └── badge-draft-analysis.md
```

**These are gitignored** - safe to delete after session.

---

## 🔄 Version History

| Version | Date       | Changes                                     |
| ------- | ---------- | ------------------------------------------- |
| 2.0.0   | 2026-01-26 | Complete rewrite: subject-based structure   |
| 1.0.0   | 2026-01-25 | Initial rules (flat structure - deprecated) |

---

**Last Updated:** 2026-01-26  
**Maintained By:** BMad Core Team  
**Questions?** See `_bmad-output/README.md` or ask BMad Master
