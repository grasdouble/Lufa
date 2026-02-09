# 🎨 Landing Page Theme Adaptations

The Lufa Design System Docusaurus landing page automatically adapts to each theme, creating unique visual experiences.

## 🌟 Theme-Specific Features

### 🌊 Ocean Theme

- **Hero**: Wave gradient background with animated ripple effect
- **Title**: Gradient text from primary to secondary (cyan to teal)
- **Statistics**: Flowing gradient background
- **Effect**: Smooth wave animation at hero bottom

### 🌲 Forest Theme

- **Hero**: Organic radial gradients
- **Title**: Decorated with leaf emojis (🌿)
- **Statistics**: Left border accent on each stat
- **Effect**: Natural, earthy atmosphere

### 💾 Matrix Theme

- **Hero**: Digital terminal style with neon green glow
- **Title**: Monospace font with `>` prefix and text shadow glow
- **Typography**: Share Tech Mono throughout
- **Statistics**: Terminal-style borders
- **Effect**: Hacker/terminal aesthetic

### 🎆 Cyberpunk Theme

- **Hero**: Neon gradient (fuchsia/cyan) with intense glow
- **Title**: Orbitron font, gradient text with drop shadow, decorated with ◢ ◣
- **Statistics**: Boxed stats with neon borders and glow
- **Effect**: Night-city neon atmosphere

### 🌅 Sunset Theme

- **Hero**: Warm gradient overlay
- **Title**: Playfair Display serif with sun emoji (☀️)
- **Statistics**: Warm gradient fade
- **Effect**: Golden hour elegance

### ❄️ Nordic Theme

- **Hero**: Clean minimal background
- **Title**: Inter font with snowflake emoji (❄️)
- **Statistics**: Boxed stats with subtle borders
- **Effect**: Arctic minimalism

### 🌋 Volcano Theme

- **Hero**: Radial red gradient from bottom (lava effect)
- **Title**: Bebas Neue uppercase with fire emojis (🔥)
- **Statistics**: Top border accent on each stat
- **Effect**: Intense, powerful atmosphere

### ☕ Coffee Theme

- **Hero**: Retro surface with double border
- **Title**: Courier Prime monospace with coffee emoji (☕)
- **Statistics**: Vintage boxed stats with shadow offset
- **Effect**: Nostalgic, warm feeling

### ⚡ Volt Theme

- **Hero**: Diagonal stripe pattern, thick borders
- **Title**: Archivo ultra-bold uppercase with lightning emojis (⚡)
- **Statistics**: High-contrast bordered boxes
- **Effect**: Industrial high-visibility

### ⚙️ Steampunk Theme

- **Hero**: Brass gradient overlay with double border
- **Title**: Cinzel serif with gear emojis (⚙️)
- **Statistics**: Brass-bordered boxes with inset highlights
- **Effect**: Victorian industrial elegance

## 🎯 Adaptive Elements

### Hero Section

- **Background**: Each theme has unique gradient/pattern
- **Title**: Theme-specific typography and decorations
- **Subtitle**: Adapted font families
- **Buttons**: Theme-appropriate styling and hover effects

### Statistics Section

- **Background**: Theme-specific gradients or patterns
- **Stat Cards**: Unique borders, shadows, and hover effects
- **Numbers**: Theme-specific colors and fonts
- **Hover**: Lift animation with theme-colored shadows

### Quick Start Section

- **Background**: Uses theme tokens
- **Code Blocks**: Inherit theme styling
- **Tip Box**: Theme-colored borders and backgrounds

## 🔧 Implementation

### Base Tokens Used

All sections use Lufa Design System tokens:

```css
--lufa-core-brand-primary
--lufa-core-brand-secondary
--lufa-core-neutral-background
--lufa-core-neutral-surface
--lufa-core-neutral-text-primary
--lufa-core-neutral-text-secondary
--lufa-core-semantic-info-subtle
```

### Theme-Specific Overrides

Each theme has custom CSS in `landing-themes.css`:

```css
[data-color-theme='ocean'] .heroBanner {
  /* Ocean-specific styles */
}

[data-color-theme='matrix'] .hero__title {
  /* Matrix-specific typography */
}
```

### Typography Inheritance

Themes with custom fonts automatically apply them:

- **Ocean**: Montserrat + Open Sans
- **Matrix**: Share Tech Mono + Roboto Mono
- **Cyberpunk**: Orbitron + Exo 2
- **Steampunk**: Cinzel + Crimson Text
- etc.

## 📱 Responsive Behavior

All theme adaptations are fully responsive:

```css
@media (max-width: 768px) {
  /* Emoji decorations scale down */
  /* Stat grid becomes 2-column */
  /* Font sizes adjust */
}
```

## ✨ Interactive Features

### Hover Effects

- **Ocean**: Ripple effect on buttons
- **Matrix**: Neon glow intensifies
- **Cyberpunk**: Multi-layer neon shadows
- **Volcano**: Scale and lift with shadow
- **Volt**: High-contrast border expansion
- **Steampunk**: Brass glow enhancement

### Animations

- **Ocean**: Wave ripple animation (3s infinite)
- **Matrix**: Text glow pulse
- **Cyberpunk**: Neon flicker effect
- **All Themes**: Smooth transitions (0.3s ease)

## 🎨 Color Palette Preview

Each theme's hero section showcases its color palette:

| Theme     | Primary    | Secondary  | Accent  |
| --------- | ---------- | ---------- | ------- |
| Ocean     | Cyan       | Teal       | Blue    |
| Forest    | Emerald    | Green      | Natural |
| Matrix    | Neon Green | Dark Green | Black   |
| Cyberpunk | Fuchsia    | Cyan       | Purple  |
| Sunset    | Orange     | Rose       | Warm    |
| Nordic    | Sky Blue   | Ice Blue   | White   |
| Volcano   | Red        | Orange     | Fire    |
| Coffee    | Amber      | Brown      | Sepia   |
| Volt      | Lime       | Yellow     | Black   |
| Steampunk | Brass      | Copper     | Bronze  |

## 🧪 Testing

To test all theme adaptations:

1. **Start Docusaurus**: `pnpm dev` (port 3001)
2. **Open homepage**: Navigate to `/`
3. **Use ThemeSwitcher**: Click theme button in navbar
4. **Switch themes**: Try all 10 themes
5. **Test color modes**: Light/Dark/High-contrast for each

### What to Check

- ✅ Hero background adapts
- ✅ Title typography changes
- ✅ Emoji decorations appear
- ✅ Statistics section styles
- ✅ Buttons inherit theme style
- ✅ Hover effects work
- ✅ Smooth transitions
- ✅ Responsive on mobile

## 📚 Related Files

- `/src/css/landing-themes.css` - Theme-specific landing styles
- `/src/pages/index.module.css` - Base landing page styles
- `/src/pages/index.tsx` - Landing page component
- `/src/components/ThemeSwitcher/` - Theme selection component

## 🤝 Contributing

To add landing page adaptations for a new theme:

1. **Add theme section** in `landing-themes.css`:

   ```css
   [data-color-theme='newtheme'] .heroBanner {
     /* Custom hero styles */
   }
   ```

2. **Define typography** if using custom fonts
3. **Add decorative elements** (emojis, borders, shadows)
4. **Test responsive behavior**
5. **Document color palette** in this file

---

**Created by**: BMad Master 🧙  
**Version**: 1.0.0  
**Last Updated**: 2026-02-08

🎨 _Every theme tells a story - the landing page is the first chapter!_
