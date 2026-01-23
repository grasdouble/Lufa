# 📝 Checklist: Mise à Jour Documentation après Complétion Phase

**Usage:** Suivre cette checklist après avoir terminé une phase pour garantir que toute la documentation est à jour.

---

## ✅ Checklist Standard

### Étape 1: Créer le Phase Summary

- [ ] Créer `phase-X-completion-summary.md` dans `_bmad-output/analysis/`
  - **Toutes les phases (0-8):** `_bmad-output/analysis/`
  - **Centralisation:** Tous les phase summaries au même endroit

**Contenu minimum requis:**

- [ ] Date de complétion
- [ ] Durée réelle vs estimée
- [ ] Livrables créés (liste complète)
- [ ] Tokens créés (si applicable) avec breakdown par catégorie
- [ ] Problèmes rencontrés et solutions
- [ ] Prochaine étape recommandée

---

### Étape 2: Mettre à Jour MASTER-STATUS.md

**Fichier:** `_bmad-output/analysis/MASTER-STATUS.md`

#### Section "Executive Summary" (lignes 10-52)

- [ ] Mettre à jour le progress bar textuel
  ```
  ✅ Phase X: [Nom] ([count])  - 100% COMPLETE
  ```
- [ ] Mettre à jour "What's Next" avec la prochaine phase

#### Section "Phase Status Overview" (lignes 57-63)

- [ ] Ajouter ligne pour la phase complétée dans le tableau:
  ```markdown
  | Phase X | ✅ Complete | [count] | [durée] | YYYY-MM-DD | `path/to/summary.md` |
  ```
- [ ] Mettre à jour "Total" tokens créés
- [ ] Mettre à jour pourcentage architecture complétée

#### Section de la Phase Complétée (chercher "Phase X:")

- [ ] Changer statut de "⏳ Next" ou "📋 Planned" à "✅ COMPLETE"
- [ ] Ajouter date de complétion
- [ ] Ajouter durée réelle
- [ ] Cocher toutes les tasks [x]
- [ ] Ajouter section "Résultats" avec metrics
- [ ] Ajouter lien vers le phase summary

#### Section "⏳ Phase X - NEXT"

- [ ] Marquer la prochaine phase comme "⏳ NEXT 🎯"
- [ ] Vérifier que les objectifs sont clairs

#### Section "Metrics & Progress" (chercher "Token Progress")

- [ ] Mettre à jour les progress bars:
  ```
  Level X: [count] tokens ████████████████████████ 100%
  Total:   [count]/361    ████████████░░░░░░░░░░░░  XX%
  ```

#### Section "Risks & Mitigation" (optionnel)

- [ ] Marquer risques résolus comme ✅
- [ ] Ajouter nouveaux risques identifiés comme ⚠️

#### Footer (dernières lignes)

- [ ] Mettre à jour "Last Updated: YYYY-MM-DD"
- [ ] Mettre à jour "Next Phase: Phase X - [Nom]"

---

### Étape 3: Mettre à Jour roadmap-implementation-v2.0.md

**Fichier:** `_bmad-output/analysis/roadmap-implementation-v2.0.md`

#### Header (lignes 1-8)

- [ ] Mettre à jour "Dernière mise à jour: YYYY-MM-DD"
- [ ] Mettre à jour "Statut:" avec phase complétée et tokens count
- [ ] Vérifier "Confidence:" (ajuster si nécessaire)

#### Section "Vue d'Ensemble - Progression Actuelle" (lignes 12-63)

- [ ] Mettre à jour le progress bar ASCII:
  ```
  │  ✅ Phase X: [Nom] ([count] tokens)     100% COMPLETE    │
  ```
- [ ] Mettre à jour la table "Phases Complétées"
- [ ] Mettre à jour "Prochaine Étape" avec Phase suivante

#### Section de la Phase Complétée (chercher "## Phase X:")

- [ ] Changer statut dans le titre:
  - De: `## ⏳ Phase X:` ou `## 📋 Phase X:`
  - À: `## ✅ Phase X: - **COMPLETED**`
- [ ] Ajouter sous-section "Résultats Phase X"
- [ ] Lister "Tokens créés:" avec count
- [ ] Cocher toutes tasks complétées [x]
- [ ] Ajouter "Livrables:" avec liste complète
- [ ] Ajouter "Documentation:" avec lien vers phase summary

#### Section de la Phase Suivante (chercher "## Phase X+1:")

- [ ] Changer statut de "📋 PLANNED" à "⏳ NEXT 🎯"
- [ ] Vérifier que l'estimation est à jour

#### Footer (dernières lignes)

- [ ] Mettre à jour "Dernière mise à jour: YYYY-MM-DD"
- [ ] Mettre à jour "Statut:" (Phase X Complete - Ready for Phase X+1)
- [ ] Mettre à jour "Token Progress: [count]/361 (XX%)"
- [ ] Mettre à jour "Prochaines Actions Immédiates"

---

### Étape 4: Vérification Croisée

- [ ] **Cohérence dates:** MASTER-STATUS et Roadmap ont la même "Last Updated"
- [ ] **Cohérence token count:** Les deux docs affichent le même total
- [ ] **Cohérence statut:** Phase marquée "COMPLETE" dans les deux
- [ ] **Cohérence "Next":** Les deux pointent vers la même prochaine phase
- [ ] **Liens valides:** Tous les liens vers phase summaries fonctionnent

---

### Étape 5: Commit Git

```bash
# Ajouter tous les fichiers modifiés
git add _bmad-output/analysis/MASTER-STATUS.md
git add _bmad-output/analysis/roadmap-implementation-v2.0.md
git add _bmad-output/analysis/phase-X-completion-summary.md

# Vérifier les changements
git diff --staged

# Commit avec message clair
git commit -m "docs: update Phase X completion status

- Phase X completed: [brief description]
- [count] tokens created
- Updated MASTER-STATUS and roadmap
- Added phase-X-completion-summary.md"
```

---

## 📊 Métriques à Vérifier

Après mise à jour, ces chiffres doivent être **identiques** dans MASTER-STATUS et Roadmap:

| Métrique            | MASTER-STATUS | Roadmap     | Match? |
| ------------------- | ------------- | ----------- | ------ |
| Total tokens        | [count]/361   | [count]/361 | ✅/❌  |
| Pourcentage complet | XX%           | XX%         | ✅/❌  |
| Phase X status      | ✅ COMPLETE   | ✅ COMPLETE | ✅/❌  |
| Phase X+1 status    | ⏳ NEXT       | ⏳ NEXT     | ✅/❌  |
| Last updated date   | YYYY-MM-DD    | YYYY-MM-DD  | ✅/❌  |
| Confidence          | 99%           | 99%         | ✅/❌  |

---

## 🔍 Exemple Concret: Mise à Jour après Phase 3

### Supposons que Phase 3 vient d'être complétée (80 tokens créés)

**Nouveaux chiffres:**

- Total tokens: 161 + 80 = **241/361** (67%)
- Phase 3: ✅ COMPLETE
- Phase 4: ⏳ NEXT

**Checklist appliquée:**

#### 1. Phase Summary créé ✅

```
_bmad-output/analysis/phase-3-completion-summary.md
```

#### 2. MASTER-STATUS.md mis à jour ✅

```diff
- ⏳ Phase 3: Semantic Tokens (~80)   - 0% NEXT
+ ✅ Phase 3: Semantic Tokens (80)    - 100% COMPLETE
- 📋 Phase 4: Component Tokens (~120) - 0% PLANNED
+ ⏳ Phase 4: Component Tokens (~120) - 0% NEXT 🎯

- Current Progress: 161/361 tokens (45%)
+ Current Progress: 241/361 tokens (67%)
```

#### 3. roadmap-implementation-v2.0.md mis à jour ✅

```diff
- **Statut:** 🟢 Phase 2 COMPLETED - 161 tokens créés (45%)
+ **Statut:** 🟢 Phase 3 COMPLETED - 241 tokens créés (67%)

- ## ⏳ Phase 3: Semantic Tokens - **NEXT** 🎯
+ ## ✅ Phase 3: Semantic Tokens - **COMPLETED**

- ## 📋 Phase 4: Component Tokens - **FUTURE**
+ ## ⏳ Phase 4: Component Tokens - **NEXT** 🎯
```

#### 4. Vérification croisée ✅

- [x] Dates identiques
- [x] Token count: 241/361 (67%) dans les deux
- [x] Phase 3: ✅ COMPLETE dans les deux
- [x] Phase 4: ⏳ NEXT dans les deux

#### 5. Git commit ✅

```bash
git commit -m "docs: update Phase 3 completion status

- Phase 3 completed: 80 semantic tokens created
- Total: 241/361 tokens (67%)
- Updated MASTER-STATUS and roadmap
- Added phase-3-completion-summary.md"
```

---

## 🤖 Alternative: Script d'Aide (Optionnel)

Si tu veux automatiser partiellement, je peux créer un script qui:

- Te demande les infos (phase number, token count, date)
- Génère un template pré-rempli à copier-coller
- Affiche la checklist avec les sections spécifiques à mettre à jour

**Veux-tu ce script?**

---

## 💡 Recommandation

**Approche Hybride:**

1. **Utilise cette checklist** après chaque phase
2. **Imprime-la** ou garde-la ouverte pendant la mise à jour
3. **Demande à l'AI (moi) de vérifier** après mise à jour:
   ```
   "J'ai terminé Phase 3, peux-tu vérifier que MASTER-STATUS
   et roadmap sont bien à jour et cohérents?"
   ```

---

## 📌 Raccourci: Commande Rapide pour Toi

Après chaque phase, demande-moi simplement:

```
"Phase X complétée avec [count] tokens.
Mets à jour MASTER-STATUS et roadmap."
```

Et je le ferai en suivant cette checklist! 😊

---

**Checklist Créée:** 2026-01-23  
**Auteur:** Mary (AI Business Analyst)  
**Usage:** Après complétion de chaque phase (1-8)  
**Statut:** 🟢 Active - Prête à utiliser
