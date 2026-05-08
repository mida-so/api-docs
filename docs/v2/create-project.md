---
sidebar_position: 3
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Project"
  method="POST"
  endpoint="/v2/project/{project_key}/projects"
  description="Create a new project (website / app) under the same Mida account as the supplied project key. The new project's project_key is auto-generated and returned — use it to install the Mida script on the new site, then mint API keys via the dashboard if needed."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/projects"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

## Body

```json
{
  "website_name": "store.example.com",
  "allowed_website": "store.example.com"
}
```

| Field | Type | Required | Description |
|---|---|---|---|
| `website_name` | string | one of these | Display name for the new project |
| `name` | string | one of these | Alias for `website_name` |
| `allowed_website` | string | one of these | Domain(s) the script may run on. Use `*` to allow any. |

At least one of `website_name`, `name`, or `allowed_website` must be supplied. Anything else in the body is ignored.

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/projects" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "website_name": "store.example.com",
    "allowed_website": "store.example.com"
  }'
```

## Success response (201)

```json
{
  "success": true,
  "project": {
    "project_key": "PROJECT_KEY_BBBBBBBBBB",
    "name": "store.example.com",
    "website_name": "store.example.com",
    "widget_name": "store.example.com",
    "allowed_website": "store.example.com",
    "monthly_average_traffic": 0,
    "shopify_id": null,
    "status": 1,
    "company_id": 1001,
    "created_at": "2026-04-29T08:14:22.000Z",
    "updated_at": "2026-04-29T08:14:22.000Z"
  }
}
```

The returned `project_key` is the new project's permanent public identifier — it's also the value to put in the Mida script tag (`?key=...`).

## Error responses

| Status | Meaning |
|---|---|
| `400` | None of `website_name`, `name`, or `allowed_website` supplied |
| `401` | Invalid or missing API key |
| `403` | Project supplied as auth context is inactive |

:::tip After creating
The new project does not have its own API key yet. Visit the project in the dashboard → Settings → API Keys to generate one before using project-scoped endpoints (experiments, events, goals).
:::

</ApiEndpointLayout>
