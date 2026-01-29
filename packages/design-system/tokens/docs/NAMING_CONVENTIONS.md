# Design Tokens - Naming Conventions

This document defines the naming conventions for Lufa Design System tokens, including guidelines for the `themable` attribute.

---

## 🎯 Table of Contents

1. [General Principles](#general-principles)
2. [Token Naming Structure](#token-naming-structure)
3. [Naming by Token Level](#naming-by-token-level)
4. [Themable Naming Conventions](#themable-naming-conventions)
5. [Examples](#examples)
6. [Validation](#validation)

---

## 📖 General Principles

### 1. Consistency First

All token names follow predictable patterns that make them easy to discover and use.

### 2. Semantic Over Visual

Token names describe **purpose**, not appearance (except at primitive level).

```json
// ✅ GOOD - Semantic naming
{
  "button": {
    "primary": {
      "background": { "$value": "{color.brand.primary}" }
    }
  }
}

// ❌ BAD - Visual naming at semantic level
{
  "button": {
    "blue": {
      "background": { "$value": "{color.blue.600}" }
    }
  }
}
```

### 3. Hierarchical Structure

Tokens are organized in a 4-level hierarchy:

```
primitive → core → semantic → component
```

Each level builds upon the previous one.

---

## 🏗️ Token Naming Structure

### CSS Variable Format

All tokens generate CSS variables following this pattern:

```
--{prefix}-{level}-{category}-{name}[-{variant}]
```

**Components:**

- `prefix`: Always `lufa`
- `level`: `primitive`, `core`, `semantic`, `component`
- `category`: Type of token (color, spacing, etc.)
- `name`: Descriptive name
- `variant`: Optional variant (hover, active, etc.)

### Examples

```css
/* Primitive */
--lufa-primitive-color-blue-600
--lufa-primitive-spacing-16

/* Core */
--lufa-core-brand-primary
--lufa-core-text-body

/* Semantic */
--lufa-semantic-ui-background-primary
--lufa-semantic-interactive-hover-opacity

/* Component */
--lufa-component-button-primary-background
--lufa-component-input-border-color
```

---

## 📊 Naming by Token Level

### Primitive Level

**Purpose:** Raw values with no semantic meaning

**Format:** `{category}.{subcategory}.{value}`

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$type": "color",
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themable": true, // Colors are always themable
              "category": "primitive"
            }
          }
        }
      }
    },
    "spacing": {
      "16": {
        "$type": "dimension",
        "$value": "16px",
        "$extensions": {
          "lufa": {
            "themable": false, // Dimensions are never themable
            "category": "primitive"
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
--lufa-primitive-color-blue-600: #2563eb;
--lufa-primitive-spacing-16: 16px;
```

---

### Core Level

**Purpose:** Global design decisions (brand colors, base typography)

**Format:** `{category}.{purpose}.{variant?}`

```json
{
  "core": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
            "themable": true, // Inherits from referenced token
            "category": "core"
          }
        }
      }
    },
    "text": {
      "body": {
        "$type": "color",
        "$value": "{primitive.color.neutral.700}",
        "$extensions": {
          "lufa": {
            "themable": true,
            "category": "core"
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
--lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
--lufa-core-text-body: var(--lufa-primitive-color-neutral-700);
```

---

### Semantic Level

**Purpose:** Contextual tokens for specific use cases

**Format:** `{context}.{element}.{property}[-{state}]`

```json
{
  "semantic": {
    "ui": {
      "background": {
        "primary": {
          "$type": "color",
          "$value": "{core.neutral.white}",
          "$extensions": {
            "lufa": {
              "themable": true,
              "category": "semantic"
            }
          }
        }
      }
    },
    "interactive": {
      "hover": {
        "opacity": {
          "$type": "number",
          "$value": "0.8",
          "$extensions": {
            "lufa": {
              "themable": false, // Numeric values are not themable
              "category": "semantic"
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
--lufa-semantic-ui-background-primary: var(--lufa-core-neutral-white);
--lufa-semantic-interactive-hover-opacity: 0.8;
```

---

### Component Level

**Purpose:** Component-specific tokens

**Format:** `{component}.{variant}.{element}.{property}[-{state}]`

```json
{
  "component": {
    "button": {
      "primary": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{core.brand.primary}",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component"
              }
            }
          },
          "hover": {
            "$type": "color",
            "$value": "{core.brand.primary-dark}",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component"
              }
            }
          }
        },
        "padding": {
          "$type": "dimension",
          "$value": "{primitive.spacing.16}",
          "$extensions": {
            "lufa": {
              "themable": false, // Dimensions remain constant
              "category": "component"
            }
          }
        }
      }
    }
  }
}
```

**CSS Output:**

```css
--lufa-component-button-primary-background-default: var(--lufa-core-brand-primary);
--lufa-component-button-primary-background-hover: var(--lufa-core-brand-primary-dark);
--lufa-component-button-primary-padding: var(--lufa-primitive-spacing-16);
```

---

## 🎨 Themable Naming Conventions

### Rule 1: Color Tokens

All color tokens **must** include `themable: true` regardless of their level.

**Naming Pattern:**

- Use descriptive names: `primary`, `secondary`, `danger`, `success`
- Avoid color names at semantic level: `blue`, `red` (except primitives)
- Include state variants: `default`, `hover`, `active`, `disabled`

```json
{
  "semantic": {
    "feedback": {
      "success": {
        "background": {
          "$type": "color",
          "$value": "{primitive.color.green.50}",
          "$extensions": {
            "lufa": {
              "themable": true,
              "category": "semantic",
              "subcategory": "feedback"
            }
          },
          "$description": "Success feedback background color"
        }
      }
    }
  }
}
```

**CSS Variable:** `--lufa-semantic-feedback-success-background`

---

### Rule 2: Shadow Tokens

Shadow tokens **must** include `themable: true`.

**Naming Pattern:**

- Use elevation levels: `sm`, `md`, `lg`, `xl`
- Or semantic names: `card`, `modal`, `dropdown`

```json
{
  "semantic": {
    "ui": {
      "shadow": {
        "card": {
          "$type": "shadow",
          "$value": "{primitive.shadow.elevation.md}",
          "$extensions": {
            "lufa": {
              "themable": true,
              "category": "semantic"
            }
          },
          "$description": "Shadow for card components"
        }
      }
    }
  }
}
```

**CSS Variable:** `--lufa-semantic-ui-shadow-card`

---

### Rule 3: Dimension Tokens

Dimension tokens **must** include `themable: false`.

**Naming Pattern:**

- Spacing: Use numeric scale: `4`, `8`, `16`, `24`, `32`, etc.
- Sizing: Use t-shirt sizes: `xs`, `sm`, `md`, `lg`, `xl`
- Or semantic names: `header-height`, `sidebar-width`

```json
{
  "semantic": {
    "layout": {
      "header": {
        "height": {
          "$type": "dimension",
          "$value": "{primitive.height.64}",
          "$extensions": {
            "lufa": {
              "themable": false,
              "category": "semantic"
            }
          },
          "$description": "Standard header height"
        }
      }
    }
  }
}
```

**CSS Variable:** `--lufa-semantic-layout-header-height`

---

### Rule 4: State Variants

When naming state variants, follow this order:

1. `default` - Base state (can be omitted if obvious)
2. `hover` - Mouse hover state
3. `active` - Active/pressed state
4. `focus` - Keyboard focus state
5. `disabled` - Disabled state

```json
{
  "component": {
    "button": {
      "primary": {
        "background": {
          "default": {
            "$type": "color",
            "$value": "{core.brand.primary}",
            "$extensions": { "lufa": { "themable": true } }
          },
          "hover": {
            "$type": "color",
            "$value": "{core.brand.primary-dark}",
            "$extensions": { "lufa": { "themable": true } }
          },
          "active": {
            "$type": "color",
            "$value": "{core.brand.primary-darker}",
            "$extensions": { "lufa": { "themable": true } }
          },
          "disabled": {
            "$type": "color",
            "$value": "{core.neutral.300}",
            "$extensions": { "lufa": { "themable": true } }
          }
        }
      }
    }
  }
}
```

---

## 📝 Examples

### Example 1: Button Component (Complete)

```json
{
  "component": {
    "button": {
      "$description": "Button component tokens",
      "primary": {
        "$description": "Primary button variant",
        "background": {
          "default": {
            "$type": "color",
            "$value": "{core.brand.primary}",
            "$description": "Primary button background color (default state)",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component",
                "subcategory": "button"
              }
            }
          },
          "hover": {
            "$type": "color",
            "$value": "{core.brand.primary-dark}",
            "$description": "Primary button background color (hover state)",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component",
                "subcategory": "button"
              }
            }
          }
        },
        "text": {
          "$type": "color",
          "$value": "{core.text.inverse}",
          "$description": "Primary button text color",
          "$extensions": {
            "lufa": {
              "themable": true,
              "category": "component",
              "subcategory": "button"
            }
          }
        },
        "padding": {
          "horizontal": {
            "$type": "dimension",
            "$value": "{primitive.spacing.24}",
            "$description": "Primary button horizontal padding",
            "$extensions": {
              "lufa": {
                "themable": false,
                "category": "component",
                "subcategory": "button"
              }
            }
          },
          "vertical": {
            "$type": "dimension",
            "$value": "{primitive.spacing.12}",
            "$description": "Primary button vertical padding",
            "$extensions": {
              "lufa": {
                "themable": false,
                "category": "component",
                "subcategory": "button"
              }
            }
          }
        },
        "border-radius": {
          "$type": "dimension",
          "$value": "{primitive.radius.scale.base}",
          "$description": "Primary button border radius",
          "$extensions": {
            "lufa": {
              "themable": false,
              "category": "component",
              "subcategory": "button"
            }
          }
        },
        "shadow": {
          "default": {
            "$type": "shadow",
            "$value": "{semantic.ui.shadow.sm}",
            "$description": "Primary button shadow (default state)",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component",
                "subcategory": "button"
              }
            }
          },
          "hover": {
            "$type": "shadow",
            "$value": "{semantic.ui.shadow.md}",
            "$description": "Primary button shadow (hover state)",
            "$extensions": {
              "lufa": {
                "themable": true,
                "category": "component",
                "subcategory": "button"
              }
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS Variables:**

```css
/* Colors - themable: true */
--lufa-component-button-primary-background-default: var(--lufa-core-brand-primary);
--lufa-component-button-primary-background-hover: var(--lufa-core-brand-primary-dark);
--lufa-component-button-primary-text: var(--lufa-core-text-inverse);

/* Dimensions - themable: false */
--lufa-component-button-primary-padding-horizontal: var(--lufa-primitive-spacing-24);
--lufa-component-button-primary-padding-vertical: var(--lufa-primitive-spacing-12);
--lufa-component-button-primary-border-radius: var(--lufa-primitive-radius-scale-base);

/* Shadows - themable: true */
--lufa-component-button-primary-shadow-default: var(--lufa-semantic-ui-shadow-sm);
--lufa-component-button-primary-shadow-hover: var(--lufa-semantic-ui-shadow-md);
```

---

## ✅ Validation

### Automated Checks

Run validation to ensure naming conventions are followed:

```bash
# Validate all token metadata (includes themable check)
npm run validate:tokens

# Run themable-specific tests
npm run test:themable
```

### Manual Checklist

When adding new tokens, verify:

- [ ] Token name follows level-appropriate pattern
- [ ] Token has `$description` field (min 10 chars)
- [ ] Token has `$type` field (valid DTCG type)
- [ ] Token has `$extensions.lufa.themable` field
- [ ] `themable` value matches token type rules:
  - `color` → `true`
  - `shadow` → `true`
  - `dimension` → `false`
  - `duration` → `false`
  - `number` → `false`
  - `cubicBezier` → `false`
- [ ] Token path uses kebab-case (no spaces, no camelCase)
- [ ] CSS variable name is predictable and discoverable

---

## 📚 Resources

- **Themable Attribute Guide:** [THEMABLE_ATTRIBUTE.md](./THEMABLE_ATTRIBUTE.md)
- **Usage Guidelines:** [USAGE_GUIDELINES.md](./USAGE_GUIDELINES.md)
- **Token Architecture:** [README.md](./README.md)
- **DTCG Spec:** [Design Tokens Community Group](https://design-tokens.github.io/community-group/)

---

**Last Updated:** January 27, 2026  
**Status:** Active - In use  
**Version:** 2.0.0
