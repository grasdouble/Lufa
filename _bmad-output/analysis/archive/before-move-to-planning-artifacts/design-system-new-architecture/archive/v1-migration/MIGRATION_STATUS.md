# Token Migration Status - Old TypeScript to New JSON (Style Dictionary)

## ✅ Completed Migrations (Batch 1 + Batch 2)

### Border Category (3/3 files) - ✅ 100% COMPLETE

- ✅ **borderWidth.ts** → `core/border.json` (borderWidth section) + `primitives/border.json`
- ✅ **radius.ts** → `core/border.json` (radius section) + `primitives/border.json`
- ✅ **borderStyle.ts** → `core/border.json` (borderStyle section) + `primitives/border.json`

### Color Category (1/1 files) - ✅ 100% COMPLETE

- ✅ **colors.ts** → `core/color.json` + `primitives/color.json`

### Space Category (3/3 files) - ✅ 100% COMPLETE

- ✅ **spacing.ts** → `core/spacing.json` + `primitives/spacing.json`
- ✅ **size.ts** → `core/size.json` + `primitives/size.json`
- ✅ **maxWidth.ts** → `core/layout.json` + `primitives/size.json`

### Typography Category (5/7 files) - 71% COMPLETE

- ✅ **fontFamily.ts** → `core/typography.json` + `primitives/typography.json`
- ✅ **fontSize.ts** → `core/typography.json` + `primitives/typography.json`
- ✅ **fontWeight.ts** → `core/typography.json` + `primitives/typography.json`
- ✅ **letterSpacing.ts** → `core/typography.json` + `primitives/typography.json`
- ✅ **lineHeight.ts** → `core/typography.json` + `primitives/typography.json`
- ❌ **measure.ts** → NOT YET MIGRATED
- ❌ **typography.ts** (composite) → NOT YET MIGRATED

### Motion/Elevation Category (10/10 files) - ✅ 100% COMPLETE

- ✅ **timing.ts** → `core/motion.json` + `primitives/motion.json`
- ✅ **easing.ts** → `core/motion.json` + `primitives/motion.json`
- ✅ **shadow.ts** → `core/motion.json` + `primitives/elevation.json`
- ✅ **zIndex.ts** → `core/motion.json` + `primitives/elevation.json`
- ✅ **advancedDuration.ts** → `core/motion.json` (advancedDuration section) + `primitives/motion.json`
- ✅ **transition.ts** → `core/motion.json` (transition section) - pre-built CSS strings
- ✅ **motion.ts** (composite) → `core/motion.json` (motion section) - nested objects with references
- ✅ **focus.ts** (composite) → `core/motion.json` (focus section) - nested objects with references

---

## ❌ Missing Migrations (Phase 2)

### Effects Category (0/4 files) - **PRIORITY: MEDIUM**

- ❌ **blur.ts** - Filter blur values
- ❌ **cursor.ts** - Cursor types (pointer, not-allowed, etc.)
- ❌ **opacity.ts** - Opacity values
- ❌ **transform.ts** - CSS transform values

### Icon Category (0/2 files) - **PRIORITY: MEDIUM**

- ❌ **iconSize.ts** - Icon sizing scale
- ❌ **iconStroke.ts** - Icon stroke widths

### Layout Category (0/6 files) - **PRIORITY: LOW**

- ❌ **aspectRatio.ts** - Aspect ratio presets (16:9, 4:3, etc.)
- ❌ **breakpoint.ts** - Responsive breakpoints
- ❌ **container.ts** - Container widths
- ❌ **dimension.ts** - Generic dimension values
- ❌ **grid.ts** - Grid system values
- ❌ **minWidth.ts** - Minimum width constraints

### Space Category Remainder - ✅ **COMPLETE**

- ✅ **size.ts** - Migrated to `core/size.json`
- ✅ **maxWidth.ts** - Migrated to `core/layout.json`

### Border Category Remainder - ✅ **COMPLETE**

- ✅ **borderStyle.ts** - Migrated to `core/border.json`

### Motion Category Remainder - ✅ **COMPLETE**

- ✅ **advancedDuration.ts** - Migrated to `core/motion.json`
- ✅ **transition.ts** - Migrated to `core/motion.json`
- ✅ **motion.ts** (composite) - Migrated to `core/motion.json`
- ✅ **focus.ts** (composite) - Migrated to `core/motion.json`

### Typography Category Remainder (0/2 files) - **PRIORITY: MEDIUM**

- ❌ **measure.ts** - Optimal line lengths for readability
- ❌ **typography.ts** (composite) - Typography scale composites

---

## 📊 Migration Statistics

- **Total files**: 34
- **Migrated**: 20 files (59%)
- **Remaining**: 14 files (41%)

### By Category Progress

| Category   | Completed | Total | Progress |
| ---------- | --------- | ----- | -------- |
| Border     | 3         | 3     | ✅ 100%  |
| Color      | 1         | 1     | ✅ 100%  |
| Effects    | 0         | 4     | 0%       |
| Elevation  | 2         | 2     | ✅ 100%  |
| Icon       | 0         | 2     | 0%       |
| Layout     | 1         | 6     | 17%      |
| Motion     | 8         | 8     | ✅ 100%  |
| Space      | 3         | 3     | ✅ 100%  |
| Typography | 5         | 7     | 71%      |

---

## 🎯 Recommended Migration Order (Phase 2)

### ✅ Batch 1: Core Tokens (COMPLETE)

1. ✅ **borderStyle.ts** → Added to `core/border.json` + `primitives/border.json`
2. ✅ **size.ts** → Created `core/size.json` + added to `primitives/size.json`
3. ✅ **maxWidth.ts** → Added to `core/layout.json` + `primitives/size.json`

### ✅ Batch 2: Motion/Animation (COMPLETE)

4. ✅ **advancedDuration.ts** → Added to `core/motion.json` (advancedDuration section)
5. ✅ **transition.ts** → Added to `core/motion.json` (transition section)
6. ✅ **motion.ts** (composite) → Added to `core/motion.json` (motion section with nested objects)
7. ✅ **focus.ts** (composite) → Added to `core/motion.json` (focus section with nested objects)

### Batch 3: Visual Effects (MEDIUM PRIORITY)

8. **blur.ts** → Create `core/effects.json` + `primitives/other.json`
9. **opacity.ts** → Add to `core/effects.json`
10. **transform.ts** → Add to `core/effects.json`
11. **cursor.ts** → Add to `core/effects.json`

### Batch 4: Component Tokens (MEDIUM PRIORITY)

12. **iconSize.ts** → Create `core/icon.json` + primitives
13. **iconStroke.ts** → Add to `core/icon.json`
14. **measure.ts** → Add to `core/typography.json`
15. **typography.ts** (composite) → Add to `core/typography.json`

### Batch 5: Layout System (LOW PRIORITY - Can wait)

16. **aspectRatio.ts** → Create `core/layout.json`
17. **breakpoint.ts** → Add to `core/layout.json`
18. **container.ts** → Add to `core/layout.json`
19. **dimension.ts** → Add to `core/layout.json`
20. **grid.ts** → Add to `core/layout.json`
21. **minWidth.ts** → Add to `core/layout.json`

---

## 🤔 Special Considerations

### Composite Tokens

Some tokens are **composites** (combinations of multiple primitive tokens):

- **typography.ts** - Combines fontSize, fontWeight, lineHeight, letterSpacing
- **motion.ts** - Combines timing, easing
- **focus.ts** - Combines color, borderWidth, shadow, outline

**Strategy for composites:**

- ~~Option A: Use DTCG composite token type (if supported)~~
- ✅ **Option B: Create as nested objects with references** (SELECTED)
- ~~Option C: Generate at build time (custom format)~~

**Implementation:**

- `motion.ts` → Nested objects in `core/motion.json` with separate properties (duration, easing, properties)
- `focus.ts` → Nested objects in `core/motion.json` with separate properties (width, style, color, offset, radius, shadow)
- Each property uses token references where possible (e.g., `{borderWidth.thin}`, `{primitive.timing.150}`)
- CSS output: Individual CSS variables for each property (e.g., `--lufa-motion-fade-duration`, `--lufa-focus-default-width`)
- JS output: Nested objects with both resolved values and CSS variable references

### String Enum Tokens

Some tokens are string enums (not dimensions):

- ✅ **borderStyle.ts** - "solid", "dashed", "dotted" - **MIGRATED**
- ❌ **cursor.ts** - "pointer", "not-allowed", "grab" - NOT YET MIGRATED

**Strategy:** ✅ Use DTCG `$type: "string"` (implemented for borderStyle)

### Responsive/Breakpoint Tokens

**breakpoint.ts** needs special handling:

- Different output formats for media queries
- Consider using DTCG dimension type + custom transform

---

## 📝 Notes

### Why Fewer Files in New System?

The new JSON structure consolidates related tokens:

- Old: 34 separate TypeScript files
- New: ~10 JSON files (primitives + core categories)

This is **GOOD** because:

- ✅ Easier to maintain
- ✅ Better organization (semantic grouping)
- ✅ Follows industry standards (DTCG format)
- ✅ Reduces build complexity

### Token Collisions Warning

Current build shows 4 collisions due to root-level `$description` fields.

- **Impact**: Harmless (descriptions are metadata)
- **Fix**: Remove root `$description` or use file-level comments

---

## 📋 Batch 2 Implementation Details (Motion/Animation)

### What Was Migrated

#### 1. Primitives Added to `primitives/motion.json`
**New timing primitives:**
- `50`, `75`, `100`, `200`, `300`, `600`, `800`, `1000` (existing: instant, fast, normal, slow, slower)
- `1500`, `2000`, `3000` (new for advancedDuration)
- Total: 20 timing primitives (was 5)

**New easing primitives:**
- `gentle` - cubic-bezier(0.33, 1, 0.68, 1) for subtle animations
- Total: 7 easing primitives (was 6)

#### 2. Core Tokens Added to `core/motion.json`

**advancedDuration (10 tokens):**
- Extended durations: `moderate` (800ms), `leisurely` (1000ms), `extended` (1500ms), `long` (2000ms), `veryLong` (3000ms)
- Stagger delays: `staggerTiny` (50ms), `staggerSmall` (75ms), `staggerBase` (100ms), `staggerLarge` (150ms), `staggerExtraLarge` (200ms)
- Use case: Complex animations, staggered entrance effects, page transitions

**transition (5 tokens):**
- Pre-built CSS transition strings (composite: timing + easing + properties)
- `fast`: "all 150ms cubic-bezier(0, 0, 0.2, 1)"
- `base`: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)"
- `slow`: "all 400ms cubic-bezier(0.4, 0, 0.2, 1)"
- `colors`: Multi-property color transitions (150ms)
- `none`: "none" (for reduced motion)
- Use case: Simple CSS transitions, hover states, theme switching

**motion (7 preset objects):**
- Composite objects with nested structure: `{ duration, easing, properties }`
- `fade`: Opacity transitions (150ms, easeOut, "opacity")
- `scale`: Transform + opacity (250ms, easeInOut, "transform, opacity")
- `slide`: Slide animations (250ms, easeOut, "transform, opacity")
- `color`: Color changes (150ms, easeInOut, "color, background-color, border-color")
- `all`: All properties (150ms, easeInOut, "all")
- `collapse`: Height + opacity (400ms, gentle, "height, opacity")
- `scroll`: Smooth scrolling (400ms, gentle, "scroll-behavior")
- Use case: Consistent animation presets for modals, tooltips, drawers, accordions

**focus (5 configuration objects):**
- Composite objects for focus indicators: `{ width, style, color, offset, radius, shadow? }`
- `default`: Standard focus ring (2px solid, 2px offset)
- `thick`: High visibility (3px solid, 2px offset)
- `inset`: Contained within element (2px solid, -2px offset)
- `shadow`: With drop shadow effect (2px solid, 0px offset, shadow)
- `inverse`: For dark backgrounds (2px solid, uses text.primary color)
- Use case: WCAG 2.4.7 compliant focus indicators, keyboard navigation

### Key Technical Decisions

1. **Composite Token Strategy: Option B (Nested Objects with References)**
   - Each composite property is a separate token that can reference other tokens
   - Generates individual CSS variables for each property
   - JavaScript consumers get nested objects with both values and CSS var references
   - Example: `motion.fade.duration` → `--lufa-motion-fade-duration: 150ms`

2. **Shadow Property: String Type**
   - `focus.shadow.shadow` uses `$type: "string"` (not `"shadow"`)
   - Reason: Shadow transform expects complex object structure, but we need simple string
   - Output: `"0 0 0 3px rgb(37 99 235 / 0.2)"` (correct)

3. **Transition Tokens: Pre-Computed Strings**
   - CSS transition strings are stored as `$type: "string"` with computed values
   - Consumers can use directly: `transition: var(--lufa-transition-fast);`
   - Eliminates need for helper functions like `getTransition()`

4. **Removed Helper Functions (as per decision)**
   - `getTransition()` from `transition.ts` - NOT MIGRATED
   - `getFocusStyle()` from `focus.ts` - NOT MIGRATED
   - Rationale: Consumers can build their own utilities, simpler token system

### Output Examples

**CSS Variables:**
```css
/* advancedDuration */
--lufa-advancedDuration-moderate: 800ms;
--lufa-advancedDuration-staggerBase: 100ms;

/* transition (pre-built strings) */
--lufa-transition-fast: all 150ms cubic-bezier(0, 0, 0.2, 1);
--lufa-transition-colors: color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1);

/* motion (composite - individual properties) */
--lufa-motion-fade-duration: 150ms;
--lufa-motion-fade-easing: cubic-bezier(0, 0, 0.2, 1);
--lufa-motion-fade-properties: opacity;

/* focus (composite - individual properties) */
--lufa-focus-default-width: 2px;
--lufa-focus-default-style: solid;
--lufa-focus-default-color: oklch(61.6% 0.199 262.881);
--lufa-focus-default-offset: 2px;
--lufa-focus-default-radius: 4px;
--lufa-focus-shadow-shadow: 0 0 0 3px rgb(37 99 235 / 0.2);
```

**JavaScript (values):**
```javascript
// advancedDuration
advancedDuration: {
  moderate: "800ms",
  staggerBase: "100ms"
}

// transition (strings)
transition: {
  fast: "all 150ms cubic-bezier(0, 0, 0.2, 1)",
  colors: "color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)"
}

// motion (nested objects)
motion: {
  fade: {
    duration: "150ms",
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    properties: "opacity"
  }
}

// focus (nested objects)
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
  }
}
```

**JavaScript (CSS variables):**
```javascript
motion: {
  fade: {
    duration: "var(--lufa-motion-fade-duration)",
    easing: "var(--lufa-motion-fade-easing)",
    properties: "var(--lufa-motion-fade-properties)"
  }
}
```

### Usage Examples for Consumers

**Using transition tokens (simplest):**
```css
.button {
  transition: var(--lufa-transition-fast);
}

.modal {
  transition: var(--lufa-transition-slow);
}
```

**Using motion composite tokens:**
```css
.tooltip {
  transition-property: var(--lufa-motion-fade-properties);
  transition-duration: var(--lufa-motion-fade-duration);
  transition-timing-function: var(--lufa-motion-fade-easing);
}
```

**Using focus tokens:**
```css
button:focus-visible {
  outline: var(--lufa-focus-default-width) var(--lufa-focus-default-style) var(--lufa-focus-default-color);
  outline-offset: var(--lufa-focus-default-offset);
  border-radius: var(--lufa-focus-default-radius);
}

.critical-action:focus-visible {
  outline: var(--lufa-focus-thick-width) var(--lufa-focus-thick-style) var(--lufa-focus-thick-color);
  outline-offset: var(--lufa-focus-thick-offset);
}
```

**Using advancedDuration for staggered animations:**
```css
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.list-item:nth-child(1) { animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 0); }
.list-item:nth-child(2) { animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 1); }
.list-item:nth-child(3) { animation-delay: calc(var(--lufa-advancedDuration-staggerBase) * 2); }
```

### Files Modified

**New sections added:**
- `primitives/motion.json` - Added 13 new timing values, 1 new easing
- `core/motion.json` - Added 4 new sections (advancedDuration, transition, motion, focus)

**Build verification:**
- ✅ All tokens resolve correctly
- ✅ CSS variables generated properly
- ✅ JavaScript values exported correctly
- ✅ JavaScript CSS variables exported correctly
- ✅ JSON complete token tree generated
- ✅ No build errors (only harmless collision warnings from root $description)

