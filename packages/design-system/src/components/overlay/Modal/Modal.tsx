import { ReactNode, useEffect } from 'react';
import styles from './Modal.module.css';

export interface ModalProps {
    /** Modal content */
    children: ReactNode;
    /** Whether modal is visible */
    open: boolean;
    /** Close handler */
    onClose: () => void;
    /** Modal title */
    title?: string;
    /** Modal size */
    size?: 'small' | 'medium' | 'large' | 'fullscreen';
    /** Footer content */
    footer?: ReactNode;
    /** Close on backdrop click */
    closeOnBackdropClick?: boolean;
    /** Close on escape key */
    closeOnEscape?: boolean;
    /** Additional CSS classes */
    className?: string;
}

export const Modal = ({
    children,
    open,
    onClose,
    title,
    size = 'medium',
    footer,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    className = '',
}: ModalProps) => {
    useEffect(() => {
        if (!open || !closeOnEscape) return;

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeOnEscape, onClose]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    if (!open) return null;

    const sizeClass = {
        small: styles.sizeSmall,
        medium: styles.sizeMedium,
        large: styles.sizeLarge,
        fullscreen: styles.sizeFullscreen,
    }[size];

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={`${styles.modal} ${sizeClass} ${className}`.trim()}>
                {title && (
                    <div className={styles.header}>
                        <h3 className={styles.title}>{title}</h3>
                        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                )}
                <div className={styles.content}>{children}</div>
                {footer && <div className={styles.footer}>{footer}</div>}
            </div>
        </div>
    );
};
