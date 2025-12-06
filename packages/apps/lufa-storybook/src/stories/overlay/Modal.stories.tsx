import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal, Button } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

const meta = {
    title: '6. Overlay/Modal',
    component: Modal,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component:
                    'A modal dialog component that overlays content on the page. Supports different sizes, keyboard navigation, and backdrop interactions.',
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large', 'fullscreen'],
        },
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
    args: {
        title: 'Modal Title',
        size: 'medium',
    },
    render: (args: React.ComponentProps<typeof Modal>) => {
        const ModalDemo = () => {
            const [open, setOpen] = useState(false);

            return (
                <>
                    <Button onClick={() => setOpen(true)}>Open Modal</Button>
                    <Modal {...args} open={open} onClose={() => setOpen(false)}>
                        This is the modal content. Click outside, press Escape, or use the close button to dismiss.
                    </Modal>
                </>
            );
        };

        return <ModalDemo />;
    },
};

export const Sizes: Story = {
    render: () => {
        const SizesDemo = () => {
            const [size, setSize] = useState<'small' | 'medium' | 'large' | 'fullscreen' | null>(null);

            return (
                <>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <Button onClick={() => setSize('small')}>Small</Button>
                        <Button onClick={() => setSize('medium')}>Medium</Button>
                        <Button onClick={() => setSize('large')}>Large</Button>
                        <Button onClick={() => setSize('fullscreen')}>Fullscreen</Button>
                    </div>
                    {size && (
                        <Modal
                            open={!!size}
                            onClose={() => setSize(null)}
                            title={`${size.charAt(0).toUpperCase() + size.slice(1)} Modal`}
                            size={size}
                        >
                            <p>This is a {size} modal.</p>
                            <p>Each size is optimized for different content types and use cases.</p>
                        </Modal>
                    )}
                </>
            );
        };

        return <SizesDemo />;
    },
};

export const WithFooter: Story = {
    render: () => {
        const FooterDemo = () => {
            const [open, setOpen] = useState(false);

            return (
                <>
                    <Button onClick={() => setOpen(true)}>Open Modal with Footer</Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        title="Confirm Action"
                        footer={
                            <>
                                <Button variant="text" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    variant="solid"
                                    onClick={() => {
                                        alert('Confirmed!');
                                        setOpen(false);
                                    }}
                                >
                                    Confirm
                                </Button>
                            </>
                        }
                    >
                        Are you sure you want to proceed with this action? This cannot be undone.
                    </Modal>
                </>
            );
        };

        return <FooterDemo />;
    },
};

export const LongContent: Story = {
    render: () => {
        const LongContentDemo = () => {
            const [open, setOpen] = useState(false);

            return (
                <>
                    <Button onClick={() => setOpen(true)}>Open Modal with Long Content</Button>
                    <Modal open={open} onClose={() => setOpen(false)} title="Terms and Conditions" size="large">
                        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                            <h3>1. Introduction</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                            <h3>2. User Rights</h3>
                            <p>
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <h3>3. Privacy Policy</h3>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                            <h3>4. Disclaimer</h3>
                            <p>
                                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                                laborum.
                            </p>
                            <h3>5. Additional Terms</h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                                dolore magna aliqua.
                            </p>
                        </div>
                    </Modal>
                </>
            );
        };

        return <LongContentDemo />;
    },
};

export const NoBackdropClose: Story = {
    render: () => {
        const NoBackdropDemo = () => {
            const [open, setOpen] = useState(false);

            return (
                <>
                    <Button onClick={() => setOpen(true)}>Open Modal</Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        title="Important Message"
                        closeOnBackdropClick={false}
                        closeOnEscape={false}
                        footer={
                            <Button variant="solid" onClick={() => setOpen(false)}>
                                I Understand
                            </Button>
                        }
                    >
                        This modal requires explicit confirmation. It cannot be closed by clicking outside or pressing Escape.
                    </Modal>
                </>
            );
        };

        return <NoBackdropDemo />;
    },
};

export const FormModal: Story = {
    render: () => {
        const FormModalDemo = () => {
            const [open, setOpen] = useState(false);
            const [formData, setFormData] = useState({ name: '', email: '' });

            const handleSubmit = (e: React.FormEvent) => {
                e.preventDefault();
                alert(`Form submitted: ${JSON.stringify(formData)}`);
                setOpen(false);
                setFormData({ name: '', email: '' });
            };

            return (
                <>
                    <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
                    <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        title="Contact Information"
                        size="small"
                        footer={
                            <>
                                <Button
                                    variant="text"
                                    onClick={() => {
                                        setOpen(false);
                                        setFormData({ name: '', email: '' });
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button variant="solid" type="submit" form="contact-form">
                                    Submit
                                </Button>
                            </>
                        }
                    >
                        <form id="contact-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '4px',
                                        fontWeight: 500,
                                    }}
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d4d4d4',
                                        borderRadius: '6px',
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    style={{
                                        display: 'block',
                                        marginBottom: '4px',
                                        fontWeight: 500,
                                    }}
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '8px 12px',
                                        border: '1px solid #d4d4d4',
                                        borderRadius: '6px',
                                    }}
                                />
                            </div>
                        </form>
                    </Modal>
                </>
            );
        };

        return <FormModalDemo />;
    },
};
