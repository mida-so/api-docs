import React from 'react';
import ApiPlayground from '@site/src/components/ApiPlayground';
import AskAiButton from '@site/src/components/AskAiButton';
import styles from './styles.module.css';

export default function ApiEndpointLayout({
  title,
  method,
  endpoint,
  description,
  playgroundUrl,
  defaultHeaders = {},
  defaultBody = null,
  children,
}) {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <header className={styles.headerCard}>
          <div className={styles.titleRow}>
            <h1 className={styles.title}>{title}</h1>
            <AskAiButton pageTitle={title} method={method} endpoint={endpoint} description={description} />
          </div>
          <div className={styles.endpointRow}>
            <span className={`${styles.methodBadge} ${styles[`method${method.toUpperCase()}`]}`}>
              {method.toUpperCase()}
            </span>
            <code className={styles.endpointPath}>{endpoint}</code>
          </div>
          {description ? <p className={styles.description}>{description}</p> : null}
        </header>
        <section className={styles.contentCard}>{children}</section>
      </div>

      <aside className={styles.right}>
        <div className={styles.stickyBox}>
          <ApiPlayground
            method={method}
            url={playgroundUrl}
            defaultHeaders={defaultHeaders}
            defaultBody={defaultBody}
            title="Send API Request"
          />
        </div>
      </aside>
    </div>
  );
}
