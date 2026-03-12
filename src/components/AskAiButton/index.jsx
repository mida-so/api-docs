import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

// ── Icons ─────────────────────────────────────────────────────────────────────

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  );
}

function ChevronDownIcon({ open }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transition: 'transform 0.18s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.externalIcon}
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// Official OpenAI / ChatGPT logo path
function ChatGPTIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 41 41" fill="currentColor" aria-hidden="true">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.650-2.990 10.079 10.079 0 0 0-9.612 6.879 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.650 2.99 10.079 10.079 0 0 0 9.618-6.879 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.818zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.996l-4.331 2.5-4.331-2.5V18z" />
    </svg>
  );
}

// Anthropic Claude logo (stylised A)
function ClaudeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.7 2.4c-.4-1.1-2-1.1-2.4 0L4.5 20.3c-.4 1.1.5 2.2 1.6 2h.2c.7 0 1.3-.4 1.6-1.1l1.4-3.7h5.4l1.4 3.7c.3.7.9 1.1 1.6 1.1h.2c1.1.2 2-.9 1.6-2L13.7 2.4zm-3.9 11.2 1.7-4.6 1.7 4.6H9.8z" />
    </svg>
  );
}

// ── AI providers config ────────────────────────────────────────────────────────

const AI_PROVIDERS = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    Icon: ChatGPTIcon,
    buildUrl(pageUrl, pageTitle) {
      const msg = `Hi ChatGPT! Can you please read [${pageTitle}](${pageUrl}) and prepare to answer questions about it?`;
      return `https://chatgpt.com/?q=${encodeURIComponent(msg)}`;
    },
  },
  {
    id: 'claude',
    label: 'Claude',
    Icon: ClaudeIcon,
    buildUrl(pageUrl, pageTitle) {
      const msg = `Hi Claude! Can you please read [${pageTitle}](${pageUrl}) and prepare to answer questions about it?`;
      return `https://claude.ai/new?q=${encodeURIComponent(msg)}`;
    },
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function AskAiButton({ pageTitle }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClickOutside);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onClickOutside);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  function getPageUrl() {
    if (typeof window !== 'undefined') return window.location.href;
    return '';
  }

  function getTitle() {
    if (pageTitle) return pageTitle;
    if (typeof document !== 'undefined') return document.title;
    return 'this page';
  }

  function handleAiClick(provider) {
    const url = provider.buildUrl(getPageUrl(), getTitle());
    window.open(url, '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  async function handleCopy() {
    const prompt = `Hi! Can you please read [${getTitle()}](${getPageUrl()}) and prepare to answer questions about it?`;
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
      // Fallback for browsers that block clipboard API
      const el = document.createElement('textarea');
      el.value = prompt;
      el.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setOpen(false);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Ask AI about this page"
      >
        <SparkleIcon />
        <span>Ask AI</span>
        <ChevronDownIcon open={open} />
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <p className={styles.sectionLabel}>Open in AI chat</p>

          {AI_PROVIDERS.map((provider) => (
            <button
              key={provider.id}
              className={styles.option}
              role="menuitem"
              onClick={() => handleAiClick(provider)}
            >
              <provider.Icon />
              <span>{provider.label}</span>
              <ExternalLinkIcon />
            </button>
          ))}

          <div className={styles.divider} />

          <p className={styles.sectionLabel}>Or copy the prompt</p>
          <button
            className={`${styles.option} ${copied ? styles.optionCopied : ''}`}
            role="menuitem"
            onClick={handleCopy}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? 'Copied!' : 'Copy prompt'}</span>
          </button>
          <p className={styles.copyHint}>Paste into any AI assistant</p>
        </div>
      )}
    </div>
  );
}
