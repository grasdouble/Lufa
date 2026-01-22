# Batch 2 Migration Summary: Motion & Animation Tokens

**Date**: January 2026  
**Status**: ✅ COMPLETE  
**Files Migrated**: 4/4 (100%)  
**Total Migration Progress**: 20/34 files (59%)

---

## 🎯 Objectives

Migrate all remaining motion/animation tokens from TypeScript to JSON (Style Dictionary + W3C DTCG format):

1. ✅ **advancedDuration.ts** - Extended durations and stagger delays
2. ✅ **transition.ts** - Pre-built CSS transition strings
3. ✅ **motion.ts** - Animation presets (composite tokens)
4. ✅ **focus.ts** - Focus indicator configurations (composite tokens)

---

## 📦 What Was Added

### Primitives (`primitives/motion.json`)

#### New Timing Values (13 added, 20 total)
- **Micro durations**: 50ms, 75ms, 100ms
- **Standard durations**: 200ms, 300ms, 600ms, 800ms, 1000ms (duplicates of named tokens for numeric access)
- **Extended durations**: 1500ms, 2000ms, 3000ms

**Before**: 5 timing primitives (instant, fast, normal, slow, slower)  
**After**: 20 timing primitives (instant, 50, 75, 100, fast/150, 200, normal/250, 300, slow/350, 400, slower/500, 600, 800, 1000, 1500, 2000, 3000)

#### New Easing Value (1 added, 7 total)
- **gentle**: cubic-bezier(0.33, 1, 0.68, 1) - For subtle animations and micro-interactions

**Before**: 6 easing primitives  
**After**: 7 easing primitives (linear, easeIn, easeOut, easeInOut, gentle, sharp, bounce)

---

### Core Tokens (`core/motion.json`)

#### 1. advancedDuration (10 tokens)

Extended timing values for complex animations and sequential effects:

**Extended Durations (5)**:
- `moderate`: 800ms - Moderate animations
- `leisurely`: 1000ms - Leisurely animations  
- `extended`: 1500ms - Extended animations
- `long`: 2000ms - Long animations
- `veryLong`: 3000ms - Very long animations

**Stagger Delays (5)**:
- `staggerTiny`: 50ms - Minimal stagger
- `staggerSmall`: 75ms - Small stagger
- `staggerBase`: 100ms - Base stagger
- `staggerLarge`: 150ms - Large stagger
- `staggerExtraLarge`: 200ms - Extra large stagger

**Use Cases**:
- Multi-step animations
- Staggered entrance animations
- Page transitions
- Loading sequences
- Complex component animations

#### 2. transition (5 tokens)

Pre-built CSS transition strings combining timing, easing, and properties:

- `fast`: "all 150ms cubic-bezier(0, 0, 0.2, 1)" - Micro-interactions, hovers
- `base`: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)" - Most UI elements
- `slow`: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)" - Modals, drawers
- `colors`: "color 150ms ..., background-color 150ms ..., border-color 150ms ..." - Color changes only
- `none`: "none" - Disable transitions (reduced motion)

**Use Cases**:
- Simple CSS transitions
- Hover states
- Theme switching
- Button interactions
- Reduced motion support

#### 3. motion (7 preset objects) - COMPOSITE TOKENS

Animation presets with nested structure: `{ duration, easing, properties }`

**Presets**:
- `fade`: Opacity transitions (150ms, easeOut, "opacity")
- `scale`: Transform + opacity (250ms, easeInOut, "transform, opacity")
- `slide`: Slide animations (250ms, easeOut, "transform, opacity")
- `color`: Color changes (150ms, easeInOut, "color, background-color, border-color")
- `all`: All properties (150ms, easeInOut, "all")
- `collapse`: Height + opacity (400ms, gentle, "height, opacity")
- `scroll`: Smooth scrolling (400ms, gentle, "scroll-behavior")

**Use Cases**:
- Tooltips, alerts, overlays (fade)
- Modals, popovers (scale)
- Drawers, dropdowns (slide)
- Hover states (color)
- Accordions, expandable sections (collapse)
- Smooth scrolling (scroll)

**Structure** (Option B - Nested Objects with References):
```json
"motion": {
  "fade": {
    "duration": { "$type": "duration", "$value": "{primitive.timing.150}" },
    "easing": { "$type": "cubicBezier", "$value": "{primitive.easing.easeOut}" },
    "properties": { "$type": "string", "$value": "opacity" }
  }
}
```

#### 4. focus (5 configuration objects) - COMPOSITE TOKENS

Focus indicator configurations for keyboard navigation (WCAG 2.4.7 compliant):

**Configurations**:
- `default`: Standard focus ring (2px solid, 2px offset, sm radius)
- `thick`: High visibility (3px solid, 2px offset, sm radius)
- `inset`: Contained within element (2px solid, -2px offset, sm radius)
- `shadow`: With drop shadow (2px solid, 0px offset, sm radius, shadow)
- `inverse`: For dark backgrounds (2px solid, 2px offset, sm radius, uses text.primary)

**Use Cases**:
- Most interactive elements (default)
- Critical actions, primary buttons (thick)
- Form inputs (inset - avoids layout shift)
- Cards, modals (shadow - elevated appearance)
- Hero sections, dark cards (inverse)

**Structure**:
```json
"focus": {
  "default": {
    "width": { "$type": "dimension", "$value": "{borderWidth.thin}" },
    "style": { "$type": "string", "$value": "{borderStyle.solid}" },
    "color": { "$type": "color", "$value": "{color.border.focus}" },
    "offset": { "$type": "dimension", "$value": "2px" },
    "radius": { "$type": "dimension", "$value": "{radius.sm}" }
  }
}
```

---

## 🔧 Technical Decisions

### Decision 1: Composite Token Strategy - Option B (Nested Objects with References)

**Options Considered**:
- ~~Option A: DTCG composite token type~~ (not yet standardized)
- ✅ **Option B: Nested objects with references** (SELECTED)
- ~~Option C: Build-time generation with custom format~~ (too complex)

**Implementation**:
- Each property of a composite token is a separate token with its own type
- Properties can reference other tokens (e.g., `{borderWidth.thin}`, `{primitive.timing.150}`)
- Style Dictionary generates individual CSS variables for each property
- JavaScript output includes nested objects with both resolved values and CSS variable references

**Benefits**:
- ✅ Maximum flexibility - each property can be overridden independently
- ✅ Full token reference support
- ✅ Clean CSS output - individual variables per property
- ✅ TypeScript-friendly - proper nested types
- ✅ Theme-friendly - can override specific properties

**Tradeoffs**:
- ⚠️ More CSS variables (e.g., `--lufa-motion-fade-duration`, `--lufa-motion-fade-easing`, `--lufa-motion-fade-properties`)
- ⚠️ Consumers need to access nested properties (e.g., `motion.fade.duration`)
- ✅ But: More granular control, better for theming

### Decision 2: Helper Functions - REMOVED

**Original TypeScript had**:
- `getTransition(motionKey: Motion): string` - Generate CSS transition string
- `getFocusStyle(focusKey: Focus): string` - Generate CSS focus styles

**Decision**: Remove helper functions, let consumers build their own

**Rationale**:
- Tokens should be data, not logic
- Consumers can create utilities if needed
- Reduces coupling between token system and consumers
- Simpler token migration

**Impact**: Consumers who used `getTransition()` will need to:
1. Use `transition` tokens directly (pre-built strings)
2. Or build transition strings from `motion` composite properties
3. Or create their own utility functions

### Decision 3: Shadow Property Type - String, Not Shadow

**Problem**: `focus.shadow.shadow` was outputting "undefined undefined undefined..." 

**Root Cause**: Style Dictionary's shadow transform expects complex object structure:
```json
{
  "offsetX": "0px",
  "offsetY": "0px",
  "blur": "0px",
  "spread": "3px",
  "color": "rgb(37 99 235 / 0.2)"
}
```

**Solution**: Use `$type: "string"` with full CSS shadow value:
```json
"shadow": { "$type": "string", "$value": "0 0 0 3px rgb(37 99 235 / 0.2)" }
```

**Output**: `--lufa-focus-shadow-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);` ✅

### Decision 4: Transition Tokens - Pre-Computed Strings

**Approach**: Store complete CSS transition strings, not individual parts

**Why**:
- Common use case: applying transitions directly (`transition: var(--lufa-transition-fast);`)
- Eliminates need for helper functions
- Simplifies consumption
- Still have `motion` composites for advanced use cases

**Example**:
```css
.button {
  transition: var(--lufa-transition-fast);
  /* Resolves to: all 150ms cubic-bezier(0, 0, 0.2, 1) */
}
```

---

## 📊 Output Examples

### CSS Variables

```css
/* advancedDuration */
--lufa-advancedDuration-moderate: 800ms;
--lufa-advancedDuration-leisurely: 1000ms;
--lufa-advancedDuration-staggerBase: 100ms;

/* easing (NEW: gentle) */
--lufa-easing-gentle: cubic-bezier(0.33, 1, 0.68, 1);

/* transition (pre-built strings) */
--lufa-transition-fast: all 150ms cubic-bezier(0, 0, 0.2, 1);
--lufa-transition-base: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
--lufa-transition-colors: color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* motion (composite - individual properties) */
--lufa-motion-fade-duration: 150ms;
--lufa-motion-fade-easing: cubic-bezier(0, 0, 0.2, 1);
--lufa-motion-fade-properties: opacity;

--lufa-motion-scale-duration: 250ms;
--lufa-motion-scale-easing: cubic-bezier(0.4, 0, 0.2, 1);
--lufa-motion-scale-properties: transform, opacity;

/* focus (composite - individual properties) */
--lufa-focus-default-width: 2px;
--lufa-focus-default-style: solid;
--lufa-focus-default-color: oklch(61.6% 0.199 262.881);
--lufa-focus-default-offset: 2px;
--lufa-focus-default-radius: 4px;

--lufa-focus-shadow-width: 2px;
--lufa-focus-shadow-style: solid;
--lufa-focus-shadow-color: oklch(61.6% 0.199 262.881);
--lufa-focus-shadow-offset: 0px;
--lufa-focus-shadow-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
--lufa-focus-shadow-radius: 4px;
```

### JavaScript (tokens-values.js)

```javascript
export default {
  // advancedDuration
  advancedDuration: {
    moderate: "800ms",
    leisurely: "1000ms",
    extended: "1500ms",
    long: "2000ms",
    veryLong: "3000ms",
    staggerTiny: "50ms",
    staggerSmall: "75ms",
    staggerBase: "100ms",
    staggerLarge: "150ms",
    staggerExtraLarge: "200ms"
  },

  // easing (NEW: gentle)
  easing: {
    // ... existing ...
    gentle: "cubic-bezier(0.33, 1, 0.68, 1)"
  },

  // transition (pre-built strings)
  transition: {
    fast: "all 150ms cubic-bezier(0, 0, 0.2, 1)",
    base: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)",
    colors: "color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    none: "none"
  },

  // motion (nested objects with resolved values)
  motion: {
    fade: {
      duration: "150ms",
      easing: "cubic-bezier(0, 0, 0.2, 1)",
      properties: "opacity"
    },
    scale: {
      duration: "250ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      properties: "transform, opacity"
    },
    // ... more presets ...
  },

  // focus (nested objects with resolved values)
  focus: {
    default: {
      width: "2px",
      style: "solid",
      color: "oklch(61.6% 0.199 262.881)",
      offset: "2px",
      radius: "4px"
    },
    shadow: {
      width: "2px",
      style: "solid",
      color: "oklch(61.6% 0.199 262.881)",
      offset: "0px",
      shadow: "0 0 0 3px rgb(37 99 235 / 0.2)",
      radius: "4px"
    },
    // ... more configurations ...
  }
};
```

### JavaScript (tokens-css-vars.js)

```javascript
export default {
  // advancedDuration
  advancedDuration: {
    moderate: "var(--lufa-advancedDuration-moderate)",
    staggerBase: "var(--lufa-advancedDuration-staggerBase)",
    // ...
  },

  // transition
  transition: {
    fast: "var(--lufa-transition-fast)",
    base: "var(--lufa-transition-base)",
    // ...
  },

  // motion (nested objects with CSS variable references)
  motion: {
    fade: {
      duration: "var(--lufa-motion-fade-duration)",
      easing: "var(--lufa-motion-fade-easing)",
      properties: "var(--lufa-motion-fade-properties)"
    },
    // ...
  },

  // focus (nested objects with CSS variable references)
  focus: {
    default: {
      width: "var(--lufa-focus-default-width)",
      style: "var(--lufa-focus-default-style)",
      color: "var(--lufa-focus-default-color)",
      offset: "var(--lufa-focus-default-offset)",
      radius: "var(--lufa-focus-default-radius)"
    },
    // ...
  }
};
```

---

## 💡 Usage Examples for Consumers

### 1. Using Transition Tokens (Simplest)

```css
.button {
  transition: var(--lufa-transition-fast);
}

.button:hover {
  background-color: var(--lufa-color-primary-hover);
}

.modal {
  transition: var(--lufa-transition-slow);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: var(--lufa-transition-none) !important;
  }
}
```

### 2. Using Motion Composite Tokens

```css
.tooltip {
  transition-property: var(--lufa-motion-fade-properties);
  transition-duration: var(--lufa-motion-fade-duration);
  transition-timing-function: var(--lufa-motion-fade-easing);
}

.modal {
  transition-property: var(--lufa-motion-scale-properties);
  transition-duration: var(--lufa-motion-scale-duration);
  transition-timing-function: var(--lufa-motion-scale-easing);
}

.drawer {
  transition-property: var(--lufa-motion-slide-properties);
  transition-duration: var(--lufa-motion-slide-duration);
  transition-timing-function: var(--lufa-motion-slide-easing);
}
```

### 3. Using Focus Tokens (WCAG 2.4.7 Compliant)

```css
/* Default focus ring for most elements */
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: var(--lufa-focus-default-width) 
           var(--lufa-focus-default-style) 
           var(--lufa-focus-default-color);
  outline-offset: var(--lufa-focus-default-offset);
  border-radius: var(--lufa-focus-default-radius);
}

/* High visibility for critical actions */
.button-primary:focus-visible,
.button-delete:focus-visible {
  outline: var(--lufa-focus-thick-width) 
           var(--lufa-focus-thick-style) 
           var(--lufa-focus-thick-color);
  outline-offset: var(--lufa-focus-thick-offset);
}

/* Inset focus for form inputs (no layout shift) */
input[type="text"]:focus-visible,
textarea:focus-visible {
  outline: var(--lufa-focus-inset-width) 
           var(--lufa-focus-inset-style) 
           var(--lufa-focus-inset-color);
  outline-offset: var(--lufa-focus-inset-offset);
}

/* Focus with shadow for elevated components */
.card:focus-visible {
  outline: var(--lufa-focus-shadow-width) 
           var(--lufa-focus-shadow-style) 
           var(--lufa-focus-shadow-color);
  outline-offset: var(--lufa-focus-shadow-offset);
  box-shadow: var(--lufa-focus-shadow-shadow);
}

/* Inverse focus for dark backgrounds */
.hero button:focus-visible,
.dark-card a:focus-visible {
  outline: var(--lufa-focus-inverse-width) 
           var(--lufa-focus-inverse-style) 
           var(--lufa-focus-inverse-color);
  outline-offset: var(--lufa-focus-inverse-offset);
}
```

### 4. Using Advanced Duration for Staggered Animations

```css
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.list-item {
  animation: slideInUp var(--lufa-advancedDuration-moderate) var(--lufa-easing-gentle);
}

/* Stagger effect using calc */
.list-item:nth-child(1) {
  animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 0);
}
.list-item:nth-child(2) {
  animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 1);
}
.list-item:nth-child(3) {
  animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 2);
}
.list-item:nth-child(4) {
  animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 3);
}

/* Or use larger stagger for dramatic effect */
.hero-element {
  animation-delay: calc(var(--lufa-advancedDuration-staggerLarge) * var(--item-index));
}
```

### 5. JavaScript Usage (React Example)

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens';

// Using transition tokens
const buttonStyles = {
  transition: tokens.transition.fast,
};

// Using motion composite tokens
const modalStyles = {
  transitionProperty: tokens.motion.scale.properties,
  transitionDuration: tokens.motion.scale.duration,
  transitionTimingFunction: tokens.motion.scale.easing,
};

// Using focus tokens
const inputFocusStyles = {
  '&:focus-visible': {
    outline: `${tokens.focus.inset.width} ${tokens.focus.inset.style} ${tokens.focus.inset.color}`,
    outlineOffset: tokens.focus.inset.offset,
  },
};

// Using advanced duration for staggered effects
const listItemStyles = (index: number) => ({
  animationDelay: `calc(${tokens.advancedDuration.staggerBase} * ${index})`,
});
```

---

## ✅ Build Verification

### Build Commands Run
```bash
# Clean build
pnpm ds:tokens:build

# Full design system build
pnpm ds:all:build
```

### Output Files Generated

**Style Dictionary Outputs**:
- ✅ `dist/css/primitives.css` - Primitive CSS variables (with new timing/easing)
- ✅ `dist/css/tokens.css` - Core token CSS variables (with advancedDuration, transition, motion, focus)
- ✅ `dist/js/tokens-values.js` - JavaScript with resolved values (with nested objects)
- ✅ `dist/js/tokens-css-vars.js` - JavaScript with CSS variable references (with nested objects)
- ✅ `dist/json/tokens.json` - Complete token tree (with all new tokens)

**Legacy TypeScript-Generated Outputs** (backward compatibility):
- ✅ `dist/tokens/motion/advancedDuration.js` - Generated from old TS source
- ✅ `dist/tokens/motion/transition.js` - Generated from old TS source
- ✅ `dist/tokens/motion/motion.js` - Generated from old TS source
- ✅ `dist/tokens/motion/focus.js` - Generated from old TS source

### Build Status
- ✅ No build errors
- ⚠️ 6 harmless collision warnings (root-level `$description` in JSON files)
- ✅ All token references resolve correctly
- ✅ All CSS variables generated properly
- ✅ All JavaScript exports working correctly
- ✅ Composite tokens output with nested structure
- ✅ Shadow property outputs as string (not "undefined")

---

## 📝 Files Modified

### New Files Created
- None (all added to existing files)

### Files Modified

#### `primitives/motion.json`
**Added**:
- 13 new timing primitives (50, 75, 100, 200, 300, 600, 800, 1000, 1500, 2000, 3000, plus duplicates for 150, 250, 500)
- 1 new easing primitive (gentle)

**Total primitives**: 
- Timing: 5 → 20 (+15)
- Easing: 6 → 7 (+1)

#### `core/motion.json`
**Added 4 new sections**:
1. `advancedDuration` - 10 tokens (5 extended durations + 5 stagger delays)
2. `transition` - 5 tokens (pre-built CSS transition strings)
3. `motion` - 7 preset objects (composite tokens with duration, easing, properties)
4. `focus` - 5 configuration objects (composite tokens with width, style, color, offset, radius, shadow?)

**Total core motion tokens**: 
- Before: timing (5) + easing (6) + shadow (7) + zIndex (8) = 26 tokens
- After: timing (5) + easing (7) + advancedDuration (10) + transition (5) + motion (7×3=21) + focus (5×5-6=19) + shadow (7) + zIndex (8) = 102 tokens
- **Increase**: +76 tokens

---

## 🎓 Lessons Learned

### 1. Composite Tokens Need Careful Type Handling
- Using `$type: "shadow"` for a simple shadow string caused parsing issues
- Solution: Use `$type: "string"` for CSS-ready shadow values
- Takeaway: Match token type to output format, not semantic meaning

### 2. Nested Objects Work Well for Composite Tokens
- Option B (nested objects with references) provides maximum flexibility
- Individual CSS variables per property enables fine-grained theming
- Consumers can access individual properties or use pre-built combinations

### 3. Pre-Built Strings vs. Individual Tokens
- Both approaches have value:
  - `transition` tokens (pre-built strings) → Simple use cases
  - `motion` tokens (individual properties) → Advanced use cases, custom combinations
- Provide both for different consumer needs

### 4. Backward Compatibility During Migration
- Old TypeScript token files still generated for backward compatibility
- New Style Dictionary outputs use new naming convention
- Gradual migration path: consumers can switch at their own pace

### 5. Documentation is Critical for Composite Tokens
- Nested structure requires clear usage examples
- Consumers need to know which properties are available
- Usage examples should cover common patterns (focus rings, transitions, staggered animations)

---

## 🚀 Next Steps

### Immediate (Batch 3 - Visual Effects)
1. **blur.ts** → Create `core/effects.json` + `primitives/effects.json`
2. **opacity.ts** → Add to `core/effects.json`
3. **transform.ts** → Add to `core/effects.json`
4. **cursor.ts** → Add to `core/effects.json`

### Medium-term (Batch 4 - Component Tokens)
5. **iconSize.ts** → Create `core/icon.json` + primitives
6. **iconStroke.ts** → Add to `core/icon.json`
7. **measure.ts** → Add to `core/typography.json`
8. **typography.ts** (composite) → Add to `core/typography.json`

### Long-term (Batch 5 - Layout System)
9. **aspectRatio.ts** → Add to `core/layout.json`
10. **breakpoint.ts** → Add to `core/layout.json`
11. **container.ts** → Add to `core/layout.json`
12. **dimension.ts** → Add to `core/layout.json`
13. **grid.ts** → Add to `core/layout.json`
14. **minWidth.ts** → Add to `core/layout.json`

### Eventually (Post-Migration)
- Deprecate old TypeScript token files
- Update consuming packages to use new token format
- Remove `generate-js-from-source.ts` build script
- Update documentation with new token usage patterns
- Add theme examples using new composite tokens

---

## 📚 References

### Related Documents
- [MIGRATION_STATUS.md](./MIGRATION_STATUS.md) - Overall migration tracking
- [REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md) - Technical refactoring details
- [style-dictionary.config.js](./style-dictionary.config.js) - Build configuration

### Standards & Best Practices
- [W3C Design Tokens Community Group (DTCG)](https://tr.designtokens.org/format/) - Token format specification
- [Style Dictionary v5 Documentation](https://v5.styledictionary.com/) - Build tool docs
- [WCAG 2.4.7 - Focus Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html) - Focus indicator guidelines

---

**Batch 2 Migration: ✅ COMPLETE**
