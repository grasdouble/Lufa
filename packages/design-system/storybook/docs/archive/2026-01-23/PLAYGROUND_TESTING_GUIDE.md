# 🧪 Guide de Test - PlaygroundContainer

Guide complet pour tester les fonctionnalités du `PlaygroundContainer` avec le composant Box.

---

## 🎯 Objectifs des Tests

Valider que le `PlaygroundContainer` permet de visualiser correctement :

1. ✅ **Props margin\*** - Espaces visibles avec la bordure pointillée
2. ✅ **Prop display** - Impact sur le layout avec éléments adjacents
3. ✅ **Toggles UI** - Grille et éléments adjacents activables/désactivables
4. ✅ **Layout neutre** - Aucun style de layout forcé sur le composant

---

## 📍 Accès au Playground

**URL Storybook:** http://localhost:6006/?path=/story/primitives-box--playground

**Étapes:**

1. Ouvrir Storybook (doit tourner sur port 6006)
2. Naviguer vers **Primitives > Box > Playground**
3. Observer le container avec bordure pointillée et les toggles en haut

---

## 🧩 Structure Visuelle du Playground

```
┌──────────────────────────────────────────────────────────────┐
│  Canvas (#fafafa) - padding 48px                             │
│                                                              │
│  ☑ Show Grid  ☐ Show Adjacent Elements  ← UI Toggles       │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Container (dashed border #cbd5e1, white bg)            │ │
│  │                                                         │ │
│  │  Grid: ─────────┼───────── (lignes centrées)           │ │
│  │                 │                                       │ │
│  │                 │                                       │ │
│  │                 ├─── Croix 12x12px (centre)            │ │
│  │                 │                                       │ │
│  │          🎨 Box (bleu/info)                             │ │
│  │     (contenu centré horizontalement et verticalement)  │ │
│  │                                                         │ │
│  └────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

**Avec éléments adjacents activés:**

```
┌────────────────────────────────────────────────────────┐
│ Container (dashed border)                               │
│                                                         │
│                  Above (block, centré)                  │
│                                                         │
│      Before   🎨 Box (inline-block)   After             │
│      (tous inline-block, vertical-align: middle)       │
│                                                         │
│                  Below (block, centré)                  │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## 🧪 Tests à Effectuer

### Test Suite 1: UI Toggles ✅

#### Test 1.1: Toggle "Show Grid"

**État initial:** ☑ Show Grid (activé par défaut)

**Actions:**

1. Ouvrir le Playground
2. Observer la grille visible (lignes grises + croix centrale)
3. Décocher "Show Grid"
4. Observer la grille disparaît
5. Re-cocher "Show Grid"
6. Observer la grille réapparaît

**Résultat attendu:**

- ✅ Grille toggle correctement (visible/cachée)
- ✅ Lignes horizontale et verticale centrées
- ✅ Croix 12x12px au centre (gris ardoise)
- ✅ Pas de saut de layout lors du toggle

---

#### Test 1.2: Toggle "Show Adjacent Elements"

**État initial:** ☐ Show Adjacent Elements (désactivé par défaut)

**Actions:**

1. Observer uniquement le Box centré
2. Cocher "Show Adjacent Elements"
3. Observer 4 éléments apparaissent (Above, Before, After, Below)
4. Décocher "Show Adjacent Elements"
5. Observer les éléments disparaissent

**Résultat attendu:**

- ✅ 4 éléments apparaissent/disparaissent correctement
- ✅ Above: au-dessus, centré
- ✅ Before/After: sur la même ligne que Box, alignés verticalement
- ✅ Below: en-dessous, centré
- ✅ Box reste centré avec ou sans éléments adjacents

---

### Test Suite 2: Props Margin (Spacing) 🔲

**But:** Valider que les marges sont visibles grâce à la bordure pointillée du container.

#### Test 2.1: Margin Uniforme

**Actions:**

1. Activer "Show Adjacent Elements" (optionnel)
2. Dans **Controls** > **Margin** > Sélectionner **"spacious"** (32px)
3. Observer l'espace entre le Box et la bordure pointillée

**Résultat attendu:**

- ✅ Espace visible tout autour du Box (32px)
- ✅ Bordure pointillée montre clairement l'espace
- ✅ Box conserve son contenu/apparence

**Valeurs à tester:**

| Margin        | Valeur | Attendu                    |
| ------------- | ------ | -------------------------- |
| `compact`     | 8px    | Petit espace visible       |
| `default`     | 16px   | Espace moyen visible       |
| `comfortable` | 24px   | Espace confortable visible |
| `spacious`    | 32px   | Grand espace visible       |

---

#### Test 2.2: Margin Directionnel (Top)

**Actions:**

1. Réinitialiser `margin` à `undefined`
2. Dans **Controls** > **Margin Top** > Sélectionner **"spacious"**
3. Observer l'espace uniquement EN HAUT du Box

**Résultat attendu:**

- ✅ Espace de 32px visible EN HAUT uniquement
- ✅ Autres côtés sans marge
- ✅ Bordure pointillée montre l'asymétrie

---

#### Test 2.3: Margin Directionnel (Left)

**Actions:**

1. Réinitialiser `marginTop` à `undefined`
2. Dans **Controls** > **Margin Left** > Sélectionner **"spacious"**
3. Observer l'espace uniquement À GAUCHE du Box

**Résultat attendu:**

- ✅ Espace de 32px visible À GAUCHE uniquement
- ✅ Box décalé vers la droite
- ✅ Alignement horizontal affecté (visible avec grille)

---

#### Test 2.4: Margin Combiné

**Actions:**

1. `marginTop` = "spacious" (32px)
2. `marginBottom` = "compact" (8px)
3. `marginLeft` = "comfortable" (24px)
4. `marginRight` = "default" (16px)
5. Observer les différents espacements

**Résultat attendu:**

- ✅ Chaque côté a un espace différent
- ✅ Box décalé selon les marges
- ✅ Asymétrie clairement visible avec bordure pointillée

---

### Test Suite 3: Prop Display (Layout Behavior) 📐

**But:** Valider que le wrapper neutre préserve la prop `display` du Box et que les éléments adjacents montrent son impact.

**Prérequis:** ☑ Show Adjacent Elements activé

---

#### Test 3.1: Display Block

**Actions:**

1. Activer "Show Adjacent Elements"
2. Dans **Controls** > **Display** > Sélectionner **"block"**
3. Observer le layout

**Résultat attendu:**

- ✅ Box prend toute la largeur disponible
- ✅ Above au-dessus (empilé verticalement)
- ✅ Before/After ne sont PLUS sur la même ligne (empilés verticalement)
- ✅ Below en-dessous (empilé verticalement)
- ✅ Layout vertical complet

**Explication:**
`display: block` fait prendre toute la largeur au Box → empile les éléments verticalement.

---

#### Test 3.2: Display Inline-Block (défaut du wrapper)

**Actions:**

1. Dans **Controls** > **Display** > Sélectionner **"inline-block"**
2. Observer le layout

**Résultat attendu:**

- ✅ Box prend la largeur de son contenu
- ✅ Above au-dessus (centré)
- ✅ Before + Box + After sur la MÊME LIGNE (inline)
- ✅ Tous alignés verticalement (vertical-align: middle)
- ✅ Below en-dessous (centré)

**Explication:**
`display: inline-block` permet au Box de rester inline avec Before/After.

---

#### Test 3.3: Display Inline

**Actions:**

1. Dans **Controls** > **Display** > Sélectionner **"inline"**
2. Observer le layout

**Résultat attendu:**

- ✅ Box se comporte comme du texte inline
- ✅ Padding peut être limité (comportement inline)
- ✅ Before + Box + After sur la même ligne
- ✅ Box suit le flux de texte

**Explication:**
`display: inline` traite le Box comme du texte → padding vertical peut ne pas s'appliquer complètement.

---

#### Test 3.4: Display Flex ✨ NOUVEAU

**Actions:**

1. Dans **Controls** > **Content Type** > Sélectionner **"multipleItems"** ⭐
2. Dans **Controls** > **Display** > Sélectionner **"flex"**
3. Observer le Box avec 4 items

**Résultat attendu:**

- ✅ Box devient un conteneur flex
- ✅ Les 4 items (Item 1, 2, 3, 4) s'alignent horizontalement
- ✅ Flex-direction par défaut: `row` (ligne horizontale)
- ✅ Layout externe préservé (éléments adjacents toujours présents)

**Explication:**
`display: flex` organise les enfants en flexbox. Avec `multipleItems`, les 4 divs s'alignent en rangée horizontale.

**Bonus - Tester flex-direction (DevTools):**

- Ajouter `flex-direction: column` → Items empilés verticalement
- Ajouter `gap: 16px` → Espacement entre items

---

#### Test 3.5: Display Grid ✨ NOUVEAU

**Actions:**

1. Dans **Controls** > **Content Type** > Sélectionner **"multipleItems"** ⭐
2. Dans **Controls** > **Display** > Sélectionner **"grid"**
3. Observer le Box avec 4 items

**Résultat attendu:**

- ✅ Box devient un conteneur grid
- ✅ Les 4 items s'organisent en grille (par défaut: 1 colonne, 4 rangées)
- ✅ Items empilés verticalement (grid-template-columns non défini)
- ✅ Layout externe préservé

**Explication:**
`display: grid` crée une grille. Sans `grid-template-columns`, les items s'empilent en une seule colonne.

**Bonus - Tester grid-template-columns (DevTools):**

- Ajouter `grid-template-columns: 1fr 1fr` → Grille 2x2
- Ajouter `gap: 12px` → Espacement entre cellules

---

### Test Suite 4: Combinaisons Display + Margin 🎯

**But:** Valider que margin et display fonctionnent ensemble sans interférence.

#### Test 4.1: Block avec Margin Spacious

**Actions:**

1. `display` = "block"
2. `margin` = "spacious" (32px)
3. Activer "Show Adjacent Elements"

**Résultat attendu:**

- ✅ Box en block (toute la largeur)
- ✅ Marge de 32px visible tout autour avec bordure pointillée
- ✅ Éléments adjacents empilés verticalement

---

#### Test 4.2: Inline-Block avec Margin Left/Right

**Actions:**

1. `display` = "inline-block"
2. `marginLeft` = "spacious" (32px)
3. `marginRight` = "spacious" (32px)
4. Activer "Show Adjacent Elements"

**Résultat attendu:**

- ✅ Box inline avec Before/After sur la même ligne
- ✅ Marges gauche/droite de 32px visibles
- ✅ Before et After éloignés du Box

---

#### Test 4.3: Block avec Margin Directionnel Asymétrique

**Actions:**

1. `display` = "block"
2. `marginTop` = "spacious" (32px)
3. `marginBottom` = "compact" (8px)

**Résultat attendu:**

- ✅ Box en block (toute largeur)
- ✅ Grand espace en haut (32px)
- ✅ Petit espace en bas (8px)
- ✅ Asymétrie claire avec bordure pointillée

---

### Test Suite 5: Grille de Guidage 📏

**But:** Valider que la grille aide à visualiser l'alignement.

#### Test 5.1: Box Centré sans Marge

**Actions:**

1. Activer "Show Grid"
2. Réinitialiser toutes les marges à `undefined`
3. Observer l'alignement du Box avec la grille

**Résultat attendu:**

- ✅ Box centré horizontalement (ligne verticale passe au centre)
- ✅ Box centré verticalement (ligne horizontale passe au centre)
- ✅ Croix 12x12px au centre du Box (environ)

---

#### Test 5.2: Box Décalé avec Margin

**Actions:**

1. Activer "Show Grid"
2. `marginLeft` = "spacious" (32px)
3. Observer le décalage du Box par rapport à la ligne verticale

**Résultat attendu:**

- ✅ Box décalé de 32px vers la droite
- ✅ Ligne verticale ne passe plus au centre du Box
- ✅ Décalage visible grâce à la grille

---

### Test Suite 6: Responsive et Long Content 📱

**But:** Tester le comportement avec contenu long et viewport réduit.

#### Test 6.1: Contenu Long

**Actions:**

1. Dans **Controls** > **Children** > Remplacer par un texte long:
   ```
   Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
   ```
2. Observer le Box

**Résultat attendu:**

- ✅ Box s'adapte au contenu (width augmente)
- ✅ Container avec bordure pointillée s'adapte
- ✅ Pas de débordement (overflow visible)

---

#### Test 6.2: Viewport Réduit (Simulation Mobile)

**Actions:**

1. Dans Storybook, cliquer sur l'icône viewport (en haut)
2. Sélectionner "Mobile" (375px)
3. Observer le layout

**Résultat attendu:**

- ✅ Container s'adapte (minWidth: 400px peut casser)
- ⚠️ **Limitation connue:** Container peut dépasser sur mobile (minWidth: 400px)
- ✅ Box reste lisible

**Note:** Voir "Issues Connus" plus bas pour amélioration responsive.

---

## 🎯 Checklist Rapide de Validation

Utilisez cette checklist pour valider rapidement toutes les fonctionnalités :

### UI Toggles

- [ ] Toggle "Show Grid" fonctionne (grille apparaît/disparaît)
- [ ] Toggle "Show Adjacent Elements" fonctionne (4 éléments apparaissent/disparaissent)
- [ ] Pas de saut de layout lors des toggles

### Margin Props

- [ ] `margin` uniforme visible (test "spacious")
- [ ] `marginTop` visible uniquement en haut
- [ ] `marginLeft` visible uniquement à gauche
- [ ] Margin combiné (plusieurs directions) affiche correctement

### Display Props

- [ ] `display: block` → Box en block, éléments empilés verticalement
- [ ] `display: inline-block` → Before/Box/After sur même ligne, alignés
- [ ] `display: inline` → Box se comporte comme texte inline
- [ ] `display: flex` → Box devient conteneur flex (**Content Type: "multipleItems"** ⭐)
- [ ] `display: grid` → Box devient conteneur grid (**Content Type: "multipleItems"** ⭐)

### Grille de Guidage

- [ ] Lignes horizontale et verticale centrées
- [ ] Croix 12x12px au centre
- [ ] Grille aide à visualiser alignement et décalages

### Layout Neutre

- [ ] Wrapper ne force pas de display flex/grid
- [ ] Prop display du Box fonctionne correctement
- [ ] Éléments adjacents ne cassent pas le layout

---

## 🐛 Issues Connus et Limitations

### ✅ Résolus

1. ~~Container flex masquait display prop~~ → Fixed (wrapper neutre)
2. ~~Above/Below alignés à gauche~~ → Fixed (block + text-align center)
3. ~~Before/After pas alignés avec Box~~ → Fixed (vertical-align: middle)
4. ~~Display Grid/Flex avec Children Simple~~ → **Fixed (Content Type control)** ✨

### ⚠️ Limitations Actuelles

#### 1. Responsive Mobile

**Problème:** Container a `minWidth: 400px`, peut dépasser sur mobile (375px)  
**Impact:** Scroll horizontal sur petits viewports  
**Workaround:** Tester en desktop (1024px+)  
**Fix potentiel:** Rendre `minWidth` responsive ou paramétrable

#### 2. Long Content Overflow

**Problème:** Si Box très large, peut dépasser container  
**Impact:** Container bordure pointillée ne wrap pas parfaitement  
**Workaround:** Utiliser contenu court/medium  
**Fix potentiel:** Ajouter `overflow: auto` ou `max-width` sur wrapper

#### 3. Z-index Grille

**Problème:** Si Box a `z-index` élevé, peut cacher la grille  
**Impact:** Grille peut être invisible derrière le Box  
**Workaround:** Grille a `z-index: 0`, Box doit rester sans z-index ou bas  
**Fix potentiel:** Augmenter z-index de la grille (mais risque de cacher Box)

---

## 💡 Suggestions d'Amélioration

### Amélioration 1: Dimensions Display

**Idée:** Afficher width/height du Box en temps réel

```tsx
{
  showDimensions && (
    <div style={{ position: 'absolute', top: 4, right: 4, fontSize: '10px' }}>
      {boxWidth}px × {boxHeight}px
    </div>
  );
}
```

**Avantages:**

- ✅ Voir l'impact de margin/padding sur les dimensions
- ✅ Debugging layout plus facile
- ✅ Éducatif pour comprendre le box model

---

### Amélioration 2: Preset Children

**Idée:** Bouton pour basculer entre texte simple et multi-éléments

```tsx
const presets = {
  simple: '🎨 Edit the controls to see changes!',
  multiElement: (
    <>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </>
  ),
};
```

**Avantages:**

- ✅ Tester flex/grid facilement
- ✅ Pas besoin de modifier Controls manuellement
- ✅ UX améliorée

---

### Amélioration 3: Custom Colors

**Idée:** Props pour personnaliser couleurs grille/container

```tsx
interface PlaygroundContainerProps {
  gridColor?: string; // défaut: '#e2e8f0'
  containerBorderColor?: string; // défaut: '#cbd5e1'
  // ...
}
```

**Avantages:**

- ✅ Adapter aux thèmes dark/light
- ✅ Contraste personnalisable
- ✅ Réutilisabilité accrue

---

### Amélioration 4: Legend

**Idée:** Légende expliquant les éléments visuels

```
┌────────────────────────────────────┐
│ Legend:                             │
│ - Dashed border: Container bounds  │
│ - Grid lines: Center alignment     │
│ - Crosshair: Center point          │
│ - Adjacent elements: Display test  │
└────────────────────────────────────┘
```

**Avantages:**

- ✅ Onboarding plus facile
- ✅ Compréhension immédiate
- ✅ Accessibilité (explications textuelles)

---

### Amélioration 5: Animation

**Idée:** Transition smooth sur toggle grille/éléments

```tsx
<div
  style={{
    opacity: showGrid ? 1 : 0,
    transition: 'opacity 200ms ease',
  }}
>
  {/* Grille */}
</div>
```

**Avantages:**

- ✅ UX plus fluide
- ✅ Moins abrupt
- ✅ Professionnel

---

## 📚 Ressources

**Documentation:**

- `src/components/helpers/README.md` - Documentation complète du helper
- `src/components/helpers/PlaygroundContainer.tsx` - Code source (278 lignes)
- `STORY_TEMPLATES.md` - Template 1B avec PlaygroundContainer

**Storybook:**

- URL: http://localhost:6006
- Playground: http://localhost:6006/?path=/story/primitives-box--playground

**Fichiers modifiés:**

- `Box.stories.tsx` (ligne 205-219) - Utilisation du helper
- `helpers/index.ts` - Export du helper

---

## 🚀 Prochaines Actions Suggérées

### Court terme (après tests)

1. ✅ Valider tous les tests de cette checklist
2. 📸 Prendre screenshots des cas d'usage clés
3. 📝 Documenter les bugs trouvés (s'il y en a)

### Moyen terme

1. ♻️ Propager `PlaygroundContainer` à Stack/Flex/Grid (quand créés)
2. 🎨 Implémenter "Amélioration 1: Dimensions Display"
3. 🎨 Implémenter "Amélioration 2: Preset Children"

### Long terme

1. 🧪 Créer tests automatisés (Playwright Component Tests)
2. 📱 Fixer issue responsive mobile
3. 🌐 Supporter thèmes dark/light

---

**Version:** 1.0.0  
**Date:** Session 4 - PlaygroundContainer Implementation  
**Status:** ✅ Ready for testing  
**Auteur:** AI Agent (Claude Code + Noofreuuuh)
