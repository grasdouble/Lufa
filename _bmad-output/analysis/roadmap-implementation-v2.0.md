# 🗺️ Roadmap Implémentation Lufa Design System v2.0

**Date création:** 2026-01-22  
**Confidence architecture:** 99%  
**Timeline estimée:** 11 semaines  
**Statut:** 🟢 Phase 0 FULLY COMPLETED - Architecture VALIDÉE, Maintenance Automatisée & Scope Défini

---

## 🚨 Phase 0: Actions Critiques PRÉ-Implémentation

**Durée:** 3-5 jours  
**Objectif:** Valider faisabilité technique et préparer l'environnement

### ✅ ACTION #1: POC Performance CSS Cascade (Priorité: CRITIQUE) - **COMPLETED**

**Timeline:** Jour 1-2 ✅ **DONE: 2026-01-22**

**Objectif:** Valider que 3-4 niveaux de `var()` CSS imbriqués ne causent pas de problème de performance

**Tasks:**

- [x] ✅ Créer page de test avec 1000 éléments utilisant tokens 4-niveaux
- [x] ✅ Mesurer: Rendering time, Paint time, Layout time (Chrome DevTools Performance)
- [x] ✅ **Success criteria ATTEINT:** 8.00ms << 16ms (60fps) pour batch 1000 éléments ✅
- [x] ✅ Fallback non nécessaire - Performance exceptionnelle validée

**Résultats:**

- **8.00ms << 16ms** (50% en dessous du seuil 60fps)
- **Overhead négligeable:** +0.10ms vs baseline (+1.3%)
- **Tous les tests PASS:** Architecture 4-niveaux validée pour production
- **Décision:** ✅ Procéder avec `outputReferences: true` (cascade complète préservée)

**Livrables:**

- ✅ `_bmad-output/pocs/css-cascade-performance-test.html` (fixed, working)
- ✅ `_bmad-output/pocs/performance-results.md` (complete with all test data)

---

### ✅ ACTION #2: Plan Mitigation Maintenance Metadata (Priorité: HAUTE) - **COMPLETED**

**Timeline:** Jour 3 ✅ **DONE: 2026-01-22**

**Objectif:** Automatiser et faciliter la maintenance des métadonnées tokens

**Tasks:**

- [x] ✅ **Linter CI custom:**
  - Créer script `scripts/validate-token-metadata.js`
  - Checks: `$description` obligatoire, `$type` présent, `$extensions.lufa.themable` défini
  - Intégrer dans GitHub Actions (blocking PR si fail)

- [x] ✅ **VSCode snippets:**
  - Créer `.vscode/lufa-tokens.code-snippets`
  - Snippets: 14 snippets disponibles (color, dimension, primitive, core, semantic, component, etc.)
  - Auto-génère structure complète avec metadata

- [x] ✅ **Documentation onboarding:**
  - Écrire `docs/contributors/your-first-token.md` (5-min guide complet)
  - Exemples commentés extensifs avec do's and don'ts
  - Architecture 4-niveaux expliquée

- [x] ✅ **GitHub Actions bot:**
  - Workflow `.github/workflows/validate-tokens.yml` créé
  - Commente automatiquement sur PR avec tokens sans metadata
  - Suggestions automatiques et liens vers documentation
  - Blocking PR si validation échoue

**Livrables:**

- ✅ `scripts/validate-token-metadata.js` (validation complète avec colors ANSI, error reporting)
- ✅ `.vscode/lufa-tokens.code-snippets` (14 snippets pour tous les cas d'usage)
- ✅ `docs/contributors/your-first-token.md` (guide complet 5-min avec exemples)
- ✅ `.github/workflows/validate-tokens.yml` (CI automation avec bot comments)
- ✅ `scripts/README.md` mis à jour (documentation du nouveau script)
- ✅ `package.json` mis à jour (ajout script `validate:tokens`)

**Bonus Deliverables:**

- ✅ Comprehensive validation output with color-coded results
- ✅ Helpful error messages with fix suggestions
- ✅ VSCode snippets for all 4 architecture levels
- ✅ GitHub Actions bot with smart PR comments

---

### ✅ ACTION #3: Stratégie Anti-Scope-Creep (Priorité: CRITIQUE) - **COMPLETED**

**Timeline:** Jour 3 (2h) ✅ **DONE: 2026-01-22**

**Objectif:** Définir périmètre strict v2.0 pour éviter surcharge

**Approche Retenue:** **"Foundations First"** - Hiérarchie composants propre avec Core primitives

**Tasks:**

- [x] ✅ **Définir MVP Tier 1 - RÉVISÉ à 7 composants avec hiérarchie:**
  - **Phase 2A - Core Components (4):** Box, Text, Stack, Icon
  - **Phase 2B - UI Essentials (3):** Button, Badge, Divider
  - **STOP - 7 composants MAX pour v2.0.0** (Input et Card reportés à v2.1)

- [x] ✅ **Liste "Non-Goals v2.0":**
  - ❌ AI theme generation
  - ❌ Multi-brand architecture
  - ❌ Dynamic color generation CLI
  - ❌ Token Stories visualization (beyond basic catalog)
  - ❌ Responsive tokens avec breakpoints
  - ❌ Component token auto-promotion
  - ❌ Advanced components (Input, Card, Form controls, Overlays, Navigation, Data components)
  - ❌ Animation system
  - ❌ Icon library (BYO)
  - ❌ VSCode extension (beyond snippets)
  - (40+ features = backlog v2.1+)

- [x] ✅ **Review gates hebdomadaires:**
  - Format: Weekly markdown reports with AI assistance
  - Metrics: Component completion tracking (automated)
  - Week 4: Phase 2A checkpoint (4/4 Core Components)
  - Week 6: Phase 2B checkpoint (5-6/7 Components)
  - **No pressure approach** - Indicators, not deadlines
  - Escape hatches: Extend timeline OR descope OR early beta

- [x] ✅ **Definition of Done (DoD) checklist créée:**
  - 9 categories: Implementation, Styling, Accessibility, Testing, Documentation, Package/Build
  - **RTL support** ajouté à la checklist
  - WCAG 2.1 AA compliance obligatoire
  - Playwright coverage >80% obligatoire

**Décision Stratégique:**

✅ **Option A "Foundations First" adoptée** - Construire Core Components d'abord (Box, Text, Stack, Icon), puis UI Components qui les utilisent. Résultat: architecture scalable et composable.

**Livrables:**

- ✅ `docs/roadmap/v2.0-scope.md` (15 sections, 400+ lignes)
  - MVP Tier 1 détaillé avec scope IN/OUT pour chaque composant
  - 40+ Non-Goals listés avec justifications
  - Definition of Done avec 9 catégories de critères
  - Weekly review process avec métriques automatiques
  - Escape hatches et Plan B documentés
  - Scope change request process défini

---

## 📅 Phase 1: Fondations (Semaines 1-2)

**Objectif:** Mettre en place l'infrastructure tokens + primitives

### Semaine 1: Setup Style Dictionary + Primitives

**Tasks:**

- [ ] **Setup package tokens:**
  - Créer structure `packages/design-system/tokens/`
  - Installer Style Dictionary (`pnpm add -D style-dictionary`)
  - Config `style-dictionary.config.js` (multi-format: CSS, TS, JSON)

- [ ] **Créer primitives:**
  - `src/primitives/colors/` (blue, gray, red, green, etc.)
  - `src/primitives/spacing/scale.json` (0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96)
  - `src/primitives/typography/` (font-families, font-sizes, font-weights, line-heights)
  - `src/primitives/shadows/elevations.json`
  - `src/primitives/radii/scale.json`

- [ ] **Tester build:**
  - `pnpm ds:tokens:build` génère `dist/tokens.css`, `dist/tokens.ts`, `dist/tokens-docs.json`
  - Vérifier `outputReferences: true` fonctionne (cascade CSS)

**Livrables:**

- Package `@grasdouble/lufa_design-system-tokens` opérationnel
- ~50-80 primitives tokens définis
- Build fonctionnel

---

### Semaine 2: Core + Semantic Tokens

**Tasks:**

- [ ] **Créer core tokens:**
  - `src/core/brand/colors.json` (primary, secondary, accent)
  - `src/core/brand/typography.json` (font-family-primary)
  - `src/core/system/spacing.json` (références primitives)
  - `src/core/system/elevation.json` (shadow levels)

- [ ] **Créer semantic tokens:**
  - `src/semantic/action/colors.json` (interactive, hover, active, disabled)
  - `src/semantic/content/typography.json` (heading, body, caption)
  - `src/semantic/content/colors.json` (text-primary, text-secondary, text-inverse)
  - `src/semantic/feedback/colors.json` (success, error, warning, info)
  - `src/semantic/surface/colors.json` (background-primary, background-secondary, background-elevated)
  - `src/semantic/border/colors.json` (border-default, border-focus, border-error)

- [ ] **Implémenter pattern "on-X":**
  - Paires de contraste: `background.primary` + `background.on-primary`
  - Metadata `$extensions.lufa.pairedWith`

- [ ] **Implémenter multi-modes:**
  - `$extensions.lufa.modes: { light, dark, high-contrast }`
  - CSS généré avec `[data-theme="..."]`

**Livrables:**

- ~100-150 semantic tokens définis
- Pattern "on-X" appliqué (10+ paires)
- Multi-modes opérationnel (light/dark/high-contrast)

---

## 🧩 Phase 2: Core Components (Semaines 3-5)

**Objectif:** Reconstruire les 5 composants MVP Tier 1

### Semaine 3: Button + Badge

**Tasks:**

- [ ] **Button component:**
  - Variants: solid, outline, ghost
  - Sizes: sm, md, lg
  - States: default, hover, active, disabled, loading
  - Accessibility: keyboard navigation, focus-visible, ARIA
  - Tests Playwright: 15+ test cases (variants, states, a11y)
  - Storybook story avec controls

- [ ] **Badge component:**
  - Variants: neutral, success, error, warning, info
  - Sizes: sm, md
  - Tests Playwright: 8+ test cases
  - Storybook story

**Livrables:**

- `packages/design-system/main/src/components/Button.tsx`
- `packages/design-system/main/src/components/Badge.tsx`
- Tests Playwright passants
- Storybook stories documentées

---

### Semaine 4: Input + Card

**Tasks:**

- [ ] **Input component:**
  - Types: text, email, password, number
  - States: default, hover, focus, error, disabled
  - Features: label, helper text, error message, prefix/suffix icons
  - Accessibility: label association, error announcements, ARIA
  - Tests Playwright: 20+ test cases
  - Storybook story

- [ ] **Card component:**
  - Variants: elevated, outlined, flat
  - Sections: header, body, footer (optionnels)
  - Tests Playwright: 10+ test cases
  - Storybook story

**Livrables:**

- `Input.tsx` et `Card.tsx` complets
- Tests Playwright passants
- Storybook stories

---

### Semaine 5: Divider + Polish

**Tasks:**

- [ ] **Divider component:**
  - Orientations: horizontal, vertical
  - Variants: solid, dashed
  - Tests Playwright: 6+ test cases
  - Storybook story

- [ ] **Polish Tier 1:**
  - Audit a11y complet (tous composants)
  - Vérifier contraste AA-strict (Axe DevTools)
  - Uniformiser documentation composants
  - Vérifier TypeScript types exportés

- [ ] **Integration testing:**
  - Tester composition (Button dans Card, Badge dans Input, etc.)
  - Vérifier theme switching (light → dark → high-contrast)

**Livrables:**

- `Divider.tsx` complet
- 5 composants Tier 1 polis et testés
- Audit a11y 100% passé

---

## 🔧 Phase 3: Tooling & Documentation (Semaines 6-8)

**Objectif:** Outillage pour theme creators + documentation complète

### Semaine 6: Theme Validation CLI + Template

**Tasks:**

- [ ] **Theme template CSS:**
  - Créer `packages/design-system/tokens/dist/theme-template.css`
  - Commentaires explicatifs pour chaque token overridable
  - Inclure valeurs par défaut

- [ ] **CLI validator (MVP):**
  - Package `@grasdouble/lufa-theme-validator`
  - Commande: `npx lufa-validate-theme ./my-theme.css`
  - Checks: Complétude (tous tokens thémables overridés), Contrast ratios (WCAG AA)
  - Output: Rapport markdown avec warnings/errors

- [ ] **Documentation theme creators:**
  - `docs/theming/creating-your-first-theme.md`
  - `docs/theming/theme-contract.md` (liste tokens overridables)

**Checkpoint Semaine 6:**

- Review "on-track?" - Go/No-Go pour continuer
- Si retard >20%: Préparer release early beta (Tier 1 uniquement)

**Livrables:**

- `theme-template.css`
- Package `@grasdouble/lufa-theme-validator` (MVP)
- Docs theming

---

### Semaine 7: Storybook TokensCatalog + CI Validation

**Tasks:**

- [ ] **Storybook TokensCatalog:**
  - Story explorable affichant tous tokens
  - Preview visuel (couleurs, spacing, shadows, typography)
  - Filtres: par role, category, themable
  - Search tokens
  - Metadata display (a11y, paired-with, usage guidelines)

- [ ] **CI Validation stricte:**
  - GitHub Actions workflow `validate-tokens.yml`
  - Checks: description obligatoire, a11y metadata (couleurs), no hardcoded values
  - Blocking PR si fail

- [ ] **VSCode extension (stretch goal):**
  - Si temps disponible: Extension hover tooltip pour tokens CSS
  - Sinon: reporter v2.1

**Livrables:**

- Storybook TokensCatalog fonctionnel
- CI validation active
- (Optionnel) VSCode extension

---

### Semaine 8: Theme Validation Scoring + Docusaurus

**Tasks:**

- [ ] **CLI validator scoring:**
  - Ajouter système de notation (A-F)
  - Catégories: Accessibility, Completeness, Consistency
  - Recommandations constructives

- [ ] **Docusaurus documentation:**
  - Migrer/créer docs API composants
  - Générer API reference depuis tokens-docs.json
  - Guides: Getting Started, Theming, Accessibility, Contributing

- [ ] **Storybook polish:**
  - Documenter tous composants Tier 1
  - Exemples d'usage composés
  - Dark mode toggle dans toolbar

**Livrables:**

- CLI validator avec scoring
- Docusaurus site complet
- Storybook production-ready

---

## 🧹 Phase 4: Legacy Cleanup & Release (Semaines 9-11)

**Objectif:** Migration legacy, tests finaux, release v2.0.0

### Semaine 9: Migration Package Legacy

**Tasks:**

- [ ] **Déplacer v1 vers legacy:**
  - Renommer `packages/design-system/` → `packages/design-system-legacy/`
  - Freeze version v1 (no more updates)
  - Ajouter deprecation notice dans README

- [ ] **Setup v2 comme default:**
  - `packages/design-system/` = v2 architecture
  - Update imports dans applications test

- [ ] **Documentation migration:**
  - `docs/migration/v1-to-v2-guide.md`
  - Breaking changes listées
  - Codemods si nécessaire (ou manuel)

**Livrables:**

- v1 frozen dans `/legacy`
- v2 comme package principal
- Guide migration

---

### Semaine 10: Testing Final + Bug Fixes

**Tasks:**

- [ ] **Test suite complet:**
  - Playwright component tests: 100% coverage Tier 1
  - Playwright E2E tests: Flows critiques (theme switching, form submission)
  - Visual regression tests: Snapshots tous composants (light/dark/high-contrast)

- [ ] **Bug bash:**
  - Tester sur Chrome, Firefox, Safari, Edge
  - Tester mobile (Chrome Android, Safari iOS)
  - Fix bugs critiques/bloquants

- [ ] **Performance audit:**
  - Lighthouse score >90 (Storybook)
  - Bundle size analysis (tokens package <30kb gzipped)

**Livrables:**

- Test suite 100% vert
- 0 bugs critiques
- Performance validée

---

### Semaine 11: Release v2.0.0 🎉

**Tasks:**

- [ ] **Changeset preparation:**
  - `pnpm changeset` pour tous packages (major version bump)
  - Rédiger CHANGELOG détaillé

- [ ] **Documentation finale:**
  - README principal à jour
  - Badges (build status, coverage, npm version)
  - Screenshots Storybook

- [ ] **Release:**
  - Merge PR vers `main`
  - Trigger GitHub Actions release workflow
  - Publier sur GitHub Package Registry
  - Tag git `v2.0.0`

- [ ] **Communication:**
  - Blog post announcement (si applicable)
  - Tweet/LinkedIn post
  - Update portfolio/showcase

- [ ] **Retrospective:**
  - `_bmad-output/retrospectives/v2.0-retro.md`
  - Lessons learned, what went well, what to improve

**Livrables:**

- 🎉 **Lufa Design System v2.0.0 RELEASED**
- Documentation complète publiée
- Retrospective documentée

---

## 📊 Métriques de Succès v2.0

### Objectifs Quantitatifs

- ✅ **5 composants Tier 1** opérationnels (Button, Input, Card, Badge, Divider)
- ✅ **150-200 tokens** définis (primitives + core + semantic)
- ✅ **3 modes** supportés (light, dark, high-contrast)
- ✅ **100% WCAG 2.1 AA** sur tokens Lufa officiels
- ✅ **Test coverage >80%** (Playwright component tests)
- ✅ **Bundle size <30kb** gzipped (tokens package)
- ✅ **Build time <10s** (all packages)

### Objectifs Qualitatifs

- ✅ **Architecture propre** (no legacy debt, DTCG standard)
- ✅ **DX exceptionnelle** (TypeScript auto-complétion, hover previews, docs)
- ✅ **Thémabilité native** (hot-swapping sans rebuild)
- ✅ **Tooling riche** (CLI validator, Storybook catalog, templates)
- ✅ **Documentation complète** (Docusaurus, Storybook, guides)

---

## 🚀 Post-v2.0: Roadmap Future

### v2.1 (Q2 2026)

- Theme Linting VSCode Extension
- Tier 2 composants (Select, Checkbox, Radio, Switch, Textarea)
- Dynamic color generation CLI (POC)

### v2.2 (Q3 2026)

- Token Playground Interactif (Storybook)
- Token Stories Visualization
- Tier 3 composants (Modal, Drawer, Tabs, Accordion)

### v3.0 (2027)

- Multi-Brand Architecture
- AI-Assisted Theme Creation
- Component Token Auto-Promotion
- Responsive tokens avec breakpoints

---

## 📝 Notes Importantes

### Prochaine Session Brainstorming Recommandée

🎯 **Topic:** "Organisation des composants v2.0"  
**Quand:** Après Semaine 2-3 (fondations tokens posées)  
**Pourquoi:** Structure actuelle composants n'est pas à garder  
**Technique:** Morphological Analysis (explorer structures possibles)

### Risques à Surveiller

⚠️ **Maintenance métadonnées** - Automatisation critique  
⚠️ **Scope creep** - Respecter MVP Tier 1 strict  
⚠️ **Fatigue décisionnelle** - Reviews hebdos obligatoires  
⚠️ **Performance CSS** - Validée en Phase 0 ACTION #1

---

**Document créé:** 2026-01-22  
**Dernière mise à jour:** 2026-01-22  
**Statut:** Ready to execute  
**Confidence:** 97%
