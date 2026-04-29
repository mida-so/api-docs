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
  description="Start, pause, or deactivate an experiment by updating its status. This is the primary way to control an experiment's lifecycle via the API."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/status"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{status: 1}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Status values

Pass `status` as an integer:

| Value | Action |
|---|---|
| `1` | Start or resume the experiment. Visitors will be bucketed into variants. |
| `0` | Deactivate the experiment. No new data is collected, but existing data is preserved. Can be restarted. |
| `9` | Move back to draft (only valid from inactive). |

## Example: start an experiment

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": 1}'
```

## Example: deactivate a running experiment

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": 0}'
```

## Example: move back to draft

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": 9}'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "status": 1
}
```

## Plan limits (free &amp; Agency Lite) {#public-v2-plan-limits}

Activating an experiment (`status: 1`) counts toward the same **concurrent live experiment** limit as the Mida app (**2** per project) for **Sandbox** (`paid_plan` **300**) and **Agency Lite** (`paid_plan` **305**). If two other experiments are already live for this project, the API returns **`403`**.

This check applies when moving **from** draft or inactive **to** live. If the experiment is already live, updating status to `1` again does not re-check the cap.

See [Create Experiment — Plan limits](./create-experiment#public-v2-plan-limits).

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid status value — must be `0`, `1`, or `9` |
| `401` | Invalid or missing API key |
| `403` | [Plan limit](./create-experiment#public-v2-plan-limits) — maximum concurrent live experiments per project reached |
| `404` | Experiment not found |

:::tip Next step
Once your experiment is live and collecting data, use [Get Experiment Result](./get-experiment-result) to track per-variant conversion rates and improvement.
:::

</ApiEndpointLayout>
