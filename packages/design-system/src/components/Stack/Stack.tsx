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

interface StackProps {
    children: ReactNode;
    gap?: keyof typeof STACK_GAP; // Need to add ResponsiveValue<keyof typeof STACK_GAP> ??
    direction?: keyof typeof STACK_DIRECTION; // Need to add ResponsiveValue<keyof typeof STACK_DIRECTION> ??
    align?: keyof typeof STACK_ALIGN; // Need to add ResponsiveValue<keyof typeof STACK_ALIGN> ??
    wrap?: keyof typeof STACK_WRAP; // Need to add ResponsiveValue<keyof typeof STACK_WRAP> ??
    justify?: keyof typeof STACK_JUSTIFY; // Need to add ResponsiveValue<keyof typeof STACK_JUSTIFY> ??
    padding?: keyof typeof STACK_PADDING; // Need to add ResponsiveValue<keyof typeof STACK_PADDING> ??
    //className: string; // Not sure to add it
}

interface StackItemProps {
    grow?: boolean; // Need to add ResponsiveValue<boolean> ??
    //className: string; // Not sure to add it
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
                styles[`direction-${gap}`],
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

export const StackItem = (): StackItemProps => {
    return {};
};
