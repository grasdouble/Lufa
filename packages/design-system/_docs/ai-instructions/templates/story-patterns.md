# AI Code Patterns: Storybook

## Usage

Copy these patterns exactly. Replace `[Component]` and props with actual values.

## PATTERN: BASIC_GRID

Use for displaying simple variants.

```typescript
export const BasicGrid: StoryObj<typeof [Component]> = {
  render: (args) => (
    <StoryContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        <PropCard label="Variant 1">
          <[Component] {...args} variant="primary" />
        </PropCard>
        <PropCard label="Variant 2">
          <[Component] {...args} variant="secondary" />
        </PropCard>
      </div>
      <CodeBlock code={`<[Component] variant="primary" />`} language="jsx" />
    </StoryContainer>
  ),
};
```

## PATTERN: SPACING_VISUALIZER

Use for Padding/Margin stories. VISUALIZE the space.

```typescript
export const PropPadding: StoryObj<typeof Box> = {
  render: () => {
    // 1. Define variants
    const variants = [
      { label: 'compact', size: '16px', val: 'compact' },
      { label: 'spacious', size: '48px', val: 'spacious' },
    ];

    return (
      <StoryContainer>
        <div style={{ display: 'grid', gap: '24px' }}>
          {variants.map((v, i) => {
            // 2. Cycle colors
            const colors = getColorByIndex(i);
            return (
              <PropCard key={v.val} label={v.label}>
                <Box
                  padding={v.val}
                  style={{
                    backgroundColor: colors.light,      // Outer background
                    border: `2px dashed ${colors.main}` // Boundary
                  }}
                >
                  <div style={{
                    backgroundColor: colors.main,       // Inner content
                    color: 'white',
                    padding: '8px'
                  }}>
                    {v.size}
                  </div>
                </Box>
              </PropCard>
            );
          })}
        </div>
      </StoryContainer>
    );
  }
};
```

## PATTERN: INTERACTIVE_HOVER

Use to update code block on hover.

```typescript
export const Interactive: StoryObj = {
  render: () => {
    const [active, setActive] = React.useState('default');

    // Helper to generate clean code
    const getCode = (val) => `<[Component] variant="${val}" />`;

    return (
      <StoryContainer>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div onMouseEnter={() => setActive('primary')}>
             <PropCard label="Primary" highlight={active === 'primary'}>
               <[Component] variant="primary" />
             </PropCard>
          </div>
          <div onMouseEnter={() => setActive('secondary')}>
             <PropCard label="Secondary" highlight={active === 'secondary'}>
               <[Component] variant="secondary" />
             </PropCard>
          </div>
        </div>
        <CodeBlock code={getCode(active)} language="jsx" />
      </StoryContainer>
    );
  }
};
```

## PATTERN: PLAYGROUND

Use for full interactive control outside of ArgsTable.

```typescript
export const Playground: StoryObj = {
  render: () => {
    const [val, setVal] = React.useState('default');

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Controls */}
          <div style={{ padding: '20px', backgroundColor: STORY_COLORS.neutral.backgroundLight }}>
             <select value={val} onChange={(e) => setVal(e.target.value)}>
               <option value="default">Default</option>
               <option value="primary">Primary</option>
             </select>
          </div>

          {/* Preview */}
          <[Component] variant={val} />

          {/* Code */}
          <CodeBlock code={`<[Component] variant="${val}" />`} />
        </div>
      </StoryContainer>
    );
  }
};
```
