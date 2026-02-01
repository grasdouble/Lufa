/**
 * Text Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating Text component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { Text } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic Text usage
 * Demonstrates common use cases with simple variants
 */
export function LiveDemo() {
  return <Text>Default text</Text>;
}

/**
 * VariantExamples - All typography variant values
 * Shows all semantic typography scale values from h1 to label
 */
export function VariantExamples() {
  const variants = [
    { value: 'h1' as const, label: 'Heading 1', example: 'Extra Large Heading' },
    { value: 'h2' as const, label: 'Heading 2', example: 'Large Heading' },
    { value: 'h3' as const, label: 'Heading 3', example: 'Medium Heading' },
    { value: 'h4' as const, label: 'Heading 4', example: 'Small Heading' },
    { value: 'h5' as const, label: 'Heading 5', example: 'Extra Small Heading' },
    { value: 'h6' as const, label: 'Heading 6', example: 'Smallest Heading' },
    { value: 'body-large' as const, label: 'Body Large', example: 'Large body text for emphasis' },
    { value: 'body' as const, label: 'Body', example: 'Standard body text for paragraphs' },
    { value: 'body-small' as const, label: 'Body Small', example: 'Small body text for secondary content' },
    { value: 'caption' as const, label: 'Caption', example: 'Caption text for images and figures' },
    { value: 'label' as const, label: 'Label', example: 'Label text for form fields' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {variants.map(({ value, label, example }) => (
        <div key={value} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#666' }}>
            variant="{value}" - {label}
          </div>
          <Text variant={value}>{example}</Text>
        </div>
      ))}
    </div>
  );
}

/**
 * ColorVariants - All color values
 * Shows all semantic text color tokens
 */
export function ColorVariants() {
  const colors = [
    { value: 'primary' as const, label: 'Primary', description: 'Default text color (highest contrast)' },
    { value: 'secondary' as const, label: 'Secondary', description: 'Secondary text (medium emphasis)' },
    { value: 'tertiary' as const, label: 'Tertiary', description: 'Tertiary text (least emphasis)' },
    { value: 'success' as const, label: 'Success', description: 'Success state (green)' },
    { value: 'error' as const, label: 'Error', description: 'Error state (red)' },
    { value: 'warning' as const, label: 'Warning', description: 'Warning state (amber)' },
    { value: 'info' as const, label: 'Info', description: 'Info state (blue)' },
    { value: 'inverse' as const, label: 'Inverse', description: 'Inverse text (for dark backgrounds)' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {colors.map(({ value, label, description }) => (
        <div
          key={value}
          style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <Text variant="label" weight="semibold" color={value} style={{ marginBottom: '4px' }}>
            {label}
          </Text>
          <Text variant="body-small" color={value}>
            {description}
          </Text>
        </div>
      ))}
    </div>
  );
}

/**
 * WeightVariants - All font weight values
 * Shows all weight values from normal to bold
 */
export function WeightVariants() {
  const weights = [
    { value: 'normal' as const, label: 'Normal (400)', example: 'Regular weight text' },
    { value: 'medium' as const, label: 'Medium (500)', example: 'Medium weight text' },
    { value: 'semibold' as const, label: 'Semibold (600)', example: 'Semibold weight text' },
    { value: 'bold' as const, label: 'Bold (700)', example: 'Bold weight text' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {weights.map(({ value, label, example }) => (
        <div
          key={value}
          style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#666' }}>
            weight="{value}" - {label}
          </div>
          <Text variant="body" weight={value}>
            {example}
          </Text>
        </div>
      ))}
    </div>
  );
}

/**
 * AlignVariants - All text alignment values
 * Shows all alignment options with bordered containers to visualize
 */
export function AlignVariants() {
  const alignments = ['left', 'center', 'right', 'justify'] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {alignments.map((value) => (
        <div key={value}>
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#666' }}>align="{value}"</div>
          <div
            style={{
              padding: '16px',
              border: '2px dashed #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <Text variant="body" align={value}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * TransformVariants - All text transformation values
 * Shows all transform options with sample text
 */
export function TransformVariants() {
  const transforms = [
    { value: 'none' as const, label: 'None', example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
    { value: 'uppercase' as const, label: 'Uppercase', example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
    { value: 'lowercase' as const, label: 'Lowercase', example: 'The Quick Brown Fox Jumps Over The Lazy Dog' },
    { value: 'capitalize' as const, label: 'Capitalize', example: 'the quick brown fox jumps over the lazy dog' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {transforms.map(({ value, label, example }) => (
        <div
          key={value}
          style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <div style={{ marginBottom: '8px', fontSize: '12px', fontWeight: 600, color: '#666' }}>
            transform="{value}" - {label}
          </div>
          <Text variant="body" transform={value}>
            {example}
          </Text>
        </div>
      ))}
    </div>
  );
}

/**
 * PolymorphicVariant - Shows `as` prop with different semantic elements
 * Demonstrates rendering Text as various HTML elements
 */
export function PolymorphicVariant() {
  const elements = [
    { value: 'p' as const, label: 'Paragraph (p)', description: 'Default paragraph element for body text' },
    { value: 'span' as const, label: 'Span', description: 'Inline text element (no line break)' },
    { value: 'div' as const, label: 'Div', description: 'Block-level generic container' },
    { value: 'h1' as const, label: 'Heading 1 (h1)', description: 'Main page title (use once per page)' },
    { value: 'h2' as const, label: 'Heading 2 (h2)', description: 'Section headings' },
    { value: 'h3' as const, label: 'Heading 3 (h3)', description: 'Subsection headings' },
    { value: 'label' as const, label: 'Label', description: 'Form label element' },
    { value: 'figcaption' as const, label: 'Figure Caption', description: 'Caption for figure elements' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      {elements.map(({ value, label, description }) => (
        <div
          key={value}
          style={{
            padding: '16px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            background: '#f9fafb',
          }}
        >
          <Text as={value} variant="body" weight="semibold" style={{ marginBottom: '4px', display: 'block' }}>
            {label}
          </Text>
          <Text as={value} variant="body-small" color="secondary">
            {description}
          </Text>
        </div>
      ))}
    </div>
  );
}
