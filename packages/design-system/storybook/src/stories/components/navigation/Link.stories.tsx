import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link, Container, Stack, tokens } from '@grasdouble/lufa_design-system';
import { Fragment } from 'react';

const { color } = tokens;

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
        variant: { control: 'select', options: ['default', 'underline', 'button'], description: 'Visual style variant' },
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
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default</h4>
                <Link variant="default" href="/page">
                    Go to page
                </Link>
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Underline</h4>
                <Link variant="underline" href="/page">
                    Go to page
                </Link>
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Button</h4>
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
                                color: color.text.secondary,
                                textAlign: 'center',
                                padding: '6px 8px',
                                backgroundColor: color.background.primary,
                                border: `1px solid ${color.border.light}`,
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
                                    color: color.text.secondary,
                                    padding: '6px 8px',
                                    backgroundColor: color.background.primary,
                                    border: `1px solid ${color.border.light}`,
                                    borderRadius: '10px',
                                }}
                            >
                                {variantKey}
                            </div>
                            {(['primary', 'secondary', 'success', 'warning', 'danger', 'inherit'] as const).map((colorKey) => (
                                <div key={`cell-${variantKey}-${colorKey}`}>
                                    <Link variant={variantKey} color={colorKey} href="/page">
                                        Link
                                    </Link>
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
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Auto External Indicator</h4>
                <Link external href="https://example.com">
                    Visit external site
                </Link>
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Custom Icon</h4>
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
            <p>
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
            <p style={{ marginTop: '16px' }}>
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
