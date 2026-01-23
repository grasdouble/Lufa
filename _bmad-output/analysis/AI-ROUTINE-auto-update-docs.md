# 🤖 AI Agent Routine: Mise à Jour Automatique Documentation

**Agent:** Mary (AI Business Analyst)  
**Type:** Routine automatique après complétion phase  
**Statut:** 🟢 Active

---

## 🎯 Objectif

**Mettre à jour automatiquement MASTER-STATUS.md et roadmap-implementation-v2.0.md** après chaque phase complétée, **sans que Noofreuuuh ait à le demander**.

---

## 📋 Routine Automatique

### Déclencheur

Quand **je complète une phase** avec Noofreuuuh:

- Phase de tokens terminée (Phase 1, 2, 3, 4)
- Phase de composants terminée (Phase 5, 6)
- Phase tooling terminée (Phase 7, 8)

### Actions Automatiques à Exécuter

#### 1️⃣ Créer le Phase Summary

```
✅ Sans qu'on me le demande, je dois:
- Créer phase-X-completion-summary.md dans le bon dossier
- Inclure: date, durée, tokens, livrables, résultats, prochaine étape
- Localisation: _bmad-output/analysis/ (pour toutes les phases)
```

#### 2️⃣ Mettre à Jour MASTER-STATUS.md

```
✅ Sans qu'on me le demande, je dois:
- Calculer nouveau total tokens (ancien + nouveaux)
- Calculer nouveau pourcentage (total/361)
- Mettre à jour Executive Summary (progress bars)
- Mettre à jour Phase Status Table (ajouter ligne)
- Mettre à jour section phase complétée (✅ COMPLETE)
- Mettre à jour section phase suivante (⏳ NEXT 🎯)
- Mettre à jour Metrics & Progress (progress bars)
- Mettre à jour footer (date, next phase, token count)
```

#### 3️⃣ Mettre à Jour roadmap-implementation-v2.0.md

```
✅ Sans qu'on me le demande, je dois:
- Mettre à jour header (date, statut, token count, %)
- Mettre à jour Vue d'Ensemble (progress bars, table phases)
- Mettre à jour section phase complétée (✅ COMPLETE + résultats)
- Mettre à jour section phase suivante (⏳ NEXT 🎯)
- Mettre à jour footer (date, statut, token progress, actions)
```

#### 4️⃣ Vérifier la Cohérence

```
✅ Sans qu'on me le demande, je dois vérifier:
- Token count identique dans les 2 docs
- Pourcentage identique dans les 2 docs
- Date mise à jour identique dans les 2 docs
- Statut phase complétée identique (✅ COMPLETE)
- Statut phase suivante identique (⏳ NEXT)
```

#### 5️⃣ Informer Noofreuuuh

```
✅ Après mise à jour, je dois lui dire:
"✅ Documentation mise à jour automatiquement:
- Phase X complétée: [résumé]
- [count] tokens créés
- Total: [new_total]/361 ([percentage]%)
- MASTER-STATUS.md ✅
- roadmap-implementation-v2.0.md ✅
- phase-X-completion-summary.md ✅

Vérification: Cohérence confirmée entre les 2 docs.

Tu peux commit:
git add _bmad-output/analysis/MASTER-STATUS.md
git add _bmad-output/analysis/roadmap-implementation-v2.0.md
git add [path-to-summary]
git commit -m 'docs: update Phase X completion status

- Phase X completed: [description]
- [count] tokens created
- Updated MASTER-STATUS and roadmap'"
```

---

## 🔄 Workflow Automatique

```
Phase X terminée
    ↓
[AUTOMATIQUE - Je le fais sans demande]
    ↓
1. Créer phase-X-completion-summary.md
2. Calculer métriques (nouveau total, %)
3. Mettre à jour MASTER-STATUS.md
4. Mettre à jour roadmap-implementation-v2.0.md
5. Vérifier cohérence entre les 2 docs
    ↓
6. Informer Noofreuuuh avec:
   - Résumé des mises à jour
   - Vérification cohérence
   - Commande git prête
    ↓
[Noofreuuuh review + git commit]
```

---

## 📊 Checklist Interne (Pour Moi)

Après chaque phase, je dois vérifier mentalement:

### Phase Summary

- [ ] Fichier créé dans le bon dossier
- [ ] Date de complétion
- [ ] Durée réelle vs estimée
- [ ] Token count (si applicable)
- [ ] Livrables listés
- [ ] Problèmes & solutions documentés
- [ ] Prochaine étape claire

### MASTER-STATUS.md

- [ ] Executive Summary - Progress bar mis à jour
- [ ] Executive Summary - "What's Next" mis à jour
- [ ] Phase Status Table - Ligne ajoutée
- [ ] Section phase complétée - Statut ✅ COMPLETE
- [ ] Section phase complétée - Date, durée, résultats ajoutés
- [ ] Section phase complétée - Lien vers summary
- [ ] Section phase suivante - Statut ⏳ NEXT 🎯
- [ ] Metrics & Progress - Progress bars mis à jour
- [ ] Footer - Date mise à jour
- [ ] Footer - Token count mis à jour

### roadmap-implementation-v2.0.md

- [ ] Header - Date mise à jour
- [ ] Header - Statut mis à jour (token count, %)
- [ ] Vue d'Ensemble - Progress bars ASCII mis à jour
- [ ] Vue d'Ensemble - Table phases mise à jour
- [ ] Vue d'Ensemble - "Prochaine Étape" mise à jour
- [ ] Section phase complétée - Titre ✅ COMPLETE
- [ ] Section phase complétée - Résultats Phase X ajoutés
- [ ] Section phase complétée - Toutes tasks cochées [x]
- [ ] Section phase complétée - Livrables listés
- [ ] Section phase complétée - Lien vers summary
- [ ] Section phase suivante - Statut ⏳ NEXT 🎯
- [ ] Footer - Date mise à jour
- [ ] Footer - Statut mis à jour
- [ ] Footer - Token Progress mis à jour

### Vérification Cohérence

- [ ] Token count identique: `grep "tokens créés\|Token Progress" [files]`
- [ ] Pourcentage identique
- [ ] Date identique: `grep "mise à jour:\|Last Updated:" [files]`
- [ ] Phase complétée = ✅ COMPLETE dans les 2
- [ ] Phase suivante = ⏳ NEXT dans les 2

---

## 🎯 Exemple Concret: Phase 3 Terminée

### Situation

```
Phase 3: Semantic Tokens vient d'être terminée
- 80 tokens créés
- Date: 2026-01-25
- Durée: 2 jours
```

### Ce que je fais AUTOMATIQUEMENT

#### Étape 1: Calculs

```javascript
ancien_total = 161
nouveaux = 80
nouveau_total = 161 + 80 = 241
pourcentage = (241 / 361) * 100 = 67%
```

#### Étape 2: Créer Summary

```bash
# Je crée:
_bmad-output/analysis/phase-3-completion-summary.md

# Contenu:
- Date: 2026-01-25
- Durée: 2 jours
- 80 tokens (5 catégories)
- Résultats, livrables, etc.
```

#### Étape 3: Mettre à Jour MASTER-STATUS.md

```diff
- ⏳ Phase 3: Semantic Tokens (~80)   - 0% NEXT
+ ✅ Phase 3: Semantic Tokens (80)    - 100% COMPLETE

- Current Progress: 161/361 tokens (45%)
+ Current Progress: 241/361 tokens (67%)

+ | Phase 3 | ✅ Complete | 80 | 2 days | 2026-01-25 | `phase-3-completion-summary.md` |

- Last Updated: 2026-01-23
+ Last Updated: 2026-01-25
```

#### Étape 4: Mettre à Jour roadmap-implementation-v2.0.md

```diff
- **Dernière mise à jour:** 2026-01-23
+ **Dernière mise à jour:** 2026-01-25

- **Statut:** Phase 2 COMPLETED - 161 tokens (45%)
+ **Statut:** Phase 3 COMPLETED - 241 tokens (67%)

- ## ⏳ Phase 3: Semantic Tokens - **NEXT** 🎯
+ ## ✅ Phase 3: Semantic Tokens - **COMPLETED**

+ **Date Completed:** 2026-01-25
+ **Durée réelle:** 2 jours
+ **Tokens créés:** 80 tokens
```

#### Étape 5: Informer Noofreuuuh

```
✅ Documentation mise à jour automatiquement:

Phase 3 complétée: Semantic Tokens
- 80 tokens créés (5 catégories)
- Total: 241/361 (67%)
- Durée: 2 jours

Fichiers mis à jour:
✅ phase-3-completion-summary.md créé
✅ MASTER-STATUS.md mis à jour
✅ roadmap-implementation-v2.0.md mis à jour

Vérification cohérence:
✅ Token count: 241/361 identique dans les 2 docs
✅ Pourcentage: 67% identique dans les 2 docs
✅ Date: 2026-01-25 identique dans les 2 docs
✅ Phase 3: ✅ COMPLETE dans les 2 docs
✅ Phase 4: ⏳ NEXT dans les 2 docs

Tu peux commit avec:
git add _bmad-output/analysis/MASTER-STATUS.md
git add _bmad-output/analysis/roadmap-implementation-v2.0.md
git add _bmad-output/analysis/phase-3-completion-summary.md
git commit -m "docs: update Phase 3 completion status

- Phase 3 completed: Semantic Tokens (80 tokens)
- Total: 241/361 tokens (67%)
- Updated MASTER-STATUS and roadmap
- Added phase-3-completion-summary.md"
```

---

## ⚠️ Cas Spéciaux

### Si je détecte une incohérence

```
🚨 ALERTE: Incohérence détectée!
- MASTER-STATUS: 241/361
- Roadmap: 240/361

Je corrige automatiquement et j'informe:
"⚠️ J'ai corrigé une incohérence (roadmap avait 240 au lieu de 241)"
```

### Si le token count est N/A (phases composants)

```
Phase 5 (Core Components) terminée
- Tokens: N/A (composants, pas tokens)
- Je mets à jour quand même les statuts
- Je n'ajoute pas au token count
```

### Si plusieurs phases terminées en une session

```
Phases 3 ET 4 terminées dans la même journée
- Je mets à jour pour les 2 phases
- Token count cumulé
- J'informe clairement: "2 phases mises à jour"
```

---

## 🎨 Format de Mon Message à Noofreuuuh

### Template Standard

```
✅ Documentation mise à jour automatiquement:

Phase [X] complétée: [Nom Phase]
- [count] tokens créés ([breakdown si applicable])
- Total: [new_total]/361 ([percentage]%)
- Durée: [durée réelle]

Fichiers mis à jour:
✅ phase-[X]-completion-summary.md créé
✅ MASTER-STATUS.md mis à jour
✅ roadmap-implementation-v2.0.md mis à jour

Vérification cohérence:
✅ Token count: [count]/361 identique
✅ Pourcentage: [%]% identique
✅ Date: [date] identique
✅ Phase [X]: ✅ COMPLETE (les 2 docs)
✅ Phase [X+1]: ⏳ NEXT (les 2 docs)

[Si problèmes détectés et corrigés]
⚠️ Corrections appliquées: [description]

Tu peux commit avec:
[commande git complète]
```

---

## 📝 Notes Importantes

### Ce que JE fais (automatiquement)

- ✅ Créer phase summary
- ✅ Mettre à jour MASTER-STATUS
- ✅ Mettre à jour roadmap
- ✅ Vérifier cohérence
- ✅ Calculer métriques
- ✅ Informer Noofreuuuh

### Ce que NOOFREUUUH fait (manuel)

- 📝 Review des mises à jour (optionnel)
- 💾 Git add + commit
- 🚀 Git push (si applicable)

### Pourquoi cette division?

- Je ne peux pas faire de git operations moi-même
- Noofreuuuh garde contrôle du versioning
- Mais toute la mise à jour de contenu est automatique

---

## 🔄 Activation de cette Routine

**Status:** 🟢 **ACTIVE dès maintenant**

À partir d'aujourd'hui (2026-01-23), quand une phase est terminée:

- ✅ Je mets à jour automatiquement les docs
- ✅ Je ne demande pas si je dois le faire
- ✅ Je l'annonce clairement après l'avoir fait
- ✅ Je fournis la commande git

**Noofreuuuh n'a plus besoin de me demander "mets à jour les docs"** - c'est devenu une routine automatique! 🎉

---

## 📊 Métriques de Succès de cette Routine

**Routine bien exécutée =**

- ✅ Docs mis à jour dans les 5 minutes après fin de phase
- ✅ 100% cohérence entre MASTER-STATUS et roadmap
- ✅ Phase summary créé avec tous détails
- ✅ Calculs corrects (token count, %)
- ✅ Noofreuuuh n'a eu qu'à faire git commit

**Indicateurs de problème:**

- ❌ Oubli de mettre à jour un des 2 docs
- ❌ Incohérences dans les chiffres
- ❌ Phase summary manquant ou incomplet
- ❌ Noofreuuuh doit me rappeler

---

## 🤝 Engagement

**Je m'engage à:**

1. ✅ Mettre à jour automatiquement après chaque phase
2. ✅ Vérifier la cohérence entre les 2 documents
3. ✅ Créer des phase summaries complets
4. ✅ Fournir commandes git prêtes à l'emploi
5. ✅ Informer clairement des mises à jour faites

**Noofreuuuh peut compter sur:**

- Documentation toujours à jour
- Cohérence garantie entre les docs
- Métriques toujours correctes
- Pas besoin de me le rappeler

---

**Routine Créée:** 2026-01-23  
**Agent Responsable:** Mary (AI Business Analyst)  
**Statut:** 🟢 Active et Opérationnelle  
**Prochaine Application:** Phase 3 (Semantic Tokens)

---

**Cette routine est maintenant intégrée dans mon workflow. Noofreuuuh n'a plus à s'en soucier!** 🚀
