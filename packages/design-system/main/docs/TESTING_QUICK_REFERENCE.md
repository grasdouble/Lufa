# 🎨 Dark Mode Testing - Quick Reference Card

**Print or keep this open while testing in Storybook**

---

## ⚡ Quick Start

```bash
pnpm ds:storybook:dev
# Opens at http://localhost:6006
```

**Toolbar Location**: Top-right corner of Storybook  
**Controls**: [Theme ▼] [Mode ▼]

---

## 🧪 9 Configurations Matrix

| #   | Theme   | Mode     | Colors        | Feel             |
| --- | ------- | -------- | ------------- | ---------------- |
| 1   | Default | ☀️ Light | Neutral gray  | Standard         |
| 2   | Default | 🌙 Dark  | Near-black bg | Standard         |
| 3   | Default | 🔄 Auto  | System pref   | Standard         |
| 4   | Ocean   | ☀️ Light | Blue/teal     | Smooth, spacious |
| 5   | Ocean   | 🌙 Dark  | Deep blue     | Smooth, spacious |
| 6   | Ocean   | 🔄 Auto  | System pref   | Smooth, spacious |
| 7   | Forest  | ☀️ Light | Green/earth   | Sharp, compact   |
| 8   | Forest  | 🌙 Dark  | Deep green    | Sharp, compact   |
| 9   | Forest  | 🔄 Auto  | System pref   | Sharp, compact   |

---

## 🎯 Priority Test Stories

**Must test these**:

- `8. Utilities/Theme Switcher` (main demo)
- `3. Navigation/Pagination` (fixed)
- `3. Navigation/Steps` (fixed)
- `3. Navigation/Anchor` (fixed)
- `5. Patterns/Testimonial/Testimonial One` (fixed)

**Good to test**:

- `2. Components/Alert`
- `2. Components/Button`
- `4. Layout/Card`
- `5. Feedback/Modal`

---

## ✅ Quick Visual Checks

For each configuration:

**Colors**:

- [ ] Background correct for theme/mode
- [ ] Text readable (good contrast)
- [ ] Interactive elements visible

**Layout**:

- [ ] No shifts between modes
- [ ] Spacing feels right for theme
- [ ] Borders visible

**Interaction**:

- [ ] Hover states work
- [ ] Focus indicators visible
- [ ] Smooth transitions

---

## 🔧 Browser Console Testing

If toolbar controls missing:

```javascript
// Change theme
document.documentElement.setAttribute('data-theme', 'ocean');
document.documentElement.setAttribute('data-theme', 'forest');

// Change mode
document.documentElement.setAttribute('data-mode', 'dark');
document.documentElement.setAttribute('data-mode', 'light');
```

---

## 🐛 Common Issues to Watch For

❌ **Bad**:

- Gray colors in Ocean theme (should be blue)
- Harsh white in dark mode (should be near-black)
- Invisible focus indicators
- Poor text contrast (< 4.5:1)
- Layout shifting between modes

✅ **Good**:

- Each theme has distinct color personality
- Dark mode uses themed colors (not just gray)
- Smooth theme/mode switching
- All text readable
- Focus visible in all modes

---

## 📊 Accessibility Minimums

**WCAG AA Requirements**:

- Normal text: **4.5:1** contrast
- Large text (18px+): **3:0:1** contrast
- UI components: **3:0:1** contrast

**Test in DevTools**:

1. Right-click text → Inspect
2. Check contrast ratio in Styles panel
3. Verify meets AA standard

---

## 🚨 Stop Testing If...

**Critical issues** (must fix before release):

- Console errors on theme/mode switch
- Components completely unreadable in dark mode
- Text contrast below 3:0:1 (fails WCAG)
- Layout breaks in any configuration
- Theme switching doesn't work

**Document the issue and stop testing to fix**

---

## ✅ Testing Complete When...

- [x] All 9 configurations tested
- [x] 5 fixed components verified
- [x] No critical issues found
- [x] Accessibility checks passed
- [x] Edge cases tested (modals, zoom, etc.)

**Then**: Fill out summary in VISUAL_TESTING_GUIDE.md

---

## 💡 Pro Tips

1. **Test systematically**: One theme at a time, light then dark
2. **Compare visually**: Keep screenshots or notes for comparison
3. **Use keyboard navigation**: Tab through components to test focus
4. **Change OS dark mode**: Test auto mode with real system preference
5. **Open multiple browser windows**: Compare themes side-by-side

---

## 📞 Need Help?

**Full guide**: `packages/design-system/main/docs/VISUAL_TESTING_GUIDE.md`

**Rebuild if CSS not updating**:

```bash
pnpm ds:all:build
pnpm ds:storybook:dev
```

**Check for errors**:

```bash
pnpm ds:all:lint
```

---

**Estimated Time**: 15-20 minutes  
**Browser**: Chrome/Edge recommended (best DevTools)

**Good luck! 🚀**
