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
          borderRadius: tokens.radius.lg,
          border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
          padding: tokens.spacing.base,
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: tokens.spacing.base }}>
        {(['both', 'horizontal', 'vertical'] as const).map((axis) => (
          <div
            key={axis}
            style={{
              backgroundColor: tokens.color.background.secondary,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.base,
            }}
          >
            <div
              style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.sm }}
            >
              axis: {axis}
            </div>
            <div
              style={{
                color: tokens.color.text.tertiary,
                fontSize: tokens.fontSize.xs,
                marginBottom: tokens.spacing.md,
              }}
            >
              {axis === 'horizontal' && 'Center on X only'}
              {axis === 'vertical' && 'Center on Y only'}
              {axis === 'both' && 'Center on X and Y'}
            </div>
            <Center
              axis={axis}
              minHeight={tokens.size['4xl']}
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: tokens.radius.lg,
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
                padding: tokens.spacing.base,
                position: 'relative',
              }}
            >
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: tokens.spacing.base,
                  border: `${tokens.borderWidth.thin} ${tokens.borderStyle.dashed} ${tokens.color.border.default}`,
                  borderRadius: tokens.radius.lg,
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: tokens.spacing.base,
                  right: tokens.spacing.base,
                  height: tokens.borderWidth.hairline,
                  backgroundColor: tokens.color.border.light,
                  pointerEvents: 'none',
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: tokens.spacing.base,
                  bottom: tokens.spacing.base,
                  width: tokens.borderWidth.hairline,
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
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.sm }}>
          inline: true
        </div>
        <div
          style={{
            backgroundColor: tokens.color.background.secondary,
            padding: tokens.spacing.base,
            borderRadius: tokens.radius.lg,
          }}
        >
          <span style={{ color: tokens.color.text.secondary }}>Text before</span>
          <Center
            inline
            axis="both"
            style={{
              backgroundColor: tokens.color.background.primary,
              borderRadius: tokens.radius.lg,
              padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              margin: `0 ${tokens.spacing.md}`,
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
        <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.sm }}>
          inline: false
        </div>
        <div
          style={{
            backgroundColor: tokens.color.background.secondary,
            padding: tokens.spacing.base,
            borderRadius: tokens.radius.lg,
          }}
        >
          <span style={{ color: tokens.color.text.secondary }}>Text before</span>
          <Center
            inline={false}
            axis="both"
            style={{
              backgroundColor: tokens.color.background.primary,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.base,
              border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
              margin: `${tokens.spacing.md} 0`,
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
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
            Empty state
          </div>
          <Card variant="outlined" padding="large" title="Search results" subtitle="Try adjusting your filters">
            <Center
              axis="both"
              minHeight={tokens.size['4xl']}
              style={{ backgroundColor: tokens.color.background.secondary, borderRadius: tokens.radius.lg }}
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
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
            Loading
          </div>
          <div
            style={{
              backgroundColor: tokens.color.background.secondary,
              borderRadius: tokens.radius.lg,
              padding: tokens.spacing.base,
            }}
          >
            <Center
              axis="both"
              minHeight={tokens.maxWidth['3xs']}
              style={{
                backgroundColor: tokens.color.background.primary,
                borderRadius: tokens.radius.lg,
                border: `${tokens.borderWidth.hairline} ${tokens.borderStyle.solid} ${tokens.color.border.light}`,
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
          <div style={{ fontFamily: 'monospace', color: tokens.color.text.secondary, marginBottom: tokens.spacing.md }}>
            Footer CTA
          </div>
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
