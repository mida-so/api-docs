---
sidebar_position: 1
hide_table_of_contents: true
---

# Mida API V2

Mida is an A/B testing and conversion rate optimization (CRO) platform. Customers install a JavaScript snippet on their website, create experiments with visual or code-based variants, and Mida tracks conversions against goals such as clicks, form submissions, and pageviews.

This site documents the **public V2 API** — a REST API for managing experiments, events, and goals programmatically. Everything you can do in the Mida dashboard can be done via this API.

:::tip New here? Start with the Quickstart
The **[Quickstart Guide](./quickstart)** walks you through creating and launching your first experiment end-to-end in under five minutes.
:::

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
