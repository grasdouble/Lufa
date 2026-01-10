import type { BorderStyle } from './border/borderStyle.js';
import type { BorderWidth } from './border/borderWidth.js';
import type { Radius } from './border/radius.js';
import type { Color } from './color/index.js';
import type { Blur } from './effects/blur.js';
import type { Opacity } from './effects/opacity.js';
import type { Shadow } from './elevation/shadow.js';
import type { ZIndex } from './elevation/z-index.js';
import type { IconSize } from './icon/iconSize.js';
import type { IconStroke } from './icon/iconStroke.js';
import type { Breakpoint } from './layout/breakpoint.js';
import type { GridColumns, GridGutters } from './layout/grid.js';
import type { Easing } from './motion/easing.js';
import type { Timing } from './motion/timing.js';
import type { AspectRatio } from './space/aspectRatio.js';
import type { MaxWidth } from './space/maxWidth.js';
import type { Size } from './space/sizes.js';
import type { Spacing } from './space/spacing.js';
import type { FontFamily } from './typography/fontFamily.js';
import type { FontSize } from './typography/fontSize.js';
import type { FontWeight } from './typography/fontWeight.js';
import type { LetterSpacing } from './typography/letterSpacing.js';
import type { LineHeight } from './typography/lineHeight.js';
// ============================================================================
// BORDER
// ============================================================================

import { borderStyle } from './border/borderStyle.js';
import { borderWidth } from './border/borderWidth.js';
import { radius } from './border/radius.js';
// ============================================================================
// COLOR
// ============================================================================
import { color } from './color/index.js';
// ============================================================================
// EFFECTS
// ============================================================================
import { blur } from './effects/blur.js';
import { opacity } from './effects/opacity.js';
// ============================================================================
// ELEVATION
// ============================================================================
import { shadow } from './elevation/shadow.js';
import { zIndex } from './elevation/z-index.js';
// ============================================================================
// ICON
// ============================================================================
import { iconSize } from './icon/iconSize.js';
import { iconStroke } from './icon/iconStroke.js';
// ============================================================================
// LAYOUT
// ============================================================================
import { breakpoint } from './layout/breakpoint.js';
import { grid } from './layout/grid.js';
// ============================================================================
// MOTION
// ============================================================================
import { easing } from './motion/easing.js';
import { timing } from './motion/timing.js';
// ============================================================================
// SPACE
// ============================================================================
import { aspectRatio } from './space/aspectRatio.js';
import { maxWidth } from './space/maxWidth.js';
import { size } from './space/sizes.js';
import { spacing } from './space/spacing.js';
// ============================================================================
// TYPOGRAPHY
// ============================================================================
import { fontFamily } from './typography/fontFamily.js';
import { fontSize } from './typography/fontSize.js';
import { fontWeight } from './typography/fontWeight.js';
import { letterSpacing } from './typography/letterSpacing.js';
import { lineHeight } from './typography/lineHeight.js';

const primitives = {
  // BORDER
  borderWidth,
  borderStyle,
  radius,

  // COLOR
  color,

  // EFFECTS
  blur,
  opacity,

  // ELEVATION
  shadow,
  zIndex,

  // ICON
  iconSize,
  iconStroke,

  // LAYOUT
  breakpoint,
  grid,

  // MOTION
  easing,
  timing,

  // SPACE
  aspectRatio,
  maxWidth,
  size,
  spacing,

  // TYPOGRAPHY
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
};

export default primitives;

export type {
  // BORDER
  BorderWidth,
  BorderStyle,
  Radius,

  // COLOR
  Color,

  // EFFECTS
  Blur,
  Opacity,

  // ELEVATION
  Shadow,
  ZIndex,

  // ICON
  IconSize,
  IconStroke,

  // LAYOUT
  Breakpoint,
  GridColumns,
  GridGutters,

  // MOTION
  Easing,
  Timing,

  // SPACE
  AspectRatio,
  MaxWidth,
  Size,
  Spacing,

  // TYPOGRAPHY
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
};
