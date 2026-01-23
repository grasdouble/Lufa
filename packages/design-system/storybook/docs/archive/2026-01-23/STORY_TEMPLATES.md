# 📖 Story Templates - Design System Storybook

Guide complet pour créer des stories cohérentes et modernes pour les composants du design system.

---

## 🎯 Template Global - Structure des Stories pour un Composant

Chaque composant doit avoir cette structure de stories :

### 1. **Playground** (Obligatoire)

- **But :** Story interactive avec tous les controls
- **Quand :** Toujours la première story
- **Layout :** `centered` (défaut Storybook)
- **Pattern :** Utilise `args` pour les props

### 2. **Prop[NomDuProp]** (Une story par prop majeure)

- **But :** Montrer toutes les variantes d'une prop spécifique
- **Quand :** Pour chaque prop avec plusieurs valeurs possibles
- **Layout :** `fullscreen`
- **Pattern :** Grid horizontal avec `PropCard` + optionnel `CodeBlock`

### 3. **Compositions/Examples** (Optionnel)

- **But :** Montrer des cas d'usage réels et combinations
- **Quand :** Si le composant a des patterns d'usage complexes
- **Layout :** `fullscreen`
- **Pattern :** Exemples concrets avec contexte

---

## 📋 Checklist des Stories à Créer

### Pour un Composant Primitif (Box, Stack, etc.)

```
✅ Playground
✅ PropAs (si polymorphique)
✅ PropPadding (spacing)
✅ PropMargin (spacing)
✅ PropBackground (colors)
✅ PropBorder* (borders)
✅ PropDisplay (layout)
```

### Pour un Composant Interactif (Button, Input, etc.)

```
✅ Playground
✅ PropVariant (visual variants)
✅ PropSize (sizing)
✅ PropState (hover, focus, disabled, etc.)
✅ PropIcon (avec/sans icons)
✅ Examples (real-world usage)
```

### Pour un Composant de Composition (Card, Modal, etc.)

```
✅ Playground
✅ PropVariant
✅ Compositions (différentes configurations)
✅ Examples (cas d'usage métier)
```

---

## 🎨 Templates par Type de Story

### Template 1: Playground Story

**Utilisation :** Story interactive principale

```tsx
export const Playground: Story = {
  args: {
    // Valeurs par défaut
    variant: 'primary',
    size: 'md',
    children: 'Example Content',
  },
};
```

**Caractéristiques :**

- ✅ Layout: `centered` (défaut)
- ✅ Tous les controls actifs
- ✅ Args avec valeurs par défaut
- ✅ Pas de wrapper supplémentaire

---

### Template 1B: Playground avec Contexte Visuel ⭐ NOUVEAU

**Utilisation :** Story interactive pour composants de layout où margins/display doivent être visibles

**Quand l'utiliser :**

- ✅ Composants de layout (Box, Stack, Flex, Grid)
- ✅ Composants avec props `margin*` (besoin de voir l'espace autour)
- ✅ Composants avec prop `display` (besoin de voir l'impact sur le layout)
- ❌ Composants simples sans impact layout (Button, Text, Badge)

```tsx
import { PlaygroundContainer } from '../../components/helpers';

export const Playground: Story = {
  args: {
    padding: 'comfortable',
    background: 'info',
    borderRadius: 'medium',
    borderWidth: 'thin',
    borderColor: 'default',
    children: '🎨 Edit the controls to see changes in real-time!',
  },
  render: (args) => (
    <PlaygroundContainer defaultShowGrid={true} defaultShowAdjacentElements={false}>
      <Box {...args}>{args.children}</Box>
    </PlaygroundContainer>
  ),
};
```

**Caractéristiques :**

- ✅ Layout: `centered` (défaut)
- ✅ Tous les controls actifs
- ✅ **Container avec bordure pointillée** pour visualiser les marges
- ✅ **Grille de guidage toggleable** (lignes + croix centrale)
- ✅ **Éléments adjacents toggleables** (Above/Before/After/Below)
- ✅ **Toggles UI** (checkboxes en haut du container, pas dans controls)
- ✅ **Wrapper neutre** (pas de display: flex/grid qui interfère avec la prop display)

**Props de PlaygroundContainer :**

| Prop                          | Type      | Défaut  | Description                      |
| ----------------------------- | --------- | ------- | -------------------------------- |
| `defaultShowGrid`             | boolean   | `true`  | Afficher la grille au chargement |
| `defaultShowAdjacentElements` | boolean   | `false` | Afficher les éléments adjacents  |
| `children`                    | ReactNode | -       | Le composant à tester            |

**Fonctionnalités du PlaygroundContainer :**

1. **Container Visuel** - Bordure pointillée grise (`#cbd5e1`) pour voir les marges du composant
2. **Grille de Guidage** - Lignes horizontale/verticale centrées + croix 12x12px pour l'alignement
3. **Éléments Adjacents** - 4 éléments (Above, Before, After, Below) pour tester la prop `display`:
   - `display: 'block'` → Box prend toute la largeur, éléments empilés verticalement
   - `display: 'inline-block'` → Box inline, Before/After sur la même ligne
   - `display: 'inline'` → Box inline avec comportement texte
   - `display: 'flex'`/`'grid'` → Box en tant que conteneur flex/grid
4. **Layout Centré** - Tous les éléments centrés horizontalement et verticalement alignés
5. **Wrapper Neutre** - Aucun style de display forcé sur le wrapper (préserve la prop display du composant)

**Avantages vs Playground Simple :**

| Aspect                  | Template 1 (Simple)            | Template 1B (Visual Context)   |
| ----------------------- | ------------------------------ | ------------------------------ |
| **Code**                | 5-8 lignes                     | 5-8 lignes (même simplicité!)  |
| **Margins visibles**    | ❌ Non (fond blanc uniforme)   | ✅ Oui (bordure pointillée)    |
| **Display testing**     | ❌ Difficile (pas de contexte) | ✅ Facile (éléments adjacents) |
| **Guidage visuel**      | ❌ Non                         | ✅ Oui (grille toggleable)     |
| **Layout preservation** | ✅ Oui                         | ✅ Oui (wrapper neutre)        |
| **Props pollution**     | ✅ Aucune                      | ✅ Aucune (toggles dans UI)    |

**Documentation complète :**

- Voir `src/components/helpers/README.md` pour tous les détails techniques
- Voir `Box.stories.tsx` ligne 205-219 pour l'implémentation réelle

---

### Template 2: Prop Story Simple (Sans Code)

**Utilisation :** Montrer des variantes visuelles simples

```tsx
export const PropVariant: Story = {
  render: () => (
    <StoryContainer>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {(['primary', 'secondary', 'ghost'] as const).map((variant) => (
          <PropCard key={variant} label={`variant="${variant}"`}>
            <Button variant={variant}>Click me</Button>
          </PropCard>
        ))}
      </div>
    </StoryContainer>
  ),
};
```

**Caractéristiques :**

- ✅ Layout: `fullscreen`
- ✅ `StoryContainer` wrapper
- ✅ Grid responsive
- ✅ `PropCard` pour chaque variante
- ✅ Label descriptif

**Quand l'utiliser :**

- Props simples (variant, size, etc.)
- Pas besoin de voir le code
- Focus sur l'apparence visuelle

---

### Template 3: Prop Story avec Code (Click + Onglets)

**Utilisation :** Montrer des variantes avec le code source (JSX + HTML)

```tsx
export const PropAs: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('div');

    const generateJsxCode = (value: string): string => {
      return `<Component
  prop="${value}"
  otherProp="value"
>
  Content
</Component>`;
    };

    const generateHtmlOutput = (value: string): string => {
      return `<${value}
  class="Component_root__... ... +5 more"
  data-prop="${value}"
>
  Content
</${value}>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid of examples */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {(['value1', 'value2', 'value3'] as const).map((value) => (
              <PropCard
                key={value}
                label={`prop="${value}"`}
                highlight={selected === value}
                onInteraction={() => setSelected(value)}
                interactionType="click"
              >
                {/* Composant avec span interne pour les styles de présentation */}
                <Component prop={value}>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '80px',
                    }}
                  >
                    {value}
                  </span>
                </Component>
              </PropCard>
            ))}
          </div>

          {/* Code block with tabs */}
          <CodeBlock
            tabs={[
              {
                label: 'HTML',
                content: generateHtmlOutput(selected),
                language: 'html',
              },
              {
                label: 'JSX',
                content: generateJsxCode(selected),
                language: 'jsx',
              },
            ]}
            title="Code"
            subtitle={`<Component prop="${selected}">`}
          />
        </div>
      </StoryContainer>
    );
  },
};
```

**Caractéristiques :**

- ✅ Layout: `fullscreen`
- ✅ State pour tracking la sélection
- ✅ Click interaction (pas hover)
- ✅ Styles de présentation dans un `<span>` interne
- ✅ CodeBlock avec 2 onglets (HTML par défaut)
- ✅ JSX code simplifié (focus sur le composant)
- ✅ HTML code simplifié (focus sur le composant)

**⚠️ RÈGLE IMPORTANTE - Code affiché simplifié :**

Le code affiché dans le `CodeBlock` doit être **pédagogique et simplifié**, pas un dump du DOM réel :

```tsx
// ❌ MAUVAIS - Code avec tous les détails de présentation
const generateHtmlOutput = (value: string): string => {
  return `<section ...>
  <span style="display: flex; align-items: center; justify-content: center; min-height: 80px;">
    section
  </span>
</section>`;
};

// ✅ BON - Code simplifié, focus sur le composant
const generateHtmlOutput = (value: string): string => {
  return `<section
  class="Box_box__... +7 more"
  data-background="surface"
  data-padding="comfortable"
>
  section
</section>`;
};
```

**Pourquoi ?**

- Le `<span>` avec styles inline est pour la **présentation visuelle** dans Storybook
- Le code affiché doit montrer **l'usage réel** du composant
- On ne veut pas que les users copient des wrappers de présentation

**En résumé :**

- **JSX réel** : Avec span pour présentation → Pour l'affichage dans Storybook
- **JSX affiché** : Sans span → Pour la copie par l'utilisateur
- **HTML affiché** : Sans span → Pour montrer l'output réel du composant

**Quand l'utiliser :**

- Props polymorphiques (`as`)
- Props qui changent la structure HTML
- Quand les users doivent comprendre l'output
- Composants "educatifs"

---

### Template 4: Prop Story avec Visualisation (Spacing, Colors)

**Utilisation :** Props nécessitant des indicateurs visuels

```tsx
export const PropPadding: Story = {
  render: () => (
    <StoryContainer>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((padding) => (
          <PropCard key={padding} label={`padding="${padding}"`}>
            <Box
              padding={padding}
              background="info" // Couleur pour visualiser le padding
              borderRadius="default"
            >
              <div
                style={{
                  background: 'white',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '2px dashed #cbd5e1',
                }}
              >
                Content area
              </div>
            </Box>
          </PropCard>
        ))}
      </div>
    </StoryContainer>
  ),
};
```

**Caractéristiques :**

- ✅ Background coloré pour montrer le spacing
- ✅ Contenu avec border dashed
- ✅ Pas de CodeBlock (pas nécessaire)
- ✅ Focus sur la visualisation

**Quand l'utiliser :**

- Props de spacing (padding, margin)
- Props de couleur (background, border)
- Props où la différence visuelle est importante

---

### Template 5: Prop Story Directionnelle (X/Y, Top/Right/Bottom/Left)

**Utilisation :** Props avec directions (paddingX, marginTop, etc.)

```tsx
export const PropPaddingXY: Story = {
  render: () => (
    <StoryContainer>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
        }}
      >
        {/* paddingX */}
        <PropCard label='paddingX="comfortable" (← →)'>
          <Box paddingX="comfortable" background="info" borderRadius="default">
            <div style={{ background: 'white', padding: '12px', borderRadius: '6px' }}>
              Horizontal padding
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '8px',
                  fontSize: '20px',
                }}
              >
                ←
              </div>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '8px',
                  fontSize: '20px',
                }}
              >
                →
              </div>
            </div>
          </Box>
        </PropCard>

        {/* paddingY */}
        <PropCard label='paddingY="comfortable" (↑ ↓)'>
          <Box paddingY="comfortable" background="success" borderRadius="default">
            <div style={{ background: 'white', padding: '12px', borderRadius: '6px' }}>
              Vertical padding
              <div style={{ textAlign: 'center', fontSize: '20px' }}>↑</div>
              <div style={{ textAlign: 'center', fontSize: '20px' }}>↓</div>
            </div>
          </Box>
        </PropCard>
      </div>
    </StoryContainer>
  ),
};
```

**Caractéristiques :**

- ✅ Flèches pour indiquer la direction
- ✅ Couleurs différentes par direction
- ✅ Labels avec symboles (←→ ↑↓)

**Quand l'utiliser :**

- paddingX/paddingY
- marginX/marginY
- paddingTop/Right/Bottom/Left

---

### Template 6: Prop Story avec CodeBlock Hover (JSX uniquement)

**Utilisation :** Montrer des variantes avec code dynamique au survol

```tsx
export const PropPadding: Story = {
  render: () => {
    const [hoveredPadding, setHoveredPadding] = React.useState<string>('default');

    const generateCode = (padding: string): string => {
      return `<Box padding="${padding}" background="info" borderRadius="default">
  Content
</Box>`;
    };

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Grid with hover wrappers */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '12px',
            }}
          >
            {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((padding) => (
              <div key={padding} onMouseEnter={() => setHoveredPadding(padding)}>
                <PropCard label={`padding="${padding}"`} highlight={hoveredPadding === padding}>
                  <Box padding={padding} background="info" borderRadius="default">
                    Content
                  </Box>
                </PropCard>
              </div>
            ))}
          </div>

          {/* Code block */}
          <CodeBlock
            code={generateCode(hoveredPadding)}
            language="jsx"
            title="JSX"
            subtitle={`padding="${hoveredPadding}"`}
          />
        </div>
      </StoryContainer>
    );
  },
};
```

**Caractéristiques :**

- ✅ Layout: `fullscreen`
- ✅ State pour tracking le hover (`hoveredPadding`)
- ✅ Hover interaction (plus fluide que click)
- ✅ Wrapper `<div>` avec `onMouseEnter` autour de chaque PropCard
- ✅ `highlight` prop sur PropCard synchronisé avec hover state
- ✅ CodeBlock JSX uniquement (pas d'onglets HTML)
- ✅ `subtitle` dans CodeBlock qui affiche la prop survolée
- ✅ Gap de `24px` entre grid et CodeBlock
- ✅ Gap de `12px` dans la grid (plus serré pour meilleur flow)

**Structure du code généré :**

```tsx
// ✅ BON - Code simplifié, focus sur la prop démontrée
const generateCode = (value: string): string => {
  return `<Component
  propName="${value}"
  otherProp="defaultValue"
>
  Content
</Component>`;
};

// ❌ MAUVAIS - Trop de props non pertinentes
const generateCode = (value: string): string => {
  return `<Component
  propName="${value}"
  className="styles"
  style={{ ... }}
  data-testid="test"
  otherProp1="value1"
  otherProp2="value2"
>
  Content
</Component>`;
};
```

**Pattern d'interaction hover :**

1. User survole une carte → `onMouseEnter` déclenché
2. State `hoveredPadding` mis à jour
3. PropCard avec `highlight={true}` (effet visuel)
4. CodeBlock se met à jour avec le nouveau code
5. Subtitle du CodeBlock affiche la valeur survolée

**Quand l'utiliser :**

- ✅ Props visuelles simples (padding, margin, borderRadius, etc.)
- ✅ Props avec plusieurs valeurs à explorer (6+ variantes)
- ✅ Besoin de montrer le code mais pas l'HTML
- ✅ Interaction fluide d'exploration
- ✅ Props où la visualisation + code est suffisant

**Quand NE PAS l'utiliser :**

- ❌ Props polymorphiques (`as`) → Utiliser Template 3 (click + tabs)
- ❌ Props qui changent la structure HTML → Utiliser Template 3
- ❌ Moins de 4 variantes → Utiliser Template 2 (sans code)
- ❌ Props complexes nécessitant du contexte → Utiliser Template 4

**Différences avec Template 3 (Click + Tabs) :**

| Aspect         | Template 3 (Click + Tabs)      | Template 6 (Hover JSX)      |
| -------------- | ------------------------------ | --------------------------- |
| Interaction    | Click                          | Hover                       |
| Code affiché   | JSX + HTML (onglets)           | JSX uniquement              |
| Use case       | Props structurelles            | Props visuelles             |
| État sélection | Persistent (reste sélectionné) | Volatile (change au survol) |
| Copie de code  | Facile (stable)                | Plus difficile (hover away) |
| Exploration    | Délibérée                      | Fluide et rapide            |
| Exemple        | `PropAs` (polymorphisme)       | `PropPadding`, `PropMargin` |

**Variantes du pattern :**

**Variante A: Props directionnelles (X/Y)**

```tsx
export const PropPaddingXY: Story = {
  render: () => {
    const [hovered, setHovered] = React.useState<string>('paddingX');

    const generateCode = (variant: string): string => {
      if (variant === 'paddingX') {
        return `<Box paddingX="spacious">Horizontal</Box>`;
      } else if (variant === 'paddingY') {
        return `<Box paddingY="spacious">Vertical</Box>`;
      } else {
        return `<Box paddingX="spacious" paddingY="compact">Combined</Box>`;
      }
    };

    const variants = [
      { key: 'paddingX', label: 'paddingX="spacious" (← →)' },
      { key: 'paddingY', label: 'paddingY="spacious" (↑ ↓)' },
      { key: 'combined', label: 'paddingX + paddingY' },
    ];

    return (
      <StoryContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
            {variants.map(({ key, label }) => (
              <div key={key} onMouseEnter={() => setHovered(key)}>
                <PropCard label={label} highlight={hovered === key}>
                  {/* Contenu spécifique */}
                </PropCard>
              </div>
            ))}
          </div>
          <CodeBlock code={generateCode(hovered)} language="jsx" title="JSX" subtitle={hovered} />
        </div>
      </StoryContainer>
    );
  },
};
```

**Variante B: Display types (code complexe)**

```tsx
export const PropDisplay: Story = {
  render: () => {
    const [hovered, setHovered] = React.useState<string>('block');

    const generateCode = (display: string): string => {
      if (display === 'flex') {
        return `<Box display="flex" style={{ gap: '12px' }}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Box>`;
      } else if (display === 'grid') {
        return `<Box display="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</Box>`;
      }
      return `<Box display="${display}">Content</Box>`;
    };

    // ... reste du code
  },
};
```

**Notes sur PropCard label position :**

⚠️ **IMPORTANT - Position du label :** Les labels sont positionnés **en bas** de la PropCard (pas en haut) pour éviter les problèmes d'alignement quand les labels sont longs.

```tsx
// Structure de PropCard (label EN BAS)
<PropCard label="background=\"on-secondary\"">
  {/* Contenu du composant */}
</PropCard>

// Rendu visuel :
// ┌─────────────────┐
// │                 │
// │    Content      │  ← Composant aligné en haut
// │                 │
// ├─────────────────┤  ← Border top separator
// │ label en bas    │  ← Label peut wrapper sans casser l'alignement
// └─────────────────┘
```

**Pourquoi en bas ?**

- ✅ Évite les décalages de hauteur quand labels wrappent
- ✅ Garde l'alignement horizontal des composants
- ✅ Meilleure lecture (label = légende sous l'image)
- ✅ Cohérent avec les autres patterns (caption/figcaption)

---

## 🔀 Arbre de Décision : Quel Template Utiliser ?

Utilisez cet arbre de décision pour choisir le bon template pour votre story:

```
Vous créez une story pour une prop ?
│
├─ Non (c'est la story principale - Playground)
│  │
│  └─ Le composant a des props margin* ou display ?
│     │
│     ├─ Oui (layout component) → Template 1B: Playground with Visual Context ⭐
│     │  (Box, Stack, Flex, Grid, etc.)
│     │
│     └─ Non (simple component) → Template 1: Playground Simple
│        (Button, Text, Badge, etc.)
│
└─ Oui (story pour une prop spécifique)
   │
   └─ La prop a plusieurs valeurs/variantes ?
      │
      ├─ Non (prop booléenne ou unique) → Template 2: Simple (sans code)
      │
      └─ Oui
         │
         └─ Users doivent voir la structure HTML générée ?
            │
            ├─ Oui (prop polymorphique, `as`, changes HTML structure)
            │   → Template 3: Click + Tabs (JSX + HTML)
            │
            └─ Non (prop visuelle, ne change pas la structure)
               │
               └─ La visualisation seule suffit ?
                  │
                  ├─ Oui (différence évidente visuellement)
                  │   → Template 2: Simple (sans code)
                  │
                  └─ Non (users bénéficieraient de voir le code)
                     │
                     └─ Prop nécessite des indicateurs visuels spéciaux ?
                        │
                        ├─ Oui (spacing avec borders, directions avec flèches)
                        │   │
                        │   └─ Code utile à montrer ?
                        │      │
                        │      ├─ Oui → Template 6: Hover JSX + Visualization
                        │      └─ Non → Template 4: Visualization only
                        │
                        └─ Non (prop simple type variant, size, color)
                           → Template 6: Hover JSX
```

**Résumé rapide :**

| Template              | Quand l'utiliser                      | Interaction        | Code affiché | Exemple                       |
| --------------------- | ------------------------------------- | ------------------ | ------------ | ----------------------------- |
| **1: Playground**     | Story principale interactive          | Controls Storybook | -            | Toujours la 1ère              |
| **2: Simple**         | Props visuelles évidentes             | Aucune             | -            | Variant simple                |
| **3: Click + Tabs**   | Props structurelles/polymorphiques    | Click              | JSX + HTML   | `PropAs`                      |
| **4: Visualization**  | Props nécessitant indicateurs visuels | Aucune             | -            | Spacing avec borders          |
| **5: Directionnelle** | Props avec directions (X/Y/Top/etc)   | Aucune             | -            | PaddingXY avec flèches        |
| **6: Hover JSX**      | Props visuelles avec code utile       | Hover              | JSX          | Padding, Margin, BorderRadius |

**Exemples concrets par type de prop :**

| Type de Prop            | Template Recommandé       | Raison                                   |
| ----------------------- | ------------------------- | ---------------------------------------- |
| `as` (polymorphisme)    | Template 3 (Click + Tabs) | Montre la structure HTML différente      |
| `variant` (2-3 options) | Template 2 (Simple)       | Différence visuelle évidente             |
| `variant` (6+ options)  | Template 6 (Hover JSX)    | Beaucoup de variantes, code utile        |
| `padding`, `margin`     | Template 6 (Hover JSX)    | Code simple, exploration fluide          |
| `paddingX`, `paddingY`  | Template 6 (Hover JSX)    | Code + visualisation directionnelle      |
| `paddingTop/Right/etc`  | Template 6 (Hover JSX)    | Code + visualisation par côté            |
| `background` (colors)   | Template 6 (Hover JSX)    | Beaucoup de couleurs, code utile         |
| `borderRadius`          | Template 6 (Hover JSX)    | Valeurs multiples, code simple           |
| `borderWidth`           | Template 6 (Hover JSX)    | Valeurs multiples, code simple           |
| `borderColor`           | Template 6 (Hover JSX)    | Couleurs multiples, code utile           |
| `display`               | Template 6 (Hover JSX)    | Code varie selon display (flex/grid/etc) |
| `size` (2-3 options)    | Template 2 (Simple)       | Différence visuelle claire               |
| `disabled` (boolean)    | Template 2 (Simple)       | Juste 2 états                            |

---

## 🎯 Pattern de Nommage

### Stories

```
✅ Playground           - Story principale interactive
✅ PropAs              - Prop polymorphique
✅ PropVariant         - Variantes visuelles
✅ PropSize            - Tailles
✅ PropPadding         - Padding (toutes directions)
✅ PropPaddingXY       - Padding directionnel (X/Y)
✅ PropPaddingIndividual - Padding par côté
✅ PropBackground      - Couleurs de fond
✅ PropBorderRadius    - Border radius
✅ PropBorderWidth     - Border width
✅ PropBorderColor     - Border color
✅ PropDisplay         - Display modes
✅ Examples            - Exemples concrets
✅ Compositions        - Compositions complexes
```

**Format :** `Prop[NomDuProp]` (PascalCase)

### Labels dans PropCard

```
✅ variant="primary"          - Prop simple
✅ padding="comfortable"      - Prop avec valeur
✅ <section>                  - Element HTML
✅ paddingX="comfortable" (← →) - Avec indicateur visuel
```

**Format :** Reproduire exactement la prop JSX

---

## 📐 Guidelines Visuelles

### Grids

```tsx
// Petites cartes (4-6 par ligne) - Couleurs, petits éléments
gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))';
gap: '16px';

// Cartes moyennes (3-4 par ligne) - La plupart des props
gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))';
gap: '16px';

// Cartes moyennes+ (2-3 par ligne) - Spacing avec visualisation
gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))';
gap: '24px';

// Grandes cartes (1-2 par ligne) - Compositions complexes
gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))';
gap: '32px';
```

### Couleurs pour Visualisation

```tsx
// Padding visualization
background="info"      // Bleu - Padding général
background="success"   // Vert - PaddingY
background="warning"   // Orange - PaddingX

// Margin visualization
<Box background="info">        // Box avec margin
<Box background="surface">     // Box sans margin (comparaison)
```

### Hauteurs Minimales

```tsx
// Dans span de présentation (à l'intérieur du composant)
minHeight: '80px'; // Standard pour la plupart des props
minHeight: '100px'; // Pour spacing (voir la différence)
minHeight: '120px'; // Pour compositions
```

---

## ✅ Checklist avant de Commiter une Story

**Contenu :**

- [ ] Story nommée selon le pattern `Prop[NomDuProp]`
- [ ] Layout `fullscreen` (sauf Playground)
- [ ] Utilise `StoryContainer`
- [ ] Grid responsive approprié
- [ ] `PropCard` avec labels clairs
- [ ] Labels positionnés **en bas** (pas en haut)

**Code (Template 3 - Click + Tabs) :**

- [ ] CodeBlock avec onglets (HTML en premier)
- [ ] JSX code simplifié (focus sur le composant)
- [ ] HTML code complet (montre la réalité)
- [ ] Styles de présentation dans `<span>` interne
- [ ] Click interaction (pas hover)
- [ ] State pour tracking la sélection

**Code (Template 6 - Hover JSX) :**

- [ ] CodeBlock JSX uniquement (pas d'onglets)
- [ ] State pour tracking le hover
- [ ] Wrapper `<div>` avec `onMouseEnter` autour de chaque PropCard
- [ ] `highlight` prop synchronisé avec hover state
- [ ] `subtitle` dans CodeBlock affiche la prop survolée
- [ ] Gap `24px` entre grid et CodeBlock
- [ ] Gap `12px` dans la grid
- [ ] Code généré simplifié (focus sur la prop démontrée)

**Visuel :**

- [ ] Couleurs appropriées pour visualisation
- [ ] Indicateurs visuels (flèches, borders) si nécessaire
- [ ] Hauteur minimum cohérente
- [ ] Gap approprié au contenu
- [ ] Labels ne cassent pas l'alignement vertical

**Accessibilité :**

- [ ] Labels descriptifs
- [ ] Ordre logique des variantes
- [ ] Contrastes suffisants

---

## 📚 Exemples de Référence

**Excellents exemples dans le projet :**

**Template 1 - Playground:**

- `Box.stories.tsx` - Playground (tous les controls)

**Template 2 - Simple (sans code):**

- _(À venir - variantes simples avec peu d'options)_

**Template 3 - Click + Tabs (JSX + HTML):**

- `Box.stories.tsx` - PropAs (polymorphisme avec code JSX + HTML)

**Template 4 - Visualization:**

- _(Pattern plus utilisé maintenant - remplacé par Template 6 avec code)_

**Template 5 - Directionnelle:**

- _(Désormais intégré dans Template 6 - voir variante A)_

**Template 6 - Hover JSX:**

- `Box.stories.tsx` - PropPadding (hover + code JSX)
- `Box.stories.tsx` - PropPaddingXY (hover + code + directions)
- `Box.stories.tsx` - PropPaddingIndividual (hover + code + 4 directions)
- `Box.stories.tsx` - PropMargin (hover + code JSX)
- `Box.stories.tsx` - PropMarginXY (hover + code + directions)
- `Box.stories.tsx` - PropMarginIndividual (hover + code + 4 directions)
- `Box.stories.tsx` - PropBackground (hover + code + 13 couleurs)
- `Box.stories.tsx` - PropBorderRadius (hover + code JSX)
- `Box.stories.tsx` - PropBorderWidth (hover + code JSX)
- `Box.stories.tsx` - PropBorderColor (hover + code JSX)
- `Box.stories.tsx` - PropDisplay (hover + code + layouts complexes)

**Helpers disponibles :**

- `StoryContainer` - Wrapper pour fullscreen
- `PropCard` - Card avec label (en bas), highlight et interaction
- `CodeBlock` - Affichage de code avec onglets ou single

**Documentation :**

- `helpers/README.md` - Guide complet des helpers
- `helpers/examples.tsx` - Exemples d'utilisation

---

**Créé le :** 2026-01-23  
**Dernière mise à jour :** 2026-01-23 (ajout Template 6 + arbre de décision)  
**Mainteneur :** Design System Team
