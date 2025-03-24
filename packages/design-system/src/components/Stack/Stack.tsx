import clsx from 'clsx';
import styles from './Stack.module.css';

import { ReactNode } from 'react';

interface StackProps {
    children: ReactNode;
    gap?: 'none' | 'condensed' | 'normal' | 'spacious'; // Need to add  ResponsiveValue<'none' | 'condensed' | 'normal' | 'spacious'> ??
    direction?: 'horizontal' | 'vertical';
    align?: 'stretch' | 'start' | 'center' | 'end' | 'baseline'; // Need to add ResponsiveValue<'strech' | 'start' | 'center' | 'end' | 'baseline'> ??   ;
    wrap?: 'wrap' | 'nowrap'; // Need to add ResponsiveValue<'wrap' | 'nowrap'> ??
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-evenly'; // Need to add ResponsiveValue<'start' | 'center' | 'end' | 'space-between' | 'space-evenly'> ??
    padding?: 'none' | 'condensed' | 'normal' | 'spacious'; // Need to add ResponsiveValue<'none' | 'condensed' | 'normal' | 'spacious'> ??
    //className: string; // Not sure to add it
}

interface StackItemProps {
    grow?: boolean; // Need to add ResponsiveValue<boolean> ??
    //className: string; // Not sure to add it
}

export const Stack = ({
    children,
    direction = 'vertical',
    align = 'stretch',
    wrap = 'nowrap',
    justify = 'start',
    padding = 'none',
}: StackProps) => {
    return (
        <div
            className={clsx(
                styles.stack,
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
