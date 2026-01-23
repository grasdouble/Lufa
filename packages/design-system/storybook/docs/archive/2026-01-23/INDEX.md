# 📚 Documentation Index - Storybook Stories

Guide de navigation pour toute la documentation des stories du Design System.

---

## 🎯 Commencer Ici

**Nouveau sur le projet ?** Commencez par ces fichiers dans cet ordre:

1. 📖 **[STORY_TEMPLATES.md](./STORY_TEMPLATES.md)** - Guide complet des 6 templates (30 min de lecture)
2. 🔄 **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Comment migrer vos stories existantes (15 min)
3. 📝 **[helpers/README.md](./src/components/helpers/README.md)** - Documentation des helpers (PropCard, CodeBlock, etc.)

---

## 📂 Structure de la Documentation

```
storybook/
├── 📖 STORY_TEMPLATES.md          ⭐ Guide principal (COMMENCER ICI)
├── 🔄 MIGRATION_GUIDE.md          Guide de migration Template 2 → Template 6
├── 📝 CHANGELOG_STORY_TEMPLATES.md Historique des changements
├── 📊 SUMMARY_SESSION_3.md        Résumé de la session de dev
├── 📚 INDEX.md                    Ce fichier
│
└── src/
    ├── components/
    │   └── helpers/
    │       ├── README.md           Documentation des helpers
    │       └── examples.tsx        Exemples d'utilisation
    │
    └── stories/
        └── primitives/
            └── Box.stories.tsx     ⭐ Référence d'implémentation

```

---

## 📖 Guides par Besoin

### Je veux créer une nouvelle story

**➡️ Lisez: [STORY_TEMPLATES.md](./STORY_TEMPLATES.md)**

1. Voir section "🔀 Arbre de Décision" (ligne ~413)
2. Choisir le bon template selon votre prop
3. Copier le code du template
4. Adapter à votre composant

**Templates disponibles:**

- **Template 1:** Playground (story interactive)
- **Template 2:** Simple (sans code)
- **Template 3:** Click + Tabs (JSX + HTML) pour props structurelles
- **Template 6:** Hover JSX pour props visuelles ⭐ (le plus utilisé)

---

### Je veux migrer une story existante vers Template 6

**➡️ Lisez: [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)**

Étapes:

1. Section "Quand Migrer" - Vérifier si migration nécessaire
2. Section "Étapes de Migration" - 6 étapes détaillées
3. Section "Exemples Avant/Après" - Voir le code complet
4. Section "Checklist" - Vérifier que tout est bon

**Durée estimée:** 15-30 min par story

---

### Je veux comprendre les helpers (PropCard, CodeBlock)

**➡️ Lisez: [helpers/README.md](./src/components/helpers/README.md)**

Documentation complète de:

- `StoryContainer` - Wrapper fullscreen
- `PropCard` - Card avec label et highlight
- `CodeBlock` - Affichage de code avec syntax highlighting
- `examples.tsx` - Exemples concrets

---

### Je veux voir des exemples fonctionnels

**➡️ Ouvrez: [Box.stories.tsx](./src/stories/primitives/Box.stories.tsx)**

Stories de référence:

- **PropAs** (ligne ~210) - Template 3 (Click + Tabs)
- **PropPadding** (ligne ~304) - Template 6 (Hover JSX)
- **PropPaddingXY** (ligne ~380) - Template 6 Variante A (directions)
- **PropDisplay** (ligne ~1180) - Template 6 Variante B (code complexe)
- **PropBackground** (ligne ~860) - Template 6 (13 variantes)

**Total:** 13 stories dont 11 utilisent Template 6

---

### Je veux comprendre l'historique des changements

**➡️ Lisez: [CHANGELOG_STORY_TEMPLATES.md](./CHANGELOG_STORY_TEMPLATES.md)**

Versions:

- **v1.1.0 (2026-01-23):** Ajout Template 6, PropCard label en bas, arbre de décision
- **v1.0.0 (2026-01-23):** Version initiale avec Templates 1-5

---

### Je veux un résumé de la dernière session de dev

**➡️ Lisez: [SUMMARY_SESSION_3.md](./SUMMARY_SESSION_3.md)**

Contenu:

- Ce qui a été fait (modifications, ajouts)
- Statistiques (850+ lignes de doc ajoutées)
- Valeur ajoutée pour l'équipe
- Prochaines actions suggérées

---

## 🔀 Arbre de Décision Rapide

```
Vous voulez créer/modifier une story ?
│
├─ C'est la story principale ? → Template 1: Playground
│
├─ C'est une prop avec 2-3 variantes visuelles évidentes ?
│   → Template 2: Simple (sans code)
│
├─ C'est une prop polymorphique (`as`) ?
│   → Template 3: Click + Tabs (JSX + HTML)
│
└─ C'est une prop visuelle avec 4+ variantes ?
    → Template 6: Hover JSX ⭐ (recommandé)
```

**Détails complets:** Voir [STORY_TEMPLATES.md#arbre-de-décision](./STORY_TEMPLATES.md)

---

## 📊 Tableau de Référence Rapide

| Template            | Interaction        | Code Affiché | Use Case Principal        | Exemple                 |
| ------------------- | ------------------ | ------------ | ------------------------- | ----------------------- |
| **1: Playground**   | Controls Storybook | -            | Story interactive         | Toujours la 1ère        |
| **2: Simple**       | Aucune             | -            | Props visuelles évidentes | variant (2-3 options)   |
| **3: Click + Tabs** | Click              | JSX + HTML   | Props structurelles       | `as` (polymorphisme)    |
| **6: Hover JSX** ⭐ | Hover              | JSX          | Props visuelles           | padding, margin, colors |

---

## 🎯 Quick Links

**Documentation:**

- [STORY_TEMPLATES.md](./STORY_TEMPLATES.md) - Guide principal
- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Migration vers Template 6
- [helpers/README.md](./src/components/helpers/README.md) - Helpers

**Code:**

- [Box.stories.tsx](./src/stories/primitives/Box.stories.tsx) - Référence
- [PropCard.tsx](./src/components/helpers/PropCard.tsx) - Helper PropCard
- [CodeBlock.tsx](./src/components/helpers/CodeBlock.tsx) - Helper CodeBlock

**Historique:**

- [CHANGELOG_STORY_TEMPLATES.md](./CHANGELOG_STORY_TEMPLATES.md) - Versions
- [SUMMARY_SESSION_3.md](./SUMMARY_SESSION_3.md) - Session de dev

---

## 🚀 Prochaines Stories à Créer/Migrer

**Priorité Haute:**

- [ ] Stack.stories.tsx - PropGap (Template 6)
- [ ] Stack.stories.tsx - PropDirection (Template 6)
- [ ] Stack.stories.tsx - PropAlign (Template 6)
- [ ] Text.stories.tsx - PropSize (Template 6)
- [ ] Text.stories.tsx - PropWeight (Template 6)
- [ ] Text.stories.tsx - PropColor (Template 6)

**Priorité Moyenne:**

- [ ] Button.stories.tsx - PropVariant
- [ ] Button.stories.tsx - PropSize

**Référence:** Voir [MIGRATION_GUIDE.md#prochaines-stories](./MIGRATION_GUIDE.md#-prochaines-stories-à-migrer)

---

## 💡 Conseils Rapides

### ✅ À Faire:

- Utiliser Template 6 pour la majorité des prop stories (hover + JSX)
- Placer les labels **en bas** des PropCard (pas en haut)
- Gap de **24px** entre grid et CodeBlock
- Gap de **12px** dans la grid
- Code généré **simplifié** (focus sur la prop démontrée)

### ❌ À Éviter:

- Ne pas utiliser Template 6 pour props polymorphiques → Utiliser Template 3
- Ne pas mettre labels en haut (casse l'alignement)
- Ne pas générer du code trop verbeux
- Ne pas oublier le state `useState` pour le hover
- Ne pas oublier le wrapper `<div onMouseEnter>`

---

## 🆘 Aide et Support

**Problème avec la migration ?**
→ Voir [MIGRATION_GUIDE.md#problèmes-courants](./MIGRATION_GUIDE.md#-problèmes-courants-et-solutions)

**Besoin d'un exemple spécifique ?**
→ Voir [Box.stories.tsx](./src/stories/primitives/Box.stories.tsx) ou [helpers/examples.tsx](./src/components/helpers/examples.tsx)

**Question sur un helper ?**
→ Voir [helpers/README.md](./src/components/helpers/README.md)

**Besoin de clarification sur un template ?**
→ Voir [STORY_TEMPLATES.md](./STORY_TEMPLATES.md)

---

## 📈 Statistiques du Projet

**Documentation:**

- Total lignes: ~1,400 lignes
- Fichiers: 6 fichiers de documentation
- Templates: 6 templates disponibles

**Code (Box.stories.tsx):**

- Total stories: 13
- Template 6 (Hover JSX): 11 stories (85%)
- Template 3 (Click + Tabs): 1 story
- Template 1 (Playground): 1 story

**Adoption Template 6:**

- Box: 85% (11/13)
- Stack: 0% (à migrer)
- Text: 0% (à migrer)
- Button: 0% (à migrer)

---

**Créé le:** 2026-01-23  
**Dernière mise à jour:** 2026-01-23  
**Mainteneur:** Design System Team  
**Version:** 1.0.0
