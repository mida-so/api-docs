// Builds static/llms.txt (served at docs.mida.so/llms.txt): an index of these docs for coding agents.
// Endpoint lines come from each docs/v2 page's <ApiEndpointLayout> props, like build-openapi.mjs, so the
// index can't drift from the docs. Runs before every build and start (npm "prebuild"/"prestart").
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const docsDir = path.join(root, 'docs/v2');
const outFile = path.join(root, 'static/llms.txt');
const site = 'https://docs.mida.so';

// Same grouping as openapi.json tags, keyed by the path segment after /project/{project_key}/.
const GROUPS = {
  experiment: 'Experiments', experiments: 'Experiments', 'create-experiment': 'Experiments',
  goal: 'Goals', goals: 'Goals',
  event: 'Events', events: 'Events',
  hypotheses: 'Hypotheses',
  personalization: 'Personalization',
  'exclusion-groups': 'Exclusion groups',
  survey: 'Surveys', surveys: 'Surveys', 'create-survey': 'Surveys',
  account: 'Account',
};
const ORDER = ['Account', 'Projects', 'Experiments', 'Goals', 'Events', 'Hypotheses', 'Personalization', 'Exclusion groups', 'Surveys'];

// A plain "string" JSX prop. The props this script reads are never objects.
function prop(src, name) {
  const m = src.match(new RegExp(`\\n\\s*${name}="([^"]*)"`));
  return m ? m[1] : undefined;
}

const groups = {};
for (const file of fs.readdirSync(docsDir).filter(f => f.endsWith('.md')).sort()) {
  const md = fs.readFileSync(path.join(docsDir, file), 'utf8');
  const title = prop(md, 'title');
  const method = prop(md, 'method') === 'DEL' ? 'DELETE' : prop(md, 'method');
  const endpoint = prop(md, 'endpoint');
  if (!title || !method || !endpoint) throw new Error(`${file}: missing title, method or endpoint`);
  const slug = file.replace(/\.md$/, '');
  const group = GROUPS[endpoint.split('/')[4]] || 'Projects';
  const description = (prop(md, 'description') || '').replace(/\s+/g, ' ').trim();
  (groups[group] = groups[group] || []).push(
    `- [${title}](${site}/docs/v2/${slug}): \`${method} ${endpoint}\`${description ? ` — ${description}` : ''}`
  );
}
const unknown = Object.keys(groups).filter(g => !ORDER.includes(g));
if (unknown.length) throw new Error(`build-llms: add ${unknown.join(', ')} to ORDER`);

const out = `# Mida Developer Docs

> Mida is an A/B testing and personalization platform. These docs cover the V2 REST API, the remote MCP server, and the server-side and mobile SDKs (Node.js, Python, PHP, Ruby, Next.js, Vue, Flutter, iOS, Android).

- API base URL: \`https://api-us.mida.so\` or \`https://api-eu.mida.so\`, matching the project's data region.
- Auth: \`Authorization: Bearer <API key>\`, generated in the Mida dashboard under Projects → [your project] → Settings → API. Every project-scoped endpoint takes the project key in its path.
- Experiments created through the API start as drafts. Launching one makes it visible to site visitors.
- Machine-readable spec: [OpenAPI 3](${site}/openapi.json)

## Guides

- [Introduction](${site}/docs/intro): What the API, MCP server and SDKs cover, and where to start.
- [Client-side Quickstart](${site}/docs/quickstart): Create, launch, read and stop a website experiment with curl.
- [MCP Integration](${site}/docs/mcp-integration): Connect Claude, Cursor or another MCP client to Mida over remote OAuth (\`https://mcp.mida.so/mcp\`).
- [Server-side Testing Overview](${site}/docs/server-side/overview): Client-side vs server-side experiments and when to use each.
- [Server-side Quickstart](${site}/docs/server-side/quickstart): Run a first server-side experiment with an SDK.
- [SDK Catalog](${site}/docs/server-side/sdks): Install and use every official SDK (\`getExperiment\`, \`setEvent\`, \`isFeatureEnabled\`).

## V2 API Reference

${ORDER.filter(g => groups[g]).map(g => `### ${g}\n\n${groups[g].join('\n')}`).join('\n\n')}
`;

fs.writeFileSync(outFile, out);
console.log(`build-llms: wrote ${Object.values(groups).flat().length} endpoints to static/llms.txt`);
