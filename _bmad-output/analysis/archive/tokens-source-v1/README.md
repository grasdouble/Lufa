# Tokens Source v1.x Archive

**Archive Date:** January 23, 2026  
**Version:** v1.x (pre-v2.0 refactoring)  
**Moved From:** `packages/design-system/tokens/docs/archive/tokens-source/`

---

## 📁 Contents

This directory contains the **complete v1.x token architecture** before the v2.0 refactoring.

### Directory Structure

```
tokens-source-v1/
├── primitives/      # Old primitive tokens (different structure)
│   ├── color.json       (19.9 KB - 200+ color values)
│   ├── spacing.json     (1.3 KB)
│   ├── typography.json  (2.9 KB)
│   ├── border.json      (1.3 KB)
│   ├── size.json        (2.0 KB)
│   ├── elevation.json   (1.8 KB)
│   └── motion.json      (1.8 KB)
│
├── core/           # Old core/semantic tokens
│   ├── color.json       (9.3 KB)
│   ├── spacing.json     (1.0 KB)
│   ├── typography.json  (3.5 KB)
│   ├── border.json      (2.1 KB)
│   ├── size.json        (1.6 KB)
│   ├── layout.json      (2.4 KB)
│   └── motion.json      (9.6 KB)
│
├── modes/          # Dark mode tokens
│   └── dark.json        (1.8 KB)
│
└── themes/         # Theme variations (empty)
```

**Total:** 15 JSON files, ~60 KB

---

## 🔍 v1.x vs v2.0 Architecture Comparison

### v1.x Architecture (Archived)

```
2 Levels:
┌────────────────────┐
│  Core/Semantic     │ ← Mixed semantic and component-level
├────────────────────┤
│  Primitives        │ ← Raw values
└────────────────────┘
```

**Issues:**
- ❌ Only 2 levels (not enough semantic separation)
- ❌ Mixed semantic and component concerns in "core"
- ❌ No clear component token layer
- ❌ Dark mode as separate file (harder to maintain)

---

### v2.0 Architecture (Current)

```
4 Levels:
┌────────────────────┐
│  Component Tokens  │ ← Component-specific (Phase 4)
├────────────────────┤
│  Semantic Tokens   │ ← UI context (Phase 3)
├────────────────────┤
│  Core Tokens       │ ← Global decisions (Phase 2) ✅
├────────────────────┤
│  Primitive Tokens  │ ← Raw values (Phase 1) ✅
└────────────────────┘
```

**Improvements:**
- ✅ 4-level hierarchy (clear semantic separation)
- ✅ DTCG format compliance (100%)
- ✅ Better organization (by purpose, not by type)
- ✅ Scalable architecture (161 → 361 tokens planned)
- ✅ Theme system planned (Phase 7)

---

## 📊 Token Comparison

| Metric              | v1.x (Archived) | v2.0 (Current) |
| ------------------- | --------------- | -------------- |
| **Total Tokens**    | ~200+           | 161 (45% done) |
| **Levels**          | 2               | 4              |
| **Format**          | Mixed           | DTCG 100%      |
| **Organization**    | By type         | By purpose     |
| **Metadata**        | Partial         | Complete       |
| **Style Dict**      | v3.x            | v4.4.0         |
| **Performance**     | Untested        | Validated 8ms  |

---

## 🚀 Migration Path

**Phase 0-2 (Complete):**
1. ✅ Extracted 103 primitives from v1.x
2. ✅ Created 58 core tokens (new semantic layer)
3. ✅ DTCG format adoption
4. ✅ Performance validation

**Phase 3-4 (Planned):**
- Phase 3: Semantic Tokens (~80 tokens)
- Phase 4: Component Tokens (~120 tokens)

**Total:** ~361 tokens (vs ~200 in v1.x, but better organized)

---

## 📚 Why Preserved?

This archive is kept for:

1. **Historical Reference:** Understanding design decisions
2. **Token Mapping:** Comparing old vs new token names
3. **Migration Validation:** Ensuring no tokens were lost
4. **Onboarding:** Helping contributors understand evolution

---

## ⚠️ Do NOT Use

These tokens are **archived and should not be used** in active development:

- ❌ Not DTCG compliant
- ❌ Old architecture (2-level vs 4-level)
- ❌ Missing metadata
- ❌ Not maintained

**Use instead:** `packages/design-system/tokens/src/` (v2.0)

---

## 🔗 Related Documentation

- **Migration docs:** `_bmad-output/analysis/archive/v1-migration/`
- **Current tokens:** `packages/design-system/tokens/`
- **Phase summaries:** `_bmad-output/analysis/phase-*-completion-summary.md`
- **Roadmap:** `_bmad-output/analysis/roadmap-implementation-v2.0.md`

---

**Preserved Date:** January 23, 2026  
**Reason:** Historical reference for v1.x → v2.0 migration  
**Status:** Read-only archive (do not modify)
