import type { Meta, StoryObj } from '@storybook/react-vite';
import { aspectRatio } from '@grasdouble/lufa_design-system-tokens';

const meta = {
    title: '1. Tokens/Aspect Ratio',
    parameters: {
        layout: 'padded',
    },
    tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllAspectRatios: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Aspect Ratio Tokens</h1>
            <p style={{ marginBottom: '32px', color: '#737373', fontSize: '16px' }}>
                Semantic aspect ratios for media containers, images, and videos. Prevents layout shift during loading.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                {Object.entries(aspectRatio).map(([key, value]) => (
                    <div
                        key={key}
                        style={{
                            padding: '16px',
                            backgroundColor: '#FAFAFA',
                            borderRadius: '8px',
                            border: '1px solid #E5E5E5',
                        }}
                    >
                        <div style={{ marginBottom: '12px' }}>
                            <div style={{ fontFamily: 'monospace', fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                                aspectRatio.{key}
                            </div>
                            <div style={{ fontFamily: 'monospace', color: '#737373', fontSize: '12px' }}>{value}</div>
                        </div>
                        <div
                            style={{
                                aspectRatio: value,
                                backgroundColor: '#3B82F6',
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: '600',
                            }}
                        >
                            {value}
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '12px', color: '#737373' }}>
                            {key === 'square' && '1:1 - Avatars, thumbnails'}
                            {key === 'traditional' && '4:3 - Presentations'}
                            {key === 'photo' && '3:2 - Photography'}
                            {key === 'video' && '16:9 - Video content'}
                            {key === 'ultrawide' && '21:9 - Cinematic'}
                            {key === 'vertical' && '9:16 - Stories'}
                            {key === 'portrait' && '2:3 - Portrait photo'}
                            {key === 'portraitDisplay' && '3:4 - Portrait screen'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    ),
};

export const UsageExamples: Story = {
    render: () => (
        <div style={{ padding: '20px', maxWidth: '1400px' }}>
            <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '16px' }}>Aspect Ratio Usage Examples</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {/* Video Player */}
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Video Player (16:9)</h3>
                    <div
                        style={{
                            maxWidth: '800px',
                            aspectRatio: aspectRatio.video,
                            backgroundColor: '#1F2937',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                        }}
                    >
                        Video Content
                    </div>
                </div>

                {/* Profile Avatar */}
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Profile Avatar (1:1)</h3>
                    <div
                        style={{
                            width: '200px',
                            aspectRatio: aspectRatio.square,
                            backgroundColor: '#3B82F6',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '48px',
                            fontWeight: 'bold',
                        }}
                    >
                        JD
                    </div>
                </div>

                {/* Story Card */}
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>Story Card (9:16)</h3>
                    <div
                        style={{
                            maxWidth: '300px',
                            aspectRatio: aspectRatio.vertical,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}
                    >
                        Story
                    </div>
                </div>
            </div>
        </div>
    ),
};
