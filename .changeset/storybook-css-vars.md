---
"@grasdouble/lufa_design-system-storybook": patch
---

Replace TypeScript token imports with CSS custom properties in component stories

This change refactors 21 component story files to use CSS custom properties (CSS variables) instead of TypeScript token imports. This makes the Storybook more flexible and reduces build-time dependencies on the tokens package.

**Files updated:**
- Layout stories (10 files): AspectRatio, Center, Container, Divider, Flex, Grid, Layout, Placeholder, Space, Stack
- Display stories (6 files): Avatar, AvatarGroup, Badge, Card, Kbd, Paper
- Feedback stories (1 file): Alert
- Forms stories (2 files): Button, Input
- Navigation stories (2 files): Breadcrumb, Steps

**Changes:**
- Removed `import tokens from '@grasdouble/lufa_design-system-tokens'` from all story files
- Replaced all token references (e.g., `tokens.color.text.primary`) with CSS custom properties (e.g., `'var(--lufa-token-color-text-primary)'`)
- Maintained identical visual appearance and functionality

**Benefits:**
- Enables runtime theme switching through CSS custom properties
- Reduces TypeScript compilation overhead in Storybook
- Makes stories more aligned with modern CSS practices
- Simplifies build dependencies
