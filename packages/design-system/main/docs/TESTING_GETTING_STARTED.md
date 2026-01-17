# 🧪 Visual Testing - Getting Started

**You are here**: Ready to begin visual testing of dark mode implementation

---

## 📚 Testing Documentation Available

We've created **3 testing documents** to guide you:

### 1. 📋 TESTING_QUICK_REFERENCE.md

**Purpose**: Keep open while testing  
**Use when**: Actively testing in Storybook  
**Content**:

- 9 configurations matrix
- Priority test stories
- Quick visual checks
- Browser console commands
- Common issues to watch for

**Best for**: Quick lookup during testing session

---

### 2. 📖 VISUAL_TESTING_GUIDE.md

**Purpose**: Comprehensive step-by-step guide  
**Use when**: First-time testing or detailed verification  
**Content**:

- Complete testing workflow (Steps 1-6)
- Systematic testing approach
- Accessibility checks
- Edge cases
- Issue reporting template
- Results summary form

**Best for**: Thorough, structured testing

---

### 3. ✅ DARK_MODE_TESTING_CHECKLIST.md

**Purpose**: Simplified checklist  
**Use when**: Quick verification  
**Content**:

- Test matrix (9 configurations)
- Component checklist
- Quick verification commands
- Sign-off form

**Best for**: Fast spot-checks or final verification

---

## 🚀 Recommended Testing Workflow

### Option A: Full Testing (First Time) - 20 minutes

**Best for**: Initial dark mode verification

1. **Read**: VISUAL_TESTING_GUIDE.md (2 minutes)
2. **Start**: `pnpm ds:storybook:dev`
3. **Follow**: VISUAL_TESTING_GUIDE.md steps 1-6
4. **Keep open**: TESTING_QUICK_REFERENCE.md for quick lookup
5. **Document**: Fill out results summary in VISUAL_TESTING_GUIDE.md

### Option B: Quick Testing (Spot Check) - 10 minutes

**Best for**: After code changes, quick verification

1. **Start**: `pnpm ds:storybook:dev`
2. **Follow**: DARK_MODE_TESTING_CHECKLIST.md
3. **Use**: TESTING_QUICK_REFERENCE.md for common issues
4. **Check off**: Each configuration in checklist

### Option C: Targeted Testing (Bug Fix) - 5 minutes

**Best for**: Verifying specific component or theme

1. **Start**: `pnpm ds:storybook:dev`
2. **Navigate**: To specific component story
3. **Test**: Specific configuration(s)
4. **Reference**: TESTING_QUICK_REFERENCE.md for checks

---

## 🎯 What to Test

### ✨ Critical Priority (Must Test)

These were **fixed** as part of dark mode implementation:

1. **Pagination** (`3. Navigation/Pagination`)
   - Removed 8 primitive `dark:` classes
   - Now uses semantic tokens

2. **Steps** (`3. Navigation/Steps`)
   - Removed 10 primitive `dark:` classes
   - Step indicators adapt to themes

3. **Anchor** (`3. Navigation/Anchor`)
   - Removed 2 primitive `dark:` classes
   - Link colors themed correctly

4. **TestimonialOne** (`5. Patterns/Testimonial/Testimonial One`)
   - Removed 12 primitive `dark:` classes
   - Backgrounds and text contrast verified

5. **ThemeSwitcher** (`8. Utilities/Theme Switcher`)
   - **Main demo component**
   - Has theme + mode controls built-in
   - Test this first!

### 📦 Good to Test (General Verification)

Standard components that should "just work":

- Alert, Button, Card, Modal, Input, Badge
- These already used semantic tokens
- Spot-check in different themes

---

## ⚡ Quick Start (Get Testing Now!)

**If you want to start testing immediately**:

```bash
# 1. Start Storybook
pnpm ds:storybook:dev

# 2. Open in browser: http://localhost:6006

# 3. Navigate to: "8. Utilities/Theme Switcher"

# 4. Use toolbar controls:
#    - Select different themes (Default/Ocean/Forest)
#    - Select different modes (Light/Dark/Auto)

# 5. Observe: Colors and spacing change immediately

# 6. Navigate through other stories, testing each configuration
```

**Open alongside**:

- TESTING_QUICK_REFERENCE.md (for what to look for)

---

## 🐛 Troubleshooting

### Toolbar Controls Not Showing

**Option 1** - Rebuild Storybook:

```bash
# Stop Storybook (Ctrl+C)
pnpm ds:storybook:build
pnpm ds:storybook:dev
```

**Option 2** - Use browser console:

```javascript
// F12 to open DevTools, paste:
document.documentElement.setAttribute('data-theme', 'ocean');
document.documentElement.setAttribute('data-mode', 'dark');
```

### CSS Not Updating

```bash
# Rebuild design system
pnpm ds:all:build
pnpm ds:storybook:dev
```

### Storybook Won't Start

```bash
# Check if port is taken
lsof -ti:6006

# Kill process if needed
kill -9 $(lsof -ti:6006)

# Restart
pnpm ds:storybook:dev
```

---

## ✅ Testing Complete - What's Next?

After visual testing passes:

1. **Mark todo complete**: Update testing status
2. **Delete temporary files** (optional):
   ```bash
   rm packages/design-system/main/docs/DARK_MODE_TESTING_CHECKLIST.md
   rm packages/design-system/main/docs/DOCUMENTATION_REVIEW.md
   ```
3. **Create changeset**:
   ```bash
   pnpm changeset
   ```
4. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: add dark mode support with 9 visual configurations"
   ```

---

## 📊 Expected Test Results

**If implementation is correct**, you should see:

✅ **Visual Quality**:

- Each theme has distinct color personality
- Dark modes use themed colors (not just gray)
- Smooth transitions between themes/modes
- No layout shifts

✅ **Functionality**:

- Toolbar controls work immediately
- Auto mode follows system preference
- No console errors
- localStorage persistence works

✅ **Fixed Components**:

- Pagination, Steps, Anchor, TestimonialOne all adapt
- No gray primitive colors visible
- Contrast sufficient in all modes

✅ **Accessibility**:

- Text contrast ≥ 4.5:1 (WCAG AA)
- Focus indicators visible
- Hover states clear
- Keyboard navigation works

---

## 🎉 Success Criteria

Testing is complete and **ready for release** when:

- [ ] All 9 configurations tested
- [ ] All 5 fixed components verified
- [ ] No critical issues found
- [ ] Accessibility checks passed
- [ ] Documentation reviewed
- [ ] Changeset created
- [ ] Changes committed

**Current Status**: 📋 Ready for visual testing

---

## 🆘 Need Help?

**Choose your guide based on your needs**:

| Need                           | Use This Document                      |
| ------------------------------ | -------------------------------------- |
| Quick reference during testing | TESTING_QUICK_REFERENCE.md             |
| Step-by-step full guide        | VISUAL_TESTING_GUIDE.md                |
| Simple checklist               | DARK_MODE_TESTING_CHECKLIST.md         |
| This overview                  | TESTING_GETTING_STARTED.md (this file) |

**All guides located at**: `packages/design-system/main/docs/`

---

**Ready to start?** Open **TESTING_QUICK_REFERENCE.md** and run `pnpm ds:storybook:dev`! 🚀

**Good luck with testing!** 🎨✨
