// Builds static/openapi.json (served at docs.mida.so/openapi.json) from the endpoint pages in docs/v2.
// Each page's <ApiEndpointLayout> props give the method, path and summary; its parameter tables give the
// path, query and body parameters; its "Success response" block gives the example. So the spec can't drift
// from the docs. Runs before every build (npm "prebuild").
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const docsDir = path.join(root, 'docs/v2');
const outFile = path.join(root, 'static/openapi.json');

const TAGS = {
  experiment: 'Experiments', experiments: 'Experiments', 'create-experiment': 'Experiments',
  goal: 'Goals', goals: 'Goals',
  event: 'Events', events: 'Events',
  hypotheses: 'Hypotheses',
  personalization: 'Personalization',
  'exclusion-groups': 'Exclusion groups',
  survey: 'Surveys', surveys: 'Surveys', 'create-survey': 'Surveys',
  account: 'Account',
};

// The value of a JSX prop: a "string" or a {{ object }} with balanced braces.
function prop(src, name) {
  const m = src.match(new RegExp(`\\n\\s*${name}=`));
  if (!m) return undefined;
  let i = m.index + m[0].length;
  if (src[i] === '"') return src.slice(i + 1, src.indexOf('"', i + 1));
  if (src[i] !== '{') return undefined;
  let depth = 0, quote = null;
  for (let j = i; j < src.length; j++) {
    const c = src[j];
    if (quote) { if (c === '\\') j++; else if (c === quote) quote = null; continue; }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) {
      const inner = src.slice(i + 1, j).trim();
      // our own repo's object literals, e.g. {{goal_name: 'CTA'}}
      try { return new Function(`return (${inner});`)(); } catch { return undefined; }
    }
  }
}

// "## Heading" -> body text until the next heading of the same or higher level.
function sections(md) {
  const out = [];
  const re = /^(#{2,3}) (.+)$/gm;
  const heads = [...md.matchAll(re)];
  heads.forEach((h, k) => {
    const end = heads.slice(k + 1).find(n => n[1].length <= h[1].length);
    out.push({ level: h[1].length, title: h[2].replace(/\s*\{#.*\}$/, '').trim(), body: md.slice(h.index + h[0].length, end ? end.index : undefined) });
  });
  return out;
}

// First markdown table in a section -> [{column: cell}]
function table(body) {
  const all = body.split('\n');
  const start = all.findIndex(l => l.trim().startsWith('|'));
  if (start < 0) return [];
  const end = all.findIndex((l, i) => i > start && !l.trim().startsWith('|'));
  const lines = all.slice(start, end < 0 ? undefined : end);
  if (lines.length < 3) return [];
  const cells = l => l.trim().replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map(c => c.trim());
  const head = cells(lines[0]).map(h => h.toLowerCase());
  const rows = [];
  for (const l of lines.slice(2)) {
    if (/^\|\s*-/.test(l)) break;
    const c = cells(l);
    rows.push(Object.fromEntries(head.map((h, i) => [h, c[i] || ''])));
  }
  return rows;
}

const clean = s => s.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\\\|/g, '|').replace(/<br\s*\/?>/g, ' ').trim();
const fieldName = row => {
  const m = (row.parameter || row.field || row.name || '').match(/^`([^`]+)`/);
  return m && /^[A-Za-z_][A-Za-z0-9_]*$/.test(m[1]) ? m[1] : null; // top-level fields only
};
function schemaFor(type = '') {
  const t = type.replace(/`/g, '').toLowerCase();
  const base = ['integer', 'number', 'boolean', 'array', 'object', 'string'].find(x => t.startsWith(x)) || (t.startsWith('int') ? 'integer' : t.startsWith('bool') ? 'boolean' : 'string');
  const s = { type: t.includes('null') ? [base, 'null'] : base };
  if (base === 'array') s.items = {};
  return s;
}
const isRequired = v => /^(✅|yes\b|required\b)/i.test((v || '').trim());

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'Mida API',
    version: '2.0.0',
    description: 'Manage Mida A/B tests, goals, events, hypotheses, surveys and personalization campaigns. Accounts live in one region: call the US or EU server your account is hosted in (Dashboard → Settings shows which). Generated from https://docs.mida.so.',
    contact: { name: 'Mida', url: 'https://www.mida.so' },
  },
  externalDocs: { url: 'https://docs.mida.so/docs/intro' },
  servers: [
    { url: 'https://api-us.mida.so', description: 'US region' },
    { url: 'https://api-eu.mida.so', description: 'EU region' },
  ],
  security: [{ bearerAuth: [] }, { apiKeyHeader: [] }],
  tags: [...new Set(Object.values(TAGS)), 'Projects'].map(name => ({ name })),
  paths: {},
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', description: 'An API key generated in the Mida dashboard, sent as `Authorization: Bearer <key>`.' },
      apiKeyHeader: { type: 'apiKey', in: 'header', name: 'x-api-key', description: 'The same API key, sent as `x-api-key: <key>`.' },
    },
  },
};

const operationIds = new Set();
for (const file of fs.readdirSync(docsDir).filter(f => f.endsWith('.md')).sort()) {
  const md = fs.readFileSync(path.join(docsDir, file), 'utf8');
  if (!md.includes('<ApiEndpointLayout')) continue;
  const slug = file.replace(/\.md$/, '');
  let method = (prop(md, 'method') || '').toLowerCase();
  if (method === 'del') method = 'delete';
  const endpoint = prop(md, 'endpoint');
  if (!method || !endpoint) throw new Error(`${file}: missing method or endpoint`);
  if (spec.paths[endpoint]?.[method]) throw new Error(`${file}: duplicate ${method.toUpperCase()} ${endpoint}`);

  const secs = sections(md);
  const find = re => secs.filter(s => s.level === 2 && re.test(s.title));
  const describe = rows => Object.fromEntries(rows.map(r => [fieldName(r), r]).filter(([k]) => k));

  const pathRows = describe(find(/^path parameters$/i).flatMap(s => table(s.body)));
  const parameters = [...endpoint.matchAll(/\{(\w+)\}/g)].map(([, name]) => ({
    name, in: 'path', required: true,
    schema: { type: /_id$/.test(name) ? 'integer' : 'string' },
    ...(pathRows[name]?.description ? { description: clean(pathRows[name].description) } : {}),
  }));
  for (const r of find(/^query parameters$/i).flatMap(s => table(s.body))) {
    const name = fieldName(r);
    if (!name) continue;
    const p = { name, in: 'query', required: isRequired(r.required), schema: schemaFor(r.type) };
    if (r.description) p.description = clean(r.description);
    if (r.default && r.default !== '—' && r.default !== '-') p.schema.default = r.default.replace(/`/g, '');
    parameters.push(p);
  }

  const op = {
    operationId: slug.replace(/-(\w)/g, (_, c) => c.toUpperCase()),
    summary: prop(md, 'title') || slug,
    description: clean(prop(md, 'description') || ''),
    tags: [TAGS[endpoint.split('/')[4]] || 'Projects'],
    externalDocs: { url: `https://docs.mida.so/docs/v2/${slug}` },
  };
  if (operationIds.has(op.operationId)) throw new Error(`${file}: duplicate operationId`);
  operationIds.add(op.operationId);
  if (parameters.length) op.parameters = parameters;

  if (method !== 'get' && method !== 'delete') {
    // body tables sit in "Body parameters", "Required fields", "Optional fields" and similar, or their ### subsections
    const bodySecs = secs.filter((s, k) => {
      const parent = s.level === 2 ? s : secs.slice(0, k).reverse().find(p => p.level === 2);
      return parent && /body|request|fields$/i.test(parent.title) && !/response/i.test(parent.title);
    });
    const properties = {}, required = [];
    for (const s of bodySecs) {
      for (const r of table(s.body)) {
        const name = fieldName(r);
        if (!name || properties[name] || !('type' in r)) continue;
        properties[name] = { ...schemaFor(r.type), ...(r.description ? { description: clean(r.description) } : {}) };
        const inRequiredSection = /^required/i.test(s.title) && !/optional/i.test(r.description || '');
        if (inRequiredSection || isRequired(r.required)) required.push(name);
      }
    }
    const example = prop(md, 'defaultBody');
    // fields that only appear in the example (e.g. {status: 1}) still belong in the schema
    for (const [k, v] of Object.entries(example && typeof example === 'object' ? example : {})) {
      if (!properties[k]) properties[k] = { type: Array.isArray(v) ? 'array' : v === null ? 'null' : typeof v === 'number' ? (Number.isInteger(v) ? 'integer' : 'number') : typeof v };
    }
    if (Object.keys(properties).length || example) {
      const schema = { type: 'object', properties };
      if (required.length) schema.required = required;
      op.requestBody = { required: true, content: { 'application/json': { schema, ...(example && typeof example === 'object' ? { example } : {}) } } };
    }
  }

  const ok = { description: 'Success' };
  const success = find(/^success response$/i)[0];
  const json = success?.body.match(/```json\n([\s\S]*?)\n```/);
  if (json) {
    try { ok.content = { 'application/json': { example: JSON.parse(json[1]) } }; } catch { /* examples with comments stay out */ }
  }
  op.responses = { 200: ok, 401: { description: 'Missing or invalid API key' } };

  (spec.paths[endpoint] = spec.paths[endpoint] || {})[method] = op;
}

fs.writeFileSync(outFile, JSON.stringify(spec, null, 2) + '\n');
console.log(`openapi.json: ${operationIds.size} operations, ${Object.keys(spec.paths).length} paths`);
