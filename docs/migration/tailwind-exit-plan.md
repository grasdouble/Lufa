# 📋 Plan de Migration : Sortie de Tailwind CSS du Design System Lufa

## 🎯 Objectifs

- **Conformité 100% avec l'architecture 3-layer** : composants → tokens (CSS vars) → primitives
- **Zéro abstraction externe** : CSS vanilla uniquement via CSS Modules
- **Migration progressive** : par vagues de complexité croissante
- **Container queries** : remplacer les breakpoints Tailwind par une approche moderne
- **Foundation interne** : transformer `component-resets.css` en fondation DS, intégrer les resets indissociables

---

## 📊 État des lieux

### Dépendances Tailwind actuelles

**Packages à retirer** (dans `packages/design-system/main/package.json`) :

- `tailwindcss: ^4.1.18` (devDependencies)
- `@tailwindcss/vite: ^4.1.18` (devDependencies)
- `prettier-plugin-tailwindcss: ^0.7.2` (devDependencies)

**Fichiers Tailwind à supprimer/remplacer** :

- `src/tailwind.css` (27 lignes) - Point d'entrée Tailwind
- `src/css/tailwind-override.css` (469 lignes) - Configuration theme Tailwind
- `src/css/theme.css` (209 lignes) - Mapping tokens → Tailwind theme

**Composants impactés** :

- **27 CSS Modules** utilisant `@reference` + `@apply` (547 instances)
- **6 Button variants** utilisant `theme()` (159 instances)
- **3 Testimonial** utilisant inline classes (réécriture complète)
- **Total : 30 composants** (83% du design system)

### Ce qui reste intact

✅ **Architecture 3-layer** : primitives → tokens → components  
✅ **CSS Modules** : structure conservée  
✅ **CSS custom properties** : `var(--lufa-token-*)` déjà présentes  
✅ **Build avec Vite** : juste retirer le plugin `@tailwindcss/vite`

---

## 📐 Architecture cible post-migration

```
┌─────────────────────────────────────────────────┐
│  Layer 3: Components (.tsx + .module.css)       │
│  var(--lufa-token-color-text-primary)           │
│  + vanilla CSS (Flexbox, Grid, animations)      │
│  + container queries (@container)               │
└──────────────┬──────────────────────────────────┘
               │ référence
┌──────────────▼──────────────────────────────────┐
│  Layer 2: Tokens (CSS custom properties)        │
│  --lufa-token-color-text-primary                │
│  --lufa-token-spacing-md                        │
└──────────────┬──────────────────────────────────┘
               │ référence
┌──────────────▼──────────────────────────────────┐
│  Layer 1: Primitives (CSS custom properties)    │
│  --lufa-primitive-color-neutral-900             │
│  --lufa-primitive-spacing-16                    │
└─────────────────────────────────────────────────┘
```

**Foundation interne** :

- `src/css/component-resets.css` → transformer en fondation vanilla
- Resets spécifiques (button, input) → inline dans composants concernés

**Container queries** :

- `@container (min-width: 768px) { ... }` remplace `sm:`
- Nommer les containers : `.container-card`, `.container-layout`

---

## 🏗️ Plan de Migration (5 phases)

### **Phase 0 : Préparation** (2-4h)

#### 0.1 Audit & Inventaire

- [ ] Créer un snapshot visuel de tous les composants Storybook (tests de régression)
- [ ] Lister tous les `@apply` utilisés avec leur équivalent CSS vanilla
- [ ] Documenter les `theme()` avec leur mapping vers `var(--lufa-token-*)`
- [ ] Identifier les breakpoints utilisés (`sm:`, `lg:`, `xl:`) pour migration container queries

**Livrables** :

- `docs/migration/tailwind-exit-audit.md` : inventaire complet
- `docs/migration/tailwind-to-vanilla-mapping.md` : tableau de correspondance

#### 0.2 Création de la fondation vanilla

- [ ] Créer `src/css/foundation.css` : nouveau fichier de base vanilla
  - Importer les primitives : `@import '@grasdouble/lufa_design-system-primitives/style.css';`
  - Copier le reset minimal depuis `tailwind.css` (lignes 12-19)
  - Ajouter support `@layer base, components, utilities;`
  - Ajouter custom variant dark mode vanilla (sans `@custom-variant`)
- [ ] Transformer `component-resets.css` en vanilla CSS :
  - Convertir `@utility reset-button` → `.reset-button { ... }` (classe vanilla)
  - Convertir `@utility reset-input` → `.reset-input { ... }`
  - Garder ces classes disponibles mais marquer comme "internal foundation"
- [ ] Créer `src/css/container-queries.css` : définitions des containers
  ```css
  /* Container types pour layout responsive */
  .container-layout {
    container-type: inline-size;
    container-name: layout;
  }
  .container-card {
    container-type: inline-size;
    container-name: card;
  }
  .container-content {
    container-type: inline-size;
    container-name: content;
  }
  ```

**Livrables** :

- `src/css/foundation.css` : nouveau point d'entrée
- `src/css/component-resets.css` : version vanilla (plus de `@utility`)
- `src/css/container-queries.css` : définitions containers

#### 0.3 Créer le nouveau point d'entrée CSS

- [ ] Créer `src/style-vanilla.css` :

  ```css
  /* Lufa Design System - Vanilla CSS */
  @layer base, components, utilities;

  /* Foundation */
  @import './css/foundation.css';
  @import './css/component-resets.css';
  @import './css/container-queries.css';

  /* Design tokens (déjà en CSS vars) */
  @import '@grasdouble/lufa_design-system-tokens/style.css';

  /* Dark mode support */
  @layer base {
    /* Custom dark mode variant sans Tailwind */
    .dark,
    [data-theme='dark'] {
      /* Variables sémantiques déjà gérées par tokens */
    }
  }
  ```

**Livrables** :

- `src/style-vanilla.css` : nouveau point d'entrée (coexiste avec `style.css`)

---

### **Phase 1 : Migration des composants simples** (6-10h)

**Critère** : Layout components avec peu de `@apply` (5-15 instances)

#### Composants ciblés (9 composants)

1. **Divider** (`layout/Divider`)
2. **Center** (`layout/Center`)
3. **AspectRatio** (`layout/AspectRatio`)
4. **Placeholder** (`layout/Placeholder`)
5. **Space** (`layout/Space`)
6. **Stack** (`layout/Stack`)
7. **Container** (`layout/Container`)
8. **Flex** (`layout/Flex`)
9. **Grid** (`layout/Grid`)

#### Processus par composant (exemple : Divider)

**Étape 1.1** : Créer version parallèle du CSS

- [ ] Copier `Divider.module.css` → `Divider.vanilla.module.css`
- [ ] Retirer `@reference '../../../tailwind.css';`
- [ ] Remplacer tous les `@apply` par leur équivalent CSS vanilla :

  ```css
  /* AVANT (Tailwind) */
  @apply flex items-center;
  @apply border-t border-border-subtle;
  @apply my-4;

  /* APRÈS (Vanilla) */
  display: flex;
  align-items: center;
  border-top: 1px solid var(--lufa-token-color-border-subtle);
  margin-top: var(--lufa-token-spacing-md);
  margin-bottom: var(--lufa-token-spacing-md);
  ```

**Étape 1.2** : Ajouter container queries si nécessaire

- [ ] Identifier si le composant utilise des breakpoints (`sm:`, `lg:`)
- [ ] Remplacer par container queries :

  ```css
  /* AVANT */
  @apply sm:flex-row lg:gap-8;

  /* APRÈS */
  @container (min-width: 768px) {
    flex-direction: row;
  }
  @container (min-width: 1024px) {
    gap: var(--lufa-token-spacing-lg);
  }
  ```

**Étape 1.3** : Intégrer resets inline si nécessaire

- [ ] Si le composant est `<button>` → copier `.reset-button` dans le CSS module
- [ ] Si le composant est `<input>` → copier `.reset-input` dans le CSS module
- [ ] Marquer le reset avec commentaire : `/* Foundation reset - inlined */`

**Étape 1.4** : Modifier l'import dans le composant .tsx

- [ ] Changer `import styles from './Divider.module.css';` → `import styles from './Divider.vanilla.module.css';`

**Étape 1.5** : Test & Validation

- [ ] Lancer Storybook : `pnpm ds:storybook:dev`
- [ ] Vérifier visuellement le composant
- [ ] Comparer avec snapshot initial (Phase 0.1)
- [ ] Tester responsive avec container queries
- [ ] Lancer tests Playwright : `pnpm --filter @grasdouble/lufa_design-system test-ct`

**Étape 1.6** : Clean-up

- [ ] Si tests passent : supprimer `Divider.module.css` (ancienne version Tailwind)
- [ ] Renommer `Divider.vanilla.module.css` → `Divider.module.css`
- [ ] Mettre à jour import dans `.tsx` : `import styles from './Divider.module.css';`

**Répéter pour les 8 autres composants layout**

#### Livrables Phase 1

- 9 composants layout migrés en vanilla CSS
- 0 dépendance Tailwind dans ces composants
- Tests Playwright passants
- Documentation des patterns vanilla CSS dans `docs/migration/`

---

### **Phase 2 : Migration des composants moyens** (12-16h)

**Critère** : Composants avec usage modéré de `@apply` (15-30 instances) et sans `theme()`

#### Composants ciblés (11 composants)

1. **Badge** (`display/Badge`)
2. **Card** (`display/Card`)
3. **Avatar** (`display/Avatar`)
4. **AvatarGroup** (`display/AvatarGroup`)
5. **Alert** (`feedback/Alert`)
6. **Spinner** (`feedback/Spinner`)
7. **Typography** (`Typography`)
8. **Breadcrumb** (`navigation/Breadcrumb`)
9. **Menu** (`navigation/Menu`)
10. **Anchor** (`navigation/Anchor`)
11. **Modal** (`overlay/Modal`)

#### Processus par composant (même que Phase 1)

**Points d'attention spécifiques** :

**Badge** :

- Variants colors (primary, success, warning, danger, neutral)
- Gérer via CSS custom properties locales :
  ```css
  .badge--primary {
    --badge-bg: var(--lufa-token-color-background-primary);
    --badge-text: var(--lufa-token-color-text-inverse);
  }
  ```

**Alert** :

- Icons conditionnels (vérifier si Tailwind gère le layout)
- Remplacer `sm:flex-row` par container queries

**Modal** :

- Overlay avec Headless UI → vérifier interactions avec Tailwind
- Animations : remplacer `transition-all duration-200` par CSS vanilla
  ```css
  transition: opacity 200ms var(--lufa-token-easing-standard);
  ```

**Typography** :

- Line-clamp Tailwind → remplacer par `-webkit-line-clamp`
- Responsive font sizes → container queries ou clamp()

#### Livrables Phase 2

- 11 composants display/feedback/overlay/typography migrés
- Patterns de variants sans `@apply` documentés
- Tests Playwright passants

---

### **Phase 3 : Migration des composants complexes** (16-24h)

**Critère** : Composants avec usage intensif de `@apply` (30-50+ instances) et/ou `theme()`

#### Composants ciblés (6 composants)

1. **Button** (`forms/Button`) - **COMPLEXE** : 6 fichiers CSS, 159 `theme()`, variants multiples
2. **Input** (`forms/Input`)
3. **Link** (`navigation/Link`)
4. **Pagination** (`navigation/Pagination`)
5. **Steps** (`navigation/Steps`)
6. **Tabs** (`navigation/Tabs`)

#### Processus spécifique : Button (exemple)

**Fichiers concernés** :

- `base.module.css` (50 lignes, 30+ `@apply`)
- `variant-solid.module.css` (80+ lignes, 40 `theme()`)
- `variant-outlined.module.css`
- `variant-ghost.module.css`
- `variant-text.module.css`
- `variant-link.module.css`
- `index.module.css` (orchestrateur)

**Étape 3.1** : Migration `base.module.css`

**Avant** :

```css
.button {
  @apply reset-button;
  @apply inline-flex items-center justify-center gap-2;
  @apply rounded-xl;
  border-width: theme(borderWidth.thin);
  @apply transition-all duration-200 ease-out;
}
```

**Après** :

```css
.button {
  /* Foundation reset - inlined from component-resets.css */
  appearance: none;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: none;

  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--lufa-token-spacing-xs);

  /* Visual */
  border-radius: var(--lufa-token-radius-xl);
  border-width: var(--lufa-token-border-width-thin);
  border-style: solid;
  border-color: transparent;
  box-shadow: var(--lufa-token-shadow-sm);

  /* Typography */
  font-weight: var(--lufa-token-font-weight-semibold);

  /* Interaction */
  cursor: var(--lufa-token-cursor-pointer);
  transform: translateY(0);
  transition:
    background-color 200ms var(--lufa-token-easing-standard),
    transform 200ms var(--lufa-token-easing-standard),
    box-shadow 200ms var(--lufa-token-easing-standard);
}
```

**Étape 3.2** : Migration variants avec `theme()`

**Avant** (`variant-solid.module.css`) :

```css
.button--solid {
  --btn-bg: theme(colors.interactive.default);
  --btn-bg-hover: theme(colors.interactive.hover);
  --btn-ring: 0 0 0 4px rgb(from theme(colors.interactive.focus) r g b / 0.2);
  background: var(--btn-bg);
}
```

**Après** :

```css
.button--solid {
  /* Local CSS variables pour le variant */
  --btn-bg: var(--lufa-token-color-interactive-default);
  --btn-bg-hover: var(--lufa-token-color-interactive-hover);
  --btn-text: var(--lufa-token-color-text-inverse);
  --btn-focus-ring: var(--lufa-token-color-interactive-focus);

  /* Styles */
  background-color: var(--btn-bg);
  color: var(--btn-text);
}

.button--solid:hover:not(:disabled) {
  background-color: var(--btn-bg-hover);
}

.button--solid:focus-visible {
  outline: 2px solid var(--btn-focus-ring);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--btn-focus-ring) 20%, transparent);
}
```

**Note sur `rgb(from theme(...))` → `color-mix()`** :

- Tailwind : `rgb(from theme(colors.blue.500) r g b / 0.2)`
- Vanilla : `color-mix(in srgb, var(--lufa-token-color-primary) 20%, transparent)`
- Alternative : `oklch(from var(--color) l c h / 0.2)` si meilleur support

**Étape 3.3** : Gérer les sizes (sm, md, lg)

**Avant** :

```css
.button--sm {
  @apply text-sm px-3 py-1.5;
}
```

**Après** :

```css
.button--sm {
  font-size: var(--lufa-token-font-size-sm);
  padding-inline: var(--lufa-token-spacing-sm);
  padding-block: var(--lufa-token-spacing-xs);
  min-height: var(--lufa-token-size-control-sm);
}
```

**Étape 3.4** : Test intensif

- [ ] Tester TOUS les variants (solid, outlined, ghost, text, link)
- [ ] Tester TOUTES les sizes (sm, md, lg)
- [ ] Tester TOUTES les couleurs (primary, success, danger, warning, neutral)
- [ ] Tester états (hover, focus, active, disabled)
- [ ] Tester dark mode
- [ ] Tester accessibilité (keyboard, screen reader)

**Répéter pour Input, Link, Pagination, Steps, Tabs**

#### Livrables Phase 3

- 6 composants forms/navigation migrés (dont Button complet)
- Pattern de migration `theme()` → `var()` documenté
- Pattern de migration `rgb(from...)` → `color-mix()` documenté
- Guide de gestion variants complexes
- Tests Playwright passants pour tous les variants

---

### **Phase 4 : Migration des Testimonials (inline classes)** (6-8h)

**Critère** : Composants utilisant des classes Tailwind inline dans le JSX (réécriture complète)

#### Composants ciblés (3 composants)

1. **TestimonialOne** (`patterns/Testimonials/TestimonialOne.tsx`)
2. **TestimonialTwo** (`patterns/Testimonials/TestimonialTwo.tsx`)
3. **TestimonialThree** (`patterns/Testimonials/TestimonialThree.tsx`)

#### Processus (exemple : TestimonialOne)

**Avant** (inline Tailwind) :

```tsx
<div className="bg-background-primary pt-24 pb-16 sm:pt-32 sm:pb-24 xl:pb-32">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="flex flex-col items-center gap-x-8">{/* ... */}</div>
  </div>
</div>
```

**Étape 4.1** : Créer CSS Module complet

- [ ] Créer `TestimonialOne.module.css`
- [ ] Extraire TOUTES les classes inline vers le CSS Module
- [ ] Utiliser des noms de classes sémantiques

**Après** :

```tsx
// TestimonialOne.tsx
import styles from './TestimonialOne.module.css';

<div className={styles.testimonial}>
  <div className={styles.container}>
    <div className={styles.content}>{/* ... */}</div>
  </div>
</div>;
```

```css
/* TestimonialOne.module.css */
.testimonial {
  container-type: inline-size;
  container-name: testimonial;
  background-color: var(--lufa-token-color-background-primary);
  padding-block-start: var(--lufa-token-spacing-2xl);
  padding-block-end: var(--lufa-token-spacing-xl);
}

@container testimonial (min-width: 768px) {
  .testimonial {
    padding-block-start: var(--lufa-token-spacing-3xl);
    padding-block-end: var(--lufa-token-spacing-2xl);
  }
}

@container testimonial (min-width: 1440px) {
  .testimonial {
    padding-block-end: var(--lufa-token-spacing-3xl);
  }
}

.container {
  margin-inline: auto;
  max-width: var(--lufa-token-container-7xl);
  padding-inline: var(--lufa-token-spacing-md);
}

@container testimonial (min-width: 1024px) {
  .container {
    padding-inline: var(--lufa-token-spacing-lg);
  }
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--lufa-token-spacing-lg);
}
```

**Étape 4.2** : Gérer les gradients avancés

**Avant** :

```tsx
className = 'absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20';
```

**Après** :

```css
/* TestimonialTwo.module.css */
.background-gradient {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(45rem 50rem at top, var(--lufa-primitive-color-chromatic-indigo-100), white);
  opacity: 0.2;
}
```

**Étape 4.3** : Test

- [ ] Comparer visuellement avec version Tailwind
- [ ] Tester responsive avec container queries
- [ ] Vérifier gradients et effets visuels
- [ ] Tests Playwright

**Répéter pour TestimonialTwo et TestimonialThree**

#### Livrables Phase 4

- 3 Testimonial components migrés avec CSS Modules
- Pattern de migration classes inline → CSS Modules documenté
- Guide de gestion gradients complexes
- Tests Playwright passants

---

### **Phase 5 : Nettoyage & Finalisation** (4-6h)

**Objectif** : Retirer complètement Tailwind du design system

#### 5.1 Nettoyage des dépendances

- [ ] **Supprimer packages npm** :
  ```bash
  cd packages/design-system/main
  pnpm remove tailwindcss @tailwindcss/vite prettier-plugin-tailwindcss
  ```

#### 5.2 Nettoyage des fichiers

- [ ] **Supprimer fichiers Tailwind** :
  - `src/tailwind.css`
  - `src/css/tailwind-override.css`
  - `src/css/theme.css`
- [ ] **Renommer nouveau point d'entrée** :
  - `src/style-vanilla.css` → `src/style.css` (écraser l'ancien)

#### 5.3 Mise à jour configuration Vite

- [ ] Modifier `vite.config.ts` :

  **Avant** :

  ```typescript
  import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [
      tailwindcss(),
      react(),
      // ...
    ],
  });
  ```

  **Après** :

  ```typescript
  // Plus besoin d'importer @tailwindcss/vite

  export default defineConfig({
    plugins: [
      react(),
      // ...
    ],
  });
  ```

#### 5.4 Mise à jour package.json exports

- [ ] Vérifier que `style.css` est bien exporté :
  ```json
  {
    "exports": {
      ".": {
        "types": "./dist/index.d.ts",
        "import": "./dist/lufa-ui.mjs"
      },
      "./style.css": "./dist/style.css"
    }
  }
  ```

#### 5.5 Documentation

- [ ] **Créer guide de migration pour users** : `docs/MIGRATION_FROM_TAILWIND.md`
  - Comment migrer si projet externe utilise le DS
  - Changements breaking (si applicable)
- [ ] **Mettre à jour AGENTS.md** :
  - Retirer références Tailwind
  - Documenter nouveau workflow vanilla CSS
  - Mettre à jour section `.github/instructions/tailwindcss.instructions.md` → supprimer ou renommer
- [ ] **Mettre à jour CLAUDE.md** :
  - Retirer instructions Tailwind
  - Ajouter instructions vanilla CSS + container queries
- [ ] **Créer `docs/CSS_GUIDELINES.md`** :
  - Patterns vanilla CSS recommandés
  - Guide container queries
  - Guide color-mix() pour transparence
  - Conventions de nommage CSS Modules

#### 5.6 Mise à jour des agents et instructions du Design System

**Objectif** : Mettre à jour la documentation pour les agents IA qui travaillent sur le design system

##### 5.6.1 Mettre à jour `.github/instructions/lufa-design-system.instructions.md`

**Fichier** : `.github/instructions/lufa-design-system.instructions.md`

**Sections à modifier** :

- [ ] **Section "Components Layer" (lignes 123-203)** :
  - Retirer toute mention de "Tailwind CSS utilities" (ligne 133)
  - Remplacer "Use Tailwind CSS utilities with token-based customization" par "Use vanilla CSS with CSS Modules and token-based CSS custom properties"
- [ ] **Section "Styling Requirements (CRITICAL)" (lignes 204-269)** :
  - **Ligne 208** : Retirer "Use Tailwind `@apply` directives with token-based utilities in CSS Modules"
  - Remplacer par : "Use vanilla CSS properties referencing tokens via `var(--lufa-token-*)`"
  - **CSS Module Example (lignes 210-246)** : Remplacer entièrement par exemple vanilla CSS :

  ```css
  /* Button.module.css */
  @layer components {
    .button {
      /* Use tokens via CSS custom properties */
      border-radius: var(--lufa-token-radius-base);
      transition: all var(--lufa-token-transition-duration-base) var(--lufa-token-easing-standard);
      font-weight: var(--lufa-token-font-weight-medium);
    }

    .variantPrimary {
      background-color: var(--lufa-token-color-interactive-default);
      color: var(--lufa-token-color-text-inverse);
    }

    .variantSecondary {
      background-color: var(--lufa-token-color-background-secondary);
      border: var(--lufa-token-border-width-thin) solid var(--lufa-token-color-border-default);
      color: var(--lufa-token-color-text-primary);
    }

    .sizeSmall {
      padding-inline: var(--lufa-token-spacing-base);
      padding-block: var(--lufa-token-spacing-xs);
      font-size: var(--lufa-token-font-size-sm);
    }

    .sizeMedium {
      padding-inline: var(--lufa-token-spacing-lg);
      padding-block: var(--lufa-token-spacing-sm);
      font-size: var(--lufa-token-font-size-base);
    }

    .sizeLarge {
      padding-inline: var(--lufa-token-spacing-xl);
      padding-block: var(--lufa-token-spacing-md);
      font-size: var(--lufa-token-font-size-lg);
    }
  }
  ```

- [ ] **Section "Available Token Categories" (lignes 261-268)** :
  - Retirer mentions de classes Tailwind (`bg-*`, `text-*`, `p-*`, `m-*`, etc.)
  - Remplacer par : "Use CSS custom properties: `var(--lufa-token-category-variant)`"
  - Ajouter exemples :
    - Colors: `var(--lufa-token-color-background-primary)`, `var(--lufa-token-color-text-primary)`
    - Spacing: `var(--lufa-token-spacing-xs)`, `var(--lufa-token-spacing-base)`
    - Border: `var(--lufa-token-radius-base)`, `var(--lufa-token-border-width-thin)`

- [ ] **Section "Theming Support (CRITICAL)" (lignes 280-327)** :
  - **Ligne 285** : Retirer "✅ `@apply bg-interactive-default text-text-inverse p-base rounded-base duration-base`"
  - Remplacer par : "✅ `background: var(--lufa-token-color-interactive-default); color: var(--lufa-token-color-text-inverse);`"
  - **CSS variables pattern (lignes 313-326)** : Remplacer exemple Tailwind par vanilla CSS :

  ```css
  /* Vanilla CSS with tokens */
  .button {
    background-color: var(--lufa-token-color-interactive-default);
    color: var(--lufa-token-color-text-inverse);
    padding-inline: var(--lufa-token-spacing-lg);
    padding-block: var(--lufa-token-spacing-sm);
    border-radius: var(--lufa-token-radius-base);
    transition: all var(--lufa-token-transition-duration-base);
  }

  .button:hover {
    background-color: var(--lufa-token-color-interactive-hover);
  }

  /* Container queries pour responsive */
  @container (min-width: 768px) {
    .button {
      padding-inline: var(--lufa-token-spacing-xl);
    }
  }
  ```

- [ ] **Section "Styling Guidelines" (lignes 386-394)** :
  - Retirer ligne 388 : "Use Tailwind CSS utility classes"
  - Remplacer par : "Use vanilla CSS with CSS Modules"
  - Ajouter : "Use container queries (`@container`) for responsive design"
  - Retirer ligne 389 : "Leverage token-based CSS custom properties" (garder)
  - Modifier ligne 391 : "Support dark mode via CSS variables" → "Support theming and dark mode via semantic tokens"
  - Modifier ligne 392 : "Implement responsive behavior with mobile-first approach" → "Implement responsive behavior with container queries"

- [ ] **Section "Example Styling" (lignes 396-426)** :
  - Code correct (déjà en vanilla CSS), mais ajouter mention container queries

- [ ] **Retirer toute référence à Tailwind dans le document** :
  - Rechercher "Tailwind" (11 occurrences)
  - Rechercher "@apply" (toutes les occurrences)
  - Rechercher "utility classes" (remplacer par "CSS custom properties")

##### 5.6.2 Mettre à jour `.github/agents/lufa-design-system-expert.agent.md`

**Fichier** : `.github/agents/lufa-design-system-expert.agent.md`

**Sections à modifier** :

- [ ] **Section "Core Technologies" (lignes 154-163)** :
  - **Ligne 158** : Retirer "Tailwind CSS v4: Utility-first styling with design token integration"
  - Ajouter : "Vanilla CSS: CSS Modules with design token integration via CSS custom properties"

- [ ] **Section "Design System Principles" (lignes 165-175)** :
  - Ligne 167 : OK (Two-Layer Token System)
  - Ligne 168 : OK (Modern Design Aesthetic)
  - Ligne 169 : OK (Theming Support)

- [ ] **Section "Component Development" (lignes 177-184)** :
  - **Ligne 181** : Retirer "Styling: Tailwind CSS utilities with token-based custom properties"
  - Remplacer par : "Styling: Vanilla CSS with CSS Modules and token-based CSS custom properties"
  - Ajouter : "Responsive: Container queries for component-level responsive design"

- [ ] **Section "Theming Support (CRITICAL)" (lignes 186-242)** :
  - **Ligne 193** : Retirer "Components use Tailwind utilities that map to themeable CSS variables"
  - Remplacer par : "Components use vanilla CSS with token-based CSS custom properties"
  - **Lignes 218-220** : Retirer exemple avec `@apply`
  - Remplacer par exemple vanilla CSS :

  ```css
  .button {
    background-color: var(--lufa-token-color-interactive-default);
    color: var(--lufa-token-color-text-inverse);
    padding-inline: var(--lufa-token-spacing-lg);
    padding-block: var(--lufa-token-spacing-sm);
    border-radius: var(--lufa-token-radius-base);
    transition: all var(--lufa-token-transition-duration-base);
  }
  ```

  - **Lignes 223-234** : Retirer "MUST use Tailwind utilities that reference CSS variables"
  - Remplacer par : "MUST use vanilla CSS properties that reference CSS custom properties"
  - Remplacer exemple complet (lignes 225-234)

- [ ] **Section "Implementation" → "For Components" (lignes 305-315)** :
  - **Ligne 309** : Retirer "ONLY use tokens that EXIST in `@grasdouble/lufa_design-system-tokens` - verify tokens before using them"
  - Remplacer par : "ONLY use tokens that EXIST as CSS custom properties - verify in `tokens/dist/style.css`"
  - **Ligne 310** : Retirer "Use Tailwind CSS `@apply` directives with token-based utilities in CSS Modules"
  - Remplacer par : "Use vanilla CSS properties with `var(--lufa-token-*)` in CSS Modules"

- [ ] **Section "Step 3: Styling with CSS Modules and Tokens" (lignes 430-527)** :
  - **CRITICAL REQUIREMENTS (lignes 432-437)** :
    - Retirer ligne 436 : "Use Tailwind CSS `@apply` directives with token-based utilities"
    - Remplacer par : "Use vanilla CSS properties with `var(--lufa-token-*)`"
  - **CSS Module Template (lignes 439-493)** : Remplacer ENTIÈREMENT par :

  ```css
  /* packages/design-system/main/src/components/{category}/{Component}/{Component}.module.css */

  @layer components {
    .{componentClass} {
      /* Use vanilla CSS with token-based CSS custom properties */
      border-radius: var(--lufa-token-radius-base);
      transition: all var(--lufa-token-transition-duration-base) var(--lufa-token-easing-standard);
      background-color: var(--lufa-token-color-background-primary);
      color: var(--lufa-token-color-text-primary);
    }

    /* Variants */
    .variantPrimary {
      background-color: var(--lufa-token-color-interactive-default);
      color: var(--lufa-token-color-text-inverse);
    }

    .variantSecondary {
      background-color: var(--lufa-token-color-background-secondary);
      border: var(--lufa-token-border-width-thin) solid var(--lufa-token-color-border-default);
    }

    /* Sizes */
    .sizeSmall {
      padding: var(--lufa-token-spacing-base);
      font-size: var(--lufa-token-font-size-sm);
    }

    .sizeMedium {
      padding: var(--lufa-token-spacing-lg);
      font-size: var(--lufa-token-font-size-base);
    }

    .sizeLarge {
      padding: var(--lufa-token-spacing-xl);
      font-size: var(--lufa-token-font-size-lg);
    }

    /* Interactive states */
    .{componentClass}:hover:not(:disabled) {
      box-shadow: var(--lufa-token-shadow-md);
      transform: var(--lufa-token-transform-hover-lift);
    }

    .{componentClass}:focus-visible {
      outline: var(--lufa-token-border-width-focus) solid var(--lufa-token-color-border-focus);
      outline-offset: var(--lufa-token-spacing-xs);
    }

    .{componentClass}:disabled {
      opacity: var(--lufa-token-opacity-disabled);
      cursor: var(--lufa-token-cursor-not-allowed);
    }

    /* Container queries for responsive design */
    @container (min-width: 768px) {
      .{componentClass} {
        padding-inline: var(--lufa-token-spacing-xl);
      }
    }
  }
  ```

  - **Available Token Categories (lignes 517-524)** :
    - Retirer toutes les classes Tailwind
    - Remplacer par exemples CSS custom properties :
      - Colors: `var(--lufa-token-color-background-*)`, `var(--lufa-token-color-text-*)`
      - Spacing: `var(--lufa-token-spacing-*)` (xs, sm, base, md, lg, xl, 2xl, 3xl)
      - Border: `var(--lufa-token-radius-*)`, `var(--lufa-token-border-width-*)`
      - Typography: `var(--lufa-token-font-size-*)`, `var(--lufa-token-font-weight-*)`
      - Transitions: `var(--lufa-token-transition-duration-*)`, `var(--lufa-token-easing-*)`
      - Shadows: `var(--lufa-token-shadow-*)`

- [ ] **Section "Quality Checklist" (lignes 863-940)** :
  - **Ligne 877** : OK ("Uses CSS Modules")
  - **Ligne 878** : OK ("All tokens used EXIST")
  - **Ligne 879** : Modifier "Uses tokens from `@grasdouble/lufa_design-system-tokens` via Tailwind utilities"
  - Remplacer par : "Uses tokens as CSS custom properties (`var(--lufa-token-*)`)"
  - **Ligne 882** : Modifier "CSS custom properties used correctly with `@apply` directives"
  - Remplacer par : "CSS custom properties used correctly with vanilla CSS"

- [ ] **Section "Tailwind with Tokens" (lignes 1047-1064)** :
  - Renommer section : "Vanilla CSS with Tokens"
  - Code déjà correct (utilise `var(--lufa-token-*)`)

- [ ] **Supprimer toute référence à Tailwind** :
  - Rechercher "Tailwind" (17 occurrences estimées)
  - Rechercher "@apply" (toutes les occurrences)
  - Remplacer par "vanilla CSS" ou "CSS custom properties"

##### 5.6.3 Mettre à jour `.github/instructions/tailwindcss.instructions.md`

**Option A : Supprimer le fichier** (recommandé)

- [ ] Supprimer `.github/instructions/tailwindcss.instructions.md`
- [ ] Vérifier qu'aucun autre fichier ne le référence

**Option B : Renommer et adapter** (si instructions CSS générales utiles)

- [ ] Renommer `.github/instructions/tailwindcss.instructions.md` → `.github/instructions/vanilla-css.instructions.md`
- [ ] Réécrire pour patterns vanilla CSS + container queries
- [ ] Ajouter guide color-mix(), @layer, CSS custom properties
- [ ] Mettre à jour frontmatter YAML `applyTo`

##### 5.6.4 Vérifier les références croisées

- [ ] Rechercher "tailwind" dans `.github/` (case-insensitive) :
  ```bash
  grep -ri "tailwind" .github/
  ```
- [ ] Mettre à jour toutes les mentions trouvées
- [ ] Vérifier cohérence entre AGENTS.md, CLAUDE.md, et instructions

##### 5.6.5 Tester la documentation

- [ ] Lire `.github/instructions/lufa-design-system.instructions.md` en entier
- [ ] Vérifier qu'aucune incohérence ne subsiste
- [ ] Valider que les exemples de code sont corrects
- [ ] S'assurer que le workflow agent reste clair

**Livrables 5.6** :

- `.github/instructions/lufa-design-system.instructions.md` : mis à jour (vanilla CSS)
- `.github/agents/lufa-design-system-expert.agent.md` : mis à jour (vanilla CSS)
- `.github/instructions/tailwindcss.instructions.md` : supprimé ou renommé
- Toutes références Tailwind retirées de `.github/`
- Documentation cohérente avec nouvelle architecture vanilla CSS

#### 5.6 Tests finaux

- [ ] **Build complet** :
  ```bash
  pnpm ds:all:build
  ```
- [ ] **Lancer Storybook** :

  ```bash
  pnpm ds:storybook:dev
  ```

  - Vérifier visuellement TOUS les composants
  - Comparer avec snapshots Phase 0.1

- [ ] **Tests Playwright complets** :
  ```bash
  pnpm --filter @grasdouble/lufa_design-system test-ct
  ```
- [ ] **Vérifier bundle size** :
  - Comparer taille `dist/style.css` avant/après
  - Vérifier si réduction significative
- [ ] **Test d'intégration** :
  - Importer DS dans une microfrontend
  - Vérifier que tout fonctionne sans Tailwind

#### 5.7 Changeset & Versioning

- [ ] **Créer changeset** :

  ```bash
  pnpm changeset
  ```

  - Type : **major** (breaking change)
  - Description : "Remove Tailwind CSS dependency, migrate to vanilla CSS with container queries"

- [ ] **Commit** :

  ```bash
  git add .
  git commit -m "feat(design-system)!: remove Tailwind CSS, migrate to vanilla CSS

  BREAKING CHANGE: Tailwind CSS has been completely removed from the design system.
  Components now use vanilla CSS with CSS Modules and container queries.

  - Remove tailwindcss, @tailwindcss/vite, prettier-plugin-tailwindcss
  - Replace 547 @apply directives with vanilla CSS
  - Replace 159 theme() calls with CSS custom properties
  - Migrate responsive utilities to container queries
  - Transform component-resets.css to vanilla foundation

  See docs/MIGRATION_FROM_TAILWIND.md for migration guide."
  ```

#### Livrables Phase 5

- Design system 100% vanilla CSS
- 0 dépendance Tailwind
- Documentation complète migration
- **Documentation agents IA mise à jour** :
  - `.github/instructions/lufa-design-system.instructions.md` (vanilla CSS)
  - `.github/agents/lufa-design-system-expert.agent.md` (vanilla CSS)
  - `.github/instructions/tailwindcss.instructions.md` (supprimé ou renommé)
- Changeset major créé
- Tests passants
- Bundle size report

---

## 📊 Métriques de succès

### Avant migration

- **Dépendances** : 3 packages Tailwind
- **Fichiers CSS Tailwind** : 3 (tailwind.css, tailwind-override.css, theme.css)
- **@apply directives** : 547
- **theme() calls** : 159
- **Inline Tailwind classes** : ~150+ dans Testimonials
- **Bundle size style.css** : ? KB (à mesurer)

### Après migration

- **Dépendances** : 0 package Tailwind
- **Fichiers CSS Tailwind** : 0
- **@apply directives** : 0
- **theme() calls** : 0
- **Inline Tailwind classes** : 0
- **Bundle size style.css** : ? KB (objectif : -20% minimum)

### KPIs

- ✅ 30/30 composants migrés
- ✅ 0 régression visuelle (Storybook snapshots)
- ✅ 100% tests Playwright passants
- ✅ Build successful sans warnings
- ✅ Documentation à jour (user docs + agent docs)
- ✅ Agents IA configurés pour vanilla CSS
- ✅ Changeset major créé

---

## ⏱️ Timeline estimée

| Phase                                   | Durée estimée | Composants | Risque    |
| --------------------------------------- | ------------- | ---------- | --------- |
| **Phase 0** : Préparation               | 2-4h          | -          | 🟢 Faible |
| **Phase 1** : Simples (Layout)          | 6-10h         | 9          | 🟢 Faible |
| **Phase 2** : Moyens (Display/Feedback) | 12-16h        | 11         | 🟡 Moyen  |
| **Phase 3** : Complexes (Forms/Nav)     | 16-24h        | 6          | 🔴 Élevé  |
| **Phase 4** : Testimonials (inline)     | 6-8h          | 3          | 🟡 Moyen  |
| **Phase 5** : Nettoyage & Finalisation  | 5-8h          | -          | 🟢 Faible |
| **TOTAL**                               | **47-70h**    | **30**     | -         |

**Estimation réaliste** : **6-9 jours** de travail (7-8h/jour)

**Note Phase 5** : Durée augmentée de 4-6h à 5-8h pour inclure la mise à jour complète de la documentation des agents IA (2 fichiers majeurs : `.github/instructions/lufa-design-system.instructions.md` et `.github/agents/lufa-design-system-expert.agent.md`)

---

## ⚠️ Risques & Mitigation

### Risque 1 : Régressions visuelles

**Probabilité** : 🔴 Élevée  
**Impact** : 🔴 Critique  
**Mitigation** :

- Snapshots Storybook en Phase 0.1
- Tests visuels après chaque composant
- Utiliser Percy ou Chromatic pour visual regression testing (optionnel)

### Risque 2 : Perte de fonctionnalités Tailwind

**Probabilité** : 🟡 Moyenne  
**Impact** : 🟡 Moyen  
**Mitigation** :

- Audit exhaustif Phase 0.1
- Documentation des équivalents vanilla CSS
- Fallback : `color-mix()` pour `rgb(from...)`, media queries si container queries problématiques

### Risque 3 : Container queries non supportées (navigateurs legacy)

**Probabilité** : 🟢 Faible  
**Impact** : 🟡 Moyen  
**Mitigation** :

- Vérifier caniuse.com (support 92%+ en 2024)
- Ajouter polyfill si nécessaire : `container-query-polyfill`
- Alternative : media queries classiques si support requis

### Risque 4 : Temps de migration sous-estimé

**Probabilité** : 🟡 Moyenne  
**Impact** : 🟡 Moyen  
**Mitigation** :

- Buffer de 20% sur chaque phase
- Prioriser composants critiques (Button, Input, Card)
- Possibilité de livrer par phases (v1.0-beta, v1.0-rc, v1.0)

### Risque 5 : Breaking changes pour users du DS

**Probabilité** : 🟢 Faible  
**Impact** : 🟡 Moyen  
**Mitigation** :

- Changeset **major** (v1.0 → v2.0)
- Documentation migration complète
- Période de deprecation si nécessaire (garder Tailwind en v1.x)

---

## 🎯 Alternatives considérées

### Option A : Garder Tailwind, limiter usage

**Avantages** : Pas de migration  
**Inconvénients** : Ne résout pas conformité 3-layer, dépendance externe reste  
**Décision** : ❌ Rejetée

### Option B : Migration progressive avec coexistence Tailwind/Vanilla

**Avantages** : Moins risqué, réversible  
**Inconvénients** : Complexité accrue, 2 systèmes en parallèle  
**Décision** : ⚠️ Possible (plan actuel = coexistence en phases, nettoyage Phase 5)

### Option C : Réécriture complète du DS (big bang)

**Avantages** : Architecture propre dès le départ  
**Inconvénients** : Très risqué, temps long, régressions probables  
**Décision** : ❌ Rejetée (trop risqué)

### Option D : Migration progressive (plan actuel)

**Avantages** : Contrôlé, testable, réversible par composant  
**Inconvénients** : Plus long que big bang  
**Décision** : ✅ **Sélectionnée**

---

## 📚 Ressources & Références

### Documentation

- [CSS Modules](https://github.com/css-modules/css-modules)
- [CSS Container Queries (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)
- [CSS color-mix() (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Outils

- [Can I Use - Container Queries](https://caniuse.com/css-container-queries) (92%+ support)
- [Polyfill Container Queries](https://github.com/GoogleChromeLabs/container-query-polyfill)

### Patterns internes

- `docs/migration/tailwind-to-vanilla-mapping.md` (créé Phase 0.1)
- `.github/instructions/lufa-design-system.instructions.md` (architecture 3-layer)

---

## ✅ Checklist finale avant démarrage

- [ ] Lire et comprendre ce plan complet
- [ ] Allouer 6-9 jours de travail
- [ ] Préparer environnement : Node 24.9.0, pnpm 10.26.x+
- [ ] Créer branche git : `git checkout -b feat/remove-tailwind-css`
- [ ] Installer outils de test visuel si besoin (Percy, Chromatic)
- [ ] Communiquer avec l'équipe (si applicable)
- [ ] **Valider que ce plan répond à vos attentes**

---

## 🚀 Prochaines étapes

1. **Review ce plan** : Identifier questions/ajustements nécessaires
2. **Valider l'approche** : Confirmer que la migration progressive convient
3. **Commencer Phase 0** : Audit + Préparation (2-4h)
4. **Exécuter phases 1-4** : Migration progressive (40-58h)
5. **Finaliser Phase 5** : Nettoyage (4-6h)

---

**Document créé le** : 2026-01-17  
**Version** : 1.0  
**Statut** : 📋 En attente de review  
**Prochain jalon** : Validation du plan → Phase 0
