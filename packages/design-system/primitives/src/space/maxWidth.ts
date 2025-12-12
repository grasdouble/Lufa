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
  256: "16rem", // 256px - 3xs container
  288: "18rem", // 288px - 2xs container
  320: "20rem", // 320px - xs container
  360: "22.5rem", // 360px
  384: "24rem", // 384px
  400: "25rem", // 400px
  448: "28rem", // 448px
  512: "32rem", // 512px
  576: "36rem", // 576px
  600: "37.5rem", // 600px
  640: "40rem", // 640px - xs container
  672: "42rem", // 672px - 2xl container
  768: "48rem", // 768px - sm/3xl container
  800: "50rem", // 800px
  896: "56rem", // 896px - 4xl container
  960: "60rem", // 960px
  1024: "64rem", // 1024px - md/5xl container
  1152: "72rem", // 1152px - 6xl container
  1200: "75rem", // 1200px
  1280: "80rem", // 1280px - lg/7xl container
  1440: "90rem", // 1440px - xl container
  full: "100%",
  none: "none",
} as const;

export type MaxWidth = keyof typeof maxWidth;
