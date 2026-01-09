import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '1. Tokens/Transition',
  parameters: {
    layout: 'padded',
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTransitions: Story = {
  render: () => {
    const [activeTransitions, setActiveTransitions] = useState<Record<string, boolean>>({});

    const triggerTransition = (key: string) => {
      setActiveTransitions((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setActiveTransitions((prev) => ({ ...prev, [key]: false }));
      }, 1000);
    };

    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Transition Tokens</h1>
        <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
          Pre-configured CSS transition strings for common UI interactions. Simpler than motion tokens for basic
          transitions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {Object.entries(tokens.transition).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: '24px',
                backgroundColor: '#FAFAFA',
                borderRadius: '8px',
                border: '1px solid #E5E5E5',
              }}
            >
              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: '600',
                    fontSize: '14px',
                    marginBottom: '8px',
                  }}
                >
                  transition.{key}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: '#737373',
                    fontSize: '11px',
                    backgroundColor: '#F3F4F6',
                    padding: '8px',
                    borderRadius: '4px',
                  }}
                >
                  {value}
                </div>
              </div>

              <button
                onClick={() => triggerTransition(key)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: activeTransitions[key] ? '#10B981' : '#3B82F6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: value,
                  transform: activeTransitions[key] ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                Click to see {key} transition
              </button>

              <div style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
                {key === 'fast' && '150ms - Quick hover effects, micro-interactions'}
                {key === 'base' && '250ms - Standard transitions, most UI elements'}
                {key === 'slow' && '400ms - Larger movements, modals, drawers'}
                {key === 'colors' && '150ms - Optimized for color/background changes'}
                {key === 'none' && 'Disable transitions (reduced motion preference)'}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#1E40AF' }}>Accessibility: Reduced Motion</div>
          <div style={{ fontSize: '14px', color: '#1E3A8A', marginBottom: '12px' }}>
            Always respect user's motion preferences. Use transition.none for users who prefer reduced motion.
          </div>
          <pre
            style={{
              margin: 0,
              padding: '12px',
              backgroundColor: '#1F2937',
              color: '#10B981',
              borderRadius: '6px',
              fontSize: '12px',
              overflow: 'auto',
            }}
          >
            {`@media (prefers-reduced-motion: reduce) {
  * {
    transition: ${tokens.transition.none} !important;
    animation: none !important;
  }
}`}
          </pre>
        </div>
      </div>
    );
  },
};

export const InteractiveExamples: Story = {
  render: () => {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState('#3B82F6');

    return (
      <div style={{ padding: '20px', maxWidth: '1400px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Transition Usage Examples</h1>

        {/* Fast Transitions - Hover Effects */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
            Fast Transitions (Hover Effects)
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '16px',
            }}
          >
            {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map((card) => (
              <div
                key={card}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '24px',
                  backgroundColor: hoveredCard === card ? '#3B82F6' : '#F3F4F6',
                  color: hoveredCard === card ? 'white' : '#1F2937',
                  borderRadius: '8px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: tokens.transition.fast,
                  transform: hoveredCard === card ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === card ? '0 4px 12px rgba(0,0,0,0.15)' : '0 1px 3px rgba(0,0,0,0.1)',
                }}
              >
                {card}
              </div>
            ))}
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
            Using transition.fast for smooth hover effects
          </p>
        </div>

        {/* Base Transitions - Modal */}
        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>Base Transitions (Modals)</h2>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#3B82F6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
            }}
          >
            {isModalOpen ? 'Close Modal' : 'Open Modal'}
          </button>

          {isModalOpen && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 50,
                opacity: isModalOpen ? 1 : 0,
                transition: tokens.transition.base,
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: 'white',
                  padding: '32px',
                  borderRadius: '12px',
                  maxWidth: '400px',
                  transition: tokens.transition.base,
                  transform: isModalOpen ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>Example Modal</h3>
                <p style={{ color: '#6B7280', marginBottom: '20px' }}>
                  This modal uses transition.base for a smooth open/close animation.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
            Using transition.base for modal animations
          </p>
        </div>

        {/* Color Transitions */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
            Color Transitions (Theme Switching)
          </h2>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: color,
                  border: selectedColor === color ? '3px solid #1F2937' : '3px solid transparent',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: tokens.transition.colors,
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          <div
            style={{
              padding: '32px',
              backgroundColor: selectedColor,
              color: 'white',
              borderRadius: '8px',
              transition: tokens.transition.colors,
            }}
          >
            <div style={{ fontSize: '20px', fontWeight: '600' }}>Selected Color</div>
            <div style={{ fontFamily: 'monospace', fontSize: '14px', marginTop: '8px' }}>{selectedColor}</div>
          </div>
          <p style={{ marginTop: '12px', fontSize: '12px', color: '#737373' }}>
            Using transition.colors for smooth color changes
          </p>
        </div>

        <div
          style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#FFFBEB',
            border: '1px solid #FCD34D',
            borderRadius: '8px',
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '8px', color: '#92400E' }}>💡 Transition Best Practices</div>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350F', fontSize: '14px' }}>
            <li>Use transition.fast for micro-interactions (hover, focus states)</li>
            <li>Use transition.base for most UI elements (dropdowns, tooltips)</li>
            <li>Use transition.slow for larger movements (modals, drawers, slides)</li>
            <li>Use transition.colors specifically for color/background changes</li>
            <li>Always respect prefers-reduced-motion for accessibility</li>
          </ul>
        </div>
      </div>
    );
  },
};
