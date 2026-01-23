# 🎨 Visual Guide - Testing Display Flex/Grid

**Quick Guide:** Comment tester les modes `display: flex` et `display: grid` dans le Box Playground

**Storybook URL:** http://localhost:6006/?path=/story/primitives-box--playground

---

## 🎯 Quick Test (5 minutes)

### Test 1: Display Flex (2 min)

**Steps:**

1. Ouvrir Playground: http://localhost:6006/?path=/story/primitives-box--playground
2. **Controls panel** > **Playground** > **Content Type** > Sélectionner **"multipleItems"**
3. **Controls panel** > **Layout** > **Display** > Sélectionner **"flex"**
4. Observer le résultat

**Ce que tu devrais voir:**

```
┌──────────────────────────────────────────────────────────┐
│ Box avec display: flex                                   │
│                                                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │ Item 1 │ │ Item 2 │ │ Item 3 │ │ Item 4 │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
│                                                          │
│  (4 items alignés horizontalement - flex row)           │
└──────────────────────────────────────────────────────────┘
```

**Caractéristiques:**

- ✅ 4 items sur la **même ligne** (flex-direction: row par défaut)
- ✅ Chaque item a un **background blanc transparent**
- ✅ Items ont du **padding** (8px) et **border-radius** (4px)
- ✅ Texte centré dans chaque item

---

### Test 2: Display Grid (2 min)

**Steps:**

1. **Content Type** toujours sur **"multipleItems"**
2. **Display** > Changer pour **"grid"**
3. Observer le résultat

**Ce que tu devrais voir:**

```
┌──────────────────────────────────────────────────────────┐
│ Box avec display: grid                                   │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Item 1                                             │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Item 2                                             │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Item 3                                             │ │
│  └────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────┐ │
│  │ Item 4                                             │ │
│  └────────────────────────────────────────────────────┘ │
│                                                          │
│  (4 items empilés verticalement - grille 1 colonne)     │
└──────────────────────────────────────────────────────────┘
```

**Caractéristiques:**

- ✅ 4 items **empilés verticalement** (grid 1 colonne par défaut)
- ✅ Chaque item prend toute la largeur
- ✅ Même style que flex (background, padding, radius)

---

### Test 3: Comparaison avec Mode Text (1 min)

**Steps:**

1. **Content Type** > Changer pour **"text"**
2. **Display** > "flex" ou "grid"
3. Observer: **aucun effet visible** (normal!)

**Ce que tu devrais voir:**

```
┌──────────────────────────────────────────────────────────┐
│ Box avec display: flex (mais content type = text)       │
│                                                          │
│  🎨 Edit the controls to see changes in real-time!      │
│                                                          │
│  (Texte simple - flex n'a aucun effet)                  │
└──────────────────────────────────────────────────────────┘
```

**Explication:**

- `display: flex` et `grid` nécessitent **plusieurs enfants** pour avoir un effet
- Avec du texte simple, pas d'effet visible (c'est normal!)
- C'est pourquoi on a créé le mode "multipleItems" ✨

---

## 🎨 Styling des Items

Les 4 items générés en mode "multipleItems" ont ce style :

```tsx
<div
  style={{
    padding: '8px',
    background: 'rgba(255, 255, 255, 0.2)', // Blanc transparent
    borderRadius: '4px',
  }}
>
  Item 1
</div>
```

**Pourquoi ce style?**

- **Background transparent:** Visible sur le fond bleu du Box (background: 'info')
- **Padding 8px:** Donne de l'espace interne pour la lisibilité
- **Border radius:** Délimite visuellement chaque item
- **Texte simple:** "Item 1", "Item 2", etc. (clair et concis)

---

## 📸 Screenshots Recommandés

**Pour documentation/validation, prendre ces screenshots:**

### Screenshot 1: Display Flex

- Content Type: "multipleItems"
- Display: "flex"
- Background: "info" (bleu)
- Show Grid: ✅ (pour voir alignement)

**Nom fichier:** `playground-display-flex.png`

---

### Screenshot 2: Display Grid

- Content Type: "multipleItems"
- Display: "grid"
- Background: "info" (bleu)
- Show Grid: ✅

**Nom fichier:** `playground-display-grid.png`

---

### Screenshot 3: Avec Adjacent Elements

- Content Type: "multipleItems"
- Display: "flex"
- Show Adjacent Elements: ✅
- Montre Before/Box/After alignment

**Nom fichier:** `playground-flex-with-adjacent.png`

---

### Screenshot 4: Content Type Comparison

- Split screen: "text" vs "multipleItems"
- Display: "flex" pour les deux
- Montre la différence

**Nom fichier:** `playground-content-type-comparison.png`

---

## 🧪 Tests Avancés (Optionnel)

### Avec DevTools: Flex Direction

**Steps:**

1. Display: "flex", Content Type: "multipleItems"
2. Ouvrir DevTools (F12)
3. Inspecter le Box
4. Ajouter style: `flex-direction: column`
5. Observer: items empilés verticalement

**Résultat:**

```
┌────────────────────────────┐
│ Item 1                     │
├────────────────────────────┤
│ Item 2                     │
├────────────────────────────┤
│ Item 3                     │
├────────────────────────────┤
│ Item 4                     │
└────────────────────────────┘
```

---

### Avec DevTools: Grid Template Columns

**Steps:**

1. Display: "grid", Content Type: "multipleItems"
2. DevTools > Ajouter: `grid-template-columns: 1fr 1fr`
3. Observer: grille 2x2

**Résultat:**

```
┌──────────────┬──────────────┐
│ Item 1       │ Item 2       │
├──────────────┼──────────────┤
│ Item 3       │ Item 4       │
└──────────────┴──────────────┘
```

---

### Avec DevTools: Gap

**Steps:**

1. Display: "flex", Content Type: "multipleItems"
2. DevTools > Ajouter: `gap: 16px`
3. Observer: espacement entre items

**Résultat:**

```
┌────┐    ┌────┐    ┌────┐    ┌────┐
│ 1  │ 16 │ 2  │ 16 │ 3  │ 16 │ 4  │
└────┘ px └────┘ px └────┘ px └────┘
```

---

## 🎯 Checklist de Validation

### Comportement Flex

- [ ] Content Type "multipleItems" + Display "flex" → Items horizontaux
- [ ] Items ont background blanc transparent
- [ ] Items ont padding et border-radius visibles
- [ ] Tous les 4 items visibles sur la même ligne

### Comportement Grid

- [ ] Content Type "multipleItems" + Display "grid" → Items verticaux
- [ ] Items empilés en 1 colonne
- [ ] Chaque item prend toute la largeur
- [ ] 4 items visibles, empilés

### Comparaison Text vs Multiple Items

- [ ] Content Type "text" → Texte simple affiché
- [ ] Content Type "multipleItems" → 4 divs affichés
- [ ] Facile de basculer entre les deux modes
- [ ] Changement immédiat (pas de reload)

### Interaction avec Autres Props

- [ ] Flex + margin → Marges visibles avec bordure pointillée
- [ ] Flex + padding → Padding autour des items
- [ ] Flex + Show Grid → Grille visible pour alignement
- [ ] Flex + Show Adjacent Elements → Before/After visibles

---

## 💡 Tips d'Utilisation

### Quand utiliser "text" vs "multipleItems"?

**Utiliser "text" (défaut) pour tester:**

- ✅ Padding (compact, default, comfortable, spacious)
- ✅ Margin (toutes directions)
- ✅ Background (colors)
- ✅ Border (radius, width, color, style)
- ✅ Display block/inline-block/inline

**Utiliser "multipleItems" pour tester:**

- ✅ Display flex (flex-direction, justify-content, align-items)
- ✅ Display grid (grid-template-columns, gap, etc.)
- ✅ Layout de conteneur avec enfants multiples

---

## 🔄 Workflow Typique

### Scénario 1: Je veux tester le padding du Box

```
1. Content Type = "text" (défaut)
2. Padding = "spacious"
3. Observer: Plus d'espace autour du texte
✅ Parfait!
```

### Scénario 2: Je veux tester flex layout

```
1. Content Type = "multipleItems" ⭐
2. Display = "flex"
3. Observer: 4 items alignés horizontalement
✅ Parfait!
```

### Scénario 3: Je veux tester margin + display

```
1. Content Type = "text"
2. Margin = "spacious"
3. Display = "block"
4. Show Adjacent Elements = ✅
5. Observer: Margin visible, éléments empilés
✅ Parfait!
```

---

## 🎉 Résultat Final

**Avant le fix:**

- ❌ Display flex → Aucun effet visible
- ❌ Display grid → Aucun effet visible
- ⚠️ 2 modes sur 5 non testables (40%)

**Après le fix:**

- ✅ Display flex → Items alignés horizontalement
- ✅ Display grid → Items en grille verticale
- ✅ 5 modes sur 5 testables (100%)

**Impact:**

- ✅ Playground complet et fonctionnel
- ✅ Tous les modes display visualisables
- ✅ Meilleure expérience développeur
- ✅ Documentation à jour

---

**Guide créé:** Session 5 (Display Fix)  
**Pour:** Validation manuelle du nouveau feature  
**Temps:** 5 min (quick test) à 15 min (tests avancés)  
**Status:** ✅ Ready for Testing

---

**Bon test! 🚀**
