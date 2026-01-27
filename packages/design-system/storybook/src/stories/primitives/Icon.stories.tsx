import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { IconName } from '@grasdouble/lufa_design-system';
import { Icon } from '@grasdouble/lufa_design-system';

import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { STORY_COLORS } from '../../constants/storyColors';

const NEUTRAL = STORY_COLORS.neutral;
const PRIMARY = STORY_COLORS.primary;

/**
 * Icon - SVG Icon Wrapper Component
 *
 * A flexible icon component that provides uniform SVG rendering with semantic sizing
 * and coloring based on design tokens. Integrates with Lucide React icon library.
 *
 * ## Features
 * - ✅ String-based icon name API
 * - ✅ Size variants (xs, sm, md, lg, xl)
 * - ✅ Semantic color values (currentColor, primary, secondary, success, error, etc.)
 * - ✅ Accessibility support (title for screen readers, aria-hidden for decorative)
 * - ✅ Polymorphic `as` prop for semantic HTML
 * - ✅ Performance-optimized (CSS classes, not inline styles)
 */
const meta = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    // Core
    name: {
      control: 'select',
      options: [
        'user',
        'home',
        'settings',
        'menu',
        'search',
        'check',
        'x',
        'plus',
        'minus',
        'edit',
        'trash',
        'save',
        'download',
        'upload',
        'chevron-down',
        'chevron-up',
        'chevron-left',
        'chevron-right',
        'arrow-left',
        'arrow-right',
        'alert-circle',
        'info',
        'check-circle',
        'x-circle',
        'external-link',
        'eye',
        'eye-off',
        'heart',
        'star',
      ],
      description: 'Icon name from Lucide React library',
      table: {
        category: 'Core',
        type: { summary: 'IconName' },
      },
    },

    // Polymorphic
    as: {
      control: 'select',
      options: ['span', 'div', 'i'],
      description: 'HTML element to render',
      table: {
        category: 'Polymorphic',
        type: { summary: 'ElementType' },
        defaultValue: { summary: 'span' },
      },
    },

    // Variants
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
      table: {
        category: 'Variants',
        type: { summary: 'SizeValue' },
        defaultValue: { summary: 'md' },
      },
    },
    color: {
      control: 'select',
      options: ['currentColor', 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'muted'],
      description: 'Color variant (semantic colors)',
      table: {
        category: 'Variants',
        type: { summary: 'ColorValue' },
        defaultValue: { summary: 'currentColor' },
      },
    },

    // Accessibility
    title: {
      control: 'text',
      description: 'Accessible title for screen readers (if not provided, icon is decorative)',
      table: {
        category: 'Accessibility',
        type: { summary: 'string' },
      },
    },

    // Standard
    className: {
      control: 'text',
      table: { category: 'Advanced', type: { summary: 'string' } },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================
// PLAYGROUND
// ============================================

/**
 * ## Playground
 *
 * Interactive playground to experiment with all Icon props.
 */
export const Playground: Story = {
  args: {
    name: 'user',
    size: 'md',
    color: 'currentColor',
  },
  render: (args: any) => {
    return (
      <StoryContainer>
        <div
          style={{
            padding: '64px',
            background: STORY_COLORS.neutral.backgroundLight,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon {...args} />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: NAME
// ============================================

/**
 * ## Prop: `name`
 *
 * Icon name from Lucide React library.
 */
export const PropName: Story = {
  render: () => {
    const [hoveredIcon, setHoveredIcon] = React.useState<IconName>('user');

    const iconCategories = [
      {
        category: 'User & Navigation',
        icons: ['user', 'home', 'settings', 'menu', 'search'] as IconName[],
      },
      {
        category: 'Actions',
        icons: ['check', 'x', 'plus', 'minus', 'edit', 'trash', 'save', 'download', 'upload'] as IconName[],
      },
      {
        category: 'Chevrons',
        icons: ['chevron-down', 'chevron-up', 'chevron-left', 'chevron-right'] as IconName[],
      },
      {
        category: 'Arrows',
        icons: ['arrow-left', 'arrow-right'] as IconName[],
      },
      {
        category: 'Status',
        icons: ['alert-circle', 'info', 'check-circle', 'x-circle'] as IconName[],
      },
      {
        category: 'Miscellaneous',
        icons: ['external-link', 'eye', 'eye-off', 'heart', 'star'] as IconName[],
      },
    ];

    const generateCode = (iconName: IconName): string => {
      return `<Icon name="${iconName}" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Icon categories */}
          {iconCategories.map(({ category, icons }) => (
            <div key={category}>
              <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 600, color: NEUTRAL.textDark }}>
                {category}
              </h3>
              <div
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px' }}
              >
                {icons.map((iconName) => (
                  <div key={iconName} onMouseEnter={() => setHoveredIcon(iconName)}>
                    <PropCard label={iconName} highlight={hoveredIcon === iconName}>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '16px',
                        }}
                      >
                        <Icon name={iconName} size="lg" />
                        <div style={{ fontSize: '11px', color: NEUTRAL.textSlate, textAlign: 'center' }}>
                          {iconName}
                        </div>
                      </div>
                    </PropCard>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredIcon)}
            language="jsx"
            title="JSX"
            subtitle={`name="${hoveredIcon as string}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: SIZE
// ============================================

/**
 * ## Prop: `size`
 *
 * Controls the icon size.
 */
export const PropSize: Story = {
  render: () => {
    const [hoveredSize, setHoveredSize] = React.useState<string>('md');

    const sizeValues = [
      { value: 'xs' as const, label: 'Extra Small', dimension: '16x16px' },
      { value: 'sm' as const, label: 'Small', dimension: '20x20px' },
      { value: 'md' as const, label: 'Medium', dimension: '24x24px' },
      { value: 'lg' as const, label: 'Large', dimension: '32x32px' },
      { value: 'xl' as const, label: 'Extra Large', dimension: '40x40px' },
    ];

    const generateCode = (size: string): string => {
      return `<Icon name="star" size="${size}" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {sizeValues.map(({ value, label, dimension }) => (
              <div key={value} onMouseEnter={() => setHoveredSize(value)}>
                <PropCard label={`size="${value}"`} highlight={hoveredSize === value}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '24px',
                    }}
                  >
                    <Icon name="star" size={value} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: NEUTRAL.textDark }}>{label}</div>
                      <div style={{ fontSize: '12px', color: NEUTRAL.textSlate }}>{dimension}</div>
                    </div>
                  </div>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock code={generateCode(hoveredSize)} language="jsx" title="JSX" subtitle={`size="${hoveredSize}"`} />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: COLOR
// ============================================

/**
 * ## Prop: `color`
 *
 * Controls the icon color using semantic tokens.
 */
export const PropColor: Story = {
  render: () => {
    const [hoveredColor, setHoveredColor] = React.useState<string>('currentColor');

    const colorValues = [
      { value: 'currentColor' as const, label: 'Current Color', description: 'Inherits from parent' },
      { value: 'primary' as const, label: 'Primary', description: 'Default text color' },
      { value: 'secondary' as const, label: 'Secondary', description: 'Secondary text' },
      { value: 'success' as const, label: 'Success', description: 'Success state (green)' },
      { value: 'error' as const, label: 'Error', description: 'Error state (red)' },
      { value: 'warning' as const, label: 'Warning', description: 'Warning state (amber)' },
      { value: 'info' as const, label: 'Info', description: 'Info state (blue)' },
      { value: 'muted' as const, label: 'Muted', description: 'Muted/tertiary color' },
    ];

    const generateCode = (color: string): string => {
      return `<Icon name="heart" color="${color}" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {colorValues.map(({ value, label, description }) => (
              <div key={value} onMouseEnter={() => setHoveredColor(value)}>
                <PropCard label={`color="${value}"`} highlight={hoveredColor === value}>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '24px',
                    }}
                  >
                    <Icon name="heart" size="lg" color={value} />
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: NEUTRAL.textDark }}>{label}</div>
                      <div style={{ fontSize: '12px', color: NEUTRAL.textSlate }}>{description}</div>
                    </div>
                  </div>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredColor)}
            language="jsx"
            title="JSX"
            subtitle={`color="${hoveredColor}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: TITLE (Accessibility)
// ============================================

/**
 * ## Prop: `title`
 *
 * Provides an accessible title for screen readers.
 */
export const PropTitle: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Example 1: Decorative icon (no title) */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Decorative Icon (No Title)</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
              }}
            >
              <div style={{ marginBottom: '12px', fontSize: '14px', color: NEUTRAL.textSlate }}>
                Icon without title is decorative (aria-hidden=&quot;true&quot;)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="chevron-right" size="sm" />
                <span style={{ fontSize: '16px' }}>Next Page</span>
              </div>
              <CodeBlock
                code={`<Icon name="chevron-right" size="sm" />
<span>Next Page</span>`}
                language="jsx"
                title="JSX"
              />
            </div>
          </section>

          {/* Example 2: Accessible icon (with title) */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Accessible Icon (With Title)</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
              }}
            >
              <div style={{ marginBottom: '12px', fontSize: '14px', color: NEUTRAL.textSlate }}>
                Icon with title is accessible (role=&quot;img&quot; + aria-label)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Icon name="check-circle" size="lg" color="success" title="Success" />
                <span style={{ fontSize: '16px' }}>Operation completed</span>
              </div>
              <CodeBlock
                code={`<Icon 
  name="check-circle" 
  size="lg" 
  color="success" 
  title="Success" 
/>`}
                language="jsx"
                title="JSX"
              />
            </div>
          </section>

          {/* Example 3: Icon-only button */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Icon-Only Button</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
              }}
            >
              <div style={{ marginBottom: '12px', fontSize: '14px', color: NEUTRAL.textSlate }}>
                Icon-only interactive elements MUST have a title
              </div>
              <button
                style={{
                  padding: '8px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '4px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                }}
              >
                <Icon name="trash" size="md" color="error" title="Delete item" />
              </button>
              <CodeBlock
                code={`<button>
  <Icon name="trash" size="md" color="error" title="Delete item" />
</button>`}
                language="jsx"
                title="JSX"
              />
            </div>
          </section>
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// PROP: AS (Polymorphic)
// ============================================

/**
 * ## Prop: `as`
 *
 * Renders Icon container as different HTML elements.
 */
export const PropAs: Story = {
  render: () => {
    const [selectedElement, setSelectedElement] = React.useState<string>('span');

    const generateCode = (element: string): string => {
      return `<Icon as="${element}" name="star" />`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '16px' }}>
            {(['span', 'div', 'i'] as const).map((element) => (
              <PropCard
                key={element}
                label={`<${element}>`}
                highlight={selectedElement === element}
                onInteraction={() => setSelectedElement(element)}
                interactionType="click"
              >
                <div
                  style={{
                    padding: '24px',
                    background: STORY_COLORS.neutral.backgroundLight,
                    borderRadius: '8px',
                    border: `2px solid ${STORY_COLORS.neutral.borderMedium}`,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <Icon as={element} name="star" size="lg" />
                  <div style={{ fontSize: '12px', fontWeight: 600, color: NEUTRAL.textSlate }}>{element}</div>
                </div>
              </PropCard>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(selectedElement)}
            language="jsx"
            title="JSX"
            subtitle={`as="${selectedElement}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// COMBINED VARIANTS
// ============================================

/**
 * ## Combined Variants
 *
 * Real-world examples combining multiple props.
 */
export const CombinedVariants: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Example 1: Navigation Icons */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Navigation with Icons</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
                display: 'flex',
                gap: '16px',
              }}
            >
              <button
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon name="arrow-left" size="sm" />
                <span>Back</span>
              </button>
              <button
                style={{
                  padding: '12px 16px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>Next</span>
                <Icon name="arrow-right" size="sm" />
              </button>
            </div>
          </section>

          {/* Example 2: Status Icons */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Status Messages with Icons</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div
                style={{
                  padding: '16px',
                  background: PRIMARY.green.light,
                  borderRadius: '8px',
                  border: `1px solid ${PRIMARY.green.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Icon name="check-circle" size="md" color="success" />
                <span style={{ fontSize: '16px', fontWeight: 500, color: PRIMARY.green.main }}>
                  Operation completed successfully!
                </span>
              </div>
              <div
                style={{
                  padding: '16px',
                  background: PRIMARY.pink.light,
                  borderRadius: '8px',
                  border: `1px solid ${PRIMARY.pink.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Icon name="x-circle" size="md" color="error" />
                <span style={{ fontSize: '16px', fontWeight: 500, color: PRIMARY.pink.main }}>
                  An error occurred. Please try again.
                </span>
              </div>
              <div
                style={{
                  padding: '16px',
                  background: PRIMARY.orange.light,
                  borderRadius: '8px',
                  border: `1px solid ${PRIMARY.orange.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Icon name="alert-circle" size="md" color="warning" />
                <span style={{ fontSize: '16px', fontWeight: 500, color: PRIMARY.orange.main }}>
                  This action cannot be undone.
                </span>
              </div>
              <div
                style={{
                  padding: '16px',
                  background: PRIMARY.blue.light,
                  borderRadius: '8px',
                  border: `1px solid ${PRIMARY.blue.main}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <Icon name="info" size="md" color="info" />
                <span style={{ fontSize: '16px', fontWeight: 500, color: PRIMARY.blue.main }}>
                  New updates are available.
                </span>
              </div>
            </div>
          </section>

          {/* Example 3: Action Buttons */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Action Buttons</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap',
              }}
            >
              <button
                style={{
                  padding: '10px 16px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon name="plus" size="sm" />
                <span>Add</span>
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon name="edit" size="sm" />
                <span>Edit</span>
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  border: `1px solid ${PRIMARY.red.main}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: PRIMARY.red.main,
                }}
              >
                <Icon name="trash" size="sm" color="error" />
                <span>Delete</span>
              </button>
              <button
                style={{
                  padding: '10px 16px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Icon name="download" size="sm" />
                <span>Download</span>
              </button>
            </div>
          </section>

          {/* Example 4: Icon-only Actions */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Icon-Only Actions</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
                display: 'flex',
                gap: '8px',
              }}
            >
              <button
                title="Settings"
                style={{
                  padding: '8px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                }}
              >
                <Icon name="settings" size="md" title="Settings" />
              </button>
              <button
                title="Search"
                style={{
                  padding: '8px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                }}
              >
                <Icon name="search" size="md" title="Search" />
              </button>
              <button
                title="Menu"
                style={{
                  padding: '8px',
                  border: `1px solid ${NEUTRAL.borderMedium}`,
                  borderRadius: '6px',
                  background: 'STORY_COLORS.themed.background.surface',
                  cursor: 'pointer',
                }}
              >
                <Icon name="menu" size="md" title="Menu" />
              </button>
            </div>
          </section>

          {/* Example 5: Size Variations */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Icon Size Variations</h3>
            <div
              style={{
                padding: '24px',
                background: STORY_COLORS.neutral.backgroundLight,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <Icon name="star" size="xs" color="warning" />
                <div style={{ marginTop: '4px', fontSize: '10px', color: NEUTRAL.textSlate }}>XS</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Icon name="star" size="sm" color="warning" />
                <div style={{ marginTop: '4px', fontSize: '11px', color: NEUTRAL.textSlate }}>SM</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Icon name="star" size="md" color="warning" />
                <div style={{ marginTop: '4px', fontSize: '12px', color: NEUTRAL.textSlate }}>MD</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Icon name="star" size="lg" color="warning" />
                <div style={{ marginTop: '4px', fontSize: '13px', color: NEUTRAL.textSlate }}>LG</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Icon name="star" size="xl" color="warning" />
                <div style={{ marginTop: '4px', fontSize: '14px', color: NEUTRAL.textSlate }}>XL</div>
              </div>
            </div>
          </section>
        </div>
      </StoryContainer>
    );
  },
};

// ============================================
// REAL-WORLD PATTERNS
// ============================================

/**
 * ## Real-World Patterns
 *
 * Common usage patterns in production applications.
 */
export const RealWorldPatterns: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {/* Pattern 1: User Profile Card */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>User Profile Card</h3>
            <div
              style={{
                maxWidth: '400px',
                padding: '24px',
                background: 'STORY_COLORS.themed.background.surface',
                borderRadius: '12px',
                boxShadow: STORY_COLORS.themed.shadow.md,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: NEUTRAL.backgroundMedium,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name="user" size="xl" color="secondary" />
                </div>
                <div>
                  <div style={{ fontSize: '18px', fontWeight: 600 }}>Jane Doe</div>
                  <div style={{ fontSize: '14px', color: NEUTRAL.textSlate }}>Product Designer</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px',
                    border: `1px solid ${NEUTRAL.borderMedium}`,
                    borderRadius: '6px',
                    background: 'STORY_COLORS.themed.background.surface',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Icon name="settings" size="sm" />
                  <span>Edit Profile</span>
                </button>
                <button
                  style={{
                    padding: '10px',
                    border: `1px solid ${NEUTRAL.borderMedium}`,
                    borderRadius: '6px',
                    background: 'STORY_COLORS.themed.background.surface',
                    cursor: 'pointer',
                  }}
                >
                  <Icon name="external-link" size="sm" title="View full profile" />
                </button>
              </div>
            </div>
          </section>

          {/* Pattern 2: File List */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>File List with Actions</h3>
            <div
              style={{
                maxWidth: '600px',
                background: 'STORY_COLORS.themed.background.surface',
                borderRadius: '12px',
                boxShadow: STORY_COLORS.themed.shadow.md,
                overflow: 'hidden',
              }}
            >
              {['Document.pdf', 'Presentation.pptx', 'Spreadsheet.xlsx'].map((file, idx) => (
                <div
                  key={file}
                  style={{
                    padding: '16px 24px',
                    borderBottom: idx < 2 ? `1px solid ${NEUTRAL.borderLight}` : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon name="save" size="md" color="secondary" />
                    <span style={{ fontSize: '15px' }}>{file}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <button
                      style={{
                        padding: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="download" size="sm" color="secondary" title="Download" />
                    </button>
                    <button
                      style={{
                        padding: '6px',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon name="trash" size="sm" color="error" title="Delete" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Pattern 3: Form with Icons */}
          <section>
            <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: 600 }}>Form with Icon Indicators</h3>
            <div
              style={{
                maxWidth: '500px',
                padding: '24px',
                background: 'STORY_COLORS.themed.background.surface',
                borderRadius: '12px',
                boxShadow: STORY_COLORS.themed.shadow.md,
              }}
            >
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                  Email Address
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 12px',
                      border: `1px solid ${PRIMARY.green.main}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <Icon name="check-circle" size="sm" color="success" />
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600 }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    placeholder="••••••••"
                    style={{
                      width: '100%',
                      padding: '10px 40px 10px 12px',
                      border: `1px solid ${PRIMARY.red.main}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                  <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }}>
                    <Icon name="x-circle" size="sm" color="error" />
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
                  <Icon name="alert-circle" size="xs" color="error" />
                  <span style={{ fontSize: '12px', color: PRIMARY.red.main }}>
                    Password must be at least 8 characters
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </StoryContainer>
    );
  },
};
