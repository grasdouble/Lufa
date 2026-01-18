import { Fragment } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Container, Link, Stack } from '@grasdouble/lufa_design-system';

const meta = {
  title: '4. Navigation/Link',
  component: Link,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Link component for navigation to different pages or external URLs. Use for routing to different pages, external sites, or downloadable files.',
      },
    },
  },
  tags: [],
  argTypes: {
    children: { control: 'text', description: 'Link content' },
    variant: {
      control: 'select',
      options: ['default', 'underline', 'button'],
      description: 'Visual style variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'],
      description: 'Color scheme',
    },
    size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Size variant' },
    external: { control: 'boolean', description: 'External link indicator' },
    href: { control: 'text', description: 'Link URL' },
    startIcon: { control: false },
    endIcon: { control: false },
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

const ExternalIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
    <path
      fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const Playground: Story = {
  args: {
    children: 'Visit our website',
    variant: 'default',
    color: 'primary',
    size: 'medium',
    href: 'https://example.com',
  },
};

export const Variants: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Default
        </h4>
        <Link variant="default" href="/page">
          Go to page
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Underline
        </h4>
        <Link variant="underline" href="/page">
          Go to page
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Button
        </h4>
        <Link variant="button" href="/page">
          Go to page
        </Link>
      </div>
    </Stack>
  ),
};

export const Colors: Story = {
  render: () => (
    <Container size="xl" paddingX="none">
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <div
          style={{
            minWidth: '900px',
            display: 'grid',
            gridTemplateColumns: '140px repeat(6, minmax(0, 1fr))',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          <div />
          {(['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const).map((colorKey) => (
            <div
              key={`header-${colorKey}`}
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--lufa-token-color-text-secondary)',
                textAlign: 'center',
                padding: '6px 8px',
                backgroundColor: 'var(--lufa-token-color-background-primary)',
                border: '1px solid var(--lufa-token-color-border-light)',
                borderRadius: '10px',
              }}
            >
              {colorKey}
            </div>
          ))}

          {(['default', 'underline', 'button'] as const).map((variantKey) => (
            <Fragment key={`row-${variantKey}`}>
              <div
                style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: 'var(--lufa-token-color-text-secondary)',
                  padding: '6px 8px',
                  backgroundColor: 'var(--lufa-token-color-background-primary)',
                  border: '1px solid var(--lufa-token-color-border-light)',
                  borderRadius: '10px',
                }}
              >
                {variantKey}
              </div>
              {(['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const).map((colorKey) => (
                <div key={`cell-${variantKey}-${colorKey}`}>
                  {colorKey === 'inherit' ? (
                    <div style={{ color: 'var(--lufa-token-color-success-default)' }}>
                      <Link variant={variantKey} color={colorKey} href="/page">
                        Link
                      </Link>
                    </div>
                  ) : (
                    <Link variant={variantKey} color={colorKey} href="/page">
                      Link
                    </Link>
                  )}
                </div>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack gap="spacious" align="start">
      <Link size="small" href="/page">
        Small link
      </Link>
      <Link size="medium" href="/page">
        Medium link (default)
      </Link>
      <Link size="large" href="/page">
        Large link
      </Link>
    </Stack>
  ),
};

export const ExternalLinks: Story = {
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Auto External Indicator
        </h4>
        <Link external href="https://example.com">
          Visit external site
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Custom Icon
        </h4>
        <Link href="https://example.com" endIcon={<ExternalIcon />}>
          Visit external site
        </Link>
      </div>
    </Stack>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Stack gap="spacious">
      <Link href="/download" startIcon={<DownloadIcon />}>
        Download file
      </Link>
      <Link href="https://example.com" endIcon={<ExternalIcon />}>
        External link
      </Link>
      <Link variant="button" href="/download" startIcon={<DownloadIcon />}>
        Download
      </Link>
    </Stack>
  ),
};

export const InText: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', lineHeight: '1.6' }}>
      <p style={{ color: 'var(--lufa-token-color-text-primary)' }}>
        This is a paragraph with an{' '}
        <Link href="/inline" variant="underline">
          inline link
        </Link>{' '}
        in the middle of the text. You can also have{' '}
        <Link href="https://example.com" external>
          external links
        </Link>{' '}
        that open in a new tab.
      </p>
      <p style={{ marginTop: '16px', color: 'var(--lufa-token-color-text-primary)' }}>
        For more information, please{' '}
        <Link href="/contact" color="primary">
          contact us
        </Link>{' '}
        or read our{' '}
        <Link href="/docs" variant="underline">
          documentation
        </Link>
        .
      </p>
    </div>
  ),
};

export const AllStates: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates all link states. Hover over links to see hover state, click to see active state, and focus using keyboard (Tab) to see focus state.',
      },
    },
  },
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Default State
        </h4>
        <Link variant="default" href="#">
          Default link
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Hover State (hover over the link)
        </h4>
        <Link variant="default" href="#">
          Hover over me
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Focus State (use Tab key)
        </h4>
        <Link variant="default" href="#">
          Focus with keyboard
        </Link>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Active State (click and hold)
        </h4>
        <Link variant="default" href="#">
          Click and hold
        </Link>
      </div>
    </Stack>
  ),
};

export const ThemeShowcase: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates how Link colors adapt to different themes. Use the theme switcher in the Storybook toolbar to see the changes.',
      },
    },
  },
  render: () => (
    <div style={{ padding: '24px' }}>
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--lufa-token-color-text-primary)',
        }}
      >
        Link Colors (Theme Aware)
      </h3>
      <p style={{ marginBottom: '24px', color: 'var(--lufa-token-color-text-secondary)' }}>
        All link colors automatically adapt to the current theme. Use the theme switcher in the toolbar.
      </p>

      <Stack gap="spacious">
        <div>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Primary
          </h4>
          <Link color="primary" href="#">
            Primary color link - uses interactive colors
          </Link>
        </div>
        <div>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Secondary
          </h4>
          <Link color="secondary" href="#">
            Secondary color link - uses text colors
          </Link>
        </div>
        <div>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Success
          </h4>
          <Link color="success" href="#">
            Success color link
          </Link>
        </div>
        <div>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Warning
          </h4>
          <Link color="warning" href="#">
            Warning color link
          </Link>
        </div>
        <div>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Danger
          </h4>
          <Link color="danger" href="#">
            Danger color link
          </Link>
        </div>
        <div style={{ color: 'var(--lufa-token-color-success-default)' }}>
          <h4
            style={{
              marginBottom: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: 'var(--lufa-token-color-text-primary)',
            }}
          >
            Inherit (inside success colored text)
          </h4>
          <span>This text is success colored with an </span>
          <Link color="inherit" href="#">
            inherit link
          </Link>
          <span> inside</span>
        </div>
      </Stack>
    </div>
  ),
};

export const AccessibilityDemo: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates accessibility features: focus visible states, proper contrast ratios, and keyboard navigation support.',
      },
    },
  },
  render: () => (
    <Stack gap="spacious">
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Keyboard Navigation (Tab through these links)
        </h4>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <Link href="#1">First Link</Link>
          <Link href="#2">Second Link</Link>
          <Link href="#3">Third Link</Link>
        </div>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          External Link with Screen Reader Indicator
        </h4>
        <Link external href="https://example.com">
          Opens in new tab
        </Link>
        <p style={{ fontSize: '12px', color: 'var(--lufa-token-color-text-secondary)', marginTop: '8px' }}>
          The arrow icon has an aria-label indicating it opens in a new tab
        </p>
      </div>
      <div>
        <h4
          style={{
            marginBottom: '12px',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--lufa-token-color-text-primary)',
          }}
        >
          Underlined Link (Better for colorblind users)
        </h4>
        <Link variant="underline" href="#">
          This link is always underlined for better visibility
        </Link>
      </div>
    </Stack>
  ),
};
