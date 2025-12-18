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
};

export const Placeholder = ({
  children,
  color,
  colorFrom,
  colorTo,
  height = 'medium',
  width = 'auto',
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

  const className = `${styles.placeholder} ${heightClass} ${widthClass}`;

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
