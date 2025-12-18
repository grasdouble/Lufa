import React from 'react';
import styles from './Spinner.module.css';
import clsx from 'clsx';

type SpinnerProps = {
  size?: 'small' | 'medium' | 'large';
  mode?: 'A' | 'B';
};

const spinners = {
  A: <path d="M25 5a20 20 0 1 1-20 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"></path>,
  B: (
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray="31.4 31.4"
      strokeLinecap="round"
    ></circle>
  ),
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'medium', mode = 'A' }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        className={clsx(styles.spinner, styles[`spinner-${size}`])}
        role="status"
        aria-live="polite"
        aria-label="Loading"
      >
        {spinners[mode]}
      </svg>
    </>
  );
};
