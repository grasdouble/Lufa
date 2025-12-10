/**
 * Aspect ratio primitives with descriptive keys indicating the visual shape.
 * Keys describe the ratio type (square, widescreen, portrait, etc.), not usage context.
 * Tokens layer adds semantic meaning for specific use cases (e.g., 'heroImage', 'thumbnail').
 *
 * SCOPE: Global - Used for media containers and responsive images
 *
 * COMMON USE CASES:
 * - square (1:1): Avatars, profile images, social media posts
 * - traditionalPhotoMonitor (4:3): Classic photos, presentations
 * - classicPhotography (3:2): Photography, landscape images
 * - widescreenVideo (16:9): YouTube videos, hero images, modern displays
 * - ultrawide (21:9): Cinematic content, banner images
 * - vertical (9:16): Mobile stories, vertical videos
 * - portraitPhoto (2:3): Portrait photography
 * - portraitDisplay (3:4): Traditional portrait displays
 *
 * LAYOUT STRATEGY:
 * Use aspect-ratio CSS property to prevent layout shift during image loading.
 * Choose ratios that match your content source for best results.
 */
export const aspectRatio = {
  square: "1 / 1", // Square
  traditionalPhotoMonitor: "4 / 3", // Traditional photo/monitor
  classicPhotography: "3 / 2", // Classic photography
  widescreenVideo: "16 / 9", // Widescreen video
  ultrawide: "21 / 9", // Ultrawide
  vertical: "9 / 16", // Vertical video (stories)
  portraitPhoto: "2 / 3", // Portrait photo
  portraitDisplay: "3 / 4", // Portrait display
} as const;

export type AspectRatio = typeof aspectRatio;
export type AspectRatioKey = keyof AspectRatio;
