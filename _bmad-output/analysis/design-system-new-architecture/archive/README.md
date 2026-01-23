# Archives - Lufa Design System v2.0

This directory contains archived documentation from previous versions, completed development phases, and working sessions.

**Last Updated:** January 23, 2026

---

## 📦 Directory Structure

```
archive/
├── pocs/                       # Phase 0 POC performance tests
├── phase-0/                    # Phase 0 intermediate summaries
├── phase-2/                    # Phase 2 planning documents
├── phase-5a/                   # Phase 5A empty (placeholder)
├── v1-migration/               # v1.x → v2.0 migration docs
├── tokens-source-v1/           # Complete v1.x token architecture
├── sessions/                   # Working session summaries
└── tools/                      # Archived automation tools
```

---

## 📁 Archive Contents

### 1. pocs/ (2 files + README)

**Phase 0 POC performance tests** - CSS cascade performance validation

- `README.md` - POC archive explanation
- `css-cascade-performance-test.html` - Interactive performance test HTML
- `performance-results.md` - Complete test results and findings

**Why archived:** POC complete. Architecture validated for production (8.00ms << 16ms target).

**Key findings:** 4-level CSS cascade performs at 60fps with negligible overhead (+1.3%).

**Reference:** `phase-0/phase-0-action-1-summary.md`

---

### 2. phase-0/ (4 files)

**Phase 0 intermediate summaries** - superseded by `phase-0-complete-summary.md`

- `README.md` - Archive explanation
- `phase-0-action-1-summary.md` - POC Performance only
- `phase-0-action-2-summary.md` - Metadata Automation only
- `phase-0-actions-1-2-complete-summary.md` - Combined #1 & #2

**Why archived:** Intermediate summaries replaced by comprehensive Phase 0 complete summary.

**Active doc:** `_bmad-output/analysis/phase-0-complete-summary.md`

---

### 3. phase-2/ (4 files)

**Phase 2 planning and preview documents** - planning complete, tokens implemented

- `README.md` - Archive explanation
- `phase-2-planning.md` (9.5 KB) - Initial planning document
- `phase-2-core-tokens-preview.html` (29 KB) - Interactive token preview
- `PHASE_2_SUMMARY.txt` (12.7 KB) - ASCII art summary

**Why archived:** Phase 2 complete (58 Core Tokens). Planning docs no longer needed for active development.

**Active docs:**

- `_bmad-output/analysis/phase-2-completion-summary.md` - Complete summary
- `packages/design-system/tokens/src/core/` - Implemented tokens
- `packages/design-system/tokens/docs/planning/USAGE_EXAMPLES.md` - Usage guide

---

### 4. phase-5a/ (empty placeholder)

**Phase 5A placeholder** - reserved for future archiving

- Currently empty (Phase 5A work is active in `current/phase-5a/`)

**Why exists:** Placeholder to maintain consistent archive structure.

**Active work:** `current/phase-5a/`

---

### 5. v1-migration/ (4 files)

**v1.x TypeScript → v2.0 JSON migration documentation**

- `README.md` - Archive explanation
- `MIGRATION_STATUS.md` (15.7 KB) - Migration tracking (TS → JSON)
- `BATCH_2_SUMMARY.md` (22.1 KB) - Batch 2 motion/animation tokens
- `REFACTORING_SUMMARY.md` (7.6 KB) - System refactoring notes

**Why archived:** Migration complete. v1 TypeScript tokens fully replaced by v2 DTCG JSON tokens.

**Current system:** `packages/design-system/tokens/` (v2.0)

---

### 6. tokens-source-v1/ (15 JSON files, ~60 KB)

**Complete v1.x token architecture** before v2.0 refactoring

**Structure:**

```
tokens-source-v1/
├── primitives/  (7 JSON files)
├── core/        (7 JSON files)
├── modes/       (1 JSON file - dark mode)
└── themes/      (empty)
```

**Why preserved:**

- Historical reference for design decisions
- Token mapping (old vs new names)
- Migration validation
- Contributor onboarding (understand evolution)

**⚠️ Do NOT use in development** - archived, not maintained

**Current tokens:** `packages/design-system/tokens/src/` (v2.0)

---

### 7. sessions/ (3 files)

**Working session summaries** - historical records of major work sessions

- `README.md` - Archive explanation
- `2026-01-23-documentation-consolidation.md` - First doc consolidation session
- `2026-01-23-phase-summaries-reorganization.md` - Phase summaries centralization
- `2026-01-23-complete-reorganization.md` - Complete reorganization (Parts 1+2)

**Why archived:** Session records for project history and decision-making context.

---

### 8. tools/ (2 files)

**Archived automation tools** - superseded by AI routine

- `README.md` - Archive explanation
- `update-docs-after-phase.sh` - Bash script for doc updates (superseded)

**Why archived:** Script superseded by AI-ROUTINE-auto-update-docs.md (automatic, intelligent, context-aware).

**Fallback:** Use CHECKLIST-update-documentation.md if AI unavailable.

---

## 🔍 Quick Reference

| Need                       | Archive Location                           |
| -------------------------- | ------------------------------------------ |
| POC performance tests      | `pocs/`                                    |
| Phase 0 intermediate docs  | `phase-0/`                                 |
| Phase 2 planning process   | `phase-2/`                                 |
| v1 → v2 migration history  | `v1-migration/`                            |
| v1.x token architecture    | `tokens-source-v1/`                        |
| Working session records    | `sessions/`                                |
| Archived automation tools  | `tools/`                                   |
| Performance test HTML      | `pocs/css-cascade-performance-test.html`   |
| Performance results        | `pocs/performance-results.md`              |
| Old token values reference | `tokens-source-v1/primitives/`             |
| Migration tracking         | `v1-migration/MIGRATION_STATUS.md`         |
| Phase 2 preview (visual)   | `phase-2/phase-2-core-tokens-preview.html` |
| Old update script (bash)   | `tools/update-docs-after-phase.sh`         |

---

## 📊 Archive Statistics

| Category          | Files  | Total Size  | Oldest Date    | Newest Date    |
| ----------------- | ------ | ----------- | -------------- | -------------- |
| pocs/             | 3      | ~44 KB      | 2026-01-22     | 2026-01-23     |
| phase-0/          | 4      | ~60 KB      | 2026-01-22     | 2026-01-23     |
| phase-2/          | 4      | ~52 KB      | 2026-01-23     | 2026-01-23     |
| phase-5a/         | 0      | 0 KB        | -              | -              |
| v1-migration/     | 4      | ~46 KB      | 2026-01-22     | 2026-01-22     |
| tokens-source-v1/ | 16     | ~60 KB      | 2026-01-21     | 2026-01-22     |
| sessions/         | 4      | ~30 KB      | 2026-01-23     | 2026-01-23     |
| tools/            | 2      | ~5 KB       | 2026-01-23     | 2026-01-23     |
| **Total**         | **37** | **~297 KB** | **2026-01-21** | **2026-01-23** |

---

## 🎯 Active Documentation

For current project status and documentation, see:

**Main Documents:**

- `_bmad-output/analysis/MASTER-STATUS.md` - Current status
- `_bmad-output/analysis/roadmap-implementation-v2.0.md` - Complete roadmap
- `_bmad-output/analysis/phase-*-completion-summary.md` - Phase summaries

**Token System:**

- `packages/design-system/tokens/` - v2.0 implementation
- `packages/design-system/tokens/README.md` - Package documentation

---

## 📝 Archive Policy

**When to archive:**

- ✅ Intermediate summaries superseded by complete docs
- ✅ Planning documents after phase completion
- ✅ Migration docs after migration complete
- ✅ Old architecture after new architecture established
- ✅ Working sessions after completion

**What to preserve:**

- ✅ Decision-making context
- ✅ Historical references
- ✅ Migration mappings
- ✅ Visual previews
- ✅ Session records

**What NOT to archive:**

- ❌ Current implementation code
- ❌ Active documentation
- ❌ User-facing guides
- ❌ CI/CD configurations

---

## 🔗 Related Documentation

- **Main analysis folder:** `_bmad-output/analysis/` (parent directory)
- **Maintenance system:** `_bmad-output/analysis/MAINTENANCE-SYSTEM.md`
- **Archive policy:** This README
- **Current tokens:** `packages/design-system/tokens/`

---

**Archive Maintained By:** Mary (AI Business Analyst) + Noofreuuuh  
**Archive Location:** `_bmad-output/analysis/archive/`  
**Status:** 🟢 Active Archive (regularly updated)  
**Next Archive:** After Phase 3 completion (planning docs)
