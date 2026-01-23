import React from 'react';

/**
 * CodeBlock
 *
 * Displays formatted code with syntax highlighting and a header.
 * Supports tabs for switching between different code views (JSX, HTML, CSS, etc.)
 *
 * @example
 * ```tsx
 * // Simple usage
 * <CodeBlock code="<Button>Click</Button>" language="jsx" title="Example" />
 *
 * // With tabs
 * <CodeBlock
 *   tabs={[
 *     { label: 'JSX', content: '<Box as="div">Content</Box>' },
 *     { label: 'HTML', content: '<div class="...">Content</div>' }
 *   ]}
 *   title="Code Example"
 * />
 * ```
 */
export const CodeBlock = ({
  code,
  language = 'jsx',
  title,
  subtitle,
  emptyMessage = 'No code to display',
  tabs,
}: {
  /** Code content to display (if not using tabs) */
  code?: string;
  /** Programming language for context (jsx, html, css, etc.) */
  language?: string;
  /** Optional title displayed in header */
  title?: string;
  /** Optional subtitle displayed in header (e.g., current element tag) */
  subtitle?: string;
  /** Message to show when code is empty */
  emptyMessage?: string;
  /** Array of tabs with label and content */
  tabs?: Array<{ label: string; content: string; language?: string }>;
}) => {
  const [activeTab, setActiveTab] = React.useState(0);

  // Use tabs if provided, otherwise single code view
  const displayCode = tabs ? tabs[activeTab]?.content : code;
  const displayLanguage = tabs ? tabs[activeTab]?.language || language : language;

  return (
    <div
      style={{
        background: '#1e293b',
        borderRadius: '12px',
        padding: '20px',
        fontFamily: 'monospace',
        fontSize: '13px',
        lineHeight: '1.6',
        color: '#e2e8f0',
        overflow: 'auto',
        border: '1px solid #334155',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Header */}
      {(title || subtitle || tabs) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
            paddingBottom: '12px',
            borderBottom: '1px solid #334155',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {title && (
              <span
                style={{
                  color: '#94a3b8',
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {title}
              </span>
            )}
            {subtitle && (
              <span
                style={{
                  color: '#60a5fa',
                  fontWeight: 600,
                }}
              >
                {subtitle}
              </span>
            )}
          </div>

          {/* Tabs */}
          {tabs && tabs.length > 1 && (
            <div style={{ display: 'flex', gap: '4px' }}>
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  style={{
                    padding: '6px 12px',
                    background: activeTab === index ? '#3b82f6' : '#334155',
                    color: activeTab === index ? '#ffffff' : '#94a3b8',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'monospace',
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== index) {
                      e.currentTarget.style.background = '#475569';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== index) {
                      e.currentTarget.style.background = '#334155';
                    }
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Code content */}
      <pre
        style={{
          margin: 0,
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {displayCode || <span style={{ color: '#94a3b8', fontStyle: 'italic' }}>{emptyMessage}</span>}
      </pre>
    </div>
  );
};
