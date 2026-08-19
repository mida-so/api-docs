---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Exclusion Groups"
  method="GET"
  endpoint="/v2/project/{project_key}/exclusion-groups"
  description="List the project's mutually exclusive groups. A group splits traffic so each visitor enters exactly one of its experiments, keeping tests that share a page from contaminating each other's results."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/exclusion-groups" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "groups": [
    {
      "id": 42,
      "name": "Pricing page tests",
      "description": "Both tests change the Growth plan card",
      "tests": [
        { "test_id": 34567, "percent": 50, "test_name": "Daily-cost framing", "status": 1 },
        { "test_id": 34580, "percent": 50, "test_name": "Annual toggle default", "status": 9 }
      ]
    }
  ]
}
```

`status` uses the experiment status codes: `1` live, `0` paused, `9` draft.

</ApiEndpointLayout>
