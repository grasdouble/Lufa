import { useState } from 'react';

/**
 * PlaygroundContainer
 *
 * Enhanced container for Playground stories with visual context and interactive toggles.
 *
 * **Features:**
 * - Dashed border container to visualize margins
 * - Optional grid overlay with center crosshair
 * - Optional adjacent elements (Above, Before, After, Below) to test display modes
 * - Toggle buttons in UI (not in component props)
 * - No flex/grid wrapper to preserve display prop behavior
 *
 * **Use Cases:**
 * - Layout components (Box, Stack, Flex, Grid)
 * - Components where margins/spacing need to be visible
 * - Components where display mode affects layout (block, inline-block, inline, flex, grid)
 *
 * @example
 * ```tsx
 * export const Playground: Story = {
 *   args: { padding: 'comfortable', background: 'info' },
 *   render: (args) => (
 *     <PlaygroundContainer>
 *       <Box {...args}>Content</Box>
 *     </PlaygroundContainer>
 *   ),
 * };
 * ```
 */
export type PlaygroundContainerProps = {
  /**
   * The component being tested (usually with spread props from args)
   */
  children: React.ReactNode;

  /**
   * Initial state for grid overlay
   * @default true
   */
  defaultShowGrid?: boolean;

  /**
   * Initial state for adjacent elements
   * @default false
   */
  defaultShowAdjacentElements?: boolean;
};

export const PlaygroundContainer = ({
  children,
  defaultShowGrid = true,
  defaultShowAdjacentElements = false,
}: PlaygroundContainerProps) => {
  const [showGrid, setShowGrid] = useState(defaultShowGrid);
  const [showAdjacentElements, setShowAdjacentElements] = useState(defaultShowAdjacentElements);

  return (
    <div
      style={{
        padding: '48px',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        background: 'var(--lufa-semantic-ui-background-surface)',
      }}
    >
      {/* Toggle Controls */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Show Grid
        </label>

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'var(--lufa-semantic-ui-text-secondary)',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <input
            type="checkbox"
            checked={showAdjacentElements}
            onChange={(e) => setShowAdjacentElements(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          Show Adjacent Elements
        </label>
      </div>

      {/* Container with dashed border to visualize margins */}
      <div
        style={{
          position: 'relative',
          padding: '24px',
          border: '2px dashed var(--lufa-semantic-ui-border-default)',
          borderRadius: '8px',
          background: 'var(--lufa-semantic-ui-background-surface)',
          minWidth: '400px',
          minHeight: '200px',
          flex: 1,
        }}
      >
        {/* Grid overlay */}
        {showGrid && (
          <>
            {/* Vertical center line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                width: '1px',
                height: '100%',
                background: 'var(--lufa-semantic-ui-border-default)',
                pointerEvents: 'none',
              }}
            />
            {/* Horizontal center line */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                width: '100%',
                height: '1px',
                background: 'var(--lufa-semantic-ui-border-default)',
                pointerEvents: 'none',
              }}
            />
            {/* Center crosshair */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '12px',
                height: '12px',
                pointerEvents: 'none',
              }}
            >
              {/* Horizontal line of crosshair */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '0',
                  width: '100%',
                  height: '2px',
                  background: 'var(--lufa-semantic-ui-text-tertiary)',
                  transform: 'translateY(-50%)',
                }}
              />
              {/* Vertical line of crosshair */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '50%',
                  width: '2px',
                  height: '100%',
                  background: 'var(--lufa-semantic-ui-text-tertiary)',
                  transform: 'translateX(-50%)',
                }}
              />
            </div>
          </>
        )}

        {/* Content wrapper - NO flex/grid to not interfere with display prop */}
        <div style={{ position: 'relative' }}>
          {/* Element Above - Block element, centered */}
          {showAdjacentElements && (
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--lufa-semantic-ui-background-surface)',
                borderRadius: '6px',
                fontSize: '14px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginBottom: '12px',
                textAlign: 'center',
              }}
            >
              Above
            </div>
          )}

          {/* Inline elements (Before / Box / After) */}
          <div style={{ textAlign: 'center' }}>
            {showAdjacentElements && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--lufa-semantic-ui-text-secondary)',
                  display: 'inline-block',
                  marginRight: '12px',
                  verticalAlign: 'middle',
                }}
              >
                Before
              </div>
            )}

            {/* The component being tested */}
            <div style={{ display: 'inline-block', verticalAlign: 'middle' }}>{children}</div>

            {showAdjacentElements && (
              <div
                style={{
                  padding: '12px 16px',
                  background: 'var(--lufa-semantic-ui-background-surface)',
                  borderRadius: '6px',
                  fontSize: '14px',
                  color: 'var(--lufa-semantic-ui-text-secondary)',
                  display: 'inline-block',
                  marginLeft: '12px',
                  verticalAlign: 'middle',
                }}
              >
                After
              </div>
            )}
          </div>

          {/* Element Below - Block element, centered */}
          {showAdjacentElements && (
            <div
              style={{
                padding: '12px 16px',
                background: 'var(--lufa-semantic-ui-background-surface)',
                borderRadius: '6px',
                fontSize: '14px',
                color: 'var(--lufa-semantic-ui-text-secondary)',
                marginTop: '12px',
                textAlign: 'center',
              }}
            >
              Below
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
