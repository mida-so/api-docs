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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChatGPTIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 41 41" fill="currentColor" aria-hidden="true">
      <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.650-2.990 10.079 10.079 0 0 0-9.612 6.879 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.650 2.99 10.079 10.079 0 0 0 9.618-6.879 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.818zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.497v4.996l-4.331 2.5-4.331-2.5V18z" />
    </svg>
  );
}

function ClaudeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.7 2.4c-.4-1.1-2-1.1-2.4 0L4.5 20.3c-.4 1.1.5 2.2 1.6 2h.2c.7 0 1.3-.4 1.6-1.1l1.4-3.7h5.4l1.4 3.7c.3.7.9 1.1 1.6 1.1h.2c1.1.2 2-.9 1.6-2L13.7 2.4zm-3.9 11.2 1.7-4.6 1.7 4.6H9.8z" />
    </svg>
  );
}

// ── Prompt engineering ─────────────────────────────────────────────────────────
//
// Returns an array of { heading, items } blocks that describe what this
// endpoint covers so the AI is pre-loaded with the right context.

function getContextBlocks(title, method, endpoint) {
  const t = (title || '').toLowerCase();
  const e = (endpoint || '').toLowerCase();

  // Create / update experiment — most complex endpoint
  if ((t.includes('create') || t.includes('update')) && t.includes('experiment')) {
    return [
      {
        heading: 'Variants',
        items: [
          'Code-based variants: inject CSS and JavaScript that run on the page',
          'Visual DOM variants: target a CSS selector and change innerHTML, style, or attributes',
          'Control the variant name, traffic weight, and whether it\'s the control group',
        ],
      },
      {
        heading: 'Targeting',
        items: [
          'URL conditions: exact match, contains, wildcard (*), or regex',
          'Device conditions: desktop, mobile, tablet',
          'Geolocation: country or region targeting',
          'Visitor properties: new vs returning, UTM params, custom JS expression',
          'Combine multiple conditions with AND / OR logic',
        ],
      },
      {
        heading: 'Goals (conversion events)',
        items: [
          'clickOnElement / clickOnText — CSS selector or text string that triggers a conversion',
          'pageview / pageviewExact / pageviewWildcard / pageviewRegex — URL-based goals',
          'formSubmit — fires when a matching form is submitted',
          'script — custom JavaScript expression evaluated on each page load',
          'Goals can be primary (determines winner) or secondary (tracked only)',
        ],
      },
      {
        heading: 'Experiment configuration',
        items: [
          'Traffic allocation: percentage of visitors included in the test',
          'Confidence interval threshold: default 95 %, customisable',
          'Multi-armed bandit (MAB): auto-adjusts traffic toward winning variant',
          'Bayesian statistics mode: alternative to frequentist significance testing',
          'Autopilot: automatically deploys the winner when significance is reached',
          'Mutual exclusion groups: prevent visitors from entering overlapping tests',
        ],
      },
      {
        heading: 'Other',
        items: [
          'Idempotency key: pass X-Idempotency-Key to safely retry without duplicate creation',
          'Draft vs live status: experiments start as draft; use the status endpoint to launch',
        ],
      },
    ];
  }

  // Read-only experiment endpoints
  if (t.includes('experiment')) {
    return [
      {
        heading: 'Experiment data',
        items: [
          'Status values: draft, live, ended, archived',
          'Variant performance: visitors, conversions, conversion rate, uplift',
          'Statistical significance and confidence intervals',
          'Winner detection and autopilot state',
        ],
      },
      {
        heading: 'Filtering & pagination',
        items: [
          'Filter by status, date range, or experiment name',
          'Paginate with limit / offset parameters',
        ],
      },
    ];
  }

  // Create / update event
  if ((t.includes('create') || t.includes('update')) && t.includes('event')) {
    return [
      {
        heading: 'Event configuration',
        items: [
          'event_name: unique identifier used in API calls and goal rules',
          'event_type: pageview, click, custom, or form_submit',
          'Selector: CSS selector or URL pattern that triggers the event',
          'Properties: arbitrary key-value metadata attached to each event',
          'Deduplication: Redis MD5 hash prevents double-counting within a session',
        ],
      },
      {
        heading: 'Using events in experiments',
        items: [
          'Reference event_name in a goal\'s script field to track it as a conversion',
          'Events can be shared across multiple experiments simultaneously',
        ],
      },
    ];
  }

  // List / get event
  if (t.includes('event')) {
    return [
      {
        heading: 'Event fields',
        items: [
          'event_name, event_type, selector, properties',
          'created_at, updated_at timestamps',
          'Usage: how many active experiments reference this event',
        ],
      },
      {
        heading: 'Pagination',
        items: ['limit (default 20, max 100) and offset for paging through results'],
      },
    ];
  }

  // Create / update goal
  if ((t.includes('create') || t.includes('update')) && t.includes('goal')) {
    return [
      {
        heading: 'Goal types',
        items: [
          'clickOnElement: fires when a visitor clicks a CSS selector',
          'clickOnText: fires when a visitor clicks any element containing the specified text',
          'pageview / pageviewExact / pageviewWildcard / pageviewRegex: URL-based conversion',
          'formSubmit: fires on submission of a form matching the selector',
          'script: evaluates a JS expression — return true to record a conversion',
        ],
      },
      {
        heading: 'Goal configuration',
        items: [
          'goal_name: display label shown in the experiment results dashboard',
          'goal_key: stable programmatic identifier (snake_case recommended)',
          'element_url: URL where the goal element lives (required for click/form goals)',
          'goal_value: optional monetary value assigned to each conversion',
          'is_primary: marks this as the primary metric that determines the winning variant',
        ],
      },
    ];
  }

  // List / get / delete goal
  if (t.includes('goal')) {
    return [
      {
        heading: 'Goal data',
        items: [
          'goal_key, goal_name, goal_type, goal_value',
          'conversion count and rate per variant',
          'linked experiment IDs',
        ],
      },
    ];
  }

  // Fallback for any other endpoint
  return [
    {
      heading: 'What to ask about',
      items: [
        'Required and optional request fields',
        'Constructing a valid API request with the correct headers and body',
        'Interpreting the response structure and error codes',
        'Common mistakes and how to avoid them',
      ],
    },
  ];
}

/**
 * Builds the full prompt that is sent to the AI or copied to clipboard.
 *
 * @param {string} aiName        - "ChatGPT" | "Claude" | null (null = generic copy)
 * @param {string} pageUrl       - current page URL
 * @param {string} title         - endpoint title, e.g. "Create Experiment"
 * @param {string} method        - HTTP method, e.g. "POST"
 * @param {string} endpoint      - path, e.g. "/v2/project/{project_key}/create-experiment"
 * @param {string} description   - one-line endpoint description
 */
function buildPrompt({ aiName, pageUrl, title, method, endpoint, description }) {
  const greeting = aiName ? `Hi ${aiName}! ` : '';
  const blocks = getContextBlocks(title, method, endpoint);

  const lines = [];

  // Opening
  lines.push(
    `${greeting}I'm building with the **Mida A/B testing API** and need help with the **${title}** endpoint.`,
  );
  lines.push('');

  // Link to docs
  lines.push(`Please read the full documentation here: ${pageUrl}`);
  lines.push('');

  // Endpoint signature + description
  if (method && endpoint) {
    lines.push(`Endpoint: \`${method.toUpperCase()} ${endpoint}\``);
  }
  if (description) {
    lines.push(description);
  }
  lines.push('');

  // Context blocks — what the AI should be ready to help with
  lines.push('After reading the page, please be ready to help me with:');
  lines.push('');
  for (const block of blocks) {
    lines.push(`**${block.heading}**`);
    for (const item of block.items) {
      lines.push(`- ${item}`);
    }
    lines.push('');
  }

  // Closing
  lines.push("Once you've read the docs, I'll describe what I want to build and you can help me construct the API request.");

  return lines.join('\n');
}

// ── AI providers ──────────────────────────────────────────────────────────────

const AI_PROVIDERS = [
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    Icon: ChatGPTIcon,
    buildUrl(prompt) {
      return `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
    },
  },
  {
    id: 'claude',
    label: 'Claude',
    Icon: ClaudeIcon,
    buildUrl(prompt) {
      return `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;
    },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AskAiButton({ pageTitle, method, endpoint, description }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapperRef = useRef(null);

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

  function makePrompt(aiName) {
    return buildPrompt({
      aiName,
      pageUrl: getPageUrl(),
      title: pageTitle || (typeof document !== 'undefined' ? document.title : 'this page'),
      method,
      endpoint,
      description,
    });
  }

  function handleAiClick(provider) {
    const prompt = makePrompt(provider.label);
    window.open(provider.buildUrl(prompt), '_blank', 'noopener,noreferrer');
    setOpen(false);
  }

  async function handleCopy() {
    const prompt = makePrompt(null);
    try {
      await navigator.clipboard.writeText(prompt);
    } catch {
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
