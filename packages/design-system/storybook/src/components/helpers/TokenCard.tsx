import React, { useEffect, useMemo, useState } from 'react';

export type TokenCardProps = {
  /** Token name (e.g., "primary-500") */
  tokenName: string;
  /** CSS variable (e.g., "--lufa-primitive-color-blue-500") */
  cssVariable: string;
  /** Token level: primitive, semantic, or component */
  level: 'primitive' | 'semantic' | 'component';
  /** Whether the token is themeable (changes with theme) */
  themeable?: boolean;
  /** Whether the token is mode-aware (changes with light/dark/high-contrast) */
  modeAware?: boolean;
  /** Optional description */
  description?: string;
  /** Optional category */
  category?: string;
  /** Whether to show computed value */
  showValue?: boolean;
  /** Optional reference tokens this token points to */
  references?: string[];
};

/**
 * TokenCard - Display individual token with its properties
 *
 * Shows token information with visual preview (for colors),
 * level badge, and metadata badges (themeable, modeAware)
 */
export const TokenCard: React.FC<TokenCardProps> = ({
  tokenName,
  cssVariable,
  level,
  themeable = false,
  modeAware = false,
  description,
  category,
  showValue = true,
  references = [],
}) => {
  const [computedValue, setComputedValue] = useState<string>('');

  // Check if it's a color token (memoized to avoid recalculation)
  const isColorToken = useMemo(() => {
    const colorKeywords = ['color', 'background', 'border', 'text', 'shadow'];
    return colorKeywords.some((keyword) => cssVariable.includes(keyword));
  }, [cssVariable]);

  useEffect(() => {
    // Get computed value of the CSS variable
    const updateValue = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(cssVariable);
      setComputedValue(value.trim());
    };

    updateValue();

    // Listen for theme/mode changes via MutationObserver
    const observer = new MutationObserver(updateValue);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-theme', 'data-mode'],
    });

    return () => observer.disconnect();
  }, [cssVariable]);

  // Level-specific colors
  const levelColors = {
    primitive: {
      bg: 'var(--lufa-primitive-color-purple-100)',
      text: 'var(--lufa-primitive-color-purple-500)',
      border: 'var(--lufa-primitive-color-purple-500)',
    },
    semantic: {
      bg: 'var(--lufa-primitive-color-blue-100)',
      text: 'var(--lufa-primitive-color-blue-600)',
      border: 'var(--lufa-primitive-color-blue-500)',
    },
    component: {
      bg: 'var(--lufa-primitive-color-green-100)',
      text: 'var(--lufa-primitive-color-green-600)',
      border: 'var(--lufa-primitive-color-green-600)',
    },
  };

  const colors = levelColors[level];

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '16px',
        borderRadius: '8px',
        border: `2px solid ${colors.border}`,
        backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
        minWidth: '280px',
        flex: '1 1 280px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      }}
    >
      {/* Visual Preview (for colors) */}
      {isColorToken && computedValue && (
        <div
          style={{
            width: '100%',
            height: '60px',
            backgroundColor:
              computedValue.startsWith('#') || computedValue.startsWith('rgb') ? computedValue : `var(${cssVariable})`,
            borderRadius: '6px',
            border: '1px solid var(--lufa-semantic-ui-border-default)',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
          }}
        />
      )}

      {/* Token Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Token Name */}
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-semantic-ui-text-primary)',
          }}
        >
          {tokenName}
        </div>

        {/* CSS Variable */}
        <div
          style={{
            fontSize: '11px',
            fontFamily: 'monospace',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            wordBreak: 'break-all',
          }}
        >
          {cssVariable}
        </div>

        {/* Computed Value */}
        {showValue && computedValue && (
          <div
            style={{
              fontSize: '10px',
              fontFamily: 'monospace',
              color: 'var(--lufa-semantic-ui-text-tertiary)',
              padding: '4px 8px',
              backgroundColor: 'var(--lufa-semantic-ui-background-page)',
              borderRadius: '4px',
            }}
          >
            {computedValue}
          </div>
        )}

        {/* Description */}
        {description && (
          <div
            style={{
              fontSize: '12px',
              color: 'var(--lufa-semantic-ui-text-secondary)',
              lineHeight: '1.4',
            }}
          >
            {description}
          </div>
        )}

        {/* Badges Container */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
          {/* Level Badge */}
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '2px 8px',
              borderRadius: '4px',
              backgroundColor: colors.bg,
              color: colors.text,
              textTransform: 'uppercase',
            }}
          >
            {level}
          </span>

          {/* Themeable Badge */}
          {themeable && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--lufa-semantic-ui-background-success)',
                color: 'var(--lufa-semantic-ui-text-success)',
              }}
            >
              Themeable
            </span>
          )}

          {/* Non-Themeable Badge */}
          {!themeable && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--lufa-primitive-color-gray-200)',
                color: 'var(--lufa-primitive-color-gray-700)',
              }}
            >
              Immutable
            </span>
          )}

          {/* Mode Aware Badge */}
          {modeAware && (
            <span
              style={{
                fontSize: '10px',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--lufa-semantic-ui-background-info)',
                color: 'var(--lufa-semantic-ui-text-info)',
              }}
            >
              Mode-Aware
            </span>
          )}

          {/* Category Badge */}
          {category && (
            <span
              style={{
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '4px',
                backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                color: 'var(--lufa-semantic-ui-text-tertiary)',
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* References */}
        {references.length > 0 && (
          <div
            style={{
              fontSize: '10px',
              color: 'var(--lufa-semantic-ui-text-tertiary)',
              marginTop: '4px',
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>References:</div>
            {references.map((ref, idx) => (
              <div key={idx} style={{ fontFamily: 'monospace', marginLeft: '8px' }}>
                → {ref}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
