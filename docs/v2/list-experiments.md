---
sidebar_position: 2
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Experiments"
  method="GET"
  endpoint="/v2/project/{project_key}/experiments"
  description="Return all experiments for the company tied to the provided project key. Supports pagination."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiments?limit=50&offset=0"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `50` | Max results to return. Maximum `500`. |
| `offset` | integer | `0` | Number of records to skip (for pagination). |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiments?limit=20&offset=0" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "company_id": 1001,
  "count": 2,
  "experiments": [
    {
      "test_id": 1234,
      "test_name": "Homepage CTA Button Color Test",
      "url": "https://example.com/",
      "status": 9,
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    {
      "test_id": 1235,
      "test_name": "Pricing Page Hero Copy Test",
      "url": "https://example.com/pricing",
      "status": 4,
      "created_at": "2024-02-01T08:00:00.000Z"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `experiments` | array | List of experiment objects |
| `experiments[].test_id` | integer | Unique experiment ID — use this in all other experiment endpoints |
| `experiments[].test_name` | string | Display name |
| `experiments[].url` | string | The page URL being tested |
| `experiments[].status` | integer | Numeric status (see table below) |
| `experiments[].created_at` | string | ISO 8601 creation timestamp |
| `count` | integer | Total number of experiments returned |

### Status values

| Value | Meaning |
|---|---|
| `1` | Draft — created but not yet started |
| `9` | Live — actively running |
| `3` | Paused — temporarily stopped |
| `4` | Ended — completed |

## Pagination

Increment `offset` by `limit` to retrieve the next page.

```bash
# Page 2 with 20 results per page
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiments?limit=20&offset=20" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

</ApiEndpointLayout>
