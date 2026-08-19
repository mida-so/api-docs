---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Exclusion Group"
  method="POST"
  endpoint="/v2/project/{project_key}/exclusion-groups"
  description="Make a set of experiments mutually exclusive: each visitor is assigned to exactly one of them, by traffic split. Use this when experiments overlap on the same page or audience — the answer to overlap is a group, not fewer tests."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Body parameters

| Field | Type | Description |
|---|---|---|
| `name` | string | **Required.** Label shown in the dashboard's Mutually Exclusive list |
| `description` | string | Optional note on why these are grouped |
| `tests` | array | **Required.** At least two entries of `{ "test_id": number, "percent"?: number }`. Every experiment must belong to this project. If any `percent` is given, all must be, and they must sum to 100. Omit all percents for an even split (3 tests → 33/33/34) |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pricing page tests",
    "tests": [
      {"test_id": 34567, "percent": 60},
      {"test_id": 34580, "percent": 40}
    ]
  }'
```

## Success response

```json
{
  "success": true,
  "name": "Pricing page tests",
  "tests": [
    { "test_id": 34567, "percent": 60 },
    { "test_id": 34580, "percent": 40 }
  ]
}
```

## Notes

- Experiments inside a group each read a share of the traffic, so they resolve more slowly than they would alone. Overlap contaminating both results is worse.
- If a group already covers the page, add the new experiment to it with [Update Exclusion Group](./update-exclusion-group) instead of creating a second group.

## Errors

| Status | Meaning |
|---|---|
| `400` | Fewer than two experiments, duplicates, percentages that do not sum to 100, or an experiment that is not in this project |

</ApiEndpointLayout>
