# 📋 Phase 5 - Plan de Préparation (Actions Rapides)

**Date:** 2026-01-23  
**Durée estimée:** 3-4 heures  
**Objectif:** Améliorer l'architecture tokens avant d'implémenter les composants React

---

## 🎯 Vue d'Ensemble

Avant de démarrer l'implémentation des 7 composants React, on va faire 2 améliorations architecturales identifiées lors de la conformity review :

1. **Ajouter le pattern "on-X"** pour contraste WCAG garanti (1-2h)
2. **Migrer `metadata` → `$extensions.lufa`** pour conformité DTCG 100% (2-3h)

**Bénéfices:**

- ✅ Conformité DTCG passe de 95% → 100%
- ✅ Contraste WCAG AAA garanti pour composants
- ✅ DX améliorée (paires de couleurs évidentes)
- ✅ Architecture plus propre avant composants

---

## 📝 Action #1: Ajouter Pattern "on-X" (1-2 heures)

### Contexte

**Décision brainstorming:**  
Implémenter des paires de tokens garantissant un contraste WCAG AAA entre fond et texte.

**Pattern Material Design:**

```
background-primary + background-on-primary
background-error + background-on-error
```

**Problème actuel:**  
Dans les composants, on doit manuellement choisir la couleur de texte qui contraste avec le fond. Risque d'erreur a11y.

**Solution:**  
Créer des tokens `on-X` explicites qui garantissent AAA contrast avec leur paire.

---

### Tokens à Ajouter

**Fichier:** `packages/design-system/tokens/src/semantic/ui/context.json`

#### Paires à créer (6 paires = 12 nouveaux tokens)

| Background Token       | On-Token (Text/Icons)     | Valeur                    | Ratio Contraste |
| ---------------------- | ------------------------- | ------------------------- | --------------- |
| `background-primary`   | `background-on-primary`   | `#ffffff`                 | 7.5:1 (AAA)     |
| `background-secondary` | `background-on-secondary` | `#ffffff`                 | 7.5:1 (AAA)     |
| `background-success`   | `background-on-success`   | `{core.semantic.success}` | Référence       |
| `background-error`     | `background-on-error`     | `{core.semantic.error}`   | Référence       |
| `background-warning`   | `background-on-warning`   | `{core.semantic.warning}` | Référence       |
| `background-info`      | `background-on-info`      | `{core.semantic.info}`    | Référence       |

**Notes:**

- Primary/Secondary: Texte blanc sur fond coloré (boutons pleins)
- Success/Error/Warning/Info: Référence token sémantique (pour badges/alerts avec fond subtil)

---

### Structure JSON à Ajouter

```json
{
  "semantic": {
    "ui": {
      "background-on-primary": {
        "$value": "#ffffff",
        "$type": "color",
        "$description": "Text and icons on primary background - AAA contrast guaranteed with background-primary",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text/icons on primary buttons, primary badges",
          "pairedWith": "background-primary",
          "a11y": {
            "contrastRatio": {
              "onBlue600": 7.5
            },
            "wcagLevel": "AAA"
          }
        }
      },
      "background-on-secondary": {
        "$value": "#ffffff",
        "$type": "color",
        "$description": "Text and icons on secondary background - AAA contrast guaranteed with background-secondary",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text/icons on secondary buttons, secondary badges",
          "pairedWith": "background-secondary",
          "a11y": {
            "contrastRatio": {
              "onPurple500": 7.2
            },
            "wcagLevel": "AAA"
          }
        }
      },
      "background-on-success": {
        "$value": "{core.semantic.success}",
        "$type": "color",
        "$description": "Text and icons on success background - for use with background-success (subtle)",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text in success alerts, success badge text",
          "pairedWith": "background-success"
        }
      },
      "background-on-error": {
        "$value": "{core.semantic.error}",
        "$type": "color",
        "$description": "Text and icons on error background - for use with background-error (subtle)",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text in error alerts, error badge text",
          "pairedWith": "background-error"
        }
      },
      "background-on-warning": {
        "$value": "{core.semantic.warning}",
        "$type": "color",
        "$description": "Text and icons on warning background - for use with background-warning (subtle)",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text in warning alerts, warning badge text",
          "pairedWith": "background-warning"
        }
      },
      "background-on-info": {
        "$value": "{core.semantic.info}",
        "$type": "color",
        "$description": "Text and icons on info background - for use with background-info (subtle)",
        "metadata": {
          "level": "semantic",
          "category": "ui",
          "subcategory": "contrast",
          "useCase": "Text in info alerts, info badge text",
          "pairedWith": "background-info"
        }
      }
    }
  }
}
```

---

### Impact Composants

**Button (primary variant):**

```tsx
// AVANT (manuel)
<button style={{
  background: tokens.variant.buttonPrimaryBackground,
  color: '#ffffff' // ❌ Hard-codé
}}>

// APRÈS (pattern on-X)
<button style={{
  background: tokens.ui.backgroundPrimary,
  color: tokens.ui.backgroundOnPrimary // ✅ Contraste garanti
}}>
```

**Badge (success variant):**

```tsx
// AVANT
<span style={{
  background: tokens.ui.backgroundSuccess,
  color: tokens.semantic.success // ❌ Pas évident
}}>

// APRÈS
<span style={{
  background: tokens.ui.backgroundSuccess,
  color: tokens.ui.backgroundOnSuccess // ✅ Paire évidente
}}>
```

---

### Checklist Exécution

- [ ] Ouvrir `semantic/ui/context.json`
- [ ] Ajouter les 6 tokens `background-on-*` à la fin du fichier
- [ ] Vérifier syntaxe JSON (virgules, accolades)
- [ ] Sauvegarder le fichier
- [ ] Rebuild tokens: `pnpm ds:tokens:build`
- [ ] Vérifier 0 erreurs de build
- [ ] Vérifier CSS généré: `dist/tokens.css` contient `--lufa-semantic-ui-background-on-primary`
- [ ] Compter tokens: Attendu 432 + 6 = **438 tokens** (97 → 103 semantic)

---

## 📝 Action #2: Migrer `metadata` → `$extensions.lufa` (2-3 heures)

### Contexte

**Problème actuel:**  
On utilise `"metadata": { ... }` au lieu de `"$extensions": { "lufa": { ... } }`

**Standard DTCG:**  
Les extensions customs doivent utiliser `$extensions` avec un namespace.

```json
// ❌ NON-CONFORME DTCG
{
  "$value": "#2563eb",
  "$type": "color",
  "metadata": {
    "level": "primitive",
    "category": "color"
  }
}

// ✅ CONFORME DTCG 100%
{
  "$value": "#2563eb",
  "$type": "color",
  "$extensions": {
    "lufa": {
      "level": "primitive",
      "category": "color"
    }
  }
}
```

---

### Stratégie Migration

**Option choisie:** Script Node.js automatisé

**Raisons:**

- ✅ 432 tokens à migrer → Automation obligatoire
- ✅ Évite erreurs manuelles (syntaxe JSON)
- ✅ Réutilisable si besoin de rollback
- ✅ Peut valider structure avant/après

---

### Script de Migration

**Fichier:** `packages/design-system/tokens/scripts/migrate-metadata-to-extensions.js`

```javascript
#!/usr/bin/env node

/**
 * Migration Script: metadata → $extensions.lufa
 *
 * Migrates all token files from non-standard "metadata" field
 * to DTCG-compliant "$extensions.lufa" structure.
 *
 * Usage:
 *   node scripts/migrate-metadata-to-extensions.js
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const SRC_DIR = path.join(__dirname, '../src');
const DRY_RUN = process.argv.includes('--dry-run');

// Stats tracking
const stats = {
  filesProcessed: 0,
  tokensMigrated: 0,
  filesModified: 0,
  errors: [],
};

/**
 * Recursively migrate metadata → $extensions.lufa
 */
function migrateToken(obj) {
  let migrated = false;

  for (const key in obj) {
    if (key === 'metadata') {
      // Found metadata - migrate it
      obj['$extensions'] = obj['$extensions'] || {};
      obj['$extensions'].lufa = obj.metadata;
      delete obj.metadata;
      stats.tokensMigrated++;
      migrated = true;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recurse into nested objects
      const childMigrated = migrateToken(obj[key]);
      migrated = migrated || childMigrated;
    }
  }

  return migrated;
}

/**
 * Process a single JSON file
 */
function processFile(filePath) {
  try {
    stats.filesProcessed++;

    // Read file
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);

    // Migrate
    const modified = migrateToken(json);

    if (modified) {
      stats.filesModified++;

      if (DRY_RUN) {
        console.log(`[DRY RUN] Would modify: ${path.relative(SRC_DIR, filePath)}`);
      } else {
        // Write back with 2-space indent
        const newContent = JSON.stringify(json, null, 2) + '\n';
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`✅ Migrated: ${path.relative(SRC_DIR, filePath)}`);
      }
    }
  } catch (error) {
    stats.errors.push({ file: filePath, error: error.message });
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
async function main() {
  console.log('\n🔄 Starting metadata → $extensions.lufa migration...\n');

  if (DRY_RUN) {
    console.log('⚠️  DRY RUN MODE - No files will be modified\n');
  }

  // Find all JSON token files
  const files = await glob('**/*.json', {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  console.log(`📂 Found ${files.length} token files\n`);

  // Process each file
  for (const file of files) {
    processFile(file);
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Migration Summary:');
  console.log('='.repeat(60));
  console.log(`Files processed:  ${stats.filesProcessed}`);
  console.log(`Files modified:   ${stats.filesModified}`);
  console.log(`Tokens migrated:  ${stats.tokensMigrated}`);
  console.log(`Errors:           ${stats.errors.length}`);

  if (stats.errors.length > 0) {
    console.log('\n❌ Errors encountered:');
    stats.errors.forEach(({ file, error }) => {
      console.log(`  - ${path.relative(SRC_DIR, file)}: ${error}`);
    });
    process.exit(1);
  }

  if (DRY_RUN) {
    console.log('\n⚠️  DRY RUN completed - Run without --dry-run to apply changes');
  } else {
    console.log('\n✅ Migration completed successfully!');
  }
}

main().catch(console.error);
```

---

### Checklist Exécution

#### Préparation

- [ ] Créer le fichier script: `scripts/migrate-metadata-to-extensions.js`
- [ ] Vérifier que `glob` est installé: `pnpm add -D glob` (dans tokens package)
- [ ] Rendre le script exécutable: `chmod +x scripts/migrate-metadata-to-extensions.js`

#### Test Dry Run

- [ ] Lancer dry run: `node scripts/migrate-metadata-to-extensions.js --dry-run`
- [ ] Vérifier output: Attendu ~32 fichiers modifiés, 432 tokens migrés
- [ ] Vérifier aucune erreur

#### Backup

- [ ] Créer commit git: `git add . && git commit -m "chore(tokens): backup before metadata migration"`
- [ ] Ou créer backup manuel: `cp -r src src.backup`

#### Exécution Migration

- [ ] Lancer migration réelle: `node scripts/migrate-metadata-to-extensions.js`
- [ ] Vérifier output: "✅ Migration completed successfully!"
- [ ] Vérifier stats: 432 tokens migrés

#### Validation Post-Migration

- [ ] Rebuild tokens: `pnpm ds:tokens:build`
- [ ] Vérifier 0 erreurs de build
- [ ] Vérifier CSS généré identique: `diff dist/tokens.css dist/tokens.css.backup` (si backup créé)
- [ ] Vérifier TypeScript généré identique
- [ ] Lancer validation: `pnpm ds:tokens:validate` (si script existe)

#### Vérification Manuelle

- [ ] Ouvrir 3-4 fichiers tokens aléatoires
- [ ] Vérifier structure `$extensions.lufa` présente
- [ ] Vérifier `metadata` n'existe plus
- [ ] Vérifier syntaxe JSON correcte (pas de virgules trailing)

#### Git Commit

- [ ] Stage changes: `git add packages/design-system/tokens/src`
- [ ] Commit: `git commit -m "refactor(tokens): migrate metadata to DTCG $extensions.lufa"`
- [ ] Vérifier diff git (devrait voir metadata → $extensions.lufa partout)

---

### Rollback Plan

**Si problème détecté:**

```bash
# Option 1: Git reset (si commit créé avant)
git reset --hard HEAD~1

# Option 2: Restore backup manuel
rm -rf src
mv src.backup src

# Option 3: Re-run migration inverse (créer script inverse si besoin)
```

---

## 🎯 Validation Finale (Après les 2 Actions)

### Build Complet

```bash
cd packages/design-system/tokens
pnpm build
```

**Attendu:**

- ✅ 0 erreurs
- ✅ 438 tokens (432 + 6 nouveaux `on-X`)
- ✅ ~440 CSS variables générées
- ✅ Structure `$extensions.lufa` dans tous les tokens

### Vérifications Manuelles

**1. Pattern on-X fonctionne:**

```bash
grep "background-on-primary" dist/tokens.css
# Attendu: --lufa-semantic-ui-background-on-primary: #ffffff;
```

**2. Metadata migré:**

```bash
grep -r "\"metadata\"" src/
# Attendu: Aucun résultat (sauf dans descriptions)

grep -r "\$extensions" src/ | head -5
# Attendu: Résultats trouvés dans tous les fichiers
```

**3. Build référence correcte:**

```typescript
// dist/tokens.ts devrait avoir:
export const tokens = {
  ui: {
    backgroundPrimary: 'var(--lufa-semantic-ui-background-primary)',
    backgroundOnPrimary: 'var(--lufa-semantic-ui-background-on-primary)', // 🆕
  },
};
```

---

## 📊 Métriques Attendues

| Métrique                | Avant  | Après  | Delta |
| ----------------------- | ------ | ------ | ----- |
| Tokens totaux           | 432    | 438    | +6    |
| Semantic tokens         | 97     | 103    | +6    |
| CSS variables           | 434    | 440    | +6    |
| Conformité DTCG         | 95%    | 100%   | +5%   |
| Pattern on-X implémenté | ❌ Non | ✅ Oui | ✅    |
| Build errors            | 0      | 0      | 0     |

---

## 🚀 Prochaine Étape Après Validation

**Phase 5A: Implémentation Composants React (1-2 semaines)**

Une fois ces 2 actions complétées et validées, on démarre l'implémentation des 7 composants:

**Core (4):**

1. Box - Container primitif
2. Text - Typographie sémantique
3. Stack - Layout vertical/horizontal
4. Icon - Wrapper SVG uniforme

**UI (3):** 5. Button - Composant interactif (utilise pattern on-X ! ✅) 6. Badge - Indicateur status (utilise pattern on-X ! ✅) 7. Divider - Séparateur visuel

---

## 💬 Questions Fréquentes

### Q: Pourquoi 6 tokens on-X et pas plus ?

**R:** On suit le principe "Just Enough Design". Les 6 paires couvrent:

- Actions primaires/secondaires (buttons)
- Feedback states (success, error, warning, info)

Si besoin d'autres paires (ex: `on-surface`), on les ajoutera en Phase 6 quand le besoin sera identifié.

### Q: Pourquoi migrer metadata maintenant ?

**R:** Meilleur timing:

- ✅ Tokens architecture complète (432 tokens)
- ✅ Avant composants (évite re-migration)
- ✅ Atteint 100% conformité DTCG
- ✅ Future-proof pour tooling Phase 7

### Q: Risque de breaking changes ?

**R:** Aucun risque:

- ✅ Metadata = métadonnées internes (pas utilisées par composants)
- ✅ CSS généré identique (validation post-migration)
- ✅ TypeScript généré identique
- ✅ Composants n'importent pas metadata directement

### Q: Durée réelle vs estimée ?

**R:** Estimation conservatrice:

- Pattern on-X: 30-45 min réel (simple ajout JSON)
- Migration metadata: 1-1.5h réel (script + validation)
- **Total réel attendu: 2-2.5h** (vs 3-4h estimé)

---

**Document créé:** 2026-01-23  
**Status:** 🟢 Ready for Execution  
**Prochaine mise à jour:** Après exécution des 2 actions
