import { ReactNode, useId, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './Tabs.module.css';

export interface TabItem {
  /** Unique key for the tab */
  key: string;
  /** Tab label */
  label: string;
  /** Tab content */
  children?: ReactNode;
  /** Icon before label */
  icon?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tab items */
  items: TabItem[];
  /** Active tab key */
  activeKey?: string;
  /** Default active tab key */
  defaultActiveKey?: string;
  /** Tab change handler */
  onChange?: (key: string) => void;
  /** Tab type */
  type?: 'line' | 'card' | 'pill';
  /** Tab position */
  tabPosition?: 'top' | 'bottom' | 'left' | 'right';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Additional CSS class */
  className?: string;
}

/**
 * Tabs component for organizing content into separate views
 * Supports multiple types and positions with keyboard navigation
 */
export const Tabs = ({
  items,
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  type = 'line',
  tabPosition = 'top',
  size = 'medium',
  className = '',
}: TabsProps) => {
  const instanceId = useId();
  const tabButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [internalActiveKey, setInternalActiveKey] = useState(defaultActiveKey || items[0]?.key);

  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : internalActiveKey;

  const getTabId = (key: string) => `${instanceId}-tab-${key}`;
  const getPanelId = (key: string) => `${instanceId}-panel-${key}`;

  const handleTabClick = (key: string, disabled?: boolean) => {
    if (disabled) return;

    if (controlledActiveKey === undefined) {
      setInternalActiveKey(key);
    }

    onChange?.(key);
  };

  const focusTabButton = (key: string) => {
    tabButtonRefs.current[key]?.focus();
  };

  const findNextEnabledIndex = (fromIndex: number, delta: number) => {
    for (let offset = 1; offset <= items.length; offset++) {
      const candidateIndex = (fromIndex + delta * offset + items.length) % items.length;
      const candidateItem = items[candidateIndex];
      if (candidateItem && !candidateItem.disabled) return candidateIndex;
    }
    return fromIndex;
  };

  const findFirstEnabledIndex = () => {
    const index = items.findIndex((item) => !item.disabled);
    return index === -1 ? 0 : index;
  };

  const findLastEnabledIndex = () => {
    for (let index = items.length - 1; index >= 0; index--) {
      if (!items[index]?.disabled) return index;
    }
    return Math.max(items.length - 1, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      newIndex = findNextEnabledIndex(index, 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      newIndex = findNextEnabledIndex(index, -1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      newIndex = findFirstEnabledIndex();
    } else if (e.key === 'End') {
      e.preventDefault();
      newIndex = findLastEnabledIndex();
    } else {
      return;
    }

    const newItem = items[newIndex];
    if (!newItem) return;

    handleTabClick(newItem.key, newItem.disabled);
    focusTabButton(newItem.key);
  };

  const typeClass = {
    line: styles.typeLine,
    card: styles.typeCard,
    pill: styles.typePill,
  }[type];

  const positionClass = {
    top: styles.positionTop,
    bottom: styles.positionBottom,
    left: styles.positionLeft,
    right: styles.positionRight,
  }[tabPosition];

  const sizeClass = {
    small: styles.sizeSmall,
    medium: styles.sizeMedium,
    large: styles.sizeLarge,
  }[size];

  const classNames = clsx(styles.tabs, typeClass, positionClass, sizeClass, className);
  const ariaOrientation = tabPosition === 'left' || tabPosition === 'right' ? 'vertical' : 'horizontal';

  return (
    <div className={classNames}>
      <div className={styles.tabList} role="tablist" aria-orientation={ariaOrientation}>
        {items.map((item, index) => {
          const isActive = item.key === activeKey;

          const tabClassNames = clsx(styles.tab, isActive && styles.tabActive, item.disabled && styles.tabDisabled);

          return (
            <button
              key={item.key}
              id={getTabId(item.key)}
              className={tabClassNames}
              ref={(element) => {
                tabButtonRefs.current[item.key] = element;
              }}
              onClick={() => handleTabClick(item.key, item.disabled)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              role="tab"
              aria-selected={isActive}
              aria-disabled={item.disabled}
              aria-controls={getPanelId(item.key)}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </button>
          );
        })}
      </div>

      {items.map((item) => {
        const isActive = item.key === activeKey;

        return (
          <div
            key={item.key}
            id={getPanelId(item.key)}
            className={styles.tabContent}
            role="tabpanel"
            aria-labelledby={getTabId(item.key)}
            hidden={!isActive}
          >
            {isActive ? item.children : null}
          </div>
        );
      })}
    </div>
  );
};

Tabs.displayName = 'Tabs';
