---
"@grasdouble/lufa_design-system-storybook": patch
---

feat(storybook): recreate Button story following Storybook rules

**Changes:**
- Rewritten Button.stories.tsx to comply with Storybook package rules
- Uses StoryContainer, PropCard, CodeBlock helpers (no raw HTML styling)
- Uses STORY_COLORS constants (no hardcoded hex values)
- 11 comprehensive stories covering all Button props and use cases
- Follows template patterns from Box.stories.tsx

**Stories:**
1. Default - Basic example
2. PropType - Visual style types (solid/outline/ghost)
3. PropVariant - Semantic variants (primary/secondary/success/danger/warning/info/neutral)
4. TypeVariantMatrix - All 21 type+variant combinations
5. PropSize - Size variants (sm/md/lg)
6. PropRadius - Radius options (none/sm/base/md/full)
7. PropIcons - Icon configurations (left/right/both/icon-only)
8. PropStates - Disabled and loading states
9. PropFullWidth - Full width behavior
10. PropAs - Polymorphic rendering (button/anchor)
11. UseCases - Real-world button patterns (CTA, forms, destructive, toolbar)

**Compliance:**
- ✅ STORY_RULES.md - Color management with STORY_COLORS
- ✅ STORY_TEMPLATE.md - Proper story structure
- ✅ README.md - Helper components usage
