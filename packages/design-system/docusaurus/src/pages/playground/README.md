# Interactive Playground - Documentation

## Vue d'ensemble

Le playground interactif remplace l'ancien `docs/playground.mdx` et offre une expérience complète pour tester tous les composants themables du Lufa Design System.

## Structure

```
packages/design-system/docusaurus/src/pages/playground/
├── index.tsx                      # Page principale du playground
├── PlaygroundThemeSwitcher.tsx    # ThemeSwitcher isolé (basé sur composant Docusaurus)
├── playground.module.css          # Styles isolés pour le playground
└── README.md                      # Cette documentation
```

## Fonctionnalités

### 🎨 Theme Switcher Isolé

Le playground utilise une version adaptée du `ThemeSwitcher` de Docusaurus (`src/components/ThemeSwitcher/`).

**Différences clés :**

- Applique les changements **uniquement** au conteneur du playground via une ref
- **N'affecte pas** le reste de Docusaurus
- **Ne persiste pas** dans localStorage (pour éviter les conflits)
- Réutilise les mêmes styles et la même UI que le ThemeSwitcher global

**Fonctionnalités :**

- 11 thèmes disponibles : default, ocean, forest, matrix, cyberpunk, sunset, nordic, volcano, coffee, volt, steampunk
- 3 modes de couleur : light, dark, high-contrast
- UI dropdown élégante avec grille de thèmes
- Icônes et labels descriptifs

### 📦 Composants Showcasés

Tous les composants themables sont organisés par catégories :

1. **Typography** : Text avec toutes les variantes (h1-h6, body, caption)
2. **Buttons** : Toutes les variantes (solid, outlined, ghost) et toutes les couleurs
3. **Badges** : Variants solid et outlined avec toutes les couleurs
4. **Form Elements** : Input, Label avec différents états
5. **Layout Components** : Box, Stack, Flex, Grid, Cluster
6. **Card** : Composant de composition avec interactions
7. **Center** : Composant de centrage

### 🔗 Navigation

Accessible via la sidebar avec l'icône 🎨 "Interactive Playground"

## Architecture Technique

### Isolation du Theme

```typescript
// Le ThemeSwitcher reçoit une ref vers le conteneur du playground
const playgroundContainerRef = useRef<HTMLDivElement>(null);

<div ref={playgroundContainerRef} className={styles.playgroundWrapper}>
  <PlaygroundThemeSwitcher containerRef={playgroundContainerRef} />
  {/* Composants themables */}
</div>
```

Le ThemeSwitcher applique `data-theme` et `data-mode` **uniquement** sur ce conteneur :

```typescript
// Dans PlaygroundThemeSwitcher.tsx
const applyTheme = (theme: ThemeName) => {
  if (!containerRef.current) return;
  containerRef.current.setAttribute('data-theme', theme);
};
```

Cela garantit que :

- ✅ Le playground a son propre theme
- ✅ Docusaurus conserve son theme global
- ✅ Pas de conflits entre les deux

## Modifications apportées

1. ✅ Suppression de `docs/playground.mdx`
2. ✅ Création de `/src/pages/playground/index.tsx`
3. ✅ Création de `/src/pages/playground/PlaygroundThemeSwitcher.tsx` (adapté du composant Docusaurus)
4. ✅ Création de `/src/pages/playground/playground.module.css`
5. ✅ Mise à jour de `sidebars.ts` pour pointer vers `/playground`
6. ✅ Mise à jour de `docs/getting-started/usage.md` pour pointer vers le nouveau playground

## Réutilisation du Composant ThemeSwitcher

Le playground réutilise intelligemment le composant existant :

**Composant original :** `src/components/ThemeSwitcher/index.tsx`

- Applique les changements à `document.documentElement` (global)
- Persiste dans localStorage
- Affecte tout Docusaurus

**Version Playground :** `src/pages/playground/PlaygroundThemeSwitcher.tsx`

- Applique les changements à un conteneur spécifique (isolé)
- Ne persiste pas (pas de localStorage)
- N'affecte que le playground
- **Réutilise les styles** du composant original (`themeSwitcherStyles`)

## Utilisation

Le playground est une page React autonome qui :

- Se charge à l'URL `/playground`
- Utilise le Layout Docusaurus standard
- Gère son propre état de theme indépendamment
- Est responsive et accessible

## Développement Futur

Pour ajouter de nouveaux composants au playground :

1. Importer le composant depuis `@grasdouble/lufa_design-system`
2. Ajouter une nouvelle section dans `ComponentShowcase`
3. Organiser par catégorie logique

Pour ajouter de nouveaux thèmes :

1. Les ajouter dans le tableau `THEMES` de `PlaygroundThemeSwitcher.tsx`
2. S'assurer que les tokens CSS correspondants existent dans le design system
