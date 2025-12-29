export const primitivesLayer = {
  name: 'Primitives',
  description:
    'Raw, non-semantic values (pixels, milliseconds, etc.). Value-as-key pattern for clarity and predictability. Foundation for all semantic tokens.',
  package: '@grasdouble/lufa_design-system-primitives',
  documentation: 'https://github.com/grasdouble/Lufa/tree/main/packages/design-system/primitives',
  categories: ['Border', 'Color', 'Effects', 'Elevation', 'Icon', 'Layout', 'Motion', 'Space', 'Typography'],
  sampleUsage: {
    spacing: 'spacing[16] // "16px"',
    timing: 'timing[150] // "150ms"',
    fontSize: 'fontSize[24] // "1.5rem"',
    borderWidth: 'borderWidth[1] // "1px"',
  },
  cssCustomProperties: 'All primitives are available as CSS custom properties, e.g., --lufa-primitive-spacing-16',
  keyPrinciples: [
    'Value-as-key pattern (e.g., spacing[16] = "16px")',
    'Non-semantic, foundational values',
    'WCAG compliance built-in (touch targets, focus, font size)',
    'Consistent rhythm and scale (4px/8px, 50ms/100ms, modular typography)',
  ],
  totalTokens: 448,
};
