---
'@grasdouble/lufa_design-system': patch
'@grasdouble/lufa_design-system-tokens': patch  
'@grasdouble/lufa_design-system-storybook': patch
'@grasdouble/lufa_design-system-playwright': patch
---

fix(design-system): token usage corrections and component enhancements

## Token System Fixes

### Correct Token Usage
- **Text Component**: Use typography font-weight tokens instead of hardcoded values (400, 500, 600, 700)
- **Button Component**: Use semantic UI radius tokens instead of primitive radius scale
- **Input Component**: Use component-specific tokens for all properties (padding, font-size, colors, borders)
- **Label Component**: Use component-specific tokens for font-size, color, spacing, and line-height
- **Card Component**: Add proper color token for text color

### Removed Deprecated Theme File
- Removed all `--lufa-token-*` custom properties from `theme.css`
- Theme-specific overrides now properly use the standard token hierarchy (`--lufa-core-*`, `--lufa-semantic-*`, `--lufa-component-*`)
- Theme file is now intentionally empty with documentation explaining the new approach

## Component Enhancements

### New Features
- **Flex Component**: Added `gap="none"` prop for zero gap spacing
- **Grid Component**: Added `gap="none"`, `gapX="none"`, and `gapY="none"` props for zero gap spacing
- **Stack Component**: Fixed `spacing="none"` to use 0 instead of tight spacing

### CSS Improvements
- Improved CSS formatting and readability across components
- Better use of CSS custom properties
- Consistent multi-line gradient declarations in Divider component

## Visual Regression Tests
- Added comprehensive Playwright visual snapshots for all components in both light and dark modes
- Snapshots cover: Badge, Box, Button, Card, Center, Container, Divider, Flex, Grid, Icon, Input, Label, Stack, Text

## Type Safety
- Improved TypeScript types with proper interface formatting
- Better type consistency across hook definitions

## Breaking Changes
None - All changes maintain backward compatibility

## Migration
No action required - Changes are either internal or additive features
