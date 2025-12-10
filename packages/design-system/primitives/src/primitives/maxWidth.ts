/**
 * Max-width primitives using actual pixel values as keys for content containers.
 * Includes special values 'full' (100%) and 'none' for flexible layouts.
 *
 * SCOPE: Specific - Used for content width constraints and responsive containers
 *
 * COMMON USE CASES:
 * - 384-576px: Modals, forms, narrow content
 * - 672-768px: Article content, blog posts (optimal line length)
 * - 896-1024px: Standard page containers
 * - 1152-1280px: Wide layouts, dashboards
 * - full: Fluid width (100%), no constraint
 * - none: Unconstrained width
 *
 * READABILITY GUIDELINES:
 * For text content, keep max-width between 576-768px (45-75 characters per line)
 * to optimize readability and reduce eye strain.
 *
 * NOTE: For element-level dimensions <384px, use sizes primitive instead.
 */
export const maxWidth = {
  384: "384px",
  448: "448px",
  512: "512px",
  576: "576px",
  672: "672px",
  768: "768px",
  896: "896px",
  1024: "1024px",
  1152: "1152px",
  1280: "1280px",
  full: "100%",
  none: "none",
} as const;

export type MaxWidth = typeof maxWidth;
export type MaxWidthKey = keyof MaxWidth;
