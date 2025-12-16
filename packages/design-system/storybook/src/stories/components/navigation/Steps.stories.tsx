import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps, Stack, Button, tokens } from '@grasdouble/lufa_design-system';
import { useState } from 'react';

const { color } = tokens;

const meta = {
    title: '4. Navigation/Steps',
    component: Steps,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component:
                    'Steps component for displaying progress through a sequence. Use for multi-step processes, wizards, or progress tracking.',
            },
        },
    },
    tags: [],
    argTypes: {
        items: { control: 'object', description: 'Array of step items' },
        current: { control: 'number', description: 'Current step index (0-indexed)' },
        direction: { control: 'select', options: ['horizontal', 'vertical'], description: 'Steps direction' },
        size: { control: 'select', options: ['small', 'default'], description: 'Size variant' },
        onChange: { action: 'step changed' },
    },
} satisfies Meta<typeof Steps>;

export default meta;
type Story = StoryObj<typeof meta>;

const CheckIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
        />
    </svg>
);

const UserIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const CreditCardIcon = () => (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path
            fillRule="evenodd"
            d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
            clipRule="evenodd"
        />
    </svg>
);

const basicSteps = [
    { title: 'Account', description: 'Create your account' },
    { title: 'Verification', description: 'Verify your email' },
    { title: 'Profile', description: 'Complete your profile' },
    { title: 'Done', description: 'All set!' },
];

const stepsWithIcons = [
    { title: 'Account', description: 'Create your account', icon: <UserIcon /> },
    { title: 'Verification', description: 'Verify your email', icon: <CheckIcon /> },
    { title: 'Payment', description: 'Add payment method', icon: <CreditCardIcon /> },
];

export const Playground: Story = {
    args: {
        items: basicSteps,
        current: 1,
        direction: 'horizontal',
        size: 'default',
    },
};

export const BasicSteps: Story = {
    render: () => <Steps items={basicSteps} current={1} />,
};

export const Directions: Story = {
    render: () => (
        <Stack gap="spacious">
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Horizontal</h4>
                <Steps items={basicSteps} current={1} direction="horizontal" />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Vertical</h4>
                <Steps items={basicSteps} current={1} direction="vertical" />
            </div>
        </Stack>
    ),
};

export const Sizes: Story = {
    render: () => (
        <Stack gap="spacious">
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Small</h4>
                <Steps items={basicSteps} current={1} size="small" />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Default</h4>
                <Steps items={basicSteps} current={1} size="default" />
            </div>
        </Stack>
    ),
};

export const WithIcons: Story = {
    render: () => <Steps items={stepsWithIcons} current={1} />,
};

export const DifferentStates: Story = {
    render: () => (
        <Stack gap="spacious">
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Beginning (Step 0)</h4>
                <Steps items={basicSteps} current={0} />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Middle (Step 2)</h4>
                <Steps items={basicSteps} current={2} />
            </div>
            <div>
                <h4 style={{ marginBottom: '12px', fontSize: '14px', fontWeight: 600 }}>Complete (Step 3)</h4>
                <Steps items={basicSteps} current={3} />
            </div>
        </Stack>
    ),
};

export const WithError: Story = {
    render: () => (
        <Steps
            items={[
                { title: 'Account', description: 'Create your account' },
                { title: 'Verification', description: 'Verify your email', status: 'error' },
                { title: 'Profile', description: 'Complete your profile' },
                { title: 'Done', description: 'All set!' },
            ]}
            current={1}
        />
    ),
};

export const Interactive: Story = {
    render: () => {
        const [current, setCurrent] = useState(0);

        return (
            <Stack gap="spacious">
                <Steps items={basicSteps} current={current} onChange={setCurrent} />
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <Button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} variant="outlined">
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrent(Math.min(basicSteps.length - 1, current + 1))}
                        disabled={current === basicSteps.length - 1}
                    >
                        {current === basicSteps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </Stack>
        );
    },
};

export const Wizard: Story = {
    render: () => {
        const [current, setCurrent] = useState(0);

        const wizardSteps = [
            { title: 'Basic Info', description: 'Enter your basic information' },
            { title: 'Contact Details', description: 'Provide your contact details' },
            { title: 'Preferences', description: 'Set your preferences' },
            { title: 'Review', description: 'Review and confirm' },
        ];

        const stepContent = [
            <div key="step-0" style={{ padding: '24px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '16px' }}>Basic Information</h3>
                <p>Form fields for basic information would go here...</p>
            </div>,
            <div key="step-1" style={{ padding: '24px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '16px' }}>Contact Details</h3>
                <p>Form fields for contact details would go here...</p>
            </div>,
            <div key="step-2" style={{ padding: '24px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '16px' }}>Preferences</h3>
                <p>Form fields for preferences would go here...</p>
            </div>,
            <div key="step-3" style={{ padding: '24px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
                <h3 style={{ marginBottom: '16px' }}>Review & Confirm</h3>
                <p>Summary of all entered information would go here...</p>
            </div>,
        ];

        return (
            <div>
                <Steps items={wizardSteps} current={current} />
                <div style={{ marginTop: '24px' }}>{stepContent[current]}</div>
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
                    <Button onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} variant="outlined">
                        Previous
                    </Button>
                    <Button
                        onClick={() => setCurrent(Math.min(wizardSteps.length - 1, current + 1))}
                        disabled={current === wizardSteps.length - 1}
                    >
                        {current === wizardSteps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </div>
            </div>
        );
    },
};

export const VerticalWithContent: Story = {
    render: () => {
        const [current, setCurrent] = useState(0);

        return (
            <div style={{ display: 'flex', gap: '32px' }}>
                <div style={{ width: '300px' }}>
                    <Steps items={basicSteps} current={current} direction="vertical" onChange={setCurrent} />
                </div>
                <div style={{ flex: 1, padding: '24px', backgroundColor: color.background.secondary, borderRadius: '8px' }}>
                    <h3 style={{ marginBottom: '16px' }}>{basicSteps[current].title}</h3>
                    <p>{basicSteps[current].description}</p>
                    <p style={{ marginTop: '16px', color: color.text.secondary }}>Content for step {current + 1} would go here...</p>
                </div>
            </div>
        );
    },
};
