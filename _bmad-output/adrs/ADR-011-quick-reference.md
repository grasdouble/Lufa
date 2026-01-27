# ADR-011 Quick Reference Card

**Print this and keep it handy while implementing!**

---

## 🎯 The Core Rule

```
Primitives = CONSTANTS (never change)
Semantic = MEANING (changes by mode/theme)
```

---

## 📋 Metadata Cheat Sheet

### Primitive Token

```json
{
  "$extensions": {
    "lufa": {
      "level": "primitive",
      "themeable": false,  ← Always false
      "modeAware": false   ← Always false
    }
  }
}
```

**CSS:** Only in `:root`, NO mode/theme selectors

---

### Semantic/Core Token

```json
{
  "$extensions": {
    "lufa": {
      "level": "core",
      "themeable": true,   ← Always true
      "modeAware": true,   ← Always true
      "modes": {           ← Required!
        "light": "{primitive.color.blue.600}",
        "dark": "{primitive.color.blue.400}",
        "high-contrast": "{primitive.color.hc.blue}"
      }
    }
  }
}
```

**CSS:** In `:root` + `[data-mode='dark']` + `[data-mode='high-contrast']`

---

### Component Token

```json
{
  "$extensions": {
    "lufa": {
      "level": "component",
      "themeable": true,   ← Always true
      "modeAware": true    ← Always true
      // Can have modes, or inherit from semantic
    }
  }
}
```

**CSS:** In `:root` + mode selectors (if has modes)

---

### Layout Token

```json
{
  "$extensions": {
    "lufa": {
      "level": "layout",
      "themeable": false,  ← Always false
      "modeAware": false   ← Always false
    }
  }
}
```

**CSS:** Only in `:root`, NO mode/theme selectors

---

## ✅ Validation Rules (Must Pass!)

| Rule   | Check                                                         |
| ------ | ------------------------------------------------------------- |
| **R1** | Primitive tokens: `themeable: false` AND `modeAware: false`   |
| **R2** | Tokens with `modes` object: `modeAware: true`                 |
| **R3** | Primitive tokens: CANNOT have `modes` object                  |
| **R4** | Layout tokens: `themeable: false` AND `modeAware: false`      |
| **R5** | Core/Semantic tokens: `themeable: true` AND `modeAware: true` |

---

## 🔧 Migration Commands

### Primitives

```bash
node scripts/migrate-primitive-metadata.js
npm run validate:tokens
npm run build:tokens
```

### Semantic

```bash
node scripts/migrate-semantic-metadata.js
npm run validate:tokens
npm run build:tokens
```

---

## 🚨 Common Mistakes

### ❌ DON'T: Mode-Aware Primitive

```json
{
  "primitive": {
    "color": {
      "surface": {
        "modes": {
          /* ❌ WRONG! */
        }
      }
    }
  }
}
```

### ✅ DO: Mode-Aware Semantic

```json
{
  "core": {
    "surface": {
      "primary": {
        "modes": {
          /* ✅ CORRECT! */
        }
      }
    }
  }
}
```

---

## 📊 Decision Tree

```
New token?
  │
  ├─ Raw value (hex, px, ms)?
  │  └─ YES → PRIMITIVE
  │           (themeable: false, modeAware: false)
  │
  └─ NO → Changes by mode?
          │
          ├─ YES → SEMANTIC/COMPONENT
          │        (themeable: true, modeAware: true)
          │        Add modes object!
          │
          └─ NO → Structural constant?
                  └─ YES → LAYOUT
                           (themeable: false, modeAware: false)
```

---

## 🎨 Example Flow

```
PRIMITIVE:
  blue-600 = #2563eb  (constant)
         ↓
SEMANTIC:
  brand-primary
    - light: blue-600  (#2563eb)
    - dark: blue-400   (#60a5fa)
         ↓
COMPONENT:
  button-primary-bg
    → brand-primary
         ↓
BROWSER:
  Light: #2563eb
  Dark:  #60a5fa
```

---

## 📝 Phase Checklist

- [ ] **Phase 1:** Validation setup (8h)
- [ ] **Phase 2:** Primitives migration (12h)
- [ ] **Phase 3:** Semantic migration (8h)
- [ ] **Phase 4:** Config update (12h)
- [ ] **Phase 5:** Docs & tests (16h)
- [ ] **Phase 6:** Rollout (8h)

**Total:** 64 hours (~8 days)

---

## 🔄 Quick Rollback

```bash
# Revert CSS config
git revert <commit>
npm run build:tokens
npm publish

# Revert metadata
git revert <commit-range>
npm run build:tokens
npm publish
```

---

## 📞 Help

- **Full ADR:** `ADR-011-token-architecture-primitives-immutable.md`
- **Checklist:** `ADR-011-implementation-checklist.md`
- **Visual Guide:** `ADR-011-visual-guide.md`
- **README:** `ADR-011-README.md`

**Questions?** Team channel or office hours

---

## 🎓 Key Quotes

> "Primitives are like paint cans on a shelf - they never change color. Semantic tokens are recipes that pick different cans based on context."

> "If it's a raw value (hex, px, ms), it's a primitive. If it has meaning (brand, surface, action), it's semantic."

> "Mode switching happens at the semantic layer, not the primitive layer."

---

**Version:** 1.0  
**Date:** 2026-01-27  
**Status:** Proposed

---

_Print this card and refer to it while implementing ADR-011_
