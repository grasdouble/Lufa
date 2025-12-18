import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Steps.module.css';

export interface StepItem {
  /** Step title */
  title: string;
  /** Step description */
  description?: string;
  /** Custom icon */
  icon?: ReactNode;
  /** Step status */
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface StepsProps {
  /** Array of step items */
  items: StepItem[];
  /** Current step index (0-indexed) */
  current?: number;
  /** Steps direction */
  direction?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'small' | 'default';
  /** Additional CSS class */
  className?: string;
  /** Step click handler */
  onChange?: (current: number) => void;
}

/**
 * Steps component for displaying progress through a sequence
 * Use for multi-step processes, wizards, or progress tracking
 */
export const Steps = ({
  items,
  current = 0,
  direction = 'horizontal',
  size = 'default',
  className = '',
  onChange,
}: StepsProps) => {
  const getStepStatus = (index: number): StepItem['status'] => {
    const item = items[index];
    if (item.status) return item.status;
    if (index < current) return 'finish';
    if (index === current) return 'process';
    return 'wait';
  };

  const directionClass = {
    horizontal: styles.directionHorizontal,
    vertical: styles.directionVertical,
  }[direction];

  const sizeClass = {
    small: styles.sizeSmall,
    default: styles.sizeDefault,
  }[size];

  const classNames = clsx(styles.steps, directionClass, sizeClass, className);

  return (
    <div className={classNames}>
      {items.map((item, index) => {
        const status = getStepStatus(index);
        const isClickable = onChange && index !== current;

        const statusClass = status
          ? {
              wait: styles.statusWait,
              process: styles.statusProcess,
              finish: styles.statusFinish,
              error: styles.statusError,
            }[status]
          : styles.statusWait;

        const stepClassNames = clsx(styles.step, statusClass, isClickable && styles.clickable);

        const handleClick = () => {
          if (isClickable) {
            onChange(index);
          }
        };

        return (
          <div
            key={index}
            className={stepClassNames}
            onClick={handleClick}
            role={isClickable ? 'button' : undefined}
            tabIndex={isClickable ? 0 : undefined}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <div className={styles.stepIcon}>
              {item.icon ? (
                <span className={styles.customIcon}>{item.icon}</span>
              ) : (
                <span className={styles.stepNumber}>{status === 'finish' ? '✓' : index + 1}</span>
              )}
            </div>

            <div className={styles.stepContent}>
              <div className={styles.stepTitle}>{item.title}</div>
              {item.description && <div className={styles.stepDescription}>{item.description}</div>}
            </div>

            {index < items.length - 1 && <div className={styles.stepConnector} aria-hidden="true" />}
          </div>
        );
      })}
    </div>
  );
};

Steps.displayName = 'Steps';
