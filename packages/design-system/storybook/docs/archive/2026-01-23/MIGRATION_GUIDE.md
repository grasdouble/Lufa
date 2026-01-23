# 🔄 Guide de Migration - Stories vers Template 6 (Hover JSX)

Guide pratique pour migrer des stories existantes vers le nouveau pattern Template 6 avec hover interaction et CodeBlock dynamique.

---

## 📋 Quand Migrer une Story vers Template 6 ?

Utilisez cette checklist pour déterminer si une story devrait être migrée:

### ✅ OUI - Migrer vers Template 6 si:

- [ ] La story montre des **props visuelles** (padding, margin, colors, borders, etc.)
- [ ] La prop a **4+ variantes** à explorer
- [ ] Le **code JSX est utile** à montrer aux users
- [ ] L'**HTML output n'est pas important** (la structure ne change pas)
- [ ] L'interaction actuelle est **aucune ou click basique**

### ❌ NON - Garder le template actuel si:

- [ ] La story utilise **props polymorphiques** (as) → Garder Template 3
- [ ] La prop change la **structure HTML** → Garder Template 3
- [ ] Il y a **moins de 3 variantes** → Garder Template 2 (simple)
- [ ] La **visualisation seule suffit** → Garder Template 2 ou 4
- [ ] L'interaction click est **nécessaire** (copie de code stable)

---

## 🛠️ Étapes de Migration

### Étape 1: Préparer la Story

**Avant (Template 2 - Simple):**

```tsx
export const PropPadding: Story = {
  render: () => (
    <StoryContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((padding) => (
          <PropCard key={padding} label={`padding="${padding}"`}>
            <Box padding={padding} background="info">
              Content
            </Box>
          </PropCard>
        ))}
      </div>
    </StoryContainer>
  ),
};
```

### Étape 2: Ajouter le State pour Hover

```tsx
export const PropPadding: Story = {
  render: () => {
    // ✅ AJOUT: State pour tracker le hover
    const [hoveredPadding, setHoveredPadding] = React.useState<string>('default');

    return <StoryContainer>{/* ... */}</StoryContainer>;
  },
};
```

**💡 Choisir la valeur initiale:**

- Utiliser `'default'` si cette valeur existe
- Sinon, utiliser la première valeur du tableau
- Objectif: montrer un exemple représentatif dès le chargement

### Étape 3: Wrapper les PropCards avec div + onMouseEnter

```tsx
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '12px', // ✅ Changé de 16px à 12px
  }}
>
  {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((padding) => (
    // ✅ AJOUT: Wrapper div avec onMouseEnter
    <div key={padding} onMouseEnter={() => setHoveredPadding(padding)}>
      <PropCard
        label={`padding="${padding}"`}
        highlight={hoveredPadding === padding} // ✅ AJOUT: highlight
      >
        <Box padding={padding} background="info">
          Content
        </Box>
      </PropCard>
    </div>
  ))}
</div>
```

### Étape 4: Créer la Fonction de Génération de Code

```tsx
const [hoveredPadding, setHoveredPadding] = React.useState<string>('default');

// ✅ AJOUT: Fonction pour générer le code
const generateCode = (padding: string): string => {
  return `<Box padding="${padding}" background="info" borderRadius="default">
  Content
</Box>`;
};
```

**💡 Conseils pour le code généré:**

**✅ BON - Code simplifié et pédagogique:**

```tsx
const generateCode = (padding: string): string => {
  return `<Box padding="${padding}" background="info">
  Content
</Box>`;
};
```

**❌ MAUVAIS - Trop de props non pertinentes:**

```tsx
const generateCode = (padding: string): string => {
  return `<Box 
  padding="${padding}" 
  background="info" 
  borderRadius="default"
  borderWidth="thin"
  borderColor="default"
  margin="none"
  display="block"
>
  Content
</Box>`;
};
```

**Règle:** Montrer uniquement les props **pertinentes** pour la démonstration. Si on démontre `padding`, on peut inclure `background` pour la visualisation, mais pas toutes les autres props.

### Étape 5: Ajouter le CodeBlock

```tsx
return (
  <StoryContainer>
    {/* ✅ AJOUT: Wrapper flex column avec gap 24px */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Grid existant */}
      <div style={{ display: 'grid' /* ... */ }}>{/* ... PropCards ... */}</div>

      {/* ✅ AJOUT: CodeBlock */}
      <CodeBlock
        code={generateCode(hoveredPadding)}
        language="jsx"
        title="JSX"
        subtitle={`padding="${hoveredPadding}"`}
      />
    </div>
  </StoryContainer>
);
```

### Étape 6: Vérifier et Tester

**Checklist de vérification:**

- [ ] Hover sur une carte met à jour le code
- [ ] Highlight apparaît sur la carte survolée
- [ ] Subtitle du CodeBlock affiche la bonne valeur
- [ ] Code généré est simplifié et lisible
- [ ] Gap de 24px entre grid et CodeBlock
- [ ] Gap de 12px dans la grid
- [ ] Valeur initiale du state est cohérente

**Tester dans Storybook:**

1. Ouvrir la story dans Storybook
2. Survoler chaque carte → Code doit changer
3. Vérifier que le highlight fonctionne
4. Vérifier que le subtitle se met à jour
5. Vérifier l'alignement visuel

---

## 🎨 Cas Spéciaux

### Cas 1: Props Directionnelles (X/Y)

Pour des props comme `paddingX`, `paddingY`, utiliser un tableau d'objets pour les variantes:

```tsx
const [hovered, setHovered] = React.useState<string>('paddingX');

const variants = [
  { key: 'paddingX', label: 'paddingX="spacious" (← →)' },
  { key: 'paddingY', label: 'paddingY="spacious" (↑ ↓)' },
  { key: 'combined', label: 'paddingX + paddingY' },
];

const generateCode = (variant: string): string => {
  if (variant === 'paddingX') {
    return `<Box paddingX="spacious">Horizontal</Box>`;
  } else if (variant === 'paddingY') {
    return `<Box paddingY="spacious">Vertical</Box>`;
  } else {
    return `<Box paddingX="spacious" paddingY="compact">Combined</Box>`;
  }
};

return (
  <StoryContainer>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
        {variants.map(({ key, label }) => (
          <div key={key} onMouseEnter={() => setHovered(key)}>
            <PropCard label={label} highlight={hovered === key}>
              {/* Contenu spécifique selon variant */}
            </PropCard>
          </div>
        ))}
      </div>
      <CodeBlock code={generateCode(hovered)} language="jsx" title="JSX" subtitle={hovered} />
    </div>
  </StoryContainer>
);
```

### Cas 2: Display Types (Code Complexe)

Pour des props comme `display` où le code varie significativement:

```tsx
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
  } else if (display === 'inline-block') {
    return `<span>Text before </span>
<Box display="inline-block">inline element</Box>
<span> text after</span>`;
  }
  return `<Box display="${display}">
  Block content (takes full width)
</Box>`;
};
```

### Cas 3: Beaucoup de Variantes (13+ comme Background)

Pour des props avec beaucoup de valeurs (ex: 13 couleurs de background):

```tsx
const backgroundValues = [
  'page',
  'surface',
  'success',
  'error',
  'warning',
  'info',
  'overlay',
  'on-primary',
  'on-secondary',
  'on-success',
  'on-error',
  'on-warning',
  'on-info',
] as const;

const [hoveredBackground, setHoveredBackground] = React.useState<string>('surface');

// Grid plus large pour accueillir plus de cartes
<div
  style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', // Plus petit minmax
    gap: '12px',
  }}
>
  {backgroundValues.map((bg) => (
    <div key={bg} onMouseEnter={() => setHoveredBackground(bg)}>
      <PropCard label={`background="${bg}"`} highlight={hoveredBackground === bg}>
        <Box padding="comfortable" background={bg} borderRadius="default">
          {bg}
        </Box>
      </PropCard>
    </div>
  ))}
</div>;
```

---

## 🐛 Problèmes Courants et Solutions

### Problème 1: Code ne se met pas à jour au survol

**Cause:** Le wrapper div n'a pas `onMouseEnter` ou le state n'est pas connecté

**Solution:**

```tsx
// ✅ BON
<div key={value} onMouseEnter={() => setHovered(value)}>
  <PropCard highlight={hovered === value}>
    {/* ... */}
  </PropCard>
</div>

// ❌ MAUVAIS - onMouseEnter directement sur PropCard
<PropCard onMouseEnter={() => setHovered(value)}>
  {/* Ne fonctionne pas - PropCard n'expose pas cet event */}
</PropCard>
```

### Problème 2: Highlight ne s'affiche pas

**Cause:** La prop `highlight` n'est pas passée ou la valeur de comparaison est incorrecte

**Solution:**

```tsx
// ✅ Vérifier que le type correspond (string vs string)
highlight={hoveredPadding === padding}

// ❌ Attention aux types différents
const [hovered, setHovered] = React.useState<number>(0);
// ...
highlight={hovered === 'default'} // ❌ number !== string
```

### Problème 3: Gap trop grand/petit dans la grid

**Cause:** Mauvaise valeur de gap

**Solution:**

```tsx
// ✅ Template 6: Gap de 12px dans la grid (plus serré)
gap: '12px'

// ❌ Ancien Template 2: Gap de 16px
gap: '16px'

// ✅ Entre grid et CodeBlock: 24px
<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
```

### Problème 4: Labels longs cassent l'alignement

**Cause:** Les labels sont en haut de la PropCard (ancien comportement)

**Solution:** Utiliser la version mise à jour de PropCard avec labels en bas (déjà fait si PropCard.tsx est à jour)

### Problème 5: Valeur initiale du state incorrecte

**Cause:** La valeur initiale n'existe pas dans le tableau de valeurs

**Solution:**

```tsx
// ✅ BON - Utiliser une valeur qui existe
const [hoveredPadding, setHoveredPadding] = React.useState<string>('default');
const values = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'];

// ❌ MAUVAIS - Valeur qui n'existe pas
const [hoveredPadding, setHoveredPadding] = React.useState<string>('medium');
const values = ['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'];
// → Le code initial affichera 'medium' mais aucune carte ne sera highlight
```

---

## 📊 Checklist Complète de Migration

**Avant de commencer:**

- [ ] Lire le Template 6 dans STORY_TEMPLATES.md
- [ ] Vérifier que la story est candidate à la migration (voir section "Quand Migrer")
- [ ] Sauvegarder la version actuelle (commit git)

**Migration:**

- [ ] Ajouter le state avec `useState` (valeur initiale = 'default' ou première valeur)
- [ ] Créer la fonction `generateCode` (code simplifié)
- [ ] Changer le gap de la grid de 16px à 12px
- [ ] Wrapper chaque PropCard avec `<div onMouseEnter={...}>`
- [ ] Ajouter la prop `highlight` sur PropCard
- [ ] Wrapper la grid dans un flex column avec gap 24px
- [ ] Ajouter le CodeBlock en dessous de la grid

**Après migration:**

- [ ] Tester le hover dans Storybook (chaque carte)
- [ ] Vérifier que le highlight fonctionne
- [ ] Vérifier que le code se met à jour
- [ ] Vérifier que le subtitle affiche la bonne valeur
- [ ] Vérifier l'alignement visuel
- [ ] Vérifier que le code généré est lisible
- [ ] Commit avec message descriptif

---

## 📈 Exemples Avant/Après

### Exemple 1: PropPadding (Simple → Hover JSX)

**❌ AVANT (Template 2 - Simple):**

```tsx
export const PropPadding: Story = {
  render: () => (
    <StoryContainer>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        {(['none', 'tight', 'compact', 'default', 'comfortable', 'spacious'] as const).map((padding) => (
          <PropCard key={padding} label={`padding="${padding}"`}>
            <Box padding={padding} background="info">
              Content
            </Box>
          </PropCard>
        ))}
      </div>
    </StoryContainer>
  ),
};
```

**✅ APRÈS (Template 6 - Hover JSX):**

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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
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

**Différences clés:**

1. ➕ State `hoveredPadding` ajouté
2. ➕ Fonction `generateCode` ajoutée
3. 🔄 Gap changé de 16px → 12px
4. ➕ Wrapper `<div onMouseEnter>` autour de PropCard
5. ➕ Prop `highlight` sur PropCard
6. ➕ Wrapper flex column avec gap 24px
7. ➕ CodeBlock en dessous

---

## 🎯 Prochaines Stories à Migrer

**Priorité Haute (Props visuelles avec beaucoup de variantes):**

- [ ] Stack.stories.tsx - PropGap
- [ ] Stack.stories.tsx - PropDirection
- [ ] Text.stories.tsx - PropSize
- [ ] Text.stories.tsx - PropWeight
- [ ] Text.stories.tsx - PropColor

**Priorité Moyenne:**

- [ ] Button.stories.tsx - PropVariant (si 4+ variantes)
- [ ] Button.stories.tsx - PropSize

**Priorité Basse (à évaluer):**

- Stories avec moins de 3 variantes → Peut-être garder Template 2

---

**Auteur:** Design System Team  
**Dernière mise à jour:** 2026-01-23  
**Version:** 1.0.0
