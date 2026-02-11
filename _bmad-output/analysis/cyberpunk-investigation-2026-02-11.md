# Cyberpunk Theme Investigation Report

**Date:** 2026-02-11  
**Investigator:** Winston (Architect)  
**Epic:** ETR-EPIC-001 - Infrastructure & Tokens Foundation  
**Task:** PREP TASK #1 - Investigate Cyberpunk Special Effects Needs  
**Priority:** CRITICAL (Blocking Epic 2)

---

## Executive Summary

The Cyberpunk theme (`cyberpunk-docusaurus.css`) employs extensive **luminescent glow effects** using `box-shadow`, `text-shadow`, and `filter` properties to create a neon/synthwave aesthetic. Investigation revealed that existing token types (alpha, shadow, overlay) **cannot adequately handle glow effects** due to fundamental differences in visual implementation:

- **Shadows create depth** through dark offset below elements (e.g., `0 4px 8px rgba(0,0,0,0.1)`)
- **Glows create luminescence** through colored light emission with no offset (e.g., `0 0 20px rgba(255,0,255,0.3)`)

**Recommendation:** Add **optional glow token system** to design system infrastructure to support Cyberpunk and future cyber/neon themes without breaking existing themes.

**Impact:** Critical blocker for Epic 2 (Ocean Theme implementation) - infrastructure must be complete before new themes are built.

---

## Investigation Scope

### Objective
Determine if current token types (alpha, shadow, overlay) can handle all visual effects in the Cyberpunk theme, or if new token types are needed to avoid hardcoded values.

### Files Analyzed
- **Primary Source:** `packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css`
- **Context References:**
  - `packages/design-system/themes/TOKENS_CONVENTIONS.md` (existing token patterns)
  - `packages/design-system/themes/src/_token-template.css` (template structure)
  - `packages/design-system/themes/scripts/validate-template.ts` (validation capabilities)

### Methodology
1. Manual inspection of Cyberpunk CSS file to catalog all visual effects
2. Classification of effects by type (typography, shadow, color, glow)
3. Coverage assessment: Can each effect be handled by existing token types?
4. Gap analysis: Document effects that cannot be tokenized with current infrastructure
5. Solution design: Propose token patterns to close gaps

---

## Cyberpunk Effects Catalog

### 1. Typography Effects
- **Futuristic fonts:** Orbitron (headings), Exo 2 (body), IBM Plex Mono (code)
- **Text transforms:** Uppercase headings with expanded letter-spacing (0.05em - 0.1em)
- **Gradient text:** Linear gradients (135deg) applied to headings via `-webkit-background-clip: text`
- **Decorative elements:** Unicode symbols (◢, ◣, ◆) with glow effects

**Coverage Status:** ✅ **Handled by existing core tokens** (fonts, colors, gradients are theme-specific)

---

### 2. Neon Glow Effects (PRIMARY CONCERN)

#### 2.1 Box Glow Effects
Found on: navbar, main-wrapper, buttons, tables, pre blocks, scrollbar

**Examples from source:**
```css
/* Navbar - lines 38-40 */
box-shadow:
  0 4px 20px rgba(255, 0, 255, 0.3),
  0 0 40px rgba(0, 255, 255, 0.2);

/* Button hover - lines 130-133 */
box-shadow:
  0 0 30px rgba(255, 0, 255, 0.7),
  0 0 50px rgba(0, 255, 255, 0.5),
  inset 0 0 20px rgba(255, 0, 255, 0.2);

/* Pre blocks - lines 104-107 */
box-shadow:
  0 0 20px rgba(255, 0, 255, 0.3),
  0 0 40px rgba(0, 255, 255, 0.2),
  inset 0 0 20px rgba(255, 0, 255, 0.05);
```

**Characteristics:**
- Dual-color layers (magenta `#FF00FF` + cyan `#00FFFF`)
- No offset (x=0, y=0), only blur radius
- Multiple intensity levels (10px - 60px blur)
- Combine outer + inset glows
- Intensity varies by interaction state (default vs hover)

**Total instances:** 14 box-shadow declarations with glow effects

---

#### 2.2 Text Glow Effects
Found on: navbar brand, navbar links, headings, links, decorative symbols

**Examples from source:**
```css
/* Navbar brand - lines 48-50 */
text-shadow:
  0 0 10px rgba(255, 0, 255, 0.7),
  0 0 20px rgba(0, 255, 255, 0.5);

/* Link hover - line 164 */
text-shadow: 0 0 15px rgba(255, 0, 255, 0.8);

/* Table headings - line 147 */
text-shadow: 0 0 10px white;
```

**Characteristics:**
- Same dual-color approach (magenta + cyan)
- Smaller blur radius than box glows (5px - 20px)
- Single-layer for subtle effects, dual-layer for emphasis
- White glow used for high-contrast text (table headers)

**Total instances:** 8 text-shadow declarations with glow effects

---

#### 2.3 Filter-Based Glows
Found on: headings (h1, h2)

**Examples from source:**
```css
/* H1 - line 84 */
filter: drop-shadow(0 0 10px rgba(255, 0, 255, 0.5));

/* H1, H2 in dark mode - line 214 */
filter: drop-shadow(0 0 20px rgba(255, 0, 255, 0.8));
```

**Characteristics:**
- Used alongside text-shadow for enhanced luminescence
- Applied to complex elements where box-shadow won't work
- Same color scheme (magenta primary)

**Total instances:** 2 filter declarations with drop-shadow glows

---

### 3. Gradient Effects
- **Linear gradients:** Used extensively for backgrounds (navbar, buttons, table headers, hr)
- **Radial gradients:** Body background with subtle color spotlights (lines 200-202)
- **Direction patterns:** 90deg (horizontal), 135deg (diagonal), 180deg (vertical)

**Coverage Status:** ✅ **Handled by existing core tokens** (gradients are theme-specific compositions)

---

### 4. Traditional Shadows
**NONE FOUND.** Cyberpunk theme uses only glow effects, no traditional depth-creating shadows.

**Implication:** This theme needs `--lufa-shadow-*` tokens for depth if combining with glows, but currently relies solely on luminescence for visual interest.

---

### 5. Border & Outline Effects
- **Solid borders:** 2-3px borders using `--lufa-core-brand-primary`
- **Gradient borders:** Via `border-image` on hr elements

**Coverage Status:** ✅ **Handled by existing core tokens** (borders use core colors)

---

### 6. Background Effects
- **Radial gradient overlays:** Subtle color spotlights (5% opacity)
- **Alpha backgrounds:** `rgba(255, 0, 255, 0.1)` on code elements

**Coverage Status:** ⚠️ **Partially covered**
- Radial gradients: Theme-specific, not tokenizable
- Alpha backgrounds: ✅ Could use `--lufa-alpha-primary-10` tokens

---

## Coverage Assessment

| Effect Type | Alpha Tokens | Shadow Tokens | Overlay Tokens | Coverage Status |
|-------------|--------------|---------------|----------------|-----------------|
| **Typography** | N/A | N/A | N/A | ✅ Core tokens sufficient |
| **Box Glows (outer)** | ❌ No | ❌ No | ❌ No | ❌ **CRITICAL GAP** |
| **Box Glows (inset)** | ❌ No | ❌ No | ❌ No | ❌ **CRITICAL GAP** |
| **Text Glows** | ❌ No | ❌ No | ❌ No | ❌ **CRITICAL GAP** |
| **Filter Glows** | ❌ No | ❌ No | ❌ No | ❌ **CRITICAL GAP** |
| **Gradients** | N/A | N/A | N/A | ✅ Theme-specific |
| **Borders** | N/A | N/A | N/A | ✅ Core tokens sufficient |
| **Alpha Backgrounds** | ✅ Yes | N/A | N/A | ✅ Covered |
| **Overlays** | N/A | N/A | ✅ Yes | ✅ Covered |

### Coverage Summary
- **Covered by existing tokens:** 4/8 effect categories (50%)
- **Critical gaps:** 4/8 effect categories (50%) - all glow-related
- **Total hardcoded glow instances:** 24 (14 box + 8 text + 2 filter)

---

## Gap Analysis

### Gaps Identified

#### Gap #1: Box Glow Effects Cannot Use Shadow Tokens
**Problem:** Existing `--lufa-shadow-*` tokens are designed for depth with offset + dark color:
```css
--lufa-shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
          offset ↑ ↑         ↑ dark color for depth
```

**Why shadow tokens don't work for glows:**
1. **Offset requirement:** Shadows have y-offset (4px, 8px, 12px) to create depth perception. Glows have no offset (0 0).
2. **Color semantics:** Shadows use black/gray for darkness. Glows use vibrant colors (magenta, cyan, green) for light emission.
3. **Blur purpose:** Shadow blur softens depth edges. Glow blur radiates light equally in all directions.
4. **Layer composition:** Shadows typically single-layer. Glows often dual-layer with complementary colors.

**Impact if not addressed:**
- Themes requiring glows will hardcode values (current state: 14 instances in Cyberpunk)
- No standardization for glow intensities across themes
- Validation scripts cannot detect missing tokens (ETR-005 reported "98 violations in non-refactored files")
- Future cyber/neon themes will repeat same hardcoding pattern

---

#### Gap #2: Text Glow Effects Cannot Use Shadow Tokens
**Problem:** Same architectural mismatch as box glows, but for `text-shadow` property.

**Example mismatch:**
```css
/* What shadow tokens provide */
text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Depth below text */

/* What Cyberpunk needs */
text-shadow: 0 0 10px rgba(255, 0, 255, 0.7); /* Light radiating from text */
```

**Impact:** 8 hardcoded instances in Cyberpunk theme.

---

#### Gap #3: Inset Glows Have No Token Pattern
**Problem:** Cyberpunk uses `inset` keyword in box-shadow for inner luminescence:
```css
box-shadow: inset 0 0 20px rgba(255, 0, 255, 0.05);
```

Existing shadow tokens don't provide inset variants because depth shadows are typically outer only.

**Impact:** 3 hardcoded instances in Cyberpunk theme (buttons, pre blocks, combination effects).

---

#### Gap #4: No Color Variables for Glow Colors
**Problem:** Glow effects use specific colors (magenta, cyan) repeatedly, but no token pattern exists to reference them:
```css
/* Repeated throughout file */
rgba(255, 0, 255, 0.3)  /* Magenta - appears 14 times */
rgba(0, 255, 255, 0.2)  /* Cyan - appears 12 times */
```

**Why alpha tokens don't solve this:**
Alpha tokens like `--lufa-alpha-primary-30` reference `--lufa-primary-rgb`, which is the theme's primary brand color. But glow colors are often **complementary accent colors** separate from brand identity:
- Brand primary: Could be magenta `#FF00FF`
- Glow primary: Same magenta `#FF00FF` (30% opacity)
- Glow secondary: Complementary cyan `#00FFFF` (20% opacity) - NOT derived from brand colors

**Impact:** No reusable color references; hardcoded RGBA values throughout theme.

---

### Root Cause

**Why do these gaps exist?**

The existing token system was designed around **traditional UI design patterns** where:
- Shadows create depth and elevation (Material Design, iOS design language)
- Alpha tokens create transparency and layering
- Overlays create modal/scrim effects

**Cyberpunk introduces a fundamentally different visual paradigm:**
- **Luminescence over depth:** Elements emit light rather than cast shadows
- **Dual-color effects:** Complementary glow colors create neon aesthetic
- **Multi-layer composition:** Outer + inset glows combined for rich effects
- **No physical metaphor:** Not mimicking real-world light/shadow, but digital/neon aesthetics

**Conclusion:** Glow effects are **semantically different** from shadows and require dedicated token infrastructure.

---

## Proposed Solution

### Glow Token System

A dedicated optional token system for themes requiring luminescent effects.

#### Token Pattern
```
--lufa-glow-{type}-{intensity}
--lufa-glow-color
--lufa-glow-color-secondary
```

**Rationale for pattern:**
- `glow-` prefix clearly distinguishes from `shadow-` tokens
- `{type}` specifies application (box, text, inset)
- `{intensity}` provides standardized strength levels
- Color variables separate from pattern for flexibility

---

### Token Types

#### 1. Box Glow Tokens
For borders, cards, containers, interactive elements.

```css
--lufa-glow-box-subtle: 0 0 10px var(--lufa-glow-color), 0 0 20px var(--lufa-glow-color-secondary);
--lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
--lufa-glow-box-strong: 0 0 30px var(--lufa-glow-color), 0 0 50px var(--lufa-glow-color-secondary);
--lufa-glow-box-intense: 0 0 40px var(--lufa-glow-color), 0 0 60px var(--lufa-glow-color-secondary);
```

**Design decisions:**
- **Dual-layer by default:** Primary + secondary colors create depth in luminescence
- **Progressive blur radii:** 10-20-30-40px (primary) and 20-40-50-60px (secondary)
- **Ratio maintained:** Secondary layer always 2x blur of primary for consistent spread

---

#### 2. Text Glow Tokens
For headings, links, special text elements.

```css
--lufa-glow-text-subtle: 0 0 5px var(--lufa-glow-color);
--lufa-glow-text: 0 0 10px var(--lufa-glow-color);
--lufa-glow-text-strong: 0 0 15px var(--lufa-glow-color), 0 0 25px var(--lufa-glow-color-secondary);
--lufa-glow-text-intense: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
```

**Design decisions:**
- **Single-layer for subtle/default:** Preserves text readability
- **Dual-layer for strong/intense:** Creates dramatic emphasis without overwhelming
- **Smaller blur than box glows:** Text needs tighter glow to remain legible

---

#### 3. Inset Glow Tokens
For inner glows on containers and panels.

```css
--lufa-glow-inset-subtle: inset 0 0 10px var(--lufa-glow-color);
--lufa-glow-inset: inset 0 0 20px var(--lufa-glow-color);
--lufa-glow-inset-strong: inset 0 0 30px var(--lufa-glow-color);
```

**Design decisions:**
- **Single-layer only:** Inner glows use primary color to avoid visual clutter
- **Three intensity levels:** Fewer than box/text (intense inset would be overwhelming)
- **Can combine with outer glows:** `box-shadow: var(--lufa-glow-inset), var(--lufa-glow-box);`

---

### Intensity Levels

| Intensity | Blur Radius (Primary) | Blur Radius (Secondary) | Use Case |
|-----------|----------------------|-------------------------|----------|
| **subtle** | 5-10px | 20px | Hints, disabled states, background elements |
| **default** | 10-20px | 40px | Standard UI elements, cards, buttons |
| **strong** | 15-30px | 50px | Active states, focus rings, emphasis |
| **intense** | 20-40px | 60px | Hero elements, CTAs, headers |

**Rationale:**
- Aligns with existing shadow token intensity progression (xs/sm/md/lg/xl)
- "subtle" replaces "xs" (more semantic for glows)
- Default has no suffix for cleaner API (`--lufa-glow-box` vs `--lufa-glow-box-md`)

---

### Color Variables

#### Dual-Color Approach
```css
--lufa-glow-color: rgba(255, 0, 255, 0.3); /* Primary glow - magenta */
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2); /* Secondary glow - cyan */
```

**Why two colors?**
1. **Cyberpunk aesthetic:** Complementary neon colors (magenta/cyan, green/blue) are genre staples
2. **Visual depth:** Dual colors create richer luminescence than single-color glows
3. **Flexibility:** Single-color themes can set both to same color with different opacity

**Why RGBA format directly (not RGB variables)?**
- Glow colors are **light emission**, not **solid colors with transparency**
- Opacity is integral to luminescence intensity (30% vs 20% creates the layered effect)
- Unlike alpha tokens (which apply transparency to existing colors), glow colors ARE the effect

**Example implementations:**

**Cyberpunk (complementary colors):**
```css
--lufa-glow-color: rgba(255, 0, 255, 0.3); /* Magenta primary */
--lufa-glow-color-secondary: rgba(0, 255, 255, 0.2); /* Cyan accent */
```

**Matrix (monochrome):**
```css
--lufa-glow-color: rgba(0, 255, 65, 0.4); /* Bright neon green */
--lufa-glow-color-secondary: rgba(0, 255, 65, 0.2); /* Same green, lower opacity */
```

---

## Implementation Recommendation

### Decision: Add Glow Tokens as Optional System

**Recommendation:** Implement glow tokens as **OPTIONAL** infrastructure available to themes that need luminescent effects.

---

### Rationale

#### 1. Optional, Not Required
- **Traditional themes don't need glows:** Steampunk, Forest, Ocean use shadows for depth, not luminescence
- **Prevents bloat:** Themes only define glow tokens if aesthetically appropriate
- **Clear documentation:** Template includes "WHEN TO USE" decision guide

#### 2. Architectural Completeness
- **Infrastructure before themes:** Epic 1 (Infrastructure) must be complete before Epic 2 (Ocean Theme)
- **Prevents rework:** If glow tokens added after Ocean theme, would require refactoring
- **Validation readiness:** ETR-005 can detect missing/malformed glow tokens once infrastructure exists

#### 3. Future-Proofing
- **Anticipated themes:** Matrix, Tron, Synthwave will all need glow effects
- **Reusable pattern:** Once established, any cyber/neon theme can use same token structure
- **Consistency:** Standardizes glow intensities across all themes (currently ad-hoc)

#### 4. Backward Compatibility
- **Zero breaking changes:** Glow tokens are additive, don't affect existing themes
- **Graceful degradation:** If glow tokens undefined, CSS simply ignores them
- **Component agnostic:** Only cyber/neon components reference glow tokens

---

### Scope

#### Files to Update

1. **ETR-001: `TOKENS_CONVENTIONS.md`**
   - Add Section 4: "Glow Token Convention"
   - Document pattern, purpose, when to use
   - Provide examples (Cyberpunk, Matrix)
   - **Estimated effort:** 30 minutes

2. **ETR-002: `_token-template.css`**
   - Add glow tokens section (marked OPTIONAL)
   - Include color variables + all intensity levels
   - Add Cyberpunk/Matrix examples
   - Add decision guide comments
   - **Estimated effort:** 30 minutes

3. **ETR-005: `validate-template.ts`**
   - Add `validateGlowTokens()` method
   - Check for section existence (marked optional)
   - Validate color variables present
   - Validate all intensity levels (4 box, 4 text, 3 inset)
   - Check for usage examples
   - **Estimated effort:** 30 minutes

4. **README.md** (if applicable)
   - Update token overview to mention glow tokens
   - **Estimated effort:** 10 minutes

**Total estimated effort:** 1.5-2 hours (aligns with PREP TASK #2 estimate)

---

### Timeline

**Critical Path:**
1. **Day 1 Morning:** Complete this investigation report ✅ (current document)
2. **Day 1 Afternoon:** Update conventions, template, validation (PREP TASK #2)
3. **Day 2:** Validate updates, run all checks, team review
4. **Epic 2 Start:** Infrastructure ready, Ocean theme can proceed

**Blocker resolution:** Completing PREP TASK #2 unblocks Epic 2 entirely.

---

## Risk Assessment

### Risks if We Proceed

#### Risk 1: Added Complexity
**Description:** New token type increases design system surface area.

**Likelihood:** Low  
**Impact:** Low  
**Mitigation:**
- Clear "OPTIONAL" labeling prevents confusion
- Decision guide helps designers determine when to use
- Validation script catches implementation errors

#### Risk 2: Performance Impact
**Description:** Multiple blur effects can be GPU-intensive.

**Likelihood:** Medium  
**Impact:** Low-Medium  
**Mitigation:**
- Document performance considerations in conventions
- Recommend testing on lower-end devices
- Suggest reducing intensity in high-contrast mode for accessibility

#### Risk 3: Over-Use in Inappropriate Themes
**Description:** Designers might add glows to non-cyber themes incorrectly.

**Likelihood:** Low  
**Impact:** Low  
**Mitigation:**
- Strong documentation: "Only for cyber/neon aesthetics"
- Template includes clear examples of appropriate use cases
- Code review process catches aesthetic mismatches

---

### Risks if We Don't Proceed

#### Risk 1: Inconsistent Glow Implementations
**Description:** Every cyber/neon theme will invent own glow patterns.

**Likelihood:** High  
**Impact:** High  
**Consequence:**
- No standardization across themes
- Difficult to maintain (hardcoded values scattered)
- Validation scripts cannot detect issues
- **Current state:** 24 hardcoded instances in Cyberpunk alone

#### Risk 2: Epic 2 Rework
**Description:** If glow tokens added after Ocean theme, may need refactoring.

**Likelihood:** Medium  
**Impact:** High  
**Consequence:**
- Ocean theme built with incomplete infrastructure
- Potential rework if Ocean needs any special effects
- Delays Epic 2 timeline

#### Risk 3: Validation Gap
**Description:** ETR-005 cannot detect glow-related issues without token infrastructure.

**Likelihood:** High  
**Impact:** Medium  
**Consequence:**
- **Current:** "98 violations in non-refactored files" (likely includes glow hardcoding)
- Cannot measure progress on refactoring Cyberpunk theme
- Quality assurance gap in design system

#### Risk 4: Technical Debt Accumulation
**Description:** Deferring glow tokens means Cyberpunk stays in hardcoded state.

**Likelihood:** High  
**Impact:** Medium  
**Consequence:**
- Theme harder to maintain (scattered magic numbers)
- Future themes duplicate same hardcoding pattern
- Infrastructure gaps compound over time

---

### Mitigation Strategy

**Recommended path:** **Proceed with glow token implementation** (PREP TASK #2).

**Rationale:**
- Risks of proceeding are **low and easily mitigated**
- Risks of not proceeding are **high with significant impact**
- Effort investment is small (1.5-2 hours) vs. potential rework cost
- Unblocks Epic 2 with confidence in complete infrastructure

---

## Next Steps

### Immediate Actions (PREP TASK #2)

**Owner:** Charlie (Senior Dev) + Winston (Architect)  
**Deadline:** Day 1-2 of Prep Sprint

1. **Update `TOKENS_CONVENTIONS.md`**
   - Add Section 4: Glow Token Convention
   - Include pattern, purpose, when-to-use guide
   - Provide Cyberpunk + Matrix examples
   - Document shadow vs glow differences

2. **Update `_token-template.css`**
   - Add OPTIONAL glow tokens section
   - Include all 11 glow tokens (4 box + 4 text + 3 inset)
   - Add color variable definitions
   - Include decision guide and examples

3. **Update `validate-template.ts`**
   - Add `validateGlowTokens()` method
   - Check section existence (marked optional)
   - Validate color variables (primary + secondary)
   - Validate intensity levels (all 11 tokens)
   - Check for examples (Cyberpunk + Matrix)
   - Validate usage guidance present

4. **Run Validation Suite**
   ```bash
   npm run validate:tokens
   npm run validate:template
   ```

5. **Team Review**
   - Quick review of glow token additions
   - Confirm optional status clear in documentation
   - Approve before Epic 2 starts

---

### Follow-Up Actions (Post-Epic 1)

6. **Refactor Cyberpunk Theme (Epic 3 or later)**
   - Replace 24 hardcoded glow instances with glow tokens
   - Validate with ETR-005
   - Document before/after for case study

7. **Update Docusaurus Theme Guide**
   - Add glow token section
   - Provide usage examples
   - Include performance best practices

---

## Appendix

### A. Validation Script Results

**Context from retrospective:**
> ETR-005 detected "98 violations in non-refactored files"

**Analysis:**
- Cyberpunk theme contains **24 glow-related declarations** (14 box + 8 text + 2 filter)
- Each glow declaration contains **2-4 hardcoded RGBA values** (dual-layer effects)
- Estimated **48-96 hardcoded color values** in Cyberpunk theme alone
- Additional violations likely include:
  - Other hardcoded effects (gradients, borders)
  - Non-tokenized colors
  - Legacy CSS from pre-token era

**Implication:** Glow tokens would reduce violation count significantly once Cyberpunk refactored.

---

### B. Examples from Cyberpunk Theme

#### Example 1: Navbar Glow (Multi-Layer Box Glow)
**Current Implementation (Hardcoded):**
```css
/* cyberpunk-docusaurus.css:38-40 */
& .navbar {
  box-shadow:
    0 4px 20px rgba(255, 0, 255, 0.3),
    0 0 40px rgba(0, 255, 255, 0.2);
}
```

**Proposed Tokenized Version:**
```css
[data-color-theme='cyberpunk'] {
  --lufa-glow-color: rgba(255, 0, 255, 0.3);
  --lufa-glow-color-secondary: rgba(0, 255, 255, 0.2);
  --lufa-glow-box: 0 0 20px var(--lufa-glow-color), 0 0 40px var(--lufa-glow-color-secondary);
}

& .navbar {
  box-shadow: var(--lufa-glow-box);
}
```

**Benefits:**
- Reusable pattern (navbar uses same glow as buttons, cards)
- Single source of truth for glow colors
- Easy to adjust intensity (change token, not scattered values)

---

#### Example 2: Button Hover (Intense Glow + Inset)
**Current Implementation (Hardcoded):**
```css
/* cyberpunk-docusaurus.css:130-133 */
& button:hover {
  box-shadow:
    0 0 30px rgba(255, 0, 255, 0.7),
    0 0 50px rgba(0, 255, 255, 0.5),
    inset 0 0 20px rgba(255, 0, 255, 0.2);
}
```

**Proposed Tokenized Version:**
```css
& button:hover {
  box-shadow: var(--lufa-glow-box-strong), var(--lufa-glow-inset);
}
```

**Benefits:**
- Combines outer + inset glows declaratively
- Maintains standard intensity progression (strong = 30px/50px blur)
- Easier to read intent ("strong glow with inset")

---

#### Example 3: Text Glow on Links
**Current Implementation (Hardcoded):**
```css
/* cyberpunk-docusaurus.css:55-56 */
& .navbar__link:hover {
  text-shadow: 0 0 10px rgba(255, 0, 255, 0.8);
}
```

**Proposed Tokenized Version:**
```css
& .navbar__link:hover {
  text-shadow: var(--lufa-glow-text);
}
```

**Benefits:**
- Consistent text glow across all links
- Reusable pattern for any glowing text
- Centralized intensity control

---

### C. References

#### Related Documents
- **ETR-001:** `packages/design-system/themes/TOKENS_CONVENTIONS.md` - Token naming conventions
- **ETR-002:** `packages/design-system/themes/src/_token-template.css` - Token template
- **ETR-005:** `packages/design-system/themes/scripts/validate-template.ts` - Validation script
- **Epic 1 Retrospective:** `_bmad-output/retrospectives/epic-1-retro-2026-02-11.md` - Context for this investigation

#### Implementation Files
- **Cyberpunk Theme (Primary Source):** `packages/design-system/docusaurus/src/css/cyberpunk-docusaurus.css`
- **Glow Token Spec (Result):** `TOKENS_CONVENTIONS.md:325-624`
- **Glow Template (Result):** `_token-template.css:299-515`

#### Design System Standards
- **Material Design Elevation:** Reference for shadow token precedent
- **CSS box-shadow spec:** [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow)
- **CSS text-shadow spec:** [MDN Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/text-shadow)

---

## Appendix D: Technical Specifications

### Glow Token Requirements

#### Color Variable Requirements
- **MUST define two color variables:**
  - `--lufa-glow-color` (primary luminescence)
  - `--lufa-glow-color-secondary` (accent luminescence)
- **MUST use RGBA format:** `rgba(R, G, B, opacity)`
- **Recommended opacity range:** 0.2 - 0.5 for visibility without overwhelming

#### Box Glow Requirements
- **MUST provide 4 intensity levels:** subtle, default, strong, intense
- **MUST use dual-layer pattern:** Primary + secondary colors
- **MUST have zero offset:** `0 0 {blur}px` (not `0 4px {blur}px`)
- **Progressive blur ratios:**
  - Subtle: 10px/20px
  - Default: 20px/40px
  - Strong: 30px/50px
  - Intense: 40px/60px

#### Text Glow Requirements
- **MUST provide 4 intensity levels:** subtle, default, strong, intense
- **Subtle/default use single-layer:** Primary color only (readability)
- **Strong/intense use dual-layer:** Primary + secondary colors
- **Smaller blur than box glows:** 5-20px range (vs 10-60px for box)

#### Inset Glow Requirements
- **MUST provide 3 intensity levels:** subtle, default, strong (no intense)
- **MUST use single-layer:** Primary color only
- **MUST include inset keyword:** `inset 0 0 {blur}px`
- **Progressive blur:** 10px/20px/30px

#### Validation Requirements
- Section marked "OPTIONAL - Cyber/Neon Themes Only"
- Decision guide present ("WHEN TO USE")
- Real-world examples provided (minimum 2 themes)
- Glow vs shadow comparison documented
- Mode-aware adjustments explained
- Combining glows with shadows documented

---

## Conclusion

The Cyberpunk theme investigation has revealed a **critical infrastructure gap**: glow effects cannot be adequately handled by existing shadow, alpha, or overlay tokens due to fundamental differences in visual implementation and semantic purpose.

**Key Findings:**
- ✅ 24 glow effect instances cataloged (14 box + 8 text + 2 filter)
- ✅ Coverage assessment complete: 0% of glow effects covered by existing tokens
- ✅ Gap identified: Luminescence requires dedicated token infrastructure
- ✅ Proposed solution: Optional glow token system with 11 tokens + 2 color variables

**Recommendation:** **Proceed with PREP TASK #2** to add glow tokens to design system infrastructure before Epic 2 (Ocean Theme) begins.

**Impact:** Resolves critical blocker, prevents technical debt, enables standardized glow implementations across all future cyber/neon themes.

---

**Investigation Status:** ✅ **COMPLETE**  
**Next Step:** Trigger PREP TASK #2 (Update Conventions/Templates)  
**Deliverable:** This report serves as architectural decision record for glow token addition.

**Approval Required:** Winston (Architect) recommends proceeding. Charlie (Senior Dev) + Team to review and approve implementation.
