---
sidebar_position: 1
hide_table_of_contents: true
---

# Mida Developer Docs

Mida is an A/B testing and CRO platform. This site covers everything you need to integrate Mida programmatically — whether you're testing changes on a webpage or running experiments inside your backend, API, or mobile app.

## Choose your integration path

| I want to… | Use | How |
|---|---|---|
| Test CSS, copy, or layout on a webpage | **Client-side** | Install Mida script → use this REST API or dashboard |
| Test backend logic, pricing, APIs, or mobile rendering | **Server-side** | Create experiment in dashboard → install an [SDK](./server-side/sdks) |
| Manage experiments from Claude, Cursor, or ChatGPT | **MCP** | [Connect Mida MCP](./mcp-integration) — no API key needed |

:::tip Testing changes on a website?
The **[Client-side Quickstart](./quickstart)** walks you through creating and launching your first experiment via the REST API in under five minutes.
:::

:::tip Running logic in your backend or mobile app?
The **[Server-side Quickstart](./server-side/quickstart)** covers SDK setup, variant assignment, and goal tracking — no browser required.
:::

---

## REST API V2 reference

The REST API is a **control plane** — use it to create, configure, and read results for client-side experiments. It is also used for managing goals and events shared across both client-side and server-side experiments.

Server-side experiments are created in the dashboard and run through [SDKs](./server-side/sdks). The REST API can read their results and manage their goals, but does not assign variants at request time.

---

## Before you start

### 1. Find your Project Key

Your **Project Key** is the unique identifier for your Mida site/project. It appears in:

- **Dashboard → Projects → [your project] → Settings → API**
- The URL when browsing your project: `app.mida.so/project/YOUR_PROJECT_KEY/...`

The Project Key is passed as a **path parameter** in every V2 request:

```
/v2/project/{project_key}/experiments
```

### 2. Generate an API Key

API Keys authenticate every request. To create one:

1. Go to **Dashboard → Settings → API Keys**
2. Click **Generate New Key**
3. Copy and store it securely — it is only shown once

### 3. Pick your region

Your account is hosted in either the **US** or **EU** region. Use the correct base URL:

| Region | Base URL |
|--------|----------|
| US | `https://api-us.mida.so/v2` |
| EU | `https://api-eu.mida.so/v2` |

If you're unsure, check **Dashboard → Settings** — your region is shown there.

---

## Authentication

Pass your API key in **one** of these ways (all are equivalent):

```bash
# Recommended
Authorization: Bearer YOUR_GENERATED_API_KEY

# Alternatives
x-api-key: YOUR_GENERATED_API_KEY
api-key: YOUR_GENERATED_API_KEY
```

Example request:

```bash
curl "https://api-us.mida.so/v2/project/YOUR_PROJECT_KEY/experiments" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

---

## Response format

All responses return JSON. Successful responses include `"success": true`:

```json
{ "success": true, "experiments": [...] }
```

Error responses include an `"error"` key and an appropriate HTTP status code:

```json
{ "error": "Experiment not found" }
```

### Common status codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `400` | Bad request — check request body or parameters |
| `401` | Invalid or missing API key |
| `404` | Resource not found, or belongs to a different project |
| `500` | Server error |

---

## Endpoints at a glance

### Experiments

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/v2/project/{project_key}/create-experiment` | Create an experiment |
| `GET` | `/v2/project/{project_key}/experiments` | List all experiments |
| `GET` | `/v2/project/{project_key}/experiment/{test_id}` | Get experiment details |
| `GET` | `/v2/project/{project_key}/experiment/{test_id}/result` | Get conversion results |
| `GET` | `/v2/project/{project_key}/experiment/{test_id}/share-link` | Get public share link |
| `PATCH` | `/v2/project/{project_key}/experiment/{test_id}` | Update metadata/config |
| `PATCH` | `/v2/project/{project_key}/experiment/{test_id}/status` | Start / pause / end |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v2/project/{project_key}/events` | List events |
| `POST` | `/v2/project/{project_key}/event` | Create an event |
| `GET` | `/v2/project/{project_key}/event/{event_id}` | Get event details |
| `PATCH` | `/v2/project/{project_key}/event/{event_id}` | Update an event |
| `DELETE` | `/v2/project/{project_key}/event/{event_id}` | Delete an event |

### Goals

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v2/project/{project_key}/goals` | List goals |
| `POST` | `/v2/project/{project_key}/goal` | Create a goal |
| `GET` | `/v2/project/{project_key}/goal/{goal_profile_id}` | Get goal details |
| `PATCH` | `/v2/project/{project_key}/goal/{goal_profile_id}` | Update a goal |
| `DELETE` | `/v2/project/{project_key}/goal/{goal_profile_id}` | Delete a goal |
