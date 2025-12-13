/**
 * Aspect ratio primitives with descriptive keys indicating the visual shape.
 * Keys describe the ratio type, not usage context. This allows flexibility for
 * different token layers to add semantic meaning based on their specific needs.
 *
 * SCOPE: Global - Primitives for media containers and responsive images
 *
 * RATIOS:
 * - square: 1 / 1 - Equal width and height
 * - traditionalPhotoMonitor: 4 / 3 - Classic displays and presentations
 * - classicPhotography: 3 / 2 - Traditional photography format
 * - widescreenVideo: 16 / 9 - Modern video and display standard
 * - ultrawide: 21 / 9 - Cinematic widescreen format
 * - vertical: 9 / 16 - Vertical video format
 * - portraitPhoto: 2 / 3 - Portrait photography format
 * - portraitDisplay: 3 / 4 - Traditional portrait display format
 *
 * USAGE:
 * These primitives can be referenced directly or mapped to semantic tokens.
 * Use with CSS aspect-ratio property to prevent layout shift during media loading.
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

export type AspectRatio = keyof typeof aspectRatio;
