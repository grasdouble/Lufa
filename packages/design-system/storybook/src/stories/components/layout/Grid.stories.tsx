import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Grid, GRID_COLUMNS, GRID_GUTTER, Placeholder, Stack } from '@grasdouble/lufa_design-system';

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
  <Placeholder color={'var(--lufa-token-color-interactive-default)'} height="small" width="full">
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
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-md)',
            }}
          >
            columns: {columns}
          </div>
          <Container
            size="xl"
            paddingX="none"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-primary)',
              border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
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
          <div
            style={{
              fontFamily: 'monospace',
              color: 'var(--lufa-token-color-text-secondary)',
              marginBottom: 'var(--lufa-token-spacing-md)',
            }}
          >
            gutter: {gutter}
          </div>
          <Container
            size="xl"
            paddingX="none"
            style={{
              backgroundColor: 'var(--lufa-token-color-background-primary)',
              border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
              borderRadius: 'var(--lufa-token-radius-lg)',
              padding: 'var(--lufa-token-spacing-base)',
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
      <div style={{ width: 'var(--lufa-token-max-width-full)', overflowX: 'auto' }}>
        <div
          style={{
            minWidth: 'var(--lufa-token-max-width-4xl)',
            display: 'grid',
            gridTemplateColumns: `${'var(--lufa-token-spacing-5xl)'} repeat(${columnsValues.length}, minmax(0, 1fr))`,
            gap: 'var(--lufa-token-spacing-md)',
            alignItems: 'stretch',
          }}
        >
          <div />
          {columnsValues.map((columns) => (
            <div
              key={`header-${columns}`}
              style={{
                fontFamily: 'monospace',
                fontSize: 'var(--lufa-token-font-size-xs)',
                color: 'var(--lufa-token-color-text-secondary)',
                textAlign: 'center',
                padding: `${'var(--lufa-token-spacing-2xs)'} ${'var(--lufa-token-spacing-sm)'}`,
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                borderRadius: 'var(--lufa-token-radius-lg)',
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
                  fontSize: 'var(--lufa-token-font-size-xs)',
                  color: 'var(--lufa-token-color-text-secondary)',
                  padding: `${'var(--lufa-token-spacing-2xs)'} ${'var(--lufa-token-spacing-sm)'}`,
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                  borderRadius: 'var(--lufa-token-radius-lg)',
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
                    backgroundColor: 'var(--lufa-token-color-background-primary)',
                    border: `${'var(--lufa-token-border-width-hairline)'} ${'var(--lufa-token-border-style-solid)'} ${'var(--lufa-token-color-border-light)'}`,
                    borderRadius: 'var(--lufa-token-radius-lg)',
                    padding: 'var(--lufa-token-spacing-base)',
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
