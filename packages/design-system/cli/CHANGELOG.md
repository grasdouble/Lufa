# @grasdouble/lufa_design-system-cli

## 0.2.0

### Minor Changes

- ea09e6a: ## Summary
  Complete design system rebuild spanning token architecture modernization (Phases 0-4), utilities-based component system (Phase 5A), and CLI tooling (Phase 7A).

  ## Token System (Phases 0-4)

  **DTCG Migration**
  - 440 tokens migrated to Design Tokens Community Group standard with `$extensions.lufa` metadata
  - Added `lufa-` prefix to all CSS variables for namespacing
  - **Breaking**: Removed JS/TS token exports - tokens now CSS-only via variables

  ```css
  /* Before */
  import { spacing } from '@grasdouble/lufa_design-system-tokens';

  /* After */
  .component {
    padding: var(--lufa-spacing-md);
  }
  ```

  **Token Architecture**
  - Phase 1-2: Foundation and semantic layers
  - Phase 3: 78 semantic tokens added
  - Phase 4: Eliminated token collision warnings
  - Added `tokens-metadata.json` for documentation tooling

  ## Component System (Phase 5A)

  **New Utilities Generator**
  - CSS utilities system for consistent component styling
  - Replaces per-component CSS with composable utilities

  **Primitive Components**
  - `Box`: Foundation component with full utilities support
  - `Stack`: Layout component (vertical/horizontal)
  - `Text`: Typography with semantic variants
  - `Icon`: Lucide React integration

  **Display & Form Components**
  - `Badge`: Status indicators with semantic variants
  - `Divider`: Separator with emphasis patterns
  - `Button`: Refactored to two-dimensional architecture (variant × size)

  ## Developer Tools (Phase 7A)

  **CLI Theme Validator**

  ```bash
  pnpm ds:cli validate-theme path/to/theme.css
  ```

  - Format validation (CSS variable syntax)
  - Completeness checking (required tokens present)
  - WCAG contrast validation (AA/AAA)
  - Full Vitest coverage

  ## Documentation & Testing
  - Architecture docs: token architecture, component inventory, development guide
  - Storybook stories for all components with strict pattern compliance
  - Docusaurus API docs with live examples
  - Playwright component tests with visual regression
  - 256 VSCode token snippets

  ## Repository Organization
  - Archived legacy packages (storybook, playwright, docusaurus v1)
  - Consolidated BMAD analysis artifacts
  - Reorganized documentation hierarchy

  ## Breaking Changes
  - Token consumption: CSS variables only, no JS/TS imports
  - Button API: new two-dimensional architecture
  - Package structure: utilities-based approach replaces legacy pattern

  ## Migration

  See `packages/design-system/docusaurus/docs/migration-guide.md`

  ## Stats
  - 174 files added
  - 388 files deleted (legacy archived)
  - 47 files modified

### Patch Changes

- 445737d: # Dependency Updates & Documentation Improvements

  ## CLI Package

  ### Documentation Enhancements
  - **README.md expanded** (+370 lines)
    - Comprehensive validation checks explanation (completeness, contrast, format)
    - Multi-mode theme validation examples (light, dark, high-contrast)
    - CI/CD integration guides (GitHub Actions, pre-commit hooks, NPM scripts)
    - CLI options reference with examples
    - Token role metadata documentation
    - Customization patterns and best practices
  - **Theme template enhanced** (`src/templates/theme-template.css`)
    - Added 3 customization patterns with code examples
    - Added 5 best practices for theme development
    - Added 3 practical examples (brand colors, warm palette, high-contrast)
    - Improved inline documentation for developers

  ### Dependency Updates
  - `chalk`: 5.4.1 → 5.6.2 (terminal color output)
  - `postcss`: 8.5.1 → 8.5.6 (CSS parsing)
  - `@types/node`: 25.0.9 → 25.0.10
  - `@vitest/coverage-v8`: 4.0.17 → 4.0.18
  - `vitest`: 4.0.17 → 4.0.18 (test framework)
  - `prettier`: 3.8.0 → 3.8.1

  ## Playwright Package

  ### Token Reference Updates
  - Updated Box component spec to use new semantic overlay token:
    - `--lufa-token-color-background-overlay` → `--lufa-semantic-ui-overlay-backdrop`
    - Aligns with Phase 2A semantic token architecture
    - Maintains test compatibility

  ### Dependency Updates
  - `@playwright/experimental-ct-react`: 1.57.0 → 1.58.0 (Playwright component testing)
  - `@types/node`: 25.0.9 → 25.0.10
  - `@types/react`: 19.2.8 → 19.2.9
  - `eslint`: 9.22.0 → 9.39.2

  ## Themes Package

  ### Theme Placeholder Documentation
  - **Forest theme** (`src/forest.css`)
    - Enhanced documentation for Phase 6 implementation
    - Added usage example with data attributes
    - Added example token overrides structure (brand colors)
    - Clarified implementation roadmap
  - **Ocean theme** (`src/ocean.css`)
    - Enhanced documentation for Phase 6 implementation
    - Added usage example with data attributes
    - Added example token overrides structure (brand colors)
    - Clarified implementation roadmap

  ### Dependency Updates
  - `@types/node`: 25.0.9 → 25.0.10
  - `prettier`: 3.8.0 → 3.8.1

  ## Impact

  **CLI**: Significantly improved developer experience with comprehensive documentation and examples
  **Playwright**: Maintained test suite compatibility with Phase 2A token architecture
  **Themes**: Clearer Phase 6 implementation guidance for theme developers

  **Breaking Changes**: None

- Updated dependencies [445737d]
- Updated dependencies [445737d]
- Updated dependencies [ea09e6a]
- Updated dependencies [445737d]
- Updated dependencies [445737d]
  - @grasdouble/lufa_design-system-tokens@0.5.0
