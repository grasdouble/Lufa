import { forwardRef, HTMLAttributes } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'src'> {
    /** Image source URL (not used for count variant) */
    src?: string;
    /** Alternative text for the image */
    alt?: string;
    /** Avatar size */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /** Shape variant */
    variant?: 'circle' | 'square' | 'count';
    /** Status indicator color (not used for count variant) */
    status?: 'online' | 'offline' | 'away' | 'busy' | 'none';
    /** Status indicator position */
    statusPosition?: 'top' | 'bottom';
    /** Count text to display (only for count variant) */
    count?: string | number;
}

/** Modern Avatar component for displaying user profile images with status indicators or count */
export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            src,
            alt = 'Avatar',
            size = 'md',
            variant = 'circle',
            status = 'none',
            statusPosition = 'bottom',
            count,
            className = '',
            ...props
        },
        ref
    ) => {
        const isCountVariant = variant === 'count';

        const avatarClasses = [
            styles.avatar,
            styles[`size-${size}` as keyof typeof styles],
            styles[`variant-${variant}` as keyof typeof styles],
            className,
        ]
            .filter(Boolean)
            .join(' ');

        const statusClasses = [
            styles.status,
            styles[`status-${status}` as keyof typeof styles],
            styles[`status-size-${size}` as keyof typeof styles],
            styles[`status-position-${statusPosition}` as keyof typeof styles],
            variant === 'square' ? styles['status-square'] : '',
        ]
            .filter(Boolean)
            .join(' ');

        return (
            <span className={styles.container} ref={ref} {...props}>
                {isCountVariant ? <div className={avatarClasses}>{count}</div> : <img src={src} alt={alt} className={avatarClasses} />}
                {!isCountVariant && status && status !== 'none' && <span className={statusClasses} aria-label={`Status: ${status}`} />}
            </span>
        );
    }
);

Avatar.displayName = 'Avatar';
