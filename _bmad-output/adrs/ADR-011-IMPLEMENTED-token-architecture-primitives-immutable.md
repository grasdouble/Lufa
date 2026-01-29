# ADR-011: Clarify Token Architecture - Primitives as Immutable Constants

**Status:** Proposed  
**Date:** 2026-01-27  
**Deciders:** Architecture Team  
**Context:** Token System Clarification - Phase 2A Extension

---

## Context

The Lufa Design System v0.7.1 currently has a confused token architecture where **primitives are marked as `themable: true`**, violating the fundamental principle that primitives should be immutable constants. This creates several critical problems:

### Current State (INCORRECT)

**Primitives (Layer 1):**

- ❌ Marked as `themable: true` in token metadata
- ❌ No clear distinction from semantic tokens
- ❌ Implies these values can change (they shouldn't)

```json
// packages/design-system/tokens/src/primitives/color/palette.json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$extensions": {
            "lufa": {
              "themable": true // ❌ WRONG - primitives are constants!
            }
          }
        }
      }
    }
  }
}
```

**Core/Semantic (Layer 2):**

- ✅ Correctly has `modes` object with light/dark/high-contrast overrides
- ✅ References different primitives based on mode
- ⚠️ Also marked as `themable: true` (correct, but confusing when primitives are also themable)

```json
// packages/design-system/tokens/src/core/brand/colors.json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
            "modes": {
              "light": "{primitive.color.blue.600}", // References primitive
              "dark": "{primitive.color.blue.500}", // Different primitive
              "high-contrast": "{primitive.color.hc.blue}"
            },
            "themable": true // ✅ CORRECT - semantic tokens ARE themable
          }
        }
      }
    }
  }
}
```

### Problems with Current Architecture

1. **Semantic Confusion:**
   - Developers don't understand which tokens actually change
   - `themable: true` on primitives implies they vary by mode/theme
   - Violates the immutability principle of design tokens

2. **CSS Generation Ambiguity:**
   - Should primitives generate `[data-mode]` selectors? (NO)
   - Should they generate `[data-theme]` selectors? (NO)
   - Current config doesn't distinguish based on layer

3. **Mode vs Theme Conflation:**
   - Mode switching (light/dark/high-contrast) happens at semantic layer
   - Theme switching (default/ocean/forest) will happen at semantic layer (Phase 6)
   - But primitives suggest they participate in both

4. **Validation Gaps:**
   - No automated checks prevent primitives from having mode overrides
   - No enforcement of immutability principle
   - Could accidentally add modes to primitives

### Industry Standards

**Material Design 3:**

- **Reference tokens** (primitives) = immutable, never change
- **System tokens** (semantic) = reference different primitives based on scheme
- **Component tokens** = reference system tokens

**Tailwind CSS:**

- **Color palette** = fixed constants (blue-600 is always #2563eb)
- **Theme configuration** = semantic mapping to palette values
- Clear separation between constants and configuration

**Chakra UI:**

- **Colors** = primitive values (immutable)
- **Semantic tokens** = map to different colors based on color mode
- Explicit `_light` and `_dark` properties on semantic tokens only

---

## Decision

We will **clarify the token architecture** by introducing explicit metadata that distinguishes immutable primitives from mode-aware semantic tokens.

### Four-Layer Architecture with Clear Metadata

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: LAYOUT                                             │
│ themeable: FALSE  │  modeAware: FALSE                      │
│ Examples: grid columns, container widths, breakpoints      │
│ CSS: No [data-theme] or [data-mode] selectors             │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ references
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: COMPONENT                                          │
│ themeable: TRUE  │  modeAware: TRUE                        │
│ Examples: button-bg, input-border, card-shadow            │
│ CSS: HAS [data-theme] and [data-mode] selectors           │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ references
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: CORE/SEMANTIC                                      │
│ themeable: TRUE  │  modeAware: TRUE                        │
│ Examples: brand-primary, text-primary, bg-surface         │
│ CSS: HAS [data-theme] and [data-mode] selectors           │
│ References DIFFERENT primitives based on mode/theme       │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │ references
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: PRIMITIVES                                         │
│ themeable: FALSE  │  modeAware: FALSE                      │
│ Examples: blue-600, spacing-4, font-size-base             │
│ CSS: NO [data-theme] or [data-mode] selectors             │
│ IMMUTABLE CONSTANTS - never change                        │
└─────────────────────────────────────────────────────────────┘
```

### New Metadata Schema

```typescript
interface TokenMetadata {
  level: 'primitive' | 'core' | 'semantic' | 'component' | 'layout';

  // NEW: Explicit themeable flag
  themeable: boolean;

  // NEW: Explicit mode-aware flag
  modeAware: boolean;

  // EXISTING: Mode overrides (only valid if modeAware: true)
  modes?: {
    light: string;
    dark: string;
    'high-contrast': string;
  };

  // FUTURE: Theme overrides (only valid if themeable: true)
  themes?: {
    default: string;
    ocean: string;
    forest: string;
  };
}
```

### Token Examples After Migration

#### Primitive Token (IMMUTABLE)

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$description": "Base blue color - constant value",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "category": "color",
              "themeable": false, // ✅ NEW: Explicitly not themeable
              "modeAware": false // ✅ NEW: Explicitly not mode-aware
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS:**

```css
:root {
  --lufa-primitive-color-blue-600: #2563eb;
  /* NO [data-mode] or [data-theme] selectors */
}
```

#### Core/Semantic Token (MODE-AWARE)

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$type": "color",
        "$description": "Primary brand color - varies by mode",
        "$extensions": {
          "lufa": {
            "level": "core",
            "category": "brand",
            "themeable": true, // ✅ Can vary by theme (Phase 6)
            "modeAware": true, // ✅ NEW: Explicitly mode-aware
            "modes": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.400}",
              "high-contrast": "{primitive.color.hc.blue}"
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS:**

```css
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
}

[data-mode='dark'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-400);
}

[data-mode='high-contrast'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-hc-blue);
}
```

#### Layout Token (STRUCTURAL CONSTANT)

```json
{
  "layout": {
    "container": {
      "max-width": {
        "$value": "1280px",
        "$type": "dimension",
        "$extensions": {
          "lufa": {
            "level": "layout",
            "themeable": false, // ✅ Structural constant
            "modeAware": false // ✅ Doesn't vary by mode
          }
        }
      }
    }
  }
}
```

---

## Consequences

### Positive

#### 1. Clear Mental Model

```
Primitives = Constants (like #2563eb, 16px, 500)
  ↓
Semantic = Meaning (what changes by mode/theme)
  ↓
Component = Usage (button background, card border)
  ↓
Layout = Structure (grid, containers)
```

#### 2. Automated Validation

```javascript
// build/validators/token-consistency.js

function validateTokenMetadata(token) {
  const { level, themeable, modeAware, modes, themes } = token.$extensions.lufa;

  // Rule 1: Primitives cannot be themeable or mode-aware
  if (level === 'primitive' && (themeable || modeAware)) {
    throw new Error(`Primitive token "${token.path.join('.')}" cannot have themeable=true or modeAware=true`);
  }

  // Rule 2: Only mode-aware tokens can have modes
  if (modes && !modeAware) {
    throw new Error(`Token "${token.path.join('.')}" has modes but modeAware=false`);
  }

  // Rule 3: Only themeable tokens can have themes
  if (themes && !themeable) {
    throw new Error(`Token "${token.path.join('.')}" has themes but themeable=false`);
  }

  // Rule 4: Layout tokens are always structural constants
  if (level === 'layout' && (themeable || modeAware)) {
    throw new Error(`Layout token "${token.path.join('.')}" must have themeable=false and modeAware=false`);
  }
}
```

#### 3. Correct CSS Generation

```javascript
// style-dictionary.config.js - Updated format

StyleDictionary.registerFormat({
  name: 'css/variables-with-modes',
  format: ({ dictionary, options }) => {
    const prefix = options.prefix || 'lufa';

    // Filter tokens by mode-awareness
    const modeAwareTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware === true);

    const immutableTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware !== true);

    let output = ':root {\n';

    // 1. Immutable tokens (primitives, layout) - NO mode selectors
    immutableTokens.forEach((token) => {
      const cssVar = `--${prefix}-${token.path.join('-')}`;
      output += `  ${cssVar}: ${token.value};\n`;
    });

    // 2. Mode-aware tokens (core, semantic, component) - light mode
    modeAwareTokens.forEach((token) => {
      const cssVar = `--${prefix}-${token.path.join('-')}`;
      const lightValue = token.$extensions.lufa.modes.light;
      output += `  ${cssVar}: ${lightValue};\n`;
    });

    output += '}\n\n';

    // 3. Dark mode overrides
    if (modeAwareTokens.length > 0) {
      output += "[data-mode='dark'] {\n";
      modeAwareTokens.forEach((token) => {
        const cssVar = `--${prefix}-${token.path.join('-')}`;
        const darkValue = token.$extensions.lufa.modes.dark;
        output += `  ${cssVar}: ${darkValue};\n`;
      });
      output += '}\n\n';

      // 4. High-contrast mode overrides
      output += "[data-mode='high-contrast'] {\n";
      modeAwareTokens.forEach((token) => {
        const cssVar = `--${prefix}-${token.path.join('-')}`;
        const hcValue = token.$extensions.lufa.modes['high-contrast'];
        output += `  ${cssVar}: ${hcValue};\n`;
      });
      output += '}\n';
    }

    return output;
  },
});
```

#### 4. Documentation Clarity

Developers can now clearly understand:

- **Primitives:** Reference values that never change
- **Semantic:** Tokens that map to different primitives based on context
- **Mode switching:** Happens only at semantic/component layers
- **Theme switching:** Will happen only at semantic/component layers (Phase 6)

#### 5. Future-Proof for Themes

When Phase 6 implements theme variants:

```json
{
  "core": {
    "brand": {
      "primary": {
        "$extensions": {
          "lufa": {
            "themeable": true,
            "modeAware": true,
            "modes": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.400}"
            },
            "themes": {
              "ocean": {
                "light": "{primitive.color.cyan.600}",
                "dark": "{primitive.color.cyan.400}"
              },
              "forest": {
                "light": "{primitive.color.green.600}",
                "dark": "{primitive.color.green.400}"
              }
            }
          }
        }
      }
    }
  }
}
```

### Negative

#### 1. Migration Effort

- **~500 primitive tokens** need metadata updates
- **~100 semantic/core tokens** need `modeAware: true` added
- **~50 component tokens** need `modeAware: true` added
- Risk of human error during manual updates

**Mitigation:** Automated migration script (see Implementation Plan)

#### 2. Backward Compatibility

- Existing documentation assumes `themable: true` on primitives
- External tools may rely on current metadata structure
- Storybook integration may need updates

**Mitigation:** Version bump to v0.8.0, clear migration guide

#### 3. Breaking Change for Consumers

If consumers are reading token metadata programmatically:

```typescript
// Before
if (token.$extensions.lufa.themable) { ... }

// After
if (token.$extensions.lufa.themeable && token.$extensions.lufa.modeAware) { ... }
```

**Mitigation:** Deprecation period where both old and new formats coexist

### Neutral

#### 1. No Visual Changes

- CSS output remains functionally identical
- Only metadata and internal structure changes
- Mode switching behavior unchanged

#### 2. File Size Impact

- Metadata adds ~50 bytes per token
- Total increase: ~25KB uncompressed
- Negligible after gzip compression

#### 3. Build Time

- Validation adds ~200ms to build
- Acceptable overhead for correctness guarantees

---

## Implementation Plan

### Phase 1: Add Validation & New Metadata (Week 1)

**Tasks:**

1. **Create validation script**

   ```bash
   packages/design-system/tokens/build/validators/token-consistency.js
   ```

2. **Add new metadata fields to schema**

   ```typescript
   // types/token-metadata.ts
   interface LufaExtensions {
     level: TokenLevel;
     themeable: boolean; // NEW
     modeAware: boolean; // NEW
     modes?: ModeOverrides;
     themes?: ThemeOverrides; // Future
   }
   ```

3. **Run validation in CI**
   ```json
   // package.json
   {
     "scripts": {
       "validate:tokens": "node build/validators/token-consistency.js",
       "prebuild": "npm run validate:tokens"
     }
   }
   ```

**Validation Criteria:**

- ✅ All primitives have `themeable: false` and `modeAware: false`
- ✅ All core/semantic tokens have `themeable: true` and `modeAware: true`
- ✅ Tokens with `modes` object also have `modeAware: true`
- ✅ No primitive has a `modes` object

**Estimated Effort:** 8 hours

---

### Phase 2: Migrate Primitive Tokens (Week 1-2)

**Tasks:**

1. **Create automated migration script**

   ```javascript
   // scripts/migrate-primitive-metadata.js

   const fs = require('fs');
   const glob = require('glob');

   const primitiveFiles = glob.sync('src/primitives/**/*.json');

   primitiveFiles.forEach((file) => {
     const content = JSON.parse(fs.readFileSync(file, 'utf8'));

     // Recursively update metadata
     const updateMetadata = (obj) => {
       if (obj.$extensions?.lufa) {
         obj.$extensions.lufa.themeable = false;
         obj.$extensions.lufa.modeAware = false;

         // Remove themable (typo) if exists
         delete obj.$extensions.lufa.themable;
       }

       Object.values(obj).forEach((value) => {
         if (typeof value === 'object' && value !== null) {
           updateMetadata(value);
         }
       });
     };

     updateMetadata(content);
     fs.writeFileSync(file, JSON.stringify(content, null, 2));
   });
   ```

2. **Run migration**

   ```bash
   node scripts/migrate-primitive-metadata.js
   ```

3. **Manual review**
   - Spot-check 10% of files
   - Run validation to confirm compliance
   - Test build output

**Files to migrate:**

- `src/primitives/color/palette.json` (~200 tokens)
- `src/primitives/spacing/scale.json` (~20 tokens)
- `src/primitives/typography/*.json` (~50 tokens)
- `src/primitives/radius/scale.json` (~10 tokens)
- `src/primitives/shadow/elevation.json` (~8 tokens)
- Other primitive files

**Validation Criteria:**

- ✅ No primitive token has `themable: true`
- ✅ All primitives have `themeable: false` and `modeAware: false`
- ✅ Build succeeds without errors
- ✅ Generated CSS unchanged (diff check)

**Estimated Effort:** 12 hours (includes testing)

---

### Phase 3: Migrate Core/Semantic Tokens (Week 2)

**Tasks:**

1. **Create migration script for semantic tokens**

   ```javascript
   // scripts/migrate-semantic-metadata.js

   const semanticFiles = glob.sync('src/{core,semantic,component}/**/*.json');

   semanticFiles.forEach((file) => {
     const content = JSON.parse(fs.readFileSync(file, 'utf8'));

     const updateMetadata = (obj) => {
       if (obj.$extensions?.lufa) {
         const hasModes = obj.$extensions.lufa.modes != null;

         // Fix typo: themable → themeable
         if ('themable' in obj.$extensions.lufa) {
           obj.$extensions.lufa.themeable = obj.$extensions.lufa.themable;
           delete obj.$extensions.lufa.themable;
         }

         // Add modeAware based on presence of modes
         obj.$extensions.lufa.modeAware = hasModes;

         // Ensure themeable is set correctly
         if (obj.$extensions.lufa.level !== 'layout') {
           obj.$extensions.lufa.themeable = true;
         } else {
           obj.$extensions.lufa.themeable = false;
           obj.$extensions.lufa.modeAware = false;
         }
       }

       Object.values(obj).forEach((value) => {
         if (typeof value === 'object' && value !== null) {
           updateMetadata(value);
         }
       });
     };

     updateMetadata(content);
     fs.writeFileSync(file, JSON.stringify(content, null, 2));
   });
   ```

2. **Run migration**

   ```bash
   node scripts/migrate-semantic-metadata.js
   ```

3. **Validation**
   - All tokens with `modes` have `modeAware: true`
   - All core/semantic tokens have `themeable: true`
   - All layout tokens have both flags as `false`

**Validation Criteria:**

- ✅ 100% of core tokens have `modeAware: true`
- ✅ 100% of semantic tokens have `themeable: true`
- ✅ Layout tokens have both flags as `false`
- ✅ CSS output functionally identical

**Estimated Effort:** 8 hours

---

### Phase 4: Update Style Dictionary Config (Week 2-3)

**Tasks:**

1. **Update CSS format to respect `modeAware` flag**

   Modify `style-dictionary.config.js`:

   ```javascript
   StyleDictionary.registerFormat({
     name: 'css/variables-with-modes',
     format: ({ dictionary, options }) => {
       // Filter tokens by modeAware flag
       const modeAwareTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware === true);

       const immutableTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware !== true);

       // Generate :root with immutable tokens
       // Generate [data-mode] selectors ONLY for mode-aware tokens
       // ...
     },
   });
   ```

2. **Test CSS generation**

   ```bash
   npm run build:tokens
   git diff dist/tokens.css  # Should show NO functional changes
   ```

3. **Add documentation comments to CSS**

   ```css
   /* ========================================
    * IMMUTABLE TOKENS
    * These never change regardless of mode or theme
    * ======================================== */
   :root {
     --lufa-primitive-color-blue-600: #2563eb;
     /* ... */
   }

   /* ========================================
    * MODE-AWARE TOKENS
    * These change based on [data-mode] attribute
    * ======================================== */
   :root,
   [data-mode='light'] {
     --lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
     /* ... */
   }
   ```

**Validation Criteria:**

- ✅ Immutable tokens appear only in `:root`
- ✅ Mode-aware tokens have `[data-mode]` selectors
- ✅ No regression in visual tests (Storybook)
- ✅ Bundle size unchanged

**Estimated Effort:** 12 hours

---

### Phase 5: Documentation & Testing (Week 3)

**Tasks:**

1. **Update architecture documentation**
   - Token layer diagram
   - Decision flow: when to use primitive vs semantic
   - Migration guide for consumers

2. **Add JSDoc to token files**

   ```json
   {
     "primitive": {
       "color": {
         "$description": "IMMUTABLE: Primitive color values never change. Use semantic tokens (core.brand.*) for mode-aware colors.",
         "blue": {
           "600": {
             "$value": "#2563eb"
           }
         }
       }
     }
   }
   ```

3. **Create test suite**

   ```javascript
   // build/validators/token-consistency.test.js

   describe('Token metadata validation', () => {
     it('should reject primitives with themeable=true', () => {
       const invalidToken = {
         path: ['primitive', 'color', 'blue', '600'],
         $extensions: { lufa: { level: 'primitive', themeable: true } },
       };
       expect(() => validateToken(invalidToken)).toThrow();
     });

     it('should accept semantic tokens with modes', () => {
       const validToken = {
         path: ['core', 'brand', 'primary'],
         $extensions: {
           lufa: {
             level: 'core',
             themeable: true,
             modeAware: true,
             modes: { light: '#blue', dark: '#lightblue' },
           },
         },
       };
       expect(() => validateToken(validToken)).not.toThrow();
     });
   });
   ```

4. **Update Storybook documentation**
   - Token explorer shows metadata badges (IMMUTABLE, MODE-AWARE)
   - Layer-based filtering
   - Visual examples of mode switching

**Validation Criteria:**

- ✅ All tests passing (100% coverage of validation rules)
- ✅ Documentation reviewed and approved
- ✅ Storybook token explorer updated
- ✅ Migration guide published

**Estimated Effort:** 16 hours

---

### Phase 6: Rollout & Communication (Week 4)

**Tasks:**

1. **Version bump:** v0.7.1 → v0.8.0 (minor version - non-breaking for CSS, breaking for metadata)

2. **Create migration guide**

   ````markdown
   # Migration Guide: v0.7.x → v0.8.0

   ## Breaking Changes

   ### Token Metadata Schema

   If you're reading token metadata programmatically:

   **Before:**

   ```typescript
   if (token.$extensions.lufa.themable) { ... }
   ```
   ````

   **After:**

   ```typescript
   if (token.$extensions.lufa.themeable && token.$extensions.lufa.modeAware) { ... }
   ```

   ### Key Changes
   1. `themable` (typo) → `themeable` (correct spelling)
   2. New required field: `modeAware: boolean`
   3. Primitives now explicitly marked as `themeable: false, modeAware: false`

   ## Non-Breaking Changes
   - CSS output is functionally identical
   - Visual appearance unchanged
   - Mode switching behavior unchanged
   - No component API changes

   ```

   ```

3. **Announce in team channels**
   - Architecture decision posted
   - Migration guide shared
   - Office hours scheduled for questions

4. **Monitor adoption**
   - Track downstream package updates
   - Address issues within 48 hours
   - Collect feedback for future iterations

**Estimated Effort:** 8 hours

---

### Total Estimated Effort

| Phase     | Description           | Hours                  |
| --------- | --------------------- | ---------------------- |
| 1         | Validation & Schema   | 8                      |
| 2         | Migrate Primitives    | 12                     |
| 3         | Migrate Semantic      | 8                      |
| 4         | Update Config         | 12                     |
| 5         | Documentation & Tests | 16                     |
| 6         | Rollout               | 8                      |
| **Total** |                       | **64 hours** (~8 days) |

---

## Alternatives Considered

### Alternative 1: Mode-Aware Primitives

**Approach:** Allow primitives to have mode overrides

```json
{
  "primitive": {
    "color": {
      "surface": {
        "$value": "#ffffff",
        "modes": {
          "light": "#ffffff",
          "dark": "#1a1a1a"
        }
      }
    }
  }
}
```

**Rejected because:**

- ❌ Violates immutability principle of primitives
- ❌ Material Design 3, Tailwind, and Chakra all use immutable primitives
- ❌ Blurs the line between "what" (primitive values) and "why" (semantic meaning)
- ❌ Makes it harder to reason about token inheritance
- ❌ Prevents reuse across themes (ocean theme can't just remap semantics)

**Example of problem:**

```typescript
// If primitives can vary by mode, what does this mean?
const blue600 = getToken('primitive.color.blue.600');
// Is it #2563eb? Or does it change based on dark mode?
// Primitives should be predictable constants!
```

---

### Alternative 2: Separate Primitives Per Mode

**Approach:** Create separate primitive tokens for each mode

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600-light": { "$value": "#2563eb" },
        "600-dark": { "$value": "#60a5fa" }
      }
    }
  }
}
```

**Rejected because:**

- ❌ Token explosion (500 primitives → 1500+ tokens)
- ❌ Naming becomes cumbersome (`blue-600-light-high-contrast`?)
- ❌ Semantic layer loses meaning (just aliasing primitives)
- ❌ Hard to add new modes (would require adding to ALL primitives)
- ❌ Doesn't match industry patterns

**Example of problem:**

```typescript
// Semantic token becomes meaningless
{
  "brand-primary": "{primitive.color.blue-600-light}"
  // This is just an alias, not a semantic abstraction!
}
```

---

### Alternative 3: Keep Current Conflated Approach

**Approach:** Leave `themable: true` on primitives

**Rejected because:**

- ❌ Perpetuates confusion about which tokens actually vary
- ❌ No clear validation strategy
- ❌ Makes Phase 6 theme implementation harder
- ❌ Doesn't align with industry standards
- ❌ Developer feedback indicates confusion

**Developer confusion examples:**

```typescript
// Developer sees: primitive.color.blue.600 has themable: true
// Developer asks: "Does blue-600 change in dark mode?"
// Answer: "No, only semantic tokens change"
// Developer: "Then why is it marked themable?"
// Answer: "Uh... good question 🤔"
```

---

### Alternative 4: Use Separate Files for Modes

**Approach:** Structure like:

```
primitives/
  light/
    colors.json
  dark/
    colors.json
```

**Rejected because:**

- ❌ Breaks single source of truth
- ❌ Hard to ensure parity (did we add the same token to both files?)
- ❌ Complicates token references (which file to reference?)
- ❌ Doesn't support arbitrary modes (what about high-contrast?)

---

## Validation Criteria

### Migration is Complete When:

1. **Metadata Consistency**
   - ✅ 100% of primitives have `themeable: false, modeAware: false`
   - ✅ 100% of core/semantic tokens have `themeable: true, modeAware: true`
   - ✅ 100% of layout tokens have `themeable: false, modeAware: false`
   - ✅ All tokens with `modes` object have `modeAware: true`

2. **Build & Tests**
   - ✅ `npm run validate:tokens` passes
   - ✅ `npm run build:tokens` succeeds
   - ✅ All unit tests pass (100% coverage on validators)
   - ✅ Visual regression tests pass (Storybook)

3. **CSS Output**
   - ✅ Primitives appear only in `:root` (no mode selectors)
   - ✅ Semantic tokens have `[data-mode]` selectors
   - ✅ CSS diff shows no functional changes (only comments)
   - ✅ Bundle size delta < 1%

4. **Documentation**
   - ✅ ADR published and approved
   - ✅ Migration guide published
   - ✅ Storybook token explorer updated
   - ✅ Architecture diagrams updated

5. **Adoption**
   - ✅ No critical bugs reported within 1 week
   - ✅ Downstream packages updated to v0.8.0
   - ✅ Team feedback collected and addressed

---

## Rollback Strategy

If critical issues arise, we can rollback in phases:

### Rollback Phase 1: Revert CSS Config (1 hour)

- Revert Style Dictionary config changes
- Rebuild tokens
- Publish v0.8.1 with reverted config
- CSS generation returns to original behavior

### Rollback Phase 2: Revert Metadata (2 hours)

- Revert token metadata changes
- Republish as v0.8.2
- Metadata returns to original schema

### Rollback Phase 3: Revert Validation (30 min)

- Remove validation from build pipeline
- System returns to v0.7.1 state

### Rollback Triggers

- Visual regressions detected in production
- Build time increases by >50%
- Consumer adoption blocked by breaking changes
- Critical accessibility issues reported

---

## Related Decisions

- **ADR-001:** Modes vs Themes Separation
  - Establishes that modes and themes are orthogonal
  - This ADR clarifies _how_ modes are implemented (at semantic layer)

- **ADR-002:** HTML Attributes Naming
  - Defines `[data-mode]` and `[data-color-theme]` attributes
  - This ADR defines which tokens respond to these attributes

- **ADR-003:** High-Contrast Token Strategy
  - Defines high-contrast as a mode (not a theme)
  - This ADR ensures high-contrast works at semantic layer

- **Future ADR:** Phase 6 Theme Variant Implementation
  - Will build on this architecture
  - Will add `themes` object similar to `modes` object
  - Will leverage `themeable: true` flag established here

---

## References

### Industry Standards

- [Material Design 3 - Token Architecture](https://m3.material.io/foundations/design-tokens/overview)
  - Reference tokens (primitives) vs system tokens (semantic) vs component tokens

- [Tailwind CSS - Theme Configuration](https://tailwindcss.com/docs/theme)
  - Color palette as immutable constants
  - Theme config maps to semantic usage

- [Chakra UI - Semantic Tokens](https://chakra-ui.com/docs/styled-system/semantic-tokens)
  - Explicit `_light` and `_dark` properties on semantic tokens only

- [Design Tokens Community Group - DTCG Format](https://design-tokens.github.io/community-group/format/)
  - W3C standard for design token format
  - Metadata extension patterns

### Lufa Documentation

- Phase 2A Analysis: Token system audit (2026-01-26)
- Token Architecture Overview: `docs/tokens/architecture.md`
- Style Dictionary Config: `packages/design-system/tokens/style-dictionary.config.js`

### Academic Research

- [Variances in Design System Tokens](https://www.designsystemssurvey.com/2022/#tokens)
  - 73% of design systems use immutable primitives
  - 89% implement semantic tokens for theming

---

## Appendix A: Token Layer Decision Tree

```
┌─────────────────────────────────────────────────────────────┐
│ Creating a new token? Ask these questions:                 │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
              ┌─────────────────────────┐
              │ Is it a fixed constant? │
              │ (like #2563eb or 16px)  │
              └─────────────────────────┘
                  /               \
                YES               NO
                 │                 │
                 ▼                 ▼
          ┌──────────┐      ┌──────────────────┐
          │PRIMITIVE │      │ Does it vary by  │
          │          │      │ mode or theme?   │
          │themeable:│      └──────────────────┘
          │  false   │            /        \
          │modeAware:│          YES        NO
          │  false   │           │          │
          └──────────┘           ▼          ▼
                          ┌──────────┐  ┌──────────┐
                          │SEMANTIC/ │  │ LAYOUT   │
                          │  CORE    │  │          │
                          │          │  │themeable:│
                          │themeable:│  │  false   │
                          │  true    │  │modeAware:│
                          │modeAware:│  │  false   │
                          │  true    │  └──────────┘
                          └──────────┘
                               │
                               ▼
                        ┌────────────────┐
                        │ Add modes:     │
                        │ - light        │
                        │ - dark         │
                        │ - high-contrast│
                        └────────────────┘
```

---

## Appendix B: Before/After Comparison

### Example 1: Blue Color Primitive

**BEFORE (v0.7.1):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "themable": true // ❌ Confusing - implies it changes
            }
          }
        }
      }
    }
  }
}
```

**AFTER (v0.8.0):**

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "level": "primitive",
              "themeable": false, // ✅ Clear - this is a constant
              "modeAware": false // ✅ Clear - never changes by mode
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS (BOTH VERSIONS):**

```css
:root {
  --lufa-primitive-color-blue-600: #2563eb;
  /* No change in output */
}
```

---

### Example 2: Brand Primary Semantic Token

**BEFORE (v0.7.1):**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
            "level": "core",
            "themable": true, // ⚠️ Correct, but confusing with primitives also themable
            "modes": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.400}"
            }
          }
        }
      }
    }
  }
}
```

**AFTER (v0.8.0):**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
            "level": "core",
            "themeable": true, // ✅ Clear - can vary by theme
            "modeAware": true, // ✅ NEW - explicitly varies by mode
            "modes": {
              "light": "{primitive.color.blue.600}",
              "dark": "{primitive.color.blue.400}"
            }
          }
        }
      }
    }
  }
}
```

**Generated CSS (BOTH VERSIONS):**

```css
:root,
[data-mode='light'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-600);
}

[data-mode='dark'] {
  --lufa-core-brand-primary: var(--lufa-primitive-color-blue-400);
}
/* No change in output */
```

---

### Example 3: Layout Container

**BEFORE (v0.7.1):**

```json
{
  "layout": {
    "container": {
      "max-width": {
        "$value": "1280px",
        "$extensions": {
          "lufa": {
            "level": "layout"
            // ❌ Missing explicit metadata
          }
        }
      }
    }
  }
}
```

**AFTER (v0.8.0):**

```json
{
  "layout": {
    "container": {
      "max-width": {
        "$value": "1280px",
        "$extensions": {
          "lufa": {
            "level": "layout",
            "themeable": false, // ✅ NEW - structural constant
            "modeAware": false // ✅ NEW - doesn't vary by mode
          }
        }
      }
    }
  }
}
```

**Generated CSS (BOTH VERSIONS):**

```css
:root {
  --lufa-layout-container-max-width: 1280px;
  /* No change in output */
}
```

---

**Signed off by:** Architecture Team  
**Implementation Start:** Week of 2026-01-27  
**Target Completion:** 2026-02-17 (3 weeks)  
**Review Date:** 2026-03-01 (post-rollout retrospective)
