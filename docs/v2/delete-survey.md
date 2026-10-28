---
sidebar_position: 35
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Survey"
  method="DELETE"
  endpoint="/v2/project/{project_key}/survey/{survey_id}"
  description="Archive a survey: off the site and off the list. Its answers stay."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

There is no hard delete. An archived survey stops being shown, is left out of
[List Surveys](./list-surveys) unless you pass `include_archived=true`, and can't be edited or set
live again. Its results and responses stay readable.

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "survey_id": 42,
  "status": "archived"
}
```

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
