import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <span className={styles.heroEyebrow}>Mida Developer Platform</span>
        <Heading as="h1" className={styles.heroTitle}>
          Ship faster with the Mida API
        </Heading>
        <p className={styles.heroSubtitle}>
          Clear reference docs for experiments, goals, events, and reporting so
          your team can integrate with confidence.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Open V2 API Docs
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="V2 API Docs"
      description="Developer-friendly Mida API documentation for experiments, goals, events, and reporting endpoints.">
      <HomepageHeader />
    </Layout>
  );
}
