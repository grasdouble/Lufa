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
      <div style={{ padding: tokens.spacing['md-lg'], maxWidth: tokens.maxWidth['8xl'] }}>
        <h1
          style={{
            fontSize: tokens.fontSize['5xl'],
            fontWeight: tokens.fontWeight.bold,
            marginBottom: tokens.spacing.base,
          }}
        >
          Transition Tokens
        </h1>
        <p
          style={{ marginBottom: tokens.spacing.xl, color: tokens.color.text.tertiary, fontSize: tokens.fontSize.base }}
        >
          Pre-configured CSS transition strings for common UI interactions. Simpler than motion tokens for basic
          transitions.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.xl }}>
          {Object.entries(tokens.transition).map(([key, value]) => (
            <div
              key={key}
              style={{
                padding: tokens.spacing.lg,
                backgroundColor: tokens.color.background.secondary,
                borderRadius: tokens.radius.base,
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              }}
            >
              <div style={{ marginBottom: tokens.spacing.base }}>
                <div
                  style={{
                    fontFamily: 'monospace',
                    fontWeight: tokens.fontWeight.semibold,
                    fontSize: tokens.fontSize.sm,
                    marginBottom: tokens.spacing.sm,
                  }}
                >
                  transition.{key}
                </div>
                <div
                  style={{
                    fontFamily: 'monospace',
                    color: tokens.color.text.tertiary,
                    fontSize: tokens.fontSize.xs,
                    backgroundColor: tokens.color.background.tertiary,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.sm,
                  }}
                >
                  {value}
                </div>
              </div>

              <button
                onClick={() => triggerTransition(key)}
                style={{
                  padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
                  backgroundColor: activeTransitions[key]
                    ? tokens.color.success.default
                    : tokens.color.interactive.focus,
                  color: tokens.color.text.inverse,
                  border: tokens.borderStyle.none,
                  borderRadius: tokens.radius.base,
                  fontSize: tokens.fontSize.sm,
                  fontWeight: tokens.fontWeight.medium,
                  cursor: 'pointer',
                  transition: value,
                  transform: activeTransitions[key] ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                Click to see {key} transition
              </button>

              <div
                style={{
                  marginTop: tokens.spacing.md,
                  fontSize: tokens.fontSize.xs,
                  color: tokens.color.text.tertiary,
                }}
              >
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
            marginTop: tokens.spacing.xl,
            padding: tokens.spacing.base,
            backgroundColor: tokens.color.info.light,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.info.border}`,
            borderRadius: tokens.radius.base,
          }}
        >
          <div
            style={{
              fontWeight: tokens.fontWeight.semibold,
              marginBottom: tokens.spacing.sm,
              color: tokens.color.info.text,
            }}
          >
            Accessibility: Reduced Motion
          </div>
          <div style={{ fontSize: tokens.fontSize.sm, color: tokens.color.info.text, marginBottom: tokens.spacing.md }}>
            Always respect user's motion preferences. Use transition.none for users who prefer reduced motion.
          </div>
          <pre
            style={{
              margin: 0,
              padding: tokens.spacing.md,
              backgroundColor: tokens.color.background.inverse,
              color: tokens.color.success.default,
              borderRadius: tokens.radius.md,
              fontSize: tokens.fontSize.xs,
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
    const [selectedColor, setSelectedColor] = useState(tokens.color.interactive.focus);

    return (
      <div style={{ padding: tokens.spacing['md-lg'], maxWidth: tokens.maxWidth['8xl'] }}>
        <h1
          style={{
            fontSize: tokens.fontSize['5xl'],
            fontWeight: tokens.fontWeight.bold,
            marginBottom: tokens.spacing.base,
          }}
        >
          Transition Usage Examples
        </h1>

        {/* Fast Transitions - Hover Effects */}
        <div style={{ marginBottom: tokens.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: tokens.fontSize['2xl'],
              fontWeight: tokens.fontWeight.semibold,
              marginBottom: tokens.spacing.base,
            }}
          >
            Fast Transitions (Hover Effects)
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: tokens.spacing.base,
            }}
          >
            {['Card 1', 'Card 2', 'Card 3', 'Card 4'].map((card) => (
              <div
                key={card}
                onMouseEnter={() => setHoveredCard(card)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: tokens.spacing.lg,
                  backgroundColor:
                    hoveredCard === card ? tokens.color.interactive.focus : tokens.color.background.tertiary,
                  color: hoveredCard === card ? tokens.color.text.inverse : tokens.color.text.primary,
                  borderRadius: tokens.radius.base,
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: tokens.transition.fast,
                  transform: hoveredCard === card ? `translateY(-${tokens.spacing.xs})` : 'translateY(0)',
                  boxShadow: hoveredCard === card ? tokens.shadow.md : tokens.shadow.xs,
                }}
              >
                {card}
              </div>
            ))}
          </div>
          <p style={{ marginTop: tokens.spacing.md, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
            Using transition.fast for smooth hover effects
          </p>
        </div>

        {/* Base Transitions - Modal */}
        <div style={{ marginBottom: tokens.spacing['2xl'] }}>
          <h2
            style={{
              fontSize: tokens.fontSize['2xl'],
              fontWeight: tokens.fontWeight.semibold,
              marginBottom: tokens.spacing.base,
            }}
          >
            Base Transitions (Modals)
          </h2>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            style={{
              padding: `${tokens.spacing.md} ${tokens.spacing.lg}`,
              backgroundColor: tokens.color.interactive.focus,
              color: tokens.color.text.inverse,
              border: tokens.borderStyle.none,
              borderRadius: tokens.radius.md,
              fontSize: tokens.fontSize.sm,
              fontWeight: tokens.fontWeight.medium,
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
                backgroundColor: tokens.color.background.overlay,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: tokens.zIndex.menu,
                opacity: isModalOpen ? tokens.opacity.full : tokens.opacity.invisible,
                transition: tokens.transition.base,
              }}
              onClick={() => setIsModalOpen(false)}
            >
              <div
                onClick={(e) => e.stopPropagation()}
                style={{
                  backgroundColor: tokens.color.surface.default,
                  padding: tokens.spacing.xl,
                  borderRadius: tokens.radius.lg,
                  maxWidth: tokens.maxWidth.xs,
                  transition: tokens.transition.base,
                  transform: isModalOpen ? 'scale(1)' : 'scale(0.95)',
                }}
              >
                <h3
                  style={{
                    fontSize: tokens.fontSize.xl,
                    fontWeight: tokens.fontWeight.semibold,
                    marginBottom: tokens.spacing.md,
                  }}
                >
                  Example Modal
                </h3>
                <p style={{ color: tokens.color.text.secondary, marginBottom: tokens.spacing['md-lg'] }}>
                  This modal uses transition.base for a smooth open/close animation.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    padding: `${tokens.spacing['sm-md']} ${tokens.spacing['md-lg']}`,
                    backgroundColor: tokens.color.interactive.focus,
                    color: tokens.color.text.inverse,
                    border: tokens.borderStyle.none,
                    borderRadius: tokens.radius.md,
                    cursor: 'pointer',
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <p style={{ marginTop: tokens.spacing.md, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
            Using transition.base for modal animations
          </p>
        </div>

        {/* Color Transitions */}
        <div>
          <h2
            style={{
              fontSize: tokens.fontSize['2xl'],
              fontWeight: tokens.fontWeight.semibold,
              marginBottom: tokens.spacing.base,
            }}
          >
            Color Transitions (Theme Switching)
          </h2>
          <div style={{ display: 'flex', gap: tokens.spacing.md, marginBottom: tokens.spacing.base }}>
            {[
              tokens.color.interactive.focus,
              tokens.color.success.default,
              tokens.color.warning.default,
              tokens.color.error.default,
              tokens.color.brand.secondary,
            ].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                style={{
                  width: tokens.size.lg,
                  height: tokens.size.lg,
                  backgroundColor: color,
                  border:
                    selectedColor === color
                      ? `${tokens.borderWidth.focus} ${tokens.borderStyle.solid} ${tokens.color.border.strong}`
                      : `${tokens.borderWidth.focus} ${tokens.borderStyle.solid} transparent`,
                  borderRadius: tokens.radius.base,
                  cursor: 'pointer',
                  transition: tokens.transition.colors,
                }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
          <div
            style={{
              padding: tokens.spacing.xl,
              backgroundColor: selectedColor,
              color: tokens.color.text.inverse,
              borderRadius: tokens.radius.base,
              transition: tokens.transition.colors,
            }}
          >
            <div style={{ fontSize: tokens.fontSize.xl, fontWeight: tokens.fontWeight.semibold }}>Selected Color</div>
            <div style={{ fontFamily: 'monospace', fontSize: tokens.fontSize.sm, marginTop: tokens.spacing.sm }}>
              {selectedColor}
            </div>
          </div>
          <p style={{ marginTop: tokens.spacing.md, fontSize: tokens.fontSize.xs, color: tokens.color.text.tertiary }}>
            Using transition.colors for smooth color changes
          </p>
        </div>

        <div
          style={{
            marginTop: tokens.spacing.xl,
            padding: tokens.spacing.base,
            backgroundColor: tokens.color.warning.light,
            border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.warning.border}`,
            borderRadius: tokens.radius.base,
          }}
        >
          <div
            style={{
              fontWeight: tokens.fontWeight.semibold,
              marginBottom: tokens.spacing.sm,
              color: tokens.color.warning.text,
            }}
          >
            💡 Transition Best Practices
          </div>
          <ul
            style={{
              margin: 0,
              paddingLeft: tokens.spacing['md-lg'],
              color: tokens.color.warning.text,
              fontSize: tokens.fontSize.sm,
            }}
          >
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
