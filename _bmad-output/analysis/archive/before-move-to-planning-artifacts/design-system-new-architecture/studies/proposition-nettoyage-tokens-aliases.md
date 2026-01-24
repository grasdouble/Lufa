# Proposition de Nettoyage des Tokens - Analyse Détaillée

**Date:** 2026-01-23  
**Question de Noofreuuuh:** "Tu peux préciser tu veux changer quoi par quoi ?"

---

## 📊 Situation Actuelle

### Tokens Créés (Session aujourd'hui)

| Fichier                           | Type       | Tokens | Statut      | Nécessaire ?                                   |
| --------------------------------- | ---------- | ------ | ----------- | ---------------------------------------------- |
| `primitives/motion/timing.json`   | Primitives | 8      | ✅ Build OK | ✅ **OUI** - N'existait pas                    |
| `semantic/layout/spacing.json`    | Sémantique | 5      | ✅ Build OK | ✅ **OUI** - N'existait pas                    |
| `semantic/layout/radius.json`     | Sémantique | 5      | ✅ Build OK | ✅ **OUI** - N'existait pas                    |
| `semantic/elevation/shadow.json`  | Sémantique | 4      | ✅ Build OK | ✅ **OUI** - N'existait pas                    |
| `semantic/motion/transition.json` | Sémantique | 4      | ✅ Build OK | ✅ **OUI** - N'existait pas                    |
| `semantic/ui/aliases.json`        | Alias      | 17     | ✅ Build OK | ⚠️ **REDONDANT** - Alias vers tokens ci-dessus |
| `semantic/aliases/shortcuts.json` | Alias      | 27     | ✅ Build OK | ⚠️ **REDONDANT** - Alias vers `semantic.ui.*`  |

**Total créé:** 70 tokens

---

## 🔍 Analyse Token par Token

### 1. Fichiers ESSENTIELS (26 tokens) ✅

Ces tokens **n'existaient pas avant** et sont **nécessaires** :

#### `primitives/motion/timing.json` (8 tokens)

```json
{
  "primitive.motion.duration.instant": "100ms",
  "primitive.motion.duration.fast": "150ms",
  "primitive.motion.duration.normal": "250ms",
  "primitive.motion.duration.slow": "400ms",
  "primitive.motion.easing.linear": "cubic-bezier(...)",
  "primitive.motion.easing.ease-in": "cubic-bezier(...)",
  "primitive.motion.easing.ease-out": "cubic-bezier(...)",
  "primitive.motion.easing.ease-in-out": "cubic-bezier(...)"
}
```

**Pourquoi nécessaire ?** Aucune primitive de timing n'existait. Base pour les transitions.

---

#### `semantic/layout/spacing.json` (5 tokens)

```json
{
  "semantic.spacing.tight": "{primitive.spacing.4}",
  "semantic.spacing.compact": "{primitive.spacing.8}",
  "semantic.spacing.default": "{primitive.spacing.16}",
  "semantic.spacing.comfortable": "{primitive.spacing.24}",
  "semantic.spacing.spacious": "{primitive.spacing.32}"
}
```

**Pourquoi nécessaire ?** Aucun token `semantic.spacing.*` n'existait. Nécessaire pour les composants.

---

#### `semantic/layout/radius.json` (5 tokens)

```json
{
  "semantic.radius.small": "{primitive.radius.scale.base}", // 4px
  "semantic.radius.default": "{primitive.radius.scale.lg}", // 8px
  "semantic.radius.medium": "{primitive.radius.scale.xl}", // 12px
  "semantic.radius.large": "16px",
  "semantic.radius.full": "{primitive.radius.scale.full}" // 9999px
}
```

**Pourquoi nécessaire ?** Aucun token `semantic.radius.*` n'existait.

---

#### `semantic/elevation/shadow.json` (4 tokens)

```json
{
  "semantic.shadow.small": "{primitive.shadow.elevation.sm}",
  "semantic.shadow.medium": "{primitive.shadow.elevation.base}",
  "semantic.shadow.large": "{primitive.shadow.elevation.lg}",
  "semantic.shadow.extra-large": "{primitive.shadow.elevation.xl}"
}
```

**Pourquoi nécessaire ?** Aucun token `semantic.shadow.*` n'existait.

---

#### `semantic/motion/transition.json` (4 tokens)

```json
{
  "semantic.transition.fast": "{primitive.motion.duration.fast}",
  "semantic.transition.normal": "{primitive.motion.duration.normal}",
  "semantic.transition.slow": "{primitive.motion.duration.slow}",
  "semantic.transition.timing-function": "{primitive.motion.easing.ease-in-out}"
}
```

**Pourquoi nécessaire ?** Aucun token `semantic.transition.*` n'existait.

---

### 2. Fichiers REDONDANTS (44 tokens) ⚠️

Ces tokens sont des **alias** qui pointent vers d'autres tokens.

#### `semantic/ui/aliases.json` (17 tokens) - REDONDANT

Ce fichier crée des alias `semantic.ui.*` qui pointent vers `semantic.spacing.*`, etc.

**Exemple:**

```json
{
  "semantic.ui.spacing-default": "{semantic.spacing.default}",
  "semantic.ui.radius-small": "{semantic.radius.small}",
  "semantic.ui.shadow-medium": "{semantic.shadow.medium}",
  "semantic.ui.transition-fast": "{semantic.transition.fast}"
  // ... 13 autres alias similaires
}
```

**Problème:** Ce sont juste des pointeurs. On peut **directement utiliser** `semantic.spacing.default` au lieu de créer un alias `semantic.ui.spacing-default`.

---

#### `semantic/aliases/shortcuts.json` (27 tokens) - REDONDANT

Ce fichier crée des alias `semantic.*` qui pointent vers `semantic.ui.*` existants.

**Exemple:**

```json
{
  "semantic.background.surface": "{semantic.ui.background-surface}",
  "semantic.text.primary": "{semantic.ui.text-primary}",
  "semantic.border.default": "{semantic.ui.border-default}"
  // ... 24 autres alias similaires
}
```

**Problème:** `semantic.ui.background-surface` EXISTE DÉJÀ dans `semantic/ui/context.json`. On crée juste un raccourci.

---

## 💡 Proposition de Nettoyage

### Option A : Supprimer les alias et corriger les références ⭐ RECOMMANDÉE

**Actions:**

1. **SUPPRIMER** les 2 fichiers d'alias (44 tokens redondants)
   - ❌ `semantic/ui/aliases.json`
   - ❌ `semantic/aliases/shortcuts.json`

2. **CORRIGER** les références dans les 7 fichiers de composants

**Exemples de corrections:**

| Composant       | Référence ACTUELLE              | Référence CORRIGÉE                 |
| --------------- | ------------------------------- | ---------------------------------- |
| **badge.json**  | `{semantic.background.surface}` | `{semantic.ui.background-surface}` |
| **badge.json**  | `{semantic.text.secondary}`     | `{semantic.ui.text-secondary}`     |
| **badge.json**  | `{semantic.border.default}`     | `{semantic.ui.border-default}`     |
| **badge.json**  | `{semantic.radius.full}`        | ✅ **OK** (token existe)           |
| **button.json** | `{semantic.spacing.compact}`    | ✅ **OK** (token existe)           |
| **button.json** | `{semantic.spacing.default}`    | ✅ **OK** (token existe)           |
| **card.json**   | `{semantic.ui.spacing-default}` | `{semantic.spacing.default}`       |
| **card.json**   | `{semantic.ui.radius-small}`    | `{semantic.radius.small}`          |
| **card.json**   | `{semantic.ui.shadow-medium}`   | `{semantic.shadow.medium}`         |

**Résultat:**

- ✅ Garde seulement les **26 tokens essentiels**
- ✅ Pas de duplication
- ✅ Architecture plus propre
- ⚡ Nécessite corrections dans 7 fichiers de composants

---

### Option B : Garder tout comme actuellement

**Actions:** Rien à faire

**Résultat:**

- ⚠️ 44 tokens redondants (alias)
- ⚠️ Duplication de références
- ✅ Build fonctionne
- ✅ Pas de corrections nécessaires

---

## 📋 Corrections Nécessaires (Option A)

Si on choisit **Option A**, voici les corrections à faire :

### Fichier 1: `component/badge/tokens.json`

```json
// AVANT
"default": {
  "background": { "$value": "{semantic.background.surface}" },
  "text": { "$value": "{semantic.text.secondary}" },
  "border": { "$value": "{semantic.border.default}" }
}

// APRÈS
"default": {
  "background": { "$value": "{semantic.ui.background-surface}" },
  "text": { "$value": "{semantic.ui.text-secondary}" },
  "border": { "$value": "{semantic.ui.border-default}" }
}
```

**15 corrections** dans badge.json (success, error, warning, info variants)

---

### Fichier 2: `component/input/tokens.json`

```json
// AVANT
"background": {
  "default": { "$value": "{semantic.background.surface}" }
}

// APRÈS
"background": {
  "default": { "$value": "{semantic.ui.background-surface}" }
}
```

**8 corrections** dans input.json

---

### Fichier 3: `component/card/tokens.json`

```json
// AVANT
"padding": {
  "sm": { "$value": "{semantic.ui.spacing-default}" }
}

// APRÈS
"padding": {
  "sm": { "$value": "{semantic.spacing.default}" }
}
```

**12 corrections** dans card.json

---

### Fichiers 4-7: modal, tooltip, button, shared

**~15 corrections** similaires

---

## 🎯 Recommandation

### Je recommande **Option A** : Nettoyer les alias

**Pourquoi ?**

1. ✅ **Architecture plus propre** - Pas de tokens redondants
2. ✅ **Plus facile à maintenir** - Une seule source de vérité
3. ✅ **Respecte le principe DRY** (Don't Repeat Yourself)
4. ⚡ **Effort raisonnable** - 50 corrections dans 7 fichiers (~30 minutes)

**Tokens finaux:**

- Primitives: 103 + 8 motion = **111 tokens**
- Core: **58 tokens**
- Semantic: 78 + 18 nouveaux = **96 tokens**
- Component: **166 tokens**
- **TOTAL: 431 tokens** (au lieu de 478 avec alias)

---

## ❓ Question pour toi

**Quelle option préfères-tu ?**

- **Option A** ⭐ - Supprimer les 44 alias et corriger les références (~30 min de travail)
- **Option B** - Garder tout comme maintenant (0 min de travail, mais 44 tokens redondants)

**Mon conseil :** Option A pour un code plus propre et maintenable.

Qu'en penses-tu ? 🤔
