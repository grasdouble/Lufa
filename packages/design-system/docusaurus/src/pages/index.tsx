import type { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import tokens from '@grasdouble/lufa_design-system-tokens/values';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link
            className="button button--outline button--lg"
            to="/docs/getting-started/installation"
            style={{ marginLeft: tokens.primitive.spacing['16'] }}
          >
            Installation Guide
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageStatistics() {
  return (
    <section className={styles.statistics} aria-label="Design system statistics">
      <div className="container">
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <h3 className={styles.statNumber}>50+</h3>
            <p className={styles.statLabel}>Components</p>
          </div>
          <div className={styles.stat}>
            <h3 className={styles.statNumber}>WCAG AA</h3>
            <p className={styles.statLabel}>Compliant</p>
          </div>
          <div className={styles.stat}>
            <h3 className={styles.statNumber}>TypeScript</h3>
            <p className={styles.statLabel}>First</p>
          </div>
          <div className={styles.stat}>
            <h3 className={styles.statNumber}>Tree Shakeable</h3>
            <p className={styles.statLabel}>Optimized</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageQuickStart() {
  return (
    <section className={styles.quickStart} aria-label="Quick start guide">
      <div className="container">
        <h2 className={styles.sectionTitle}>Get Started in Seconds</h2>
        <p className={styles.sectionSubtitle}>
          Install the package and start building accessible interfaces immediately.
        </p>
        <div className={styles.codeBlockWrapper}>
          <CodeBlock language="bash" title="Install via pnpm">
            pnpm add @grasdouble/lufa_design-system
          </CodeBlock>
          <CodeBlock language="tsx" title="src/App.tsx">
            {`import { Button } from '@grasdouble/lufa_design-system';

function App() {
  return <Button variant="solid" color="primary">Click me</Button>;
}`}
          </CodeBlock>
        </div>
        <div className={styles.quickStartTip}>
          <p>
            💡 <strong>Tip:</strong> Try switching to dark mode using the toggle in the navbar to see all components
            adapt automatically!
          </p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Modern React Component Library`}
      description="A modern, accessible design system built with React and CSS design tokens. Component library with theming support and comprehensive documentation."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageStatistics />
        <HomepageQuickStart />
      </main>
    </Layout>
  );
}
