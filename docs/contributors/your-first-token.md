# 🎨 Your First Token - Quick Start Guide

**⏱️ Reading time:** 5 minutes  
**Part of:** Lufa Design System v2.0 - Phase 0 Action #2  
**For:** Contributors adding or modifying design tokens

---

## 📚 What You'll Learn

- ✅ What a design token is and why metadata matters
- ✅ The 4-level token architecture (Primitives → Core → Semantic → Component)
- ✅ How to create a well-documented token with VSCode snippets
- ✅ How to validate your tokens before committing

---

## 🤔 What is a Design Token?

A **design token** is a design decision stored as data. Instead of hard-coding values like `#2563eb` or `16px` in components, we reference named tokens like `{color.primary}` or `{spacing.default}`.

**Benefits:**

- 🎨 **Consistency** - Same values used everywhere
- 🔄 **Themability** - Change themes without touching components
- 🐛 **Maintainability** - Update one token, change entire system
- 📖 **Documentation** - Tokens are self-documenting with metadata

---

## 🏗️ Token Architecture: 4 Levels

Lufa Design System v2.0 uses a **4-level cascade architecture**:

```
┌─────────────────────────────────────────────┐
│  Level 3: Component Tokens                  │
│  {component.button.background}              │
│  "Button background color in default state" │
└─────────────────┬───────────────────────────┘
                  │ references ↓
┌─────────────────▼───────────────────────────┐
│  Level 2: Semantic Tokens                   │
│  {semantic.action.primary.background}       │
│  "Background for primary actions"           │
└─────────────────┬───────────────────────────┘
                  │ references ↓
┌─────────────────▼───────────────────────────┐
│  Level 1: Core Tokens                       │
│  {core.primary}                             │
│  "Primary brand color"                      │
└─────────────────┬───────────────────────────┘
                  │ references ↓
┌─────────────────▼───────────────────────────┐
│  Level 0: Primitives                        │
│  {primitive.blue.600}                       │
│  #2563eb (raw value)                        │
└─────────────────────────────────────────────┘
```

**Performance validated:** 8.00ms << 16ms (60fps) ✅  
**See:** `_bmad-output/pocs/performance-results.md`

---

## ✨ Required Token Metadata

Every token in Lufa **MUST** include 3 pieces of metadata:

### 1. `$description` (string)

**Purpose:** Human-readable explanation of the token's purpose and usage.

**Rules:**

- ✅ Minimum 10 characters (meaningful descriptions)
- ✅ Describe **when and why** to use this token
- ❌ Don't just repeat the token name

**Examples:**

```json
✅ GOOD:
"$description": "Primary brand color used for buttons, links, and key actions"

❌ BAD:
"$description": "Primary color"
```

### 2. `$type` (string)

**Purpose:** DTCG (Design Tokens Community Group) standard type.

**Valid types:**

- `color` - Colors, backgrounds, borders
- `dimension` - Spacing, sizing, radius
- `fontFamily` - Font stacks
- `fontWeight` - Font weights (400, 600, etc.)
- `duration` - Animation timings
- `cubicBezier` - Easing curves
- `shadow` - Box shadows
- `border` - Border styles
- `gradient` - Gradients
- `typography` - Composite typography tokens

### 3. `$extensions.lufa.themable` (boolean)

**Purpose:** Indicates if the token can be overridden by themes.

**Rules:**

- `true` - Token can be customized per theme (colors, spacing)
- `false` - Token is constant across themes (primitives, rarely core tokens)

**Examples:**

```json
✅ Themable (varies per theme):
"$extensions": {
  "lufa": {
    "themable": true,
    "level": "semantic"
  }
}

✅ Not themable (fixed value):
"$extensions": {
  "lufa": {
    "themable": false,
    "level": "primitive"
  }
}
```

---

## 🚀 Creating Your First Token

### Step 1: Choose the Right Level

**Ask yourself:**

- Is this a raw value (hex, px)? → **Primitive** (Level 0)
- Is this a brand/system constant? → **Core** (Level 1)
- Does it describe a usage context? → **Semantic** (Level 2)
- Is it component-specific? → **Component** (Level 3)

### Step 2: Use VSCode Snippets

**Available snippets:**

| Snippet                      | Use Case                              |
| ---------------------------- | ------------------------------------- |
| `lufa-token-color`           | Create a color token                  |
| `lufa-token-dimension`       | Create spacing/sizing token           |
| `lufa-token-ref`             | Reference another token               |
| `lufa-token-primitive-color` | Create primitive color (raw)          |
| `lufa-token-core`            | Create core token (ref primitive)     |
| `lufa-token-semantic`        | Create semantic token (ref core)      |
| `lufa-token-component`       | Create component token (ref semantic) |

**To use:**

1. Open a `.json` file in `packages/design-system/tokens/src/`
2. Type snippet prefix (e.g., `lufa-token-color`)
3. Press `Tab` to expand
4. Fill in values (use `Tab` to navigate fields)

### Step 3: Example - Creating a Primitive Color

**Type:** `lufa-token-primitive-color` + `Tab`

**Result:**

```json
"blue": {
  "600": {
    "$value": "#2563eb",
    "$type": "color",
    "$description": "Blue shade 600 - mid-tone blue from color palette",
    "$extensions": {
      "lufa": {
        "themable": false,
        "level": "primitive"
      }
    }
  }
}
```

### Step 4: Example - Creating a Core Token (References Primitive)

**Type:** `lufa-token-core` + `Tab`

**Result:**

```json
"primary": {
  "$value": "{primitive.blue.600}",
  "$type": "color",
  "$description": "Primary brand color, referenced from blue primitive",
  "$extensions": {
    "lufa": {
      "themable": true,
      "level": "core"
    }
  }
}
```

### Step 5: Example - Creating a Semantic Token (References Core)

**Type:** `lufa-token-semantic` + `Tab`

**Result:**

```json
"action": {
  "primary": {
    "background": {
      "$value": "{core.primary}",
      "$type": "color",
      "$description": "Background color for primary actions like buttons and links",
      "$extensions": {
        "lufa": {
          "themable": true,
          "level": "semantic"
        }
      }
    }
  }
}
```

### Step 6: Example - Creating a Component Token (References Semantic)

**Type:** `lufa-token-component` + `Tab`

**Result:**

```json
"button": {
  "background": {
    "$value": "{semantic.action.primary.background}",
    "$type": "color",
    "$description": "Button background color in default state",
    "$extensions": {
      "lufa": {
        "themable": true,
        "level": "component"
      }
    }
  }
}
```

---

## ✅ Validating Your Tokens

Before committing, **always validate** your tokens:

```bash
# Run validation script
pnpm validate:tokens
```

**What it checks:**

- ✅ `$description` exists and is meaningful (>10 chars)
- ✅ `$type` is a valid DTCG type
- ✅ `$extensions.lufa.themable` is defined
- ✅ JSON syntax is valid

**Example output (success):**

```
🔍 Token Metadata Validation Report
================================================================================

Total Tokens Validated: 24
✓ Valid Tokens: 24
✗ Tokens with Errors: 0
⚠ Warnings: 0

✓ All tokens have valid metadata!
```

**Example output (errors):**

```
━━━ ERRORS (2) ━━━

packages/design-system/tokens/src/colors.json
  ✗ color.primary
    Missing required field: $description

  ✗ color.secondary
    Missing $extensions.lufa.themable (should be true or false)
```

---

## 🚦 Token Creation Checklist

Before you commit:

- [ ] Token has a meaningful `$description` (>10 chars)
- [ ] Token has the correct `$type` (color, dimension, etc.)
- [ ] Token has `$extensions.lufa.themable` set to `true` or `false`
- [ ] Token is at the right level (primitive, core, semantic, component)
- [ ] Token references are correct (e.g., `{core.primary}`)
- [ ] Validation passes: `pnpm validate:tokens` ✅
- [ ] Token is documented (this metadata IS the documentation!)

---

## 📖 Token Naming Conventions

### Primitives (Level 0)

```
{category}.{variant}.{shade}
{primitive.blue.600}
{primitive.spacing.16}
```

### Core (Level 1)

```
{category}.{name}
{core.primary}
{core.spacing.default}
```

### Semantic (Level 2)

```
{context}.{variant}.{property}
{semantic.action.primary.background}
{semantic.feedback.error.text}
```

### Component (Level 3)

```
{component}.{property}.{state}
{component.button.background.default}
{component.input.border.focus}
```

---

## 🎓 Advanced Topics

### Token References (Cascade)

Tokens can reference other tokens using `{path.to.token}` syntax:

```json
// Primitive (raw value)
"primitive": {
  "blue": {
    "600": {
      "$value": "#2563eb",
      "$type": "color"
    }
  }
}

// Core (references primitive)
"core": {
  "primary": {
    "$value": "{primitive.blue.600}",
    "$type": "color"
  }
}

// Semantic (references core)
"semantic": {
  "action": {
    "primary": {
      "background": {
        "$value": "{core.primary}",
        "$type": "color"
      }
    }
  }
}
```

**Why cascade?**

- Change `primitive.blue.600` → Updates all tokens referencing it
- Override `core.primary` in a theme → Affects all semantic/component tokens
- **Performance:** Validated at 8.00ms << 16ms (60fps) ✅

### Themability Strategy

**Themable (`true`):**

- Colors (brand, semantic, component)
- Spacing (if themes have different densities)
- Typography (if fonts change per theme)

**Not Themable (`false`):**

- Primitives (raw values)
- System constants (z-index, breakpoints)
- Fixed values (rarely changes)

---

## 🐛 Common Mistakes

### ❌ Missing Description

```json
// BAD - No description
"primary": {
  "$value": "{primitive.blue.600}",
  "$type": "color"
}
```

### ❌ Description Too Short

```json
// BAD - Not descriptive enough
"primary": {
  "$value": "{primitive.blue.600}",
  "$type": "color",
  "$description": "Primary"
}
```

### ❌ Missing Themable

```json
// BAD - No themable field
"primary": {
  "$value": "{primitive.blue.600}",
  "$type": "color",
  "$description": "Primary brand color",
  "$extensions": {
    "lufa": {
      "level": "core"
    }
  }
}
```

### ✅ Correct Token

```json
// GOOD - All metadata present
"primary": {
  "$value": "{primitive.blue.600}",
  "$type": "color",
  "$description": "Primary brand color used for buttons, links, and key actions",
  "$extensions": {
    "lufa": {
      "themable": true,
      "level": "core"
    }
  }
}
```

---

## 🔗 Resources

- **Validation Script:** `scripts/validate-token-metadata.js`
- **VSCode Snippets:** `.vscode/lufa-tokens.code-snippets`
- **Performance POC:** `_bmad-output/pocs/performance-results.md`
- **Roadmap:** `_bmad-output/analysis/roadmap-implementation-v2.0.md`
- **DTCG Spec:** https://design-tokens.github.io/community-group/format/

---

## 💬 Questions?

- **GitHub Discussions:** (coming soon)
- **Internal Slack:** #lufa-design-system
- **Documentation:** `packages/design-system/docusaurus/` (coming in Phase 2)

---

**Happy tokenizing! 🎨**

_This guide is part of Lufa Design System v2.0 implementation._
