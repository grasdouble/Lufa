import { ReactNode } from 'react';
import styles from './Placeholder.module.css';

export const Placeholder = ({ children }: { children?: ReactNode }) => {
    return <div className={styles.placeholder}>{children}</div>;
};
