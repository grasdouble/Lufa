# ADR-011: Token Architecture Clarification

**Decision:** Clarify Token Architecture - Primitives as Immutable Constants  
**Status:** Proposed  
**Date:** 2026-01-27  
**Impact:** Breaking metadata change, CSS output unchanged

---

## 📄 Documents in This Package

### 1. **ADR-011-token-architecture-primitives-immutable.md** (Main ADR)

The comprehensive Architecture Decision Record with:

- Full context and problem statement
- Detailed decision rationale
- Implementation plan (6 phases, 64 hours)
- Alternatives considered
- Validation criteria
- Rollback strategy
- Before/after code examples

**Read this first** for the complete picture.

### 2. **ADR-011-implementation-checklist.md** (Execution Plan)

Day-by-day checklist for implementing the ADR:

- Phase-by-phase tasks with checkboxes
- Success criteria per phase
- Daily progress tracker
- Rollback procedures
- Effort estimates

**Use this** to track implementation progress.

### 3. **ADR-011-visual-guide.md** (Learning Resource)

Visual explanations and diagrams:

- Token flow diagrams
- Mode switching mechanics
- Decision trees
- Common mistakes and corrections
- Paint store analogy

**Share this** with team members for understanding.

---

## 🎯 TL;DR

### The Problem

Primitives are marked as `themable: true`, which violates the principle that primitives should be immutable constants. This creates confusion about which tokens actually change by mode/theme.

### The Solution

Add explicit metadata flags:

- `themeable: boolean` - Can this token vary by theme?
- `modeAware: boolean` - Can this token vary by mode?

### The Rules

| Layer             | themeable | modeAware | Has Mode Selectors? |
| ----------------- | --------- | --------- | ------------------- |
| **Primitive**     | `false`   | `false`   | ❌ NO               |
| **Semantic/Core** | `true`    | `true`    | ✅ YES              |
| **Component**     | `true`    | `true`    | ✅ YES              |
| **Layout**        | `false`   | `false`   | ❌ NO               |

### The Migration

**Before (v0.7.1):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themable": true // ❌ WRONG
            }
          }
        }
      }
    }
  }
}
```

**After (v0.8.0):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themeable": false, // ✅ CORRECT
              "modeAware": false // ✅ NEW
            }
          }
        }
      }
    }
  }
}
```

### The Impact

**Breaking Changes:**

- Token metadata schema updated
- `themable` → `themeable` (typo fixed)
- New required field: `modeAware`

**Non-Breaking:**

- ✅ CSS output functionally identical
- ✅ No visual changes
- ✅ No component API changes
- ✅ Mode switching behavior unchanged

---

## 🚀 Quick Start

### For Reviewers

1. Read: **ADR-011-token-architecture-primitives-immutable.md**
2. Review: Decision rationale, alternatives considered
3. Approve: If architecture makes sense

### For Implementers

1. Read: **ADR-011-visual-guide.md** (understand the concepts)
2. Follow: **ADR-011-implementation-checklist.md** (day by day)
3. Estimate: ~64 hours (~8 days) total effort

### For Team Members

1. Read: **ADR-011-visual-guide.md** (visual explanations)
2. Understand: Primitives = constants, Semantic = meaning
3. Ask: Questions in team channel or office hours

---

## 📊 Implementation Overview

### Timeline: 3 Weeks

```
Week 1: Setup & Primitives
├─ Day 1: Validation setup (Phase 1)
├─ Day 2-3: Primitive migration (Phase 2)
├─ Day 4: Semantic migration (Phase 3)
└─ Day 5: Config updates (Phase 4 start)

Week 2: Config & Testing
├─ Day 6-7: Config updates (Phase 4 finish)
├─ Day 8-9: Tests & documentation (Phase 5)
└─ Day 10: Rollout prep (Phase 6 start)

Week 3: Rollout & Monitor
├─ Day 11: Publish v0.8.0
└─ Day 12-15: Monitor feedback, fix issues
```

### Effort Breakdown

| Phase     | Description                      | Hours        |
| --------- | -------------------------------- | ------------ |
| 1         | Validation & Schema              | 8            |
| 2         | Migrate Primitives (~500 tokens) | 12           |
| 3         | Migrate Semantic (~150 tokens)   | 8            |
| 4         | Update Style Dictionary Config   | 12           |
| 5         | Documentation & Testing          | 16           |
| 6         | Rollout & Communication          | 8            |
| **Total** |                                  | **64 hours** |

---

## ✅ Success Criteria

### Migration Complete When:

**Metadata:**

- ✅ 100% of primitives have `themeable: false, modeAware: false`
- ✅ 100% of core/semantic tokens have `themeable: true, modeAware: true`
- ✅ 100% of layout tokens have `themeable: false, modeAware: false`

**Build:**

- ✅ `npm run validate:tokens` passes
- ✅ `npm run build:tokens` succeeds
- ✅ All unit tests pass
- ✅ Visual regression tests pass

**CSS:**

- ✅ Primitives only in `:root` (no mode selectors)
- ✅ Semantic tokens have all 3 mode selectors
- ✅ CSS diff shows no functional changes
- ✅ Bundle size delta < 1%

**Adoption:**

- ✅ No critical bugs in first week
- ✅ Team feedback collected
- ✅ Documentation approved

---

## 🔄 Rollback Plan

If critical issues arise, rollback in phases:

### Phase 1: Revert CSS Config (1 hour)

```bash
git revert <commit-hash>
npm run build:tokens
npm version patch
npm publish
```

### Phase 2: Revert Metadata (2 hours)

```bash
git revert <commit-range>
npm run build:tokens
npm publish
```

### Triggers

- Visual regressions in production
- Build time increase >50%
- Consumer adoption blocked
- Critical accessibility issues

---

## 📚 Related ADRs

- **ADR-001:** Modes vs Themes Separation
- **ADR-002:** HTML Attributes Naming
- **ADR-003:** High-Contrast Token Strategy
- **Future:** Phase 6 Theme Variant Implementation

---

## 💬 Communication

### Announcement Template

```markdown
📢 Architecture Decision: ADR-011

We're clarifying our token architecture to make primitives explicitly
immutable. This fixes confusion about which tokens vary by mode/theme.

**Key Changes:**

- Primitives now marked as `themeable: false, modeAware: false`
- Semantic tokens marked as `themeable: true, modeAware: true`
- New validation prevents mistakes

**Impact:**

- Metadata schema changes (breaking)
- CSS output unchanged (non-breaking)
- No visual changes

**Timeline:**

- Implementation: 3 weeks
- Target release: v0.8.0 (2026-02-17)

**Resources:**

- Full ADR: \_bmad-output/adrs/ADR-011-token-architecture-primitives-immutable.md
- Visual guide: \_bmad-output/adrs/ADR-011-visual-guide.md
- Checklist: \_bmad-output/adrs/ADR-011-implementation-checklist.md

**Questions?** Office hours or team channel
```

---

## 🎓 Key Concepts

### Primitives = Constants

```
blue-600 = #2563eb
This NEVER changes. Like Math.PI.
```

### Semantic = Meaning

```
brand-primary:
  - Light mode: use blue-600
  - Dark mode: use blue-400
  - High-contrast: use hc.blue

The mapping changes, not the primitive values.
```

### Mode Switching = CSS Selector

```
<html data-mode="dark"> activates [data-mode='dark']
Only mode-aware tokens change.
Primitives stay constant.
```

### Validation = Architecture Enforcement

```
✅ Primitive with themeable: false → OK
❌ Primitive with themeable: true → ERROR
```

---

## 📦 File Structure

```
_bmad-output/adrs/
├── ADR-011-token-architecture-primitives-immutable.md  (37 KB)
│   └── Comprehensive ADR with full context and decision
│
├── ADR-011-implementation-checklist.md                 (11 KB)
│   └── Day-by-day execution plan with checkboxes
│
├── ADR-011-visual-guide.md                            (18 KB)
│   └── Visual diagrams and learning resource
│
└── ADR-011-README.md                                  (This file)
    └── Summary and quick navigation
```

---

## 🤔 FAQs

### Q: Will this break my components?

**A:** No. CSS output is functionally identical. Only metadata changes.

### Q: Do I need to update my code?

**A:** Only if you read token metadata programmatically. Component code unchanged.

### Q: What if I'm using `themable` (typo)?

**A:** It will be renamed to `themeable` (correct spelling) during migration.

### Q: When should I use primitives vs semantic tokens?

**A:** Use primitives for raw values. Use semantic for anything that needs to vary by mode/theme.

### Q: Can I add modes to primitives?

**A:** No. Validation will throw an error. Primitives are immutable.

### Q: What about Phase 6 themes?

**A:** This ADR prepares for themes. We'll add a `themes` object similar to `modes`.

---

## 🔗 Quick Links

| Document                                                         | Purpose                 | Audience             |
| ---------------------------------------------------------------- | ----------------------- | -------------------- |
| [Main ADR](./ADR-011-token-architecture-primitives-immutable.md) | Full decision context   | Reviewers, Approvers |
| [Checklist](./ADR-011-implementation-checklist.md)               | Implementation tracking | Implementers         |
| [Visual Guide](./ADR-011-visual-guide.md)                        | Learning resource       | All team members     |

---

## ✍️ Authors

**Architecture Team**  
Date: 2026-01-27  
Version: 1.0

---

## 📝 Change Log

| Version | Date       | Changes                                   |
| ------- | ---------- | ----------------------------------------- |
| 1.0     | 2026-01-27 | Initial ADR proposed                      |
| 1.1     | TBD        | Approved and implementation started       |
| 2.0     | TBD        | Implementation completed, v0.8.0 released |

---

**Status:** 📄 Proposed (Awaiting review and approval)  
**Next Step:** Team review and approval  
**Target Start:** Week of 2026-01-27  
**Target Completion:** 2026-02-17
