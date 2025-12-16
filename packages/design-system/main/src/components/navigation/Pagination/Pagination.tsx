import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.css';

export interface PaginationProps {
    /** Current page number (1-indexed) */
    current: number;
    /** Total number of items */
    total: number;
    /** Number of items per page */
    pageSize?: number;
    /** Page change handler */
    onChange?: (page: number) => void;
    /** Show quick jumper */
    showQuickJumper?: boolean;
    /** Show size changer */
    showSizeChanger?: boolean;
    /** Size options */
    pageSizeOptions?: number[];
    /** Page size change handler */
    onPageSizeChange?: (pageSize: number) => void;
    /** Size variant */
    size?: 'small' | 'medium' | 'large';
    /** Additional CSS class */
    className?: string;
    /** Custom previous button text */
    prevText?: ReactNode;
    /** Custom next button text */
    nextText?: ReactNode;
}

/**
 * Pagination component for navigating through pages
 * Supports quick jumper and page size selector
 */
export const Pagination = ({
    current,
    total,
    pageSize = 10,
    onChange,
    showQuickJumper = false,
    showSizeChanger = false,
    pageSizeOptions = [10, 20, 50, 100],
    onPageSizeChange,
    size = 'medium',
    className = '',
    prevText = '←',
    nextText = '→',
}: PaginationProps) => {
    const totalPages = Math.ceil(total / pageSize);

    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages || page === current) return;
        onChange?.(page);
    };

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value, 10);
        onPageSizeChange?.(newSize);
        // Reset to page 1 when changing page size
        onChange?.(1);
    };

    const getPageNumbers = () => {
        const pages: (number | 'ellipsis')[] = [];
        const showEllipsis = totalPages > 7;

        if (!showEllipsis) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (current <= 3) {
                // Near the beginning
                pages.push(2, 3, 4, 'ellipsis', totalPages);
            } else if (current >= totalPages - 2) {
                // Near the end
                pages.push('ellipsis', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // In the middle
                pages.push('ellipsis', current - 1, current, current + 1, 'ellipsis', totalPages);
            }
        }

        return pages;
    };

    const sizeClass = {
        small: styles.sizeSmall,
        medium: styles.sizeMedium,
        large: styles.sizeLarge,
    }[size];

    const classNames = clsx(styles.pagination, sizeClass, className);

    return (
        <div className={classNames}>
            <nav className={styles.nav} aria-label="Pagination">
                <button
                    className={clsx(styles.button, styles.prev)}
                    onClick={() => handlePageChange(current - 1)}
                    disabled={current === 1}
                    aria-label="Previous page"
                >
                    {prevText}
                </button>

                {getPageNumbers().map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                                ...
                            </span>
                        );
                    }

                    return (
                        <button
                            key={page}
                            className={clsx(styles.button, styles.page, current === page && styles.active)}
                            onClick={() => handlePageChange(page)}
                            aria-label={`Page ${page}`}
                            aria-current={current === page ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    );
                })}

                <button
                    className={clsx(styles.button, styles.next)}
                    onClick={() => handlePageChange(current + 1)}
                    disabled={current === totalPages}
                    aria-label="Next page"
                >
                    {nextText}
                </button>
            </nav>

            {showSizeChanger && (
                <div className={styles.sizeChanger}>
                    <select className={styles.select} value={pageSize} onChange={handleSizeChange} aria-label="Items per page">
                        {pageSizeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option} / page
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {showQuickJumper && (
                <div className={styles.quickJumper}>
                    <span>Go to</span>
                    <input
                        type="number"
                        className={styles.input}
                        min={1}
                        max={totalPages}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const value = parseInt((e.target as HTMLInputElement).value, 10);
                                if (value >= 1 && value <= totalPages) {
                                    handlePageChange(value);
                                    (e.target as HTMLInputElement).value = '';
                                }
                            }
                        }}
                        aria-label="Jump to page"
                    />
                </div>
            )}
        </div>
    );
};

Pagination.displayName = 'Pagination';
