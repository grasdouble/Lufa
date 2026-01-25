# Story Helpers

Composants réutilisables pour les stories Storybook du design system Lufa.

## 📦 Composants disponibles

### `StoryContainer`

Wrapper pour les stories utilisant le layout `fullscreen`. Fournit un espacement approprié et une contrainte de largeur maximale pour une meilleure lisibilité.

**Props:**

- `children: React.ReactNode` - Contenu de la story

**Utilisation:**

```tsx
import { StoryContainer } from '../../components/helpers';

export const MyStory: Story = {
  render: () => (
    <StoryContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {/* Your grid items */}
      </div>
    </StoryContainer>
  ),
};
```

**Quand l'utiliser:**

- ✅ Stories avec layout `fullscreen` dans les paramètres
- ✅ Stories utilisant des grids ou layouts horizontaux
- ✅ Stories nécessitant une largeur maximale pour la lisibilité

**Style appliqué:**

- `padding: 40px` - Espacement autour du contenu
- `maxWidth: 1400px` - Largeur maximale pour la lisibilité
- `margin: 0 auto` - Centrage horizontal
- `width: 100%` - Utilise toute la largeur disponible

---

### `PlaygroundContainer`

Container enrichi pour les stories Playground avec contexte visuel et toggles interactifs. **Nouveau !** ⭐

**Props:**

- `children: React.ReactNode` - Le composant à tester (généralement avec spread props)
- `defaultShowGrid?: boolean` - État initial de la grille (défaut: `true`)
- `defaultShowAdjacentElements?: boolean` - État initial des éléments adjacents (défaut: `false`)

**Utilisation:**

```tsx
import { PlaygroundContainer } from '../../components/helpers';

export const Playground: Story = {
  args: { padding: 'comfortable', background: 'info' },
  render: (args) => (
    <PlaygroundContainer defaultShowGrid={true} defaultShowAdjacentElements={false}>
      <Box {...args}>{args.children}</Box>
    </PlaygroundContainer>
  ),
};
```

**Fonctionnalités:**

1. 🎯 **Container avec bordure pointillée** - Visualise les marges
2. 📐 **Grille de guidage** - Lignes + croix centrale (toggleable)
3. 📦 **Éléments adjacents 4 directions** - "Above", "Before", "After", "Below" (toggleable)
4. 🎛️ **Toggles dans l'UI** - Checkboxes en haut (pas dans les controls)
5. ⚡ **Pas de wrapper flex/grid** - Préserve le comportement de la prop `display`

**Quand l'utiliser:**

- ✅ Composants de layout (Box, Stack, Flex, Grid)
- ✅ Stories Playground où les marges/espacements doivent être visibles
- ✅ Composants où display mode affecte le layout (`block`, `inline-block`, `inline`, `flex`, `grid`)
- ❌ Stories de props individuelles (utiliser `StoryContainer` + `PropCard`)

**Avantages vs ancien pattern:**

- ✅ Toggles dans l'UI (ne polluent pas les props du composant)
- ✅ Code réutilisable (pas de duplication)
- ✅ Consistance visuelle entre tous les Playgrounds
- ✅ Facile à propager à d'autres composants
- ✅ 4 éléments adjacents (Above/Before/After/Below) pour tester `display` correctement

---

### `PropCard`

Composant helper pour afficher des exemples de props individuelles avec un label. Le label est affiché EN BAS du contenu pour garantir un alignement visuel parfait, même si certains labels wrappent sur plusieurs lignes. Inclut des effets de hover pour une meilleure interactivité. Supporte les interactions au click ou au hover.

**Props:**

- `label: string` - Texte du label affiché EN BAS du contenu
- `children: React.ReactNode` - Composant ou éléments à afficher
- `highlight?: boolean` - Si `true`, applique un background mis en évidence (utile pour indiquer l'élément sélectionné)
- `onInteraction?: () => void` - Callback appelé lors de l'interaction (click ou hover)
- `interactionType?: 'click' | 'hover'` - Type d'interaction (défaut: 'hover')

**Utilisation:**

```tsx
import { PropCard } from '../../components/helpers';

// Exemple 1: Hover (par défaut)
export const MyStory: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
      <PropCard label='variant="primary"' highlight>
        <Button variant="primary">Click me</Button>
      </PropCard>

      <PropCard label='variant="secondary"'>
        <Button variant="secondary">Click me</Button>
      </PropCard>
    </div>
  ),
};

// Exemple 2: Click interaction (pour afficher du code, etc.)
export const PropAsStory: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('div');

    return (
      <div style={{ display: 'grid', ... }}>
        <PropCard
          label="<section>"
          highlight={selected === 'section'}
          onInteraction={() => setSelected('section')}
          interactionType="click"
        >
          <Box as="section">Content</Box>
        </PropCard>
      </div>
    );
  },
};
```

**Quand l'utiliser:**

- ✅ Affichage de variantes de props d'un composant
- ✅ Exemples individuels avec labels descriptifs
- ✅ Grids de comparaison de props
- ✅ Interaction au click pour sélectionner un élément (avec CodeBlock)
- ✅ Interaction au hover pour preview rapide

**Effets visuels:**

- Hover: Background change + translateY(-2px)
- Label: Uppercase, monospace, gris
- Transition: 0.2s ease
- Highlight: Background bleu léger quand `highlight={true}`
- Cursor: Pointeur si `interactionType="click"`

---

### `PaddingVisualizer`

Helper component pour visualiser le padding en fournissant un background coloré semi-transparent qui remplit l'espace de padding. **Nouveau !** ⭐

**Props:**

- `children: React.ReactNode` - Le composant avec padding à visualiser
- `color: string` - Couleur du background pour la zone de padding
- `opacity?: number` - Opacité du background 0-1 (défaut: `0.15`)
- `showBorder?: boolean` - Afficher une bordure autour du contenu (défaut: `false`)
- `showLabel?: boolean` - Afficher le label de dimension (défaut: `false`)
- `label?: string` - Texte du label (e.g., "32px", "Top: 32px")

**Utilisation:**

```tsx
import { PaddingVisualizer } from '../../components/helpers';

export const PropPaddingIndividual: Story = {
  render: () => {
    return (
      <StoryContainer>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { prop: 'paddingTop', label: 'Top ↓', color: '#3b82f6' },
            { prop: 'paddingRight', label: 'Right ←', color: '#8b5cf6' },
            { prop: 'paddingBottom', label: 'Bottom ↑', color: '#ec4899' },
            { prop: 'paddingLeft', label: 'Left →', color: '#f59e0b' },
          ].map(({ prop, label, color }) => (
            <PropCard key={prop} label={`${prop}="spacious"`}>
              <PaddingVisualizer color={color} showLabel label="32px" opacity={0.2}>
                <Box
                  {...{ [prop]: 'spacious' }}
                  style={{
                    backgroundColor: color,
                    color: 'white',
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >
                  {label}
                </Box>
              </PaddingVisualizer>
            </PropCard>
          ))}
        </div>
      </StoryContainer>
    );
  },
};
```

**Comment ça marche:**

1. 🎯 **Container avec background** - Entoure le Box avec padding
2. 🎨 **Background coloré semi-transparent** - Remplit la zone de padding
3. 📏 **Le padding "pousse"** - L'espace de padding est coloré, le contenu reste intact
4. 🏷️ **Label optionnel** - Affiche la dimension du padding

**Quand l'utiliser:**

- ✅ Stories de props `padding`, `paddingX`, `paddingY`, `paddingTop`, etc.
- ✅ Visualiser différentes valeurs de padding (tight, compact, default, etc.)
- ✅ Montrer comment le padding crée de l'espace à l'intérieur des éléments
- ❌ Props autres que padding (margin, border, etc.)

**Avantages:**

- ✅ Background semi-transparent rend le padding immédiatement visible
- ✅ Configurable (couleur, opacité, bordure)
- ✅ Label optionnel pour afficher la dimension
- ✅ Réutilisable et consistant avec MarginVisualizer
- ✅ Bordure optionnelle pour délimiter le contenu

**Exemple visuel:**

```
┌─────────────────────────────────────────┐
│ PaddingVisualizer (bleu semi-transparent)│ ← Background coloré
│   ╔═════════════════════════════════╗   │
│   ║  [32px label]                   ║   │
│   ║  ┌───────────────────────────┐  ║   │
│   ║  │                           │  ║   │
│   ║  │  Box Content (bleu foncé) │  ║   │ ← Contenu du Box
│   ║  │                           │  ║   │
│   ║  └───────────────────────────┘  ║   │
│   ╚═════════════════════════════════╝   │
│          ↑ Padding visible              │
└─────────────────────────────────────────┘
```

**Différence avec MarginVisualizer:**

- **MarginVisualizer** : Visualise l'espace AUTOUR du Box (externe)
- **PaddingVisualizer** : Visualise l'espace À L'INTÉRIEUR du Box (interne)

---

### `MarginVisualizer`

Helper component pour visualiser les marges en fournissant un background coloré qui fit exactement le contenu (Box + sa marge). **Nouveau !** ⭐

**Props:**

- `children: React.ReactNode` - Le composant avec marge à visualiser
- `color?: string` - Couleur du background (défaut: `'#3b82f6'` bleu)
- `opacity?: number` - Opacité du background 0-1 (défaut: `0.12`)
- `borderColor?: string` - Couleur de la bordure (défaut: couleur avec 50% opacité)
- `borderWidth?: number` - Largeur de la bordure en pixels (défaut: `2`)
- `borderRadius?: number` - Rayon de bordure en pixels (défaut: `6`)
- `showLabel?: boolean` - Afficher le label de dimension (défaut: `false`)
- `label?: string` - Texte du label (e.g., "32px")

**Utilisation:**

```tsx
import { MarginVisualizer } from '../../components/helpers';

export const PropMargin: Story = {
  render: () => {
    const marginValues = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'];

    return (
      <StoryContainer>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          {marginValues.map((value) => (
            <PropCard key={value} label={`margin="${value}"`}>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4px' }}>
                <MarginVisualizer color="#3b82f6" showLabel label="32px">
                  <Box margin={value} padding="default" background="primary">
                    Box
                  </Box>
                </MarginVisualizer>
              </div>
            </PropCard>
          ))}
        </div>
      </StoryContainer>
    );
  },
};
```

**Comment ça marche:**

1. 🎯 **`display: inline-block`** - Le container fit la taille naturelle du contenu
2. 🎨 **Background coloré** - Rend la zone de marge visible
3. 📏 **La marge "pousse"** - L'espace de marge est visuellement distinct
4. 🏷️ **Label optionnel** - Affiche la dimension de la marge

**Quand l'utiliser:**

- ✅ Stories de props `margin`, `marginX`, `marginY`, `marginTop`, etc.
- ✅ Visualiser différentes valeurs de marge (tight, compact, default, etc.)
- ✅ Montrer comment la marge crée de l'espace autour des éléments
- ❌ Props autres que margin (padding, border, etc.)

**Avantages:**

- ✅ Fit exactement le contenu (pas de débordement sur le padding du container)
- ✅ Background coloré rend la marge immédiatement visible
- ✅ Configurable (couleur, opacité, bordure)
- ✅ Label optionnel pour afficher la dimension
- ✅ Réutilisable et consistant

**Exemple visuel:**

```
┌─────────────────────────────────┐
│ Container (gris clair)          │
│   ┌─────────────────────────┐   │
│   │ MarginVisualizer (bleu) │   │ ← Background coloré fit le contenu
│   │   ┌─────────────────┐   │   │
│   │   │                 │   │   │
│   │   │  Box (primary)  │   │   │ ← Box avec sa marge
│   │   │                 │   │   │
│   │   └─────────────────┘   │   │
│   │      [32px label]       │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

### `CodeBlock`

Composant pour afficher du code formaté avec un header optionnel. Supporte les onglets pour switcher entre différentes vues de code (JSX, HTML, CSS, etc.).

**Props:**

- `code?: string` - Contenu du code à afficher (si pas d'onglets)
- `language?: string` - Langage de programmation pour le contexte (jsx, html, css, etc.) - défaut: 'jsx'
- `title?: string` - Titre optionnel affiché dans le header (ex: "Code", "Example")
- `subtitle?: string` - Sous-titre optionnel affiché dans le header (ex: `<Box as="section">`)
- `emptyMessage?: string` - Message à afficher quand le code est vide - défaut: 'No code to display'
- `tabs?: Array<{ label: string; content: string; language?: string }>` - Onglets pour switcher entre différentes vues

**Utilisation:**

```tsx
import { CodeBlock } from '../../components/helpers';

// Exemple 1: Code simple
export const SimpleStory: Story = {
  render: () => <CodeBlock code="<Box padding='comfortable'>Content</Box>" language="jsx" title="JSX Code" />,
};

// Exemple 2: Avec onglets JSX/HTML (recommandé!)
export const PropAsStory: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('div');

    const generateJsx = (element: string) => `<Box as="${element}">...</Box>`;
    const getHtml = () => document.querySelector('[data-background]')?.outerHTML || '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Vos exemples ici */}

        {/* Bloc de code avec onglets */}
        <CodeBlock
          tabs={[
            { label: 'JSX', content: generateJsx(selected), language: 'jsx' },
            { label: 'HTML', content: getHtml(), language: 'html' },
          ]}
          title="Code"
          subtitle={`<Box as="${selected}">`}
        />
      </div>
    );
  },
};
```

**Quand l'utiliser:**

- ✅ Afficher le code source JSX d'un exemple
- ✅ Montrer le HTML rendu d'un composant
- ✅ Comparer JSX source et HTML rendu (avec onglets)
- ✅ Stories interactives avec code qui change au hover/clic
- ✅ Documentation de patterns de code

**Style:**

- 🎨 Background sombre (#1e293b)
- 🔤 Police monospace
- 📏 Padding généreux (20px)
- ✨ Border et shadow pour la profondeur
- 📱 Overflow auto (scroll si nécessaire)
- 🎯 Header séparé avec border-bottom
- 🔘 Onglets interactifs (si fournis) avec hover states

---

## 🎨 Pattern de Story Recommandé

### Pour les composants avec beaucoup de props (Box, Button, etc.)

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { YourComponent } from '@grasdouble/lufa_design-system';

import { PropCard, StoryContainer } from '../../components/helpers';

const meta = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'fullscreen', // Important pour StoryContainer
  },
  tags: ['autodocs'],
} satisfies Meta<typeof YourComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Playground interactif
export const Playground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
  },
};

// Story par propriété avec grid layout
export const PropVariant: Story = {
  render: () => (
    <StoryContainer>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '20px',
        }}
      >
        {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
          <PropCard key={variant} label={`variant="${variant}"`}>
            <YourComponent variant={variant}>Example</YourComponent>
          </PropCard>
        ))}
      </div>
    </StoryContainer>
  ),
};
```

---

## 📐 Grid Layouts Recommandés

### Pour 4-6 items par ligne (petites cartes)

```tsx
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
gap: '20px'
```

### Pour 3-4 items par ligne (cartes moyennes)

```tsx
display: 'grid',
gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
gap: '24px'
```

### Pour 2-3 items par ligne (grandes cartes)

```tsx
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
gap: '32px'
```

**Note:** Utilisez `auto-fill` pour créer des colonnes même vides, `auto-fit` pour que les items existants prennent toute la largeur disponible.

---

## 🎯 Exemples Réels

Voir les stories suivantes pour des exemples d'utilisation:

- `stories/primitives/Box.stories.tsx` - Utilisation complète de StoryContainer et PropCard
- `stories/primitives/Text.stories.tsx` - À venir (suivra le même pattern)
- `stories/primitives/Stack.stories.tsx` - À venir (suivra le même pattern)

---

## 🚀 Avantages

**Sans helpers (ancien pattern):**

```tsx
// ❌ Code dupliqué dans chaque story
export const MyStory: Story = {
  render: () => (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', ... }}>
        <div style={{ fontSize: '11px', fontWeight: 600, ... }}>
          variant="primary"
        </div>
        <Button variant="primary">Click me</Button>
      </div>
    </div>
  ),
};
```

**Avec helpers (nouveau pattern):**

```tsx
// ✅ Code réutilisable, propre, maintenable
export const MyStory: Story = {
  render: () => (
    <StoryContainer>
      <PropCard label='variant="primary"'>
        <Button variant="primary">Click me</Button>
      </PropCard>
    </StoryContainer>
  ),
};
```

---

## 🔄 Évolutions Futures

Helpers potentiels à ajouter:

- `TokenGrid` - Pour afficher des grids de tokens (colors, spacing, etc.)
- `VariantComparison` - Pour comparer côte à côte plusieurs variantes
- `ResponsiveContainer` - Pour tester les breakpoints responsive

---

**Maintenu par:** Design System Team  
**Dernière mise à jour:** 2026-01-23
