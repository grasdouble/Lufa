import React, { useEffect, useState } from 'react';

export type TokenReferenceChainProps = {
  /** Title for the chain */
  title: string;
  /** Optional description */
  description?: string;
  /** Array of tokens in the chain (from component → semantic → primitive) */
  chain: {
    name: string;
    cssVariable: string;
    level: 'primitive' | 'semantic' | 'component';
    description?: string;
  }[];
};

/**
 * TokenReferenceChain - Visualizes token reference chains
 *
 * Shows how component tokens reference semantic tokens,
 * which in turn reference primitive tokens.
 * Displays a horizontal flow: Component → Semantic → Primitive
 */
export const TokenReferenceChain: React.FC<TokenReferenceChainProps> = ({ title, description, chain }) => {
  const [tokenValues, setTokenValues] = useState<Record<string, string>>({});

  useEffect(() => {
    // Compute all token values
    const updateValues = () => {
      const values: Record<string, string> = {};
      chain.forEach((token) => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(token.cssVariable);
        values[token.cssVariable] = value.trim();
      });
      setTokenValues(values);
    };

    updateValues();

    // Listen for theme/mode changes
    const observer = new MutationObserver(updateValues);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-color-theme', 'data-mode'],
    });

    return () => observer.disconnect();
  }, [chain]);

  // Level-specific colors
  const levelStyles = {
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
            fontSize: '18px',
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

      {/* Chain Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: '16px',
          padding: '24px',
          borderRadius: '8px',
          backgroundColor: 'var(--lufa-semantic-ui-background-page)',
          border: '1px solid var(--lufa-semantic-ui-border-default)',
          flexWrap: 'wrap',
        }}
      >
        {chain.map((token, idx) => {
          const styles = levelStyles[token.level];
          const value = tokenValues[token.cssVariable] || '';
          const isColorToken =
            token.cssVariable.includes('color') ||
            token.cssVariable.includes('background') ||
            token.cssVariable.includes('border') ||
            token.cssVariable.includes('text');

          return (
            <React.Fragment key={idx}>
              {/* Token Card */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  padding: '16px',
                  borderRadius: '8px',
                  border: `2px solid ${styles.border}`,
                  backgroundColor: 'var(--lufa-semantic-ui-background-surface)',
                  minWidth: '200px',
                  flex: '1 1 200px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                }}
              >
                {/* Level Badge */}
                <div style={{ marginBottom: '4px' }}>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '4px',
                      backgroundColor: styles.bg,
                      color: styles.text,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                    }}
                  >
                    {token.level}
                  </span>
                </div>

                {/* Color Preview */}
                {isColorToken && value && (
                  <div
                    style={{
                      width: '100%',
                      height: '60px',
                      backgroundColor:
                        value.startsWith('#') || value.startsWith('rgb') ? value : `var(${token.cssVariable})`,
                      borderRadius: '6px',
                      border: '1px solid var(--lufa-semantic-ui-border-default)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
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
                      padding: '4px 8px',
                      backgroundColor: 'var(--lufa-semantic-ui-background-page)',
                      borderRadius: '4px',
                    }}
                  >
                    {value}
                  </div>
                )}

                {/* Description */}
                {token.description && (
                  <div
                    style={{
                      fontSize: '11px',
                      color: 'var(--lufa-semantic-ui-text-secondary)',
                      lineHeight: '1.3',
                      marginTop: '4px',
                    }}
                  >
                    {token.description}
                  </div>
                )}
              </div>

              {/* Arrow (except after last item) */}
              {idx < chain.length - 1 && (
                <div
                  style={{
                    fontSize: '24px',
                    color: 'var(--lufa-semantic-ui-text-tertiary)',
                    fontWeight: 'bold',
                    flexShrink: 0,
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Info Box */}
      <div
        style={{
          padding: '12px 16px',
          borderRadius: '6px',
          backgroundColor: 'var(--lufa-primitive-color-gray-100)',
          border: '1px solid var(--lufa-primitive-color-gray-300)',
          fontSize: '12px',
          color: 'var(--lufa-semantic-ui-text-secondary)',
          lineHeight: '1.4',
        }}
      >
        <strong>How to read this chain:</strong> The leftmost token references the middle token, which references the
        rightmost token. This creates a flexible system where changing the primitive affects all levels above it.
      </div>
    </div>
  );
};
