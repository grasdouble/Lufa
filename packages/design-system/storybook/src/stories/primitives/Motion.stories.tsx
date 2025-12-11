import type { Meta, StoryObj } from '@storybook/react-vite';
import { timing, easing } from '@grasdouble/lufa_design-system-primitives';

const meta = {
    title: '0. Primitives/Motion',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Timing: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Motion Primitives - Timing</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Tokens timing values for animations. Keep interactions under 400ms to feel responsive. Combine with easing
                curves for natural motion.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(timing).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '120px 100px 1fr',
                            gap: '16px',
                            alignItems: 'center',
                            padding: '16px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>
                            timing[{key}]
                        </div>
                        <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#3B82F6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    transition: `transform ${value} ease-out`,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
                                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                            >
                                Hover Me
                            </button>
                            <span style={{ fontSize: '12px', color: '#737373' }}>
                                {key === '0' && 'Instant (no animation)'}
                                {key === '100' && 'Micro-interactions'}
                                {key === '150' && 'Quick transitions'}
                                {key === '250' && 'Standard transitions'}
                                {key === '400' && 'Emphasized transitions'}
                                {key === '600' && 'Dramatic animations'}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div
                style={{
                    marginTop: '40px',
                    padding: '24px',
                    backgroundColor: '#DBEAFE',
                    borderRadius: '12px',
                    border: '1px solid #93C5FD',
                }}
            >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: '600' }}>Performance Guidelines</h3>
                <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.6' }}>
                    <li>Prefer 150-250ms for most UI transitions</li>
                    <li>Keep animations under 400ms to feel responsive</li>
                    <li>Use 600ms only for intentional dramatic effect</li>
                </ul>
            </div>
        </div>
    ),
};

export const Easing: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Motion Primitives - Easing</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Token easing curve values. Prefer easeOut for most UI transitions - it feels most natural.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {Object.entries(easing).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            padding: '20px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px' }}>
                                easing.{key}
                            </div>
                            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '11px' }}>{value}</div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <button
                                onClick={(e) => {
                                    const box = e.currentTarget.nextElementSibling as HTMLElement;
                                    box.style.transform = 'translateX(0)';
                                    setTimeout(() => {
                                        box.style.transform = 'translateX(400px)';
                                    }, 50);
                                }}
                                style={{
                                    padding: '8px 16px',
                                    backgroundColor: '#3B82F6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                Animate
                            </button>
                            <div style={{ position: 'relative', flex: 1, height: '40px' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '40px',
                                        height: '40px',
                                        backgroundColor: '#3B82F6',
                                        borderRadius: '6px',
                                        transition: `transform 600ms ${value}`,
                                        transform: 'translateX(0)',
                                    }}
                                />
                            </div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#737373', marginTop: '12px' }}>
                            {key === 'easeIn' && 'Start slow, accelerate - Use sparingly (feels unnatural)'}
                            {key === 'easeOut' && 'Start fast, decelerate - Most common, feels natural'}
                            {key === 'easeInOut' && 'Smooth acceleration/deceleration - Good for state changes'}
                            {key === 'gentle' && 'Subtle, gentle motion - Perfect for micro-interactions'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const CombinedExamples: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '24px' }}>
                Motion Usage Examples (Timing + Easing)
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Button Hover</h3>
                    <button
                        style={{
                            padding: '12px 32px',
                            backgroundColor: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: '500',
                            cursor: 'pointer',
                            transition: `transform ${timing[100]} ${easing.easeOut}, box-shadow ${timing[100]} ${easing.easeOut}`,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                        }}
                    >
                        Hover Me (100ms easeOut)
                    </button>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: '#737373' }}>
                        Quick, responsive feedback for micro-interactions
                    </p>
                </div>

                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Dropdown Menu</h3>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <button
                            onClick={(e) => {
                                const menu = e.currentTarget.nextElementSibling as HTMLElement;
                                menu.style.opacity = menu.style.opacity === '1' ? '0' : '1';
                                menu.style.transform = menu.style.opacity === '1' ? 'translateY(0)' : 'translateY(-10px)';
                                menu.style.pointerEvents = menu.style.opacity === '1' ? 'auto' : 'none';
                            }}
                            style={{
                                padding: '10px 20px',
                                backgroundColor: 'white',
                                color: '#374151',
                                border: '1px solid #E5E5E5',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: 'pointer',
                            }}
                        >
                            Toggle Menu ▼
                        </button>
                        <div
                            style={{
                                position: 'absolute',
                                top: 'calc(100% + 8px)',
                                left: 0,
                                minWidth: '200px',
                                backgroundColor: 'white',
                                borderRadius: '8px',
                                boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                opacity: 0,
                                transform: 'translateY(-10px)',
                                transition: `opacity ${timing[150]} ${easing.easeOut}, transform ${timing[150]} ${easing.easeOut}`,
                                pointerEvents: 'none',
                                overflow: 'hidden',
                            }}
                        >
                            {['Option 1', 'Option 2', 'Option 3'].map((opt) => (
                                <div
                                    key={opt}
                                    style={{
                                        padding: '12px 16px',
                                        cursor: 'pointer',
                                        transition: `background-color ${timing[100]} ${easing.easeOut}`,
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F9FAFB')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                >
                                    {opt}
                                </div>
                            ))}
                        </div>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: '#737373' }}>
                        150ms easeOut for smooth, quick appearance
                    </p>
                </div>

                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Modal</h3>
                    <button
                        onClick={(e) => {
                            const modal = e.currentTarget.nextElementSibling as HTMLElement;
                            modal.style.opacity = modal.style.opacity === '1' ? '0' : '1';
                            modal.style.pointerEvents = modal.style.opacity === '1' ? 'auto' : 'none';
                            const content = modal.querySelector('[data-modal-content]') as HTMLElement;
                            if (content) {
                                content.style.transform = modal.style.opacity === '1' ? 'scale(1)' : 'scale(0.95)';
                            }
                        }}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: '500',
                            cursor: 'pointer',
                        }}
                    >
                        Open Modal
                    </button>
                    <div
                        style={{
                            position: 'fixed',
                            inset: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0,
                            transition: `opacity ${timing[250]} ${easing.easeInOut}`,
                            pointerEvents: 'none',
                            zIndex: 1000,
                        }}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                e.currentTarget.style.opacity = '0';
                                e.currentTarget.style.pointerEvents = 'none';
                                const content = e.currentTarget.querySelector('[data-modal-content]') as HTMLElement;
                                if (content) {
                                    content.style.transform = 'scale(0.95)';
                                }
                            }
                        }}
                    >
                        <div
                            data-modal-content
                            style={{
                                padding: '32px',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                maxWidth: '500px',
                                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                                transform: 'scale(0.95)',
                                transition: `transform ${timing[250]} ${easing.easeInOut}`,
                            }}
                        >
                            <h4 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '600' }}>Modal Title</h4>
                            <p style={{ margin: '0 0 24px 0', color: '#737373' }}>
                                This modal uses 250ms easeInOut for a balanced, smooth transition.
                            </p>
                            <button
                                onClick={(e) => {
                                    const modal = e.currentTarget.closest('[style*="position: fixed"]') as HTMLElement;
                                    if (modal) {
                                        modal.style.opacity = '0';
                                        modal.style.pointerEvents = 'none';
                                        const content = modal.querySelector('[data-modal-content]') as HTMLElement;
                                        if (content) {
                                            content.style.transform = 'scale(0.95)';
                                        }
                                    }
                                }}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#3B82F6',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: '500',
                                    cursor: 'pointer',
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: '#737373' }}>
                        250ms easeInOut for important UI transitions
                    </p>
                </div>
            </div>
        </div>
    ),
};
