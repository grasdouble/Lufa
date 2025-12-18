import type { ReactNode } from 'react';
import clsx from 'clsx';

import styles from './Divider.module.css';

export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'solid' | 'dashed';
export type DividerAlign = 'start' | 'center' | 'end';
export type DividerSpacing = 'none' | 'sm' | 'md' | 'lg';

export type DividerProps = {
  /** Optional label rendered between the lines */
  label?: ReactNode;
  /** Divider direction */
  orientation?: DividerOrientation;
  /** Label alignment for horizontal dividers */
  align?: DividerAlign;
  /** Solid or dashed line */
  variant?: DividerVariant;
  /** Outer spacing */
  spacing?: DividerSpacing;
  /** Additional class names */
  className?: string;
  /** Limit the rendered length (width for horizontal, height for vertical) */
  length?: number | string;
};

const toCssLength = (value?: string | number) => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

/** Simple separator with optional label and orientation support */
export const Divider = ({
  label,
  orientation = 'horizontal',
  align = 'center',
  variant = 'solid',
  spacing = 'md',
  className,
  length,
}: DividerProps) => {
  const isHorizontal = orientation === 'horizontal';

  const spacingClass = {
    none: styles.spacingNone,
    sm: styles.spacingSm,
    md: styles.spacingMd,
    lg: styles.spacingLg,
  }[spacing];

  const alignClass = isHorizontal
    ? {
        start: styles.alignStart,
        center: styles.alignCenter,
        end: styles.alignEnd,
      }[align]
    : undefined;

  const wrapperClassName = clsx(
    styles.divider,
    isHorizontal ? styles.horizontal : styles.vertical,
    spacingClass,
    alignClass,
    className
  );

  const lineClassName = clsx(
    styles.line,
    isHorizontal ? styles.lineHorizontal : styles.lineVertical,
    variant === 'dashed' ? styles.variantDashed : styles.variantSolid
  );

  const inlineStyle = isHorizontal
    ? length !== undefined
      ? { width: toCssLength(length) }
      : undefined
    : length !== undefined
      ? { height: toCssLength(length) }
      : undefined;

  return (
    <div className={wrapperClassName} role="separator" aria-orientation={orientation} style={inlineStyle}>
      {isHorizontal ? (
        <>
          <span className={lineClassName} aria-hidden />
          {label && <span className={styles.label}>{label}</span>}
          <span className={lineClassName} aria-hidden />
        </>
      ) : (
        <span className={lineClassName} aria-hidden />
      )}
    </div>
  );
};
