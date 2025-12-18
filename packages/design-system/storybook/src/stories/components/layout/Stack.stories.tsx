import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Placeholder,
  Stack,
  STACK_ALIGN,
  STACK_DIRECTION,
  STACK_GAP,
  STACK_JUSTIFY,
  STACK_PADDING,
  STACK_WRAP,
  tokens,
} from '@grasdouble/lufa_design-system';

const { color } = tokens;

const meta = {
  title: '2. Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible layout component for stacking elements vertically or horizontally with consistent spacing. Based on CSS Flexbox.',
      },
    },
  },
  tags: [],
  argTypes: {
    gap: {
      control: 'select',
      options: Object.values(STACK_GAP),
      description: 'Spacing between items',
      table: {
        type: { summary: Object.values(STACK_GAP).join(' | ') },
        defaultValue: { summary: STACK_GAP.normal },
      },
    },
    direction: {
      control: 'select',
      options: Object.values(STACK_DIRECTION),
      description: 'Stack direction (row or column)',
      table: {
        type: { summary: Object.values(STACK_DIRECTION).join(' | ') },
        defaultValue: { summary: STACK_DIRECTION.vertical },
      },
    },
    align: {
      control: 'select',
      options: Object.values(STACK_ALIGN),
      description: 'Cross-axis alignment',
      table: {
        type: { summary: Object.values(STACK_ALIGN).join(' | ') },
        defaultValue: { summary: STACK_ALIGN.stretch },
      },
    },
    justify: {
      control: 'select',
      options: Object.values(STACK_JUSTIFY),
      description: 'Main-axis alignment',
      table: {
        type: { summary: Object.values(STACK_JUSTIFY).join(' | ') },
        defaultValue: { summary: STACK_JUSTIFY.start },
      },
    },
    wrap: {
      control: 'select',
      options: Object.values(STACK_WRAP),
      description: 'Whether items should wrap',
      table: {
        type: { summary: Object.values(STACK_WRAP).join(' | ') },
        defaultValue: { summary: STACK_WRAP.nowrap },
      },
    },
    padding: {
      control: 'select',
      options: Object.values(STACK_PADDING),
      description: 'Internal padding',
      table: {
        type: { summary: Object.values(STACK_PADDING).join(' | ') },
        defaultValue: { summary: STACK_PADDING.none },
      },
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    gap: STACK_GAP.normal,
    direction: STACK_DIRECTION.vertical,
    align: STACK_ALIGN.stretch,
    justify: STACK_JUSTIFY.start,
    wrap: STACK_WRAP.nowrap,
    padding: STACK_PADDING.none,
    children: (
      <>
        <Placeholder color={color.interactive.default}>Item 1</Placeholder>
        <Placeholder color={color.interactive.default}>Item 2</Placeholder>
        <Placeholder color={color.interactive.default}>Item 3</Placeholder>
      </>
    ),
  },
};

export const VerticalStack: Story = {
  render: () => (
    <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
      <Placeholder color={color.interactive.default}>First Item</Placeholder>
      <Placeholder color={color.interactive.default}>Second Item</Placeholder>
      <Placeholder color={color.interactive.default}>Third Item</Placeholder>
    </Stack>
  ),
};

export const HorizontalStack: Story = {
  render: () => (
    <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
      <Placeholder color={color.interactive.default}>Item 1</Placeholder>
      <Placeholder color={color.interactive.default}>Item 2</Placeholder>
      <Placeholder color={color.interactive.default}>Item 3</Placeholder>
    </Stack>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gap: None</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none}>
          <Placeholder color={color.interactive.default}>A</Placeholder>
          <Placeholder color={color.interactive.default}>B</Placeholder>
          <Placeholder color={color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gap: Condensed</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.condensed}>
          <Placeholder color={color.interactive.default}>A</Placeholder>
          <Placeholder color={color.interactive.default}>B</Placeholder>
          <Placeholder color={color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gap: Normal</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Placeholder color={color.interactive.default}>A</Placeholder>
          <Placeholder color={color.interactive.default}>B</Placeholder>
          <Placeholder color={color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Gap: Spacious</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.spacious}>
          <Placeholder color={color.interactive.default}>A</Placeholder>
          <Placeholder color={color.interactive.default}>B</Placeholder>
          <Placeholder color={color.interactive.default}>C</Placeholder>
        </Stack>
      </div>
    </div>
  ),
};

export const Alignment: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
          Horizontal Stack (cross-axis alignment)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Start (items aligned to top)</h3>
            <div
              style={{
                height: '200px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                <Placeholder color={color.interactive.default} height="small">
                  Small
                </Placeholder>
                <Placeholder color={color.interactive.default} height="medium">
                  Medium
                </Placeholder>
                <Placeholder color={color.interactive.default} height="large">
                  Large
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Center (items centered vertically)</h3>
            <div
              style={{
                height: '200px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                <Placeholder color={color.success.default} height="small">
                  Small
                </Placeholder>
                <Placeholder color={color.success.default} height="medium">
                  Medium
                </Placeholder>
                <Placeholder color={color.success.default} height="large">
                  Large
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: End (items aligned to bottom)</h3>
            <div
              style={{
                height: '200px',
                backgroundColor: '#F3F4F6',
                padding: '16px',
                border: `2px dashed #E5E7EB`,
              }}
            >
              <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                <Placeholder color={color.error.default} height="small">
                  Small
                </Placeholder>
                <Placeholder color={color.error.default} height="medium">
                  Medium
                </Placeholder>
                <Placeholder color={color.error.default} height="large">
                  Large
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Stretch (items stretched to full height)</h3>
            <div
              style={{
                height: '200px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                <Placeholder color={color.brand.secondary} height="full">
                  Stretched 1
                </Placeholder>
                <Placeholder color={color.brand.secondary} height="full">
                  Stretched 2
                </Placeholder>
                <Placeholder color={color.brand.secondary} height="full">
                  Stretched 3
                </Placeholder>
              </Stack>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 style={{ marginBottom: '24px', fontSize: '20px', fontWeight: 'bold' }}>
          Vertical Stack (cross-axis alignment)
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Start (items aligned to left)</h3>
            <div
              style={{
                width: '600px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.start}>
                <Placeholder color={color.interactive.default} width="small">
                  Short
                </Placeholder>
                <Placeholder color={color.interactive.default} width="medium">
                  Medium Width
                </Placeholder>
                <Placeholder color={color.interactive.default} width="large">
                  Very Long Width
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Center (items centered horizontally)</h3>
            <div
              style={{
                width: '600px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.center}>
                <Placeholder color={color.success.default} width="small">
                  Short
                </Placeholder>
                <Placeholder color={color.success.default} width="medium">
                  Medium Width
                </Placeholder>
                <Placeholder color={color.success.default} width="large">
                  Very Long Width
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: End (items aligned to right)</h3>
            <div
              style={{
                width: '600px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.end}>
                <Placeholder color={color.error.default} width="small">
                  Short
                </Placeholder>
                <Placeholder color={color.error.default} width="medium">
                  Medium Width
                </Placeholder>
                <Placeholder color={color.error.default} width="large">
                  Very Long Width
                </Placeholder>
              </Stack>
            </div>
          </div>
          <div>
            <h3 style={{ marginBottom: '16px' }}>Align: Stretch (items stretched to full width)</h3>
            <div
              style={{
                width: '600px',
                backgroundColor: color.background.secondary,
                padding: '16px',
                border: `2px dashed ${color.border.default}`,
              }}
            >
              <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
                <Placeholder color={color.brand.secondary} width="full">
                  Stretched Item 1
                </Placeholder>
                <Placeholder color={color.brand.secondary} width="full">
                  Stretched Item 2
                </Placeholder>
                <Placeholder color={color.brand.secondary} width="full">
                  Stretched Item 3
                </Placeholder>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Justification: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Justify: Start</h3>
        <div style={{ width: '600px', backgroundColor: color.background.secondary, padding: '16px' }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.start}>
            <Placeholder color={color.interactive.default}>A</Placeholder>
            <Placeholder color={color.interactive.default}>B</Placeholder>
            <Placeholder color={color.interactive.default}>C</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Justify: Center</h3>
        <div style={{ width: '600px', backgroundColor: color.background.secondary, padding: '16px' }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.center}>
            <Placeholder color={color.interactive.default}>A</Placeholder>
            <Placeholder color={color.interactive.default}>B</Placeholder>
            <Placeholder color={color.interactive.default}>C</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Justify: End</h3>
        <div style={{ width: '600px', backgroundColor: color.background.secondary, padding: '16px' }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
            <Placeholder color={color.interactive.default}>A</Placeholder>
            <Placeholder color={color.interactive.default}>B</Placeholder>
            <Placeholder color={color.interactive.default}>C</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Justify: Space Between</h3>
        <div style={{ width: '600px', backgroundColor: color.background.secondary, padding: '16px' }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-between']}>
            <Placeholder color={color.interactive.default}>A</Placeholder>
            <Placeholder color={color.interactive.default}>B</Placeholder>
            <Placeholder color={color.interactive.default}>C</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Justify: Space Evenly</h3>
        <div style={{ width: '600px', backgroundColor: color.background.secondary, padding: '16px' }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.none} justify={STACK_JUSTIFY['space-evenly']}>
            <Placeholder color={color.interactive.default}>A</Placeholder>
            <Placeholder color={color.interactive.default}>B</Placeholder>
            <Placeholder color={color.interactive.default}>C</Placeholder>
          </Stack>
        </div>
      </div>
    </div>
  ),
};

export const WithWrap: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>No Wrap (items overflow the container)</h3>
        <div
          style={{
            width: '500px',
            backgroundColor: color.background.secondary,
            padding: '16px',
            border: `2px dashed ${color.error.border}`,
            overflow: 'auto',
          }}
        >
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.nowrap}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Placeholder key={n} color={color.error.default} width="small">
                Item {n}
              </Placeholder>
            ))}
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>With Wrap (items wrap to next line)</h3>
        <div
          style={{
            width: '500px',
            backgroundColor: color.background.secondary,
            padding: '16px',
            border: `2px dashed ${color.success.border}`,
          }}
        >
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <Placeholder key={n} color={color.success.default} width="small">
                Item {n}
              </Placeholder>
            ))}
          </Stack>
        </div>
      </div>
    </div>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>No Padding</h3>
        <div style={{ backgroundColor: color.background.secondary }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.none}>
            <Placeholder color={color.interactive.default}>Item 1</Placeholder>
            <Placeholder color={color.interactive.default}>Item 2</Placeholder>
            <Placeholder color={color.interactive.default}>Item 3</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Condensed Padding</h3>
        <div style={{ backgroundColor: color.background.secondary }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.condensed}>
            <Placeholder color={color.interactive.default}>Item 1</Placeholder>
            <Placeholder color={color.interactive.default}>Item 2</Placeholder>
            <Placeholder color={color.interactive.default}>Item 3</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Normal Padding</h3>
        <div style={{ backgroundColor: color.background.secondary }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.normal}>
            <Placeholder color={color.interactive.default}>Item 1</Placeholder>
            <Placeholder color={color.interactive.default}>Item 2</Placeholder>
            <Placeholder color={color.interactive.default}>Item 3</Placeholder>
          </Stack>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Spacious Padding</h3>
        <div style={{ backgroundColor: color.background.secondary }}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} padding={STACK_PADDING.spacious}>
            <Placeholder color={color.interactive.default}>Item 1</Placeholder>
            <Placeholder color={color.interactive.default}>Item 2</Placeholder>
            <Placeholder color={color.interactive.default}>Item 3</Placeholder>
          </Stack>
        </div>
      </div>
    </div>
  ),
};

export const StackItem: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Without grow</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Stack.Item>
            <Placeholder color={color.error.default}>Fixed</Placeholder>
          </Stack.Item>
          <Stack.Item>
            <Placeholder color={color.interactive.default}>Fixed</Placeholder>
          </Stack.Item>
          <Stack.Item>
            <Placeholder color={color.success.default}>Fixed</Placeholder>
          </Stack.Item>
        </Stack>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>With grow on middle item</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Stack.Item>
            <Placeholder color={color.error.default}>Fixed</Placeholder>
          </Stack.Item>
          <Stack.Item grow>
            <Placeholder color={color.interactive.default}>Growing</Placeholder>
          </Stack.Item>
          <Stack.Item>
            <Placeholder color={color.success.default}>Fixed</Placeholder>
          </Stack.Item>
        </Stack>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Multiple growing items</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
          <Stack.Item>
            <Placeholder color={color.error.default}>Fixed</Placeholder>
          </Stack.Item>
          <Stack.Item grow>
            <Placeholder color={color.interactive.default}>Growing</Placeholder>
          </Stack.Item>
          <Stack.Item grow>
            <Placeholder color={color.success.default}>Growing</Placeholder>
          </Stack.Item>
        </Stack>
      </div>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', maxWidth: '800px' }}>
      <div>
        <h3 style={{ marginBottom: '16px' }}>Form Layout</h3>
        <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
            <Stack.Item grow>
              <Placeholder color={color.info.default}>First Name</Placeholder>
            </Stack.Item>
            <Stack.Item grow>
              <Placeholder color={color.info.default}>Last Name</Placeholder>
            </Stack.Item>
          </Stack>
          <Placeholder color={color.info.default}>Email</Placeholder>
          <Placeholder color={color.info.default}>Message</Placeholder>
          <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} justify={STACK_JUSTIFY.end}>
            <Placeholder color={color.text.disabled}>Cancel</Placeholder>
            <Placeholder color={color.interactive.default}>Submit</Placeholder>
          </Stack>
        </Stack>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Navigation Bar</h3>
        <div style={{ backgroundColor: color.background.inverse, borderRadius: '8px' }}>
          <Stack
            direction={STACK_DIRECTION.horizontal}
            gap={STACK_GAP.spacious}
            align={STACK_ALIGN.center}
            justify={STACK_JUSTIFY['space-between']}
            padding={STACK_PADDING.normal}
          >
            <Placeholder color={color.interactive.focus}>Logo</Placeholder>
            <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal}>
              <Placeholder color={color.text.tertiary}>Home</Placeholder>
              <Placeholder color={color.text.tertiary}>About</Placeholder>
              <Placeholder color={color.text.tertiary}>Contact</Placeholder>
            </Stack>
            <Placeholder color={color.success.hover}>Sign In</Placeholder>
          </Stack>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Card Grid</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} wrap={STACK_WRAP.wrap}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} style={{ flex: '1 1 200px' }}>
              <Placeholder color={color.brand.secondary}>Card {n}</Placeholder>
            </div>
          ))}
        </Stack>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px' }}>Dashboard Layout</h3>
        <Stack direction={STACK_DIRECTION.horizontal} gap={STACK_GAP.normal} align={STACK_ALIGN.stretch}>
          <Stack.Item>
            <div style={{ height: '200px' }}>
              <Placeholder color={color.text.secondary} height="full">
                Sidebar
              </Placeholder>
            </div>
          </Stack.Item>
          <Stack.Item grow>
            <Stack direction={STACK_DIRECTION.vertical} gap={STACK_GAP.normal}>
              <Placeholder color={color.interactive.default}>Header</Placeholder>
              <div style={{ height: '140px' }}>
                <Placeholder color={color.info.default} height="full">
                  Main Content
                </Placeholder>
              </div>
            </Stack>
          </Stack.Item>
        </Stack>
      </div>
    </div>
  ),
};
