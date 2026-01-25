# @grasdouble/lufa_design-system-playwright

## 0.1.1

### Patch Changes

- fb79222: Replace TypeScript token imports with CSS custom properties in component stories

  This change refactors 21 component story files to use CSS custom properties (CSS variables) instead of TypeScript token imports. This makes the Storybook more flexible and reduces build-time dependencies on the tokens package.

  **Files updated:**
  - Layout stories (10 files): AspectRatio, Center, Container, Divider, Flex, Grid, Layout, Placeholder, Space, Stack
  - Display stories (6 files): Avatar, AvatarGroup, Badge, Card, Kbd, Paper
  - Feedback stories (1 file): Alert
  - Forms stories (2 files): Button, Input
  - Navigation stories (2 files): Breadcrumb, Steps

  **Changes:**
  - Removed `import tokens from '@grasdouble/lufa_design-system-tokens'` from all story files
  - Replaced all token references (e.g., `tokens.color.text.primary`) with CSS custom properties (e.g., `'var(--lufa-token-color-text-primary)'`)
  - Maintained identical visual appearance and functionality

  **Benefits:**
  - Enables runtime theme switching through CSS custom properties
  - Reduces TypeScript compilation overhead in Storybook
  - Makes stories more aligned with modern CSS practices
  - Simplifies build dependencies

## 0.1.0

### Minor Changes

- fef8ae4: Add CI/CD integration and cross-browser testing for Playwright component tests

  Infrastructure improvements:
  - Add GitHub Actions workflow for automated testing on PRs and main branch
  - Enable cross-browser testing: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
  - Add root-level test scripts: `pnpm ds:test`, `pnpm ds:test:ui`, `pnpm all:test`
  - Generate 166 visual regression snapshots across all browsers
  - Fix Pagination keyboard navigation test for WebKit/mobile browsers
  - Update AGENTS.md with comprehensive testing documentation
  - CI runs Chromium tests only for optimal build speed

  Test results:
  - 3222 passing tests (645 tests × 5 browsers)
  - 8 skipped tests (browser-specific limitations)
  - 0 failed tests
  - Test execution time: ~1.5 minutes for all browsers

## 0.0.1

### Patch Changes

- 603f643: Init playwright package
