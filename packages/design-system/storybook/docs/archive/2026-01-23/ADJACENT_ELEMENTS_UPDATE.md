# PlaygroundContainer - Adjacent Elements Update

## 🎯 Problème Identifié

**Vous avez remarqué deux problèmes critiques :**

1. **Éléments adjacents incomplets** - Il manquait des éléments au-dessus et en-dessous
2. **Prop `display` non testable** - Le wrapper `flex` masquait l'effet de la prop `display` du Box

---

## ✅ Solution Implémentée

### **Avant (Version 1)**

```
Wrapper avec display: flex, gap: 12px  ← ❌ Masque l'effet de display!
├─ [Before] (inline dans le flex)
├─ <Box display="block"> (comportement masqué par flex)
└─ [After] (inline dans le flex)
```

**Problème:** Peu importe si Box a `display: block` ou `inline-block`, le wrapper flex force un layout flex.

---

### **Après (Version 2)**

```
Wrapper sans display (default: block)  ← ✅ Préserve display du Box!
├─ [Above] (block, marginBottom: 12px)
├─ Ligne inline:
│  ├─ [Before] (inline-block, marginRight: 12px)
│  ├─ <Box display="X"> (comportement réel visible!)
│  └─ [After] (inline-block, marginLeft: 12px)
└─ [Below] (block, marginTop: 12px)
```

**Avantage:** La prop `display` du Box fonctionne maintenant correctement !

---

## 🎨 Layout des Éléments Adjacents

### **Structure HTML**

```html
<div style={{ position: 'relative' }}>  <!-- Wrapper neutre -->

  <!-- Element Above (block) -->
  <div style={{ display: 'inline-block', marginBottom: '12px' }}>
    Above
  </div>

  <!-- Ligne inline avec Before/Box/After -->
  <div>
    <div style={{ display: 'inline-block', marginRight: '12px' }}>Before</div>
    <Box {...args} />  <!-- La prop display s'applique ici! -->
    <div style={{ display: 'inline-block', marginLeft: '12px' }}>After</div>
  </div>

  <!-- Element Below (block) -->
  <div style={{ display: 'inline-block', marginTop: '12px' }}>
    Below
  </div>

</div>
```

---

## 📊 Comportement par Prop `display`

### **`display: block`** (défaut)

```
┌─────────────────────────────────────┐
│  Above                              │
├─────────────────────────────────────┤
│  Before  [Box (full width)]  After  │  ← Box prend toute la largeur
├─────────────────────────────────────┤
│  Below                              │
└─────────────────────────────────────┘
```

### **`display: inline-block`**

```
┌─────────────────────────────────────┐
│  Above                              │
├─────────────────────────────────────┤
│  Before  [Box]  After               │  ← Box inline avec Before/After
├─────────────────────────────────────┤
│  Below                              │
└─────────────────────────────────────┘
```

### **`display: inline`**

```
┌─────────────────────────────────────┐
│  Above                              │
├─────────────────────────────────────┤
│  Before [Box] After                 │  ← Box comme du texte
├─────────────────────────────────────┤
│  Below                              │
└─────────────────────────────────────┘
```

### **`display: flex`**

```
┌─────────────────────────────────────┐
│  Above                              │
├─────────────────────────────────────┤
│  Before  [Box (flex container)]     │  ← Box devient conteneur flex
│         [Child items]               │
│  After                              │
├─────────────────────────────────────┤
│  Below                              │
└─────────────────────────────────────┘
```

---

## 🧪 Tests à Faire

### **Test 1: Display Block**

1. Ouvrir Playground Box
2. Activer "Show Adjacent Elements"
3. Controls: `display: 'block'` (défaut)
4. **Attendu:** Box prend toute la largeur, Before/After sur les côtés mais Box stretch

### **Test 2: Display Inline-Block**

1. Controls: `display: 'inline-block'`
2. **Attendu:** Before / Box / After sur la même ligne, Box ne prend que son contenu

### **Test 3: Display Inline**

1. Controls: `display: 'inline'`
2. **Attendu:** Comportement comme du texte, Before/Box/After inline

### **Test 4: Marges Visibles**

1. Controls: `margin: 'spacious'`
2. **Attendu:** Espace visible entre Box et bordure pointillée
3. Tester `marginTop`, `marginLeft`, etc.

### **Test 5: Éléments 4 Directions**

1. Activer "Show Adjacent Elements"
2. **Attendu:**
   - "Above" au-dessus du Box
   - "Before" à gauche du Box
   - "After" à droite du Box
   - "Below" en-dessous du Box

---

## 📝 Changements de Code

### **PlaygroundContainer.tsx**

**Ligne 202-210 (Ancien):**

```tsx
// ❌ Wrapper flex masquait le display
<div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
  {showAdjacentElements && <div>Before</div>}
  {children}
  {showAdjacentElements && <div>After</div>}
</div>
```

**Ligne 202-267 (Nouveau):**

```tsx
// ✅ Wrapper neutre + 4 éléments adjacents
<div style={{ position: 'relative' }}>
  {showAdjacentElements && <div style={{ display: 'inline-block', marginBottom: '12px' }}>Above</div>}

  <div>
    {showAdjacentElements && <div style={{ display: 'inline-block', marginRight: '12px' }}>Before</div>}
    {children}
    {showAdjacentElements && <div style={{ display: 'inline-block', marginLeft: '12px' }}>After</div>}
  </div>

  {showAdjacentElements && <div style={{ display: 'inline-block', marginTop: '12px' }}>Below</div>}
</div>
```

---

## ✨ Avantages

| Aspect                      | Version 1                | Version 2                       |
| --------------------------- | ------------------------ | ------------------------------- |
| **Éléments adjacents**      | 2 (Before/After) ❌      | 4 (Above/Before/After/Below) ✅ |
| **Prop `display` testable** | Non (masqué par flex) ❌ | Oui (wrapper neutre) ✅         |
| **Layout forcé**            | Flex ❌                  | Naturel (block + inline) ✅     |
| **Directions testées**      | Horizontal seulement ❌  | Horizontal + Vertical ✅        |

---

## 🎯 Cas d'Usage Réels

### **Exemple 1: Tester `display: inline-block`**

**Avant (Version 1):**

```
[Before] [Box] [After]  ← Tous dans un flex, impossible de voir inline-block
```

**Après (Version 2):**

```
Above
Before [Box] After  ← Box vraiment inline-block, visible!
Below
```

### **Exemple 2: Tester les Marges**

**Avant (Version 1):**

```
Container (dashed border)
  [Flex wrapper avec gap]
    ├─ Before
    ├─ Box (margin masqué par gap)
    └─ After
```

**Après (Version 2):**

```
Container (dashed border)
  Above
  Before [Box avec margin visible!] After
  Below
```

---

## 🚀 Status

✅ **Implémenté**

- 4 éléments adjacents (Above/Before/After/Below)
- Wrapper neutre sans flex/grid
- Marges naturelles entre éléments
- Prop `display` préservée

✅ **Documenté**

- PlaygroundContainer.tsx (JSDoc)
- helpers/README.md
- Box.stories.tsx (commentaires)

✅ **Prêt pour tests**

- TypeScript: ✅ No errors
- Storybook: ✅ Running on :6006

---

**Next:** Test dans Storybook pour valider le comportement  
**URL:** http://localhost:6006/?path=/story/primitives-box--playground  
**Toggle:** "Show Adjacent Elements" → Devrait afficher Above/Before/After/Below
