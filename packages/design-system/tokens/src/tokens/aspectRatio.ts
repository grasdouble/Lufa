/**
 * Aspect Ratio Tokens
 *
 * Semantic aspect ratios for media containers, images, and videos.
 * References primitive aspect ratio scale for consistent foundation.
 *
 * Usage Guidelines:
 * - Use for responsive images and video containers
 * - Prevent layout shift during media loading
 * - Maintain consistent proportions across breakpoints
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

export type AspectRatioToken = keyof typeof aspectRatio;

export default aspectRatio;
