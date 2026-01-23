# 📦 Lufa Design System - Legacy Package

**⚠️ This package contains the LEGACY design system components.**

---

## 🚨 Status: ARCHIVED

This package has been **archived** on **2026-01-23** during the **Phase 5A** implementation.

### Why Archived?

The Lufa Design System underwent a **complete redesign** to align with the new **Token Architecture v2** (438 tokens across 4 layers).

The legacy components were built with a different architecture and token system, making it incompatible with the new design principles.

---

## 📊 Legacy Components (29 total)

### Layout (9 components)

- Stack
- Container
- Grid
- Layout (Header, Sidebar, Content, Footer)
- Space
- AspectRatio
- Center
- Flex
- Divider
- Placeholder

### Navigation (7 components)

- Anchor
- Breadcrumb
- Link
- Menu
- Pagination
- Steps
- Tabs

### Forms (2 components)

- Button
- Input

### Display (6 components)

- Card
- Paper
- Avatar
- AvatarGroup
- Badge
- Kbd

### Feedback (3 components)

- Alert
- Spinner
- Skeleton

### Overlay (1 component)

- Modal

### Patterns (1 component)

- Testimonial (3 variants)

### Utilities (1 component)

- Typography

---

## 🎯 New Design System (main package)

The new design system (Phase 5A) implements **7 foundational components** with:

1. **✅ Token Architecture v2** - 438 tokens (primitives → core → semantic → component)
2. **✅ Utilities System** - Props → CSS classes for performance
3. **✅ DTCG 100% Compliance** - Design Tokens Community Group standard
4. **✅ Pattern on-X** - WCAG AAA contrast guaranteed
5. **✅ Playwright Component Tests** - Full test coverage
6. **✅ Accessibility First** - WCAG 2.1 AA compliant

### Phase 5A Components (Week 1-2)

- Box (container primitive)
- Text (typography)
- Stack (layout)
- Icon (SVG wrapper)
- Button (interactive)
- Badge (status indicators)
- Divider (separator)

### Future Phases (Phase 6+)

Legacy components will be **recreated** with the new architecture as needed.

---

## 🔧 Using Legacy Components (Not Recommended)

If you **absolutely need** a legacy component:

```bash
# Install legacy package
pnpm add @grasdouble/lufa_design-system-legacy
```

```tsx
// Import from legacy package
import { Card } from '@grasdouble/lufa_design-system-legacy';
```

**⚠️ Warning:**

- Legacy components use old token system
- May have inconsistent styling with new components
- No longer maintained or updated
- Will be deprecated in future releases

---

## 🗂️ Package Information

**Original Name:** `@grasdouble/lufa_design-system`  
**New Name:** `@grasdouble/lufa_design-system-legacy`  
**Status:** Private (not published)  
**Archived Date:** 2026-01-23  
**Reason:** Architecture redesign (Token v2)

---

## 📚 Migration Path

### For Consumers

If you're using legacy components:

1. **Audit your usage**: Check which components you use
2. **Check new components**: See if equivalent exists in new design system
3. **Migrate gradually**: Replace legacy imports with new components
4. **Request missing components**: File issue if critical component missing

### For Contributors

To recreate a legacy component with new architecture:

1. Read Token Architecture v2 docs
2. Follow utilities system patterns (Box, Text, Stack)
3. Use semantic tokens (Layer 3) only
4. Add Playwright component tests
5. Ensure WCAG 2.1 AA compliance

---

## 📖 References

- **Token Architecture v2:** `packages/design-system/tokens/`
- **New Design System:** `packages/design-system/main/`
- **Design System Guide:** `AGENTS.md` - Three-layer architecture
- **Phase 5A Plan:** `_bmad-output/phase-5a/`

---

## 💬 Questions?

If you need a legacy component recreated with new architecture, please:

1. Create an issue: `[Component Request] ComponentName`
2. Explain use case and priority
3. We'll schedule recreation in future phases

---

**Last Updated:** 2026-01-23  
**Archived By:** Phase 5A Implementation  
**New Package:** `@grasdouble/lufa_design-system` (main)
