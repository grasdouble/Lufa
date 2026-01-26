# ADR-007: Zero-Value Token Handling (padding-none Bug Fix)

**Status:** Proposed  
**Date:** 2026-01-26  
**Deciders:** Design System Team, Component Team  
**Subject:** spacing-layout-tokens  
**Phase:** Planning (Phase 2)

---

## Context

The Lufa Design System has a **critical bug** in the Box component where `padding="none"` and `margin="none"` apply `4px` instead of `0px`. This occurs because the Box component's utility class generator maps "none" to the `spacing-tight` semantic token (which equals `4px`) instead of the `spacing-0` primitive token (which equals `0px`).

### The Bug

**File:** `packages/design-system/main/src/components/Box/Box.module.css`

```css
/* CURRENT (WRONG) */
.padding-none {
  padding: var(--lufa-semantic-ui-spacing-tight); /* 4px */
}

.margin-none {
  margin: var(--lufa-semantic-ui-spacing-tight); /* 4px */
}

/* EXPECTED (CORRECT) */
.padding-none {
  padding: var(--lufa-primitive-spacing-0); /* 0px */
}

.margin-none {
  margin: var(--lufa-primitive-spacing-0); /* 0px */
}
```

### Impact

**Severity:** 🔴 **Critical** - Affects all usages of Box component with `padding="none"` or `margin="none"`

**Affected Code:**

- Box component utility classes
- Stack component (extends Box)
- Any component using Box with "none" spacing prop
- Potentially affecting layout calculations and visual regressions

**Current Workaround:** Developers may be using inline styles (`style={{ padding: 0 }}`) to bypass the bug.

### Root Cause Analysis

The Box component uses a **configuration-driven approach** to generate utility classes. The configuration maps prop values (like "none", "tight", "compact") to token references. The bug appears to be in the configuration where "none" was incorrectly mapped to `spacing-tight` instead of `spacing-0`.

**Likely Configuration Structure:**

```javascript
// box.utilities.config.js (hypothetical)
const spacingMap = {
  none: 'spacing-tight', // ❌ WRONG - should be spacing-0
  tight: 'spacing-tight',
  compact: 'spacing-compact',
  default: 'spacing-default',
  comfortable: 'spacing-comfortable',
  spacious: 'spacing-spacious',
};
```

---

## Decision

### Fix Strategy: Map "none" to spacing-0 Primitive Token

**Primary Fix:** Update Box component configuration to map `"none"` → `spacing-0` (0px).

**Changes Required:**

1. Update Box component utility configuration
2. Regenerate Box.module.css (if auto-generated)
3. Test all Box component usages
4. Visual regression testing
5. Document the fix in changelog

---

## Implementation Details

### Step 1: Identify Configuration File

**Likely Files to Update:**

- `packages/design-system/main/src/components/Box/box.utilities.config.js`
- `packages/design-system/main/src/components/Box/utilities.config.ts`
- Inline configuration in Box component generator script

**Action:** Search for configuration that defines spacing prop mapping.

### Step 2: Update Mapping

**Before:**

```javascript
const spacingMap = {
  none: 'spacing-tight', // ❌ Maps to 4px
  tight: 'spacing-tight',
  compact: 'spacing-compact',
  default: 'spacing-default',
  comfortable: 'spacing-comfortable',
  spacious: 'spacing-spacious',
};
```

**After:**

```javascript
const spacingMap = {
  none: 'spacing-0', // ✅ Maps to 0px
  tight: 'spacing-tight',
  compact: 'spacing-compact',
  default: 'spacing-default',
  comfortable: 'spacing-comfortable',
  spacious: 'spacing-spacious',
};
```

### Step 3: Regenerate CSS (If Auto-Generated)

If Box utilities are auto-generated, run the generation script:

```bash
npm run generate:box-utilities
# or
npm run generate:utilities
# or
npm run build:components
```

**Expected Output:**

```css
/* Box.module.css */
.padding-none {
  padding: var(--lufa-primitive-spacing-0); /* 0px */
}

.margin-none {
  margin: var(--lufa-primitive-spacing-0); /* 0px */
}
```

### Step 4: Update TypeScript Types

If Box component has TypeScript prop types, ensure "none" is correctly typed:

```typescript
// Box.types.ts
export type SpacingSize = 'none' | 'tight' | 'compact' | 'default' | 'comfortable' | 'spacious';

export interface BoxProps {
  padding?: SpacingSize;
  margin?: SpacingSize;
  paddingX?: SpacingSize;
  paddingY?: SpacingSize;
  marginX?: SpacingSize;
  marginY?: SpacingSize;
  // ... other props
}
```

**No changes needed** - "none" is already a valid type value.

---

## Alternative Approaches Considered

### Alternative 1: Remove "none" Option Entirely

**Idea:** Remove `padding="none"` prop and require developers to use `padding={undefined}` or omit the prop.

**Rejected** because:

- **Breaking change:** All existing usages of `padding="none"` would break
- **Poor DX:** Having an explicit "none" value is more intuitive than omitting prop
- **Industry standard:** Most UI libraries support "none" value (e.g., Chakra UI, MUI)
- **Use cases:** Developers often need to explicitly reset spacing in responsive scenarios

### Alternative 2: Add New "zero" Value

**Idea:** Keep `padding="none"` mapped to 4px and add a new `padding="zero"` value for 0px.

**Rejected** because:

- **Confusing semantics:** "none" should mean "no spacing" (0px), not "minimal spacing" (4px)
- **Redundant naming:** Having both "none" and "zero" is unnecessary complexity
- **Doesn't fix bug:** Existing code with `padding="none"` would still be wrong
- **Poor DX:** Developers would need to know the difference between "none" and "zero"

### Alternative 3: Rename "none" to "tight"

**Idea:** Remove "none" prop value and require developers to use `padding="tight"` for 4px spacing.

**Rejected** because:

- **Breaking change:** More disruptive than fixing the mapping
- **Semantic mismatch:** "tight" implies minimal but visible spacing, not zero
- **Industry mismatch:** "none" universally means 0 in CSS (e.g., `padding: none` → 0)

### Alternative 4: Make "none" Context-Aware

**Idea:** Have `padding="none"` mean different things in different contexts (0px for Box, 4px for Stack).

**Rejected** because:

- **Confusing:** Same prop value should mean same thing everywhere
- **Hard to maintain:** Context-specific logic adds complexity
- **Error-prone:** Developers can't predict what "none" will do
- **Anti-pattern:** Violates principle of least surprise

---

## Migration Strategy

### Is This a Breaking Change?

**Yes**, but in a **bug-fix way** (fixing incorrect behavior, not changing intended API).

**Classification:** **Bug Fix Breaking Change**

- **Intent:** The API was always meant to have `none` = 0px
- **Reality:** Implementation was wrong (`none` = 4px)
- **Fix:** Aligns implementation with intent
- **Impact:** Layouts depending on the buggy behavior will change

### Who Is Affected?

**Potentially Affected Code:**

```tsx
// This will change from 4px to 0px padding
<Box padding="none">Content</Box>

// This will change from 4px to 0px margin
<Stack margin="none">Content</Stack>

// Directional spacing also affected
<Box paddingX="none" paddingY="default">Content</Box>
```

**Identifying Affected Usage:**

```bash
# Search for padding/margin="none" in codebase
rg 'padding="none"' --type tsx
rg 'margin="none"' --type tsx
rg "padding='none'" --type tsx
rg "margin='none'" --type tsx
```

### Communication Plan

**1. Changelog Entry (Breaking Change Section):**

```markdown
### ⚠️ BREAKING CHANGE: Box Component Spacing Fix

**Issue:** `padding="none"` and `margin="none"` were incorrectly applying 4px instead of 0px.

**Fix:** These props now correctly apply 0px (no spacing).

**Impact:** If your layout was depending on the buggy 4px spacing, you may see visual changes. Replace `padding="none"` with `padding="tight"` if you need 4px spacing.

**Migration:**

- `<Box padding="none">` → Still use `padding="none"` (now correctly 0px)
- If you need 4px spacing: `<Box padding="tight">`
- If you were working around the bug with inline styles: Remove workaround
```

**2. Migration Guide:**

```markdown
## Migrating from v0.7.1 to v0.8.0: Box Spacing Fix

### The Bug

In v0.7.1, `padding="none"` applied 4px instead of 0px.

### The Fix

In v0.8.0, `padding="none"` correctly applies 0px.

### What You Need to Do

**Option 1: Accept the fix (recommended)**

If you were expecting 0px spacing, no action needed. The bug is fixed.

**Option 2: Preserve 4px spacing**

If your layout depends on the buggy 4px spacing, update:

\`\`\`tsx
// Before
<Box padding="none">Content</Box>

// After
<Box padding="tight">Content</Box>
\`\`\`

**Option 3: Remove workarounds**

If you were working around the bug with inline styles:

\`\`\`tsx
// Before (workaround)
<Box padding="none" style={{ padding: 0 }}>Content</Box>

// After (fix applied)
<Box padding="none">Content</Box>
\`\`\`

### Testing Recommendation

1. Search codebase for `padding="none"` and `margin="none"`
2. Visually review affected components
3. Run visual regression tests
4. Check layout calculations that may have compensated for the bug
```

**3. Storybook Documentation Update:**

Add a **Migration Note** to Box component Storybook documentation:

```tsx
// Box.stories.tsx
export const SpacingNone = () => (
  <div>
    <h3>⚠️ v0.8.0 Breaking Change</h3>
    <p>
      <code>padding="none"</code> now correctly applies 0px (was incorrectly 4px in v0.7.1).
    </p>
    <p>
      If you need 4px spacing, use <code>padding="tight"</code>.
    </p>

    <Box padding="none" style={{ border: '1px solid red' }}>
      padding="none" - 0px (no padding)
    </Box>

    <Box padding="tight" style={{ border: '1px solid red' }}>
      padding="tight" - 4px (minimal padding)
    </Box>
  </div>
);
```

**4. Runtime Warning (Optional):**

Consider adding a temporary console warning for affected usage:

```typescript
// Box.tsx (temporary, remove in v0.9.0)
if (process.env.NODE_ENV === 'development') {
  if (padding === 'none' || margin === 'none') {
    console.warn(
      '[Lufa DS v0.8.0] Box spacing fix: "none" now applies 0px (was 4px in v0.7.1). ' +
        'If you need 4px spacing, use "tight". See migration guide: [URL]'
    );
  }
}
```

**Note:** This warning would fire on every render. Consider using a "shown once" pattern or omitting entirely.

---

## Testing Requirements

### Unit Tests

**Test File:** `Box.test.tsx`

```typescript
describe('Box spacing', () => {
  it('should apply 0px padding when padding="none"', () => {
    render(<Box padding="none" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');
    expect(box).toHaveClass('padding-none');

    const styles = getComputedStyle(box);
    expect(styles.padding).toBe('0px'); // Was incorrectly 4px
  });

  it('should apply 4px padding when padding="tight"', () => {
    render(<Box padding="tight" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');

    const styles = getComputedStyle(box);
    expect(styles.padding).toBe('4px');
  });

  it('should apply 0px margin when margin="none"', () => {
    render(<Box margin="none" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');

    const styles = getComputedStyle(box);
    expect(styles.margin).toBe('0px'); // Was incorrectly 4px
  });

  // Test all directional variants
  it('should apply 0px horizontal padding when paddingX="none"', () => {
    render(<Box paddingX="none" data-testid="box">Content</Box>);
    const box = screen.getByTestId('box');

    const styles = getComputedStyle(box);
    expect(styles.paddingLeft).toBe('0px');
    expect(styles.paddingRight).toBe('0px');
  });
});
```

### Visual Regression Tests

**Storybook Stories:**

```tsx
// Box.stories.tsx
export const SpacingComparison = () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <div>
      <p>padding="none" (should be 0px)</p>
      <Box padding="none" style={{ border: '2px solid red', background: 'lightblue' }}>
        Content
      </Box>
    </div>

    <div>
      <p>padding="tight" (should be 4px)</p>
      <Box padding="tight" style={{ border: '2px solid red', background: 'lightblue' }}>
        Content
      </Box>
    </div>
  </div>
);
```

**Chromatic Baseline:**

- Capture before/after screenshots
- Expect visual change (less padding on "none" variant)
- Review and approve changes in Chromatic

### Integration Tests

**Test affected components that use Box:**

```typescript
describe('Stack component', () => {
  it('should apply 0px gap when gap="none"', () => {
    render(
      <Stack gap="none" data-testid="stack">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    );

    const stack = screen.getByTestId('stack');
    const styles = getComputedStyle(stack);
    expect(styles.gap).toBe('0px');
  });
});
```

### Manual Testing Checklist

- [ ] Verify `padding="none"` applies 0px in Box component
- [ ] Verify `margin="none"` applies 0px in Box component
- [ ] Test all directional variants (paddingX, paddingY, marginX, marginY)
- [ ] Test Stack component with `gap="none"`
- [ ] Visual review of affected pages/components
- [ ] Test in all supported browsers (Chrome, Firefox, Safari, Edge)
- [ ] Check mobile/tablet viewports

---

## Rollback Plan

### If Critical Issues Are Found Post-Release

**Option 1: Hotfix Revert**

If the fix causes severe regressions:

```javascript
// Temporary revert (not recommended)
const spacingMap = {
  none: 'spacing-tight', // Revert to buggy behavior
  // ... rest of mappings
};
```

**Release:** v0.8.1 (hotfix)

**Option 2: Add Temporary Flag**

```typescript
// Box.tsx
interface BoxProps {
  padding?: SpacingSize;
  _legacyNoneBehavior?: boolean; // Temporary escape hatch
}

// Implementation
const paddingToken =
  _legacyNoneBehavior && padding === 'none'
    ? 'spacing-tight' // Old behavior
    : paddingMap[padding];
```

**Release:** v0.8.1 (with deprecation warning)  
**Remove:** v0.9.0

---

## Consequences

### Positive

✅ **Bug fixed** - "none" now correctly means 0px  
✅ **API semantics correct** - Aligns with developer expectations  
✅ **Industry alignment** - Matches how other UI libraries handle "none"  
✅ **Removes workarounds** - Developers can remove inline style hacks  
✅ **TypeScript types unchanged** - No breaking type changes  
✅ **Minimal code change** - Single configuration update

### Negative

⚠️ **Visual regressions possible** - Layouts depending on buggy 4px will change  
⚠️ **Breaking change in patch** - Technically a bug fix but impacts layout  
⚠️ **Migration burden** - Teams need to audit Box usage  
⚠️ **Communication critical** - Must clearly document the change

### Risk Assessment

**Risk Level:** 🟡 Medium

**Mitigation Strategies:**

1. **Clear communication** - Changelog, migration guide, Storybook docs
2. **Search tooling** - Provide grep commands to find affected usage
3. **Visual testing** - Chromatic catches regressions
4. **Staged rollout** - Alpha → Beta → Stable releases
5. **Rollback ready** - Hotfix plan prepared

---

## Semantic Token Consideration

### Should "none" Be a Semantic Token?

**Question:** Should we create a semantic token `spacing-none` that maps to `spacing-0`?

**Current State:**

- Primitive: `spacing-0` = 0px
- Semantic: `spacing-tight` = 4px (smallest non-zero)
- No semantic "none" token exists

**Option A: Map directly to primitive `spacing-0`** (Recommended)

```javascript
const spacingMap = {
  none: 'spacing-0', // ✅ Direct primitive reference
};
```

**Pros:**

- Simple, explicit
- No new tokens needed
- Clear intent (none = zero)

**Cons:**

- Breaks semantic abstraction layer (components reference primitive)

**Option B: Create semantic token `spacing-none`**

```json
{
  "semantic": {
    "ui": {
      "spacing-none": {
        "$value": "{primitive.spacing.0}",
        "$type": "dimension",
        "$description": "No spacing - explicitly reset spacing to zero"
      }
    }
  }
}
```

```javascript
const spacingMap = {
  none: 'spacing-none', // ✅ Semantic token
};
```

**Pros:**

- Maintains semantic layer consistency
- Allows future flexibility (e.g., high-contrast mode override)
- More "correct" architecturally

**Cons:**

- Adds token that's just an alias to 0px
- Slightly more complex

**Decision:** **Use Option A** (direct primitive reference) for simplicity. The semantic layer is for contextual meaning, and "none" has unambiguous meaning (zero). If we need semantic flexibility later, we can add `spacing-none` without breaking changes.

---

## Documentation Requirements

### Must Update

1. **Box component documentation** - Document spacing prop values and their pixel equivalents
2. **Migration guide** - Explain the fix and migration steps
3. **Changelog** - Breaking change section with clear explanation
4. **Storybook stories** - Visual examples showing "none" vs "tight"
5. **Spacing token guide** - Clarify when to use primitive vs semantic tokens

### Code Examples

**Example 1: Using "none" correctly**

```tsx
// Remove default browser spacing
<Box padding="none" margin="none">
  <img src="..." alt="..." />
</Box>
```

**Example 2: Choosing between "none" and "tight"**

```tsx
// No spacing - flush with edges
<Box padding="none">Content</Box>

// Minimal spacing - small breathing room
<Box padding="tight">Content</Box>
```

**Example 3: Responsive spacing with "none"**

```tsx
// No padding on mobile, padding on desktop
<Box padding="none" paddingMd="default">
  Content
</Box>
```

---

## References

### Internal

- **Analysis:** Section 2.1 (Problems Identified) - P2: spacing-none bug
- **Box Component:** `packages/design-system/main/src/components/Box/`
- **Spacing Tokens:** `packages/design-system/tokens/src/primitives/spacing/scale.json`

### Industry Examples

- **Chakra UI:** `padding="0"` or `p={0}` for zero padding
- **Material-UI:** `padding={0}` for zero padding
- **Tailwind:** `p-0` utility class for zero padding
- **Radix:** `padding="0"` for zero padding

All major UI libraries treat zero/none as explicitly 0px, not minimal spacing.

---

## Decision Outcome

**Chosen Option:** Fix the bug by mapping `"none"` → `spacing-0` (0px) directly in Box component configuration.

**Confidence Level:** Very High (10/10)

**Rationale:**

- **Clear bug:** "none" should mean zero, not 4px
- **Industry standard:** All major UI libraries treat "none"/0 as zero spacing
- **Simple fix:** Single configuration change
- **Low risk:** Bug fix aligns with developer expectations
- **Better DX:** Removes need for workarounds

**Key Decisions:**

1. Map `"none"` directly to primitive `spacing-0` (not semantic token)
2. Classify as **bug fix breaking change** (fixing incorrect behavior)
3. Provide clear migration guide for affected layouts
4. Add visual regression tests to catch impacts
5. Document in changelog with migration examples

**Next Steps:**

1. Locate Box component utility configuration file
2. Update mapping: `none: 'spacing-0'`
3. Regenerate utilities (if auto-generated)
4. Write unit tests for "none" spacing
5. Create Storybook visual comparison story
6. Update documentation and migration guide
7. Test in alpha release before stable

---

**Status:** ✅ Proposed (Awaiting Approval)  
**Approved By:** [Pending]  
**Date Approved:** [Pending]  
**Implementation Priority:** 🔴 Critical (Must fix in v0.8.0)
