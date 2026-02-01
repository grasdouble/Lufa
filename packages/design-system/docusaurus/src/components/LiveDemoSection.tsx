import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import styles from './LiveDemoSection.module.css';

type LiveDemoTab = {
  id?: string;
  label: string;
  content: React.ReactNode;
};

type LiveDemoSectionProps = {
  title?: string;
  children?: React.ReactNode;
  tabs?: LiveDemoTab[];
  defaultTabId?: string;
};

export function LiveDemoSection({ title = 'Live demo', children, tabs, defaultTabId }: LiveDemoSectionProps) {
  const { colorMode } = useColorMode();
  const sectionId = React.useId();
  const resolvedTabs = tabs?.filter((tab) => tab && tab.content != null) ?? [];
  const hasTabs = resolvedTabs.length > 0;
  const initialIndex = hasTabs
    ? Math.max(
        0,
        resolvedTabs.findIndex((tab) => tab.id === defaultTabId)
      )
    : 0;
  const [activeIndex, setActiveIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    document.documentElement.dataset.mode = colorMode;
  }, [colorMode]);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>{title}</span>
        <span className={styles.badge}>Interactive</span>
      </div>
      {hasTabs ? (
        <div className={styles.tabs}>
          <div className={styles.tabList} role="tablist" aria-label={title}>
            {resolvedTabs.map((tab, index) => {
              const tabId = tab.id ?? `tab-${index}`;
              const buttonId = `${sectionId}-${tabId}`;
              const panelId = `${sectionId}-${tabId}-panel`;
              const isActive = index == activeIndex;

              return (
                <button
                  key={tabId}
                  id={buttonId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  className={isActive ? styles.tabButtonActive : styles.tabButton}
                  onClick={() => setActiveIndex(index)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
          <div
            className={styles.body}
            role="tabpanel"
            id={`${sectionId}-${resolvedTabs[activeIndex]?.id ?? `tab-${activeIndex}`}-panel`}
            aria-labelledby={`${sectionId}-${resolvedTabs[activeIndex]?.id ?? `tab-${activeIndex}`}`}
          >
            {resolvedTabs[activeIndex]?.content}
          </div>
        </div>
      ) : (
        <div className={styles.body}>{children}</div>
      )}
    </section>
  );
}

export default LiveDemoSection;
