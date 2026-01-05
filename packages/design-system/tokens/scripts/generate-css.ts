import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TokenEntry } from './utils/token-helpers.js';
import { borderStyle } from '../dist/tokens/border/borderStyle.js';
// Import token tokens - using new organized structure
// Border
import { borderWidth } from '../dist/tokens/border/borderWidth.js';
import { radius } from '../dist/tokens/border/radius.js';
// Color
import { color } from '../dist/tokens/color/colors.js';
// Effects
import { blur } from '../dist/tokens/effects/blur.js';
import { cursor } from '../dist/tokens/effects/cursor.js';
import { opacity } from '../dist/tokens/effects/opacity.js';
import { transform } from '../dist/tokens/effects/transform.js';
// Elevation
import { shadow } from '../dist/tokens/elevation/shadow.js';
import { zIndex } from '../dist/tokens/elevation/zIndex.js';
// Icon
import { iconSize } from '../dist/tokens/icon/iconSize.js';
import { iconStroke } from '../dist/tokens/icon/iconStroke.js';
import { aspectRatio } from '../dist/tokens/layout/aspectRatio.js';
// Layout
import { breakpoint } from '../dist/tokens/layout/breakpoint.js';
import { container } from '../dist/tokens/layout/container.js';
import { dimension } from '../dist/tokens/layout/dimension.js';
import { grid } from '../dist/tokens/layout/grid.js';
import { minWidth } from '../dist/tokens/layout/minWidth.js';
import { advancedDuration } from '../dist/tokens/motion/advancedDuration.js';
// Motion
import { easing } from '../dist/tokens/motion/easing.js';
import { timing } from '../dist/tokens/motion/timing.js';
import { transition } from '../dist/tokens/motion/transition.js';
import { maxWidth } from '../dist/tokens/space/maxWidth.js';
import { size } from '../dist/tokens/space/size.js';
// Space
import { spacing } from '../dist/tokens/space/spacing.js';
// Typography
import { fontFamily } from '../dist/tokens/typography/fontFamily.js';
import { fontSize } from '../dist/tokens/typography/fontSize.js';
import { fontWeight } from '../dist/tokens/typography/fontWeight.js';
import { letterSpacing } from '../dist/tokens/typography/letterSpacing.js';
import { lineHeight } from '../dist/tokens/typography/lineHeight.js';
import { measure } from '../dist/tokens/typography/measure.js';
import { generateSection, processNestedTokens, processTokens, toKebab } from './utils/token-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, '../dist');

mkdirSync(distDir, { recursive: true });

interface TokenCategory {
  name: string;
  count: number;
}

// Collect all tokens with metadata
const tokenCategories: TokenCategory[] = [];

// ============================================================================
// BORDER
// ============================================================================
const borderWidthEntries: TokenEntry[] = processTokens(borderWidth as Record<string, unknown>).map(([k, v]) => ({
  name: `border-width-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({
  name: 'Border Widths',
  count: borderWidthEntries.length,
});

const borderStyleEntries: TokenEntry[] = processTokens(borderStyle as Record<string, unknown>).map(([k, v]) => ({
  name: `border-style-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({
  name: 'Border Styles',
  count: borderStyleEntries.length,
});

const radiusEntries: TokenEntry[] = processTokens(radius as Record<string, unknown>).map(([k, v]) => ({
  name: `radius-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Border Radius', count: radiusEntries.length });

// ============================================================================
// COLOR
// ============================================================================
const colorEntries: TokenEntry[] = processNestedTokens(color as Record<string, Record<string, unknown>>, 'color');
tokenCategories.push({ name: 'Colors', count: colorEntries.length });

// ============================================================================
// EFFECTS
// ============================================================================
const blurEntries: TokenEntry[] = processTokens(blur as Record<string, unknown>).map(([k, v]) => ({
  name: `blur-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Blur', count: blurEntries.length });

const opacityEntries: TokenEntry[] = processTokens(opacity as Record<string, unknown>).map(([k, v]) => ({
  name: `opacity-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Opacity', count: opacityEntries.length });

const cursorEntries: TokenEntry[] = processTokens(cursor as Record<string, unknown>).map(([k, v]) => ({
  name: `cursor-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Cursor', count: cursorEntries.length });

const transformEntries: TokenEntry[] = processTokens(transform as Record<string, unknown>).map(([k, v]) => ({
  name: `transform-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Transform', count: transformEntries.length });

// ============================================================================
// ELEVATION
// ============================================================================
const shadowEntries: TokenEntry[] = processTokens(shadow as Record<string, unknown>).map(([k, v]) => ({
  name: `shadow-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Shadows', count: shadowEntries.length });

const zIndexEntries: TokenEntry[] = processTokens(zIndex as Record<string, unknown>).map(([k, v]) => ({
  name: `z-index-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Z-Index', count: zIndexEntries.length });

// ============================================================================
// ICON
// ============================================================================
const iconSizeEntries: TokenEntry[] = processTokens(iconSize as Record<string, unknown>).map(([k, v]) => ({
  name: `icon-size-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Icon Sizes', count: iconSizeEntries.length });

const iconStrokeEntries: TokenEntry[] = processTokens(iconStroke as Record<string, unknown>).map(([k, v]) => ({
  name: `icon-stroke-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Icon Strokes', count: iconStrokeEntries.length });

// ============================================================================
// LAYOUT
// ============================================================================
const breakpointEntries: TokenEntry[] = processTokens(breakpoint as Record<string, unknown>).map(([k, v]) => ({
  name: `breakpoint-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Breakpoints', count: breakpointEntries.length });

const gridColumnEntries: TokenEntry[] = processTokens((grid as { columns: Record<string, unknown> }).columns).map(
  ([k, v]) => ({
    name: `grid-columns-${toKebab(k)}`,
    value: v as string | number,
  })
);
tokenCategories.push({ name: 'Grid Columns', count: gridColumnEntries.length });

const gridGutterEntries: TokenEntry[] = processTokens((grid as { gutters: Record<string, unknown> }).gutters).map(
  ([k, v]) => ({
    name: `grid-gutter-${toKebab(k)}`,
    value: v as string | number,
  })
);
tokenCategories.push({ name: 'Grid Gutters', count: gridGutterEntries.length });

const aspectRatioEntries: TokenEntry[] = processTokens(aspectRatio as Record<string, unknown>).map(([k, v]) => ({
  name: `aspect-ratio-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({
  name: 'Aspect Ratio',
  count: aspectRatioEntries.length,
});

const containerEntries: TokenEntry[] = processTokens(container as Record<string, unknown>).map(([k, v]) => ({
  name: `container-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Container', count: containerEntries.length });

const dimensionsEntries: TokenEntry[] = processTokens(dimension as Record<string, unknown>).map(([k, v]) => ({
  name: `dimensions-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Dimensions', count: dimensionsEntries.length });

const minWidthEntries: TokenEntry[] = processTokens(minWidth as Record<string, unknown>).map(([k, v]) => ({
  name: `min-width-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Min Width', count: minWidthEntries.length });

// ============================================================================
// MOTION
// ============================================================================
const easingEntries: TokenEntry[] = processTokens(easing as Record<string, unknown>).map(([k, v]) => ({
  name: `easing-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Easing', count: easingEntries.length });

const timingEntries: TokenEntry[] = processTokens(timing as Record<string, unknown>).map(([k, v]) => ({
  name: `timing-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Timing', count: timingEntries.length });

const transitionEntries: TokenEntry[] = processTokens(transition as Record<string, unknown>).map(([k, v]) => ({
  name: `transition-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Transition', count: transitionEntries.length });

const advancedDurationEntries: TokenEntry[] = processTokens(advancedDuration as Record<string, unknown>).map(
  ([k, v]) => ({
    name: `advanced-duration-${toKebab(k)}`,
    value: v as string | number,
  })
);
tokenCategories.push({
  name: 'Advanced Duration',
  count: advancedDurationEntries.length,
});

// ============================================================================
// SPACE
// ============================================================================
const spacingEntries: TokenEntry[] = processTokens(spacing as Record<string, unknown>).map(([k, v]) => ({
  name: `spacing-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Spacing', count: spacingEntries.length });

const sizeEntries: TokenEntry[] = processTokens(size as Record<string, unknown>).map(([k, v]) => ({
  name: `size-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Sizes', count: sizeEntries.length });

const maxWidthEntries: TokenEntry[] = processTokens(maxWidth as Record<string, unknown>).map(([k, v]) => ({
  name: `max-width-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Max Width', count: maxWidthEntries.length });

// ============================================================================
// TYPOGRAPHY
// ============================================================================
const fontFamilyEntries: TokenEntry[] = processTokens(fontFamily as Record<string, unknown>).map(([k, v]) => ({
  name: `font-family-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({
  name: 'Font Families',
  count: fontFamilyEntries.length,
});

const fontSizeEntries: TokenEntry[] = processTokens(fontSize as Record<string, unknown>).map(([k, v]) => ({
  name: `font-size-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Font Sizes', count: fontSizeEntries.length });

const fontWeightEntries: TokenEntry[] = processTokens(fontWeight as Record<string, unknown>).map(([k, v]) => ({
  name: `font-weight-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Font Weights', count: fontWeightEntries.length });

const lineHeightEntries: TokenEntry[] = processTokens(lineHeight as Record<string, unknown>).map(([k, v]) => ({
  name: `line-height-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Line Heights', count: lineHeightEntries.length });

const letterSpacingEntries: TokenEntry[] = processTokens(letterSpacing as Record<string, unknown>).map(([k, v]) => ({
  name: `letter-spacing-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({
  name: 'Letter Spacings',
  count: letterSpacingEntries.length,
});

const measureEntries: TokenEntry[] = processTokens(measure as Record<string, unknown>).map(([k, v]) => ({
  name: `measure-${toKebab(k)}`,
  value: v as string | number,
}));
tokenCategories.push({ name: 'Measure', count: measureEntries.length });

// Calculate total tokens
const totalTokens = tokenCategories.reduce((sum, cat) => sum + cat.count, 0);

// Generate CSS with documentation header
let css = '/**\n';
css += ' * Lufa Design System - Semantic Tokens\n';
css += ' * Auto-generated CSS custom properties\n';
css += ' * DO NOT EDIT MANUALLY\n';
css += ' */\n\n';
css += ':root {\n';

// Generate all sections
css += generateSection('BORDER - Widths', borderWidthEntries);
css += generateSection('BORDER - Styles', borderStyleEntries);
css += generateSection('BORDER - Radius', radiusEntries);
css += generateSection('COLOR - Semantic Colors', colorEntries);
css += generateSection('EFFECTS - Blur', blurEntries);
css += generateSection('EFFECTS - Opacity', opacityEntries);
css += generateSection('EFFECTS - Cursor', cursorEntries);
css += generateSection('EFFECTS - Transform', transformEntries);
css += generateSection('ELEVATION - Shadows', shadowEntries);
css += generateSection('ELEVATION - Z-Index', zIndexEntries);
css += generateSection('ICON - Sizes', iconSizeEntries);
css += generateSection('ICON - Strokes', iconStrokeEntries);
css += generateSection('LAYOUT - Breakpoints', breakpointEntries);
css += generateSection('LAYOUT - Grid Columns', gridColumnEntries);
css += generateSection('LAYOUT - Grid Gutters', gridGutterEntries);
css += generateSection('LAYOUT - Aspect Ratio', aspectRatioEntries);
css += generateSection('LAYOUT - Container', containerEntries);
css += generateSection('LAYOUT - Dimensions', dimensionsEntries);
css += generateSection('LAYOUT - Min Width', minWidthEntries);
css += generateSection('MOTION - Easing', easingEntries);
css += generateSection('MOTION - Timing', timingEntries);
css += generateSection('MOTION - Transition', transitionEntries);
css += generateSection('MOTION - Advanced Duration', advancedDurationEntries);
css += generateSection('SPACE - Spacing', spacingEntries);
css += generateSection('SPACE - Sizes', sizeEntries);
css += generateSection('SPACE - Max Width', maxWidthEntries);
css += generateSection('TYPOGRAPHY - Font Families', fontFamilyEntries);
css += generateSection('TYPOGRAPHY - Font Sizes', fontSizeEntries);
css += generateSection('TYPOGRAPHY - Font Weights', fontWeightEntries);
css += generateSection('TYPOGRAPHY - Line Heights', lineHeightEntries);
css += generateSection('TYPOGRAPHY - Letter Spacings', letterSpacingEntries);
css += generateSection('TYPOGRAPHY - Measure', measureEntries);

css += '}\n';

writeFileSync(resolve(distDir, 'style.css'), css);

// Log detailed summary
console.log('✅ Generated style.css');
console.log(`📊 Total tokens: ${totalTokens}`);
console.log(`📁 Categories: ${tokenCategories.length}`);

console.log('\n📈 Tokens by category:');
tokenCategories.forEach(({ name, count }) => {
  console.log(`   ${name}: ${count}`.padEnd(40, ' '));
});
