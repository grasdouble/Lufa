/**
 * AspectRatio Component - Live Examples for Docusaurus
 *
 * Interactive examples demonstrating AspectRatio component variants and usage patterns.
 * These components are embedded in the Docusaurus documentation.
 */

import { AspectRatio } from '@grasdouble/lufa_design-system';

/**
 * LiveDemo - Interactive demo showing basic AspectRatio usage
 * Demonstrates default 16:9 aspect ratio
 */
export function LiveDemo() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <AspectRatio>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          16:9 Default Aspect Ratio
        </div>
      </AspectRatio>
    </div>
  );
}

/**
 * RatioVariants - Common aspect ratio examples
 * Shows 16:9, 4:3, 1:1, and 9:16 ratios
 */
export function RatioVariants() {
  const ratios = [
    { value: 16 / 9, label: '16:9 (Widescreen)', color: '#667eea' },
    { value: 4 / 3, label: '4:3 (Classic)', color: '#3b82f6' },
    { value: 1, label: '1:1 (Square)', color: '#10b981' },
    { value: 9 / 16, label: '9:16 (Portrait)', color: '#f59e0b' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      {ratios.map((ratio) => (
        <div key={ratio.label}>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: 600, color: '#6b7280' }}>{ratio.label}</h4>
          <AspectRatio ratio={ratio.value}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: ratio.color,
                color: 'white',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '4px',
              }}
            >
              {ratio.label}
            </div>
          </AspectRatio>
        </div>
      ))}
    </div>
  );
}

/**
 * ImageVariant - AspectRatio with image
 * Shows how to use with images and object-fit
 */
export function ImageVariant() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>
          16:9 with object-fit: &quot;cover&quot;
        </h4>
        <div style={{ maxWidth: '400px' }}>
          <AspectRatio ratio={16 / 9}>
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop"
              alt="Mountain landscape"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
            />
          </AspectRatio>
        </div>
      </section>

      <section>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: 600 }}>1:1 Square (Avatar)</h4>
        <div style={{ maxWidth: '200px' }}>
          <AspectRatio ratio={1}>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
              alt="Profile avatar"
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          </AspectRatio>
        </div>
      </section>
    </div>
  );
}

/**
 * VideoVariant - AspectRatio with iframe (YouTube embed simulation)
 * Shows how to use with embedded content
 */
export function VideoVariant() {
  return (
    <div style={{ maxWidth: '600px' }}>
      <AspectRatio ratio={16 / 9}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#1f2937',
            color: 'white',
            borderRadius: '8px',
            gap: '16px',
          }}
        >
          <div style={{ fontSize: '48px' }}>▶</div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>Video Embed (16:9)</div>
          <div style={{ fontSize: '12px', opacity: 0.6 }}>iframe with width: 100%, height: 100%</div>
        </div>
      </AspectRatio>
    </div>
  );
}

/**
 * PolymorphicVariant - Using the 'as' prop
 * Shows semantic HTML with figure element
 */
export function PolymorphicVariant() {
  return (
    <div style={{ maxWidth: '400px' }}>
      <AspectRatio as="figure" ratio={4 / 3}>
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
          alt="Nature scene"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
        />
        <figcaption
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '12px 16px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: '14px',
            margin: 0,
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          as=&quot;figure&quot; with figcaption overlay
        </figcaption>
      </AspectRatio>
    </div>
  );
}
