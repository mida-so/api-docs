---
sidebar_position: 9
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Serving Rollout"
  method="PATCH"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/serving-rollout"
  description="Change the rollout percentage for an experiment that is already serving a winner. Updates traffic_allocation without changing which variant is served."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/serving-rollout"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{traffic_allocation: 50}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `traffic_allocation` | number | Yes | Rollout percentage `0`–`100` of eligible visitors who receive the winning variant. |

## Example

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/serving-rollout" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"traffic_allocation": 50}'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "traffic_allocation": 50,
  "is_serving": true,
  "message": "Serving rollout percentage updated."
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | Missing or invalid `traffic_allocation` |
| `401` | Invalid or missing API key |
| `404` | Experiment not found |
| `409` | Experiment is not currently serving a winner |

:::tip Related
Initial serve: [Serve Experiment Winner](./serve-experiment-winner). Stop serving: [Stop Experiment Serving](./stop-experiment-serving).
:::

</ApiEndpointLayout>
