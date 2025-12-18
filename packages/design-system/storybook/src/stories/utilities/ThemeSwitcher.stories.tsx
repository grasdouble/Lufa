import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert, Badge, Button, Card, Input, Typography } from '@grasdouble/lufa_design-system';

import { ThemeSwitcher } from '../../components/ThemeSwitcher';

const meta = {
  title: '8. Utilities/Theme Switcher',
  component: ThemeSwitcher,
  parameters: {
    layout: 'fullscreen',
    controls: { exclude: '.*', hideNoControlsWarning: true },
    docs: {
      description: {
        component: `
# Theme Switcher

The ThemeSwitcher component demonstrates the power of our semantic design system. By using semantic color tokens like \`bg-interactive-default\`, \`text-text-primary\`, and \`border-border-default\`, all components automatically adapt to different themes without any code changes.

## How It Works

1. **CSS Variables Token**: All semantic tokens are defined as CSS variables in \`token/colors.css\`
2. **Tailwind Integration**: The \`@theme\` directive maps these variables to Tailwind utilities
3. **Theme Overrides**: Theme files (ocean.css, forest.css) override the CSS variables for specific \`data-theme\` attributes
4. **Automatic Adaptation**: Components using semantic utilities automatically pick up the new values

## Architecture

\`\`\`
TypeScript Tokens → CSS Variables → Tailwind @theme → Semantic Utilities
                                                              ↓
                                        Components (bg-interactive-default)
                                                              ↓
                                        Theme Override (data-theme="ocean")
\`\`\`

## Creating New Themes

To create a new theme:

1. Create a new CSS file in \`src/themes/\` (e.g., \`purple.css\`)
2. Define your color palette using the semantic variable names:
   \`\`\`css
   :root[data-theme='purple'] {
       --color-interactive-default: #9333ea;
       --color-interactive-hover: #7e22ce;
       /* ... all other semantic colors ... */
   }
   \`\`\`
3. Import the theme file in your app or story
4. Add the theme option to the ThemeSwitcher component

All existing components will automatically work with your new theme!
                `,
      },
    },
  },
  tags: [],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: () => (
    <div style={{ padding: '2rem', minHeight: '100vh' }} className="bg-background-primary">
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <Typography variant="h2" style={{ marginBottom: '0.5rem' }}>
          Theme Switcher Demo
        </Typography>
        <Typography variant="body" color="secondary">
          Switch themes to see all components adapt automatically
        </Typography>
      </div>

      {/* Theme Switcher - Centered */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
        <ThemeSwitcher variant="tabs" showLabel />
      </div>

      {/* Component Showcase */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gap: '2rem',
        }}
      >
        {/* Buttons Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Buttons
          </Typography>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Button variant="solid" color="primary">
              Primary
            </Button>
            <Button variant="solid" color="success">
              Success
            </Button>
            <Button variant="solid" color="warning">
              Warning
            </Button>
            <Button variant="solid" color="danger">
              Danger
            </Button>
            <Button variant="outlined" color="primary">
              Outlined
            </Button>
            <Button variant="text" color="primary">
              Text Button
            </Button>
          </div>
        </section>

        {/* Badges Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Badges
          </Typography>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </section>

        {/* Alerts Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Alerts
          </Typography>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Alert variant="info" title="Info Alert">
              This is an informational message using semantic colors
            </Alert>
            <Alert variant="success" title="Success Alert">
              Operation completed successfully!
            </Alert>
            <Alert variant="warning" title="Warning Alert">
              Please review this warning carefully
            </Alert>
            <Alert variant="error" title="Error Alert">
              An error has occurred, please try again
            </Alert>
          </div>
        </section>

        {/* Cards Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Cards
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1rem',
            }}
          >
            <Card variant="default" padding="medium">
              <Typography variant="h5" style={{ marginBottom: '0.5rem' }}>
                Default Card
              </Typography>
              <Typography variant="body">Card content adapts to theme colors</Typography>
            </Card>
            <Card variant="elevated" padding="medium">
              <Typography variant="h5" style={{ marginBottom: '0.5rem' }}>
                Elevated Card
              </Typography>
              <Typography variant="body">With shadow styling</Typography>
            </Card>
            <Card variant="outlined" padding="medium">
              <Typography variant="h5" style={{ marginBottom: '0.5rem' }}>
                Outlined Card
              </Typography>
              <Typography variant="body">Border-styled card</Typography>
            </Card>
          </div>
        </section>

        {/* Input Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Input Fields
          </Typography>
          <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px' }}>
            <Input label="Username" placeholder="Enter your username" />
            <Input label="Email" placeholder="your@email.com" variant="outlined" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Required Field" placeholder="This is required" required />
          </div>
        </section>

        {/* Color Swatches */}
        <section>
          <Typography variant="h4" style={{ marginBottom: '1rem' }}>
            Semantic Color System
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1rem',
            }}
          >
            <ColorSwatch color="interactive-default" label="Interactive Default" />
            <ColorSwatch color="interactive-hover" label="Interactive Hover" />
            <ColorSwatch color="success-default" label="Success" />
            <ColorSwatch color="warning-default" label="Warning" />
            <ColorSwatch color="error-default" label="Error" />
            <ColorSwatch color="info-default" label="Info" />
          </div>
        </section>
      </div>
    </div>
  ),
};

// export const TabsVariant: Story = {
//     args: {
//         variant: 'tabs',
//         showLabel: false,
//     },
// };

// export const ButtonVariant: Story = {
//     args: {
//         variant: 'button',
//         showLabel: true,
//     },
// };

// export const SelectVariant: Story = {
//     args: {
//         variant: 'select',
//         showLabel: true,
//     },
// };

// Helper component for color swatches
function ColorSwatch({ color, label }: { color: string; label: string }) {
  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border-default)',
      }}
    >
      <div
        className={`bg-${color}`}
        style={{
          width: '100%',
          height: '60px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '0.5rem',
        }}
      />
      <Typography variant="bodySmall" weight="medium">
        {label}
      </Typography>
      <Typography variant="caption" color="secondary">
        bg-{color}
      </Typography>
    </div>
  );
}
