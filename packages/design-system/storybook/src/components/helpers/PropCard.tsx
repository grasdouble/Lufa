import React from 'react';

/**
 * PropCard
 *
 * Helper component for displaying individual prop examples with a label.
 * The label is displayed BELOW the content to ensure visual alignment across cards,
 * even when labels wrap to multiple lines.
 * Includes hover effects for better interactivity.
 * Supports both click and hover interactions.
 *
 * @example
 * ```tsx
 * // With hover interaction (default)
 * <PropCard label='variant="primary"' highlight>
 *   <Button variant="primary">Click me</Button>
 * </PropCard>
 *
 * // With click interaction
 * <PropCard
 *   label="<section>"
 *   highlight={selected === 'section'}
 *   onInteraction={() => setSelected('section')}
 *   interactionType="click"
 * >
 *   <Box as="section">Content</Box>
 * </PropCard>
 * ```
 */
export const PropCard = ({
  label,
  children,
  highlight = false,
  onInteraction,
  interactionType = 'hover',
}: {
  /** Label text displayed above the content */
  label: string;
  /** Component or elements to display */
  children: React.ReactNode;
  /** Whether to apply highlighted background */
  highlight?: boolean;
  /** Callback when user interacts with the card (click or hover) */
  onInteraction?: () => void;
  /** Type of interaction: 'click' or 'hover' */
  interactionType?: 'click' | 'hover';
}) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = '#3b82f612';
    e.currentTarget.style.transform = 'translateY(-2px)';

    if (interactionType === 'hover' && onInteraction) {
      onInteraction();
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.background = highlight ? '#3b82f608' : 'transparent';
    e.currentTarget.style.transform = 'translateY(0)';
  };

  const handleClick = () => {
    if (interactionType === 'click' && onInteraction) {
      onInteraction();
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        background: highlight ? '#3b82f608' : 'transparent',
        borderRadius: '12px',
        transition: 'all 0.2s ease',
        cursor: interactionType === 'click' ? 'pointer' : 'default',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          color: '#6b7280',
          fontFamily: 'monospace',
          textAlign: 'center',
          paddingTop: '8px',
          borderTop: '1px solid #e5e7eb',
        }}
      >
        {label}
      </div>
    </div>
  );
};
