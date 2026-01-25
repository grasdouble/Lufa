# Utilities Generation System

This directory contains the **generic utilities generation system** for the Lufa Design System.

## 🎯 Purpose

Generate CSS utility classes automatically from configuration files for components that need flexible styling (Box, Text, Stack).

## 📁 Files

- **`generate-utilities.cjs`** - Generic script that generates CSS from config files
- Component configs in `src/components/*/`:
  - `box.utilities.config.cjs`
  - `text.utilities.config.cjs`
  - `stack.utilities.config.cjs`

## 🚀 Usage

### Generate Utilities for One Component

```bash
# From package root
pnpm generate:utilities Box
pnpm generate:utilities Text
pnpm generate:utilities Stack
```

### Generate All Utilities

```bash
pnpm generate:utilities --all
```

### Automatic Generation

Utilities are automatically regenerated during build:

```bash
pnpm build  # Runs generate:utilities --all before vite build
```

## 📊 Generated Files

| Component | Config                       | Output             | Classes | Size           |
| --------- | ---------------------------- | ------------------ | ------- | -------------- |
| **Box**   | `box.utilities.config.cjs`   | `Box.module.css`   | 119     | ~586 lines     |
| **Text**  | `text.utilities.config.cjs`  | `Text.module.css`  | 31      | ~154 lines     |
| **Stack** | `stack.utilities.config.cjs` | `Stack.module.css` | 22      | ~118 lines     |
| **Total** | -                            | -                  | **172** | **~858 lines** |

## 🏗️ Architecture: Props → Classes

### How It Works

1. **Configuration** - Define utilities in `.cjs` config file
2. **Generation** - Script reads config and generates CSS classes
3. **Component** - Maps props to CSS classes using `clsx`
4. **Result** - Props API with CSS class performance

### Example Flow

```tsx
// 1. Developer writes JSX
<Box padding="default" background="surface" borderRadius="medium">
  Content
</Box>

// 2. Component maps props to classes
const classes = clsx(
  styles['padding-default'],
  styles['background-surface'],
  styles['borderRadius-medium']
);

// 3. Output HTML with static classes
<div class="padding-default background-surface borderRadius-medium">
  Content
</div>

// 4. CSS applies token-based styles
.padding-default {
  padding: var(--semantic-ui-spacing-default);
}
.background-surface {
  background-color: var(--semantic-ui-background-surface);
}
.borderRadius-medium {
  border-radius: var(--semantic-ui-radius-medium);
}
```

## ⚙️ Configuration Format

### Basic Structure

```javascript
// component.utilities.config.cjs
module.exports = {
  component: 'ComponentName',
  outputFile: 'ComponentName.module.css',

  utilities: {
    utilityName: {
      property: 'css-property',
      values: {
        valueName: 'css-value-or-token',
      },
    },
  },
};
```

### Single Property Utility

```javascript
padding: {
  property: 'padding',
  values: {
    sm: '--semantic-ui-spacing-compact',
    md: '--semantic-ui-spacing-default',
    lg: '--semantic-ui-spacing-comfortable',
  }
}

// Generates:
// .padding-sm { padding: var(--semantic-ui-spacing-compact); }
// .padding-md { padding: var(--semantic-ui-spacing-default); }
// .padding-lg { padding: var(--semantic-ui-spacing-comfortable); }
```

### Multiple Properties Utility

```javascript
paddingX: {
  properties: ['padding-left', 'padding-right'],
  values: {
    sm: '--semantic-ui-spacing-compact',
    md: '--semantic-ui-spacing-default',
  }
}

// Generates:
// .paddingX-sm {
//   padding-left: var(--semantic-ui-spacing-compact);
//   padding-right: var(--semantic-ui-spacing-compact);
// }
```

### Raw Values (No Tokens)

```javascript
display: {
  property: 'display',
  values: {
    block: 'block',
    flex: 'flex',
    none: 'none',
  }
}

// Generates:
// .display-block { display: block; }
// .display-flex { display: flex; }
// .display-none { display: none; }
```

## 🔄 Adding a New Component

### Step 1: Create Config File

```bash
# Create config
touch src/components/NewComponent/new-component.utilities.config.cjs
```

```javascript
// new-component.utilities.config.cjs
module.exports = {
  component: 'NewComponent',
  outputFile: 'NewComponent.module.css',

  utilities: {
    // Define your utilities here
  },
};
```

### Step 2: Register in Script

Edit `scripts/generate-utilities.cjs`:

```javascript
const COMPONENT_CONFIGS = {
  Box: path.join(COMPONENTS_DIR, 'Box/box.utilities.config.cjs'),
  Text: path.join(COMPONENTS_DIR, 'Text/text.utilities.config.cjs'),
  Stack: path.join(COMPONENTS_DIR, 'Stack/stack.utilities.config.cjs'),
  NewComponent: path.join(COMPONENTS_DIR, 'NewComponent/new-component.utilities.config.cjs'), // ← Add this
};
```

### Step 3: Generate CSS

```bash
pnpm generate:utilities NewComponent
# or
pnpm generate:utilities --all
```

## 🎨 Available Tokens

Utilities should reference **semantic tokens** (Layer 3) for consistency:

### Spacing

- `--semantic-ui-spacing-tight` (4px)
- `--semantic-ui-spacing-compact` (8px)
- `--semantic-ui-spacing-default` (16px)
- `--semantic-ui-spacing-comfortable` (24px)
- `--semantic-ui-spacing-spacious` (32px)

### Colors

- `--semantic-ui-background-*` (page, surface, success, error, warning, info)
- `--semantic-ui-text-*` (primary, secondary, tertiary, success, error, warning, info)
- `--semantic-ui-border-*` (default, strong, success, error, warning, info)

### Border Radius

- `--semantic-ui-radius-small` (4px)
- `--semantic-ui-radius-default` (8px)
- `--semantic-ui-radius-medium` (12px)
- `--semantic-ui-radius-large` (16px)
- `--semantic-ui-radius-full` (9999px)

### Typography

- `--semantic-typography-heading-*` (1-6)
- `--semantic-typography-body` / `body-large` / `body-small`
- `--semantic-typography-caption`
- `--semantic-typography-label`

## ✨ Benefits

### Performance

- ✅ **CSS classes** cached by browser (no inline styles)
- ✅ **Static styles** - no runtime calculation
- ✅ **Reusable** across components

### Developer Experience

- ✅ **Props API** - intuitive and type-safe
- ✅ **Autocomplete** - TypeScript knows all values
- ✅ **Consistent** - only valid tokens accessible

### Maintainability

- ✅ **Single source of truth** - tokens define design system
- ✅ **Automatic generation** - no manual CSS updates
- ✅ **Scalable** - easy to add new components

## 🚫 When NOT to Use Utilities

Utilities are for **flexible layout components** (Box, Text, Stack).

**Don't use utilities for:**

- Button (use variants: `primary`, `secondary`, `ghost`)
- Badge (use variants: `success`, `error`, `warning`, `info`)
- Icon (simple props: `name`, `size`, `color`)
- Divider (simple props: `orientation`, `color`)

These components should have **fixed semantic variants** for design consistency.

## 📚 Examples

### Box Component

```tsx
<Box padding="comfortable" background="surface" borderRadius="medium" borderWidth="thin" borderColor="default">
  Container with utilities
</Box>
```

### Text Component

```tsx
<Text variant="h2" color="primary" weight="bold" align="center">
  Heading with utilities
</Text>
```

### Stack Component

```tsx
<Stack direction="vertical" spacing="default" align="center" justify="space-between">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
</Stack>
```

## 🛠️ Troubleshooting

### Classes Not Applying?

1. **Regenerate utilities**: `pnpm generate:utilities --all`
2. **Rebuild package**: `pnpm build`
3. **Check class names**: Use browser devtools to inspect

### TypeScript Errors?

1. **Ensure types are exported** from component
2. **Rebuild types**: `pnpm build:types`
3. **Restart TypeScript server** in your IDE

### CSS Not Loading?

1. **Import CSS in component**: `import styles from './ComponentName.module.css'`
2. **Check Vite config**: Ensure CSS Modules are enabled
3. **Verify build output**: Check `dist/style.css` includes utilities

## 📖 References

- **Design System Architecture**: `AGENTS.md` - Three-layer architecture
- **Token Specifications**: `packages/design-system/tokens/`
- **Component Patterns**: `.github/instructions/lufa-design-system.instructions.md`
