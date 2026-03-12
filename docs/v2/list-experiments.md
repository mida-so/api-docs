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
      "status": 1,
      "is_completed": 0,
      "created_at": "2024-01-15T10:30:00.000Z",
      "updated_at": "2024-01-20T14:22:00.000Z"
    },
    {
      "test_id": 1235,
      "test_name": "Pricing Page Hero Copy Test",
      "url": "https://example.com/pricing",
      "status": 0,
      "is_completed": 1,
      "created_at": "2024-02-01T08:00:00.000Z",
      "updated_at": "2024-03-01T09:00:00.000Z"
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
| `experiments[].is_completed` | integer | `1` if the experiment was formally concluded via the dashboard, `0` otherwise. Deactivating via API (`status: 0`) does not set this — it is only set from the Mida dashboard. |
| `experiments[].created_at` | string | ISO 8601 creation timestamp |
| `experiments[].updated_at` | string | ISO 8601 last-updated timestamp |
| `count` | integer | Total number of experiments returned |

### Status values

| Value | Meaning |
|---|---|
| `9` | Draft — created but not yet started |
| `1` | Live — actively running |
| `0` | Inactive — deactivated or paused |

## Pagination

Increment `offset` by `limit` to retrieve the next page.

```bash
# Page 2 with 20 results per page
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiments?limit=20&offset=20" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |

:::tip Next step
Use the `test_id` from this response to call [Get Experiment Details](./get-experiment-details) or [Get Experiment Result](./get-experiment-result).
:::

</ApiEndpointLayout>
