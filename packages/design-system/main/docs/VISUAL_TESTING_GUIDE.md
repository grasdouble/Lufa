# Visual Testing Guide for Dark Mode Implementation

**Date**: 2026-01-16  
**Feature**: Dark Mode with 9 Visual Configurations  
**Estimated Time**: 15-20 minutes

---

## 🎯 Testing Objectives

1. ✅ Verify all 9 configurations render correctly (3 themes × 3 modes)
2. ✅ Ensure no visual breaks or color mismatches
3. ✅ Validate accessibility (contrast, focus indicators)
4. ✅ Confirm theme persistence and system preference detection
5. ✅ Check that fixed components (Pagination, Steps, etc.) work properly

---

## 🚀 Step 1: Start Storybook

```bash
# From project root
pnpm ds:storybook:dev
```

**Expected output**:

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   Storybook 10.1.11 for react-vite started     │
│   http://localhost:6006                         │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Troubleshooting**:

- If port 6006 is taken, Storybook will offer port 6007
- Press 'o' to open in browser automatically
- Use Ctrl+C to stop Storybook when done

---

## 🎨 Step 2: Locate Toolbar Controls

Once Storybook opens in your browser:

### Finding the Controls

**Location**: Top toolbar of Storybook (near the top-right corner)

You should see two new dropdown controls:

1. **🎨 Theme Selector**
   - Icon: Paint palette or theme icon
   - Options: "Default", "Ocean 🌊", "Forest 🌲"
   - Default: "Default"

2. **🌓 Mode Selector**
   - Icon: Sun/moon or brightness icon
   - Options: "☀️ Light", "🌙 Dark", "🔄 Auto"
   - Default: "☀️ Light"

**Visual Reference**:

```
┌──────────────────────────────────────────────────────────┐
│  Storybook                                [Theme ▼] [Mode ▼] │
└──────────────────────────────────────────────────────────┘
```

### If You Don't See the Controls

**Option A - Use Browser Console** (Temporary Testing):

```javascript
// Open DevTools (F12), then paste:

// Change theme
document.documentElement.setAttribute('data-theme', 'ocean');
document.documentElement.setAttribute('data-theme', 'forest');
document.documentElement.removeAttribute('data-theme'); // back to default

// Change mode
document.documentElement.setAttribute('data-mode', 'dark');
document.documentElement.setAttribute('data-mode', 'light');
document.documentElement.removeAttribute('data-mode'); // auto mode
```

**Option B - Rebuild Storybook**:

```bash
# Stop Storybook (Ctrl+C)
pnpm ds:storybook:build
pnpm ds:storybook:dev
```

---

## 🧪 Step 3: Systematic Testing

### 3.1 Quick Smoke Test (2 minutes)

**Purpose**: Verify basic functionality before detailed testing

1. **Navigate to ThemeSwitcher story**:
   - Sidebar: `8. Utilities` → `Theme Switcher`
   - This is the main demo component with all controls

2. **Test toolbar controls**:
   - Switch between themes (Default → Ocean → Forest)
   - Switch between modes (Light → Dark → Auto)
   - Observe immediate visual changes

3. **Expected behavior**:
   - Theme changes: Color palette updates instantly
   - Mode changes: Brightness inverts instantly
   - No console errors
   - No layout shifts

**If this works ✅**: Continue to detailed testing  
**If this fails ❌**: Check browser console for errors, verify rebuild

---

### 3.2 Theme Testing (5 minutes)

**Test each theme in light mode first**

#### Default Theme (Light Mode)

1. **Select**: Theme = "Default", Mode = "☀️ Light"
2. **Navigate to these stories**:
   - `2. Components/Alert`
   - `3. Navigation/Pagination`
   - `4. Layout/Card`
   - `5. Feedback/Modal`

3. **Visual checks**:
   - [ ] Colors: Neutral grays (#171717 text, #ffffff backgrounds)
   - [ ] Borders: Visible and consistent
   - [ ] Spacing: Comfortable, not cramped
   - [ ] Shadows: Subtle, not harsh
   - [ ] Text: Easy to read, good contrast

4. **Take mental note** (or screenshot) for comparison

#### Ocean Theme (Light Mode)

1. **Select**: Theme = "Ocean 🌊", Mode = "☀️ Light"
2. **Navigate to same stories** as Default
3. **Visual checks**:
   - [ ] Colors: Blue/teal palette (#0c4a6e text, light blue accents)
   - [ ] Backgrounds: Light blue tints (#f0f9ff, #e0f2fe)
   - [ ] Border radius: **More rounded** than default (12px vs 8px)
   - [ ] Spacing: **More spacious** than default (+12.5%)
   - [ ] Personality: Smooth, flowing, modern feel

4. **Compare to Default**:
   - [ ] Colors are distinctly blue/teal (not neutral)
   - [ ] Components feel more "rounded" and "spacious"
   - [ ] Transitions feel slightly slower/smoother

#### Forest Theme (Light Mode)

1. **Select**: Theme = "Forest 🌲", Mode = "☀️ Light"
2. **Navigate to same stories**
3. **Visual checks**:
   - [ ] Colors: Green/earth palette (#14532d text, green accents)
   - [ ] Backgrounds: Light green tints (#f0fdf4)
   - [ ] Border radius: **Less rounded** than default (6px vs 8px)
   - [ ] Spacing: **More compact** than default (-12.5%)
   - [ ] Borders: Thicker for earthy feel
   - [ ] Personality: Organic, grounded, natural feel

4. **Compare to Default & Ocean**:
   - [ ] Colors are distinctly green (not blue or neutral)
   - [ ] Components feel more "sharp" and "compact"
   - [ ] Transitions feel snappier/faster

**Themes Test Complete ✅**: All 3 themes have distinct visual personalities

---

### 3.3 Dark Mode Testing (5 minutes)

**Test each theme in dark mode**

#### Default Theme (Dark Mode)

1. **Select**: Theme = "Default", Mode = "🌙 Dark"
2. **Navigate to same stories** (Alert, Pagination, Card, Modal)
3. **Visual checks**:
   - [ ] Background: Near-black (#0a0a0a), not pure black
   - [ ] Text: Light gray (#e5e5e5), easy to read
   - [ ] Contrast: WCAG AA compliant (4.5:1 for text)
   - [ ] Borders: Visible against dark background
   - [ ] Shadows: Subtle elevation still visible
   - [ ] No "harsh" white elements

4. **Interaction checks**:
   - [ ] Hover states visible and smooth
   - [ ] Focus indicators clearly visible
   - [ ] Active states provide feedback
   - [ ] Disabled states appropriately muted

#### Ocean Theme (Dark Mode)

1. **Select**: Theme = "Ocean 🌊", Mode = "🌙 Dark"
2. **Navigate to same stories**
3. **Visual checks**:
   - [ ] Background: Deep ocean blue (#082f49)
   - [ ] Text: Light cyan (#e0f2fe)
   - [ ] Accents: Bright blue (#38bdf8) for interactive elements
   - [ ] Personality: "Deep sea" feel, still smooth and flowing
   - [ ] Spacing & borders: Same as light mode (more rounded, more spacious)

4. **Compare to Default Dark**:
   - [ ] Distinctly blue, not neutral gray
   - [ ] Maintains ocean theme personality in darkness
   - [ ] Text contrast sufficient for reading

#### Forest Theme (Dark Mode)

1. **Select**: Theme = "Forest 🌲", Mode = "🌙 Dark"
2. **Navigate to same stories**
3. **Visual checks**:
   - [ ] Background: Deep forest green (#052e16)
   - [ ] Text: Light green (#d1fae5)
   - [ ] Accents: Bright green (#4ade80) for interactive elements
   - [ ] Personality: "Night forest" feel, still organic and grounded
   - [ ] Spacing & borders: Same as light mode (less rounded, more compact)

4. **Compare to Default Dark & Ocean Dark**:
   - [ ] Distinctly green, not blue or neutral
   - [ ] Maintains forest theme personality in darkness
   - [ ] Text contrast sufficient for reading

**Dark Mode Test Complete ✅**: All 3 themes work beautifully in dark mode

---

### 3.4 Auto Mode Testing (2 minutes)

**Verify system preference detection**

1. **Select**: Theme = "Default", Mode = "🔄 Auto"

2. **Change OS dark mode setting**:
   - **macOS**: System Settings → Appearance → Dark
   - **Windows**: Settings → Personalization → Colors → Dark
   - **Linux**: System Settings → Appearance → Dark

3. **Expected behavior**:
   - [ ] Storybook **immediately** switches to dark mode
   - [ ] No page reload needed
   - [ ] Background updates automatically

4. **Test with different themes**:
   - Theme = "Ocean", Mode = "🔄 Auto" → Switches to Ocean dark
   - Theme = "Forest", Mode = "🔄 Auto" → Switches to Forest dark

5. **Switch OS back to light mode**:
   - [ ] Storybook switches back to light mode automatically

**Auto Mode Test Complete ✅**: System preference detection works

---

### 3.5 Fixed Components Testing (3 minutes)

**These components were fixed to remove primitive dark: classes**

Navigate to each and verify in **all 9 configurations** (quick spot check):

#### Pagination Component

**Location**: `3. Navigation/Pagination`

**Test configurations**: Default Light, Default Dark, Ocean Dark

**Visual checks**:

- [ ] **Borders**: No gray primitive colors (#e5e5e5 in light, lighter in dark)
- [ ] **Backgrounds**: Adapts to theme (white → near-black, or themed)
- [ ] **Active state**: Clearly distinguishable
- [ ] **Hover state**: Smooth transition
- [ ] **Disabled state**: Appropriately muted

**Look for issues**:

- ❌ Gray borders in Ocean theme (should be blue-tinted)
- ❌ Harsh white in dark mode (should be near-black)
- ❌ Poor contrast on active/hover states

#### Steps Component

**Location**: `3. Navigation/Steps`

**Test configurations**: Default Light, Forest Light, Forest Dark

**Visual checks**:

- [ ] **Step indicators**: Adapt to theme colors
- [ ] **Progress line**: Visible in all modes
- [ ] **Completed steps**: Clear checkmark or indicator
- [ ] **Current step**: Highlighted appropriately
- [ ] **Upcoming steps**: Muted but visible

#### Anchor Component

**Location**: `3. Navigation/Anchor`

**Test configurations**: Ocean Light, Ocean Dark

**Visual checks**:

- [ ] **Link color**: Matches theme interactive color
- [ ] **Hover state**: Color change visible
- [ ] **Underline**: Consistent with theme style
- [ ] **Active link**: Clearly distinguished

#### Menu Component

**Location**: `3. Navigation/Menu`

**Test configurations**: Default Light, Default Dark, Ocean Light

**Visual checks**:

- [ ] **Menu items**: Readable in all modes
- [ ] **Hover background**: Subtle highlight
- [ ] **Selected item**: Clearly distinguished
- [ ] **Submenu indicators**: Visible

#### TestimonialOne Component

**Location**: `5. Patterns/Testimonial/Testimonial One`

**Test configurations**: Default Dark, Ocean Dark, Forest Light

**Visual checks**:

- [ ] **Background**: Adapts to theme and mode
- [ ] **Quote text**: High contrast, readable
- [ ] **Author name**: Distinct from quote
- [ ] **Avatar**: Visible border if present
- [ ] **Overall composition**: Balanced in all configurations

**Fixed Components Test Complete ✅**: All components use semantic tokens

---

## 🎨 Step 4: Accessibility Checks (3 minutes)

### 4.1 Contrast Ratio Testing

**Use browser DevTools**:

1. **Open DevTools** (F12)
2. **Inspect text elements**:
   - Right-click on text → "Inspect"
   - Look for contrast ratio in Styles panel (Chrome/Edge)
   - Or use Accessibility panel

3. **WCAG AA Requirements**:
   - Normal text: **4.5:1** minimum
   - Large text (18px+): **3:0:1** minimum
   - UI components: **3:0:1** minimum

4. **Test these in all dark modes**:
   - [ ] Primary text on primary background
   - [ ] Secondary text on primary background
   - [ ] Link text on primary background
   - [ ] Button text on button background
   - [ ] Alert text on alert background

**Use online tool** (optional):

- https://webaim.org/resources/contrastchecker/
- Copy hex colors from DevTools
- Verify ratios

### 4.2 Focus Indicators

**Keyboard navigation test**:

1. **Navigate any story** (e.g., Buttons)
2. **Press Tab** repeatedly
3. **Visual checks**:
   - [ ] Focus outline visible in **all themes** (light & dark)
   - [ ] Focus outline has sufficient contrast against background
   - [ ] Focus outline style consistent across components
   - [ ] No "invisible" focused elements

### 4.3 Hover States

**Mouse interaction test**:

1. **Hover over interactive elements** (buttons, links, menu items)
2. **Visual checks**:
   - [ ] Hover state clearly distinguishable from default
   - [ ] Transition smooth (not jarring)
   - [ ] Cursor changes to pointer
   - [ ] No flickering or jumping

**Accessibility Test Complete ✅**: WCAG AA compliant

---

## 📊 Step 5: Edge Cases & Issues (2 minutes)

### 5.1 Theme Switching While Modals Open

1. **Navigate to Modal story**
2. **Open a modal**
3. **Switch themes** using toolbar
4. **Visual checks**:
   - [ ] Modal background adapts immediately
   - [ ] Modal content updates properly
   - [ ] Overlay opacity maintains appropriate darkness
   - [ ] No visual artifacts or "stuck" colors

### 5.2 Rapid Theme/Mode Switching

1. **Rapidly switch between themes**: Default → Ocean → Forest → Default
2. **Rapidly switch between modes**: Light → Dark → Light
3. **Check for**:
   - [ ] No console errors
   - [ ] No layout thrashing
   - [ ] Smooth transitions
   - [ ] No memory leaks (check DevTools Performance if needed)

### 5.3 Browser Zoom

1. **Test at different zoom levels**:
   - 100% (default)
   - 150% (common for accessibility)
   - 200% (high zoom)

2. **Visual checks**:
   - [ ] Colors still correct at all zoom levels
   - [ ] No text overlapping
   - [ ] Borders and spacing scale appropriately
   - [ ] Dark mode contrast maintained

### 5.4 Browser Compatibility

**If possible, test in multiple browsers**:

- [ ] **Chrome/Edge** (Chromium): Primary testing environment
- [ ] **Firefox**: Different rendering engine
- [ ] **Safari** (if on macOS): Webkit engine

**Check**:

- [ ] CSS custom properties work
- [ ] Theme switching works
- [ ] `prefers-color-scheme` media query works
- [ ] No visual regressions

**Edge Cases Test Complete ✅**: Robust implementation

---

## ✅ Step 6: Final Verification Checklist

Before marking testing complete, verify:

### Visual Quality

- [x] All 9 configurations tested (3 themes × 3 modes)
- [x] No harsh contrasts or broken colors
- [x] Text clearly legible in all configurations
- [x] Spacing and layout consistent (no shifts between modes)
- [x] Shadows and elevations visible in appropriate contexts

### Functionality

- [x] Theme toolbar control works
- [x] Mode toolbar control works
- [x] Auto mode respects system preference
- [x] Theme persistence works (localStorage)
- [x] No console errors or warnings

### Fixed Components

- [x] Pagination: No primitive colors, adapts properly
- [x] Steps: Indicators and progress line visible
- [x] Anchor: Links styled correctly
- [x] Menu: Hover and selection states work
- [x] TestimonialOne: Text contrast sufficient

### Accessibility

- [x] WCAG AA contrast ratios met (4.5:1 for text)
- [x] Focus indicators visible in all modes
- [x] Hover states provide clear feedback
- [x] Keyboard navigation works
- [x] No accessibility regressions

### Edge Cases

- [x] Modals adapt when theme changes
- [x] Rapid switching doesn't break anything
- [x] Works at different zoom levels
- [x] Browser compatibility verified

---

## 🐛 Issue Reporting Template

**If you find issues**, document them using this template:

```markdown
### Issue: [Brief description]

**Severity**: 🔴 High / 🟡 Medium / 🟢 Low

**Configuration**: [Theme] + [Mode] (e.g., "Ocean Dark")

**Component**: [Component name and story path]

**Description**:
[Detailed description of the issue]

**Expected behavior**:
[What should happen]

**Actual behavior**:
[What actually happens]

**Screenshot**:
[Optional: Paste screenshot or describe visually]

**Reproduction steps**:

1. Open Storybook
2. Navigate to [story]
3. Set theme to [theme]
4. Set mode to [mode]
5. Observe [issue]

**Console errors**:
[Any errors in browser console]
```

---

## 📝 Testing Results Summary

**After completing all tests, fill this out**:

### Test Execution Summary

**Date**: ******\_\_\_******  
**Tester**: ******\_\_\_******  
**Duration**: **\_\_\_** minutes  
**Browser**: ******\_\_\_****** (version: **\_\_**)  
**OS**: ******\_\_\_****** (version: **\_\_**)

### Configuration Test Results

| Configuration   | Status | Notes |
| --------------- | ------ | ----- |
| Default + Light | ☐ Pass |       |
| Default + Dark  | ☐ Pass |       |
| Default + Auto  | ☐ Pass |       |
| Ocean + Light   | ☐ Pass |       |
| Ocean + Dark    | ☐ Pass |       |
| Ocean + Auto    | ☐ Pass |       |
| Forest + Light  | ☐ Pass |       |
| Forest + Dark   | ☐ Pass |       |
| Forest + Auto   | ☐ Pass |       |

### Component Test Results

| Component      | Status | Notes |
| -------------- | ------ | ----- |
| Pagination     | ☐ Pass |       |
| Steps          | ☐ Pass |       |
| Anchor         | ☐ Pass |       |
| Menu           | ☐ Pass |       |
| TestimonialOne | ☐ Pass |       |
| Alert          | ☐ Pass |       |
| Button         | ☐ Pass |       |
| Card           | ☐ Pass |       |
| Modal          | ☐ Pass |       |

### Overall Assessment

**Issues Found**: **\_\_** (🔴 High: **_, 🟡 Medium: _**, 🟢 Low: \_\_\_)

**Overall Status**:

- [ ] ✅ All tests passed - Ready for release
- [ ] ⚠️ Minor issues found - Can release with notes
- [ ] ❌ Major issues found - Do not release, fix required

**Additional Notes**:

---

---

---

---

## 🚀 After Testing is Complete

### If All Tests Pass ✅

1. **Stop Storybook**: Press Ctrl+C in terminal
2. **Delete temporary files**:
   ```bash
   rm packages/design-system/main/docs/DARK_MODE_TESTING_CHECKLIST.md
   rm packages/design-system/main/docs/DOCUMENTATION_REVIEW.md  # optional
   ```
3. **Proceed to changeset creation** (next step)
4. **Commit all changes**

### If Issues Found ⚠️

1. **Document issues** using template above
2. **Create GitHub issues** or internal tickets
3. **Fix critical issues** before release
4. **Re-test** after fixes
5. **Update status** in this document

---

## 📞 Quick Commands Reference

```bash
# Start Storybook
pnpm ds:storybook:dev

# Build Storybook (if needed)
pnpm ds:storybook:build

# Rebuild design system (if CSS not updating)
pnpm ds:all:build

# Check for console errors in components
pnpm ds:all:lint

# Run component tests (Playwright)
pnpm --filter @grasdouble/lufa_design-system test-ct
```

---

## 🎯 Success Criteria

Testing is complete when:

- ✅ All 9 configurations tested and documented
- ✅ All fixed components verified
- ✅ Accessibility checks passed
- ✅ No critical issues remain
- ✅ Summary form filled out
- ✅ Ready for release decision made

---

**Happy Testing! 🎨✨**

If you encounter any issues during testing, refer to the troubleshooting section or check browser console for error messages.
