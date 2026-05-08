---
sidebar_position: 2
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Project Details"
  method="GET"
  endpoint="/v2/project/{project_key}"
  description="Return details for a single project. The API key must be valid for the supplied project key (or any sibling project under the same company)."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `project_key` | string | The 22-char project key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "project": {
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
  }
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `project_key` | string | Public identifier — same value in the Mida script `key=` parameter |
| `name` | string | Display name |
| `website_name` | string | Stored website name |
| `widget_name` | string | Internal alias (usually equal to `website_name`) |
| `allowed_website` | string | Domain(s) the script may run on |
| `monthly_average_traffic` | integer | Hint used for plan suggestions |
| `shopify_id` | string \| null | Set when this project was created from a Shopify install |
| `status` | integer | `1` = active, `0` = paused |
| `company_id` | integer | Owning account |
| `created_at` / `updated_at` | string | ISO 8601 timestamps |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Project not found |

</ApiEndpointLayout>
