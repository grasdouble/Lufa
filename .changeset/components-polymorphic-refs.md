---
"@grasdouble/lufa_design-system": patch
---

fix(components): implement type-safe polymorphic ref forwarding

Fix TypeScript errors in 6 polymorphic components using proper type-safe patterns instead of `any`.

**Problem:**
- 9 TypeScript errors: `Type 'Ref<Element>' not assignable to specific element refs`
- Polymorphic components (Box, Button, Icon, Stack, Text, Divider) had incorrect ref typing
- Need proper pattern that maintains type safety and autocompletion

**Solution:**
Implement architect-approved pattern using `React.ComponentRef<T>`:

1. **Component implementation:**
   - Use `ForwardedRef<Element>` parameter (generic Element type)
   - Cast ref as `React.Ref<never>` when passing to dynamic component
   - Minimal internal casting only where necessary

2. **Component export:**
   - Use `React.ComponentRef<T>` to extract correct ref type for each element
   - Type-safe public API: `ref?: React.Ref<React.ComponentRef<T>>`
   - Maintains full IDE autocompletion and type checking

**Components Fixed:**
- **Box**: `HTMLDivElement` (default) | custom element via `as` prop
- **Button**: `HTMLButtonElement` (default) | `HTMLAnchorElement` (as="a")
- **Icon**: `HTMLSpanElement` (default) | custom element
- **Stack**: `HTMLDivElement` (default) | custom element
- **Text**: `HTMLParagraphElement` (default) | heading/span elements
- **Divider**: `HTMLHRElement` (default) | `HTMLDivElement` (as="div")

**Benefits:**
- ✅ Zero `any` in public API - fully type-safe
- ✅ `ComponentRef<T>` extracts correct ref types automatically
- ✅ Full IDE autocompletion preserved
- ✅ Compile-time validation catches type mismatches
- ✅ Type-safe for all component consumers

**Type Tests:**
- Add `__type-tests__/polymorphic-refs.test.tsx`
- Validates ref types for all 6 components
- Documents expected usage patterns
- Ensures type inference works correctly

**Verification:**
- TypeScript: 0 errors (was 9 errors) ✅
- Build: successful ✅
- Bundle: 44.42 kB (stable, no regression) ✅

**Impact:**
- Files changed: 7 (+241, -60 lines)
- No runtime changes - pure TypeScript type improvements
- No breaking changes for consumers
- Improved developer experience with better type safety

**Architect Review:** Winston (approved type-safe polymorphic pattern)
