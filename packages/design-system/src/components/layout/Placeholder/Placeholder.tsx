import { ReactNode } from 'react';
import styles from './Placeholder.module.css';

export interface PlaceholderProps {
    children?: ReactNode;
    /** Background color (any valid CSS color) */
    color?: string;
    /** Height variant */
    height?: 'small' | 'medium' | 'large' | 'auto' | 'full';
    /** Width variant */
    width?: 'auto' | 'small' | 'medium' | 'large' | 'full';
}

export const Placeholder = ({ children, color, height = 'medium', width = 'auto' }: PlaceholderProps) => {
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

    return (
        <div className={className} style={color ? { backgroundColor: color, backgroundImage: 'none' } : undefined}>
            {children}
        </div>
    );
};
