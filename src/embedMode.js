/**
 * Embed mode.
 *
 * app.mida.so frames this site on its API & SDK page. In that context our own
 * navbar and footer are a second header and footer sitting inside the
 * dashboard's content area, next to the dashboard's own sidebar — a site inside
 * a site. This adds `mida-embed` to <html> so custom.css can hide them.
 *
 * Detection is automatic rather than a flag the embedder passes, so any page of
 * the docs behaves correctly wherever it is framed. `?embed=1` forces it on for
 * testing in a normal tab.
 *
 * Why the observer: Docusaurus sets its own class list on <html> during
 * hydration (docs-wrapper, plugin-docs, docs-doc-id-*, and the theme classes),
 * which replaces the attribute wholesale and drops anything added before it.
 * Applying once at module load is therefore not enough — it worked and was then
 * silently wiped. The observer re-adds the class whenever something rewrites the
 * attribute without it, which also covers the theme toggle and route changes.
 */

var EMBED_CLASS = 'mida-embed';

function isFramed() {
  try {
    return window.self !== window.top;
  } catch (e) {
    // Touching window.top across origins can throw, and only a framed document
    // is in a position to throw here, so treat it as framed.
    return true;
  }
}

function isEmbedRequested() {
  try {
    return new URLSearchParams(window.location.search).has('embed');
  } catch (e) {
    return false;
  }
}

function shouldEmbed() {
  return isFramed() || isEmbedRequested();
}

function addClass() {
  var root = document.documentElement;
  if (root && !root.classList.contains(EMBED_CLASS)) {
    root.classList.add(EMBED_CLASS);
  }
}

function start() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (!document.documentElement) return;
  if (!shouldEmbed()) return;

  addClass();

  if (typeof MutationObserver === 'function') {
    new MutationObserver(addClass).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
}

start();

export function onRouteDidUpdate() {
  if (typeof document !== 'undefined' && document.documentElement && shouldEmbed()) {
    addClass();
  }
}
