/**
 * Aspect Ratio Tokens
 *
 * Semantic aspect ratios for media containers, images, and videos.
 * References primitive aspect ratio scale for consistent tokens.
 *
 * USAGE:
 * - square: 1:1 ratio for profile pictures, thumbnails
 * - traditional: 4:3 ratio for presentations, older displays
 * - photo: 3:2 ratio for classic photography
 * - video: 16:9 ratio for widescreen video (YouTube, modern displays)
 * - ultrawide: 21:9 ratio for cinematic, banner images
 * - vertical: 9:16 ratio for vertical video (Instagram stories, TikTok)
 * - portrait: 2:3 ratio for portrait photography
 * - portraitDisplay: 3:4 ratio for portrait display
 *
 * GUIDELINES:
 * - Use for responsive images and video containers
 * - Prevent layout shift during media loading
 * - Maintain consistent proportions across breakpoints
 * - Combine with object-fit for image scaling
 * - Consider orientation-specific ratios for responsive design
 *
 * ACCESSIBILITY:
 * - Always provide alt text for images
 * - Ensure videos have captions and transcripts
 * - Test media scaling at different viewport sizes
 * - Consider reduced-motion preferences for video
 *
 * PERFORMANCE:
 * - Use aspect-ratio CSS property for modern browsers
 * - Implement padding-hack fallback for older browsers
 * - Lazy load images and videos below the fold
 * - Provide appropriate image sizes for different viewports
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio|CSS aspect-ratio}
 * @see {@link https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html|WCAG 2.1 - Non-text Content}
 */

import { aspectRatio as primitiveAspectRatio } from "@grasdouble/lufa_design-system-primitives";

export const aspectRatio = {
  /** 1:1 - Square (profile pictures, thumbnails) */
  square: primitiveAspectRatio.square,
  /** 4:3 - Traditional (presentations, older displays) */
  traditional: primitiveAspectRatio.traditionalPhotoMonitor,
  /** 3:2 - Classic photography */
  photo: primitiveAspectRatio.classicPhotography,
  /** 16:9 - Widescreen video (YouTube, modern displays) */
  video: primitiveAspectRatio.widescreenVideo,
  /** 21:9 - Ultrawide (cinematic, banner images) */
  ultrawide: primitiveAspectRatio.ultrawide,
  /** 9:16 - Vertical video (Instagram stories, TikTok) */
  vertical: primitiveAspectRatio.vertical,
  /** 2:3 - Portrait photography */
  portrait: primitiveAspectRatio.portraitPhoto,
  /** 3:4 - Portrait display */
  portraitDisplay: primitiveAspectRatio.portraitDisplay,
} as const;

export type AspectRatio = keyof typeof aspectRatio;
