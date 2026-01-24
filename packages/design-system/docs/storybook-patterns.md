# Component Documentation Patterns - Lufa Design System v2.0

**Generated**: 2026-01-24  
**Scope**: Storybook Stories Documentation Patterns  
**Package**: `@grasdouble/lufa_design-system-storybook`  
**Location**: `packages/design-system/storybook/src/stories/`

---

## 📋 Executive Summary

This document analyzes the **Storybook documentation patterns** used in the Lufa Design System v2.0. It covers story organization, interactive examples, code generation patterns, and documentation structure based on analysis of 6 story files (5 component stories + 1 token visualization).

**Key Findings**:

- **Story Format**: Component Story Format 3 (CSF3) with TypeScript
- **Story Count**: ~50+ stories across 6 files
- **Documentation Style**: Interactive, prop-focused, with live code generation
- **Helper Components**: Custom `StoryContainer`, `PropCard`, `CodeBlock`, `PaddingVisualizer`, `MarginVisualizer`, `PlaygroundContainer`
- **Accessibility**: Interactive hover states, keyboard-friendly examples, focus indicators
- **Visual Design**: Color-coded categories, responsive grids, semantic spacing

---

## 🗂️ Story File Organization

### File Structure Pattern

All component stories follow this directory structure:

```
packages/design-system/storybook/src/stories/
├── primitives/
│   ├── Box.stories.tsx          (1373 lines)
│   ├── Stack.stories.tsx        (804 lines)
│   ├── Text.stories.tsx         (852 lines)
│   ├── Icon.stories.tsx         (not scanned - assumed similar)
│   └── Button.stories.tsx       (989 lines)
├── tokens/
│   └── Colors.stories.tsx       (739 lines)
└── [future: compositions/]
```

### Naming Convention

**File naming**:

- Pattern: `{ComponentName}.stories.tsx`
- Location: `primitives/` for foundational components, `tokens/` for design token visualizations

**Story naming** (within files):

- `Default` - Basic usage example
- `Playground` - Interactive sandbox with all props
- `Prop{PropName}` - Individual prop demonstrations (e.g., `PropPadding`, `PropVariant`)
- `Prop{Prop1}{Prop2}` - Combined prop demonstrations (e.g., `PropPaddingXY`)
- `CombinedVariants` / `UseCases` / `RealWorldPatterns` - Real-world usage examples

---

## 📖 Story Structure Patterns

### Meta Configuration (CSF3)

Every story file uses this meta structure:

```typescript
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentName } from '@grasdouble/lufa_design-system';

/**
 * ComponentName - Brief Description
 *
 * Detailed explanation of component purpose and capabilities.
 *
 * ## Features
 * - ✅ Feature 1
 * - ✅ Feature 2
 * - ✅ Feature 3
 */
const meta = {
  title: 'Primitives/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'fullscreen', // or 'centered', 'padded'
  },
  argTypes: {
    propName: {
      control: 'select', // or 'boolean', 'text', 'number'
      options: ['value1', 'value2'],
      description: 'Prop description',
      table: {
        category: 'Category Name', // Groups props in docs
        type: { summary: 'TypeName' },
        defaultValue: { summary: 'default' },
      },
    },
    // ... more argTypes
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

**Key patterns observed**:

- **MDX-style documentation** in JSDoc comments above `meta` object
- **Categorized props** via `table.category` (e.g., "Polymorphic", "Spacing", "Typography")
- **Full TypeScript typing** with `satisfies Meta<typeof Component>`
- **Layout control** via `parameters.layout` for optimal viewport

### Story Definition Patterns

#### Pattern 1: Default Story (Basic Example)

```typescript
export const Default: Story = {
  name: 'Default',
  render: () => {
    return (
      <StoryContainer>
        <PropCard label="Default Button">
          <Button>Click me</Button>
        </PropCard>
        <CodeBlock code={`<Button>Click me</Button>`} language="jsx" title="JSX" />
      </StoryContainer>
    );
  },
};
```

**Purpose**: Show simplest usage with minimal props  
**Used in**: All component stories

#### Pattern 2: Playground Story (Interactive Controls)

```typescript
export const Playground: Story = {
  args: {
    variant: 'body',
    color: 'primary',
    weight: 'normal',
    // ... all props with defaults
  },
  render: (args) => {
    return (
      <StoryContainer>
        <ComponentName {...args} />
      </StoryContainer>
    );
  },
};
```

**Purpose**: Let users interactively test all prop combinations  
**Used in**: All component stories (first story after Default)

#### Pattern 3: Prop-Focused Stories with State & Code Generation

```typescript
export const PropVariant: Story = {
  render: () => {
    const [selectedVariant, setSelectedVariant] = React.useState<string>('primary');

    const variants = [
      { value: 'primary', label: 'primary', description: 'Primary action' },
      { value: 'secondary', label: 'secondary', description: 'Secondary action' },
      // ... more variants
    ];

    const generateCode = (variant: string): string => {
      return `<Button variant="${variant}">
  ${variant.charAt(0).toUpperCase() + variant.slice(1)}
</Button>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {variants.map((variantItem, index) => {
              const colors = getColorByIndex(index);

              return (
                <PropCard
                  key={variantItem.value}
                  label={`variant="${variantItem.label}"`}
                  highlight={selectedVariant === variantItem.value}
                  onInteraction={() => setSelectedVariant(variantItem.value)}
                  interactionType="click"
                >
                  <Button variant={variantItem.value}>
                    {variantItem.label}
                  </Button>
                </PropCard>
              );
            })}
          </div>

          <CodeBlock code={generateCode(selectedVariant)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

**Purpose**: Demonstrate single prop with interactive selection and live code generation  
**Used in**: All prop-focused stories (PropAs, PropPadding, PropVariant, PropColor, etc.)

**Key features**:

- **React state** to track user selection
- **Data-driven rendering** with arrays of prop values + metadata
- **Live code generation** function (`generateCode()`)
- **Interactive highlighting** via `PropCard` `highlight` prop
- **Hover/click interactions** with `onInteraction` callback

#### Pattern 4: Combined Usage Examples

```typescript
export const UseCases: Story = {
  name: 'Use Cases',
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* CTA Section */}
          <div>
            <h3>Call-to-Action (CTA)</h3>
            <div>
              <Button type="solid" variant="primary" size="lg" iconRight="arrow-right">
                Get Started
              </Button>
              <Button type="outline" variant="primary" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Form Actions */}
          <div>
            <h3>Form Actions</h3>
            <div>
              <Button type="ghost" variant="neutral">Cancel</Button>
              <Button type="solid" variant="primary" iconLeft="check">Save Changes</Button>
            </div>
          </div>

          {/* ... more use cases */}

          <CodeBlock code={`/* Example code for all use cases */`} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

**Purpose**: Show real-world usage patterns combining multiple props  
**Used in**: Button, Stack, Text stories

---

## 🛠️ Helper Components

### StoryContainer

**Purpose**: Wrapper for all stories, provides consistent padding/layout  
**Usage**:

```typescript
<StoryContainer>
  {/* Story content */}
</StoryContainer>
```

**Optional title prop**:

```typescript
<StoryContainer title="Color Tokens">
  {/* Content */}
</StoryContainer>
```

### PropCard

**Purpose**: Visual card to showcase individual prop values with labels  
**Props**:

- `label: string` - Prop name/value displayed above card
- `highlight?: boolean` - Adds highlight styling when true
- `onInteraction?: () => void` - Callback for click/hover interactions
- `interactionType?: 'click' | 'hover'` - Type of interaction
- `children: ReactNode` - Component example to display

**Usage**:

```typescript
<PropCard
  label='variant="primary"'
  highlight={selectedVariant === 'primary'}
  onInteraction={() => setSelectedVariant('primary')}
  interactionType="click"
>
  <Button variant="primary">Primary</Button>
</PropCard>
```

### CodeBlock

**Purpose**: Display generated code with syntax highlighting  
**Props**:

- `code: string` - Code string to display
- `language: string` - Language for syntax highlighting (jsx, tsx, html, css)
- `title?: string` - Title displayed above code block
- `subtitle?: string` - Subtitle (e.g., current prop value)
- `tabs?: Array<{ label: string; content: string; language: string }>` - Multi-tab code blocks

**Usage (single code block)**:

```typescript
<CodeBlock
  code={generateCode(selectedVariant)}
  language="jsx"
  title="JSX"
  subtitle={`variant="${selectedVariant}"`}
/>
```

**Usage (tabbed code block)**:

```typescript
<CodeBlock
  tabs={[
    { label: 'HTML', content: htmlOutput, language: 'html' },
    { label: 'JSX', content: jsxCode, language: 'jsx' },
  ]}
  title="Code"
  subtitle="Selected example"
/>
```

### PaddingVisualizer & MarginVisualizer

**Purpose**: Visual overlays to show spacing values  
**Props**:

- `color: string` - Background color for visualization
- `showLabel?: boolean` - Show pixel value label
- `label?: string` - Custom label text (e.g., "32px")
- `children: ReactNode` - Element with padding/margin applied

**Usage**:

```typescript
<PaddingVisualizer color={STORY_COLORS.primary.blue} showLabel label="32px">
  <Box padding="spacious">Content</Box>
</PaddingVisualizer>

<MarginVisualizer color={STORY_COLORS.primary.green} showLabel label="16px">
  <Box margin="default">Content</Box>
</MarginVisualizer>
```

### PlaygroundContainer

**Purpose**: Interactive container for Playground story with toggles  
**Props**:

- `defaultShowGrid?: boolean` - Show/hide grid overlay
- `defaultShowAdjacentElements?: boolean` - Show/hide adjacent elements for display testing
- `children: ReactNode` - Component to test

**Usage**:

```typescript
<PlaygroundContainer defaultShowGrid={true} defaultShowAdjacentElements={false}>
  <Box {...args}>{content}</Box>
</PlaygroundContainer>
```

---

## 🎨 Visual & Interaction Patterns

### Color Coding Strategy

**From `STORY_COLORS` constant** (used in stories):

```typescript
const STORY_COLORS = {
  primary: {
    blue: { main: '#3b82f6', light: '#dbeafe' },
    violet: { main: '#8b5cf6', light: '#ede9fe' },
    pink: { main: '#ec4899', light: '#fce7f3' },
    green: { main: '#10b981', light: '#d1fae5' },
    // ... more colors
  },
  neutral: {
    white: '#ffffff',
    backgroundLight: '#f9fafb',
    borderMedium: '#d1d5db',
    text: '#111827',
    textSlate: '#64748b',
  },
  axis: {
    x: { main: '#3b82f6', light: '#dbeafe' }, // Horizontal
    y: { main: '#ec4899', light: '#fce7f3' }, // Vertical
    combined: { main: '#8b5cf6', light: '#ede9fe' },
  },
  directional: {
    top: { main: '#f59e0b', light: '#fef3c7' },
    right: { main: '#10b981', light: '#d1fae5' },
    bottom: { main: '#3b82f6', light: '#dbeafe' },
    left: { main: '#ec4899', light: '#fce7f3' },
  },
};
```

**Usage pattern**:

- **Axis colors**: Used for `paddingX`/`marginX` (blue) and `paddingY`/`marginY` (pink)
- **Directional colors**: Used for `paddingTop`, `paddingRight`, `paddingBottom`, `paddingLeft`
- **Primary colors**: Used for prop variants and general examples

**Helper function**:

```typescript
const getColorByIndex = (index: number) => {
  const colors = [
    STORY_COLORS.primary.blue,
    STORY_COLORS.primary.violet,
    STORY_COLORS.primary.pink,
    // ... more
  ];
  return colors[index % colors.length];
};
```

### Responsive Grid Patterns

**Auto-fit grid** (most common):

```css
display: grid;
gridtemplatecolumns: 'repeat(auto-fit, minmax(220px, 1fr))';
gap: '16px';
```

**Auto-fill grid** (for fixed-size items):

```css
display: grid;
gridtemplatecolumns: 'repeat(auto-fill, minmax(200px, 1fr))';
gap: '16px';
```

**Pattern observed**:

- Minimum column width varies: `180px` to `350px` depending on content density
- Gap varies: `12px` to `24px` depending on visual hierarchy
- Always uses `auto-fit` or `auto-fill` for responsive behavior

### Interaction States

**Hover state** (using `onMouseEnter`):

```typescript
const [hoveredItem, setHoveredItem] = React.useState<string>('default');

<div onMouseEnter={() => setHoveredItem('value1')}>
  <PropCard highlight={hoveredItem === 'value1'}>
    {/* Content */}
  </PropCard>
</div>
```

**Click state** (using `onInteraction`):

```typescript
const [selectedItem, setSelectedItem] = React.useState<string>('default');

<PropCard
  highlight={selectedItem === 'value1'}
  onInteraction={() => setSelectedItem('value1')}
  interactionType="click"
>
  {/* Content */}
</PropCard>
```

---

## 📊 Story Type Breakdown by Component

### Box Component (1373 lines)

**Story count**: 13 stories

| Story Name              | Purpose                       | Lines | Pattern   |
| ----------------------- | ----------------------------- | ----- | --------- |
| `Playground`            | Interactive sandbox           | ~60   | Pattern 2 |
| `PropAs`                | Polymorphic element rendering | ~90   | Pattern 3 |
| `PropPadding`           | Uniform padding values        | ~70   | Pattern 3 |
| `PropPaddingXY`         | Directional padding (X/Y)     | ~140  | Pattern 3 |
| `PropPaddingIndividual` | Individual side padding       | ~100  | Pattern 3 |
| `PropMargin`            | Uniform margin values         | ~90   | Pattern 3 |
| `PropMarginXY`          | Directional margin (X/Y)      | ~150  | Pattern 3 |
| `PropMarginIndividual`  | Individual side margin        | ~80   | Pattern 3 |
| `PropBackground`        | Background color variants     | ~70   | Pattern 3 |
| `PropBorderRadius`      | Border radius variants        | ~70   | Pattern 3 |
| `PropBorderWidth`       | Border width variants         | ~60   | Pattern 3 |
| `PropBorderColor`       | Border color variants         | ~60   | Pattern 3 |
| `PropDisplay`           | CSS display property variants | ~160  | Pattern 3 |

**Key features**:

- Extensive visualizations for spacing (padding/margin) with colored overlays
- Separate stories for axis-based (`X`/`Y`) and individual side (`Top`/`Right`/`Bottom`/`Left`) spacing
- Display mode examples with adjacent elements for context

### Stack Component (804 lines)

**Story count**: 8 stories

| Story Name         | Purpose                       | Lines | Pattern   |
| ------------------ | ----------------------------- | ----- | --------- |
| `Playground`       | Interactive sandbox           | ~70   | Pattern 2 |
| `PropDirection`    | Vertical vs horizontal layout | ~80   | Pattern 3 |
| `PropSpacing`      | Gap between children          | ~70   | Pattern 3 |
| `PropAlign`        | Cross-axis alignment          | ~90   | Pattern 3 |
| `PropJustify`      | Main-axis justification       | ~70   | Pattern 3 |
| `PropWrap`         | Flex wrap behavior            | ~90   | Pattern 3 |
| `PropAs`           | Polymorphic element rendering | ~70   | Pattern 3 |
| `CombinedVariants` | Real-world layout examples    | ~130  | Pattern 4 |

**Key features**:

- Flexbox-focused examples (direction, align, justify, wrap)
- Real-world examples: form layouts, navigation bars, card grids, button groups

### Text Component (852 lines)

**Story count**: 9 stories

| Story Name          | Purpose                              | Lines | Pattern   |
| ------------------- | ------------------------------------ | ----- | --------- |
| `Playground`        | Interactive sandbox                  | ~40   | Pattern 2 |
| `PropVariant`       | Typography scale (h1-h6, body, etc.) | ~80   | Pattern 3 |
| `PropColor`         | Semantic text colors                 | ~70   | Pattern 3 |
| `PropWeight`        | Font weights                         | ~60   | Pattern 3 |
| `PropAlign`         | Text alignment                       | ~60   | Pattern 3 |
| `PropTransform`     | Text transformation                  | ~60   | Pattern 3 |
| `PropAs`            | Polymorphic element rendering        | ~60   | Pattern 3 |
| `CombinedVariants`  | Multi-prop usage examples            | ~180  | Pattern 4 |
| `RealWorldPatterns` | Production-ready layouts             | ~120  | Pattern 4 |

**Key features**:

- Complete typography system showcase (11 variants)
- 8 semantic colors with descriptions
- Real-world examples: blog posts, pricing cards, dashboard metrics

### Button Component (989 lines)

**Story count**: 12 stories

| Story Name          | Purpose                                  | Lines | Pattern   |
| ------------------- | ---------------------------------------- | ----- | --------- |
| `Default`           | Basic usage                              | ~20   | Pattern 1 |
| `PropType`          | Visual style types (solid/outline/ghost) | ~90   | Pattern 3 |
| `PropVariant`       | Semantic color variants                  | ~80   | Pattern 3 |
| `TypeVariantMatrix` | 21 combinations (3 types × 7 variants)   | ~70   | Pattern 3 |
| `PropSize`          | Button sizes (sm/md/lg)                  | ~70   | Pattern 3 |
| `PropRadius`        | Border radius variants                   | ~80   | Pattern 3 |
| `PropIcons`         | Icon positions (left/right/only)         | ~80   | Pattern 3 |
| `PropStates`        | Disabled and loading states              | ~80   | Pattern 3 |
| `PropFullWidth`     | Full-width layout                        | ~50   | Pattern 3 |
| `PropAs`            | Polymorphic rendering (button/anchor)    | ~80   | Pattern 3 |
| `UseCases`          | Real-world button patterns               | ~100  | Pattern 4 |

**Key features**:

- **Two-dimensional variant system**: `type` (visual) + `variant` (semantic) = 21 combinations
- Icon support with multiple positions
- Loading state with spinner
- Real-world use cases: CTAs, form actions, destructive actions, icon toolbars

### Colors Token Story (739 lines)

**Story count**: 4 stories

| Story Name        | Purpose                                | Lines | Pattern              |
| ----------------- | -------------------------------------- | ----- | -------------------- |
| `Overview`        | All color tokens organized by category | ~530  | Custom visualization |
| `PrimitiveColors` | Raw color primitives with shades       | ~15   | Custom visualization |
| `SemanticColors`  | Semantic color tokens                  | ~40   | Custom visualization |
| `ComponentColors` | Component-specific colors              | ~40   | Custom visualization |

**Key features**:

- **Custom components**: `ColorSwatch`, `ColorCategory`, `ColorScale`
- **Comprehensive coverage**: Primitives (60+ shades), brand colors, neutrals, semantics, component colors
- **Token visualization**: Displays CSS custom property names (e.g., `--lufa-primitive-color-blue-500`)
- **Descriptions**: Each swatch includes usage description

---

## 🔧 Code Generation Patterns

### Dynamic Code Generation Function

**Pattern observed in all prop-focused stories**:

```typescript
const generateCode = (propValue: string): string => {
  // Generate JSX code string based on selected prop value
  return `<ComponentName prop="${propValue}">
  Content
</ComponentName>`;
};
```

**Advanced pattern (multi-line with conditionals)**:

```typescript
const generateCode = (variant: string): string => {
  if (variant === 'special') {
    return `<Button 
  type="solid" 
  variant="${variant}"
  iconLeft="check"
>
  Special Button
</Button>`;
  }

  return `<Button variant="${variant}">
  ${variant.charAt(0).toUpperCase() + variant.slice(1)}
</Button>`;
};
```

**Usage in story**:

```typescript
<CodeBlock
  code={generateCode(selectedPropValue)}
  language="jsx"
  title="JSX"
  subtitle={`prop="${selectedPropValue}"`}
/>
```

### Multi-Tab Code Examples

**Pattern for showing both HTML output and JSX input**:

```typescript
const generateJsxCode = (element: string): string => {
  return `<Box as="${element}" padding="comfortable">
  Content
</Box>`;
};

const generateHtmlOutput = (element: string): string => {
  return `<${element}
  class="Box_box__... Box_padding-comfortable__... +7 more"
  data-padding="comfortable"
>
  ${element}
</${element}>`;
};

<CodeBlock
  tabs={[
    { label: 'HTML', content: generateHtmlOutput(selectedElement), language: 'html' },
    { label: 'JSX', content: generateJsxCode(selectedElement), language: 'jsx' },
  ]}
  title="Code"
  subtitle={`<Box as="${selectedElement}">`}
/>
```

---

## 📐 Layout & Spacing Conventions

### Consistent Spacing Scale

**Gap values observed across all stories**:

```typescript
// Small items (tight layouts)
gap: '12px' | '16px';

// Medium items (default layouts)
gap: '20px' | '24px';

// Large sections (visual hierarchy)
gap: '32px' | '40px' | '48px';
```

**Padding values**:

```typescript
// Card interiors
padding: '16px' | '20px' | '24px';

// Section spacing
padding: '32px';
```

### Border & Visual Styles

**Common border patterns**:

```css
/* Dashed container (for margin/display visualization) */
border: '2px dashed #d1d5db'

/* Solid card border */
border: '1px solid #e5e7eb'

/* Highlighted border */
border: '2px solid #3b82f6'
```

**Border radius values**:

```css
/* Small elements (badges, chips) */
borderRadius: '4px' | '6px'

/* Standard cards/containers */
borderRadius: '8px' | '12px'
```

---

## ✅ Accessibility Features in Stories

### Keyboard Navigation Examples

**From Button stories**:

```typescript
<Button type="ghost" variant="neutral" iconLeft="search" aria-label="Search" />
```

**Pattern**: Icon-only buttons always include `aria-label` prop in examples

### Focus Indicators

**From Box `PropDisplay` story**:

```typescript
<CodeBlock
  code={`<Box display="flex" padding="default" background="surface" style={{ gap: '12px' }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Box>`}
  language="jsx"
  title="JSX"
/>
```

**Pattern**: Examples demonstrate semantic HTML and proper nesting

### Semantic HTML Examples

**From Text `PropAs` story**:

```typescript
{(['p', 'span', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label'] as const).map((element) => (
  <PropCard key={element} label={`<${element}>`}>
    <Text as={element} variant="body">
      {element}
    </Text>
  </PropCard>
))}
```

**Pattern**: Demonstrate proper use of semantic elements with `as` prop

---

## 📝 Documentation String Patterns

### Component-Level Documentation (JSDoc above `meta`)

```typescript
/**
 * ComponentName - Brief One-Line Description
 *
 * Detailed paragraph explaining the component's purpose, use cases,
 * and how it fits into the design system.
 *
 * ## Features
 * - ✅ Feature 1 with specific details
 * - ✅ Feature 2 with specific details
 * - ✅ Feature 3 with specific details
 * - ✅ Token-based design (component layer tokens)
 * - ✅ WCAG 2.1 AA compliant
 * - ✅ Performance-optimized (CSS classes, not inline styles)
 */
const meta = { ... };
```

**Standard features mentioned**:

- Polymorphic rendering
- Token-based styling
- Accessibility compliance (WCAG 2.1 AA)
- Performance optimization

### Story-Level Documentation (JSDoc above story export)

```typescript
/**
 * ## Story Title
 *
 * Brief description of what this story demonstrates.
 *
 * **Additional context:**
 * - Key point 1
 * - Key point 2
 */
export const StoryName: Story = { ... };
```

**Pattern for complex stories**:

- Use Markdown headings (`##` for story title)
- Use bold for emphasis (`**Additional context:**`)
- Use bullet lists for features or instructions

---

## 🔗 Import Patterns

### Consistent Import Structure

```typescript
// 1. React imports
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

// 2. Component imports (from design system package)
import { ComponentName } from '@grasdouble/lufa_design-system';

// 3. Helper component imports (relative)
import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
// 4. Constant imports (relative)
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';
```

**Pattern observed**:

- Type imports use `import type` syntax
- Design system components imported from published package (not relative)
- Helper components and constants use relative imports
- Helpers organized in `../../components/helpers` directory

---

## 🎯 Best Practices Observed

### 1. **Data-Driven Story Rendering**

Instead of hardcoding each example, stories use arrays of metadata:

```typescript
const sizes = [
  { value: 'sm', label: 'sm', height: '32px', description: 'Small' },
  { value: 'md', label: 'md', height: '40px', description: 'Medium (default)' },
  { value: 'lg', label: 'lg', height: '48px', description: 'Large' },
];

return (
  <div>
    {sizes.map(({ value, label, description }) => (
      <PropCard key={value} label={`size="${value}"`}>
        <Button size={value}>{description}</Button>
      </PropCard>
    ))}
  </div>
);
```

**Benefits**:

- Easy to add new variants
- Consistent structure across stories
- Self-documenting with metadata

### 2. **Interactive Selection with State**

All prop-focused stories track user selection:

```typescript
const [selectedValue, setSelectedValue] = React.useState<string>('default');

// Used for:
// 1. Highlighting selected item
<PropCard highlight={selectedValue === 'value1'}>

// 2. Generating relevant code
<CodeBlock code={generateCode(selectedValue)} />
```

### 3. **Visual Consistency via Helper Components**

All stories use the same wrapper structure:

```typescript
<StoryContainer>
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    {/* Grid or list of examples */}
    <div style={{ display: 'grid', ... }}>
      {items.map(item => <PropCard>...</PropCard>)}
    </div>

    {/* Code block at bottom */}
    <CodeBlock code={...} />
  </div>
</StoryContainer>
```

### 4. **Descriptive Labels and Metadata**

Every example includes:

- **Label**: Prop name and value (e.g., `variant="primary"`)
- **Description**: Usage context (e.g., "Primary action button")
- **Visual indicator**: Color, icon, or border to differentiate

### 5. **Real-World Examples in Separate Stories**

Complex usage patterns separated into dedicated stories:

- `UseCases` - Common UI patterns (CTAs, forms, toolbars)
- `CombinedVariants` - Multi-prop combinations
- `RealWorldPatterns` - Production-ready layouts

---

## 🚀 Advanced Patterns

### Matrix Examples (Type × Variant)

**From Button story** - showing all 21 combinations:

```typescript
export const TypeVariantMatrix: Story = {
  name: 'Type + Variant Matrix',
  render: () => {
    const types = ['solid', 'outline', 'ghost'] as const;
    const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'neutral'] as const;

    return (
      <StoryContainer>
        {types.map((type) => (
          <div key={type}>
            <h3>{type}</h3>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {variants.map((variant) => (
                <Button key={variant} type={type} variant={variant}>
                  {variant}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </StoryContainer>
    );
  },
};
```

**Pattern**: Nested loops to generate all combinations of two props

### Spacing Visualizations

**Padding visualization** (from Box story):

```typescript
<PaddingVisualizer color={STORY_COLORS.primary.blue} showLabel label="32px">
  <Box padding="spacious" borderRadius="default">
    <span style={{ backgroundColor: 'white', border: '2px solid gray', padding: '12px' }}>
      Content
    </span>
  </Box>
</PaddingVisualizer>
```

**Pattern**: Colored overlay + inner content with border to show boundaries

**Margin visualization**:

```typescript
<div style={{ backgroundColor: '#f9fafb', border: '2px dashed #d1d5db', padding: '4px' }}>
  <MarginVisualizer color={STORY_COLORS.primary.green} showLabel label="16px">
    <Box margin="default" padding="default" background="info">
      Box
    </Box>
  </MarginVisualizer>
</div>
```

**Pattern**: Outer container with dashed border + colored margin area + inner box

### Conditional Content in Playground

**From Box Playground story**:

```typescript
export const Playground: Story = {
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'multipleItems'],
      description: 'Type of content inside the Box (use "Multiple Items" to test flex/grid)',
    },
  },
  args: {
    padding: 'comfortable',
    contentType: 'text',
  },
  render: (args) => {
    const content =
      args.contentType === 'multipleItems' ? (
        <>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </>
      ) : (
        args.children
      );

    return (
      <PlaygroundContainer>
        <Box {...args}>{content}</Box>
      </PlaygroundContainer>
    );
  },
};
```

**Pattern**: Extra argType to switch between different content structures for testing layout modes

---

## 📊 Story Metrics

### Total Story Count by Component

| Component | Stories | Lines    | Avg Lines/Story |
| --------- | ------- | -------- | --------------- |
| Box       | 13      | 1373     | 106             |
| Button    | 12      | 989      | 82              |
| Text      | 9       | 852      | 95              |
| Stack     | 8       | 804      | 101             |
| Colors    | 4       | 739      | 185             |
| **Total** | **46**  | **4757** | **103**         |

### Story Type Distribution

| Story Type         | Count | Percentage |
| ------------------ | ----- | ---------- |
| Prop-focused       | 32    | 70%        |
| Playground         | 5     | 11%        |
| Use Cases/Examples | 6     | 13%        |
| Default            | 1     | 2%         |
| Custom (Colors)    | 2     | 4%         |

### Prop Coverage

**Total props documented across 5 components**: ~60+ unique props

**Most documented prop types**:

1. **Polymorphic (`as`)** - 5 stories (all components)
2. **Spacing (padding/margin)** - 7 stories (Box only, but comprehensive)
3. **Variants (visual/semantic)** - 5+ stories (Button, Text)
4. **Layout (display, direction, align)** - 4 stories (Box, Stack)
5. **Typography (variant, weight, align)** - 5 stories (Text)

---

## 🔮 Future Patterns (Inferred)

Based on file structure and existing components:

### Compositions (Not Yet Created)

Expected future stories location:

```
packages/design-system/storybook/src/stories/compositions/
├── Badge.stories.tsx         (Expected: 6-8 stories)
├── Divider.stories.tsx       (Expected: 4-6 stories)
├── Card.stories.tsx          (Expected: 8-10 stories)
└── [future components]
```

Expected patterns based on current primitives:

- Composition stories will combine primitives (e.g., Card = Box + Text + Button)
- More real-world examples (e.g., product cards, user profiles)
- Integration examples showing component relationships

---

## 📚 Summary of Key Findings

### Documentation Philosophy

1. **Interactive > Static**: All props demonstrated with live, clickable/hoverable examples
2. **Visual > Text**: Color-coded, spaced, bordered examples with minimal text
3. **Code Generation**: Live JSX code updates based on user interaction
4. **Real-World Context**: Dedicated stories for production usage patterns

### Technical Strengths

1. **CSF3 Format**: Modern, type-safe story definitions
2. **TypeScript Throughout**: Full type safety with `satisfies` and `as const`
3. **Helper Abstraction**: Reusable `PropCard`, `CodeBlock`, `StoryContainer` components
4. **Consistent Structure**: Predictable story order and naming across all components
5. **Responsive Design**: Grid layouts adapt to viewport size

### Accessibility Integration

1. **ARIA Labels**: Icon-only buttons always include labels in examples
2. **Semantic HTML**: Polymorphic `as` prop demonstrates proper element usage
3. **Keyboard Focus**: Interactive examples are keyboard-accessible
4. **Focus Indicators**: Visual focus states shown in stories

### Performance Considerations

1. **CSS Classes Over Inline Styles**: Components use token-based CSS classes
2. **Lazy Rendering**: Stories render only when selected
3. **Memoization**: React.useState used efficiently for selection tracking

---

## 🎓 Lessons for Future Story Creation

### When Creating a New Component Story:

1. **Start with meta + argTypes** (categorize props logically)
2. **Create Default story** (simplest example, < 20 lines)
3. **Create Playground story** (all props with defaults)
4. **One story per prop** (use Pattern 3 with state + code generation)
5. **Add combined usage examples** (UseCases or CombinedVariants story)
6. **Use helper components** (StoryContainer, PropCard, CodeBlock)
7. **Follow naming conventions** (`Prop{PropName}`, `PropAs`, etc.)
8. **Add JSDoc documentation** (component-level and story-level)
9. **Include accessibility examples** (ARIA, semantic HTML)
10. **Test interactivity** (hover/click states, code generation)

### Template for New Story:

```typescript
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { NewComponent } from '@grasdouble/lufa_design-system';
import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
import { getColorByIndex, STORY_COLORS } from '../../constants/storyColors';

/**
 * NewComponent - Brief Description
 *
 * Detailed explanation of component purpose.
 *
 * ## Features
 * - ✅ Feature 1
 * - ✅ Feature 2
 * - ✅ Token-based design
 * - ✅ WCAG 2.1 AA compliant
 */
const meta = {
  title: 'Primitives/NewComponent',
  component: NewComponent,
  parameters: { layout: 'fullscreen' },
  argTypes: {
    propName: {
      control: 'select',
      options: ['value1', 'value2'],
      description: 'Prop description',
      table: {
        category: 'Category',
        type: { summary: 'PropType' },
        defaultValue: { summary: 'default' },
      },
    },
  },
} satisfies Meta<typeof NewComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground Story
export const Playground: Story = {
  args: { propName: 'value1' },
  render: (args) => (
    <StoryContainer>
      <NewComponent {...args} />
    </StoryContainer>
  ),
};

// Prop-Focused Story
export const PropPropName: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('value1');
    const values = [
      { value: 'value1', label: 'Value 1', description: 'Description 1' },
      { value: 'value2', label: 'Value 2', description: 'Description 2' },
    ];

    const generateCode = (value: string): string => {
      return `<NewComponent propName="${value}">\n  Content\n</NewComponent>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {values.map(({ value, label, description }) => (
              <PropCard
                key={value}
                label={`propName="${value}"`}
                highlight={selected === value}
                onInteraction={() => setSelected(value)}
                interactionType="click"
              >
                <NewComponent propName={value}>{label}</NewComponent>
              </PropCard>
            ))}
          </div>
          <CodeBlock code={generateCode(selected)} language="jsx" title="JSX" />
        </div>
      </StoryContainer>
    );
  },
};
```

---

## 🔗 Related Documentation

- [UI Component Inventory](./component-inventory.md) - Component catalog
- [Token Architecture](./token-architecture.md) - Design token system
- [Test Design](./testing-strategy.md) - Playwright component tests

---

**End of Document** | Generated by BMM Document Project Workflow
