/**
 * Cluster Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating Cluster component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { Cluster } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic Cluster usage
 * Demonstrates wrapping tag collection
 */
export function LiveDemo() {
  const tags = ['React', 'TypeScript', 'Next.js', 'Tailwind', 'GraphQL', 'Node.js'];

  return (
    <Cluster spacing="compact">
      {tags.map((tag) => (
        <span
          key={tag}
          style={{
            padding: '6px 14px',
            background: '#6366f1',
            color: 'white',
            borderRadius: '16px',
            fontSize: '13px',
            fontWeight: 600,
          }}
        >
          {tag}
        </span>
      ))}
    </Cluster>
  );
}

/**
 * SpacingVariants - All spacing values
 * Shows all semantic spacing values from tight to spacious
 */
export function SpacingVariants() {
  const spacings = [
    { value: 'tight', label: 'tight (4px)' },
    { value: 'compact', label: 'compact (8px)' },
    { value: 'default', label: 'default (16px)' },
    { value: 'comfortable', label: 'comfortable (24px)' },
    { value: 'spacious', label: 'spacious (32px)' },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {spacings.map(({ value, label }) => (
        <section key={value}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>
            spacing=&quot;{value}&quot; - {label}
          </h4>
          <Cluster spacing={value}>
            {['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '6px 12px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  border: '1px solid var(--lufa-semantic-ui-border-default)',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                {tag}
              </span>
            ))}
          </Cluster>
        </section>
      ))}
    </div>
  );
}

/**
 * AlignVariants - All align values
 * Shows vertical alignment options
 */
export function AlignVariants() {
  const alignments = [
    { value: 'flex-start', label: 'flex-start' },
    { value: 'center', label: 'center (default)' },
    { value: 'flex-end', label: 'flex-end' },
    { value: 'baseline', label: 'baseline' },
    { value: 'stretch', label: 'stretch' },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {alignments.map(({ value, label }) => (
        <section key={value}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>
            align=&quot;{value}&quot; - {label}
          </h4>
          <div style={{ border: '1px solid var(--lufa-semantic-ui-border-default)', padding: '16px' }}>
            <Cluster spacing="default" align={value}>
              <div style={{ padding: '8px 16px', background: '#dbeafe', borderRadius: '4px', fontSize: '12px' }}>
                Small
              </div>
              <div style={{ padding: '16px 20px', background: '#bfdbfe', borderRadius: '4px', fontSize: '16px' }}>
                Medium
              </div>
              <div style={{ padding: '24px 28px', background: '#93c5fd', borderRadius: '4px', fontSize: '20px' }}>
                Large
              </div>
            </Cluster>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * JustifyVariants - All justify values
 * Shows horizontal distribution options
 */
export function JustifyVariants() {
  const justifications = [
    { value: 'flex-start', label: 'flex-start (default)' },
    { value: 'center', label: 'center' },
    { value: 'flex-end', label: 'flex-end' },
    { value: 'space-between', label: 'space-between' },
    { value: 'space-around', label: 'space-around' },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {justifications.map(({ value, label }) => (
        <section key={value}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>
            justify=&quot;{value}&quot; - {label}
          </h4>
          <div style={{ border: '1px solid var(--lufa-semantic-ui-border-default)', padding: '16px' }}>
            <Cluster spacing="default" justify={value}>
              <span
                style={{
                  padding: '8px 16px',
                  background: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                Item 1
              </span>
              <span
                style={{
                  padding: '8px 16px',
                  background: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                Item 2
              </span>
              <span
                style={{
                  padding: '8px 16px',
                  background: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                Item 3
              </span>
            </Cluster>
          </div>
        </section>
      ))}
    </div>
  );
}

/**
 * ButtonGroupVariant - Button group pattern
 * Shows real-world button toolbar example
 */
export function ButtonGroupVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Action buttons</h4>
        <Cluster spacing="default" align="center">
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: 'none',
              background: '#3b82f6',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Save Changes
          </button>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #3b82f6',
              background: 'white',
              color: '#3b82f6',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Preview
          </button>
          <button
            style={{
              padding: '10px 20px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              background: 'white',
              color: '#6b7280',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </Cluster>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Toolbar with space-between</h4>
        <Cluster spacing="default" align="center" justify="space-between">
          <Cluster spacing="compact">
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              New
            </button>
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Open
            </button>
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Save
            </button>
          </Cluster>
          <Cluster spacing="compact">
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Settings
            </button>
            <button
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                background: 'white',
                cursor: 'pointer',
              }}
            >
              Help
            </button>
          </Cluster>
        </Cluster>
      </section>
    </div>
  );
}

/**
 * PolymorphicVariant - Using the 'as' prop
 * Shows semantic HTML with nav element
 */
export function PolymorphicVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>as=&quot;nav&quot; with links</h4>
        <Cluster as="nav" spacing="comfortable" align="center" aria-label="Main navigation">
          {['Home', 'Features', 'Pricing', 'About', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              style={{
                textDecoration: 'none',
                color: '#374151',
                fontWeight: 600,
                fontSize: '15px',
              }}
            >
              {link}
            </a>
          ))}
        </Cluster>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          as=&quot;div&quot; with role=&quot;list&quot;
        </h4>
        <Cluster as="div" role="list" spacing="compact" aria-label="Technologies">
          {['React', 'TypeScript', 'Next.js'].map((tech) => (
            <div
              key={tech}
              role="listitem"
              style={{
                padding: '6px 14px',
                background: '#e0e7ff',
                color: '#3730a3',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </Cluster>
      </section>
    </div>
  );
}
