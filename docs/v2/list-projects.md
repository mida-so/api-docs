---
sidebar_position: 1
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Projects"
  method="GET"
  endpoint="/v2/project/{project_key}/projects"
  description="Return every project (website / app) under the same Mida account as the supplied project key. The project key in the URL is used purely as auth context — you'll receive the full list of sibling projects, including the one matched by that key. Lets an external client (e.g. an AI agent) discover and switch between projects."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/projects?limit=50&offset=0"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Auth model

Every Mida project (widget) has its own API key, but they all live under one company. Possession of a valid API key for **any** project authorizes you to list, get, create, update, or delete **any** project in the same company — mirroring the dashboard, where switching projects in the sidebar is a freely-available action for account members.

## Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `100` | Max projects to return. Maximum `500`. |
| `offset` | integer | `0` | Number of records to skip (for pagination). |
| `include_inactive` | boolean | `false` | When `true`, also include paused (`status=0`) projects. Soft-deleted projects (`status=2`) are never returned. |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/projects?limit=50" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "company_id": 1001,
  "count": 2,
  "projects": [
    {
      "project_key": "PROJECT_KEY_AAAAAAAAAA",
      "name": "www.example.com",
      "website_name": "www.example.com",
      "widget_name": "www.example.com",
      "allowed_website": "www.example.com",
      "monthly_average_traffic": 50000,
      "shopify_id": null,
      "status": 1,
      "company_id": 1001,
      "created_at": "2025-12-04T10:05:52.000Z",
      "updated_at": "2026-04-21T08:30:00.000Z"
    },
    {
      "project_key": "PROJECT_KEY_BBBBBBBBBB",
      "name": "store.example.com",
      "website_name": "store.example.com",
      "widget_name": "store.example.com",
      "allowed_website": "store.example.com",
      "monthly_average_traffic": 0,
      "shopify_id": "1234567890",
      "status": 1,
      "company_id": 1001,
      "created_at": "2026-03-18T11:20:00.000Z",
      "updated_at": "2026-04-12T09:00:00.000Z"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `company_id` | integer | The Mida account that owns these projects |
| `count` | integer | Number of projects in this response page |
| `projects` | array | List of project objects |
| `projects[].project_key` | string | 22-char public identifier — also the `key=` value in the Mida script tag |
| `projects[].name` | string | Display name (defaults to `website_name` when set) |
| `projects[].allowed_website` | string | Domain(s) the script may run on (`*` = any) |
| `projects[].status` | integer | `1` = active, `0` = paused |

## Pagination

```bash
# Page 2 with 50 per page
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/projects?limit=50&offset=50" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Project supplied as auth context is inactive |

:::tip Next step
Pick a `project_key` from the response and pass it to [Get Project Details](./get-project-details), [Update Project](./update-project), or any of the experiment / event / goal endpoints.
:::

</ApiEndpointLayout>
