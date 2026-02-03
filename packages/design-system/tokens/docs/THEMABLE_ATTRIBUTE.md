# Design Tokens - Attribut "Themable"

Ce document explique l'utilisation et les règles de l'attribut `themable` dans les design tokens du système Lufa.

---

## 🎯 Table des Matières

1. [Définition](#définition)
2. [Règles de Décision](#règles-de-décision)
3. [Exemples par Catégorie](#exemples-par-catégorie)
4. [Structure JSON](#structure-json)
5. [Validation](#validation)
6. [FAQ](#faq)

---

## 📖 Définition

### Qu'est-ce que l'attribut "themable" ?

L'attribut `themable` est une métadonnée booléenne qui indique si un token **doit changer de valeur selon le thème actif** (light, dark, high-contrast).

```json
{
  "$extensions": {
    "lufa": {
      "themable": true // ou false
    }
  }
}
```

### Pourquoi est-ce important ?

- ✅ **Clarté** : Indique explicitement quels tokens sont concernés par le theming
- ✅ **Validation** : Permet de détecter les erreurs de configuration automatiquement
- ✅ **Documentation** : Aide les développeurs à comprendre l'architecture des tokens
- ✅ **Tooling** : Permet aux outils de build de traiter différemment les tokens selon leur nature

---

## 🔍 Règles de Décision

### Règle Principale

> **Un token est `themable: true` si et seulement si sa valeur doit changer selon le thème (light/dark/high-contrast).**

### Flowchart de Décision

```
Est-ce que ce token représente une apparence visuelle ?
│
├─ NON → themable: false
│   (dimensions, espacements, typographie, timing, z-index, etc.)
│
└─ OUI → Est-ce que cette apparence doit changer selon le thème ?
    │
    ├─ NON → themable: false
    │   (dimensions, rayons de bordure, grille, etc.)
    │
    └─ OUI → themable: true
        (couleurs, ombres, backgrounds, etc.)
```

---

## 📊 Exemples par Catégorie

### ✅ Themable = `true`

Ces tokens **doivent** avoir `"themable": true` car ils changent selon le thème.

#### 1. **Couleurs** (toutes les catégories)

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$type": "color",
          "$value": "#2563eb",
          "$extensions": {
            "lufa": {
              "themable": true // ✅ Les couleurs changent selon le thème
            }
          }
        }
      }
    }
  }
}
```

**Justification :** Les couleurs sont le cœur du theming. Une couleur peut être plus claire en mode light et plus foncée en mode dark.

#### 2. **Ombres (Shadows)**

```json
{
  "primitive": {
    "elevation": {
      "shadow": {
        "sm": {
          "$type": "shadow",
          "$value": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
          "$extensions": {
            "lufa": {
              "themable": true // ✅ Les ombres changent selon le thème
            }
          }
        }
      }
    }
  }
}
```

**Justification :** Les ombres doivent s'adapter au thème pour maintenir le contraste et la visibilité. En mode dark, les ombres sont souvent plus subtiles ou de couleurs différentes.

#### 3. **Tokens Sémantiques de Couleur**

```json
{
  "core": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "{primitive.color.blue.600}",
        "$extensions": {
          "lufa": {
            "themable": true // ✅ Référence une couleur themable
          }
        }
      }
    }
  }
}
```

**Justification :** Si un token fait référence à une couleur themable, il devient lui-même themable.

---

### ❌ Themable = `false`

Ces tokens **doivent** avoir `"themable": false` car ils ne changent pas selon le thème.

#### 1. **Dimensions & Espacements**

```json
{
  "primitive": {
    "spacing": {
      "16": {
        "$type": "dimension",
        "$value": "16px",
        "$extensions": {
          "lufa": {
            "themable": false // ❌ Les espacements ne changent pas
          }
        }
      }
    }
  }
}
```

**Justification :** Un espacement de 16px reste 16px quel que soit le thème. Les dimensions sont structurelles, pas visuelles.

#### 2. **Typographie**

```json
{
  "primitive": {
    "typography": {
      "font-size": {
        "base": {
          "$type": "dimension",
          "$value": "16px",
          "$extensions": {
            "lufa": {
              "themable": false // ❌ Les tailles de police ne changent pas
            }
          }
        }
      }
    }
  }
}
```

**Justification :** La taille des polices est cohérente entre les thèmes. Seule la **couleur** du texte change.

#### 3. **Rayons de Bordure (Border Radius)**

```json
{
  "primitive": {
    "radius": {
      "scale": {
        "base": {
          "$type": "dimension",
          "$value": "8px",
          "$extensions": {
            "lufa": {
              "themable": false // ❌ Les rayons ne changent pas
            }
          }
        }
      }
    }
  }
}
```

**Justification :** La forme des composants reste identique entre les thèmes.

#### 4. **Timing & Animations**

```json
{
  "primitive": {
    "motion": {
      "timing": {
        "fast": {
          "$type": "duration",
          "$value": "150ms",
          "$extensions": {
            "lufa": {
              "themable": false // ❌ Les durées ne changent pas
            }
          }
        }
      }
    }
  }
}
```

**Justification :** Les animations ont la même durée quel que soit le thème.

#### 5. **Z-Index**

```json
{
  "semantic": {
    "elevation": {
      "z-index": {
        "modal": {
          "$type": "number",
          "$value": "1000",
          "$extensions": {
            "lufa": {
              "themable": false // ❌ Les z-index ne changent pas
            }
          }
        }
      }
    }
  }
}
```

**Justification :** L'ordre de superposition des éléments est indépendant du thème.

#### 6. **Grilles & Layouts**

```json
{
  "core": {
    "layout": {
      "grid": {
        "columns": {
          "$type": "number",
          "$value": "12",
          "$extensions": {
            "lufa": {
              "themable": false // ❌ La structure de grille ne change pas
            }
          }
        }
      }
    }
  }
}
```

**Justification :** La structure de mise en page est identique entre les thèmes.

---

## 📝 Structure JSON

### Emplacement de l'Attribut

L'attribut `themable` **doit toujours** être placé dans `$extensions.lufa` :

```json
{
  "token-name": {
    "$type": "color",
    "$value": "#2563eb",
    "$description": "Description du token",
    "$extensions": {
      "lufa": {
        "themable": true,
        "category": "primitive",
        "subcategory": "color"
      }
    }
  }
}
```

### Attributs Associés

L'attribut `themable` coexiste avec d'autres métadonnées dans `$extensions.lufa` :

| Attribut      | Type      | Description                               | Exemple                                              |
| ------------- | --------- | ----------------------------------------- | ---------------------------------------------------- |
| `themable`    | `boolean` | Indique si le token change selon le thème | `true` ou `false`                                    |
| `category`    | `string`  | Niveau hiérarchique du token              | `"primitive"`, `"core"`, `"semantic"`, `"component"` |
| `subcategory` | `string`  | Sous-catégorie du token                   | `"color"`, `"spacing"`, `"typography"`               |
| `wcag`        | `object`  | Conformité WCAG (pour les couleurs)       | `{ "level": "AAA", "ratio": 7.52 }`                  |

### Exemple Complet

```json
{
  "primitive": {
    "color": {
      "blue": {
        "600": {
          "$type": "color",
          "$value": "#2563eb",
          "$description": "Primary blue color - shade 600",
          "$extensions": {
            "lufa": {
              "themable": true,
              "category": "primitive",
              "subcategory": "color",
              "wcag": {
                "level": "AA",
                "ratio": 4.52,
                "fontSize": "16px"
              }
            }
          }
        }
      }
    }
  }
}
```

---

## ✅ Validation

### Validation Automatique

Le projet utilise un script de validation : `scripts/validate-token-metadata.js`

#### Règles Appliquées

```javascript
// Règle 1 : Les couleurs DOIVENT être themable
if (token.$type === 'color') {
  assert(token.$extensions.lufa.themable === true, `Color token "${path}" must have themable: true`);
}

// Règle 2 : Les ombres DOIVENT être themable
if (token.$type === 'shadow') {
  assert(token.$extensions.lufa.themable === true, `Shadow token "${path}" must have themable: true`);
}

// Règle 3 : Les dimensions NE DOIVENT PAS être themable
if (token.$type === 'dimension') {
  assert(token.$extensions.lufa.themable === false, `Dimension token "${path}" must have themable: false`);
}

// Règle 4 : Les durées NE DOIVENT PAS être themable
if (token.$type === 'duration') {
  assert(token.$extensions.lufa.themable === false, `Duration token "${path}" must have themable: false`);
}

// Règle 5 : L'attribut DOIT être présent
assert(token.$extensions?.lufa?.themable !== undefined, `Token "${path}" is missing themable attribute`);
```

### Exécution de la Validation

```bash
# Valider tous les tokens
npm run validate:tokens

# Ou directement
node scripts/validate-token-metadata.js
```

### Résultat Attendu

```
✅ Validation passed: All tokens have correct themable attributes
📊 Statistics:
  - Total tokens: 823
  - Themable tokens: 456 (55.4%)
  - Non-themable tokens: 367 (44.6%)
```

---

## ❓ FAQ

### Q1 : Que faire si un token fait référence à un autre token ?

**R :** Le token hérite de la themability du token référencé.

```json
{
  "core": {
    "brand": {
      "primary": {
        "$type": "color",
        "$value": "{primitive.color.blue.600}", // Référence un token themable
        "$extensions": {
          "lufa": {
            "themable": true // ✅ Hérite de la themability
          }
        }
      }
    }
  }
}
```

### Q2 : Peut-on avoir un token themable qui référence un token non-themable ?

**R :** Techniquement oui, mais c'est généralement une erreur de conception.

```json
// ⚠️ DÉCONSEILLÉ
{
  "component": {
    "button": {
      "padding": {
        "$type": "dimension",
        "$value": "{primitive.spacing.16}", // Non-themable
        "$extensions": {
          "lufa": {
            "themable": true // ❌ Incohérent !
          }
        }
      }
    }
  }
}
```

**Solution :** Un padding ne devrait jamais être themable. Utilisez `themable: false`.

### Q3 : Les gradients sont-ils themable ?

**R :** Oui, car ils sont basés sur des couleurs.

```json
{
  "semantic": {
    "ui": {
      "gradient": {
        "primary": {
          "$type": "gradient",
          "$value": "linear-gradient(180deg, {primitive.color.blue.500} 0%, {primitive.color.blue.700} 100%)",
          "$extensions": {
            "lufa": {
              "themable": true // ✅ Contient des couleurs
            }
          }
        }
      }
    }
  }
}
```

### Q4 : Et les tokens de transparence (opacity) ?

**R :** Ça dépend du contexte.

- Si c'est une **valeur d'opacité pure** (0.5) → `themable: false`
- Si c'est une **couleur avec alpha** (rgba) → `themable: true`

```json
{
  "primitive": {
    "opacity": {
      "half": {
        "$type": "number",
        "$value": "0.5",
        "$extensions": {
          "lufa": {
            "themable": false // ❌ Valeur numérique pure
          }
        }
      }
    }
  }
}
```

```json
{
  "semantic": {
    "ui": {
      "overlay": {
        "$type": "color",
        "$value": "rgba(0, 0, 0, 0.5)",
        "$extensions": {
          "lufa": {
            "themable": true // ✅ Couleur (peut être rgba(255,255,255,0.5) en dark)
          }
        }
      }
    }
  }
}
```

### Q5 : Que faire si on ajoute un nouveau token ?

**R :** Suivez ce workflow :

1. **Créer le token** avec sa valeur et son type
2. **Ajouter l'attribut themable** selon les règles ci-dessus
3. **Valider** avec `npm run validate:tokens`
4. **Tester** le token dans différents thèmes si `themable: true`

```json
{
  "nouveau-token": {
    "$type": "color", // 1. Type défini
    "$value": "#2563eb", // 2. Valeur définie
    "$extensions": {
      "lufa": {
        "themable": true // 3. Themable ajouté (car type = color)
      }
    }
  }
}
```

### Q6 : Y a-t-il des exceptions aux règles ?

**R :** Dans 99% des cas, les règles ci-dessus s'appliquent. Si vous pensez avoir un cas spécial :

1. Documentez la raison dans `$description`
2. Discutez-en avec l'équipe design system
3. Ajoutez un commentaire dans le fichier JSON

```json
{
  "special-token": {
    "$type": "dimension",
    "$value": "16px",
    "$description": "Exception : Cette dimension change en mode high-contrast pour améliorer l'accessibilité",
    "$extensions": {
      "lufa": {
        "themable": true, // Exception documentée
        "exception": "High-contrast accessibility requirement"
      }
    }
  }
}
```

---

## 📚 Ressources Additionnelles

- **Guide d'Utilisation des Tokens :** [USAGE_GUIDELINES.md](./USAGE_GUIDELINES.md)
- **Conventions de Nommage :** [NAMING_CONVENTIONS.md](./NAMING_CONVENTIONS.md)
- **Documentation Principale :** [README.md](./README.md)
- **ADR - Modes vs Themes :** [ADR-001-IMPLEMENTED-modes-vs-themes-separation.md](../../_docs/adrs/ADR-001-IMPLEMENTED-modes-vs-themes-separation.md)
- **ADR - High Contrast Strategy :** [ADR-003-IMPLEMENTED-high-contrast-token-strategy.md](../../_docs/adrs/ADR-003-IMPLEMENTED-high-contrast-token-strategy.md)

---

## 📝 Résumé Rapide

| Type de Token   | Exemples               | Themable   | Raison                      |
| --------------- | ---------------------- | ---------- | --------------------------- |
| **Couleurs**    | `#2563eb`, `rgba(...)` | ✅ `true`  | Change selon le thème       |
| **Ombres**      | `0 1px 2px rgba(...)`  | ✅ `true`  | S'adapte au thème           |
| **Dimensions**  | `16px`, `2rem`         | ❌ `false` | Structurel, pas visuel      |
| **Typographie** | `16px`, `bold`, `1.5`  | ❌ `false` | Cohérent entre thèmes       |
| **Espacements** | `8px`, `1rem`          | ❌ `false` | Structurel                  |
| **Rayons**      | `8px`, `50%`           | ❌ `false` | Forme cohérente             |
| **Durées**      | `150ms`, `0.3s`        | ❌ `false` | Timing cohérent             |
| **Z-Index**     | `1000`, `9999`         | ❌ `false` | Ordre de superposition fixe |
| **Nombres**     | `12`, `0.5`            | ❌ `false` | Valeurs numériques pures    |

---

**Dernière mise à jour :** 27 janvier 2026  
**Statut :** Actif - En vigueur  
**Auteur :** Équipe Lufa Design System  
**Version :** 1.0.0
