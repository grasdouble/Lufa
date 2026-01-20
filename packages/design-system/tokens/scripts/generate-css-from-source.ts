/**
 * Generate CSS from TypeScript Source Files
 *
 * This script reads token source files directly, compiles them in-memory,
 * and generates CSS custom properties with actual primitive values.
 *
 * PROCESS:
 * 1. Read all token files from src/tokens/**
 * 2. Compile in-memory using dynamic import
 * 3. Extract actual token values (resolving primitives)
 * 4. Generate dist/style.css with CSS custom properties
 *
 * IMPORTANT: This runs BEFORE TypeScript compilation of tokens.
 * It uses tsx/node's built-in TS support to read source files.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import type { TokenEntry } from './utils/token-helpers.js';
import { generateSection, processNestedTokens, processTokens, toKebab } from './utils/token-helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const srcDir = resolve(__dirname, '../src/tokens');
const distDir = resolve(__dirname, '../dist');

// Ensure dist directory exists
mkdirSync(distDir, { recursive: true });

interface TokenCategory {
  name: string;
  count: number;
}

// Track token categories for reporting
const tokenCategories: TokenCategory[] = [];

/**
 * Import a token module from source using tsx
 * Returns the actual module with resolved primitive values
 */
async function importTokenSource<T>(path: string): Promise<T> {
  const modulePath = resolve(srcDir, path);
  const module = await import(modulePath);
  return module;
}

/**
 * Process a simple flat token object
 */
function processSimpleToken(tokenObj: Record<string, unknown>, prefix: string, categoryName: string): TokenEntry[] {
  const entries: TokenEntry[] = processTokens(tokenObj).map(([k, v]) => ({
    name: `${prefix}-${toKebab(k)}`,
    value: v as string | number,
  }));
  tokenCategories.push({ name: categoryName, count: entries.length });
  return entries;
}

// ============================================================================
// MAIN GENERATION FUNCTION
// ============================================================================

async function generateCSS() {
  console.log('🔨 Generating CSS from TypeScript source files...\n');

  // ============================================================================
  // BORDER
  // ============================================================================
  const borderWidthModule = await importTokenSource<{ borderWidth: Record<string, unknown> }>('border/borderWidth.ts');
  const borderWidthEntries = processSimpleToken(borderWidthModule.borderWidth, 'border-width', 'Border Widths');

  const borderStyleModule = await importTokenSource<{ borderStyle: Record<string, unknown> }>('border/borderStyle.ts');
  const borderStyleEntries = processSimpleToken(borderStyleModule.borderStyle, 'border-style', 'Border Styles');

  const radiusModule = await importTokenSource<{ radius: Record<string, unknown> }>('border/radius.ts');
  const radiusEntries = processSimpleToken(radiusModule.radius, 'radius', 'Border Radius');

  // ============================================================================
  // COLOR
  // ============================================================================
  const colorModule = await importTokenSource<{ color: Record<string, Record<string, unknown>> }>('color/colors.ts');
  const colorEntries: TokenEntry[] = processNestedTokens(colorModule.color, 'color');
  tokenCategories.push({ name: 'Colors', count: colorEntries.length });

  // ============================================================================
  // EFFECTS
  // ============================================================================
  const blurModule = await importTokenSource<{ blur: Record<string, unknown> }>('effects/blur.ts');
  const blurEntries = processSimpleToken(blurModule.blur, 'blur', 'Blur');

  const opacityModule = await importTokenSource<{ opacity: Record<string, unknown> }>('effects/opacity.ts');
  const opacityEntries = processSimpleToken(opacityModule.opacity, 'opacity', 'Opacity');

  const cursorModule = await importTokenSource<{ cursor: Record<string, unknown> }>('effects/cursor.ts');
  const cursorEntries = processSimpleToken(cursorModule.cursor, 'cursor', 'Cursor');

  const transformModule = await importTokenSource<{ transform: Record<string, unknown> }>('effects/transform.ts');
  const transformEntries = processSimpleToken(transformModule.transform, 'transform', 'Transform');

  // ============================================================================
  // ELEVATION
  // ============================================================================
  const shadowModule = await importTokenSource<{ shadow: Record<string, unknown> }>('elevation/shadow.ts');
  const shadowEntries = processSimpleToken(shadowModule.shadow, 'shadow', 'Shadows');

  const zIndexModule = await importTokenSource<{ zIndex: Record<string, unknown> }>('elevation/zIndex.ts');
  const zIndexEntries = processSimpleToken(zIndexModule.zIndex, 'z-index', 'Z-Index');

  // ============================================================================
  // ICON
  // ============================================================================
  const iconSizeModule = await importTokenSource<{ iconSize: Record<string, unknown> }>('icon/iconSize.ts');
  const iconSizeEntries = processSimpleToken(iconSizeModule.iconSize, 'icon-size', 'Icon Sizes');

  const iconStrokeModule = await importTokenSource<{ iconStroke: Record<string, unknown> }>('icon/iconStroke.ts');
  const iconStrokeEntries = processSimpleToken(iconStrokeModule.iconStroke, 'icon-stroke', 'Icon Strokes');

  // ============================================================================
  // LAYOUT
  // ============================================================================
  const breakpointModule = await importTokenSource<{ breakpoint: Record<string, unknown> }>('layout/breakpoint.ts');
  const breakpointEntries = processSimpleToken(breakpointModule.breakpoint, 'breakpoint', 'Breakpoints');

  const gridModule = await importTokenSource<{
    grid: { columns: Record<string, unknown>; gutters: Record<string, unknown> };
  }>('layout/grid.ts');
  const gridColumnEntries = processSimpleToken(gridModule.grid.columns, 'grid-columns', 'Grid Columns');
  const gridGutterEntries = processSimpleToken(gridModule.grid.gutters, 'grid-gutters', 'Grid Gutters');

  const aspectRatioModule = await importTokenSource<{ aspectRatio: Record<string, unknown> }>('layout/aspectRatio.ts');
  const aspectRatioEntries = processSimpleToken(aspectRatioModule.aspectRatio, 'aspect-ratio', 'Aspect Ratio');

  const containerModule = await importTokenSource<{ container: Record<string, unknown> }>('layout/container.ts');
  const containerEntries = processSimpleToken(containerModule.container, 'container', 'Container');

  const dimensionModule = await importTokenSource<{ dimension: Record<string, unknown> }>('layout/dimension.ts');
  const dimensionsEntries = processSimpleToken(dimensionModule.dimension, 'dimension', 'Dimensions');

  const minWidthModule = await importTokenSource<{ minWidth: Record<string, unknown> }>('layout/minWidth.ts');
  const minWidthEntries = processSimpleToken(minWidthModule.minWidth, 'min-width', 'Min Width');

  // ============================================================================
  // MOTION
  // ============================================================================
  const easingModule = await importTokenSource<{ easing: Record<string, unknown> }>('motion/easing.ts');
  const easingEntries = processSimpleToken(easingModule.easing, 'easing', 'Easing');

  const timingModule = await importTokenSource<{ timing: Record<string, unknown> }>('motion/timing.ts');
  const timingEntries = processSimpleToken(timingModule.timing, 'timing', 'Timing');

  const transitionModule = await importTokenSource<{ transition: Record<string, unknown> }>('motion/transition.ts');
  const transitionEntries = processSimpleToken(transitionModule.transition, 'transition', 'Transition');

  const advancedDurationModule = await importTokenSource<{ advancedDuration: Record<string, unknown> }>(
    'motion/advancedDuration.ts'
  );
  const advancedDurationEntries = processSimpleToken(
    advancedDurationModule.advancedDuration,
    'advanced-duration',
    'Advanced Duration'
  );

  // Focus tokens (composite objects)
  const focusModule = await importTokenSource<{ focus: Record<string, Record<string, unknown>> }>('motion/focus.ts');
  const focusEntries: TokenEntry[] = processNestedTokens(focusModule.focus, 'focus');
  tokenCategories.push({ name: 'Focus Styles', count: focusEntries.length });

  // Motion tokens (composite objects)
  const motionModule = await importTokenSource<{ motion: Record<string, Record<string, unknown>> }>('motion/motion.ts');
  const motionEntries: TokenEntry[] = processNestedTokens(motionModule.motion, 'motion');
  tokenCategories.push({ name: 'Motion Presets', count: motionEntries.length });

  // ============================================================================
  // SPACE
  // ============================================================================
  const spacingModule = await importTokenSource<{ spacing: Record<string, unknown> }>('space/spacing.ts');
  const spacingEntries = processSimpleToken(spacingModule.spacing, 'spacing', 'Spacing');

  const sizeModule = await importTokenSource<{ size: Record<string, unknown> }>('space/size.ts');
  const sizeEntries = processSimpleToken(sizeModule.size, 'size', 'Sizes');

  const maxWidthModule = await importTokenSource<{ maxWidth: Record<string, unknown> }>('space/maxWidth.ts');
  const maxWidthEntries = processSimpleToken(maxWidthModule.maxWidth, 'max-width', 'Max Width');

  // ============================================================================
  // TYPOGRAPHY
  // ============================================================================
  const fontFamilyModule = await importTokenSource<{ fontFamily: Record<string, unknown> }>('typography/fontFamily.ts');
  const fontFamilyEntries = processSimpleToken(fontFamilyModule.fontFamily, 'font-family', 'Font Families');

  const fontSizeModule = await importTokenSource<{ fontSize: Record<string, unknown> }>('typography/fontSize.ts');
  const fontSizeEntries = processSimpleToken(fontSizeModule.fontSize, 'font-size', 'Font Sizes');

  const fontWeightModule = await importTokenSource<{ fontWeight: Record<string, unknown> }>('typography/fontWeight.ts');
  const fontWeightEntries = processSimpleToken(fontWeightModule.fontWeight, 'font-weight', 'Font Weights');

  const lineHeightModule = await importTokenSource<{ lineHeight: Record<string, unknown> }>('typography/lineHeight.ts');
  const lineHeightEntries = processSimpleToken(lineHeightModule.lineHeight, 'line-height', 'Line Heights');

  const letterSpacingModule = await importTokenSource<{ letterSpacing: Record<string, unknown> }>(
    'typography/letterSpacing.ts'
  );
  const letterSpacingEntries = processSimpleToken(
    letterSpacingModule.letterSpacing,
    'letter-spacing',
    'Letter Spacings'
  );

  const measureModule = await importTokenSource<{ measure: Record<string, unknown> }>('typography/measure.ts');
  const measureEntries = processSimpleToken(measureModule.measure, 'measure', 'Measure');

  // Typography scale (composite objects)
  const typographyModule = await importTokenSource<{ typographyScale: Record<string, Record<string, unknown>> }>(
    'typography/typography.ts'
  );
  const typographyScaleEntries: TokenEntry[] = processNestedTokens(
    typographyModule.typographyScale,
    'typography-scale'
  );
  tokenCategories.push({ name: 'Typography Scale', count: typographyScaleEntries.length });

  // Calculate total tokens
  const totalTokens = tokenCategories.reduce((sum, cat) => sum + cat.count, 0);

  // ============================================================================
  // GENERATE CSS FILE
  // ============================================================================
  let css = '/**\n';
  css += ' * Lufa Design System - Semantic Tokens\n';
  css += ' * Auto-generated CSS custom properties\n';
  css += ' * DO NOT EDIT MANUALLY\n';
  css += ' *\n';
  css += ' * Generated from TypeScript source files\n';
  css += ' * Build: generate-css-from-source.ts\n';
  css += ' */\n\n';
  css += ':root {\n';

  // Generate all sections in organized order
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
  css += generateSection('MOTION - Focus Styles', focusEntries);
  css += generateSection('MOTION - Motion Presets', motionEntries);
  css += generateSection('SPACE - Spacing', spacingEntries);
  css += generateSection('SPACE - Sizes', sizeEntries);
  css += generateSection('SPACE - Max Width', maxWidthEntries);
  css += generateSection('TYPOGRAPHY - Font Families', fontFamilyEntries);
  css += generateSection('TYPOGRAPHY - Font Sizes', fontSizeEntries);
  css += generateSection('TYPOGRAPHY - Font Weights', fontWeightEntries);
  css += generateSection('TYPOGRAPHY - Line Heights', lineHeightEntries);
  css += generateSection('TYPOGRAPHY - Letter Spacings', letterSpacingEntries);
  css += generateSection('TYPOGRAPHY - Measure', measureEntries);
  css += generateSection('TYPOGRAPHY - Typography Scale', typographyScaleEntries);

  css += '}\n';

  // Write CSS file
  writeFileSync(resolve(distDir, 'style.css'), css);

  // ============================================================================
  // REPORT
  // ============================================================================
  console.log('✅ Generated style.css');
  console.log(`📊 Total tokens: ${totalTokens}`);
  console.log(`📁 Categories: ${tokenCategories.length}`);

  console.log('\n📈 Tokens by category:');
  tokenCategories.forEach(({ name, count }) => {
    console.log(`   ${name}: ${count}`.padEnd(40, ' '));
  });
  console.log('');
}

// Run the generator
generateCSS().catch((error) => {
  console.error('❌ Failed to generate CSS:', error);
  process.exit(1);
});
