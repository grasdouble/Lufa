# Migration Guide: v0.7.1 → v0.8.0

**Design System:** Lufa Design System  
**From Version:** v0.7.1  
**To Version:** v0.8.0  
**Migration Difficulty:** 🟡 Medium (2 breaking changes, 3 deprecations)  
**Estimated Time:** 1-2 hours for most projects  
**Last Updated:** 2026-01-26

---

## Overview

This guide helps you migrate from Lufa Design System v0.7.1 to v0.8.0, which introduces 47 new spacing and layout tokens, responsive spacing capabilities, and two intentional breaking changes (one bug fix).

**What's New:**

- ✨ 6 breakpoint tokens (xs → 2xl)
- ✨ 8 height tokens (24px → 96px)
- ✨ 18 responsive layout token variants (automatic media queries)
- ✨ 6 grid system tokens
- ✨ 5 container tokens
- ✨ 4 fluid spacing tokens
- 🐛 Box component `padding="none"` and `margin="none"` bug fixed (4px → 0px)
- ⚠️ Storybook `small` breakpoint changed (576px → 640px)

---

## Breaking Changes Summary

### Breaking Change #1: Box Component `padding="none"` and `margin="none"` Fix 🔴

**Severity:** High (visual changes in consuming applications)  
**Type:** Bug fix (breaking in fixing way)  
**Impact:** All components using `padding="none"` or `margin="none"` will have less spacing

**What Changed:**

```tsx
// BEFORE v0.8.0 (BUGGY)
<Box padding="none">
  {/* Applied 4px padding (incorrect) */}
</Box>

// AFTER v0.8.0 (FIXED)
<Box padding="none">
  {/* Applies 0px padding (correct) */}
</Box>
```

**CSS Output:**

```css
/* Before (wrong) */
.padding-none {
  padding: var(--lufa-semantic-ui-spacing-tight); /* 4px */
}

/* After (correct) */
.padding-none {
  padding: var(--lufa-primitive-spacing-0); /* 0px */
}
```

**Affected Components:**

- `Box` (direct)
- `Stack` (extends Box)
- Any custom components using Box

**Why This Changed:**

The `none` value should semantically mean "no spacing" (0px), not "tight spacing" (4px). This was a bug in the original implementation that has been corrected.

**Migration Steps:**

1. **Search your codebase** for `padding="none"` and `margin="none"`:

   ```bash
   # Find all instances
   grep -r 'padding="none"' src/
   grep -r 'margin="none"' src/
   ```

2. **Visual inspection:** Open your app and check layouts for spacing changes

3. **If you relied on the 4px spacing,** update to `"tight"`:

   ```tsx
   // Option 1: Use "tight" explicitly
   <Box padding="tight">  {/* Now explicitly 4px */}
     Content
   </Box>

   // Option 2: Use primitive spacing token
   <Box style={{ padding: 'var(--lufa-primitive-spacing-4)' }}>
     Content
   </Box>
   ```

4. **Test thoroughly** - Check all affected components in your app

**Directional Properties Also Fixed:**

All directional padding/margin properties are affected:

- `padding` / `margin`
- `paddingX` / `marginX` (horizontal)
- `paddingY` / `marginY` (vertical)
- `paddingTop` / `marginTop`
- `paddingRight` / `marginRight`
- `paddingBottom` / `marginBottom`
- `paddingLeft` / `marginLeft`

---

### Breaking Change #2: Storybook `small` Breakpoint 🟡

**Severity:** Low (dev-only, no production impact)  
**Type:** Configuration change (alignment with design tokens)  
**Impact:** Stories tested at `small` viewport will render at 640px instead of 576px

**What Changed:**

```typescript
// BEFORE v0.8.0
export const Breakpoints = {
  small: { width: 576 }, // Bootstrap-derived
};

// AFTER v0.8.0
export const Breakpoints = {
  small: { width: 640 }, // Aligned with breakpoint-sm token
};
```

**Why This Changed:**

To align Storybook viewports with the new primitive breakpoint tokens (`breakpoint-sm` = 640px), which follow modern standards (Tailwind, etc.) instead of Bootstrap legacy values.

**Who Is Affected:**

- Developers testing components in Storybook at the `small` viewport
- Visual regression tests targeting the `small` viewport

**Migration Steps:**

1. **Review stories** targeting the `small` viewport:

   ```tsx
   // In your stories
   export default {
     parameters: {
       viewport: {
         defaultViewport: 'small', // Now 640px instead of 576px
       },
     },
   };
   ```

2. **Test layouts** at the new 640px width - ensure components still look correct

3. **Update visual regression baselines** if you use Chromatic or similar tools

4. **Update documentation** that references the old 576px breakpoint

**Production Code:**

**No changes needed** - This only affects Storybook development viewports. Your production CSS and components are unaffected.

**For Storybook Story Authors:**

If you explicitly configure stories to use the `small` viewport, follow these steps:

1. **Review affected stories:**

   ```bash
   # Find stories with viewport configuration
   grep -r "defaultViewport.*small" src/ --include="*.stories.tsx"
   grep -r "viewport.*small" src/ --include="*.stories.tsx"
   ```

2. **Test at new 640px width:**
   - Open Storybook and select the "small" viewport
   - Verify your component layouts still work correctly
   - Check for any overflow, wrapping, or alignment issues

3. **If layout breaks at 640px:**

   Choose the appropriate viewport for your use case:

   ```tsx
   // Option A: Use xsmall (320px) for very narrow mobile layouts
   parameters: {
     viewport: {
       defaultViewport: 'xsmall';
     }
   }

   // Option B: Use medium (768px) if component needs more space
   parameters: {
     viewport: {
       defaultViewport: 'medium';
     }
   }

   // Option C: Remove explicit viewport (use default)
   parameters: {
     // Let component use default responsive behavior
   }
   ```

4. **Update visual regression baselines:**
   - If using Chromatic or Percy, approve new 640px screenshots
   - If using custom screenshot tests, regenerate baselines

5. **Update story documentation:**

   ```tsx
   // Before
   /**
    * Mobile layout at 576px
    */

   // After
   /**
    * Mobile layout at 640px (breakpoint-sm)
    * @see packages/design-system/tokens/src/primitives/breakpoint/scale.json
    */
   ```

**No Action Needed If:**

- Your stories don't explicitly set `viewport` parameters (they'll adapt automatically)
- Your stories use responsive tokens (they already handle breakpoint changes)
- Your stories don't target mobile viewports specifically

---

## Deprecated Tokens

### Deprecation #1: `page-padding-mobile`

**Status:** ⚠️ Deprecated in v0.8.0, will be removed in v1.0.0  
**Replacement:** `page-padding` (base variant)

**Before:**

```css
/* Old token (still works, but deprecated) */
.page {
  padding-inline: var(--lufa-core-layout-page-padding-mobile);
}
```

**After:**

```css
/* New responsive token (automatically adapts) */
.page {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px */
}
```

**Why:** The new responsive token system makes device-specific tokens redundant. The base variant is now mobile-first by default.

---

### Deprecation #2: `section-gap-mobile`

**Status:** ⚠️ Deprecated in v0.8.0, will be removed in v1.0.0  
**Replacement:** `section-gap` (base variant)

**Before:**

```css
/* Old token (still works, but deprecated) */
.section {
  margin-bottom: var(--lufa-core-layout-section-gap-mobile);
}
```

**After:**

```css
/* New responsive token (automatically adapts) */
.section {
  margin-bottom: var(--lufa-core-layout-section-gap);
  /* Mobile: 48px, Tablet: 64px, Desktop: 80px */
}
```

**Why:** Same reason as `page-padding-mobile` - responsive tokens replace device-specific variants.

---

### Deprecation #3: `container-max-width`

**Status:** ⚠️ Deprecated in v0.8.0, will be removed in v1.0.0  
**Replacement:** `container-xl` (1280px)

**Before:**

```css
/* Old token (still works, but deprecated) */
.container {
  max-width: var(--lufa-core-layout-container-max-width);
}
```

**After:**

```css
/* New container token (equivalent value) */
.container {
  max-width: var(--lufa-core-layout-container-xl);
}
```

**Why:** The new container token scale provides more flexibility (sm, md, lg, xl, 2xl) instead of a single max-width value.

---

## Migration Steps by Component Type

### Step 1: Update Box Components

**Search Pattern:**

```bash
# Find all Box components with padding/margin="none"
grep -rn 'padding="none"' src/
grep -rn 'margin="none"' src/
```

**Migration:**

```tsx
// ❌ Before (will change visually)
<Box padding="none" borderWidth="thin">
  Content
</Box>

// ✅ Option 1: Accept the fix (no spacing)
<Box padding="none" borderWidth="thin">
  Content
</Box>

// ✅ Option 2: If you need 4px, use "tight"
<Box padding="tight" borderWidth="thin">
  Content
</Box>
```

**Testing Checklist:**

- [ ] Visual inspection of all Box components
- [ ] Check layouts with `padding="none"`
- [ ] Check layouts with `margin="none"`
- [ ] Verify directional properties (`paddingX`, `paddingY`, etc.)
- [ ] Test Stack components (they extend Box)

---

### Step 2: Update Deprecated Tokens

**Search Pattern:**

```bash
# Find deprecated tokens in CSS/SCSS files
grep -rn 'page-padding-mobile' src/
grep -rn 'section-gap-mobile' src/
grep -rn 'container-max-width' src/
```

**Migration:**

```css
/* ❌ Before (deprecated) */
.page {
  padding-inline: var(--lufa-core-layout-page-padding-mobile);
  margin-bottom: var(--lufa-core-layout-section-gap-mobile);
}

.container {
  max-width: var(--lufa-core-layout-container-max-width);
}

/* ✅ After (new tokens) */
.page {
  padding-inline: var(--lufa-core-layout-page-padding);
  margin-bottom: var(--lufa-core-layout-section-gap);
}

.container {
  max-width: var(--lufa-core-layout-container-xl);
}
```

**Benefits:**

- Automatic responsive behavior (no media queries needed)
- Consistent with new token architecture
- Future-proof (won't be removed in v1.0.0)

---

### Step 3: Review Storybook Stories

**What to Check:**

1. Stories using the `small` viewport parameter
2. Visual regression test screenshots
3. Documentation referencing 576px breakpoint

**Migration:**

```tsx
// Your stories file
export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    viewport: {
      defaultViewport: 'small', // Now 640px (was 576px)
    },
  },
};
```

**Actions:**

- [ ] Test all stories at the new `small` viewport (640px)
- [ ] Update Chromatic baselines if you use visual regression testing
- [ ] Update any documentation mentioning the old 576px value

---

### Step 4: Adopt New Tokens (Optional but Recommended)

While not required, we recommend adopting the new spacing/layout tokens for better responsive behavior:

**Breakpoint Tokens:**

```css
/* Use in media queries */
@media (min-width: 768px) {
  /* Tablet and up */
  .component {
    padding: 24px;
  }
}
```

**Responsive Layout Tokens:**

```css
/* Before: Manual media queries */
.page {
  padding-inline: 16px;
}
@media (min-width: 768px) {
  .page {
    padding-inline: 24px;
  }
}
@media (min-width: 1024px) {
  .page {
    padding-inline: 32px;
  }
}

/* After: Automatic with single token */
.page {
  padding-inline: var(--lufa-core-layout-page-padding);
  /* Mobile: 16px, Tablet: 24px, Desktop: 32px (automatic) */
}
```

**Height Tokens:**

```css
/* Before: Hard-coded heights */
.button-small {
  height: 32px;
}
.button-default {
  height: 40px;
}

/* After: Semantic height tokens */
.button-small {
  height: var(--lufa-primitive-height-32);
}
.button-default {
  height: var(--lufa-primitive-height-40);
}
```

**Grid System Tokens:**

```css
/* Before: Hard-coded gaps */
.grid {
  display: grid;
  gap: 16px;
}

/* After: Semantic grid tokens */
.grid {
  display: grid;
  gap: var(--lufa-core-layout-grid-gap-default);
}
```

---

## Code Search & Replace Patterns

### Pattern 1: Replace Deprecated Tokens (Safe)

**CSS/SCSS:**

```bash
# Find and replace (review each match)
find src/ -type f \( -name "*.css" -o -name "*.scss" \) -exec sed -i '' \
  -e 's/--lufa-core-layout-page-padding-mobile/--lufa-core-layout-page-padding/g' \
  -e 's/--lufa-core-layout-section-gap-mobile/--lufa-core-layout-section-gap/g' \
  -e 's/--lufa-core-layout-container-max-width/--lufa-core-layout-container-xl/g' \
  {} \;
```

**JSON (token files):**

```bash
# Find references in token JSON files
find packages/design-system/tokens/src -type f -name "*.json" -exec grep -l "page-padding-mobile" {} \;
```

### Pattern 2: Find Box Components with none Values (Requires Review)

**React/TypeScript:**

```bash
# Find Box components with padding/margin="none"
grep -rn 'padding="none"' src/
grep -rn 'margin="none"' src/

# Find directional properties
grep -rn 'paddingX="none"' src/
grep -rn 'paddingY="none"' src/
grep -rn 'marginX="none"' src/
grep -rn 'marginY="none"' src/
```

**⚠️ Warning:** Do **not** use find/replace for Box components. Each instance needs visual inspection to determine if it should stay `"none"` (0px) or change to `"tight"` (4px).

---

## Testing Checklist

### Visual Testing

- [ ] Open your application in a browser
- [ ] Navigate to all pages with Box components
- [ ] Check for spacing changes (look for tighter layouts)
- [ ] Test responsive behavior at 640px, 768px, 1024px breakpoints
- [ ] Compare before/after screenshots if available

### Component Testing

- [ ] Run your component test suite
- [ ] Update snapshots if using visual regression
- [ ] Test Box components with `padding="none"`
- [ ] Test Stack components (they extend Box)
- [ ] Test custom components using Box

### Storybook Testing

- [ ] Open Storybook
- [ ] Switch to `small` viewport (now 640px)
- [ ] Review all stories at this breakpoint
- [ ] Update Chromatic baselines (if applicable)
- [ ] Check for layout issues at 640px vs old 576px

### Cross-Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on macOS)
- [ ] Mobile browsers (responsive viewports)

---

## Rollback Plan

If you encounter critical issues during migration:

### Option 1: Temporary Overrides (Quick Fix)

Override the fixed Box utilities temporarily while you fix issues:

```css
/* Add to your app's global CSS (temporary) */
.padding-none {
  padding: 4px !important; /* Restore old buggy behavior */
}

.margin-none {
  margin: 4px !important;
}
```

**⚠️ Warning:** This is a temporary workaround. You should fix the root cause and remove these overrides.

### Option 2: Revert to v0.7.1

If migration is taking longer than expected:

```bash
# Revert to v0.7.1
npm install @grasdouble/lufa_design-system@0.7.1
# or
yarn add @grasdouble/lufa_design-system@0.7.1
```

Then schedule time to properly migrate to v0.8.0.

---

## Migration Timeline Recommendation

### Small Project (< 50 components)

**Timeline:** 1-2 hours

1. **30 minutes:** Search and identify all affected components
2. **30 minutes:** Fix Box components with `padding="none"` / `margin="none"`
3. **15 minutes:** Replace deprecated tokens
4. **15 minutes:** Test and verify changes

### Medium Project (50-200 components)

**Timeline:** 4-6 hours

1. **1 hour:** Search and identify all affected components
2. **2 hours:** Fix Box components with `padding="none"` / `margin="none"`
3. **30 minutes:** Replace deprecated tokens
4. **30 minutes:** Review Storybook stories
5. **1 hour:** Comprehensive testing
6. **30 minutes:** Update documentation

### Large Project (200+ components)

**Timeline:** 1-2 days

1. **2 hours:** Audit all affected components
2. **4 hours:** Fix Box components (review each case)
3. **1 hour:** Replace deprecated tokens
4. **2 hours:** Update Storybook stories and visual tests
5. **2 hours:** Comprehensive testing (all browsers, viewports)
6. **1 hour:** Update internal documentation
7. **Buffer:** Extra time for unexpected issues

---

## Communication Template

Use this template to communicate the migration to your team:

```markdown
## 📣 Design System Migration: v0.7.1 → v0.8.0

**Timeline:** [Insert your timeline]  
**Assigned To:** [Team members]  
**Blocker:** [Yes/No]

### What's Changing

1. **Box Component Bug Fix:** `padding="none"` and `margin="none"` now correctly apply 0px (was 4px)
2. **Storybook Breakpoint:** `small` viewport changed to 640px (was 576px)
3. **New Tokens:** 47 new spacing/layout tokens for responsive design

### Action Items

- [ ] Review all Box components with `padding="none"` or `margin="none"`
- [ ] Update deprecated tokens (`page-padding-mobile`, `section-gap-mobile`, `container-max-width`)
- [ ] Test Storybook stories at new `small` breakpoint (640px)
- [ ] Visual QA in staging environment

### Migration Guide

See: `_bmad-output/subjects/spacing-layout-tokens/docs/migration-guide.md`

### Questions?

Contact: [Design System Team channel/email]
```

---

## FAQ

### Q: Do I have to migrate immediately?

**A:** No. Deprecated tokens will continue to work until v1.0.0 (expected 2027). However, the Box component bug fix is immediate and may cause visual changes.

### Q: Can I keep using v0.7.1?

**A:** Yes, but you won't get new features, performance improvements, and future bug fixes. We recommend migrating within 1-2 months.

### Q: Will this break my production app?

**A:** Likely yes, if you use Box components with `padding="none"` or `margin="none"`. You'll see visual changes (tighter layouts). Test thoroughly before deploying.

### Q: How do I know if I'm affected?

**A:** Run these searches in your codebase:

```bash
grep -rn 'padding="none"' src/
grep -rn 'margin="none"' src/
grep -rn 'page-padding-mobile' src/
grep -rn 'section-gap-mobile' src/
```

If you find matches, you're affected.

### Q: Can I adopt new tokens without migrating?

**A:** No. New tokens are only available in v0.8.0+. You must upgrade to use them.

### Q: What if I find a bug during migration?

**A:** Report it immediately:

1. Create a GitHub issue with `[v0.8.0 Migration]` tag
2. Include reproduction steps
3. Ping the Design System team in Slack

### Q: How do I update Chromatic baselines?

**A:** Run Chromatic with the `--update-baselines` flag:

```bash
npx chromatic --update-baselines
```

---

## Resources

- [Token Usage Guide](./token-usage-guide.md) - Comprehensive guide to new tokens
- [Responsive Design Guide](./responsive-design-guide.md) - Mobile-first strategies
- [Sprint 2 Implementation Report](../implementation/sprint-2-report.md) - Technical details
- [ADR-007: Zero-Value Token Handling](../../adrs/ADR-007-IMPLEMENTED-zero-value-token-handling.md) - Why the Box bug was fixed
- [Technical Specification](../planning/technical-spec-spacing-layout.md) - Full technical details

---

## Support

**Need Help?**

- **Slack:** #design-system-support
- **Email:** design-system-team@company.com
- **Office Hours:** Tuesdays 2-3 PM, Thursdays 10-11 AM

**Found a Bug?**

- **GitHub Issues:** https://github.com/your-org/lufa-design-system/issues
- **Label:** `v0.8.0-migration`

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-01-26  
**Maintained By:** Design System Team
