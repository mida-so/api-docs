---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Exclusion Group"
  method="PATCH"
  endpoint="/v2/project/{project_key}/exclusion-groups/{group_id}"
  description="Change an exclusion group's membership, splits, name or description. The tests array REPLACES the whole membership — to add one experiment, send the existing tests plus the new one."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups/GROUP_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `group_id` | The group's `id` from List Exclusion Groups |

## Body parameters

At least one field must be present.

| Field | Type | Description |
|---|---|---|
| `name` | string | New label |
| `description` | string | New note |
| `tests` | array | The **complete new membership**, replacing the old. Same rules as Create: at least two entries, percents all-or-none summing to 100 |

:::warning tests replaces the membership
Sending only the new experiment would silently drop every other experiment from the group. Call [List Exclusion Groups](./list-exclusion-groups) first and send the full list.
:::

## Example

Add experiment 34601 to a group that currently holds 34567 and 34580:

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups/42" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "tests": [
      {"test_id": 34567},
      {"test_id": 34580},
      {"test_id": 34601}
    ]
  }'
```

## Success response

```json
{
  "success": true,
  "group_id": 42,
  "group_name": "Pricing page tests",
  "tests": [
    { "test_id": 34567, "percent": 33 },
    { "test_id": 34580, "percent": 33 },
    { "test_id": 34601, "percent": 34 }
  ]
}
```

## Errors

| Status | Meaning |
|---|---|
| `400` | Invalid membership (see Create), or an empty body |
| `404` | No exclusion group with that id in this project |

</ApiEndpointLayout>
