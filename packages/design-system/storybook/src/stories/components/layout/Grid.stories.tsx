import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Grid, GRID_COLUMNS, GRID_GUTTER, Placeholder, Stack, tokens } from '@grasdouble/lufa_design-system';

const { color } = tokens;

const meta = {
  title: '2. Layout/Grid',
  component: Grid,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A token-driven CSS grid layout with semantic column and gutter presets.',
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: Object.values(GRID_COLUMNS),
      table: { defaultValue: { summary: GRID_COLUMNS.twelve } },
    },
    gutter: {
      control: 'select',
      options: Object.values(GRID_GUTTER),
      table: { defaultValue: { summary: GRID_GUTTER.md } },
    },
    children: { control: false },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoCell = ({ label }: { label: string }) => (
  <Placeholder color={color.interactive.default} height="small" width="full">
    {label}
  </Placeholder>
);

export const Playground: Story = {
  args: {
    columns: GRID_COLUMNS.quad,
    gutter: GRID_GUTTER.md,
    children: Array.from({ length: 12 }).map((_, index) => <DemoCell key={index} label={`${index + 1}`} />),
  },
  render: (args) => (
    <Container size="xl" paddingX="none">
      <Grid {...args} />
    </Container>
  ),
};

export const Columns: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious">
      {Object.values(GRID_COLUMNS).map((columns) => (
        <div key={columns}>
          <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>
            columns: {columns}
          </div>
          <Container
            size="xl"
            paddingX="none"
            style={{
              backgroundColor: color.background.primary,
              border: `1px solid ${color.border.light}`,
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <Grid columns={columns} gutter={GRID_GUTTER.sm}>
              {Array.from({ length: 16 }).map((_, index) => (
                <DemoCell key={index} label={`${index + 1}`} />
              ))}
            </Grid>
          </Container>
        </div>
      ))}
    </Stack>
  ),
};

export const Gutters: Story = {
  render: () => (
    <Stack direction="vertical" gap="spacious">
      {Object.values(GRID_GUTTER).map((gutter) => (
        <div key={gutter}>
          <div style={{ fontFamily: 'monospace', color: color.text.secondary, marginBottom: '12px' }}>
            gutter: {gutter}
          </div>
          <Container
            size="xl"
            paddingX="none"
            style={{
              backgroundColor: color.background.primary,
              border: `1px solid ${color.border.light}`,
              borderRadius: '12px',
              padding: '16px',
            }}
          >
            <Grid columns={GRID_COLUMNS.quad} gutter={gutter}>
              {Array.from({ length: 8 }).map((_, index) => (
                <DemoCell key={index} label={`${index + 1}`} />
              ))}
            </Grid>
          </Container>
        </div>
      ))}
    </Stack>
  ),
};

export const ColumnGutterMatrix: Story = {
  render: () => {
    const columnsValues = [GRID_COLUMNS.single, GRID_COLUMNS.double, GRID_COLUMNS.quad, GRID_COLUMNS.twelve] as const;
    const gutterValues = [GRID_GUTTER.none, GRID_GUTTER.sm, GRID_GUTTER.md, GRID_GUTTER.lg] as const;

    return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div
          style={{
            minWidth: '900px',
            display: 'grid',
            gridTemplateColumns: `140px repeat(${columnsValues.length}, minmax(0, 1fr))`,
            gap: '12px',
            alignItems: 'stretch',
          }}
        >
          <div />
          {columnsValues.map((columns) => (
            <div
              key={`header-${columns}`}
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: color.text.secondary,
                textAlign: 'center',
                padding: '6px 8px',
                backgroundColor: color.background.primary,
                border: `1px solid ${color.border.light}`,
                borderRadius: '10px',
              }}
            >
              columns: {columns}
            </div>
          ))}

          {gutterValues.map((gutter) => (
            <Fragment key={`row-${gutter}`}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: color.text.secondary,
                  padding: '6px 8px',
                  backgroundColor: color.background.primary,
                  border: `1px solid ${color.border.light}`,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                gutter: {gutter}
              </div>

              {columnsValues.map((columns) => (
                <div
                  key={`${gutter}-${columns}`}
                  style={{
                    backgroundColor: color.background.primary,
                    border: `1px solid ${color.border.light}`,
                    borderRadius: '12px',
                    padding: '16px',
                  }}
                >
                  <Grid columns={columns} gutter={gutter}>
                    {Array.from({ length: columns === GRID_COLUMNS.twelve ? 12 : 8 }).map((_, index) => (
                      <DemoCell key={index} label={`${index + 1}`} />
                    ))}
                  </Grid>
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    );
  },
};
