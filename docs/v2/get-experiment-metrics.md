---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Metrics"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/metrics"
  description="Return dashboard-parity secondary metric rows for an experiment, with optional metric selection, date filtering, and dashboard-compatible filters."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/metrics"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Query parameters

| Parameter | Type | Description |
|---|---|---|
| `metric_keys` | string \| array | Metric or goal keys to retrieve instead of all attached secondary metrics. Accepts a comma-separated string or JSON array. |
| `goal_keys` | string \| array | Goal keys to retrieve as secondary metrics. Alias for `metric_keys` when goals are known. |
| `start_date` | string | Filter conversions from this date. Format: `YYYY-MM-DD`. |
| `end_date` | string | Filter conversions through this date. Format: `YYYY-MM-DD`. |
| `filter_by` | string | Dashboard preset segment filter such as `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`. |
| `custom_filter` | string \| array | Dashboard custom segment rules in the same nested rule shape used by the dashboard segment builder. |
| `metric_batch` | string \| array | Optional zero-based dashboard metric indexes to compute. |
| `tz` | string | Dashboard timezone hour offset used for date filtering. Defaults to `0`. |

All query parameters are optional. When `metric_keys` and `goal_keys` are omitted, Mida reads the experiment's attached secondary metrics from `test.metric`. Metric rows are produced by the same backend route as the Mida dashboard (`/abtest/metrics`). Metrics supports date range filters, single-sided dates, `filter_by`, `custom_filter`, `metric_keys`/`goal_keys`, and `metric_batch`.

:::info Metrics breakdowns
The dashboard metrics engine does not support `breakdown_by` yet. Requests that include `breakdown_by` return `400`.
:::

## Examples

Get all attached secondary metrics:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/metrics" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

Get specific goals in a date range:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/metrics" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'goal_keys=purchase,signup' \
  --data-urlencode 'start_date=2024-01-15' \
  --data-urlencode 'end_date=2024-02-15'
```

Filter secondary metrics to mobile traffic:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/metrics" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'filter_by=mobile'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "test_name": "Homepage CTA Button Color Test",
  "count": 2,
  "metric_count": 1,
  "metric_definitions": [
    {
      "metric_key": "purchase",
      "metric_text": "goal_purchase",
      "name": "Purchase",
      "type": 2,
      "goal": {
        "goal_key": "purchase",
        "goal_name": "Purchase",
        "goal_type": "revenue",
        "goal_value": "Purchase"
      }
    }
  ],
  "metrics": [
    {
      "variant_id": "0",
      "total": 1500,
      "result_1": 40
    },
    {
      "variant_id": "1",
      "total": 1480,
      "result_1": 52
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `test_id` | integer | Unique experiment ID |
| `test_name` | string | Experiment name |
| `count` | integer | Number of dashboard metric rows returned |
| `metric_count` | integer | Number of metric definitions requested |
| `metric_definitions` | array | Metric definitions used to build the dashboard `/metrics` request |
| `metrics` | array | Dashboard metric rows. Each row includes `variant_id`, `total`, and `result_N` fields for requested metric indexes. |
| `filter_by` | string | Applied dashboard preset filter, present when used |
| `custom_filter` | string \| array | Applied dashboard custom segment rules, present when used |
| `warnings` | array | Non-fatal warnings for unsupported or missing metric definitions |

### Metric row fields

| Field | Type | Description |
|---|---|---|
| `variant_id` | string | Variant identifier (`"0"` = control) |
| `total` | integer | Dashboard visitor count for the row |
| `result_N` | number | Dashboard metric result for the Nth metric definition. Public V2 does not synthesize conversion rates that `/abtest/metrics` does not return. |

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id`, malformed query parameters, unsupported filters, unsupported `breakdown_by`, use of structured `filters`, or date parameters are malformed / out of order |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::tip Next step
Need the primary goal result? Use [Get Experiment Result](./get-experiment-result).
:::

</ApiEndpointLayout>
