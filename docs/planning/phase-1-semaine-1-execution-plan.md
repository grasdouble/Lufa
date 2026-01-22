# Phase 1 Semaine 1 - Plan d'Exécution : Tokens Primitifs

**Durée :** 3 jours (9-12 heures au total)  
**Livrable :** ~97 tokens primitifs (couleurs, espacements, typographie, ombres, bordures)  
**Package :** `@grasdouble/lufa_design-system-tokens`

---

## Checklist Pré-Exécution

Avant de commencer le Jour 1, assure-toi d'avoir :

- [ ] Outils Phase 0 installés (snippets VSCode, script validation, CI/CD)
- [ ] Node.js 24.9.0 actif (`node -v`)
- [ ] pnpm 10.26.x+ installé (`pnpm -v`)
- [ ] Arbre git propre (`git status`)
- [ ] Lu `docs/roadmap/v2.0-scope.md` (comprendre ce qui est dans le scope)

---

## Jour 1 : Setup + Couleurs + Polices (4-6 heures)

### Étape 1.1 : Créer la Structure du Package (30 min)

```bash
# Naviguer vers le package tokens
cd packages/design-system/tokens

# Créer la structure de répertoires
mkdir -p src/primitives/{color,spacing,typography,shadow,radius}
mkdir -p dist
mkdir -p docs

# Créer les fichiers d'entrée principaux
touch src/primitives/index.json
touch src/primitives/color/palette.json
touch src/primitives/typography/font-families.json
```

**Sortie attendue :**

```
packages/design-system/tokens/
├── src/
│   └── primitives/
│       ├── index.json
│       ├── color/
│       │   └── palette.json
│       ├── spacing/
│       ├── typography/
│       │   └── font-families.json
│       ├── shadow/
│       └── radius/
├── dist/
└── docs/
```

**Validation :** Lancer `ls -R src/` et vérifier que la structure correspond.

---

### Étape 1.2 : Installer et Configurer Style Dictionary (45 min)

```bash
# Installer Style Dictionary (depuis la racine du package tokens)
pnpm add -D style-dictionary@4.x

# Créer le fichier de configuration
touch style-dictionary.config.js
```

**Fichier :** `packages/design-system/tokens/style-dictionary.config.js`

```javascript
import StyleDictionary from 'style-dictionary';

export default {
  source: ['src/primitives/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true, // Préserve la cascade à 4 niveaux
          },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.ts',
          format: 'javascript/es6',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens-docs.json',
          format: 'json/nested',
        },
      ],
    },
  },
};
```

**Mettre à jour les scripts `package.json` :**

```json
{
  "scripts": {
    "build": "style-dictionary build",
    "build:watch": "style-dictionary build --watch",
    "validate": "node ../../../scripts/validate-token-metadata.js"
  }
}
```

**Validation :**

```bash
# Tester la configuration (devrait erreur - pas encore de tokens)
pnpm build

# Attendu : "No token files found" ou similaire - c'est OK
```

---

### Étape 1.3 : Créer la Palette de Couleurs (2.5 heures)

**Fichier :** `packages/design-system/tokens/src/primitives/color/palette.json`

```json
{
  "primitive": {
    "color": {
      "gray": {
        "50": {
          "$value": "#f9fafb",
          "$type": "color",
          "$description": "Gris le plus clair - arrière-plans, bordures subtiles",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-900", "gray-800", "gray-700"],
            "wcagAAA": ["gray-900"]
          }
        },
        "100": {
          "$value": "#f3f4f6",
          "$type": "color",
          "$description": "Gris très clair - états hover, arrière-plans désactivés",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-900", "gray-800", "gray-700"],
            "wcagAAA": ["gray-900", "gray-800"]
          }
        },
        "200": {
          "$value": "#e5e7eb",
          "$type": "color",
          "$description": "Gris clair - bordures, séparateurs",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-900", "gray-800", "gray-700"],
            "wcagAAA": ["gray-900", "gray-800"]
          }
        },
        "300": {
          "$value": "#d1d5db",
          "$type": "color",
          "$description": "Gris moyen-clair - éléments inactifs",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-900", "gray-800"],
            "wcagAAA": ["gray-900"]
          }
        },
        "400": {
          "$value": "#9ca3af",
          "$type": "color",
          "$description": "Gris moyen - placeholders, texte désactivé",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-900"],
            "wcagAAA": []
          }
        },
        "500": {
          "$value": "#6b7280",
          "$type": "color",
          "$description": "Gris de base - texte secondaire, icônes",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-50", "gray-100"],
            "wcagAAA": []
          }
        },
        "600": {
          "$value": "#4b5563",
          "$type": "color",
          "$description": "Gris foncé - texte principal, titres",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-50", "gray-100", "gray-200"],
            "wcagAAA": ["gray-50", "gray-100"]
          }
        },
        "700": {
          "$value": "#374151",
          "$type": "color",
          "$description": "Gris plus foncé - texte accentué",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-50", "gray-100", "gray-200"],
            "wcagAAA": ["gray-50", "gray-100", "gray-200"]
          }
        },
        "800": {
          "$value": "#1f2937",
          "$type": "color",
          "$description": "Gris très foncé - texte haut contraste",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-50", "gray-100", "gray-200"],
            "wcagAAA": ["gray-50", "gray-100", "gray-200"]
          }
        },
        "900": {
          "$value": "#111827",
          "$type": "color",
          "$description": "Gris le plus foncé - texte contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["gray-50", "gray-100", "gray-200", "gray-300"],
            "wcagAAA": ["gray-50", "gray-100", "gray-200", "gray-300"]
          }
        }
      },
      "blue": {
        "50": {
          "$value": "#eff6ff",
          "$type": "color",
          "$description": "Bleu le plus clair - arrière-plans info",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-900", "blue-800", "blue-700"],
            "wcagAAA": ["blue-900"]
          }
        },
        "100": {
          "$value": "#dbeafe",
          "$type": "color",
          "$description": "Bleu très clair - états hover info",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-900", "blue-800", "blue-700"],
            "wcagAAA": ["blue-900", "blue-800"]
          }
        },
        "200": {
          "$value": "#bfdbfe",
          "$type": "color",
          "$description": "Bleu clair - bordures info",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-900", "blue-800"],
            "wcagAAA": ["blue-900"]
          }
        },
        "300": {
          "$value": "#93c5fd",
          "$type": "color",
          "$description": "Bleu moyen-clair - éléments info désactivés",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-900"],
            "wcagAAA": []
          }
        },
        "400": {
          "$value": "#60a5fa",
          "$type": "color",
          "$description": "Bleu moyen - icônes info",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100"],
            "wcagAAA": []
          }
        },
        "500": {
          "$value": "#3b82f6",
          "$type": "color",
          "$description": "Bleu de base - marque primaire, liens",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100"],
            "wcagAAA": []
          }
        },
        "600": {
          "$value": "#2563eb",
          "$type": "color",
          "$description": "Bleu foncé - hover primaire",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100", "blue-200"],
            "wcagAAA": ["blue-50", "blue-100"]
          }
        },
        "700": {
          "$value": "#1d4ed8",
          "$type": "color",
          "$description": "Bleu plus foncé - active primaire",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100", "blue-200"],
            "wcagAAA": ["blue-50", "blue-100", "blue-200"]
          }
        },
        "800": {
          "$value": "#1e40af",
          "$type": "color",
          "$description": "Bleu très foncé - primaire haut contraste",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100", "blue-200"],
            "wcagAAA": ["blue-50", "blue-100", "blue-200"]
          }
        },
        "900": {
          "$value": "#1e3a8a",
          "$type": "color",
          "$description": "Bleu le plus foncé - primaire contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["blue-50", "blue-100", "blue-200", "blue-300"],
            "wcagAAA": ["blue-50", "blue-100", "blue-200"]
          }
        }
      },
      "red": {
        "50": {
          "$value": "#fef2f2",
          "$type": "color",
          "$description": "Rouge le plus clair - arrière-plans erreur",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["red-900", "red-800", "red-700"],
            "wcagAAA": ["red-900"]
          }
        },
        "500": {
          "$value": "#ef4444",
          "$type": "color",
          "$description": "Rouge de base - états erreur, actions destructives",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["red-50", "red-100"],
            "wcagAAA": []
          }
        },
        "900": {
          "$value": "#7f1d1d",
          "$type": "color",
          "$description": "Rouge le plus foncé - erreur contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["red-50", "red-100", "red-200", "red-300"],
            "wcagAAA": ["red-50", "red-100", "red-200"]
          }
        }
      },
      "green": {
        "50": {
          "$value": "#f0fdf4",
          "$type": "color",
          "$description": "Vert le plus clair - arrière-plans succès",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["green-900", "green-800", "green-700"],
            "wcagAAA": ["green-900"]
          }
        },
        "500": {
          "$value": "#22c55e",
          "$type": "color",
          "$description": "Vert de base - états succès, actions positives",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["green-50", "green-100"],
            "wcagAAA": []
          }
        },
        "900": {
          "$value": "#14532d",
          "$type": "color",
          "$description": "Vert le plus foncé - succès contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["green-50", "green-100", "green-200", "green-300"],
            "wcagAAA": ["green-50", "green-100", "green-200"]
          }
        }
      },
      "yellow": {
        "50": {
          "$value": "#fefce8",
          "$type": "color",
          "$description": "Jaune le plus clair - arrière-plans alerte",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["yellow-900", "yellow-800", "yellow-700"],
            "wcagAAA": ["yellow-900"]
          }
        },
        "500": {
          "$value": "#eab308",
          "$type": "color",
          "$description": "Jaune de base - états alerte, attention",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["yellow-900"],
            "wcagAAA": []
          }
        },
        "900": {
          "$value": "#713f12",
          "$type": "color",
          "$description": "Jaune le plus foncé - alerte contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["yellow-50", "yellow-100", "yellow-200", "yellow-300"],
            "wcagAAA": ["yellow-50", "yellow-100", "yellow-200"]
          }
        }
      },
      "purple": {
        "50": {
          "$value": "#faf5ff",
          "$type": "color",
          "$description": "Violet le plus clair - arrière-plans accent",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["purple-900", "purple-800", "purple-700"],
            "wcagAAA": ["purple-900"]
          }
        },
        "500": {
          "$value": "#a855f7",
          "$type": "color",
          "$description": "Violet de base - marque secondaire, accent",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["purple-50", "purple-100"],
            "wcagAAA": []
          }
        },
        "900": {
          "$value": "#581c87",
          "$type": "color",
          "$description": "Violet le plus foncé - accent contraste maximum",
          "metadata": {
            "level": "primitive",
            "category": "color",
            "wcagAALarge": ["purple-50", "purple-100", "purple-200", "purple-300"],
            "wcagAAA": ["purple-50", "purple-100", "purple-200"]
          }
        }
      }
    }
  }
}
```

**Note :** Pour économiser de l'espace ici, j'ai inclus seulement 3 nuances par couleur (50, 500, 900). Le document complet en anglais contient les 9 nuances complètes. Copie-les depuis le fichier anglais pour avoir les 54 couleurs complètes.

**Validation :**

```bash
# Builder les tokens
pnpm build

# Devrait générer :
# - dist/tokens.css (avec variables --lufa-primitive-color-*)
# - dist/tokens.ts (avec exports TypeScript)
# - dist/tokens-docs.json (JSON imbriqué)

# Valider les métadonnées
pnpm validate

# Attendu : "✅ Tous les 54 tokens couleur validés avec succès"
```

**Checkpoint Fin Jour 1 :**

- [ ] 54 tokens couleur créés (6 couleurs × 9 nuances)
- [ ] Style Dictionary configuré avec `outputReferences: true`
- [ ] Build génère 3 sorties (CSS, TS, JSON)
- [ ] Script validation passe

---

### Étape 1.4 : Créer les Familles de Polices (45 min)

**Fichier :** `packages/design-system/tokens/src/primitives/typography/font-families.json`

```json
{
  "primitive": {
    "typography": {
      "fontFamily": {
        "sans": {
          "$value": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
          "$type": "fontFamily",
          "$description": "Pile de polices sans-serif système - optimisée pour lisibilité, 0kb téléchargement",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "performance": "0kb téléchargement",
            "platforms": ["macOS", "Windows", "Linux", "iOS", "Android"]
          }
        },
        "mono": {
          "$value": "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace",
          "$type": "fontFamily",
          "$description": "Pile de polices monospace système - blocs de code, contenu technique",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "performance": "0kb téléchargement",
            "platforms": ["macOS", "Windows", "Linux", "iOS", "Android"]
          }
        }
      }
    }
  }
}
```

**Validation :**

```bash
# Rebuild
pnpm build

# Vérifier la sortie CSS
cat dist/tokens.css | grep "font-family"

# Attendu :
# --lufa-primitive-typography-font-family-sans: system-ui, ...;
# --lufa-primitive-typography-font-family-mono: ui-monospace, ...;

# Valider
pnpm validate

# Attendu : "✅ Tous les 56 tokens validés avec succès" (54 couleurs + 2 polices)
```

---

## Jour 2 : Espacements + Suite Typographique + Ombres (3-4 heures)

### Étape 2.1 : Créer l'Échelle d'Espacement (45 min)

**Fichier :** `packages/design-system/tokens/src/primitives/spacing/scale.json`

```json
{
  "primitive": {
    "spacing": {
      "0": {
        "$value": "0px",
        "$type": "dimension",
        "$description": "Espacement nul - reset/supprimer les écarts",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "reset margin/padding"
        }
      },
      "4": {
        "$value": "4px",
        "$type": "dimension",
        "$description": "Extra serré - écarts minimaux entre éléments liés",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "écart icône-texte, listes serrées"
        }
      },
      "8": {
        "$value": "8px",
        "$type": "dimension",
        "$description": "Serré - layouts compacts, espacement en ligne",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "padding bouton, écarts inline"
        }
      },
      "16": {
        "$value": "16px",
        "$type": "dimension",
        "$description": "Espacement de base - écarts composants standards",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "marges section, espacement composant"
        }
      },
      "24": {
        "$value": "24px",
        "$type": "dimension",
        "$description": "Spacieux - écarts plus larges entre sections",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "espacement section, écarts carte"
        }
      },
      "32": {
        "$value": "32px",
        "$type": "dimension",
        "$description": "Ample - espacement section majeure",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "sections page, padding grande carte"
        }
      },
      "48": {
        "$value": "48px",
        "$type": "dimension",
        "$description": "Très ample - écarts proéminents",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "en-têtes page, séparateurs majeurs"
        }
      },
      "64": {
        "$value": "64px",
        "$type": "dimension",
        "$description": "Large - grandes sections page",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "séparateurs section, sauts page"
        }
      },
      "96": {
        "$value": "96px",
        "$type": "dimension",
        "$description": "Maximum - valeur espacement la plus large",
        "metadata": {
          "level": "primitive",
          "category": "spacing",
          "useCase": "marges niveau page, sections hero"
        }
      }
    }
  }
}
```

**Note :** Échelle complète : 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96 (12 valeurs). J'ai inclus les principales ici.

**Validation :**

```bash
pnpm build && pnpm validate

# Attendu : "✅ Tous les 68 tokens validés avec succès" (56 + 12 espacement)
```

---

### Étape 2.2 : Créer la Suite Typographique (1.5 heures)

**Fichier :** `packages/design-system/tokens/src/primitives/typography/font-sizes.json`

```json
{
  "primitive": {
    "typography": {
      "fontSize": {
        "xs": {
          "$value": "12px",
          "$type": "dimension",
          "$description": "Extra petit - légendes, labels",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "minTouchTarget": "44px",
            "wcagLevel": "AA"
          }
        },
        "sm": {
          "$value": "14px",
          "$type": "dimension",
          "$description": "Petit - texte secondaire, labels UI",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "base": {
          "$value": "16px",
          "$type": "dimension",
          "$description": "Base - texte corps (minimum recommandé WCAG)",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "wcagRecommended": true
          }
        },
        "lg": {
          "$value": "18px",
          "$type": "dimension",
          "$description": "Grand - texte corps accentué",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "2xl": {
          "$value": "24px",
          "$type": "dimension",
          "$description": "Titres niveau H4",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "5xl": {
          "$value": "48px",
          "$type": "dimension",
          "$description": "Titres niveau H1",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        }
      }
    }
  }
}
```

**Tailles complètes :** xs (12px), sm (14px), base (16px), lg (18px), xl (20px), 2xl (24px), 3xl (30px), 4xl (36px), 5xl (48px) = 9 tailles

**Fichier :** `packages/design-system/tokens/src/primitives/typography/font-weights.json`

```json
{
  "primitive": {
    "typography": {
      "fontWeight": {
        "normal": {
          "$value": "400",
          "$type": "fontWeight",
          "$description": "Normal - texte corps",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "medium": {
          "$value": "500",
          "$type": "fontWeight",
          "$description": "Moyen - texte accentué",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "semibold": {
          "$value": "600",
          "$type": "fontWeight",
          "$description": "Demi-gras - sous-titres, boutons",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        },
        "bold": {
          "$value": "700",
          "$type": "fontWeight",
          "$description": "Gras - titres, haute emphase",
          "metadata": {
            "level": "primitive",
            "category": "typography"
          }
        }
      }
    }
  }
}
```

**Fichier :** `packages/design-system/tokens/src/primitives/typography/line-heights.json`

```json
{
  "primitive": {
    "typography": {
      "lineHeight": {
        "tight": {
          "$value": "1.25",
          "$type": "number",
          "$description": "Serré - titres (20% au-dessus taille police)",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "useCase": "titres, labels UI"
          }
        },
        "normal": {
          "$value": "1.5",
          "$type": "number",
          "$description": "Normal - texte corps (recommandé WCAG)",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "wcagRecommended": true,
            "useCase": "texte corps, paragraphes"
          }
        },
        "relaxed": {
          "$value": "1.75",
          "$type": "number",
          "$description": "Relâché - contenu long format (75% au-dessus taille police)",
          "metadata": {
            "level": "primitive",
            "category": "typography",
            "useCase": "articles, documentation"
          }
        }
      }
    }
  }
}
```

**Validation :**

```bash
pnpm build && pnpm validate

# Attendu : "✅ Tous les 84 tokens validés avec succès" (68 + 9 fontSize + 4 fontWeight + 3 lineHeight)
```

---

### Étape 2.3 : Créer l'Échelle d'Ombres (45 min)

**Fichier :** `packages/design-system/tokens/src/primitives/shadow/elevation.json`

```json
{
  "primitive": {
    "shadow": {
      "none": {
        "$value": "none",
        "$type": "shadow",
        "$description": "Pas d'ombre - éléments plats",
        "metadata": {
          "level": "primitive",
          "category": "shadow",
          "elevation": 0
        }
      },
      "sm": {
        "$value": {
          "offsetX": "0px",
          "offsetY": "1px",
          "blur": "2px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.05)"
        },
        "$type": "shadow",
        "$description": "Petite ombre - profondeur subtile, états hover",
        "metadata": {
          "level": "primitive",
          "category": "shadow",
          "elevation": 1,
          "useCase": "cartes, boutons (hover)"
        }
      },
      "base": {
        "$value": {
          "offsetX": "0px",
          "offsetY": "2px",
          "blur": "4px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.1)"
        },
        "$type": "shadow",
        "$description": "Ombre base - élévation standard",
        "metadata": {
          "level": "primitive",
          "category": "shadow",
          "elevation": 2,
          "useCase": "cartes, dropdowns"
        }
      },
      "lg": {
        "$value": {
          "offsetX": "0px",
          "offsetY": "8px",
          "blur": "16px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.15)"
        },
        "$type": "shadow",
        "$description": "Grande ombre - élévation proéminente",
        "metadata": {
          "level": "primitive",
          "category": "shadow",
          "elevation": 4,
          "useCase": "tiroirs, dialogues"
        }
      },
      "xl": {
        "$value": {
          "offsetX": "0px",
          "offsetY": "12px",
          "blur": "24px",
          "spread": "0px",
          "color": "rgba(0, 0, 0, 0.18)"
        },
        "$type": "shadow",
        "$description": "Très grande ombre - élévation maximale",
        "metadata": {
          "level": "primitive",
          "category": "shadow",
          "elevation": 5,
          "useCase": "overlays modal, tooltips"
        }
      }
    }
  }
}
```

**Échelle complète :** none, sm, base, md, lg, xl = 6 niveaux d'élévation

**Validation :**

```bash
pnpm build && pnpm validate

# Attendu : "✅ Tous les 90 tokens validés avec succès" (84 + 6 ombres)
```

**Checkpoint Fin Jour 2 :**

- [ ] 12 tokens espacement créés
- [ ] 16 tokens typographie créés (9 tailles + 4 poids + 3 hauteurs ligne)
- [ ] 6 tokens ombre créés
- [ ] Total : 90 tokens (54 couleurs + 2 polices + 12 espacements + 16 typo + 6 ombres)

---

## Jour 3 : Rayons + Build + Validation + Documentation (2 heures)

### Étape 3.1 : Créer l'Échelle de Rayons de Bordure (30 min)

**Fichier :** `packages/design-system/tokens/src/primitives/radius/scale.json`

```json
{
  "primitive": {
    "radius": {
      "none": {
        "$value": "0px",
        "$type": "dimension",
        "$description": "Pas d'arrondi - coins nets",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "éléments rectangulaires, tableaux"
        }
      },
      "sm": {
        "$value": "2px",
        "$type": "dimension",
        "$description": "Petit arrondi - courbes subtiles",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "badges, tags"
        }
      },
      "base": {
        "$value": "4px",
        "$type": "dimension",
        "$description": "Arrondi base - éléments UI standards",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "boutons, inputs, cartes"
        }
      },
      "md": {
        "$value": "6px",
        "$type": "dimension",
        "$description": "Arrondi moyen - courbes accentuées",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "cartes, modales"
        }
      },
      "lg": {
        "$value": "8px",
        "$type": "dimension",
        "$description": "Grand arrondi - courbes proéminentes",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "grandes cartes, panneaux"
        }
      },
      "xl": {
        "$value": "12px",
        "$type": "dimension",
        "$description": "Très grand arrondi - coins doux",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "sections hero, images"
        }
      },
      "full": {
        "$value": "9999px",
        "$type": "dimension",
        "$description": "Arrondi complet - cercles/pilules parfaits",
        "metadata": {
          "level": "primitive",
          "category": "radius",
          "useCase": "avatars, boutons circulaires, pilules"
        }
      }
    }
  }
}
```

**Validation :**

```bash
pnpm build && pnpm validate

# Attendu : "✅ Tous les 97 tokens validés avec succès" (90 + 7 rayons)
```

---

### Étape 3.2 : Créer le Fichier Index (15 min)

**Fichier :** `packages/design-system/tokens/src/primitives/index.json`

```json
{
  "$schema": "https://tr.designtokens.org/format/dtcg-2.0.json",
  "$description": "Lufa Design System v2.0 - Tokens Primitifs (Niveau 1)",
  "$version": "2.0.0",
  "$include": [
    "./color/palette.json",
    "./spacing/scale.json",
    "./typography/font-families.json",
    "./typography/font-sizes.json",
    "./typography/font-weights.json",
    "./typography/line-heights.json",
    "./shadow/elevation.json",
    "./radius/scale.json"
  ]
}
```

---

### Étape 3.3 : Build Final et Validation (30 min)

```bash
# Build propre
rm -rf dist/
pnpm build

# Valider tous les tokens
pnpm validate

# Sortie attendue :
# ✅ Tous les 97 tokens validés avec succès
# - 54 tokens couleur
# - 2 tokens famille police
# - 12 tokens espacement
# - 9 tokens taille police
# - 4 tokens poids police
# - 3 tokens hauteur ligne
# - 6 tokens ombre
# - 7 tokens rayon

# Vérifier les fichiers générés
ls -lh dist/

# Attendu :
# tokens.css (toutes les propriétés CSS custom)
# tokens.ts (exports TypeScript)
# tokens-docs.json (JSON imbriqué pour documentation)
```

**Checklist Validation :**

- [ ] `dist/tokens.css` contient les 97 propriétés CSS custom avec préfixe `--lufa-primitive-*`
- [ ] `dist/tokens.ts` exporte tous les tokens comme constantes TypeScript
- [ ] `dist/tokens-docs.json` contient structure JSON imbriquée
- [ ] Tous les tokens ont les champs `$value`, `$type`, `$description`, et `metadata`
- [ ] `outputReferences: true` préserve les références tokens en sortie
- [ ] Aucune erreur TypeScript lors de l'import de `dist/tokens.ts`
- [ ] Script validation passe avec 0 erreurs

---

### Étape 3.4 : Créer la Documentation (45 min)

**Fichier :** `packages/design-system/tokens/README.md`

````markdown
# Lufa Design System v2.0 - Tokens Primitifs

**Niveau :** 1 (Primitifs)  
**Statut :** ✅ Complet (97 tokens)  
**Package :** `@grasdouble/lufa_design-system-tokens`

## Vue d'Ensemble

Les tokens primitifs sont la fondation du Lufa Design System v2.0. Ils définissent des valeurs brutes, non-sémantiques qui servent de blocs de construction pour les tokens de niveau supérieur (Core, Sémantique, Composant).

**Total Tokens :** 97

| Catégorie       | Nombre | Description                             |
| --------------- | ------ | --------------------------------------- |
| Couleurs        | 54     | 6 couleurs × 9 nuances (style Tailwind) |
| Familles Police | 2      | Piles sans-serif et monospace           |
| Espacement      | 12     | Échelle base-4px (0-96px)               |
| Tailles Police  | 9      | xs (12px) à 5xl (48px)                  |
| Poids Police    | 4      | Normal à Gras (400-700)                 |
| Hauteurs Ligne  | 3      | Serré, Normal, Relâché (1.25-1.75)      |
| Ombres          | 6      | Aucune à XL (5 niveaux élévation)       |
| Rayons Bordure  | 7      | Aucun à Complet (0-9999px)              |

## Installation

```bash
pnpm add @grasdouble/lufa_design-system-tokens
```
````

## Utilisation

### CSS (Recommandé)

```css
@import '@grasdouble/lufa_design-system-tokens/dist/tokens.css';

.button {
  padding: var(--lufa-primitive-spacing-8) var(--lufa-primitive-spacing-16);
  font-size: var(--lufa-primitive-typography-font-size-base);
  font-weight: var(--lufa-primitive-typography-font-weight-semibold);
  border-radius: var(--lufa-primitive-radius-base);
  background-color: var(--lufa-primitive-color-blue-500);
  color: var(--lufa-primitive-color-gray-50);
  box-shadow: var(--lufa-primitive-shadow-sm);
}
```

### TypeScript/JavaScript

```typescript
import tokens from '@grasdouble/lufa_design-system-tokens/dist/tokens';

const buttonStyles = {
  padding: `${tokens.primitive.spacing[8]} ${tokens.primitive.spacing[16]}`,
  fontSize: tokens.primitive.typography.fontSize.base,
  fontWeight: tokens.primitive.typography.fontWeight.semibold,
  borderRadius: tokens.primitive.radius.base,
  backgroundColor: tokens.primitive.color.blue[500],
  color: tokens.primitive.color.gray[50],
  boxShadow: tokens.primitive.shadow.sm,
};
```

## Développement

```bash
# Builder les tokens
pnpm build

# Mode watch
pnpm build:watch

# Valider les métadonnées
pnpm validate
```

## Prochaines Étapes : Semaine 2 (Tokens Core)

Après avoir complété la Semaine 1, tu passeras à **Phase 1 Semaine 2 : Tokens Core (Niveau 2)**.

**Aperçu du travail Semaine 2 :**

- Mapper les couleurs primitives vers noms sémantiques de base (primary, secondary, neutral, success, error, warning, info)
- Créer des presets typographiques (heading1-6, body, caption)
- Définir noms sémantiques espacement (compact, default, comfortable, spacious)
- Référencer tokens primitifs avec syntaxe Style Dictionary `{primitive.color.blue.500}`
- Construire sur la fondation validée Semaine 1

**Timeline estimée :** 2-3 jours après complétion Semaine 1

## Licence

MIT

````

---

### Étape 3.5 : Commit et Créer Changeset (15 min)

```bash
# Depuis la racine du package tokens
cd packages/design-system/tokens

# Stager tous les fichiers
git add .

# Commit avec message conventional commit
git commit -m "feat(tokens): ajouter 97 tokens primitifs pour v2.0

- Ajouter palette couleurs (54 tokens, 6 couleurs × 9 nuances)
- Ajouter familles polices (2 piles polices système)
- Ajouter échelle espacement (12 tokens, base 4px)
- Ajouter suite typographique (16 tokens: tailles, poids, hauteurs-ligne)
- Ajouter échelle ombres (6 niveaux élévation)
- Ajouter échelle rayons (7 valeurs rayon bordure)
- Configurer Style Dictionary avec outputReferences: true
- Ajouter script validation et documentation

Total: 97 tokens primitifs prêts pour couche Core (Semaine 2)"

# Créer changeset pour release
cd ../../..  # Retour racine repo
pnpm changeset

# Prompts interactifs :
# 1. Sélectionner : @grasdouble/lufa_design-system-tokens (espace pour sélectionner)
# 2. Choisir : minor (nouvelles features, rétrocompatible)
# 3. Résumé : "Ajouter 97 tokens primitifs (couleurs, espacement, typographie, ombres, rayons) pour fondation v2.0"

# Stager changeset
git add .changeset/
git commit -m "chore: ajouter changeset pour tokens primitifs v2.0"
````

---

## Checklist Post-Complétion

**Phase 1 Semaine 1 Complète :**

- [ ] 97 tokens primitifs créés à travers 8 catégories
- [ ] Style Dictionary configuré avec format DTCG
- [ ] `outputReferences: true` préserve cascade 4-niveaux
- [ ] Build génère sorties CSS, TypeScript, et JSON
- [ ] Script validation passe (0 erreurs)
- [ ] Documentation README complète
- [ ] Commits git créés avec format conventional commit
- [ ] Changeset créé pour versionnage sémantique
- [ ] Tous fichiers suivent conventions nommage (`--lufa-primitive-*`)
- [ ] Tous tokens incluent métadonnées DTCG (`$value`, `$type`, `$description`)
- [ ] Tous tokens incluent métadonnées custom (level, category, useCase)

---

## Dépannage

### Build Échoue avec "Cannot find module 'style-dictionary'"

**Solution :**

```bash
cd packages/design-system/tokens
pnpm install
pnpm build
```

### Variables CSS Non Générées

**Vérifier :**

1. `style-dictionary.config.js` a la plateforme `css`
2. `format: 'css/variables'` est correct
3. `source: ['src/primitives/**/*.json']` correspond emplacements fichiers

### Erreurs Script Validation

**Problèmes courants :**

- Champ `metadata` manquant dans token
- `$value`, `$type`, ou `$description` manquants
- `$type` DTCG invalide (doit être : color, dimension, fontFamily, fontWeight, number, shadow)

**Correctif :** Ajouter champs manquants suivant spec DTCG

---

## Conseils d'Exécution

1. **Utiliser les snippets VSCode** - Taper `token-color`, `token-spacing`, etc. pour templates pré-remplis
2. **Builder fréquemment** - Lancer `pnpm build` après chaque 5-10 tokens pour détecter erreurs tôt
3. **Copier-coller intelligemment** - Utiliser structure token existante, juste changer valeurs/descriptions
4. **Valider souvent** - Lancer `pnpm validate` après complétion chaque catégorie
5. **Commiter incrémentalement** - Ne pas attendre fin de journée pour commiter
6. **Prendre des pauses** - 9-12 heures sur 3 jours, pas un sprint
7. **Référencer Tailwind** - Utiliser valeurs couleur Tailwind comme référence (standard industrie)
8. **Documenter au fur et à mesure** - Ajouter descriptions pendant que contexte est frais

---

## Budget Temps Détaillé

**Jour 1 (4-6 heures) :**

- Setup : 30 min
- Config Style Dictionary : 45 min
- Couleurs (54 tokens) : 2.5 heures
- Familles polices (2 tokens) : 45 min

**Jour 2 (3-4 heures) :**

- Espacement (12 tokens) : 45 min
- Suite typographique (16 tokens) : 1.5 heures
- Ombres (6 tokens) : 45 min
- Buffer : 30 min

**Jour 3 (2 heures) :**

- Rayons (7 tokens) : 30 min
- Build/validation final : 30 min
- Documentation : 45 min
- Commits git/changeset : 15 min

**Total : 9-12 heures**

---

## Critères de Succès

Phase 1 Semaine 1 est **COMPLÈTE** quand :

✅ Tous les 97 tokens primitifs existent dans fichiers JSON  
✅ Style Dictionary build sans erreurs  
✅ `dist/tokens.css` contient 97 propriétés CSS custom  
✅ `dist/tokens.ts` est valide TypeScript et importable  
✅ Script validation passe avec 0 erreurs  
✅ Documentation README est complète  
✅ Commits git suivent format conventional commit  
✅ Changeset créé pour release v2.0.0  
✅ Tous tokens suivent format DTCG  
✅ Tous tokens incluent métadonnées

**Quand complet :** Passer à planification Phase 1 Semaine 2 (Tokens Core).

---

**FIN DU PLAN D'EXÉCUTION**
