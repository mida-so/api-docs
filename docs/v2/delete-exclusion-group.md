---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Exclusion Group"
  method="DELETE"
  endpoint="/v2/project/{project_key}/exclusion-groups/{group_id}"
  description="Remove a mutually exclusive group. The experiments in it keep running — they just stop being exclusive, so a visitor can enter more than one of them again."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups/GROUP_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `group_id` | The group's `id` from List Exclusion Groups |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups/42" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "group_id": 42,
  "group_name": "Pricing page tests",
  "note": "Removed. 2 experiments keep running, but they are no longer exclusive — a visitor can enter more than one of them again."
}
```

## Errors

| Status | Meaning |
|---|---|
| `404` | No exclusion group with that id in this project |

</ApiEndpointLayout>
