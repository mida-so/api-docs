---
sidebar_position: 7
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Experiment Status"
  method="PATCH"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/status"
  description="Start, pause, or end an experiment by updating its status. This is the primary way to control an experiment's lifecycle via the API."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/status"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{status: 'live'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Status values

Pass `status` as a string:

| Value | Action |
|---|---|
| `"live"` | Start or resume the experiment. Visitors will be bucketed into variants. |
| `"paused"` | Pause the experiment. No new data is collected, but existing data is preserved. |
| `"ended"` | End the experiment permanently. Cannot be restarted after this. |
| `"draft"` | Move back to draft (only valid from paused). |

## Example: start an experiment

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "live"}'
```

## Example: pause a running experiment

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "paused"}'
```

## Example: end an experiment

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "ended"}'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "status": "live"
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid status value |
| `401` | Invalid or missing API key |
| `404` | Experiment not found |

:::warning Ending an experiment is permanent
Once a status of `"ended"` is set, the experiment cannot be restarted. Use `"paused"` if you may want to resume it later.
:::

</ApiEndpointLayout>
