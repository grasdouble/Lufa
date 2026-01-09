/**
 * Design System Tokens
 *
 * Semantic layer that maps primitive values to intent-based names.
 * Organized by category for better discoverability and maintainability.
 */
import type { BorderStyle } from './tokens/border/borderStyle.js';
import type { BorderWidth } from './tokens/border/borderWidth.js';
import type { Radius } from './tokens/border/radius.js';
import type { Color, ColorValue } from './tokens/color/colors.js';
import type { Blur } from './tokens/effects/blur.js';
import type { Cursor } from './tokens/effects/cursor.js';
import type { Opacity } from './tokens/effects/opacity.js';
import type { Transform } from './tokens/effects/transform.js';
import type { Shadow } from './tokens/elevation/shadow.js';
import type { ZIndex } from './tokens/elevation/zIndex.js';
import type { IconSize } from './tokens/icon/iconSize.js';
import type { IconStroke } from './tokens/icon/iconStroke.js';
import type { AspectRatio } from './tokens/layout/aspectRatio.js';
import type { Breakpoint } from './tokens/layout/breakpoint.js';
import type { Container } from './tokens/layout/container.js';
import type { Dimension } from './tokens/layout/dimension.js';
import type { GridColumn, GridGutter } from './tokens/layout/grid.js';
import type { MinWidth } from './tokens/layout/minWidth.js';
import type { AdvancedDuration } from './tokens/motion/advancedDuration.js';
import type { Easing } from './tokens/motion/easing.js';
import type { Focus } from './tokens/motion/focus.js';
import type { Motion } from './tokens/motion/motion.js';
import type { Timing } from './tokens/motion/timing.js';
import type { Transition } from './tokens/motion/transition.js';
import type { MaxWidth } from './tokens/space/maxWidth.js';
import type { Size } from './tokens/space/size.js';
import type { Spacing } from './tokens/space/spacing.js';
import type { FontFamily } from './tokens/typography/fontFamily.js';
import type { FontSize } from './tokens/typography/fontSize.js';
import type { FontWeight } from './tokens/typography/fontWeight.js';
import type { LetterSpacing } from './tokens/typography/letterSpacing.js';
import type { LineHeight } from './tokens/typography/lineHeight.js';
import type { Measure } from './tokens/typography/measure.js';
import type { TypographyScale } from './tokens/typography/typography.js';
// ============================================================================
// BORDER
// ============================================================================

import { borderStyle } from './tokens/border/borderStyle.js';
import { borderWidth } from './tokens/border/borderWidth.js';
import { radius } from './tokens/border/radius.js';
// ============================================================================
// COLOR
// ============================================================================
import { color } from './tokens/color/colors.js';
// ============================================================================
// EFFECTS
// ============================================================================
import { blur } from './tokens/effects/blur.js';
import { cursor } from './tokens/effects/cursor.js';
import { opacity } from './tokens/effects/opacity.js';
import { transform } from './tokens/effects/transform.js';
// ============================================================================
// ELEVATION
// ============================================================================
import { shadow } from './tokens/elevation/shadow.js';
import { zIndex } from './tokens/elevation/zIndex.js';
// ============================================================================
// ICON
// ============================================================================
import { iconSize } from './tokens/icon/iconSize.js';
import { iconStroke } from './tokens/icon/iconStroke.js';
import { aspectRatio } from './tokens/layout/aspectRatio.js';
// ============================================================================
// LAYOUT
// ============================================================================
import { breakpoint } from './tokens/layout/breakpoint.js';
import { container } from './tokens/layout/container.js';
import { dimension } from './tokens/layout/dimension.js';
import { grid } from './tokens/layout/grid.js';
import { minWidth } from './tokens/layout/minWidth.js';
import { advancedDuration } from './tokens/motion/advancedDuration.js';
// ============================================================================
// MOTION
// ============================================================================
import { easing } from './tokens/motion/easing.js';
import { focus, getFocusStyle } from './tokens/motion/focus.js';
import { getTransition, motion } from './tokens/motion/motion.js';
import { timing } from './tokens/motion/timing.js';
import { transition } from './tokens/motion/transition.js';
import { maxWidth } from './tokens/space/maxWidth.js';
import { size } from './tokens/space/size.js';
// ============================================================================
// SPACE
// ============================================================================
import { spacing } from './tokens/space/spacing.js';
// ============================================================================
// TYPOGRAPHY
// ============================================================================
import { fontFamily } from './tokens/typography/fontFamily.js';
import { fontSize } from './tokens/typography/fontSize.js';
import { fontWeight } from './tokens/typography/fontWeight.js';
import { letterSpacing } from './tokens/typography/letterSpacing.js';
import { lineHeight } from './tokens/typography/lineHeight.js';
import { measure } from './tokens/typography/measure.js';
import { typographyScale } from './tokens/typography/typography.js';

const tokens = {
  // BORDER
  borderWidth,
  borderStyle,
  radius,
  // COLOR
  color,
  // EFFECTS
  blur,
  opacity,
  cursor,
  transform,
  // ELEVATION
  shadow,
  zIndex,
  // ICON
  iconSize,
  iconStroke,
  // LAYOUT
  breakpoint,
  grid,
  aspectRatio,
  container,
  dimension,
  minWidth,
  // MOTION
  easing,
  timing,
  advancedDuration,
  transition,
  motion,
  getTransition,
  focus,
  getFocusStyle,
  // SPACE
  spacing,
  size,
  maxWidth,
  // TYPOGRAPHY
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  typographyScale,
  measure,
};

export default tokens;

export type {
  // BORDER
  BorderWidth,
  BorderStyle,
  Radius,
  // COLOR
  Color,
  ColorValue,
  // EFFECTS
  Blur,
  Opacity,
  Cursor,
  Transform,
  // ELEVATION
  Shadow,
  ZIndex,
  // ICON
  IconSize,
  IconStroke,
  // LAYOUT
  Breakpoint,
  GridColumn,
  GridGutter,
  AspectRatio,
  Container,
  Dimension,
  MinWidth,
  // MOTION
  Easing,
  Timing,
  AdvancedDuration,
  Transition,
  Motion,
  Focus,
  // SPACE
  Spacing,
  Size,
  MaxWidth,
  // TYPOGRAPHY
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TypographyScale,
  Measure,
};
