import clsx from 'clsx';
import styles from './Stack.module.css';

import { ReactNode } from 'react';
import {
    STACK_ALIGN,
    STACK_DIRECTION,
    STACK_GAP,
    STACK_JUSTIFY,
    STACK_PADDING,
    STACK_WRAP,
} from './Stack.constants';

export interface StackProps {
    children: ReactNode;
    gap?: keyof typeof STACK_GAP;
    direction?: keyof typeof STACK_DIRECTION;
    align?: keyof typeof STACK_ALIGN;
    wrap?: keyof typeof STACK_WRAP;
    justify?: keyof typeof STACK_JUSTIFY;
    padding?: keyof typeof STACK_PADDING;
}

export const Stack = ({
    gap = STACK_GAP.normal,
    direction = STACK_DIRECTION.vertical,
    align = STACK_ALIGN.stretch,
    wrap = STACK_WRAP.nowrap,
    justify = STACK_JUSTIFY.start,
    padding = STACK_PADDING.none,
    children,
}: StackProps) => {
    return (
        <div
            className={clsx(
                styles[`gap-${gap}`],
                styles[`direction-${direction}`],
                styles[`align-${align}`],
                styles[`wrap-${wrap}`],
                styles[`justify-${justify}`],
                styles[`padding-${padding}`]
            )}
        >
            {children}
        </div>
    );
};
