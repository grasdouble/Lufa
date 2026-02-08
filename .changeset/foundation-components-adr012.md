---
"@grasdouble/lufa_design-system": minor
"@grasdouble/lufa_design-system-docusaurus": patch
"@grasdouble/lufa_design-system-storybook": patch
"@grasdouble/lufa_design-system-playwright": patch
---

feat(design-system): implement ADR-012 Foundation components documentation

## New Foundation Components

Added 3 new foundation layout components with comprehensive documentation, tests, and Storybook stories:

- **AspectRatio** - Maintains consistent aspect ratios for media and containers (28 tests)
- **Bleed** - Breaks out of container constraints for full-width content (23 tests)
- **Cluster** - Wrapping layout for collections with intelligent spacing (67 tests)

## Component Reclassification

- **Divider** moved from Content → Foundation category (maintains backward compatibility)

## Documentation

- Complete MDX documentation for all 3 new components following official template
- Interactive live demos with LiveDemoSection tabs
- Updated component overview with 10 Foundation components total

## Architecture

Foundation components now total 10 as per ADR-012:
1. Box, Stack, Flex, Grid, Container, Center (existing)
2. Divider (reclassified from Content)
3. AspectRatio, Cluster, Bleed (new)

All components include:
- Full TypeScript support with polymorphic APIs
- Accessibility compliance (WCAG 2.1 AA)
- Design token integration
- Visual regression tests
- Storybook stories
