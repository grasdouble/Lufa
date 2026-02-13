# Demo Site Feature

## ✅ Ce Qui a Été Ajouté

Un exemple de site web réaliste dans le playground pour montrer les composants en contexte, plutôt qu'une simple liste de composants isolés.

### Nouvelle Structure du Playground

```
Playground
├─ View Toggle (Demo Site / Component Library)
├─ Theme Switcher
└─ Content
    ├─ Demo Site (NEW!)  ← Site e-commerce complet
    └─ Component Library ← Ancienne showcase de composants
```

### Sections du Demo Site

1. **Header / Navigation**
   - Logo + Menu navigation
   - Sticky header avec backdrop blur
   - CTA buttons (Sign In / Get Started)

2. **Hero Section**
   - Badge "New Release"
   - Titre principal avec CTA
   - Features highlights (50+ Components, 11 Themes, etc.)

3. **Features Grid**
   - 6 feature cards avec icônes emoji
   - Grid responsive (1/2/3 colonnes)
   - Ghost buttons pour "Learn More"

4. **Pricing Section**
   - 3 plans (Free, Pro, Enterprise)
   - Pricing cards avec badges
   - Plan selection interactif
   - Popular badge sur le plan Pro

5. **Newsletter / CTA**
   - Email input + Subscribe button
   - Card avec background filled
   - Centered layout

6. **Footer**
   - 4 colonnes de liens (Product, Resources, Company, Legal)
   - Social links
   - Copyright

### Composants Utilisés

- ✅ **Layout**: Container, Stack, Flex, Grid, Box, Center, Cluster
- ✅ **Typography**: Text avec variants (h1, h2, h3, body)
- ✅ **Buttons**: Tous les types (solid, outline, ghost)
- ✅ **Cards**: variants (outlined, filled, elevated)
- ✅ **Badges**: variants (info, success)
- ✅ **Forms**: Input (email)
- ✅ **Divider**: Séparateurs de sections

### Interactivité

1. **View Toggle** :
   - Switch entre Demo Site et Component Library
   - Boutons avec état actif/inactif

2. **Pricing Selection** :
   - Click sur un plan → bouton devient "Selected"
   - State management avec useState

3. **Newsletter** :
   - Input email controlé
   - Ready pour submission

### Styles CSS Ajoutés

```css
.demoSite .header {
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(8px);
}

.hero {
  padding: 5rem 0;
}
.features {
  padding: 5rem 0;
}
.pricing {
  padding: 5rem 0;
  background: var(--lufa-core-neutral-surface);
}
.newsletter {
  padding: 5rem 0;
}
.footer {
  padding: 3rem 0;
  background: var(--lufa-core-neutral-surface);
}
```

Toutes les couleurs utilisent les tokens CSS pour s'adapter au thème !

## 🎨 Avantages du Demo Site

✅ **Contexte Réel** : Montre comment utiliser les composants dans une vraie page
✅ **Inspiration** : Donne des idées de layouts et compositions
✅ **Best Practices** : Démontre la bonne utilisation des composants
✅ **Responsive** : Adapté mobile/tablet/desktop
✅ **Themable** : S'adapte à tous les thèmes et modes
✅ **Interactif** : Formulaires, selections, états

## 🧪 Test

### 1. Ouvrir le Playground

http://localhost:3000/playground

### 2. View par Défaut : Demo Site

- ✅ Voir le site e-commerce complet
- ✅ Header sticky qui reste en haut au scroll
- ✅ Hero avec CTAs
- ✅ Pricing cards interactives

### 3. Changer de Thème

- Ocean → Tout devient cyan
- Matrix → Tout devient vert
- Sunset → Tout devient orange

### 4. Changer de Mode

- Dark → Backgrounds foncés, texte clair
- High Contrast → Contraste maximal

### 5. Toggle vers Component Library

- Cliquer "Component Library"
- Voir l'ancienne showcase de composants

### 6. Revenir au Demo Site

- Cliquer "Demo Site"
- Le site réapparaît

## 📱 Responsive Design

### Desktop (> 768px)

- Header: Logo à gauche, navigation à droite
- Features: 3 colonnes
- Pricing: 3 colonnes
- Footer: 4 colonnes

### Tablet (768px)

- Features: 2 colonnes
- Pricing: 3 colonnes (stack si trop étroit)
- Footer: 2-4 colonnes

### Mobile (< 768px)

- Header: Simplifié
- Features: 1 colonne
- Pricing: 1 colonne
- Footer: 2 colonnes
- Padding réduit (3rem → 2rem)

## 🔄 Prochaines Améliorations Possibles

- [ ] Ajouter un burger menu pour mobile
- [ ] Animations au scroll (fade-in)
- [ ] Plus d'exemples de sites (Blog, Dashboard, Landing)
- [ ] Screenshot du demo site pour documentation
- [ ] Copy code snippets pour chaque section
- [ ] Dark mode toggle dans le header du demo

## 📁 Fichiers Modifiés/Créés

1. **Nouveau** : `/playground/DemoSite.tsx` (400+ lignes)
   - Site e-commerce complet
   - Sections: Header, Hero, Features, Pricing, Newsletter, Footer

2. **Modifié** : `/playground/index.tsx`
   - Ajout du view toggle (Demo / Components)
   - Import du DemoSite
   - Gestion du state pour switcher entre les vues

3. **Modifié** : `/playground/playground.module.css`
   - Styles pour `.demoSite`
   - Styles pour header sticky
   - Styles pour sections (hero, features, pricing, etc.)
   - Styles responsive

---

**Status** : ✅ Implémenté et prêt à tester !

Le demo site montre maintenant un exemple réel et inspirant de ce qu'on peut construire avec le design system.
