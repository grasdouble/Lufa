# Operational Notes

## Addons

Installed Storybook addons:

- **@storybook/addon-themes** - Theme switcher
- **@storybook/addon-docs** - Documentation with MDX

## Deployment

Storybook is automatically deployed on pull requests and merges to main.

## Project Structure

```
storybook/
├── src/
│   ├── stories/              # Story files
│   │   ├── primitives/       # Primitive components (Box, etc.)
│   │   └── components/       # Complex components
│   ├── components/
│   │   └── helpers/          # Helper components for stories
│   │       ├── StoryContainer.tsx
│   │       ├── PropCard.tsx
│   │       ├── CodeBlock.tsx
│   │       ├── MarginVisualizer.tsx
│   │       └── README.md     # Helper documentation
│   └── constants/
│       └── storyColors.ts    # Standardized story colors
├── _docs/
│   ├── story-guide.md        # Complete guide (start here)
│   ├── story-rules.md        # Rules and standards
│   ├── story-template.md     # Copy-paste templates
├── CHANGELOG.md              # Managed by changeset
└── README.md                 # This file
```

## Story Writing Checklist

Before submitting a story:

- [ ] Uses `STORY_COLORS` for all colors
- [ ] Uses helper components (`StoryContainer`, `PropCard`, `CodeBlock`)
- [ ] Spacing stories use "border + inner content" pattern
- [ ] Code examples are clean (no story-specific styling)
- [ ] Follows naming conventions
- [ ] TypeScript compiles without errors

**Full checklist:** See [Story Guide](./story-guide.md#story-writing-checklist)
