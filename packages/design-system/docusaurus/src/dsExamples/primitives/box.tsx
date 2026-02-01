/**
 * Box Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating Box component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { Box } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic Box usage
 * Demonstrates common use cases with simple variants
 */
export function LiveDemo() {
  return <Box>Basic Box</Box>;
}

/**
 * PaddingVariants - All padding values
 * Shows all semantic spacing values from tight to spacious
 */
export function PaddingVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box padding="none" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;none&quot; (0px)
      </Box>
      <Box padding="tight" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;tight&quot; (4px)
      </Box>
      <Box padding="compact" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;compact&quot; (8px)
      </Box>
      <Box padding="default" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;default&quot; (16px)
      </Box>
      <Box padding="comfortable" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;comfortable&quot; (24px)
      </Box>
      <Box padding="spacious" background="surface" borderWidth="thin" borderColor="default">
        padding=&quot;spacious&quot; (32px)
      </Box>
    </div>
  );
}

/**
 * MarginVariants - All margin values
 * Shows all semantic spacing values with visible backgrounds
 */
export function MarginVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
      <Box margin="none" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;none&quot; (0px)
      </Box>
      <Box margin="tight" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;tight&quot; (4px)
      </Box>
      <Box margin="compact" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;compact&quot; (8px)
      </Box>
      <Box margin="default" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;default&quot; (16px)
      </Box>
      <Box margin="comfortable" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;comfortable&quot; (24px)
      </Box>
      <Box margin="spacious" padding="default" background="surface" borderWidth="thin" borderColor="default">
        margin=&quot;spacious&quot; (32px)
      </Box>
    </div>
  );
}

/**
 * BackgroundVariants - All background colors
 * Shows all semantic background tokens including state colors
 */
export function BackgroundVariants() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <Box padding="default" background="page" borderWidth="thin" borderColor="default">
        page
      </Box>
      <Box padding="default" background="surface" borderWidth="thin" borderColor="default">
        surface
      </Box>
      <Box padding="default" background="success" borderWidth="thin" borderColor="success">
        success
      </Box>
      <Box padding="default" background="error" borderWidth="thin" borderColor="error">
        error
      </Box>
      <Box padding="default" background="warning" borderWidth="thin" borderColor="warning">
        warning
      </Box>
      <Box padding="default" background="info" borderWidth="thin" borderColor="info">
        info
      </Box>
      <Box padding="default" background="overlay" borderWidth="thin" borderColor="default">
        overlay
      </Box>
      <Box padding="default" background="on-primary" borderWidth="thin" borderColor="default">
        on-primary
      </Box>
      <Box padding="default" background="on-secondary" borderWidth="thin" borderColor="default">
        on-secondary
      </Box>
      <Box padding="default" background="on-success" borderWidth="thin" borderColor="success">
        on-success
      </Box>
      <Box padding="default" background="on-error" borderWidth="thin" borderColor="error">
        on-error
      </Box>
      <Box padding="default" background="on-warning" borderWidth="thin" borderColor="warning">
        on-warning
      </Box>
      <Box padding="default" background="on-info" borderWidth="thin" borderColor="info">
        on-info
      </Box>
    </div>
  );
}

/**
 * BorderVariants - Border combinations
 * Shows combinations of borderWidth, borderColor, and borderRadius
 */
export function BorderVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Border Width Variants */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Border Width</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default">
            thin (1px)
          </Box>
          <Box padding="default" background="surface" borderWidth="medium" borderColor="default">
            medium (2px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thick" borderColor="default">
            thick (4px)
          </Box>
        </div>
      </section>

      {/* Border Color Variants */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Border Color</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default">
            default
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="strong">
            strong
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="success">
            success
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="error">
            error
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="warning">
            warning
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="info">
            info
          </Box>
        </div>
      </section>

      {/* Border Radius Variants */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Border Radius</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="none">
            none (0px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="small">
            small (4px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="default">
            default (8px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="medium">
            medium (12px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="large">
            large (16px)
          </Box>
          <Box padding="default" background="surface" borderWidth="thin" borderColor="default" borderRadius="full">
            full (9999px)
          </Box>
        </div>
      </section>

      {/* Combined Border Examples */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Combined Border Styles</h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Box
            padding="comfortable"
            background="surface"
            borderWidth="thin"
            borderColor="default"
            borderRadius="medium"
          >
            Card Style
          </Box>
          <Box
            padding="comfortable"
            background="success"
            borderWidth="medium"
            borderColor="success"
            borderRadius="default"
          >
            Success Alert
          </Box>
          <Box padding="comfortable" background="error" borderWidth="thick" borderColor="error" borderRadius="small">
            Error Alert
          </Box>
        </div>
      </section>
    </div>
  );
}

/**
 * DisplayVariants - Display types
 * Shows different CSS display property values
 */
export function DisplayVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Block Display */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>display=&quot;block&quot; (default)</h4>
        <Box display="block" padding="default" background="surface" borderWidth="thin" borderColor="default">
          Block box - Takes full width
        </Box>
        <Box display="block" padding="default" background="surface" borderWidth="thin" borderColor="default">
          Another block box - Stacks vertically
        </Box>
      </section>

      {/* Inline-Block Display */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>display=&quot;inline-block&quot;</h4>
        <div>
          <Box display="inline-block" padding="default" background="surface" borderWidth="thin" borderColor="default">
            Inline-block 1
          </Box>
          <Box display="inline-block" padding="default" background="surface" borderWidth="thin" borderColor="default">
            Inline-block 2
          </Box>
          <Box display="inline-block" padding="default" background="surface" borderWidth="thin" borderColor="default">
            Inline-block 3
          </Box>
        </div>
      </section>

      {/* Flex Display */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>display=&quot;flex&quot;</h4>
        <Box
          display="flex"
          padding="default"
          background="surface"
          borderWidth="thin"
          borderColor="default"
          style={{ gap: '16px' }}
        >
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Flex item 1
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Flex item 2
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Flex item 3
          </Box>
        </Box>
      </section>

      {/* Inline-Flex Display */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>display=&quot;inline-flex&quot;</h4>
        <div>
          <Box
            display="inline-flex"
            padding="default"
            background="surface"
            borderWidth="thin"
            borderColor="default"
            style={{ gap: '8px' }}
          >
            <span>Item 1</span>
            <span>Item 2</span>
          </Box>
          <Box
            display="inline-flex"
            padding="default"
            background="surface"
            borderWidth="thin"
            borderColor="default"
            style={{ gap: '8px' }}
          >
            <span>Item 3</span>
            <span>Item 4</span>
          </Box>
        </div>
      </section>

      {/* Grid Display */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>display=&quot;grid&quot;</h4>
        <Box
          display="grid"
          padding="default"
          background="surface"
          borderWidth="thin"
          borderColor="default"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
        >
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 1
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 2
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 3
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 4
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 5
          </Box>
          <Box padding="default" background="page" borderWidth="thin" borderColor="default">
            Grid 6
          </Box>
        </Box>
      </section>
    </div>
  );
}

/**
 * PolymorphicVariant - Shows `as` prop with different semantic elements
 * Demonstrates rendering Box as various HTML5 semantic elements
 */
export function PolymorphicVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Box
        as="section"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;section&quot;</strong> - Thematic content section
      </Box>

      <Box
        as="article"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;article&quot;</strong> - Self-contained composition
      </Box>

      <Box
        as="nav"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
        aria-label="Example navigation"
      >
        <strong>as=&quot;nav&quot;</strong> - Navigation links section
      </Box>

      <Box
        as="header"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;header&quot;</strong> - Introductory content or navigation
      </Box>

      <Box
        as="footer"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;footer&quot;</strong> - Footer for sectioning element
      </Box>

      <Box
        as="main"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;main&quot;</strong> - Main content of document
      </Box>

      <Box
        as="aside"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;aside&quot;</strong> - Tangentially related content
      </Box>

      <Box
        as="div"
        padding="comfortable"
        background="surface"
        borderWidth="thin"
        borderColor="default"
        borderRadius="default"
      >
        <strong>as=&quot;div&quot;</strong> (default) - Generic container
      </Box>
    </div>
  );
}
