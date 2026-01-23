# ⚡ Quick Test Guide - 2 Fixes (15 min)

**Session:** 5 - Validation rapide des 2 fixes critiques  
**Temps:** 15 minutes  
**Storybook:** http://localhost:6006

---

## 🎯 Fix 1: Display Flex/Grid (5 min)

### URL

http://localhost:6006/?path=/story/primitives-box--playground

### Test 1.1: Display Flex (2 min)

**Steps:**

1. Controls > **Playground** > **Content Type** > **"multipleItems"**
2. Controls > **Layout** > **Display** > **"flex"**

**✅ Résultat attendu:**

```
┌────────────────────────────────────┐
│ [Item 1] [Item 2] [Item 3] [Item 4] │  ← 4 items sur ligne horizontale
└────────────────────────────────────┘
```

**❌ Si ça ne marche pas:**

- Items pas visibles → HMR pas actualisé, refresh page
- Items verticaux → Display pas sur "flex"
- Texte visible → Content Type pas sur "multipleItems"

---

### Test 1.2: Display Grid (2 min)

**Steps:**

1. Content Type toujours sur **"multipleItems"**
2. Display > **"grid"**

**✅ Résultat attendu:**

```
┌─────────┐
│ Item 1  │  ← 4 items empilés verticalement
├─────────┤
│ Item 2  │
├─────────┤
│ Item 3  │
├─────────┤
│ Item 4  │
└─────────┘
```

---

### Test 1.3: Retour au Mode Text (1 min)

**Steps:**

1. Content Type > **"text"**
2. Display > **"block"**

**✅ Résultat attendu:**

```
┌──────────────────────────────────────┐
│ 🎨 Edit the controls to see...      │  ← Texte simple
└──────────────────────────────────────┘
```

**Verdict Fix 1:** ✅ Passe / ❌ Échoue

---

## 🔲 Fix 2: Margin Visibility (10 min)

### Test 2.1: PropMargin (3 min)

**URL:** http://localhost:6006/?path=/story/primitives-box--prop-margin

**✅ Ce que tu devrais voir:**

```
┌──────┐  ┌───────┐  ┌────────┐  ┌─────────┐  ┌──────────┐  ┌───────────┐
│┌────┐│  │ ┌───┐ │  │  ┌──┐  │  │   ┌─┐   │  │    ┌┐    │  │           │
││Box ││  │ │Box│ │  │  │Bo│  │  │   │B│   │  │    │    │  │     B     │
│└────┘│  │ └───┘ │  │  └──┘  │  │   └─┘   │  │    └┘    │  │           │
└──────┘  └───────┘  └────────┘  └─────────┘  └──────────┘  └───────────┘
  none      tight     compact     default     comfortable    spacious
    ↑         ↑          ↑            ↑            ↑             ↑
  Collé   Petit     Espace       Espace      Espace        Grand
          espace     moyen       standard   confortable    espace
```

**Check:**

- [ ] 6 cartes visibles
- [ ] Progression claire: Box se déplace de gauche-haut vers centre
- [ ] "none" → Box collé en haut-gauche
- [ ] "spacious" → Box au centre avec grand espace autour
- [ ] Hover sur carte → Code JSX se met à jour

**❌ Si ça ne marche pas:**

- Tous les Box centrés identiquement → Fix pas appliqué, refresh

---

### Test 2.2: PropMarginXY (3 min)

**URL:** http://localhost:6006/?path=/story/primitives-box--prop-margin-xy

**✅ Ce que tu devrais voir:**

**marginX (horizontal):**

```
┌────────────────────────┐
│                        │
│    [Box Horizontal]    │  ← Marges gauche/droite
│                        │
└────────────────────────┘
```

**marginY (vertical):**

```
┌────────────────────────┐
│                        │  ← Marge haut
│    [Box Vertical]      │
│                        │  ← Marge bas
└────────────────────────┘
```

**Check:**

- [ ] 3 cartes (marginX, marginY, combined)
- [ ] marginX → Espace visible gauche/droite
- [ ] marginY → Espace visible haut/bas
- [ ] Combined → Espace des 4 côtés

---

### Test 2.3: PropMarginIndividual (4 min)

**URL:** http://localhost:6006/?path=/story/primitives-box--prop-margin-individual

**✅ Ce que tu devrais voir:**

```
marginTop:          marginRight:
┌──────────┐        ┌──────────┐
│          │        │          │
│  [Top]   │        │ [Right]  │  ← Poussé vers gauche
│          │        │          │
└──────────┘        └──────────┘
↓ Poussé bas

marginBottom:       marginLeft:
┌──────────┐        ┌──────────┐
│          │        │          │
│ [Bottom] │        │    [Left]│  ← Poussé vers droite
│     ↑    │        │          │
└──────────┘        └──────────┘
Poussé haut
```

**Check:**

- [ ] 4 cartes (Top, Right, Bottom, Left)
- [ ] marginTop → Box poussé vers le bas (espace en haut)
- [ ] marginRight → Box poussé vers la gauche (espace à droite)
- [ ] marginBottom → Box poussé vers le haut (espace en bas)
- [ ] marginLeft → Box poussé vers la droite (espace à gauche)
- [ ] Couleurs différentes pour chaque direction (bleu, violet, rose, orange)

**Verdict Fix 2:** ✅ Passe / ❌ Échoue

---

## ✅ Checklist Finale

### Fix 1: Display (5 min)

- [ ] Display flex → Items horizontaux ✨
- [ ] Display grid → Items verticaux ✨
- [ ] Content Type control fonctionne
- [ ] Mode text toujours fonctionne

### Fix 2: Margins (10 min)

- [ ] PropMargin → 6 variantes visibles, progression claire
- [ ] PropMarginXY → 3 variantes, marges H/V visibles
- [ ] PropMarginIndividual → 4 directions, Box poussé correctement

**Total temps:** 15 minutes

---

## 🎉 Si Tout Passe

**Félicitations! Les 2 fixes fonctionnent!** 🚀

### Prochaine étape: Créer Changeset

```bash
cd /Users/noofreuuuh/Developments/Grasdouble/Lufa

# Créer changeset
pnpm changeset

# Répondre aux prompts:
# 1. Select packages: @grasdouble/lufa_design-system-storybook
# 2. Version bump: patch (bug fixes)
# 3. Description:
```

**Description suggérée:**

```
fix(storybook): improve Box stories visual testing

- Add Content Type control to Playground for testing display flex/grid modes
- Fix margin props visibility by removing flex centering in margin stories
- Update PropMargin, PropMarginXY, and PropMarginIndividual stories
- Enable 100% coverage for display and margin variants (18/18 testable)

Fixes:
- Display flex/grid now testable with "multipleItems" content type
- All margin variants (none → spacious) now visually differentiated
- Margin directions (top/right/bottom/left) clearly visible
```

**Puis:**

```bash
# Commit
git add .
git commit -m "fix(storybook): improve Box stories visual testing

- Add Content Type control for flex/grid testing
- Fix margin visibility in 3 stories
- 100% display and margin coverage"

# Push (optionnel)
git push
```

---

## ❌ Si Ça Échoue

### Problèmes Courants

**Fix 1 ne marche pas:**

- Refresh la page (Ctrl+R / Cmd+R)
- Vérifier que Storybook tourne: `lsof -ti:6006`
- Check console pour erreurs

**Fix 2 ne marche pas:**

- Tous les Box centrés → Changement pas appliqué
- Refresh avec hard reload (Ctrl+Shift+R / Cmd+Shift+R)
- Vérifier HMR s'est actualisé

**Storybook pas à jour:**

```bash
# Rebuild Storybook
cd packages/design-system/storybook
pnpm build

# Ou redémarrer dev
pnpm ds:storybook:dev
```

---

## 📸 Screenshots Recommandés (Optionnel)

**Si tu veux documenter:**

1. **Display Flex:** Playground avec 4 items horizontaux
2. **Display Grid:** Playground avec 4 items verticaux
3. **PropMargin:** 6 cartes montrant progression none → spacious
4. **PropMarginIndividual:** 4 directions avec Box poussé

**Sauvegarder dans:**

```
packages/design-system/storybook/screenshots/
├── fix-display-flex.png
├── fix-display-grid.png
├── fix-margin-progression.png
└── fix-margin-directions.png
```

---

## 💡 Tips

**Navigation rapide:**

- Copier l'URL directement dans le navigateur
- Ou dans Storybook sidebar: Primitives > Box > [Story Name]

**Hover pour code:**

- Template 6 (Hover JSX) → Hover sur carte pour voir code
- Code se met à jour automatiquement

**Controls panel:**

- Ouvrir/fermer: Cliquer sur "Controls" tab en bas
- Catégories: Playground, Layout, Spacing, etc.

---

**Good luck! 🚀**

**Questions?**

- Check `SESSION_5_COMPLETE_SUMMARY.md` pour détails complets
- Check `FIX_DISPLAY_FLEX_GRID.md` pour Fix 1 détails
- Check `FIX_MARGIN_VISIBILITY.md` pour Fix 2 détails

---

**Temps estimé:** 15 min  
**Difficulté:** Facile (juste observer)  
**Outils:** Navigateur + Storybook  
**Résultat:** Validation 2 fixes critiques ✅
