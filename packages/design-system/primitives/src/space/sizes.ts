/**
 * Generic size primitives using actual pixel values as keys.
 * Includes minimum touch target (44px) to ensure WCAG accessibility compliance.
 * Keys represent the actual dimensions for clarity and ease of use.
 *
 * SCOPE: Global - Used for element-level dimensions
 *
 * COMMON USE CASES:
 * - Icon dimensions (16-64px)
 * - Button heights (32-48px)
 * - Avatar sizes (24-96px)
 * - Touch target minimum (44px)
 * - Input field heights (32-48px)
 * - Logo sizes (48-128px)
 * - Thumbnail dimensions (64-192px)
 *
 * NOTE: For container/layout widths >192px, use maxWidth primitive instead.
 */
export const size = {
  0: "0px",
  16: "16px",
  24: "24px",
  32: "32px",
  44: "44px", // WCAG 2.5.5 minimum touch target
  48: "48px",
  64: "64px",
  96: "96px",
  128: "128px",
  192: "192px",
} as const;

export type Size = keyof typeof size;
