/**
 * Transform semantic tokens.
 * Common transform values for animations and interactions.
 *
 * SCOPE: Motion & Effects
 *
 * USE CASES:
 * - Hover effects (scale, lift)
 * - Active/pressed states
 * - Entrance/exit animations
 * - Rotate indicators
 *
 * CATEGORIES:
 * - scale: Size transformations
 * - rotate: Rotation angles
 * - translate: Movement offsets
 */

export const transform = {
  // Scale transforms
  scaleNone: "scale(1)",
  scaleDown: "scale(0.95)",
  scaleDownMore: "scale(0.9)",
  scaleUp: "scale(1.05)",
  scaleUpMore: "scale(1.1)",
  scaleUpLarge: "scale(1.2)",

  // Rotate transforms
  rotateNone: "rotate(0deg)",
  rotate45: "rotate(45deg)",
  rotate90: "rotate(90deg)",
  rotate180: "rotate(180deg)",
  rotate270: "rotate(270deg)",
  rotateMinus45: "rotate(-45deg)",
  rotateMinus90: "rotate(-90deg)",
  rotateMinus180: "rotate(-180deg)",

  // Common translate values
  translateNone: "translate(0, 0)",
  translateUpSmall: "translateY(-4px)",
  translateUp: "translateY(-8px)",
  translateUpLarge: "translateY(-16px)",
  translateDownSmall: "translateY(4px)",
  translateDown: "translateY(8px)",
  translateDownLarge: "translateY(16px)",

  // Combined transforms for common patterns
  hoverLift: "translateY(-2px) scale(1.02)", // Subtle lift on hover
  hoverLiftMore: "translateY(-4px) scale(1.05)", // Stronger lift
  pressedDown: "translateY(1px) scale(0.98)", // Pressed/active state
} as const;

export type Transform = keyof typeof transform;
