/**
 * The site root IS the docs.
 *
 * There is no landing page any more. Everyone arriving here is already sold —
 * they come from app.mida.so's API & SDK page, from a link in the dashboard, or
 * straight to one endpoint — so a hero in front of the reference was one extra
 * click on the way to the thing they came for.
 *
 * The hop is done twice on purpose: the meta refresh is baked into the
 * statically generated index.html, so it works for crawlers and with JavaScript
 * disabled, while <Redirect> makes it instant for anyone who already has the
 * app hydrated. Doing it here rather than moving the docs to routeBasePath '/'
 * keeps every existing /docs/... URL working — the dashboard's iframe and every
 * cross-link in the docs point at those.
 */
import React from 'react';
import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const target = useBaseUrl('/docs/intro');

  return (
    <>
      <Head>
        <title>Mida Developer Docs</title>
        <meta httpEquiv="refresh" content={`0; url=${target}`} />
      </Head>
      <Redirect to={target} />
    </>
  );
}
