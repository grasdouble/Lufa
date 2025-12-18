# Primitives

Package: @grasdouble/lufa_design-system-primitives
Location: packages/design-system/primitives/
Updated: 2025-12-13

## Stats

- 448 tokens total
- 23 categories
- 246 color tokens (OKLCH)
- No runtime dependencies
- TypeScript → JS + CSS dual export

## Structure

```
src/
├── index.ts
├── border/           borderWidth, borderStyle, radius
├── color/            chromatic (17×11), neutral (11)
├── effects/          blur, opacity
├── elevation/        shadow, zIndex
├── icon/             iconSize, iconStroke
├── layout/           breakpoint, gridColumns
├── motion/           timing, easing
├── space/            spacing, aspectRatio, maxWidth, size
└── typography/       fontFamily, fontSize, fontWeight, lineHeight, letterSpacing

dist/ (build output)
├── style.css         448 CSS variables, --lufa-primitive-* prefix
├── index.js + .d.ts  ES modules
└── [categories]/     Individual modules
```

## Tokens

| Category        | Export | Count                                                                                                                                               | Values |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| color.chromatic | 187    | red,orange,amber,yellow,lime,green,emerald,teal,cyan,sky,blue,indigo,violet,purple,fuchsia,pink,rose × [50,100,200,300,400,500,600,700,800,900,950] |
| color.neutral   | 59     | [50,100,200,300,400,500,600,700,800,900,950]                                                                                                        |
| spacing         | 21     | [0,0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96]                                                   |
| fontSize        | 13     | xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl,8xl,9xl                                                                                                    |
| gridColumns     | 14     | 1-12,none,subgrid                                                                                                                                   |
| timing          | 13     | 75,100,150,200,300,500,700,1000                                                                                                                     |
| radius          | 10     | none,sm,base,md,lg,xl,2xl,3xl,full                                                                                                                  |
| shadow          | 10     | xs,sm,base,md,lg,xl,2xl,inner,none                                                                                                                  |
| size            | 10     | Various                                                                                                                                             |
| zIndex          | 10     | 0,10,20,30,40,50,auto                                                                                                                               |
| fontWeight      | 9      | thin,extralight,light,normal,medium,semibold,bold,extrabold,black                                                                                   |
| aspectRatio     | 8      | square,traditionalPhotoMonitor,classicPhotography,widescreenVideo,ultrawide,vertical,portraitPhoto,portraitDisplay                                  |
| blur            | 7      | none,4,8,12,16,24,40                                                                                                                                |
| iconSize        | 7      | xs,sm,base,md,lg,xl                                                                                                                                 |
| opacity         | 7      | 0,5,10,20,25,30,40,50,60,70,75,80,90,95,100                                                                                                         |
| breakpoint      | 6      | sm,md,lg,xl,2xl                                                                                                                                     |
| borderWidth     | 6      | 0,1,2,4,8                                                                                                                                           |
| letterSpacing   | 6      | tighter,tight,normal,wide,wider,widest                                                                                                              |
| lineHeight      | 6      | none,tight,snug,normal,relaxed,loose                                                                                                                |
| borderStyle     | 5      | solid,dashed,dotted,double,none                                                                                                                     |
| easing          | 4      | linear,in,out,inOut                                                                                                                                 |
| iconStroke      | 4      | 1,1.5,2,2.5,3                                                                                                                                       |
| fontFamily      | 3      | sans,serif,mono                                                                                                                                     |

## Import

**TS**:

```typescript
import { color, fontSize, spacing } from '@grasdouble/lufa_design-system-primitives';

color.chromatic.blue[500]; // "oklch(63.68% 0.267 259.79)"
```

**CSS**:

```css
@import '@grasdouble/lufa_design-system-primitives/style.css';
color: var(--lufa-primitive-color-chromatic-blue-500);
```

**Exports**:

```json
{
  ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
  "./style.css": "./dist/style.css"
}
```

## Build

```bash
pnpm clean && tsc && node scripts/generate-css.js
```

Steps: Remove dist → Compile TS → Generate CSS
Time: ~2-3s
Output: index.js (448 exports) + style.css (448 variables)

## Flow

```
TS src/ → tsc → dist/index.js → generate-css.js → dist/style.css → Tokens → Tailwind → Components
```

## Integration

**Tokens**: `import { color }` → map to semantic names
**Main**: CSS imported globally
**Tailwind**: Uses tokens (not primitives)
**Components**: NEVER import primitives directly

## Workflow

Add: Edit src/ → `pnpm build` → verify dist/
Modify: Update src/ → build → test consumers → version (PATCH/MINOR)
Release: changeset → version → build → push → CI publish

## Decisions

- TS-first: Type safety, dual export | Trade-off: Build step
- OKLCH: Perceptual uniformity, wide gamut | Trade-off: Browser support (Chrome 111+)
- Separate pkg: Independent versioning | Trade-off: More packages
- Auto CSS: JS/CSS parity | Trade-off: Script maintenance

## Debug

| Issue                    | Fix                                                  |
| ------------------------ | ---------------------------------------------------- |
| CSS vars missing         | Check import, run build                              |
| TS import fails          | `pnpm add @grasdouble/lufa_design-system-primitives` |
| New primitive not in CSS | Run `pnpm build`                                     |
| OKLCH not rendering      | Chrome 111+, Firefox 113+, Safari 16.4+              |

## Links

- [Rules](../../rules/design-system/PRIMITIVES.md)
- [Tokens](./TOKENS.md)
- [CSS](./CSS.md)
- [Main](./MAIN.md)
- [Tailwind](../../configuration/design-system/TAILWIND.md)
