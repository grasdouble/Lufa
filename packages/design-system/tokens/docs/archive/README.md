# Archive - Lufa Design System Tokens

This directory contains archived documentation from previous versions and completed development phases.

## 📦 Contents

### `phase-2/`

**Phase 2 (Core Tokens) planning and preview documents** (January 23, 2026):

- **PHASE_2_SUMMARY.txt** - Quick reference summary (superseded by completion summary)
- **phase-2-planning.md** - Initial planning document (completed)
- **phase-2-core-tokens-preview.html** - Interactive preview of proposed tokens

**Status:** ✅ Phase 2 Complete - 58 Core Tokens implemented

### `v1-migration/`

Documentation from the TypeScript-to-JSON migration process (January 2026):

- **BATCH_2_SUMMARY.md** - Summary of Batch 2 migration (motion/animation tokens)
- **MIGRATION_STATUS.md** - Complete migration status tracking (TypeScript → JSON)
- **REFACTORING_SUMMARY.md** - Token system refactoring notes (Style Dictionary v5 + DTCG)

### `tokens-source/`

Previous token architecture (v1.x) using Style Dictionary with a different structure:

```
tokens-source/
├── core/          # Old core tokens (semantic layer)
├── primitives/    # Old primitive tokens (different structure)
├── modes/         # Dark mode tokens
└── themes/        # Theme variations
```

## 🚀 Current Token System (v2.0)

The current token system is located at:

- **Source:**
  - `../../src/primitives/` (Phase 1: 103 Primitive Tokens ✅)
  - `../../src/core/` (Phase 2: 58 Core Tokens ✅)
- **Documentation:** `../../README.md` and `../planning/`
- **Build output:** `../../dist/`

**Current Progress:** 161 / ~361 tokens (45% complete)

## 📝 Why Archived?

### v1-migration (January 23, 2026)

Archived during Phase 1 reorganization. The new v2.0 architecture replaced the old system with a cleaner 4-level hierarchy.

### phase-2 (January 23, 2026)

Archived after Phase 2 completion. Planning documents are no longer needed for active development. Active documentation moved to `docs/planning/phase-2-completion-summary.md`.

---

**Current Architecture:**

- ✅ 4-level token hierarchy (Primitives → Core → Semantic → Component)
- ✅ DTCG format compliance
- ✅ Style Dictionary v4.4.0
- ✅ 161 tokens (Phase 1 + Phase 2 complete)

## 🔍 Reference

If you need to understand the migration history or compare the old vs. new architecture, these files provide valuable context. However, they are **not part of the active codebase** and should not be used for new development.

---

**Last Updated:** January 23, 2026  
**Active Phases:** Phase 1 ✅ + Phase 2 ✅  
**Next Phase:** Phase 3 - Semantic Tokens (~80 tokens)
