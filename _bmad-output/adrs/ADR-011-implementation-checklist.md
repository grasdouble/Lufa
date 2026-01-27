# ADR-011 Implementation Checklist

**Status:** Not Started  
**Target Completion:** 2026-02-17  
**Owner:** Architecture Team

---

## Quick Reference

### What's Changing?

| Token Layer       | themeable  | modeAware  | Has [data-mode] | Example                                                  |
| ----------------- | ---------- | ---------- | --------------- | -------------------------------------------------------- |
| **Primitive**     | `false` ✅ | `false` ✅ | NO              | `blue-600: #2563eb`                                      |
| **Core/Semantic** | `true` ✅  | `true` ✅  | YES             | `brand-primary` → `blue-600` (light) / `blue-400` (dark) |
| **Component**     | `true` ✅  | `true` ✅  | YES             | `button-bg` → `brand-primary`                            |
| **Layout**        | `false` ✅ | `false` ✅ | NO              | `container-max: 1280px`                                  |

### Key Principle

```
Primitives = CONSTANTS (never change)
   ↓
Semantic = MEANING (what changes and why)
   ↓
Component = USAGE (how it's applied)
```

---

## Phase 1: Validation & Schema (Week 1)

### Tasks

- [ ] **Create validator script** (`build/validators/token-consistency.js`)
  - [ ] Rule: Primitives cannot have `themeable: true` or `modeAware: true`
  - [ ] Rule: Only `modeAware: true` tokens can have `modes` object
  - [ ] Rule: Layout tokens must be `themeable: false, modeAware: false`
  - [ ] Rule: Tokens with `modes` must have all three: light, dark, high-contrast

- [ ] **Add TypeScript types** (`types/token-metadata.ts`)

  ```typescript
  interface LufaExtensions {
    level: 'primitive' | 'core' | 'semantic' | 'component' | 'layout';
    themeable: boolean;
    modeAware: boolean;
    modes?: {
      light: string;
      dark: string;
      'high-contrast': string;
    };
  }
  ```

- [ ] **Update package.json scripts**

  ```json
  {
    "validate:tokens": "node build/validators/token-consistency.js",
    "prebuild": "npm run validate:tokens"
  }
  ```

- [ ] **Test validator**
  - [ ] Create test files with invalid metadata
  - [ ] Verify validation catches errors
  - [ ] Verify build fails on invalid tokens

### Success Criteria

- ✅ Validator script runs in < 500ms
- ✅ All validation rules tested
- ✅ CI integration working

**Estimated Effort:** 8 hours

---

## Phase 2: Migrate Primitives (Week 1-2)

### Tasks

- [ ] **Create migration script** (`scripts/migrate-primitive-metadata.js`)
  - [ ] Find all files in `src/primitives/**/*.json`
  - [ ] Set `themeable: false` on all primitive tokens
  - [ ] Set `modeAware: false` on all primitive tokens
  - [ ] Remove `themable` (typo) if present
  - [ ] Preserve all other metadata

- [ ] **Run migration**

  ```bash
  node scripts/migrate-primitive-metadata.js
  ```

- [ ] **Files to migrate**
  - [ ] `src/primitives/color/palette.json` (~200 tokens)
  - [ ] `src/primitives/spacing/scale.json` (~20 tokens)
  - [ ] `src/primitives/typography/font-sizes.json` (~12 tokens)
  - [ ] `src/primitives/typography/font-weights.json` (~9 tokens)
  - [ ] `src/primitives/typography/line-heights.json` (~8 tokens)
  - [ ] `src/primitives/typography/letter-spacing.json` (~6 tokens)
  - [ ] `src/primitives/typography/font-families.json` (~3 tokens)
  - [ ] `src/primitives/radius/scale.json` (~10 tokens)
  - [ ] `src/primitives/shadow/elevation.json` (~8 tokens)
  - [ ] `src/primitives/motion/timing.json` (~6 tokens)
  - [ ] `src/primitives/breakpoint/scale.json` (~6 tokens)
  - [ ] `src/primitives/height/scale.json` (~5 tokens)

- [ ] **Manual review**
  - [ ] Spot-check 10% of migrated files
  - [ ] Verify JSON is valid
  - [ ] Run `npm run validate:tokens`
  - [ ] Run `npm run build:tokens`

- [ ] **CSS diff check**
  ```bash
  git diff dist/tokens.css
  # Should show NO functional changes
  ```

### Success Criteria

- ✅ All ~500 primitive tokens migrated
- ✅ No primitive has `themeable: true`
- ✅ Validation passes
- ✅ CSS output unchanged

**Estimated Effort:** 12 hours

---

## Phase 3: Migrate Semantic Tokens (Week 2)

### Tasks

- [ ] **Create migration script** (`scripts/migrate-semantic-metadata.js`)
  - [ ] Find all files in `src/{core,semantic,component}/**/*.json`
  - [ ] Set `themeable: true` (except layout)
  - [ ] Set `modeAware: true` if `modes` object exists
  - [ ] Set `modeAware: false` if no `modes` object
  - [ ] Fix `themable` → `themeable` typo

- [ ] **Run migration**

  ```bash
  node scripts/migrate-semantic-metadata.js
  ```

- [ ] **Files to migrate**
  - [ ] `src/core/brand/colors.json`
  - [ ] `src/core/neutral/colors.json`
  - [ ] `src/core/semantic/colors.json`
  - [ ] `src/core/layout/*.json` (special case: `themeable: false`)
  - [ ] `src/semantic/**/*.json`
  - [ ] `src/component/**/*.json`

- [ ] **Validation**
  - [ ] All tokens with `modes` have `modeAware: true`
  - [ ] All core/semantic tokens have `themeable: true`
  - [ ] All layout tokens have `themeable: false, modeAware: false`

### Success Criteria

- ✅ All ~150 semantic/core tokens migrated
- ✅ 100% of tokens with `modes` have `modeAware: true`
- ✅ Layout tokens correctly marked as immutable
- ✅ Validation passes

**Estimated Effort:** 8 hours

---

## Phase 4: Update Style Dictionary (Week 2-3)

### Tasks

- [ ] **Update CSS format** (`style-dictionary.config.js`)
  - [ ] Filter tokens by `modeAware` flag
  - [ ] Immutable tokens: only in `:root`
  - [ ] Mode-aware tokens: in `:root` + `[data-mode]` selectors
  - [ ] Add documentation comments to CSS output

- [ ] **Code changes**

  ```javascript
  // Filter tokens
  const modeAwareTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware === true);

  const immutableTokens = dictionary.allTokens.filter((token) => token.$extensions?.lufa?.modeAware !== true);

  // Generate CSS sections
  // 1. Immutable tokens in :root only
  // 2. Mode-aware tokens in :root (light mode)
  // 3. Mode-aware tokens in [data-mode='dark']
  // 4. Mode-aware tokens in [data-mode='high-contrast']
  ```

- [ ] **Test build**

  ```bash
  npm run build:tokens
  git diff dist/tokens.css
  ```

- [ ] **Add CSS comments**
  ```css
  /* IMMUTABLE TOKENS - Never change */
  /* MODE-AWARE TOKENS - Vary by [data-mode] */
  ```

### Success Criteria

- ✅ Build succeeds without errors
- ✅ Immutable tokens only in `:root`
- ✅ Mode-aware tokens have all 3 mode selectors
- ✅ CSS functionally identical to previous version

**Estimated Effort:** 12 hours

---

## Phase 5: Documentation & Testing (Week 3)

### Tasks

- [ ] **Create test suite** (`build/validators/token-consistency.test.js`)
  - [ ] Test: Reject primitives with `themeable: true`
  - [ ] Test: Reject primitives with `modeAware: true`
  - [ ] Test: Reject tokens with `modes` but `modeAware: false`
  - [ ] Test: Reject layout tokens with `themeable: true`
  - [ ] Test: Accept valid primitive metadata
  - [ ] Test: Accept valid semantic metadata
  - [ ] Run tests: `npm test`

- [ ] **Update architecture docs**
  - [ ] Token layer diagram
  - [ ] Decision tree (when to use which layer)
  - [ ] Migration guide for consumers
  - [ ] FAQ section

- [ ] **Add JSDoc to tokens**

  ```json
  {
    "primitive": {
      "color": {
        "$description": "IMMUTABLE: Primitive colors never change. Use core.brand.* for mode-aware colors."
      }
    }
  }
  ```

- [ ] **Update Storybook**
  - [ ] Token explorer shows metadata badges
  - [ ] Filter by layer (primitive/semantic/component/layout)
  - [ ] Filter by modeAware flag
  - [ ] Visual examples of mode switching

- [ ] **Visual regression testing**
  - [ ] Test all components in light mode
  - [ ] Test all components in dark mode
  - [ ] Test all components in high-contrast mode
  - [ ] Compare screenshots to baseline

### Success Criteria

- ✅ Test coverage: 100% of validation rules
- ✅ All visual regression tests pass
- ✅ Documentation reviewed and approved
- ✅ Storybook updated and tested

**Estimated Effort:** 16 hours

---

## Phase 6: Rollout (Week 4)

### Tasks

- [ ] **Version bump**
  - [ ] Update `package.json`: `0.7.1` → `0.8.0`
  - [ ] Update `CHANGELOG.md`
  - [ ] Tag release: `git tag v0.8.0`

- [ ] **Create migration guide**

  ```markdown
  # Migration Guide: v0.7.x → v0.8.0

  ## Breaking Changes

  - Token metadata schema updated
  - `themable` → `themeable` (typo fixed)
  - New required field: `modeAware`

  ## Non-Breaking Changes

  - CSS output functionally identical
  - No visual changes
  - No component API changes
  ```

- [ ] **Publish release**

  ```bash
  npm run build
  npm run test
  npm publish
  ```

- [ ] **Announce**
  - [ ] Post ADR in team channel
  - [ ] Share migration guide
  - [ ] Schedule office hours for questions

- [ ] **Monitor**
  - [ ] Track npm downloads
  - [ ] Monitor GitHub issues
  - [ ] Collect feedback
  - [ ] Address critical issues within 48h

### Success Criteria

- ✅ v0.8.0 published to npm
- ✅ No critical bugs in first week
- ✅ Migration guide published
- ✅ Team acknowledges and understands changes

**Estimated Effort:** 8 hours

---

## Rollback Plan

### If Critical Issues Arise

1. **Rollback CSS Config** (1 hour)

   ```bash
   git revert <commit-hash>
   npm run build:tokens
   npm version patch
   npm publish
   ```

2. **Rollback Metadata** (2 hours)

   ```bash
   git revert <commit-range>
   npm run build:tokens
   npm publish
   ```

3. **Rollback Validation** (30 min)
   ```bash
   # Remove validation from package.json prebuild
   git push
   ```

### Rollback Triggers

- Visual regressions in production
- Build time increase >50%
- Consumer adoption blocked
- Critical accessibility issues

---

## Total Effort Summary

| Phase               | Hours        | Status         |
| ------------------- | ------------ | -------------- |
| Phase 1: Validation | 8            | ⬜ Not Started |
| Phase 2: Primitives | 12           | ⬜ Not Started |
| Phase 3: Semantic   | 8            | ⬜ Not Started |
| Phase 4: Config     | 12           | ⬜ Not Started |
| Phase 5: Docs/Tests | 16           | ⬜ Not Started |
| Phase 6: Rollout    | 8            | ⬜ Not Started |
| **TOTAL**           | **64 hours** | **~8 days**    |

---

## Daily Progress Tracker

### Week 1

- [ ] **Day 1:** Phase 1 (Validation setup)
- [ ] **Day 2:** Phase 2 start (Primitive migration script)
- [ ] **Day 3:** Phase 2 continue (Run migration, review)
- [ ] **Day 4:** Phase 3 (Semantic migration)
- [ ] **Day 5:** Phase 4 start (Config updates)

### Week 2

- [ ] **Day 6:** Phase 4 continue (CSS testing)
- [ ] **Day 7:** Phase 5 start (Test suite)
- [ ] **Day 8:** Phase 5 continue (Documentation)
- [ ] **Day 9:** Phase 5 finish (Storybook updates)
- [ ] **Day 10:** Phase 6 (Rollout prep)

### Week 3

- [ ] **Day 11:** Phase 6 (Publish and announce)
- [ ] **Day 12:** Monitor and respond to feedback
- [ ] **Day 13-15:** Buffer for issues and polish

---

## Success Metrics

### Quantitative

- ✅ 100% of primitives have `themeable: false`
- ✅ 100% of mode-aware tokens have `modeAware: true`
- ✅ 0 validation errors
- ✅ 0 visual regressions
- ✅ Build time increase < 5%
- ✅ Bundle size increase < 1%

### Qualitative

- ✅ Team understands new architecture
- ✅ Documentation is clear
- ✅ Migration guide is helpful
- ✅ No critical bugs in first week

---

**Last Updated:** 2026-01-27  
**Next Review:** Weekly during implementation
