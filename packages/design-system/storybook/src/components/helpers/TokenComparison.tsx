import React, { useEffect, useState } from 'react';

export type TokenComparisonProps = {
  /** Title for the comparison */
  title: string;
  /** Themeable token info */
  themeableToken: {
    name: string;
    cssVariable: string;
    description?: string;
  };
  /** Non-themeable token info */
  nonThemeableToken: {
    name: string;
    cssVariable: string;
    description?: string;
  };
  /** Optional description */
  description?: string;
};

type TokenColumnProps = {
  label: string;
  token: { name: string; cssVariable: string; description?: string };
  value: string;
  isThemeable: boolean;
};

/**
 * TokenColumn - Internal component to display a single token column
 */
const TokenColumn: React.FC<TokenColumnProps> = ({ label, token, value, isThemeable }) => (
  <div
    style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '20px',
      borderRadius: '8px',
      border: isThemeable
        ? '2px solid var(--lufa-semantic-ui-border-success)'
        : '2px solid var(--lufa-primitive-color-gray-300)',
      backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
    }}
  >
    {/* Label */}
    <div
      style={{
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        color: isThemeable ? 'var(--lufa-semantic-ui-text-success)' : 'var(--lufa-semantic-ui-text-tertiary)',
        letterSpacing: '0.5px',
      }}
    >
      {label}
    </div>

    {/* Color Preview */}
    <div
      style={{
        width: '100%',
        height: '120px',
        backgroundColor: value.startsWith('#') || value.startsWith('rgb') ? value : `var(${token.cssVariable})`,
        borderRadius: '6px',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
        transition: 'background-color 0.3s ease',
      }}
    />

    {/* Token Info */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--lufa-semantic-ui-text-primary)',
        }}
      >
        {token.name}
      </div>

      <div
        style={{
          fontSize: '11px',
          fontFamily: 'monospace',
          color: 'var(--lufa-semantic-ui-text-secondary)',
          wordBreak: 'break-all',
        }}
      >
        {token.cssVariable}
      </div>

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
        {value}
      </div>

      {token.description && (
        <div
          style={{
            fontSize: '11px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            lineHeight: '1.4',
            marginTop: '4px',
          }}
        >
          {token.description}
        </div>
      )}

      {/* Badge */}
      <div style={{ marginTop: '8px' }}>
        {isThemeable ? (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: 'var(--lufa-semantic-ui-background-success)',
              color: 'var(--lufa-semantic-ui-text-success)',
            }}
          >
            ✓ Changes with Theme/Mode
          </span>
        ) : (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: 'var(--lufa-primitive-color-gray-200)',
              color: 'var(--lufa-primitive-color-gray-700)',
            }}
          >
            ✗ Immutable (Never Changes)
          </span>
        )}
      </div>
    </div>
  </div>
);

/**
 * TokenComparison - Side-by-side comparison of themeable vs non-themeable tokens
 *
 * Shows two tokens side by side to demonstrate the difference between
 * themeable tokens (that change with theme/mode) and immutable primitive tokens
 */
export const TokenComparison: React.FC<TokenComparisonProps> = ({
  title,
  themeableToken,
  nonThemeableToken,
  description,
}) => {
  const [themeableValue, setThemeableValue] = useState<string>('');
  const [nonThemeableValue, setNonThemeableValue] = useState<string>('');

  useEffect(() => {
    // Get computed values and update state
    const updateValues = () => {
      const themeableComputed = getComputedStyle(document.documentElement).getPropertyValue(themeableToken.cssVariable);
      const nonThemeableComputed = getComputedStyle(document.documentElement).getPropertyValue(
        nonThemeableToken.cssVariable
      );

      setThemeableValue(themeableComputed.trim());
      setNonThemeableValue(nonThemeableComputed.trim());
    };

    updateValues();

    // Listen for theme/mode changes
    const observer = new MutationObserver(updateValues);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-theme', 'data-mode'],
    });

    return () => observer.disconnect();
  }, [themeableToken.cssVariable, nonThemeableToken.cssVariable]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        borderRadius: '12px',
        border: '1px solid var(--lufa-semantic-ui-border-default)',
        backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
      }}
    >
      {/* Header */}
      <div>
        <h3
          style={{
            fontSize: '16px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-primary)',
            margin: '0 0 8px 0',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '13px',
              color: 'var(--lufa-semantic-ui-text-secondary)',
              lineHeight: '1.5',
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Two-column comparison */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}
      >
        <TokenColumn label="Themeable Token" token={themeableToken} value={themeableValue} isThemeable />
        <TokenColumn
          label="Non-Themeable (Primitive)"
          token={nonThemeableToken}
          value={nonThemeableValue}
          isThemeable={false}
        />
      </div>
    </div>
  );
};
