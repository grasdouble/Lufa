# Dark Mode Visual Testing Checklist

**Date**: 2026-01-16  
**Feature**: Dark Mode Implementation with 9 Configurations  
**Storybook URL**: http://localhost:6006 (or 6007)

> 📘 **For detailed testing instructions**, see [VISUAL_TESTING_GUIDE.md](./VISUAL_TESTING_GUIDE.md)  
> 📋 **For quick reference while testing**, see [TESTING_QUICK_REFERENCE.md](./TESTING_QUICK_REFERENCE.md)

---

## 🎯 Testing Instructions

### 1. Access Storybook Toolbar Controls

Look for the toolbar at the **top of Storybook**:

- **Theme Selector**: Dropdown with "Default", "Ocean 🌊", "Forest 🌲"
- **Mode Selector**: Dropdown with "☀️ Light", "🌙 Dark", "🔄 Auto"

### 2. Test Matrix (9 Configurations)

For each configuration below, navigate through components and verify visual appearance:

| #   | Theme   | Mode  | Expected Appearance                    | Status |
| --- | ------- | ----- | -------------------------------------- | ------ |
| 1   | Default | Light | Neutral grays, light background        | ☐      |
| 2   | Default | Dark  | Near-black bg, light gray text         | ☐      |
| 3   | Default | Auto  | Follows system preference              | ☐      |
| 4   | Ocean   | Light | Blue/teal accents, light bg            | ☐      |
| 5   | Ocean   | Dark  | Deep ocean blue bg, cyan text          | ☐      |
| 6   | Ocean   | Auto  | Follows system preference              | ☐      |
| 7   | Forest  | Light | Green/earth tones, light bg            | ☐      |
| 8   | Forest  | Dark  | Deep forest green bg, light green text | ☐      |
| 9   | Forest  | Auto  | Follows system preference              | ☐      |

---

## 📋 Component Testing Checklist

### Priority Components (Must Test)

#### Navigation Components

- [ ] **Pagination** (`8. Navigation/Pagination`)
  - Verify border colors (no gray primitives)
  - Check active/hover states
  - Test in all 3 themes × 2 modes = 6 combinations

- [ ] **Steps** (`8. Navigation/Steps`)
  - Check step indicator colors
  - Verify completed/current/upcoming states
  - Ensure borders adapt to theme

- [ ] **Anchor** (`8. Navigation/Anchor`)
  - Test link colors and hover states
  - Verify underline behavior

- [ ] **Menu** (`8. Navigation/Menu`)
  - Check background colors
  - Test hover/active states

#### Pattern Components

- [ ] **TestimonialOne** (`8. Patterns/Testimonial/Testimonial One`)
  - Verify background transitions
  - Check text contrast (especially in dark mode)
  - Test quote styling

#### Utilities

- [ ] **ThemeSwitcher** (`8. Utilities/Theme Switcher`)
  - This is your main demo component!
  - Verify all buttons work (3 themes + 3 modes)
  - Check that changes apply immediately
  - Ensure localStorage persistence works

### General Components (Spot Check)

- [ ] **Alert** - Check backgrounds and borders
- [ ] **Button** - Verify all variants adapt
- [ ] **Card** - Check shadows and backgrounds
- [ ] **Modal** - Verify overlay and content backgrounds
- [ ] **Typography** - Check text contrast ratios

---

## 🔍 What to Look For

### Visual Quality

- [ ] **No harsh contrasts** - Smooth transitions between light and dark
- [ ] **Text readability** - All text is clearly legible
- [ ] **No "broken" colors** - Everything adapts properly
- [ ] **Consistent spacing** - No layout shifts between modes

### Accessibility

- [ ] **WCAG AA contrast** - Text meets 4.5:1 ratio (use browser DevTools)
- [ ] **Focus indicators** - Visible in both light and dark modes
- [ ] **Hover states** - Clear visual feedback

### Functional

- [ ] **Theme persistence** - Reload page, theme/mode preserved
- [ ] **System preference** - Auto mode respects OS dark mode setting
- [ ] **No console errors** - Check browser DevTools console
- [ ] **Smooth transitions** - No flickering when switching

---

## 🐛 Known Issues to Verify Are Fixed

- [x] ~~Primitive `dark:` classes in Pagination~~ - FIXED
- [x] ~~Primitive `dark:` classes in Steps~~ - FIXED
- [x] ~~Primitive `dark:` classes in Anchor~~ - FIXED
- [x] ~~Primitive `dark:` classes in TestimonialOne~~ - FIXED
- [x] ~~Storybook only supporting light/dark toggle~~ - FIXED (now has theme + mode)

---

## 📊 Quick Verification Commands

Run these to confirm no primitive dark classes remain:

```bash
# Should return NO results
grep -r "dark:" packages/design-system/main/src/components/ --include="*.css" --include="*.tsx"

# Verify builds are up to date
pnpm ds:all:build
```

---

## ✅ Sign-Off

**Tester**: **\*\***\_\_\_**\*\***  
**Date**: **\*\***\_\_\_**\*\***

**Issues Found**: **\*\***\_\_\_**\*\***

**Overall Status**:

- [ ] ✅ All configurations tested and working
- [ ] ⚠️ Minor issues found (document below)
- [ ] ❌ Major issues found (do not proceed to release)

**Notes**:

---

---

---

---

## 🚀 After Testing

If all tests pass:

1. Delete this checklist file
2. Run `pnpm changeset`
3. Commit changes
4. Ready for release!
