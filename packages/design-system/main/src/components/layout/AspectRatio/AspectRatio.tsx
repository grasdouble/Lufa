import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes, ReactNode } from 'react';
import styles from './AspectRatio.module.css';
import { ASPECT_RATIO } from './AspectRatio.constants';

export type AspectRatioValue = keyof typeof ASPECT_RATIO | number | string;

type AspectRatioElement = 'div' | 'figure';

export interface AspectRatioProps extends HTMLAttributes<HTMLElement> {
  /** The HTML element to render */
  as?: AspectRatioElement;
  /** Aspect ratio (token key, number ratio, or CSS ratio string like "16 / 9") */
  ratio?: AspectRatioValue;
  /** Content */
  children?: ReactNode;
}

const isTokenRatio = (ratio: AspectRatioValue): ratio is keyof typeof ASPECT_RATIO =>
  typeof ratio === 'string' && ratio in ASPECT_RATIO;

/** Media container that preserves aspect ratio and prevents layout shift */
export const AspectRatio = forwardRef<HTMLElement, AspectRatioProps>(
  ({ as = 'div', ratio = ASPECT_RATIO.video, className, style, children, ...props }, ref) => {
    const Component = as as ElementType;

    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={clsx(styles.aspectRatio, isTokenRatio(ratio) && styles[`ratio-${ratio}`], className)}
        style={{
          ...style,
          aspectRatio: isTokenRatio(ratio) ? undefined : ratio,
        }}
        {...props}
      >
        <div className={styles.content}>{children}</div>
      </Component>
    );
  }
);

AspectRatio.displayName = 'AspectRatio';
