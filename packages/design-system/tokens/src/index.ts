/**
 * Design System Tokens
 *
 * Semantic layer that maps primitive values to intent-based names.
 * Organized by category for better discoverability and maintainability.
 */

// ============================================================================
// BORDER
// ============================================================================
export { borderWidths } from "./tokens/border/borderWidth.js";
export type { BorderWidthsTokens } from "./tokens/border/borderWidth.js";

export { borderStyles } from "./tokens/border/borderStyle.js";
export type { BorderStylesTokens } from "./tokens/border/borderStyle.js";

export { radius } from "./tokens/border/radius.js";
export type { RadiusTokens as RadiusToken } from "./tokens/border/radius.js";

// ============================================================================
// COLOR
// ============================================================================
export { colors } from "./tokens/color/colors.js";
export type {
  Colors,
  ColorsCategoriesTokens,
  ColorsToken,
} from "./tokens/color/colors.js";

// ============================================================================
// EFFECTS
// ============================================================================
export { blur } from "./tokens/effects/blur.js";
export type { BlurTokens } from "./tokens/effects/blur.js";

export { opacity } from "./tokens/effects/opacity.js";
export type { OpacityTokens as OpacityToken } from "./tokens/effects/opacity.js";

// ============================================================================
// ELEVATION
// ============================================================================
export { shadows } from "./tokens/elevation/shadows.js";
export type { ShadowsTokens } from "./tokens/elevation/shadows.js";

export { zIndex } from "./tokens/elevation/zIndex.js";
export type { ZIndexTokens } from "./tokens/elevation/zIndex.js";

// ============================================================================
// ICON
// ============================================================================
export { iconSizes } from "./tokens/icon/iconSizes.js";
export type { IconSizesTokens } from "./tokens/icon/iconSizes.js";

// ============================================================================
// LAYOUT
// ============================================================================
export { breakpoints } from "./tokens/layout/breakpoints.js";
export type { BreakpointsTokens } from "./tokens/layout/breakpoints.js";

export { grid } from "./tokens/layout/grid.js";
export type {
  GridColumn as GridColumnToken,
  GridGutter as GridGutterToken,
} from "./tokens/layout/grid.js";

export { aspectRatio } from "./tokens/layout/aspectRatio.js";
export type { AspectRatio as AspectRatioToken } from "./tokens/layout/aspectRatio.js";

export { container } from "./tokens/layout/container.js";
export type { Container as ContainerToken } from "./tokens/layout/container.js";

// ============================================================================
// MOTION
// ============================================================================
export { easing } from "./tokens/motion/easing.js";
export type { EasingTokens } from "./tokens/motion/easing.js";

export { timing } from "./tokens/motion/timing.js";
export type { TimingTokens } from "./tokens/motion/timing.js";

export { transition } from "./tokens/motion/transition.js";
export type { TransitionToken } from "./tokens/motion/transition.js";

export { motion, getTransition } from "./tokens/motion/motion.js";
export type { MotionToken } from "./tokens/motion/motion.js";

export { focus, getFocusStyle } from "./tokens/motion/focus.js";
export type { Focus as FocusToken } from "./tokens/motion/focus.js";

// ============================================================================
// SPACE
// ============================================================================
export { spacings } from "./tokens/space/spacing.js";
export type { SpacingsTokens } from "./tokens/space/spacing.js";

export { sizes } from "./tokens/space/sizes.js";
export type { SizesTokens } from "./tokens/space/sizes.js";

export { maxWidths } from "./tokens/space/maxWidth.js";
export type { MaxWidthsTokens } from "./tokens/space/maxWidth.js";

// ============================================================================
// TYPOGRAPHY
// ============================================================================
export { fontFamilies } from "./tokens/typography/fontFamily.js";
export type { FontFamiliesTokens } from "./tokens/typography/fontFamily.js";
export { fontSizes } from "./tokens/typography/fontSize.js";
export type { FontSizesTokens } from "./tokens/typography/fontSize.js";
export { fontWeights } from "./tokens/typography/fontWeight.js";
export type { FontWeightsTokens } from "./tokens/typography/fontWeight.js";
export { lineHeights } from "./tokens/typography/lineHeight.js";
export type { LineHeightsTokens } from "./tokens/typography/lineHeight.js";
export { letterSpacings } from "./tokens/typography/letterSpacing.js";
export type { LetterSpacingsTokens } from "./tokens/typography/letterSpacing.js";
export { typographyScales } from "./tokens/typography/typography.js";
export type { TypographyScalesTokens } from "./tokens/typography/typography.js";
