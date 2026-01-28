import React, { useEffect, useState } from 'react';

export interface TokenMatrixProps {
  /** Title for the matrix */
  title: string;
  /** Optional description */
  description?: string;
  /** Array of tokens to display */
  tokens: Array<{
    name: string;
    cssVariable: string;
    level: 'primitive' | 'semantic' | 'component';
    themeable?: boolean;
    modeAware?: boolean;
    description?: string;
  }>;
  /** Show mode switching info banner */
  showModeInfo?: boolean;
  /** Show theme switching info banner */
  showThemeInfo?: boolean;
}

/**
 * TokenMatrix - Grid view of multiple tokens
 *
 * Displays a grid of tokens with visual previews and metadata.
 * Useful for showing groups of related tokens.
 */
export const TokenMatrix: React.FC<TokenMatrixProps> = ({
  title,
  description,
  tokens,
  showModeInfo = false,
  showThemeInfo = false,
}) => {
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Compute all token values
    const values: Record<string, string> = {};
    tokens.forEach((token) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(token.cssVariable);
      values[token.cssVariable] = value.trim();
    });
    setTokenValues(values);
  }, [tokens]);

  // Level-specific colors
  const levelColors = {
    primitive: {
      bg: 'var(--lufa-primitive-color-purple-100)',
      text: 'var(--lufa-primitive-color-purple-500)',
    },
    semantic: {
      bg: 'var(--lufa-primitive-color-blue-100)',
      text: 'var(--lufa-primitive-color-blue-600)',
    },
    component: {
      bg: 'var(--lufa-primitive-color-green-100)',
      text: 'var(--lufa-primitive-color-green-600)',
    },
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '40px',
      }}
    >
      {/* Header */}
      <div>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 700,
            color: 'var(--lufa-semantic-ui-text-primary)',
            marginBottom: '8px',
          }}
        >
          {title}
        </h3>
        {description && (
          <p
            style={{
              fontSize: '14px',
              color: 'var(--lufa-semantic-ui-text-secondary)',
              lineHeight: '1.5',
              margin: 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Info Banners */}
      {showModeInfo && (
        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-info)',
            border: '1px solid var(--lufa-semantic-ui-border-info)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '20px' }}>💡</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--lufa-semantic-ui-text-info)',
                marginBottom: '4px',
              }}
            >
              Test Mode Switching
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--lufa-semantic-ui-text-info)',
                lineHeight: '1.4',
              }}
            >
              Use the Mode toolbar (☀️ Light / 🌙 Dark / ◐ High Contrast) to see these tokens adapt to different
              accessibility modes.
            </div>
          </div>
        </div>
      )}

      {showThemeInfo && (
        <div
          style={{
            padding: '16px',
            borderRadius: '8px',
            backgroundColor: 'var(--lufa-semantic-ui-background-success)',
            border: '1px solid var(--lufa-semantic-ui-border-success)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
          }}
        >
          <span style={{ fontSize: '20px' }}>🎨</span>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--lufa-semantic-ui-text-success)',
                marginBottom: '4px',
              }}
            >
              Test Theme Switching
            </div>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--lufa-semantic-ui-text-success)',
                lineHeight: '1.4',
              }}
            >
              Use the Theme toolbar (Default / 🌊 Ocean / 🌲 Forest) to see these tokens adapt to different brand
              themes.
            </div>
          </div>
        </div>
      )}

      {/* Token Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px',
        }}
      >
        {tokens.map((token, idx) => {
          const colors = levelColors[token.level];
          const value = tokenValues[token.cssVariable] || '';
          const isColorToken =
            token.cssVariable.includes('color') ||
            token.cssVariable.includes('background') ||
            token.cssVariable.includes('border') ||
            token.cssVariable.includes('text');

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                padding: '14px',
                borderRadius: '6px',
                border: '1px solid var(--lufa-semantic-ui-border-default)',
                backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Color Preview */}
              {isColorToken && value && (
                <div
                  style={{
                    width: '100%',
                    height: '50px',
                    backgroundColor:
                      value.startsWith('#') || value.startsWith('rgb') ? value : `var(${token.cssVariable})`,
                    borderRadius: '4px',
                    border: '1px solid var(--lufa-semantic-ui-border-default)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    transition: 'background-color 0.3s ease',
                  }}
                />
              )}

              {/* Token Name */}
              <div
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--lufa-semantic-ui-text-primary)',
                }}
              >
                {token.name}
              </div>

              {/* CSS Variable */}
              <div
                style={{
                  fontSize: '10px',
                  fontFamily: 'monospace',
                  color: 'var(--lufa-semantic-ui-text-secondary)',
                  wordBreak: 'break-all',
                  lineHeight: '1.3',
                }}
              >
                {token.cssVariable}
              </div>

              {/* Value */}
              {value && (
                <div
                  style={{
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    color: 'var(--lufa-semantic-ui-text-tertiary)',
                    padding: '3px 6px',
                    backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                    borderRadius: '3px',
                  }}
                >
                  {value}
                </div>
              )}

              {/* Badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {/* Level Badge */}
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: 600,
                    padding: '2px 6px',
                    borderRadius: '3px',
                    backgroundColor: colors.bg,
                    color: colors.text,
                    textTransform: 'uppercase',
                  }}
                >
                  {token.level}
                </span>

                {/* Themeable Badge */}
                {token.themeable && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      backgroundColor: 'var(--lufa-semantic-ui-background-success)',
                      color: 'var(--lufa-semantic-ui-text-success)',
                    }}
                  >
                    Themeable
                  </span>
                )}

                {/* Mode Aware Badge */}
                {token.modeAware && (
                  <span
                    style={{
                      fontSize: '9px',
                      fontWeight: 600,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      backgroundColor: 'var(--lufa-semantic-ui-background-info)',
                      color: 'var(--lufa-semantic-ui-text-info)',
                    }}
                  >
                    Mode-Aware
                  </span>
                )}
              </div>

              {/* Description */}
              {token.description && (
                <div
                  style={{
                    fontSize: '11px',
                    color: 'var(--lufa-semantic-ui-text-secondary)',
                    lineHeight: '1.3',
                  }}
                >
                  {token.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
