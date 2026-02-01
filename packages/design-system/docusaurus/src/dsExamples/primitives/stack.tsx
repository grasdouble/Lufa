/**
 * Stack Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating Stack component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { Stack } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic Stack usage
 * Demonstrates common use cases with simple variants
 */
export function LiveDemo() {
  return (
    <Stack>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}

/**
 * DirectionVariants - Direction examples
 * Shows vertical and horizontal stack layouts
 */
export function DirectionVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Vertical Stack */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          direction=&quot;vertical&quot; (default)
        </h4>
        <Stack direction="vertical" spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }}>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>First item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Second item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Third item</div>
        </Stack>
      </section>

      {/* Horizontal Stack */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>direction=&quot;horizontal&quot;</h4>
        <Stack direction="horizontal" spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }}>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>First item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Second item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Third item</div>
        </Stack>
      </section>
    </div>
  );
}

/**
 * SpacingVariants - All spacing values
 * Shows all semantic spacing values from none to spacious
 */
export function SpacingVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Stack spacing="none" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;none&quot; (0px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>No gap between items</div>
      </Stack>

      <Stack spacing="tight" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;tight&quot; (4px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Minimal spacing</div>
      </Stack>

      <Stack spacing="compact" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;compact&quot; (8px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Small spacing</div>
      </Stack>

      <Stack spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;default&quot; (16px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Standard spacing</div>
      </Stack>

      <Stack spacing="comfortable" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;comfortable&quot; (24px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Generous spacing</div>
      </Stack>

      <Stack spacing="spacious" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>spacing=&quot;spacious&quot; (32px)</div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Large spacing</div>
      </Stack>
    </div>
  );
}

/**
 * AlignVariants - All align values
 * Shows all alignment options for cross-axis
 */
export function AlignVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>align=&quot;start&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          align="start"
          style={{ border: '1px solid #ccc', padding: '16px', minHeight: '120px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
          <div style={{ padding: '12px 12px 40px', background: '#e0e0e0', borderRadius: '4px' }}>Taller item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>align=&quot;center&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          align="center"
          style={{ border: '1px solid #ccc', padding: '16px', minHeight: '120px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
          <div style={{ padding: '12px 12px 40px', background: '#e0e0e0', borderRadius: '4px' }}>Taller item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>align=&quot;end&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          align="end"
          style={{ border: '1px solid #ccc', padding: '16px', minHeight: '120px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
          <div style={{ padding: '12px 12px 40px', background: '#e0e0e0', borderRadius: '4px' }}>Taller item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Short</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>align=&quot;stretch&quot; (default)</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          align="stretch"
          style={{ border: '1px solid #ccc', padding: '16px', minHeight: '120px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Stretches</div>
          <div style={{ padding: '12px 12px 40px', background: '#e0e0e0', borderRadius: '4px' }}>Taller item</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Stretches</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>align=&quot;baseline&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          align="baseline"
          style={{ border: '1px solid #ccc', padding: '16px', minHeight: '120px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', fontSize: '14px' }}>Text A</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', fontSize: '20px' }}>
            Text B (larger)
          </div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', fontSize: '14px' }}>Text C</div>
        </Stack>
      </section>
    </div>
  );
}

/**
 * JustifyVariants - All justify values
 * Shows all justification options for main axis
 */
export function JustifyVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;start&quot; (default)</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="start"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;center&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="center"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;end&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="end"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;space-between&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="space-between"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;space-around&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="space-around"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>justify=&quot;space-evenly&quot;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          justify="space-evenly"
          style={{ border: '1px solid #ccc', padding: '16px', width: '100%' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px' }}>Item 3</div>
        </Stack>
      </section>
    </div>
  );
}

/**
 * WrapVariant - Wrap example
 * Shows wrapping behavior for horizontal stacks
 */
export function WrapVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>wrap=&#123;false&#125; (default)</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          wrap={false}
          style={{ border: '1px solid #ccc', padding: '16px', maxWidth: '400px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 3</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 4</div>
        </Stack>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>wrap=&#123;true&#125;</h4>
        <Stack
          direction="horizontal"
          spacing="default"
          wrap
          style={{ border: '1px solid #ccc', padding: '16px', maxWidth: '400px' }}
        >
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 1</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 2</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 3</div>
          <div style={{ padding: '12px', background: '#e0e0e0', borderRadius: '4px', minWidth: '100px' }}>Item 4</div>
        </Stack>
      </section>
    </div>
  );
}

/**
 * PolymorphicVariant - Shows `as` prop with different semantic elements
 * Demonstrates rendering Stack as various HTML5 semantic elements
 */
export function PolymorphicVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Stack as="section" spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>
          <strong>as=&quot;section&quot;</strong> - Thematic content section
        </div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Contains related content</div>
      </Stack>

      <Stack as="nav" spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }} aria-label="Example">
        <div style={{ padding: '8px', background: '#e0e0e0' }}>
          <strong>as=&quot;nav&quot;</strong> - Navigation links
        </div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Navigation items</div>
      </Stack>

      <Stack
        as="ul"
        spacing="default"
        style={{ border: '1px solid #ccc', padding: '16px', listStyle: 'none', margin: 0 }}
      >
        <li style={{ padding: '8px', background: '#e0e0e0' }}>
          <strong>as=&quot;ul&quot;</strong> - Unordered list
        </li>
        <li style={{ padding: '8px', background: '#e0e0e0' }}>List item 2</li>
        <li style={{ padding: '8px', background: '#e0e0e0' }}>List item 3</li>
      </Stack>

      <Stack as="div" direction="horizontal" spacing="default" style={{ border: '1px solid #ccc', padding: '16px' }}>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>
          <strong>as=&quot;div&quot;</strong> (default)
        </div>
        <div style={{ padding: '8px', background: '#e0e0e0' }}>Generic container</div>
      </Stack>
    </div>
  );
}
