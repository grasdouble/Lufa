# 📝 Changelog - Story Templates

Historique des changements et améliorations des templates de stories.

---

## [1.1.0] - 2026-01-23

### ✨ Ajouté

**Nouveau Template 6: Prop Story avec CodeBlock Hover (JSX uniquement)**

Un nouveau template pour les props visuelles avec interaction hover et code dynamique:

- Hover sur une carte met à jour le code en temps réel
- JSX uniquement (pas d'onglets HTML)
- Interaction fluide pour exploration rapide
- Utilisé pour: padding, margin, borderRadius, borderWidth, borderColor, background, display

**Caractéristiques clés:**

- State React pour tracking le hover
- Wrapper `<div onMouseEnter>` autour de chaque PropCard
- `highlight` prop sur PropCard synchronisé avec hover
- CodeBlock avec `subtitle` dynamique
- Gap optimisé: `24px` entre sections, `12px` dans grid

**Exemples implémentés dans Box.stories.tsx:**

- PropPadding, PropPaddingXY, PropPaddingIndividual
- PropMargin, PropMarginXY, PropMarginIndividual
- PropBackground (13 couleurs)
- PropBorderRadius, PropBorderWidth, PropBorderColor
- PropDisplay (avec layouts complexes)

### 🔄 Modifié

**PropCard - Label Position Change**

- **Avant:** Label en haut de la carte
- **Après:** Label en bas de la carte

**Pourquoi ce changement ?**

Les labels longs (ex: `background="on-secondary"`) wrappaient sur 2 lignes, créant des décalages de hauteur entre les cartes adjacentes dans la grid. En plaçant le label en bas:

- ✅ Les composants restent alignés horizontalement
- ✅ Les labels peuvent wrapper sans casser l'alignement
- ✅ Meilleure lecture (label = légende sous l'image)

**Impact:**

- Styles PropCard mis à jour (border-top, textAlign center, paddingTop)
- Gap dans grids augmenté de `8px` à `12px`
- README.md mis à jour

**Template 3 - Click + Tabs: Clarifications**

Ajout de notes importantes sur:

- Quand utiliser Template 3 vs Template 6
- Différences d'interaction (click vs hover)
- Différences de use case (structurel vs visuel)

### 📊 Ajouté

**Arbre de Décision: Quel Template Utiliser**

Guide visuel pour choisir le bon template selon:

- Type de prop
- Nombre de variantes
- Besoin de voir l'HTML ou non
- Besoin d'indicateurs visuels

**Tableau de Comparaison Template 3 vs Template 6**

| Aspect         | Template 3 (Click + Tabs)      | Template 6 (Hover JSX)      |
| -------------- | ------------------------------ | --------------------------- |
| Interaction    | Click                          | Hover                       |
| Code affiché   | JSX + HTML (onglets)           | JSX uniquement              |
| Use case       | Props structurelles            | Props visuelles             |
| État sélection | Persistent (reste sélectionné) | Volatile (change au survol) |

**Exemples Concrets par Type de Prop**

Tableau exhaustif montrant quel template utiliser pour chaque type de prop courante.

### 📝 Documenté

**Variantes du Template 6:**

- **Variante A:** Props directionnelles (X/Y) avec code conditionnel
- **Variante B:** Display types avec code complexe (flex, grid)

**Notes sur la Position du Label:**

Documentation explicite de pourquoi les labels sont en bas et comment cela affecte le design.

### ✅ Checklist Mise à Jour

Ajout de sections spécifiques pour:

- Template 3 (Click + Tabs)
- Template 6 (Hover JSX)

Nouvelles vérifications:

- Labels positionnés en bas
- State pour tracking le hover
- Wrapper div avec onMouseEnter
- Gaps appropriés (24px/12px)

---

## [1.0.0] - 2026-01-23

### 🎉 Version Initiale

Création du fichier STORY_TEMPLATES.md avec:

**5 Templates de Base:**

1. Playground Story
2. Prop Story Simple (Sans Code)
3. Prop Story avec Code (Click + Onglets)
4. Prop Story avec Visualisation (Spacing, Colors)
5. Prop Story Directionnelle (X/Y, Top/Right/Bottom/Left)

**Documentation Initiale:**

- Structure globale des stories par composant
- Checklist des stories à créer par type de composant
- Pattern de nommage des stories et labels
- Guidelines visuelles (grids, couleurs, hauteurs)
- Checklist avant commit
- Exemples de référence

**Helpers Documentés:**

- StoryContainer
- PropCard
- CodeBlock

---

## 📈 Statistiques d'Utilisation

**Box.stories.tsx (13 stories):**

- Template 1 (Playground): 1 story
- Template 3 (Click + Tabs): 1 story (PropAs)
- Template 6 (Hover JSX): 11 stories

**Ratio d'adoption Template 6:** 85% des prop stories (11/13)

---

## 🚀 Prochaines Étapes

**À venir:**

- [ ] Appliquer Template 6 à Stack.stories.tsx
- [ ] Appliquer Template 6 à Text.stories.tsx
- [ ] Créer des exemples Template 2 (Simple sans code)
- [ ] Documenter les patterns d'animation pour les transitions de code
- [ ] Ajouter des tests visuels Playwright pour les hover interactions

**Améliorations potentielles:**

- [ ] Effet highlight plus prononcé sur hover (box-shadow, border glow)
- [ ] Transitions animées pour CodeBlock updates
- [ ] Bouton copy pour le code affiché
- [ ] Support keyboard navigation (arrows pour naviguer entre cartes)
- [ ] Debouncing pour hover rapide

---

**Mainteneur:** Design System Team  
**Dernière mise à jour:** 2026-01-23
