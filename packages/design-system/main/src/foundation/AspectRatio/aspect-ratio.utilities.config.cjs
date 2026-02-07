/**
 * CSS Utilities Configuration for AspectRatio Component
 *
 * This configuration defines the utility classes for the AspectRatio component.
 * Classes are generated for common aspect ratios using the padding-top percentage technique.
 *
 * Generated CSS will be in AspectRatio.module.css
 *
 * Technique: Uses padding-top percentage to maintain aspect ratio
 * - For 16:9 (1.777...) → padding-top: 56.25%
 * - For 4:3 (1.333...) → padding-top: 75%
 * - For 1:1 → padding-top: 100%
 * Formula: padding-top = (height / width) * 100%
 */

module.exports = {
  component: 'AspectRatio',
  outputFile: 'AspectRatio.module.css',

  // Base styles applied to all aspect ratio containers
  base: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },

  utilities: {
    // ==========================================
    // COMMON RATIO VALUES
    // Pre-generate CSS classes for common ratios
    // ==========================================
    ratio: {
      property: 'padding-top',
      values: {
        // Video & Media Ratios
        '16-9': '56.25%', // 16/9 = 1.777... → (9/16)*100 = 56.25% - Standard widescreen
        '4-3': '75%', // 4/3 = 1.333... → (3/4)*100 = 75% - Classic video
        '21-9': '42.857%', // 21/9 = 2.333... → (9/21)*100 = 42.857% - Ultrawide

        // Photography Ratios
        '3-2': '66.667%', // 3/2 = 1.5 → (2/3)*100 = 66.667% - Classic photo
        '1-1': '100%', // 1/1 = 1 → (1/1)*100 = 100% - Square

        // Portrait/Vertical Ratios
        '9-16': '177.778%', // 9/16 = 0.5625 → (16/9)*100 = 177.778% - Vertical video
        '3-4': '133.333%', // 3/4 = 0.75 → (4/3)*100 = 133.333% - Portrait photo
      },
    },
  },

  // Custom classes for special cases
  custom: {
    // Base container class
    'aspect-ratio': {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },

    // Content wrapper (absolutely positioned to fill container)
    'aspect-ratio-content': {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
    },

    // For custom ratios using CSS variable
    'aspect-ratio:has([style*="--aspect-ratio-padding"])': {
      'padding-top': 'var(--aspect-ratio-padding)',
    },
  },
};
