import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Button,
  Card,
  Center,
  Container,
  Placeholder,
  Spinner,
  Stack,
  Typography,
} from '@grasdouble/lufa_design-system';
import tokens from '@grasdouble/lufa_design-system-tokens';

const meta = {
  title: '2. Layout/Center',
  component: Center,
  tags: [],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Centers content horizontally/vertically using flex.',
      },
    },
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['div', 'span', 'section', 'main', 'article'],
      table: { defaultValue: { summary: 'div' } },
    },
    axis: {
      control: 'inline-radio',
      options: ['both', 'horizontal', 'vertical'],
      table: { defaultValue: { summary: 'both' } },
    },
    inline: { control: 'boolean', table: { defaultValue: { summary: false } } },
    minHeight: { control: 'number', description: 'CSS length or number (px)' },
    children: { control: false },
  },
} satisfies Meta<typeof Center>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    axis: 'both',
    inline: false,
    minHeight: 180,
  },
  render: (args) => (
    <Container size="md" paddingX="none">
      <Center
        {...args}
        style={{
          ...args.style,
          backgroundColor: tokens.color.background.secondary,
          borderRadius: '12px',
          border: `1px solid ${tokens.color.border.light}`,
          padding: '16px',
        }}
      >
        <Placeholder height="medium" width="auto">
          ...
        </Placeholder>
      </Center>
    </Container>
  ),
};

export const Axis: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: '16px' }}>
        {(['both', 'horizontal', 'vertical'] as const).map((axis) => (
          <div
            key={axis}
            style={{ backgroundColor: tokens.color.background.secondary, borderRadius: '12px', padding: '16px' }}
          >
            <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>
              axis: {axis}
            </div>
            <div style={{ color: tokens.color.text.tertiary, fontSize: '12px', marginBottom: '12px' }}>
              {axis === 'horizontal' && 'Center on X only'}
              {axis === 'vertical' && 'Center on Y only'}
              {axis === 'both' && 'Center on X and Y'}
            </div>
            <Center
              axis={axis}
              minHeight={200}
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: '12px',
                border: `1px solid ${tokens.color.border.light}`,
                padding: '16px',
                position: 'relative',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: '16px',
                  border: `2px dashed ${tokens.color.border.default}`,
                  borderRadius: '10px',
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '16px',
                  right: '16px',
                  height: '1px',
                  backgroundColor: tokens.color.border.light,
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '16px',
                  bottom: '16px',
                  width: '1px',
                  backgroundColor: tokens.color.border.light,
                  pointerEvents: 'none',
                }}
              />
              <Placeholder color={tokens.color.interactive.default} height="small" width="small">
                Target
              </Placeholder>
            </Center>
          </div>
        ))}
      </div>
    </Container>
  ),
};

export const Inline: Story = {
  render: () => (
    <Stack direction="vertical" gap="normal">
      <div>
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>inline: true</div>
        <div style={{ backgroundColor: tokens.color.background.secondary, padding: '16px', borderRadius: '12px' }}>
          <span style={{ color: tokens.color.text.secondary }}>Text before</span>
          <Center
            inline
            axis="both"
            style={{
              backgroundColor: tokens.color.background.primary,
              borderRadius: '12px',
              padding: '8px 12px',
              border: `1px solid ${tokens.color.border.light}`,
              margin: '0 12px',
            }}
          >
            <Placeholder color={tokens.color.interactive.default} height="small" width="auto">
              Badge
            </Placeholder>
          </Center>
          <span style={{ color: tokens.color.text.secondary }}>Text after (same line)</span>
        </div>
      </div>

      <div>
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '8px' }}>inline: false</div>
        <div style={{ backgroundColor: tokens.color.background.secondary, padding: '16px', borderRadius: '12px' }}>
          <span style={{ color: tokens.color.text.secondary }}>Text before</span>
          <Center
            inline={false}
            axis="both"
            style={{
              backgroundColor: tokens.color.background.primary,
              borderRadius: '12px',
              padding: '16px',
              border: `1px solid ${tokens.color.border.light}`,
              margin: '12px 0',
            }}
          >
            <Placeholder color={tokens.color.interactive.default} height="small" width="auto">
              Block
            </Placeholder>
          </Center>
          <span style={{ color: tokens.color.text.secondary }}>Text after (next line)</span>
        </div>
      </div>
    </Stack>
  ),
};

export const Examples: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <Stack direction="vertical" gap="spacious">
        <div>
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>Empty state</div>
          <Card variant="outlined" padding="large" title="Search results" subtitle="Try adjusting your filters">
            <Center
              axis="both"
              minHeight={220}
              style={{ backgroundColor: tokens.color.background.secondary, borderRadius: '12px' }}
            >
              <Stack direction="vertical" gap="normal" align="center">
                <Placeholder color={tokens.color.background.primary} height="small" width="auto">
                  Icon
                </Placeholder>
                <Typography variant="body" color="secondary">
                  Aucun résultat
                </Typography>
                <Button variant="solid">Réessayer</Button>
              </Stack>
            </Center>
          </Card>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>Loading</div>
          <div style={{ backgroundColor: tokens.color.background.secondary, borderRadius: '12px', padding: '16px' }}>
            <Center
              axis="both"
              minHeight={260}
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: '12px',
                border: `1px solid ${tokens.color.border.light}`,
              }}
            >
              <Stack direction="vertical" gap="normal" align="center">
                <Spinner size="md" />
                <Typography variant="bodySmall" color="secondary">
                  Chargement…
                </Typography>
              </Stack>
            </Center>
          </div>
        </div>

        <div>
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: '12px' }}>Footer CTA</div>
          <Card
            variant="outlined"
            title="Newsletter"
            subtitle="Recevez les nouveautés"
            footer={
              <Center axis="horizontal">
                <Button variant="solid">S’inscrire</Button>
              </Center>
            }
          >
            <Typography variant="body" color="secondary">
              Un exemple concret: un CTA centré dans le footer.
            </Typography>
          </Card>
        </div>
      </Stack>
    </Container>
  ),
};
