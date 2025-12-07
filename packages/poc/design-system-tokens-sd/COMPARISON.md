# Token Management Approaches Comparison

## Overview

This document compares two approaches for managing design tokens in the Lufa Design System:

1. **TypeScript-based** (`@grasdouble/lufa_design-system-tokens`) - Current implementation
2. **Style Dictionary** (`@grasdouble/lufa_design-system-tokens-sd`) - Proof of concept

## Quick Comparison

| Aspect               | TypeScript Approach    | Style Dictionary Approach              |
| -------------------- | ---------------------- | -------------------------------------- |
| **Token Definition** | TypeScript objects     | JSON files                             |
| **Type Safety**      | ✅ Native TS types     | ⚠️ Requires manual types               |
| **Build Tool**       | Custom Node.js scripts | Style Dictionary CLI                   |
| **Output Formats**   | CSS, TypeScript        | CSS, JSON, JS, iOS, Android, etc.      |
| **Token References** | Manual composition     | Built-in `{token.path}` syntax         |
| **Learning Curve**   | Low (familiar JS/TS)   | Medium (Style Dictionary API)          |
| **Community**        | Custom solution        | Industry standard (Amazon, Salesforce) |
| **Flexibility**      | High (custom logic)    | Medium (plugin system)                 |
| **Multi-platform**   | Manual implementation  | Built-in transforms                    |

## Detailed Analysis

### 1. Token Definition

#### TypeScript

```typescript
// src/colors-semantic.ts
export const semantic = {
  interactive: {
    default: primitives.blue[500],
    hover: primitives.blue[600],
    active: primitives.blue[700],
  },
};
```

**Pros:**

- Native TypeScript with full IDE support
- Direct object composition
- Can use functions and logic

**Cons:**

- Tightly coupled to JavaScript ecosystem
- Manual format conversion needed

#### Style Dictionary

```json
{
  "color": {
    "semantic": {
      "interactive": {
        "default": { "value": "{color.primitive.blue.500}" },
        "hover": { "value": "{color.primitive.blue.600}" }
      }
    }
  }
}
```

**Pros:**

- Platform-agnostic JSON format
- Built-in token aliasing with `{}`
- Easy to parse by external tools

**Cons:**

- JSON lacks type checking
- More verbose syntax
- No programming logic in definitions

### 2. Build Process

#### TypeScript

```json
{
  "scripts": {
    "build": "tsc && node scripts/generate-css.js"
  }
}
```

- Custom Node.js script reads TS files
- Manually generates CSS custom properties
- Full control over output format

#### Style Dictionary

```json
{
  "scripts": {
    "build": "style-dictionary build --config style-dictionary.config.js && tsc"
  }
}
```

- Configuration-driven builds
- Automatic transforms and formatting
- Multiple platforms from single source

### 3. Output Formats

#### TypeScript Outputs

```
dist/
├── tokens.css           # CSS custom properties
├── colors-semantic.js   # ES modules
├── colors-semantic.d.ts # TypeScript types
├── spacing.js
├── typography.js
└── ...
```

#### Style Dictionary Outputs

```
dist/
├── tokens.css           # CSS custom properties
├── tokens.json          # Flat JSON
├── tokens.js            # ES6 module
├── tokens.ios.swift     # (potential)
├── tokens.android.xml   # (potential)
└── ...
```

### 4. Token References

#### TypeScript - Manual Composition

```typescript
import { primitives } from "./primitives";

export const semantic = {
  interactive: {
    default: primitives.blue[500], // Direct reference
    hover: primitives.blue[600],
  },
};
```

#### Style Dictionary - Built-in Aliasing

```json
{
  "color": {
    "semantic": {
      "interactive": {
        "default": { "value": "{color.primitive.blue.500}" }
      }
    }
  }
}
```

Style Dictionary resolves references automatically and can output references in CSS:

```css
:root {
  --color-primitive-blue-500: #3b82f6;
  --color-semantic-interactive-default: var(--color-primitive-blue-500);
}
```

### 5. CSS Variable Naming

#### TypeScript

```css
:root {
  --lufa-color-interactive-default: #3b82f6;
  --lufa-spacing-md: 16px;
}
```

- Custom prefix (`--lufa-`)
- Manual kebab-case conversion

#### Style Dictionary

```css
:root {
  --color-semantic-interactive-default: #3b82f6;
  --spacing-md: 16px;
}
```

- Automatic path-to-kebab conversion
- Customizable via transforms

### 6. Extensibility

#### TypeScript

- Write custom Node.js scripts
- Full programmatic control
- Can integrate any npm package
- No framework constraints

#### Style Dictionary

- Plugin system for custom transforms
- Custom formats via templates
- Pre-built transforms for common cases
- Framework provides structure

### 7. Multi-Platform Support

#### TypeScript

Requires manual implementation for each platform:

```javascript
// Custom script for iOS
function generateSwift(tokens) {
  // Manual Swift generation
}

// Custom script for Android
function generateXML(tokens) {
  // Manual XML generation
}
```

#### Style Dictionary

Built-in platform support:

```javascript
// style-dictionary.config.js
platforms: {
  ios: {
    transformGroup: 'ios',
    buildPath: 'dist/ios/',
    files: [{ destination: 'tokens.swift', format: 'ios-swift/class.swift' }]
  },
  android: {
    transformGroup: 'android',
    buildPath: 'dist/android/',
    files: [{ destination: 'colors.xml', format: 'android/colors' }]
  }
}
```

## Real-World Examples

### Generated CSS Comparison

#### TypeScript Output

```css
:root {
  --lufa-color-interactive-default: #3b82f6;
  --lufa-color-interactive-hover: #2563eb;
  --lufa-spacing-xs: 4px;
  --lufa-spacing-sm: 8px;
  --lufa-spacing-md: 16px;
}
```

#### Style Dictionary Output

```css
/**
 * Do not edit directly, this file was auto-generated.
 */

:root {
  --color-semantic-interactive-default: #3b82f6;
  --color-semantic-interactive-hover: #2563eb;
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
}
```

### File Sizes

| Package          | tokens.css | Total dist/ |
| ---------------- | ---------- | ----------- |
| TypeScript       | ~11 KB     | ~45 KB      |
| Style Dictionary | ~9 KB      | ~38 KB      |

## Use Case Recommendations

### Choose TypeScript When:

- ✅ Working exclusively in JS/TS ecosystem
- ✅ Need complex token derivation logic
- ✅ Team is more comfortable with TypeScript
- ✅ Want maximum flexibility and control
- ✅ Don't need multi-platform outputs

### Choose Style Dictionary When:

- ✅ Need multi-platform support (iOS, Android, etc.)
- ✅ Want industry-standard tooling
- ✅ Prefer declarative configuration
- ✅ Need extensive token aliasing
- ✅ Want built-in transforms and formats
- ✅ Planning to share tokens with non-web platforms

## Migration Path

If migrating from TypeScript to Style Dictionary:

1. Convert TypeScript objects to JSON format
2. Update token references to use `{path.to.token}` syntax
3. Configure Style Dictionary platforms
4. Update consuming packages to new output paths
5. Adjust CSS variable names if needed

## Recommendation

### For Lufa Design System:

**Stay with TypeScript if:**

- You're only targeting web platforms
- The team prefers TypeScript
- Current solution is working well
- You need custom token logic

**Switch to Style Dictionary if:**

- You plan to support mobile apps (React Native, native iOS/Android)
- You want to adopt industry standards
- Token aliasing is important
- You want automatic multi-format outputs

## Conclusion

Both approaches are viable. The TypeScript approach offers simplicity and full control, while Style Dictionary provides standardization and multi-platform support. The choice depends on your specific needs and future platform targets.

For a web-only design system, **TypeScript** is sufficient. For cross-platform support, **Style Dictionary** is the better choice.
