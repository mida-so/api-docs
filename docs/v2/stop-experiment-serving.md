---
sidebar_position: 9
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Stop Experiment Serving"
  method="POST"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/stop-serving"
  description="Stop serving the winner at 100% on an experiment. Clears serving_variant_id so visitors are no longer forced to the winning variant."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/stop-serving"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Request body

No body fields are required. Send `{}` or omit the body.

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/stop-serving" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "serving_variant_id": null,
  "is_serving": false,
  "message": "Serving stopped. Visitors are no longer forced to the winner variant."
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id` |
| `401` | Invalid or missing API key |
| `404` | Experiment not found |
| `409` | Experiment is not currently serving a winner |

:::tip Related
To start serving again, use [Serve Experiment Winner](./serve-experiment-winner).
:::

</ApiEndpointLayout>
