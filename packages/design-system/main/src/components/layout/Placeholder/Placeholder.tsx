import type { ReactNode } from 'react';

import styles from './Placeholder.module.css';

export type PlaceholderProps = {
  children?: ReactNode;
  /** Background color (any valid CSS color) - creates solid background */
  color?: string;
  /** Gradient start color (requires 'colorTo' to create gradient) */
  colorFrom?: string;
  /** Gradient end color (requires 'colorFrom' to create gradient) */
  colorTo?: string;
  /** Height variant */
  height?: 'small' | 'medium' | 'large' | 'auto' | 'full';
  /** Width variant */
  width?: 'auto' | 'small' | 'medium' | 'large' | 'full';
  /**
   * Text color override - use when automatic detection fails (e.g., with CSS variables)
   * @default undefined (auto-detect based on background)
   */
  textColor?: 'light' | 'dark';
};

/**
 * Calculate relative luminance of a color
 * Based on WCAG 2.1 relative luminance formula
 * @see https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(color: string): number {
  // Handle CSS custom properties - extract the variable value if possible
  if (color.startsWith('var(')) {
    // For CSS variables, we can't compute luminance at runtime
    // Default to assuming medium/dark backgrounds (most design system tokens)
    // Return low luminance to trigger light text (which is more common for branded colors)
    return 0.5;
  }

  // Handle oklch() format: oklch(L C H)
  const oklchRegex = /oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+([\d.]+)\s*\)/;
  const oklchMatch = oklchRegex.exec(color);
  if (oklchMatch) {
    // Extract lightness (first value in OKLCH)
    let lightness = parseFloat(oklchMatch[1]);
    // If percentage, convert to 0-1 range
    if (oklchMatch[1].includes('%')) {
      lightness = lightness / 100;
    }
    // OKLCH lightness is already in 0-1 range representing perceptual lightness
    return lightness;
  }

  // Handle hex colors: #RGB or #RRGGBB
  const hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
  const hexMatch = hexRegex.exec(color);
  if (hexMatch) {
    let hex = hexMatch[1];
    // Expand shorthand (#RGB to #RRGGBB)
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    // Apply gamma correction
    const gammaCorrect = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    // Calculate relative luminance
    return 0.2126 * gammaCorrect(r) + 0.7152 * gammaCorrect(g) + 0.0722 * gammaCorrect(b);
  }

  // Handle rgb() and rgba() formats
  const rgbRegex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/;
  const rgbMatch = rgbRegex.exec(color);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]) / 255;
    const g = parseInt(rgbMatch[2]) / 255;
    const b = parseInt(rgbMatch[3]) / 255;

    const gammaCorrect = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    return 0.2126 * gammaCorrect(r) + 0.7152 * gammaCorrect(g) + 0.0722 * gammaCorrect(b);
  }

  // Fallback: assume medium luminance (will use light text)
  return 0.5;
}

/**
 * Determine if text should be light or dark based on background color
 * Uses WCAG 2.1 contrast threshold
 */
function shouldUseLightText(backgroundColor: string): boolean {
  const luminance = getRelativeLuminance(backgroundColor);
  // Use light text (white) if luminance is below 0.5
  // This ensures good contrast for most backgrounds
  return luminance < 0.5;
}

export const Placeholder = ({
  children,
  color,
  colorFrom,
  colorTo,
  height = 'medium',
  width = 'auto',
  textColor,
}: PlaceholderProps) => {
  const heightClass = {
    small: styles.heightSmall,
    medium: styles.heightMedium,
    large: styles.heightLarge,
    auto: styles.heightAuto,
    full: styles.heightFull,
  }[height];

  const widthClass = {
    auto: styles.widthAuto,
    small: styles.widthSmall,
    medium: styles.widthMedium,
    large: styles.widthLarge,
    full: styles.widthFull,
  }[width];

  // Determine text color class
  let textColorClass = '';

  if (textColor === 'light') {
    // Explicit light text override
    textColorClass = styles.textLight;
  } else if (textColor === 'dark') {
    // Explicit dark text override
    textColorClass = styles.textDark;
  } else if (color) {
    // For solid colors, calculate appropriate text color
    textColorClass = shouldUseLightText(color) ? styles.textLight : styles.textDark;
  } else if (colorFrom && colorTo) {
    // For gradients, use the start color to determine text color
    textColorClass = shouldUseLightText(colorFrom) ? styles.textLight : styles.textDark;
  }

  const className = `${styles.placeholder} ${heightClass} ${widthClass} ${textColorClass}`.trim();

  // Determine custom styles
  let customStyle: React.CSSProperties | undefined;

  if (colorFrom && colorTo) {
    // Custom gradient
    customStyle = {
      backgroundImage: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})`,
    };
  } else if (color) {
    // Solid color
    customStyle = {
      backgroundColor: color,
      backgroundImage: 'none',
    };
  }

  return (
    <div className={className} style={customStyle}>
      {children}
    </div>
  );
};
