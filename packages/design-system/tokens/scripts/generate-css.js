import { writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// Import token tokens - using new organized structure
// Border
import { borderWidths } from "../dist/tokens/border/borderWidth.js";
import { borderStyles } from "../dist/tokens/border/borderStyle.js";
import { radius } from "../dist/tokens/border/radius.js";

// Color
import { colors } from "../dist/tokens/color/colors.js";

// Effects
import { blur } from "../dist/tokens/effects/blur.js";
import { opacity } from "../dist/tokens/effects/opacity.js";
import { cursor } from "../dist/tokens/effects/cursor.js";
import { transform } from "../dist/tokens/effects/transform.js";

// Elevation
import { shadows } from "../dist/tokens/elevation/shadows.js";
import { zIndex } from "../dist/tokens/elevation/zIndex.js";

// Icon
import { iconSizes } from "../dist/tokens/icon/iconSizes.js";
import { iconStrokes } from "../dist/tokens/icon/iconStrokes.js";

// Layout
import { breakpoints } from "../dist/tokens/layout/breakpoints.js";
import { grid } from "../dist/tokens/layout/grid.js";
import { aspectRatio } from "../dist/tokens/layout/aspectRatio.js";
import { container } from "../dist/tokens/layout/container.js";
import { dimensions } from "../dist/tokens/layout/dimensions.js";
import { minWidth } from "../dist/tokens/layout/minWidth.js";

// Motion
import { easing } from "../dist/tokens/motion/easing.js";
import { timing } from "../dist/tokens/motion/timing.js";
import { transition } from "../dist/tokens/motion/transition.js";
import { advancedDuration } from "../dist/tokens/motion/advancedDuration.js";

// Space
import { spacings } from "../dist/tokens/space/spacing.js";
import { sizes } from "../dist/tokens/space/sizes.js";
import { maxWidths } from "../dist/tokens/space/maxWidth.js";

// Typography
import { fontFamilies } from "../dist/tokens/typography/fontFamily.js";
import { fontSizes } from "../dist/tokens/typography/fontSize.js";
import { fontWeights } from "../dist/tokens/typography/fontWeight.js";
import { lineHeights } from "../dist/tokens/typography/lineHeight.js";
import { letterSpacings } from "../dist/tokens/typography/letterSpacing.js";
import { measure } from "../dist/tokens/typography/measure.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const distDir = resolve(__dirname, "../dist");

mkdirSync(distDir, { recursive: true });

/**
 * Convert camelCase or PascalCase to kebab-case
 * Handles numeric keys properly
 */
const toKebab = (segment) =>
  String(segment)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

/**
 * Process tokens object and return entries in their original order
 */
const processTokens = (obj) => {
  return Object.entries(obj);
};

/**
 * Process nested object (like grid or colors) and return formatted entries
 */
const processNestedTokens = (obj, prefix) => {
  const entries = [];
  for (const [category, values] of Object.entries(obj)) {
    const categoryEntries = processTokens(values);
    for (const [key, value] of categoryEntries) {
      entries.push({
        name: `${prefix}-${toKebab(category)}-${toKebab(key)}`,
        value,
      });
    }
  }
  return entries;
};

/**
 * Generate CSS section with proper formatting
 */
const generateSection = (title, entries) => {
  let css = `\n  /* ${title} */\n`;
  for (const { name, value } of entries) {
    css += `  --lufa-${name}: ${value};\n`;
  }
  return css;
};

// Collect all tokens with metadata
const tokenCategories = [];

// ============================================================================
// BORDER
// ============================================================================
const borderWidthEntries = processTokens(borderWidths).map(([k, v]) => ({
  name: `border-width-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({
  name: "Border Widths",
  count: borderWidthEntries.length,
});

const borderStyleEntries = processTokens(borderStyles).map(([k, v]) => ({
  name: `border-style-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({
  name: "Border Styles",
  count: borderStyleEntries.length,
});

const radiusEntries = processTokens(radius).map(([k, v]) => ({
  name: `radius-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Border Radius", count: radiusEntries.length });

// ============================================================================
// COLOR
// ============================================================================
const colorEntries = processNestedTokens(colors, "color");
tokenCategories.push({ name: "Colors", count: colorEntries.length });

// ============================================================================
// EFFECTS
// ============================================================================
const blurEntries = processTokens(blur).map(([k, v]) => ({
  name: `blur-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Blur", count: blurEntries.length });

const opacityEntries = processTokens(opacity).map(([k, v]) => ({
  name: `opacity-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Opacity", count: opacityEntries.length });

const cursorEntries = processTokens(cursor).map(([k, v]) => ({
  name: `cursor-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Cursor", count: cursorEntries.length });

const transformEntries = processTokens(transform).map(([k, v]) => ({
  name: `transform-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Transform", count: transformEntries.length });

// ============================================================================
// ELEVATION
// ============================================================================
const shadowEntries = processTokens(shadows).map(([k, v]) => ({
  name: `shadow-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Shadows", count: shadowEntries.length });

const zIndexEntries = processTokens(zIndex).map(([k, v]) => ({
  name: `z-index-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Z-Index", count: zIndexEntries.length });

// ============================================================================
// ICON
// ============================================================================
const iconSizeEntries = processTokens(iconSizes).map(([k, v]) => ({
  name: `icon-size-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Icon Sizes", count: iconSizeEntries.length });

const iconStrokeEntries = processTokens(iconStrokes).map(([k, v]) => ({
  name: `icon-stroke-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Icon Strokes", count: iconStrokeEntries.length });

// ============================================================================
// LAYOUT
// ============================================================================
const breakpointEntries = processTokens(breakpoints).map(([k, v]) => ({
  name: `breakpoint-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Breakpoints", count: breakpointEntries.length });

const gridColumnEntries = processTokens(grid.columns).map(([k, v]) => ({
  name: `grid-columns-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Grid Columns", count: gridColumnEntries.length });

const gridGutterEntries = processTokens(grid.gutters).map(([k, v]) => ({
  name: `grid-gutter-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Grid Gutters", count: gridGutterEntries.length });

const aspectRatioEntries = processTokens(aspectRatio).map(([k, v]) => ({
  name: `aspect-ratio-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({
  name: "Aspect Ratio",
  count: aspectRatioEntries.length,
});

const containerEntries = processTokens(container).map(([k, v]) => ({
  name: `container-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Container", count: containerEntries.length });

const dimensionsEntries = processTokens(dimensions).map(([k, v]) => ({
  name: `dimensions-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Dimensions", count: dimensionsEntries.length });

const minWidthEntries = processTokens(minWidth).map(([k, v]) => ({
  name: `min-width-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Min Width", count: minWidthEntries.length });

// ============================================================================
// MOTION
// ============================================================================
const easingEntries = processTokens(easing).map(([k, v]) => ({
  name: `easing-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Easing", count: easingEntries.length });

const timingEntries = processTokens(timing).map(([k, v]) => ({
  name: `timing-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Timing", count: timingEntries.length });

const transitionEntries = processTokens(transition).map(([k, v]) => ({
  name: `transition-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Transition", count: transitionEntries.length });

const advancedDurationEntries = processTokens(advancedDuration).map(
  ([k, v]) => ({
    name: `advanced-duration-${toKebab(k)}`,
    value: v,
  })
);
tokenCategories.push({
  name: "Advanced Duration",
  count: advancedDurationEntries.length,
});

// ============================================================================
// SPACE
// ============================================================================
const spacingEntries = processTokens(spacings).map(([k, v]) => ({
  name: `spacing-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Spacing", count: spacingEntries.length });

const sizeEntries = processTokens(sizes).map(([k, v]) => ({
  name: `size-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Sizes", count: sizeEntries.length });

const maxWidthEntries = processTokens(maxWidths).map(([k, v]) => ({
  name: `max-width-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Max Width", count: maxWidthEntries.length });

// ============================================================================
// TYPOGRAPHY
// ============================================================================
const fontFamilyEntries = processTokens(fontFamilies).map(([k, v]) => ({
  name: `font-family-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({
  name: "Font Families",
  count: fontFamilyEntries.length,
});

const fontSizeEntries = processTokens(fontSizes).map(([k, v]) => ({
  name: `font-size-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Font Sizes", count: fontSizeEntries.length });

const fontWeightEntries = processTokens(fontWeights).map(([k, v]) => ({
  name: `font-weight-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Font Weights", count: fontWeightEntries.length });

const lineHeightEntries = processTokens(lineHeights).map(([k, v]) => ({
  name: `line-height-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Line Heights", count: lineHeightEntries.length });

const letterSpacingEntries = processTokens(letterSpacings).map(([k, v]) => ({
  name: `letter-spacing-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({
  name: "Letter Spacings",
  count: letterSpacingEntries.length,
});

const measureEntries = processTokens(measure).map(([k, v]) => ({
  name: `measure-${toKebab(k)}`,
  value: v,
}));
tokenCategories.push({ name: "Measure", count: measureEntries.length });

// Calculate total tokens
const totalTokens = tokenCategories.reduce((sum, cat) => sum + cat.count, 0);

// Generate CSS with documentation header
let css = "/**\n";
css += " * Lufa Design System - Semantic Tokens\n";
css += " * Auto-generated CSS custom properties\n";
css += " * DO NOT EDIT MANUALLY\n";
css += " */\n\n";
css += ":root {\n";

// Generate all sections
css += generateSection("BORDER - Widths", borderWidthEntries);
css += generateSection("BORDER - Styles", borderStyleEntries);
css += generateSection("BORDER - Radius", radiusEntries);
css += generateSection("COLOR - Semantic Colors", colorEntries);
css += generateSection("EFFECTS - Blur", blurEntries);
css += generateSection("EFFECTS - Opacity", opacityEntries);
css += generateSection("EFFECTS - Cursor", cursorEntries);
css += generateSection("EFFECTS - Transform", transformEntries);
css += generateSection("ELEVATION - Shadows", shadowEntries);
css += generateSection("ELEVATION - Z-Index", zIndexEntries);
css += generateSection("ICON - Sizes", iconSizeEntries);
css += generateSection("ICON - Strokes", iconStrokeEntries);
css += generateSection("LAYOUT - Breakpoints", breakpointEntries);
css += generateSection("LAYOUT - Grid Columns", gridColumnEntries);
css += generateSection("LAYOUT - Grid Gutters", gridGutterEntries);
css += generateSection("LAYOUT - Aspect Ratio", aspectRatioEntries);
css += generateSection("LAYOUT - Container", containerEntries);
css += generateSection("LAYOUT - Dimensions", dimensionsEntries);
css += generateSection("LAYOUT - Min Width", minWidthEntries);
css += generateSection("MOTION - Easing", easingEntries);
css += generateSection("MOTION - Timing", timingEntries);
css += generateSection("MOTION - Transition", transitionEntries);
css += generateSection("MOTION - Advanced Duration", advancedDurationEntries);
css += generateSection("SPACE - Spacing", spacingEntries);
css += generateSection("SPACE - Sizes", sizeEntries);
css += generateSection("SPACE - Max Width", maxWidthEntries);
css += generateSection("TYPOGRAPHY - Font Families", fontFamilyEntries);
css += generateSection("TYPOGRAPHY - Font Sizes", fontSizeEntries);
css += generateSection("TYPOGRAPHY - Font Weights", fontWeightEntries);
css += generateSection("TYPOGRAPHY - Line Heights", lineHeightEntries);
css += generateSection("TYPOGRAPHY - Letter Spacings", letterSpacingEntries);
css += generateSection("TYPOGRAPHY - Measure", measureEntries);

css += "}\n";

writeFileSync(resolve(distDir, "styles.css"), css);

// Log detailed summary
console.log("✅ Generated styles.css");
console.log(`📊 Total tokens: ${totalTokens}`);
console.log(`📁 Categories: ${tokenCategories.length}`);

console.log("\n📈 Tokens by category:");
tokenCategories.forEach(({ name, count }) => {
  console.log(`   ${name}: ${count}`.padEnd(40, " "));
});
