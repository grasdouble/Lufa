# Phase 2 - Core Tokens: Planning Document

**Status:** 🚧 In Progress  
**Date Started:** January 23, 2026  
**Estimated Duration:** 2-3 days  
**Estimated Tokens:** 50-66 tokens

---

## 🎯 Objectives

Create Core Tokens (Level 2) that:

1. Reference primitive tokens using DTCG aliasing (`{primitive.*}`)
2. Use semantic, purpose-driven naming
3. Represent global design decisions
4. Serve as foundation for Semantic (L3) and Component (L4) tokens

---

## 📊 Token Architecture Reminder

```
┌─────────────────────────────────────────────┐
│  Level 4: Component Tokens (Phase 4)       │ ⬅️ Component-specific
├─────────────────────────────────────────────┤
│  Level 3: Semantic Tokens (Phase 3)        │ ⬅️ Semantic contexts
├─────────────────────────────────────────────┤
│  🚧 Level 2: Core Tokens (Phase 2)         │ ⬅️ YOU ARE HERE
├─────────────────────────────────────────────┤
│  ✅ Level 1: Primitive Tokens (Phase 1)    │ ⬅️ Raw values (complete)
└─────────────────────────────────────────────┘
```

---

## 🎨 Core Token Categories

### 1. Brand Colors (6-8 tokens)

**Purpose:** Primary brand identity colors

**Proposed tokens:**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$description": "Primary brand color - main actions, links, focus states"
      },
      "primary-hover": {
        "$value": "{primitive.color.blue.700}",
        "$type": "color",
        "$description": "Primary brand hover state"
      },
      "primary-active": {
        "$value": "{primitive.color.blue.800}",
        "$type": "color",
        "$description": "Primary brand active/pressed state"
      },
      "secondary": {
        "$value": "{primitive.color.purple.500}",
        "$type": "color",
        "$description": "Secondary brand color - accents, highlights"
      },
      "secondary-hover": "{primitive.color.purple.600}",
      "secondary-active": "{primitive.color.purple.700}"
    }
  }
}
```

**Questions for validation:**

- ✅ Primary = blue-600? Or prefer blue-500 (lighter) / blue-700 (darker)?
- ✅ Secondary = purple-500? Or prefer another color?
- ✅ Include hover/active states? (recommended)

---

### 2. Neutral Colors (8-10 tokens)

**Purpose:** Backgrounds, surfaces, borders, text colors

**Proposed tokens:**

```json
{
  "core": {
    "neutral": {
      "background": {
        "$value": "{primitive.color.gray.50}",
        "$description": "Page background color"
      },
      "surface": "{primitive.color.gray.100}",
      "surface-hover": "{primitive.color.gray.200}",
      "border": "{primitive.color.gray.300}",
      "border-strong": "{primitive.color.gray.400}",
      "text-primary": "{primitive.color.gray.900}",
      "text-secondary": "{primitive.color.gray.600}",
      "text-tertiary": "{primitive.color.gray.500}",
      "text-disabled": "{primitive.color.gray.400}"
    }
  }
}
```

**Questions:**

- ✅ Background = gray-50 (very light)?
- ✅ Text primary = gray-900 (darkest)?
- ✅ Need text-tertiary + text-disabled?

---

### 3. Semantic Colors (12-16 tokens)

**Purpose:** Feedback states (success, error, warning, info)

**Proposed tokens:**

```json
{
  "core": {
    "semantic": {
      "success": "{primitive.color.green.500}",
      "success-subtle": "{primitive.color.green.100}",
      "success-border": "{primitive.color.green.300}",
      "success-hover": "{primitive.color.green.600}",

      "error": "{primitive.color.red.600}",
      "error-subtle": "{primitive.color.red.100}",
      "error-border": "{primitive.color.red.300}",
      "error-hover": "{primitive.color.red.700}",

      "warning": "{primitive.color.yellow.500}",
      "warning-subtle": "{primitive.color.yellow.100}",
      "warning-border": "{primitive.color.yellow.300}",
      "warning-hover": "{primitive.color.yellow.600}",

      "info": "{primitive.color.blue.500}",
      "info-subtle": "{primitive.color.blue.100}",
      "info-border": "{primitive.color.blue.300}",
      "info-hover": "{primitive.color.blue.600}"
    }
  }
}
```

**Questions:**

- ✅ Standard semantic mappings OK?
- ✅ Include subtle/border/hover variants?

---

### 4. Layout Spacing (8-10 tokens)

**Purpose:** Page-level spacing and layout dimensions

**Proposed tokens:**

```json
{
  "core": {
    "layout": {
      "page-padding": "{primitive.spacing.24}",
      "page-padding-mobile": "{primitive.spacing.16}",
      "section-gap": "{primitive.spacing.64}",
      "section-gap-mobile": "{primitive.spacing.48}",
      "container-max-width": "1280px",
      "header-height": "{primitive.spacing.64}",
      "sidebar-width": "280px",
      "content-max-width": "720px"
    }
  }
}
```

**Questions:**

- ✅ Page padding = 24px (desktop) / 16px (mobile)?
- ✅ Section gap = 64px (desktop) / 48px (mobile)?
- ✅ Container max-width = 1280px? (standard)

---

### 5. Component Spacing (8-12 tokens)

**Purpose:** Common component internal spacing

**Proposed tokens:**

```json
{
  "core": {
    "component": {
      "button-padding-x": "{primitive.spacing.16}",
      "button-padding-y": "{primitive.spacing.8}",
      "button-gap": "{primitive.spacing.8}",

      "input-height": "{primitive.spacing.40}",
      "input-padding-x": "{primitive.spacing.12}",
      "input-padding-y": "{primitive.spacing.8}",

      "card-padding": "{primitive.spacing.24}",
      "card-gap": "{primitive.spacing.16}",

      "modal-padding": "{primitive.spacing.32}",
      "modal-max-width": "600px"
    }
  }
}
```

**Questions:**

- ✅ Button padding = 16px horizontal / 8px vertical?
- ✅ Input height = 40px? (standard clickable area)
- ✅ Card padding = 24px?

---

### 6. Typography Aliases (8-10 tokens)

**Purpose:** Typography decisions for common use cases

**Proposed tokens:**

```json
{
  "core": {
    "typography": {
      "heading-font": "{primitive.typography.font-family.sans}",
      "body-font": "{primitive.typography.font-family.sans}",
      "code-font": "{primitive.typography.font-family.mono}",

      "heading-weight": "{primitive.typography.font-weight.bold}",
      "body-weight": "{primitive.typography.font-weight.normal}",
      "strong-weight": "{primitive.typography.font-weight.semibold}",

      "body-size": "{primitive.typography.font-size.base}",
      "body-line-height": "{primitive.typography.line-height.normal}",

      "small-size": "{primitive.typography.font-size.sm}",
      "small-line-height": "{primitive.typography.line-height.normal}"
    }
  }
}
```

**Questions:**

- ✅ Same font for headings and body? (system sans)
- ✅ Heading weight = bold (700)?
- ✅ Body line-height = normal (1.5)?

---

## 📁 File Structure to Create

```
src/
├── primitives/           ✅ (Phase 1 - complete)
└── core/                 🆕 (Phase 2 - to create)
    ├── index.json
    ├── brand/
    │   └── colors.json
    ├── neutral/
    │   └── colors.json
    ├── semantic/
    │   └── colors.json
    ├── layout/
    │   └── spacing.json
    ├── component/
    │   └── spacing.json
    └── typography/
        └── aliases.json
```

---

## 🔧 Build Configuration Updates Needed

Update `style-dictionary.config.js`:

```javascript
export default {
  source: [
    'src/primitives/**/*.json', // Existing
    'src/core/**/*.json', // Add this
  ],
  // ... rest of config
};
```

---

## ✅ Validation Checklist

Before we start creating files, please validate:

### Brand Colors

- [ ] Primary = blue-600? (or specify different shade)
- [ ] Secondary = purple-500? (or specify different color)
- [ ] Include hover/active states?

### Neutral Colors

- [ ] Background = gray-50 (very light)?
- [ ] Text primary = gray-900 (darkest)?
- [ ] Need tertiary + disabled text colors?

### Semantic Colors

- [ ] Success = green-500 ✅
- [ ] Error = red-600 ✅
- [ ] Warning = yellow-500 ✅
- [ ] Info = blue-500 ✅
- [ ] Include subtle/border/hover variants?

### Layout Spacing

- [ ] Page padding = 24px desktop / 16px mobile?
- [ ] Section gap = 64px desktop / 48px mobile?
- [ ] Container max-width = 1280px?

### Component Spacing

- [ ] Button padding = 16px horizontal / 8px vertical?
- [ ] Input height = 40px?
- [ ] Card padding = 24px?

### Typography

- [ ] Same font for headings/body (system sans)?
- [ ] Heading weight = bold (700)?
- [ ] Body line-height = 1.5?

---

## 📝 Next Steps

Once validated:

1. ✅ Create file structure (`src/core/`)
2. ✅ Create each category JSON file
3. ✅ Update Style Dictionary config
4. ✅ Build and verify tokens
5. ✅ Test aliasing resolution
6. ✅ Create completion summary

---

## 💡 Notes

- All core tokens MUST reference primitives using `{primitive.*}` syntax
- No hard-coded values allowed in core tokens
- Use English for all descriptions
- Follow DTCG format strictly

---

**Ready to proceed when you validate the proposals above!** 🚀
