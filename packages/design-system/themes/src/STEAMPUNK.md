# 🎩⚙️ Steampunk Theme - Neo Victorian Industrial

A Victorian-era industrial aesthetic theme for the Lufa Design System, combining brass, copper, bronze tones with mechanical and steam-powered design elements.

## 🎨 Color Palette

### Light Mode (Victorian Daylight)

- **Primary**: Brass & Copper (#B87333, #A0632B, #8B4513)
- **Secondary**: Oxidized Copper Green (#2E8B57, #267347, #1F5A37)
- **Background**: Warm Parchment (#F5E6D3)
- **Surface**: Aged Paper (#EAD9C2)
- **Text**: Dark Bronze (#2C1810)

### Dark Mode (Industrial Night)

- **Primary**: Glowing Brass (#CD853F, #DEB887)
- **Secondary**: Bright Patina (#3CB371, #66CDAA)
- **Background**: Deep Workshop Darkness (#1A0F0A)
- **Surface**: Dark Bronze (#2C1810)
- **Text**: Parchment (#F5E6D3)

### High Contrast Mode (Schematic Blueprint)

- **Primary**: Bright Brass (#FFB347, #FFD700)
- **Secondary**: Bright Patina (#00FA9A, #7FFFD4)
- **Background**: Pure Black (#000000)
- **Text**: Pure White (#FFFFFF)

## 🔧 Features

### Base Theme (`steampunk.css`)

- ✅ Complete token system (31 tokens per mode)
- ✅ Light, Dark, and High Contrast modes
- ✅ Semantic color tokens for success/error/warning/info
- ✅ Accessible contrast ratios
- ✅ Compatible with all Lufa Design System components

### Docusaurus Enhancements (`steampunk-docusaurus.css`)

- 🎭 **Victorian Typography**: Cinzel headings, Crimson Text body, Special Elite monospace
- ⚙️ **Decorative Elements**: Brass borders, gear icons, mechanical shadows
- 📜 **Blueprint Code Blocks**: Grid patterns and industrial styling
- 🏛️ **Enhanced Components**: Navbar, sidebar, buttons, tables with steampunk aesthetics
- 🎨 **Brass Scrollbars**: Custom-styled scrollbars with metallic effects
- 🌟 **Hover Effects**: Glowing brass effects and shadow transitions

## 📦 Installation

### 1. Build the theme package

```bash
cd packages/design-system/themes
pnpm build
```

### 2. Apply the theme to Docusaurus

The theme is already configured in `custom.css`:

```css
/* Steampunk Theme - Neo Victorian Industrial */
@import '@grasdouble/lufa_design-system-themes/steampunk.css';
@import './steampunk-docusaurus.css';
```

### 3. Set the theme attribute

Add the theme attribute to your HTML element:

```html
<html data-color-theme="steampunk" data-mode="light"></html>
```

Or use the theme switcher in your Docusaurus site.

## 🎯 Usage

### Setting the Theme

You can set the theme in multiple ways:

#### Option A: Default theme in `docusaurus.config.ts`

```typescript
export default {
  themeConfig: {
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
  },
};
```

Then add to your site's JavaScript:

```javascript
document.documentElement.setAttribute('data-color-theme', 'steampunk');
```

#### Option B: Custom theme switcher component

```tsx
const ThemeSwitcher = () => {
  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-color-theme', theme);
  };

  return (
    <select onChange={(e) => setTheme(e.target.value)}>
      <option value="ocean">Ocean</option>
      <option value="steampunk">Steampunk</option>
      <option value="cyberpunk">Cyberpunk</option>
    </select>
  );
};
```

### Switching Color Modes

The theme supports three color modes:

```javascript
// Light mode (Victorian daylight)
document.documentElement.setAttribute('data-mode', 'light');

// Dark mode (Industrial night)
document.documentElement.setAttribute('data-mode', 'dark');

// High contrast (Blueprint schematic)
document.documentElement.setAttribute('data-mode', 'high-contrast');
```

## 🎨 Customization

### Adjusting Colors

Override specific tokens in your custom CSS:

```css
[data-color-theme='steampunk'][data-mode='light'] {
  /* Make brass more golden */
  --lufa-core-brand-primary: #daa520;

  /* Adjust background warmth */
  --lufa-core-neutral-background: #fff8e7;
}
```

### Adding Custom Decorations

Add more steampunk elements:

```css
[data-color-theme='steampunk'] .custom-element {
  border: 2px solid var(--lufa-core-brand-primary);
  box-shadow:
    0 4px 8px rgba(139, 69, 19, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Typography Alternatives

Replace the Google Fonts with other Victorian-style fonts:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

:root {
  --ifm-heading-font-family: 'Playfair Display', serif;
}
```

## 🖼️ Design Elements

### Gear Icons

Decorative gear symbols (⚙) are used throughout:

- Section headings (h2::before)
- Horizontal rules (hr::after)
- Navigation active states

### Brass Effects

- Double borders on navbar and footer
- Gradient backgrounds (top-to-bottom brass shading)
- Inset highlights for 3D embossed look
- Drop shadows with warm brown tones

### Blueprint Patterns

- Grid overlay on code blocks
- Technical specification table styling
- Schematic-inspired high contrast mode

### Victorian Typography

- **Cinzel**: Elegant serif for headings (uppercase with letter spacing)
- **Crimson Text**: Readable serif for body text
- **Special Elite**: Typewriter-style for code (authentic mechanical feel)

## 🎭 Theme Philosophy

The Steampunk theme embodies:

1. **Historical Authenticity**: Victorian-era industrial design (1837-1901)
2. **Mechanical Beauty**: Exposed gears, brass fittings, rivets, and pipes
3. **Material Honesty**: Real metallic colors (no artificial neons)
4. **Craftsmanship**: Hand-tooled appearance with attention to detail
5. **Steam Power**: Warm, organic energy (not cold electricity)

## 🧪 Testing

### Accessibility

- ✅ WCAG AA contrast ratios (4.5:1 for text)
- ✅ High contrast mode for visual impairments
- ✅ Keyboard navigation support
- ✅ Screen reader compatible

### Browser Support

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS/Android)

### Validation

Use the Lufa CLI to validate the theme:

```bash
pnpm lufa-validate-theme packages/design-system/themes/src/steampunk.css
```

## 📚 Resources

### Inspiration

- Victorian industrial revolution (1760-1840)
- Jules Verne and H.G. Wells literature
- Steampunk art movement (1980s-present)
- Brass age of comic books
- Mechanical engineering blueprints

### Color References

- Brass: #B87333
- Copper: #CD853F
- Bronze: #8B4513
- Patina: #2E8B57
- Rust: #B7410E
- Gunmetal: #2C3539
- Steam: #708090

### Typography

- [Cinzel](https://fonts.google.com/specimen/Cinzel) - Roman capitals inspired
- [Crimson Text](https://fonts.google.com/specimen/Crimson+Text) - Classic book typography
- [Special Elite](https://fonts.google.com/specimen/Special+Elite) - Typewriter font

## 🤝 Contributing

To improve the Steampunk theme:

1. Follow the existing token structure
2. Maintain WCAG AA accessibility standards
3. Test in all three color modes
4. Keep the Victorian-industrial aesthetic
5. Document any new custom properties

## 📄 License

Part of the Lufa Design System - MIT License

---

**Created by**: BMad Master 🧙  
**Version**: 1.0.0  
**Last Updated**: 2026-02-08

⚙️ _"The difference between the impossible and the possible lies in a person's determination."_ - Jules Verne
