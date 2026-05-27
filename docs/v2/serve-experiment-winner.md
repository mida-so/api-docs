---
sidebar_position: 8
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Serve Experiment Winner"
  method="POST"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/serve-winner"
  description="Set winner and serve the winning variant at 100% on the same experiment — the API equivalent of the dashboard Set winner & serve. Does not create a separate deploy test."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/serve-winner"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{variant_id: '1'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `variant_id` | string | Yes | Winning variant id (e.g. `"1"` for Variant 1). Same id as in [Get Experiment Result](./get-experiment-result) variant rows. Alias: `serving_variant_id`. |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/serve-winner" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"variant_id": "1"}'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "serving_variant_id": "1",
  "is_serving": true,
  "message": "Winner is now served at 100% to eligible traffic on the same experiment."
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `serving_variant_id` | string | Variant now served at 100% |
| `is_serving` | boolean | Always `true` on success |

After serving, conversions are tagged in the `goal` table with `is_serving=1`. Use `report_phase=post_deploy` on [Get Experiment Result](./get-experiment-result), [Get Experiment Timeseries](./get-experiment-timeseries), and [Get Experiment Metrics](./get-experiment-metrics) to read post-deploy stats.

## Error responses

| Status | Meaning |
|---|---|
| `400` | Missing `variant_id` or invalid `test_id` |
| `401` | Invalid or missing API key |
| `404` | Experiment not found |
| `409` | Experiment cannot serve (e.g. draft, already serving, or business rule violation) |

:::info Legacy deploy tests
Older Mida accounts may still have separate `is_deploy=1` deploy campaigns. This endpoint updates the **same** A/B test row via `serving_variant_id`. Legacy deploy flows are unchanged and are not created by this endpoint.
:::

:::tip Next step
To stop forcing the winner variant, use [Stop Experiment Serving](./stop-experiment-serving).
:::

</ApiEndpointLayout>
