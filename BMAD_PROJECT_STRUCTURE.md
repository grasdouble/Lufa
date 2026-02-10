# 📊 BMAD Project Structure - Theme Tokens Refactoring

**Date**: 2026-02-10  
**Auteur**: Noofreuuuh  
**Statut**: ✅ Structure BMAD complète et conforme

---

## 🎯 Vue d'ensemble du projet

**Objectif**: Remplacer ~265 couleurs hardcodées par des tokens design system dans 10 thèmes Docusaurus

**Méthodologie**: BMAD (Business Model Agile Development)

**Effort total estimé**: 21-26 heures réparties sur 2 sprints

---

## 📁 Structure des artifacts BMAD

### 📋 Phase Planning (Planning Artifacts)

#### Document principal: Epic Index (Table of Contents)

```
_bmad-output/planning-artifacts/theme-tokens-refactoring-epic-index.md
```

- **Contenu**: Vue d'ensemble des 5 Epics avec liens vers les 21 Stories individuelles
- **Utilisation**: Table des matières et navigation du projet
- **Statut**: ✅ Créé via workflow délégué
- **Format**: Léger et scannable (détails dans les fichiers story individuels)

---

### 🚀 Phase Implementation (Implementation Artifacts)

#### 1. Sprint Plan

```
_bmad-output/implementation-artifacts/theme-tokens-refactoring-sprint-plan.md
```

- **Contenu**: Planning détaillé sur 2 sprints
- **Utilisation**: Guide d'exécution jour par jour
- **Statut**: ✅ Créé via `/bmad-bmm-sprint-planning`

#### 2. Stories individuelles (21 fichiers)

```
_bmad-output/implementation-artifacts/stories/
├── ETR-001-define-token-conventions.md
├── ETR-002-create-token-templates.md
├── ETR-003-pilot-steampunk-add-base-tokens.md
├── ETR-004-pilot-steampunk-refactor-docusaurus.md
├── ETR-005-create-validation-script.md
├── ETR-006-ocean-add-base-tokens.md
├── ETR-007-ocean-refactor-docusaurus.md
├── ETR-008-cyberpunk-add-base-tokens.md
├── ETR-009-cyberpunk-refactor-docusaurus.md
├── ETR-010-epic2-visual-regression-testing.md
├── ETR-011-matrix-full-refactoring.md
├── ETR-012-volt-full-refactoring.md
├── ETR-013-forest-full-refactoring.md
├── ETR-014-coffee-full-refactoring.md
├── ETR-015-volcano-theme-refactoring.md
├── ETR-016-nordic-theme-refactoring.md
├── ETR-017-sunset-theme-refactoring.md
├── ETR-018-landing-themes-refactoring.md
├── ETR-019-comprehensive-cross-theme-testing.md
├── ETR-020-documentation-updates.md
└── ETR-021-final-validation-cleanup.md
```

- **Contenu**: Chaque story complète et autonome
- **Utilisation**: Tracking individuel par story
- **Statut**: ✅ Créées via `/bmad-bmm-create-story` (3 tâches parallèles)

---

## 📊 Breakdown du projet

### 🎯 5 Epics organisés par priorité

#### **Epic 1**: Infrastructure & Tokens Foundation

- **ID**: ETR-EPIC-001
- **Priorité**: 🔴 P0 (Critical - Blocking)
- **Effort**: 3-4 heures
- **Stories**: ETR-001 à ETR-005
- **Objectif**: Établir les fondations (conventions, templates, pilote Steampunk, validation)

#### **Epic 2**: Priority Themes Refactoring (P0-P1)

- **ID**: ETR-EPIC-002
- **Priorité**: 🔴 P0-P1 (High)
- **Effort**: 7-8 heures
- **Stories**: ETR-006 à ETR-010
- **Objectif**: Refactoriser Ocean et Cyberpunk + tests de régression
- **Thèmes**: Ocean (~60 rgba), Cyberpunk (~40 rgba)

#### **Epic 3**: Secondary Themes (P2)

- **ID**: ETR-EPIC-003
- **Priorité**: 🟡 P2 (Medium)
- **Effort**: 4-5 heures
- **Stories**: ETR-011 à ETR-013
- **Objectif**: Refactoriser Matrix, Volt, Forest
- **Thèmes**: Matrix (~30 rgba), Volt (~25 rgba), Forest (~20 rgba)

#### **Epic 4**: Remaining Themes (P3)

- **ID**: ETR-EPIC-004
- **Priorité**: 🟢 P3 (Low)
- **Effort**: 4-5 heures
- **Stories**: ETR-014 à ETR-017
- **Objectif**: Refactoriser Coffee, Volcano, Nordic, Sunset
- **Thèmes**: Coffee (~15), Volcano (~12), Nordic (~10), Sunset (~8 rgba)

#### **Epic 5**: Landing Page & Final Polish

- **ID**: ETR-EPIC-005
- **Priorité**: 🟡 P1 (High)
- **Effort**: 3-4 heures
- **Stories**: ETR-018 à ETR-021
- **Objectif**: Landing themes CSS, tests exhaustifs, documentation, validation finale

---

### 📝 21 Stories détaillées

| Story ID    | Titre                                 | Epic        | Priorité | SP     | Temps   | Status |
| ----------- | ------------------------------------- | ----------- | -------- | ------ | ------- | ------ |
| **ETR-001** | Define Token Naming Conventions       | Epic 1      | P0       | 2      | 1h      | Ready  |
| **ETR-002** | Create Token Templates                | Epic 1      | P0       | 2      | 45m     | Ready  |
| **ETR-003** | Pilot Steampunk - Add Base Tokens     | Epic 1      | P0       | 5      | 1.5h    | Ready  |
| **ETR-004** | Pilot Steampunk - Refactor Docusaurus | Epic 1      | P0       | 8      | 2h      | Ready  |
| **ETR-005** | Create Validation Script              | Epic 1      | P2       | 3      | 1h      | Ready  |
| **ETR-006** | Ocean - Add Base Tokens               | Epic 2      | P1       | 5      | 1h      | Ready  |
| **ETR-007** | Ocean - Refactor Docusaurus           | Epic 2      | P1       | 8      | 1.5h    | Ready  |
| **ETR-008** | Cyberpunk - Add Base Tokens           | Epic 2      | P1       | 5      | 1h      | Ready  |
| **ETR-009** | Cyberpunk - Refactor Docusaurus       | Epic 2      | P1       | 8      | 1.5h    | Ready  |
| **ETR-010** | Epic 2 - Visual Regression Testing    | Epic 2      | P1       | 5      | 2h      | Ready  |
| **ETR-011** | Matrix - Full Refactoring             | Epic 3      | P2       | 5      | 1.5h    | Ready  |
| **ETR-012** | Volt - Full Refactoring               | Epic 3      | P2       | 5      | 1.5h    | Ready  |
| **ETR-013** | Forest - Full Refactoring             | Epic 3      | P2       | 5      | 1.5h    | Ready  |
| **ETR-014** | Coffee - Full Refactoring             | Epic 4      | P3       | 3      | 1h      | Ready  |
| **ETR-015** | Volcano - Full Refactoring            | Epic 4      | P3       | 3      | 1h      | Ready  |
| **ETR-016** | Nordic - Full Refactoring             | Epic 4      | P3       | 3      | 1h      | Ready  |
| **ETR-017** | Sunset - Full Refactoring             | Epic 4      | P3       | 3      | 1h      | Ready  |
| **ETR-018** | Landing Themes CSS - Refactoring      | Epic 5      | P1       | 8      | 2h      | Ready  |
| **ETR-019** | Comprehensive Cross-Theme Testing     | Epic 5      | P1       | 8      | 2h      | Ready  |
| **ETR-020** | Documentation Updates                 | Epic 5      | P1       | 5      | 1h      | Ready  |
| **ETR-021** | Final Validation & Cleanup            | Epic 5      | P0       | 5      | 1h      | Ready  |
| **TOTAL**   | **21 Stories**                        | **5 Epics** | -        | **95** | **26h** | -      |

---

## 📅 Sprint Planning

### Sprint 1 (46 SP - 10-13h - 3-4 jours)

**Objectif**: Établir l'infrastructure et refactoriser les thèmes prioritaires

**Stories incluses**:

- ETR-001 à ETR-010 (Epic 1 complet + Epic 2 complet)

**Livrables**:

- ✅ Conventions de tokens définies
- ✅ Templates créés
- ✅ Steampunk 100% refactorisé (pilote)
- ✅ Ocean 100% refactorisé
- ✅ Cyberpunk 100% refactorisé
- ✅ Script de validation (optionnel)
- ✅ Tests de régression Epic 2

**Pattern établi**: À la fin du Sprint 1, le pattern de refactoring est clair et réutilisable

---

### Sprint 2 (49 SP - 11-13h - 3-4 jours)

**Objectif**: Compléter les thèmes restants et finaliser

**Stories incluses**:

- ETR-011 à ETR-021 (Epic 3, 4, 5 complets)

**Livrables**:

- ✅ 7 thèmes refactorisés (Matrix, Volt, Forest, Coffee, Volcano, Nordic, Sunset)
- ✅ Landing themes CSS refactorisé
- ✅ Tests exhaustifs (30 combinaisons thème/mode)
- ✅ Documentation complète
- ✅ Validation finale
- ✅ Projet prêt pour merge

---

## 🔄 Workflows BMAD utilisés

### 1. Create Epics and Stories

```bash
/bmad-bmm-create-epics-and-stories
```

- **Agent**: 📋 John (Product Manager)
- **Input**: THEME_REFACTORING_PLAN.md
- **Output**: theme-tokens-refactoring-epics-stories.md
- **Statut**: ✅ Exécuté

### 2. Sprint Planning

```bash
/bmad-bmm-sprint-planning
```

- **Agent**: 🏃 Bob (Scrum Master)
- **Input**: theme-tokens-refactoring-epics-stories.md
- **Output**: theme-tokens-refactoring-sprint-plan.md
- **Statut**: ✅ Exécuté

### 3. Create Story (×3 tâches parallèles)

```bash
/bmad-bmm-create-story
```

- **Agent**: 🏃 Bob (Scrum Master)
- **Input**: theme-tokens-refactoring-epics-stories.md
- **Output**: 21 fichiers individuels (ETR-001 à ETR-021)
- **Statut**: ✅ Exécuté en 3 batches parallèles
  - Batch 1: ETR-001 à ETR-007
  - Batch 2: ETR-008 à ETR-014
  - Batch 3: ETR-015 à ETR-021

---

## 📋 Contenu de chaque Story

Chaque fichier de story (21 fichiers) contient:

### Métadonnées

- Story ID (ETR-XXX)
- Epic (ETR-EPIC-XXX)
- Priority (P0/P1/P2/P3)
- Story Points (2-8 SP)
- Estimated Time (45m - 2h)
- Type (Development/Documentation/Testing)
- Status (Ready for Development)
- Dependencies (liste des stories bloquantes)

### Sections principales

1. **Epic Context**: Objectifs de l'Epic parent
2. **User Story**: "As a [role], I need [feature], so that [benefit]"
3. **Description**: Explication détaillée de la tâche
4. **Acceptance Criteria**: Checkboxes pour validation (✓)
5. **Technical Details**: Exemples de code CSS, structures de tokens
6. **Files to Create/Modify**: Chemins exacts des fichiers
7. **Implementation Steps**: Guide pas à pas
8. **Testing & Validation**: Commandes et checklists
9. **Related Stories**: Dépendances et références
10. **Notes**: Considérations spéciales
11. **Definition of Done**: Critères de complétion

---

## 🎯 Avantages de cette structure BMAD

### ✅ Gestion fine par story

- Chaque story est un fichier indépendant
- Tracking individuel possible (To Do / In Progress / Done)
- Facile à assigner à différents développeurs si besoin

### ✅ Conformité méthodologique

- Suit le workflow BMAD standard
- Utilise les agents appropriés (PM, SM)
- Artifacts organisés selon la structure BMAD

### ✅ Traçabilité complète

- Lien clair Epic → Stories
- Dépendances explicites
- Timeline précise (Sprint 1 → Sprint 2)

### ✅ Réutilisabilité

- Format standardisé
- Pattern reproductible pour futurs projets
- Templates et conventions documentés

### ✅ Exportabilité

- Peut être importé dans GitHub Issues / Jira / Azure DevOps
- Format Markdown compatible avec la plupart des outils
- Structure claire pour les outils de project management

---

## 📊 Métriques du projet

### Effort total

- **Story Points**: 95 SP
- **Heures estimées**: 26h (avec buffer)
- **Durée calendaire**: 6-8 jours (2 sprints)
- **Velocity cible**: ~3.5 SP/heure

### Breakdown par Epic

| Epic   | Stories | SP  | Heures | % du total |
| ------ | ------- | --- | ------ | ---------- |
| Epic 1 | 5       | 20  | 6h     | 23%        |
| Epic 2 | 5       | 31  | 8h     | 31%        |
| Epic 3 | 3       | 15  | 4.5h   | 16%        |
| Epic 4 | 4       | 12  | 4h     | 13%        |
| Epic 5 | 4       | 17  | 6h     | 18%        |

### Répartition par type

- **Development**: 17 stories (81%)
- **Testing**: 2 stories (10%)
- **Documentation**: 2 stories (9%)

---

## 🚀 Prochaines étapes

### Immédiat

1. ✅ Structure BMAD complète créée
2. ⬜ Commencer Sprint 1, Day 1, Story ETR-001
3. ⬜ Setup daily standup routine

### Sprint 1 (3-4 jours)

1. ⬜ Epic 1: Infrastructure (ETR-001 à ETR-005)
2. ⬜ Epic 2: Ocean + Cyberpunk (ETR-006 à ETR-010)
3. ⬜ Sprint Review & Retrospective

### Sprint 2 (3-4 jours)

1. ⬜ Epic 3: Matrix, Volt, Forest (ETR-011 à ETR-013)
2. ⬜ Epic 4: Coffee, Volcano, Nordic, Sunset (ETR-014 à ETR-017)
3. ⬜ Epic 5: Landing page, tests, docs (ETR-018 à ETR-021)
4. ⬜ Sprint Review & Retrospective
5. ⬜ Merge vers main

---

## 📚 Documents de référence

### Documents planning (créés manuellement avant BMAD)

- `THEME_REFACTORING_PLAN.md` - Plan technique détaillé
- `THEME_REFACTORING_SPRINT_PLAN.md` - Sprint planning manuel (remplacé)
- `BRANCH_CONTEXT_feat-docusaurus-theme.md` - Contexte de la branche

### Documents BMAD (créés via workflows)

- `_bmad-output/planning-artifacts/theme-tokens-refactoring-epic-index.md` - Epic Index (Table of Contents)
- `_bmad-output/implementation-artifacts/theme-tokens-refactoring-sprint-plan.md` - Sprint planning quotidien
- `_bmad-output/implementation-artifacts/stories/ETR-*.md` (21 fichiers) - Stories individuelles détaillées

---

## ✅ Checklist de validation BMAD

- [x] Epic Index créé (lightweight table of contents)
- [x] Stories individuelles créées via `/bmad-bmm-create-story`
- [x] Ancien fichier consolidé archivé (.backup)
- [x] Artifacts dans les bons dossiers (planning-artifacts / implementation-artifacts)
- [x] Nomenclature cohérente (ETR-XXX)
- [x] Dépendances documentées
- [x] Definition of Done pour chaque story
- [x] Format Markdown standard BMAD
- [x] Langue: Anglais technique, Français communication
- [x] 21 stories prêtes pour développement

---

**Status**: ✅ **BMAD Structure Complete - Ready for Development**

**Next Action**: Commencer Sprint 1, Story ETR-001 🚀

---

**Créé le**: 2026-02-10  
**Par**: Workflows BMAD délégués  
**Outils utilisés**:

- `/bmad-bmm-create-epics-and-stories`
- `/bmad-bmm-sprint-planning`
- `/bmad-bmm-create-story` (×3 parallel)

🎯 _"BMAD ensures structure, traceability, and quality at every step"_
