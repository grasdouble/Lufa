import type { ReactNode } from 'react';
import TokensSvg from '@site/static/img/undraw_docusaurus_mountain.svg';
import ReactSvg from '@site/static/img/undraw_docusaurus_react.svg';
import AccessibleSvg from '@site/static/img/undraw_docusaurus_tree.svg';
import clsx from 'clsx';

import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Built with React',
    Svg: ReactSvg,
    description: (
      <>
        Modern React components built with TypeScript, providing full type safety and excellent developer experience
        with IntelliSense support.
      </>
    ),
  },
  {
    title: 'Design Tokens',
    Svg: TokensSvg,
    description: (
      <>
        Semantic design tokens powered by CSS variables. Customize colors, spacing, typography, and more. Built-in light
        and dark mode support.
      </>
    ),
  },
  {
    title: 'Accessible by Default',
    Svg: AccessibleSvg,
    description: (
      <>
        WCAG 2.1 AA compliant components with keyboard navigation, screen reader support, and semantic HTML.
        Accessibility is built in, not bolted on.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" aria-label={`${title} illustration`} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features} aria-label="Key features">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
