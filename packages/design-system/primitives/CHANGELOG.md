# @grasdouble/lufa_design-system-primitives

## 0.4.1

### Patch Changes

- fb79222: Replace TypeScript token imports with CSS custom properties in component stories

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

## 0.4.0

### Minor Changes

- 509bb8e: Change how primitives and tokens are exposed

## 0.3.0

### Minor Changes

- 0194d3d: Create a vscode extension to display value of primitives and tokens + fix usage of primitive and tokens

### Patch Changes

- 6c972e8: fix: prettier config
- 2d37fc0: Update dependencies
- 4d0893b: Update scripts and README files
- 57df928: chore: update lint and tsconfig
- 412c362: fix(chore): add missing prettier and eslint config + add a script prettier in package.json
- b101244: fix(chore): eslint config + fix new issues

## 0.2.1

### Patch Changes

- 93819d3: fix how to manage color on primitive

## 0.2.0

### Minor Changes

- 501cf5f: Rework how primitive, tokens and ds is working + align storybook and docusaurus

## 0.1.0

### Minor Changes

- 6af7149: reorganize design-system splitting prmitive, tokens and the design system
