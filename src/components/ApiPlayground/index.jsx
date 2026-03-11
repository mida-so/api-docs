import React, {useMemo, useState} from 'react';
import styles from './styles.module.css';

const safeJsonStringify = (value) => {
  try {
    return JSON.stringify(value, null, 2);
  } catch (err) {
    return '';
  }
};

export default function ApiPlayground({
  method = 'GET',
  url = '',
  defaultHeaders = {},
  defaultBody = null,
  title = 'Send API Request',
}) {
  const [requestUrl, setRequestUrl] = useState(url);
  const [headersText, setHeadersText] = useState(safeJsonStringify(defaultHeaders));
  const [bodyText, setBodyText] = useState(
    defaultBody === null ? '' : safeJsonStringify(defaultBody)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [responseTime, setResponseTime] = useState(null);
  const hasBody = useMemo(() => ['POST', 'PATCH', 'PUT'].includes(method.toUpperCase()), [method]);

  const onSend = async () => {
    setIsLoading(true);
    setResponseStatus(null);
    setResponseText('');
    setResponseTime(null);

    try {
      const parsedHeaders = headersText.trim() ? JSON.parse(headersText) : {};
      const options = {
        method: method.toUpperCase(),
        headers: parsedHeaders,
      };

      if (hasBody) {
        if (bodyText.trim()) {
          options.body = bodyText;
        }
        if (!parsedHeaders['Content-Type']) {
          options.headers['Content-Type'] = 'application/json';
        }
      }

      const start = performance.now();
      const response = await fetch(requestUrl, options);
      const end = performance.now();
      const elapsed = Math.round(end - start);

      const contentType = response.headers.get('content-type') || '';
      let payload = '';
      if (contentType.includes('application/json')) {
        const json = await response.json();
        payload = safeJsonStringify(json);
      } else {
        payload = await response.text();
      }

      setResponseStatus(response.status);
      setResponseTime(elapsed);
      setResponseText(payload);
    } catch (err) {
      setResponseText(
        safeJsonStringify({
          error: 'Request failed',
          details: err && err.message ? err.message : String(err),
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.playgroundTitle}>{title}</div>
      <div className={styles.headerRow}>
        <span className={`${styles.methodBadge} ${styles[`method${method.toUpperCase()}`]}`}>
          {method.toUpperCase()}
        </span>
        <input
          className={styles.urlInput}
          type="text"
          value={requestUrl}
          onChange={(event) => setRequestUrl(event.target.value)}
          spellCheck={false}
        />
      </div>

      <div className={styles.grid}>
        <div className={styles.panel}>
          <h4 className={styles.title}>Headers (JSON)</h4>
          <textarea
            className={styles.textarea}
            value={headersText}
            onChange={(event) => setHeadersText(event.target.value)}
            spellCheck={false}
          />
          {hasBody && (
            <>
              <h4 className={styles.title}>Body (JSON)</h4>
              <textarea
                className={styles.textarea}
                value={bodyText}
                onChange={(event) => setBodyText(event.target.value)}
                spellCheck={false}
              />
            </>
          )}
          <button type="button" className={styles.sendBtn} onClick={onSend} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send API Request'}
          </button>
        </div>

        <div className={styles.panel}>
          <div className={styles.responseMeta}>
            <h4 className={styles.title}>Response</h4>
            <div className={styles.metaText}>
              {responseStatus !== null ? `Status: ${responseStatus}` : 'Status: -'}
              {responseTime !== null ? ` | ${responseTime} ms` : ''}
            </div>
          </div>
          <pre className={styles.responseBox}>
            <code>{responseText || 'No response yet. Send a request.'}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}
