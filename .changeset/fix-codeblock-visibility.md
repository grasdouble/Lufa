---
"@grasdouble/lufa_design-system-storybook": patch
---

Fix CodeBlock component visibility in both light and dark themes

- Replace non-existent token names with correct design system tokens
- Make CodeBlock always dark (like GitHub, VS Code) for better code visibility
- Use alpha-white tokens for proper contrast on dark background
- Background now uses gray-900 (always #111827) in all themes
- Text uses background-on-primary (always white) for readability
