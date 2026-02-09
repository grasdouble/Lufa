# 🎨 Theme Switcher Component

Interactive theme and color mode switcher for Docusaurus sites using the Lufa Design System.

## 📦 Features

- ✅ **10 Theme Options**: Ocean, Forest, Matrix, Cyberpunk, Sunset, Nordic, Volcano, Coffee, Volt, and **Steampunk**
- 🌓 **3 Color Modes**: Light, Dark, and High Contrast
- 💾 **Persistent Selection**: Saves theme/mode to localStorage
- 🎭 **Beautiful UI**: Dropdown with icons and descriptions
- ⚙️ **Steampunk Enhanced**: Special styling for steampunk theme
- 📱 **Responsive**: Mobile-friendly interface
- ♿ **Accessible**: Keyboard navigation and ARIA labels

## 🎯 Usage

The ThemeSwitcher is automatically integrated into the Docusaurus navbar via the swizzled `Navbar/Content` component.

### Default Theme

By default, the site loads with the **Steampunk** theme in **Light** mode. This is set in the component's initialization:

```typescript
const [currentTheme, setCurrentTheme] = useState<ThemeName>('steampunk');
const [currentMode, setCurrentMode] = useState<ColorMode>('light');
```

### Changing Themes

Users can change themes by:

1. **Clicking the theme button** in the navbar (shows current theme icon and name)
2. **Selecting a theme** from the dropdown grid
3. **Choosing a color mode** (Light ☀️ / Dark 🌙 / High Contrast 🔲)

Selections are automatically saved to localStorage and persist across sessions.

## 🎨 Available Themes

| Icon | Name          | Description              | Color Palette             |
| ---- | ------------- | ------------------------ | ------------------------- |
| 🌊   | Ocean         | Marine-inspired          | Cyan, Teal, Blue          |
| 🌲   | Forest        | Organic natural          | Emerald, Green            |
| 💾   | Matrix        | Digital cyber            | Neon Green, Black         |
| 🎆   | Cyberpunk     | Futuristic neon          | Fuchsia, Cyan             |
| 🌅   | Sunset        | Warm elegant             | Orange, Rose              |
| ❄️   | Nordic        | Minimalist arctic        | Sky Blue, White           |
| 🌋   | Volcano       | Powerful intense         | Red, Orange               |
| ☕   | Coffee        | Retro vintage            | Amber, Brown              |
| ⚡   | Volt          | Industrial high-vis      | Lime, Yellow              |
| ⚙️   | **Steampunk** | **Victorian industrial** | **Brass, Copper, Bronze** |

## 🌓 Color Modes

### Light Mode

- Default mode for most themes
- High contrast text on light backgrounds
- Optimized for daylight viewing

### Dark Mode

- Inverted color scheme
- Reduced eye strain in low light
- Syncs with Docusaurus dark mode

### High Contrast Mode

- Maximum contrast ratios (WCAG AAA)
- Accessibility-focused
- Clear borders and high-visibility colors

## 🔧 Component Structure

```
src/components/ThemeSwitcher/
├── index.tsx              # Main component logic
└── ThemeSwitcher.module.css  # Component styles

src/theme/Navbar/Content/
├── index.tsx              # Swizzled navbar integration
└── styles.module.css      # Navbar wrapper styles
```

## 🎛️ Customization

### Adding a New Theme

1. **Create the theme CSS file**:

   ```bash
   # In packages/design-system/themes/src/
   touch newtheme.css
   ```

2. **Define tokens** (31 tokens × 3 modes):

   ```css
   [data-color-theme='newtheme'][data-mode='light'] {
     --lufa-core-brand-primary: #yourcolor;
     /* ... */
   }
   ```

3. **Add to package.json exports**:

   ```json
   "./newtheme.css": "./dist/newtheme.css"
   ```

4. **Add to copy script**:

   ```typescript
   // In themes/scripts/copy-themes.ts
   const themes = [
     // ...
     'newtheme.css',
   ] as const;
   ```

5. **Update ThemeSwitcher**:

   ```typescript
   type ThemeName =
     | 'ocean'
     // ...
     | 'newtheme';

   const THEMES: Theme[] = [
     // ...
     { name: 'newtheme', label: 'New Theme', icon: '🎨', description: 'Your description' },
   ];
   ```

6. **Build and test**:
   ```bash
   cd packages/design-system/themes
   pnpm build
   ```

### Changing Default Theme

Edit `ThemeSwitcher/index.tsx`:

```typescript
const [currentTheme, setCurrentTheme] = useState<ThemeName>('ocean'); // Change here
const [currentMode, setCurrentMode] = useState<ColorMode>('dark'); // Change here
```

### Styling the Switcher

Override styles in `ThemeSwitcher.module.css`:

```css
.trigger {
  /* Customize button appearance */
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
}

.dropdown {
  /* Customize dropdown */
  min-width: 400px;
}
```

### Steampunk-Specific Styles

The ThemeSwitcher automatically applies special styling when the Steampunk theme is active:

```css
[data-color-theme='steampunk'] .trigger {
  border-width: 2px;
  box-shadow: 0 2px 4px rgba(139, 69, 19, 0.3);
}

[data-color-theme='steampunk'] .themeOption.active {
  background: linear-gradient(135deg, var(--lufa-core-brand-primary) 0%, var(--lufa-core-brand-primary-hover) 100%);
}
```

## 💾 LocalStorage Keys

The component stores data using these keys:

- `lufa-theme`: Current theme name (e.g., "steampunk")
- `lufa-color-mode`: Current color mode (e.g., "light")

### Programmatic Access

```javascript
// Get current theme
const theme = localStorage.getItem('lufa-theme');

// Set theme programmatically
localStorage.setItem('lufa-theme', 'cyberpunk');
document.documentElement.setAttribute('data-color-theme', 'cyberpunk');

// Get color mode
const mode = localStorage.getItem('lufa-color-mode');

// Set color mode programmatically
localStorage.setItem('lufa-color-mode', 'dark');
document.documentElement.setAttribute('data-mode', 'dark');
```

## 🔗 Integration with Docusaurus

### Navbar Integration

The ThemeSwitcher is integrated via a swizzled Navbar/Content component:

```tsx
// src/theme/Navbar/Content/index.tsx
import ThemeSwitcher from '@site/src/components/ThemeSwitcher';
import NavbarContent from '@theme-original/Navbar/Content';

export default function NavbarContentWrapper(props) {
  return (
    <>
      <NavbarContent {...props} />
      <ThemeSwitcher />
    </>
  );
}
```

### Syncing with Docusaurus Dark Mode

The component automatically syncs with Docusaurus's built-in dark mode:

```typescript
// When color mode changes
if (mode === 'dark') {
  document.documentElement.setAttribute('data-theme', 'dark');
} else {
  document.documentElement.setAttribute('data-theme', 'light');
}
```

## 🎨 Design Philosophy

### Visual Design

- **Dropdown over Modal**: Less intrusive, quick access
- **Grid Layout**: Visual preview of themes with icons
- **Icon-First**: Recognizable theme identities
- **Hover Effects**: Clear interactive feedback

### UX Principles

- **Instant Apply**: No "Save" button needed
- **Persistent State**: Remembers user choice
- **Visual Preview**: Icons and descriptions help selection
- **Smooth Transitions**: CSS animations for polish

### Accessibility

- ✅ Keyboard navigation (Tab, Enter, Escape)
- ✅ ARIA labels for screen readers
- ✅ High contrast mode option
- ✅ Clear focus indicators

## 🚀 Performance

- **Lightweight**: ~5KB gzipped (CSS + JS)
- **No External Deps**: Uses native React hooks
- **Lazy Loading**: Dropdown only renders when open
- **CSS Modules**: Scoped styles, no conflicts

## 🧪 Testing

### Manual Testing Checklist

- [ ] Click theme button opens dropdown
- [ ] Select each theme applies correctly
- [ ] Light/Dark/High-contrast modes work
- [ ] localStorage persists selections
- [ ] Page reload maintains theme
- [ ] Mobile responsive behavior
- [ ] Keyboard navigation works
- [ ] Steampunk special styling appears

### Browser Testing

- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📚 Related Documentation

- [Steampunk Theme Guide](../../../themes/STEAMPUNK.md)
- [Lufa Design System Tokens](../../docs/tokens/overview.md)
- [Docusaurus Theming](https://docusaurus.io/docs/styling-layout)

## 🤝 Contributing

To improve the ThemeSwitcher:

1. Follow React best practices
2. Keep TypeScript types strict
3. Maintain accessibility standards
4. Test in all supported browsers
5. Update this README with changes

## 📄 License

Part of the Lufa Design System - MIT License

---

**Created by**: BMad Master 🧙  
**Version**: 1.0.0  
**Last Updated**: 2026-02-08

⚙️ _Steampunk is the default - because Victorian industrial elegance never goes out of style!_
