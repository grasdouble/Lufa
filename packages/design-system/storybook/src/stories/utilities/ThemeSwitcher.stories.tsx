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

The ThemeSwitcher component demonstrates the power of our semantic design system. By using semantic color tokens via CSS custom properties (e.g., \`var(--lufa-token-color-text-primary)\`), all components automatically adapt to different themes without any code changes.

## How It Works

1. **CSS Variables**: All semantic tokens are defined as CSS custom properties in the tokens package
2. **Design Tokens**: TypeScript token definitions are built into CSS variables
3. **Theme Overrides**: Theme files (ocean.css, forest.css) override CSS variables for specific \`data-theme\` attributes
4. **Automatic Adaptation**: Components using CSS Modules with token-based variables automatically pick up theme values

## Architecture

\`\`\`
TypeScript Tokens → Build Process → CSS Custom Properties
                                              ↓
                              Components (CSS Modules with tokens)
                                              ↓
                              Theme Override (data-theme="ocean")
\`\`\`

## Creating New Themes

To create a new theme:

1. Create a new CSS file in \`src/themes/\` (e.g., \`purple.css\`)
2. Define your color palette using the semantic variable names:
   \`\`\`css
   :root[data-theme='purple'] {
       --color-interactive-default: var(--lufa-primitive-color-chromatic-purple-600);
       --color-interactive-hover: var(--lufa-primitive-color-chromatic-purple-700);
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
    <div style={{ padding: 'var(--spacing-xl)', minHeight: '100vh' }} className="bg-background-primary">
      <div style={{ marginBottom: 'var(--spacing-xl)', textAlign: 'center' }}>
        <Typography variant="h2" style={{ marginBottom: 'var(--spacing-xs)' }}>
          Theme Switcher Demo
        </Typography>
        <Typography variant="body" color="secondary">
          Switch themes to see all components adapt automatically
        </Typography>
      </div>

      {/* Theme Switcher - Centered */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--spacing-2xl)' }}>
        <ThemeSwitcher variant="tabs" showLabel />
      </div>

      {/* Component Showcase */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gap: 'var(--spacing-xl)',
        }}
      >
        {/* Buttons Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Buttons
          </Typography>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
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
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Badges
          </Typography>
          <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'center' }}>
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
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Alerts
          </Typography>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
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
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Cards
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--spacing-md)',
            }}
          >
            <Card variant="default" padding="medium">
              <Typography variant="h5" style={{ marginBottom: 'var(--spacing-xs)' }}>
                Default Card
              </Typography>
              <Typography variant="body">Card content adapts to theme colors</Typography>
            </Card>
            <Card variant="elevated" padding="medium">
              <Typography variant="h5" style={{ marginBottom: 'var(--spacing-xs)' }}>
                Elevated Card
              </Typography>
              <Typography variant="body">With shadow styling</Typography>
            </Card>
            <Card variant="outlined" padding="medium">
              <Typography variant="h5" style={{ marginBottom: 'var(--spacing-xs)' }}>
                Outlined Card
              </Typography>
              <Typography variant="body">Border-styled card</Typography>
            </Card>
          </div>
        </section>

        {/* Input Section */}
        <section>
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Input Fields
          </Typography>
          <div style={{ display: 'grid', gap: 'var(--spacing-md)', maxWidth: '500px' }}>
            <Input label="Username" placeholder="Enter your username" />
            <Input label="Email" placeholder="your@email.com" variant="outlined" />
            <Input label="Password" type="password" placeholder="••••••••" />
            <Input label="Required Field" placeholder="This is required" required />
          </div>
        </section>

        {/* Color Swatches */}
        <section>
          <Typography variant="h4" style={{ marginBottom: 'var(--spacing-md)' }}>
            Semantic Color System
          </Typography>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 'var(--spacing-md)',
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
  const colorMap: Record<string, { bg: string; border: string }> = {
    'interactive-default': {
      bg: 'var(--color-interactive-default)',
      border: 'var(--color-border-default)',
    },
    'interactive-hover': {
      bg: 'var(--color-interactive-hover)',
      border: 'var(--color-border-default)',
    },
    'success-default': {
      bg: 'var(--color-success-default)',
      border: 'var(--color-success-border)',
    },
    'warning-default': {
      bg: 'var(--color-warning-default)',
      border: 'var(--color-warning-border)',
    },
    'error-default': {
      bg: 'var(--color-error-default)',
      border: 'var(--color-error-border)',
    },
    'info-default': {
      bg: 'var(--color-info-default)',
      border: 'var(--color-info-border)',
    },
  };

  const colors = colorMap[color] || { bg: 'transparent', border: 'var(--color-border-default)' };

  return (
    <div
      style={{
        padding: 'var(--spacing-md)',
        borderRadius: 'var(--radius-md)',
        border: `1px solid ${colors.border}`,
        backgroundColor: 'var(--color-background-primary)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '60px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--spacing-xs)',
          backgroundColor: colors.bg,
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
