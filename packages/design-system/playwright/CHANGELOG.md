# @grasdouble/lufa_design-system-playwright

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
