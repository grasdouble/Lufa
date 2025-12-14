import clsx from 'clsx';
import { ElementType, forwardRef, HTMLAttributes } from 'react';
import styles from './Space.module.css';
import { SPACE_DIRECTION, SPACE_SIZE } from './Space.constants';

export type SpaceSize = keyof typeof SPACE_SIZE | number | string;
export type SpaceDirection = keyof typeof SPACE_DIRECTION;

type SpaceElement = 'div' | 'span';

export interface SpaceProps extends HTMLAttributes<HTMLElement> {
    /** The HTML element to render */
    as?: SpaceElement;
    /** Spacer direction */
    direction?: SpaceDirection;
    /** Spacer size (token key, px number, or CSS length string) */
    size?: SpaceSize;
}

const toCssLength = (value: SpaceSize | undefined) => {
    if (value === undefined) return undefined;
    if (typeof value === 'number') return `${value}px`;
    if (typeof value === 'string' && value in SPACE_SIZE) return `var(--lufa-spacing-${value})`;
    return value;
};

/** Simple spacer element to add fixed horizontal/vertical space */
export const Space = forwardRef<HTMLElement, SpaceProps>(
    ({ as = 'div', direction = SPACE_DIRECTION.vertical, size = SPACE_SIZE.md, className, style, ...props }, ref) => {
        const Component = as as ElementType;
        const spaceSize = toCssLength(size);

        return (
            <Component
                ref={ref as React.Ref<HTMLElement>}
                className={clsx(styles.space, direction === SPACE_DIRECTION.horizontal ? styles.horizontal : styles.vertical, className)}
                style={{ ...style, ['--lufa-space-size' as string]: spaceSize }}
                aria-hidden={props['aria-hidden'] ?? true}
                {...props}
            />
        );
    }
);

Space.displayName = 'Space';

