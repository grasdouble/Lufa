# 📚 Système de Maintenance Documentation

Ce dossier contient les outils et processus pour maintenir la documentation du projet à jour.

---

## 🎯 Objectif

Garantir que **MASTER-STATUS.md** et **roadmap-implementation-v2.0.md** restent **synchronisés** et **à jour** après chaque phase complétée.

---

## 🛠️ Outils Disponibles

### 1. ✅ CHECKLIST-update-documentation.md

**Type:** Checklist manuelle  
**Usage:** Guide étape par étape pour mettre à jour la documentation

**Quand l'utiliser:**

- Après avoir complété une phase
- Pour garantir que rien n'est oublié
- Pour vérifier la cohérence entre les documents

**Comment l'utiliser:**

```bash
# Ouvrir la checklist
open _bmad-output/analysis/CHECKLIST-update-documentation.md

# Suivre les étapes une par une
# Cocher [x] au fur et à mesure
```

---

### 2. 🤖 scripts/update-docs-after-phase.sh

**Type:** Script interactif bash  
**Usage:** Génère des snippets pré-remplis pour mise à jour rapide

**Quand l'utiliser:**

- Après avoir complété une phase
- Pour gagner du temps (calculs automatiques)
- Pour éviter les erreurs de calcul

**Comment l'utiliser:**

```bash
# Lancer le script
bash scripts/update-docs-after-phase.sh

# Répondre aux questions:
# - Numéro de phase: 3
# - Nom: Semantic Tokens
# - Tokens créés: 80
# - Durée: 2 jours
# - Date: 2026-01-25

# Le script génère:
# ✅ Snippets pré-remplis à copier-coller
# ✅ Calculs automatiques (241/361 = 67%)
# ✅ Checklist personnalisée
# ✅ Message git commit
```

**Output du script:**

- Snippets markdown formatés
- Métriques calculées automatiquement
- Checklist spécifique à la phase
- Commande git commit prête à l'emploi

---

### 3. 🤖 Assistance AI (Mary)

**Type:** Agent AI  
**Usage:** Demander à l'AI de faire la mise à jour

**Quand l'utiliser:**

- Pour déléguer complètement la mise à jour
- Pour une vérification après mise à jour manuelle
- Pour corriger des incohérences détectées

**Comment l'utiliser:**

```
"Phase 3 complétée avec 80 tokens créés le 2026-01-25.
Mets à jour MASTER-STATUS et roadmap."
```

**L'AI va:**

- ✅ Mettre à jour les deux documents
- ✅ Calculer les métriques
- ✅ Vérifier la cohérence
- ✅ Créer le phase summary si besoin

---

## 🔄 Workflow Recommandé

### Approche 1: Manuel avec Checklist (Contrôle Total)

```
Phase complétée
    ↓
Ouvrir CHECKLIST-update-documentation.md
    ↓
Suivre les 5 étapes
    ↓
Cocher au fur et à mesure
    ↓
Vérification croisée
    ↓
Git commit
```

**Avantages:** Contrôle total, apprentissage du processus  
**Temps:** ~15-20 minutes

---

### Approche 2: Script + Copier-Coller (Rapide)

```
Phase complétée
    ↓
Lancer update-docs-after-phase.sh
    ↓
Répondre aux questions
    ↓
Copier-coller les snippets générés
    ↓
Vérification rapide
    ↓
Git commit (commande fournie)
```

**Avantages:** Rapide, moins d'erreurs de calcul  
**Temps:** ~5-10 minutes

---

### Approche 3: Délégation AI (Automatisé)

```
Phase complétée
    ↓
Demander à l'AI: "Phase X complétée avec Y tokens"
    ↓
AI met à jour tout
    ↓
Revue rapide des changements
    ↓
Git commit
```

**Avantages:** Très rapide, zéro effort  
**Temps:** ~2-3 minutes

---

## 📋 Checklist Rapide (Mémo)

Après chaque phase, vérifier que ces **4 documents** sont à jour:

| Document                  | Ce qui doit être mis à jour                        |
| ------------------------- | -------------------------------------------------- |
| 1. **phase-X-summary.md** | Créé avec résultats détaillés                      |
| 2. **MASTER-STATUS.md**   | Progress bar, table phases, section phase, metrics |
| 3. **roadmap-v2.0.md**    | Header, vue ensemble, section phase, footer        |
| 4. **Git commit**         | Message clair avec métriques                       |

---

## 🔍 Vérifications Critiques

Ces valeurs **DOIVENT être identiques** dans MASTER-STATUS et Roadmap:

- ✅ **Total tokens:** [count]/361
- ✅ **Pourcentage:** XX%
- ✅ **Date mise à jour:** YYYY-MM-DD
- ✅ **Phase complétée:** ✅ COMPLETE
- ✅ **Phase suivante:** ⏳ NEXT
- ✅ **Confidence:** 99%

**Comment vérifier:**

```bash
# Voir les token counts dans les deux docs
grep "tokens créés\|Token Progress\|Current Progress" \
  _bmad-output/analysis/MASTER-STATUS.md \
  _bmad-output/analysis/roadmap-implementation-v2.0.md

# Voir les dates de mise à jour
grep "mise à jour:\|Last Updated:" \
  _bmad-output/analysis/MASTER-STATUS.md \
  _bmad-output/analysis/roadmap-implementation-v2.0.md
```

---

## ❓ FAQ

### Q: J'ai oublié de mettre à jour après Phase X, que faire?

**R:** Pas de panique! Suis la checklist en rétrospectif ou demande à l'AI:

```
"Phase X a été complétée le [date] avec [count] tokens.
J'ai oublié de mettre à jour les docs. Peux-tu le faire maintenant?"
```

### Q: Les deux documents ont des token counts différents, pourquoi?

**R:** Quelqu'un a mis à jour un seul document. Utilise la checklist "Vérification Croisée" pour identifier les différences et corriger.

### Q: Le script ne trouve pas le token count actuel?

**R:** Le script cherche la ligne "Current Progress: XXX" dans MASTER-STATUS.md. Si la syntaxe a changé, il utilise 161 par défaut. Tu peux éditer le script ou entrer manuellement.

### Q: Puis-je automatiser complètement?

**R:** Partiellement. Le script génère les snippets, mais tu dois les copier-coller manuellement. Une automation complète nécessiterait un script plus complexe qui parse et modifie les Markdown.

### Q: Et si je change de structure de documentation?

**R:** Mets à jour la checklist et le script en conséquence. La checklist est ton "contrat" de maintenance.

---

## 🎓 Exemple Complet: Mise à Jour Phase 3

### Contexte

- Phase 3 (Semantic Tokens) complétée
- 80 tokens créés
- Date: 2026-01-25
- Durée: 2 jours

### Étape 1: Lancer le Script

```bash
$ bash scripts/update-docs-after-phase.sh

Numéro de phase: 3
Nom: Semantic Tokens
Tokens créés: 80
Durée: 2 jours
Date: 2026-01-25

✅ Nouveau total: 241/361 (67%)
```

### Étape 2: Copier les Snippets Générés

Le script affiche 5 snippets pré-remplis → copier-coller dans les docs.

### Étape 3: Vérifier

```bash
# Token count identique?
grep "241/361" _bmad-output/analysis/MASTER-STATUS.md
grep "241/361" _bmad-output/analysis/roadmap-implementation-v2.0.md
# ✅ Les deux affichent 241/361

# Dates identiques?
grep "2026-01-25" _bmad-output/analysis/MASTER-STATUS.md
grep "2026-01-25" _bmad-output/analysis/roadmap-implementation-v2.0.md
# ✅ Les deux affichent 2026-01-25
```

### Étape 4: Git Commit

```bash
git add _bmad-output/analysis/MASTER-STATUS.md
git add _bmad-output/analysis/roadmap-implementation-v2.0.md
git add packages/design-system/tokens/docs/planning/phase-3-completion-summary.md

git commit -m "docs: update Phase 3 completion status

- Phase 3 completed: Semantic Tokens
- 80 tokens created
- Total: 241/361 tokens (67%)
- Updated MASTER-STATUS and roadmap
- Added phase-3-completion-summary.md"
```

### Résultat: ✅

- Documentation synchronisée
- Métriques cohérentes
- Historique git clair

---

## 📊 Métriques de Qualité

**Documentation bien maintenue = :**

- ✅ Token counts identiques dans MASTER-STATUS et Roadmap
- ✅ Dates de mise à jour récentes (<7 jours après phase complétée)
- ✅ Toutes les phases complétées ont un phase summary
- ✅ Aucune incohérence de statut (ex: Phase 3 "COMPLETE" dans un doc, "NEXT" dans l'autre)
- ✅ Git history montre des commits réguliers de mise à jour docs

**Indicateurs de documentation obsolète:**

- ❌ Différences de token count entre les deux docs
- ❌ Dates de mise à jour > 2 semaines
- ❌ Phase complétée sans phase summary
- ❌ Statuts incohérents entre les docs

---

## 🔄 Maintenance de ce Système

**Ce système de maintenance doit lui-même être maintenu!**

Mettre à jour ce README si:

- Tu changes la structure des documents
- Tu ajoutes de nouveaux outils
- Tu identifies des améliorations au processus
- Le script ne fonctionne plus

---

**Créé:** 2026-01-23  
**Auteur:** Mary (AI Business Analyst)  
**Statut:** 🟢 Active  
**Prochaine révision:** Après Phase 4 complétée
