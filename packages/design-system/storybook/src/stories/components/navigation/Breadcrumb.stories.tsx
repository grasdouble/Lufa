import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumb, Container, Stack } from '@grasdouble/lufa_design-system';

const meta = {
    title: '4. Navigation/Breadcrumb',
    component: Breadcrumb,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Breadcrumb component for hierarchical navigation. Shows the current page location within a navigational hierarchy.',
            },
        },
    },
    tags: [],
    argTypes: {
        items: { control: 'object', description: 'Array of breadcrumb items' },
        separator: { control: 'text', description: 'Custom separator' },
        size: { control: 'select', options: ['small', 'medium', 'large'], description: 'Size variant' },
    },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

const HomeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
);

export const Playground: Story = {
    args: {
        items: [
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Category', href: '/products/category' },
            { label: 'Current Page' },
        ],
        separator: '/',
        size: 'medium',
    },
};

export const BasicBreadcrumb: Story = {
    render: () => (
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]} />
    ),
};

export const Sizes: Story = {
    render: () => (
        <Stack gap="spacious">
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
                <Breadcrumb
                    size="small"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Medium (Default)</h4>
                <Breadcrumb
                    size="medium"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Large</h4>
                <Breadcrumb
                    size="large"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
        </Stack>
    ),
};

export const CustomSeparator: Story = {
    render: () => (
        <Stack gap="spacious">
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Arrow Separator</h4>
                <Breadcrumb
                    separator="→"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Chevron Separator</h4>
                <Breadcrumb
                    separator="›"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Dot Separator</h4>
                <Breadcrumb
                    separator="•"
                    items={[{ label: 'Home', href: '/' }, { label: 'Products', href: '/products' }, { label: 'Current Page' }]}
                />
            </div>
        </Stack>
    ),
};

export const WithIcons: Story = {
    render: () => (
        <Breadcrumb
            items={[
                { label: 'Home', href: '/', icon: <HomeIcon /> },
                { label: 'Products', href: '/products' },
                { label: 'Electronics', href: '/products/electronics' },
                { label: 'Current Product' },
            ]}
        />
    ),
};

export const LongPath: Story = {
    render: () => (
        <Container size="md" paddingX="none">
            <Breadcrumb
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'E-commerce', href: '/ecommerce' },
                    { label: 'Products', href: '/ecommerce/products' },
                    { label: 'Electronics', href: '/ecommerce/products/electronics' },
                    { label: 'Computers', href: '/ecommerce/products/electronics/computers' },
                    { label: 'Laptops', href: '/ecommerce/products/electronics/computers/laptops' },
                    { label: 'Current Product' },
                ]}
            />
        </Container>
    ),
};
