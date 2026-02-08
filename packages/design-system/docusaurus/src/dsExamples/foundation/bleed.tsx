/**
 * Bleed Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating Bleed component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { Bleed, Container } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic Bleed usage
 * Demonstrates full-width bleed within a container
 */
export function LiveDemo() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Container size="md" style={{ padding: '0 16px' }}>
        <div
          style={{ padding: '16px', background: 'var(--lufa-semantic-ui-background-surface)', marginBottom: '16px' }}
        >
          Content at reading width (Container)
        </div>

        <Bleed inline="full">
          <div
            style={{
              padding: '32px 16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              textAlign: 'center',
              fontWeight: 600,
            }}
          >
            Full-width bleed (inline=&quot;full&quot;)
          </div>
        </Bleed>

        <div
          style={{
            padding: '16px',
            background: 'var(--lufa-semantic-ui-background-surface)',
            marginTop: '16px',
          }}
        >
          Content returns to reading width
        </div>
      </Container>
    </div>
  );
}

/**
 * InlineVariants - Different inline bleed values
 * Shows numeric pixel values and full-width variant
 */
export function InlineVariants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', overflowX: 'hidden' }}>
      {/* Numeric bleed examples */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Numeric inline values</h4>
        <Container size="md" style={{ padding: '0 16px' }}>
          <div
            style={{
              padding: '12px',
              background: 'var(--lufa-semantic-ui-background-surface)',
              marginBottom: '12px',
              border: '1px solid var(--lufa-semantic-ui-border-default)',
            }}
          >
            Container content
          </div>

          <Bleed inline={16}>
            <div
              style={{
                padding: '16px',
                background: '#fef3c7',
                border: '2px solid #f59e0b',
                borderRadius: '4px',
                marginBottom: '12px',
              }}
            >
              inline={'{16}'} - Bleeds 16px beyond container edges
            </div>
          </Bleed>

          <Bleed inline={32}>
            <div
              style={{
                padding: '16px',
                background: '#dbeafe',
                border: '2px solid #3b82f6',
                borderRadius: '4px',
              }}
            >
              inline={'{32}'} - Bleeds 32px beyond container edges
            </div>
          </Bleed>
        </Container>
      </section>

      {/* Full-width bleed */}
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>Full viewport width</h4>
        <Container size="md" style={{ padding: '0 16px' }}>
          <Bleed inline="full">
            <div
              style={{
                padding: '24px 16px',
                background: '#10b981',
                color: 'white',
                textAlign: 'center',
                fontWeight: 600,
              }}
            >
              inline=&quot;full&quot; - Extends to full viewport width (100vw)
            </div>
          </Bleed>
        </Container>
      </section>
    </div>
  );
}

/**
 * BlockVariant - Vertical bleed examples
 * Shows block (top/bottom) bleed combined with inline bleed
 */
export function BlockVariant() {
  return (
    <Container size="md" style={{ padding: '0 16px' }}>
      <div
        style={{
          padding: '16px',
          background: 'var(--lufa-semantic-ui-background-surface)',
          marginBottom: '32px',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
        }}
      >
        Content before bleed with vertical spacing
      </div>

      <Bleed inline={24} block={16}>
        <div
          style={{
            padding: '24px',
            background: '#e0e7ff',
            border: '2px solid #6366f1',
            borderRadius: '8px',
          }}
        >
          <strong>
            inline={'{24}'} block={'{16}'}
          </strong>
          <br />
          <span style={{ fontSize: '14px', color: '#4338ca' }}>
            Bleeds 24px horizontally and 16px vertically (reduces surrounding spacing)
          </span>
        </div>
      </Bleed>

      <div
        style={{
          padding: '16px',
          background: 'var(--lufa-semantic-ui-background-surface)',
          marginTop: '32px',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
        }}
      >
        Content after bleed (vertical spacing reduced by block bleed)
      </div>
    </Container>
  );
}

/**
 * ContentPatternVariant - Real-world content pattern
 * Shows article with hero image and callout
 */
export function ContentPatternVariant() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Container size="md" style={{ padding: '32px 16px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 16px' }}>Article Title</h3>
        <p style={{ lineHeight: '1.7', color: '#6b7280', margin: '0 0 24px' }}>
          This demonstrates a typical content-focused layout where the article text stays at optimal reading width, but
          visual elements break out for emphasis.
        </p>

        {/* Hero image bleed */}
        <Bleed inline="full">
          <div
            style={{
              height: '200px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px',
              fontWeight: 600,
            }}
          >
            Full-width Hero Image
          </div>
        </Bleed>

        <p style={{ lineHeight: '1.7', color: '#374151', margin: '24px 0' }}>
          The article content continues at optimal reading width after the full-width hero section.
        </p>

        {/* Callout with partial bleed */}
        <Bleed inline={24}>
          <div
            style={{
              padding: '16px 20px',
              background: '#fef3c7',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              margin: '24px 0',
            }}
          >
            <strong style={{ display: 'block', marginBottom: '8px', color: '#92400e' }}>💡 Pro Tip</strong>
            <p style={{ margin: 0, color: '#78350f', lineHeight: '1.6' }}>
              This callout extends slightly beyond the reading width using inline={'{24}'}, making it stand out
              visually.
            </p>
          </div>
        </Bleed>

        <p style={{ lineHeight: '1.7', color: '#374151', margin: '24px 0 0' }}>
          Content continues with consistent rhythm between constrained text and extended visual elements.
        </p>
      </Container>
    </div>
  );
}

/**
 * PolymorphicVariant - Using the 'as' prop
 * Shows semantic HTML with section element
 */
export function PolymorphicVariant() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      <Container size="md" style={{ padding: '0 16px' }}>
        <div
          style={{ padding: '16px', background: 'var(--lufa-semantic-ui-background-surface)', marginBottom: '16px' }}
        >
          Regular content
        </div>

        <Bleed inline="full" as="section" aria-labelledby="featured">
          <div style={{ padding: '32px 16px', background: '#f3f4f6' }}>
            <Container size="md">
              <h3 id="featured" style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px' }}>
                as=&quot;section&quot; with aria-labelledby
              </h3>
              <p style={{ margin: 0, color: '#6b7280' }}>Semantic HTML for accessible sectioning content</p>
            </Container>
          </div>
        </Bleed>

        <div style={{ padding: '16px', background: 'var(--lufa-semantic-ui-background-surface)', marginTop: '16px' }}>
          Regular content continues
        </div>
      </Container>
    </div>
  );
}
