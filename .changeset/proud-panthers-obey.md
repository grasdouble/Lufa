---
'@grasdouble/lufa_design-system': major
'@grasdouble/lufa_design-system-tokens': minor
'@grasdouble/lufa_design-system-storybook': minor
'@grasdouble/lufa_design-system-docusaurus': minor
'@grasdouble/lufa_design-system-playwright': minor
---

refactor(design-system): migrate to 5-category structure and eliminate token warnings

BREAKING CHANGE: Component organization changed from 3-layer to 5-category structure

## Component Migration (3-layer → 5-category)

Migrated 16 components to new semantic categories:
- **Foundation** (6): Box, Stack, Flex, Grid, Container, Center
- **Content** (4): Text, Icon, Badge, Divider
- **Interaction** (3): Button, Input, Label
- **Composition** (1): Card
- **Utility** (2): Portal, VisuallyHidden

**Note**: Public API unchanged - imports from `@grasdouble/lufa_design-system` work as before.

## Token System Improvements

- Created custom `size/rem/fluid` transform for fluid typography
- Created custom `shadow/css/shorthand-custom` transform
- Eliminated all 22 transformation warnings (now 0 warnings)
- Updated style-dictionary config with explicit transform order
- Fixed value resolution order in CSS and JSON formats

## Documentation Updates

- Updated 17 Storybook story titles to reflect new categories
- Fixed component count in READMEs (16/16 complete)
- Updated 15 internal documentation files
- Replaced deprecated primitives package reference with tokens

## Testing Infrastructure

- Migrated 16 Playwright tests + 28 snapshots
- Migrated 23 Storybook stories
- Migrated 16 Docusaurus examples
