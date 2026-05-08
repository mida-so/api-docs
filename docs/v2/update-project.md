---
sidebar_position: 4
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Project"
  method="PATCH"
  endpoint="/v2/project/{project_key}"
  description="Update mutable fields on a project. Only the whitelisted fields below are accepted — anything else in the body is silently ignored, so the API surface stays predictable."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

## Body (any subset)

| Field | Type | Description |
|---|---|---|
| `website_name` | string | Display name |
| `name` | string | Alias for `website_name` |
| `widget_name` | string | Internal alias (usually mirrors `website_name`) |
| `allowed_website` | string | Domain(s) the script may run on (`*` = any) |
| `widget_allowed_website` | string | Alias for `allowed_website` |
| `monthly_average_traffic` | integer | Hint used for plan suggestions |

At least one updatable field must be supplied — empty body returns `400`.

## Example

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "website_name": "store.example.com (EU)",
    "monthly_average_traffic": 120000
  }'
```

## Success response

```json
{
  "success": true,
  "project": {
    "project_key": "PROJECT_KEY_AAAAAAAAAA",
    "name": "store.example.com (EU)",
    "website_name": "store.example.com (EU)",
    "monthly_average_traffic": 120000,
    "...": "..."
  }
}
```

The full project object is returned with the new values applied.

## Error responses

| Status | Meaning |
|---|---|
| `400` | No updatable fields supplied |
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Project not found |

</ApiEndpointLayout>
