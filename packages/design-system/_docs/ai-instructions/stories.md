# AI Instructions: Storybook Stories

## Context

You are creating stories to document and test UI components in Storybook. These stories must not only test the component but also provide a consistent, educational visual guide for developers.

## File Structure

- **Location**: `packages/design-system/storybook/src/stories/`
- **Naming**: `[ComponentName].stories.tsx`

## Rules for Stories

### 1. Format (CSF 3.0)

- Use **Component Story Format (CSF) 3.0** objects.
- `meta` object must include `title`, `component`, `tags`, and `argTypes`.
- `Story` type MUST be imported from `@storybook/react`.

### 2. Lufa Visual Standards (⚠️ CRITICAL)

You MUST follow the specific visual style of the Lufa Design System documentation.

#### A. Colors

- **NEVER** hardcode hex values (e.g., `#fff`, `red`).
- **ALWAYS** import and use `STORY_COLORS` from `../../constants/storyColors`.
- Use `getColorByIndex(index)` for mapping over variants.

#### B. Helper Components

Use the provided helpers to structure your stories:

```typescript
import { CodeBlock, PropCard, StoryContainer } from '../../components/helpers';
```

- Wrap the entire render in `<StoryContainer>`.
- Wrap individual examples in `<PropCard label="...">`.
- Use `<CodeBlock>` to show usage examples.

#### C. Spacing Visualization (Margin/Padding)

When demonstrating spacing, use the "Border + Inner Content" pattern:

- Outer Box: Light background (`STORY_COLORS.neutral.backgroundLight`) + Dashed Border.
- Inner Content: Vibrant background (`STORY_COLORS.primary.blue.main`) + White text.
- This ensures the spacing (gap between border and content) is clearly visible.

### 3. Clean Code Generation

Stories should display clean, copy-pasteable code for developers.

- Create a `generateCode` helper function within the story file.
- **STRIP** story-specific styles (like colored backgrounds or dashed borders) from the displayed code.
- Show only the component and its relevant props.

### 4. Meta Configuration

```typescript
const meta = {
  title: 'Components/Button', // Categorized path
  component: Button,
  parameters: { layout: 'centered' }, // or 'padded'
  tags: ['autodocs'],
  argTypes: {
    // Control definitions
    variant: { control: 'select', options: ['primary', 'secondary'] },
  },
} satisfies Meta<typeof Button>;

export default meta;
```

### 5. Standard Story Structure

```typescript
export const Default: Story = {
  render: (args) => (
    <StoryContainer>
      <div style={{ display: 'flex', gap: '20px' }}>
        <PropCard label="Default">
          <Button {...args} />
        </PropCard>
      </div>
      {/* Show clean code without the wrapper styles */}
      <CodeBlock code={`<Button variant="${args.variant}">Label</Button>`} />
    </StoryContainer>
  ),
};
```

## 6. Advanced Patterns (Reference)

For complex patterns (Hover interactions, Spacing Visualizers, Playgrounds), **READ AND COPY** patterns from:
`packages/design-system/_docs/ai-instructions/templates/story-patterns.md`

## Checklist for Validation

- [ ] Uses `STORY_COLORS` (no hardcoded colors)?
- [ ] Wrapped in `<StoryContainer>`?
- [ ] Code examples are clean (no visual helper props/styles)?
- [ ] Spacing stories utilize the visual border pattern?
- [ ] Meta title follows `Category/Component`?
- [ ] Are stories typed with `Story = StoryObj<typeof meta>`?
