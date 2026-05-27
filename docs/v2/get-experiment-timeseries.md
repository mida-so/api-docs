---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Timeseries"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/timeseries"
  description="Return dashboard-parity daily chart rows for an experiment using the same backend raw report engine as the Mida dashboard."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/timeseries"
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
| `start_date` | string | Filter chart rows from this date. Format: `YYYY-MM-DD`. |
| `end_date` | string | Filter chart rows through this date. Format: `YYYY-MM-DD`. |
| `goal_key` | string | Drill into a specific primary or secondary goal by `goal_key`. If omitted, the experiment's attached primary goal is used when present; otherwise the project's global primary goal from [Get Project Configuration](./get-project-configuration) is used. |
| `goal_profile_id` | string | Drill into a specific goal by internal goal ID. Prefer `goal_key` when available. |
| `filter_by` | string | Dashboard preset segment filter such as `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`. |
| `custom_filter` | string \| array | Dashboard custom segment rules in the same nested rule shape used by the dashboard segment builder. |
| `event_attribute` | array | Dashboard event attribute filters for event, revenue, and script goals. Use the dashboard nested condition shape. |
| `min_count` | number | Minimum matching event count per visitor for event-backed goals. Defaults to `1`. |
| `timeframe_days` | number | Event conversion window in days after test entry for event-backed goals. |
| `tz` | string | Dashboard timezone hour offset used for date filtering. Defaults to `0`. |
| `report_phase` | string | Which conversion period to include: `pre_deploy`, `post_deploy`, or `all_time`. Same semantics as [Get Experiment Result](./get-experiment-result#query-parameters). |

All query parameters are optional. Rows are produced by the same backend route as the Mida dashboard chart (`/abtest/raw`). Date filters can be one-sided: if only `start_date` is supplied, Public V2 expands the request through the current server date before calling `/abtest/raw`; if only `end_date` is supplied, Public V2 expands the request from the experiment creation date through that date.

The previous Public V2 structured `filters` object is rejected for dashboard parity. Use `filter_by` or `custom_filter`.

### Supported filters

- `filter_by`: dashboard preset segments. Comma-separated tokens across dimensions are AND; multiple `country-XX` tokens are OR within country (`desktop,country-US,country-CA` = Desktop AND (US OR CA)).
- `custom_filter`: same nested AND/OR shape as the dashboard's Custom Segment form. See [Get experiment result › `custom_filter` criteria](./get-experiment-result.md#custom_filter-criteria) for the full criteria/operator table. Common criteria: `landing_page`, `ref_page`, `queryparam`, `source`, `os`, `browser`, `user_agent`, `device`, `dayofweek`, `hourofday`, `visitor_type`, `country` (ISO-2 uppercase), `v.visitor_id`, `v.uuid`, `attribute`, `utm`.

## Examples

With date filtering:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/timeseries?start_date=2024-01-15&end_date=2024-02-15" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

Filtered to mobile traffic:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/timeseries" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'filter_by=mobile'
```

Custom segment — Desktop AND US:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/timeseries" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'custom_filter=[[{"criteria":"device","operator":"==","value":"desktop"}],[{"criteria":"country","operator":"==","value":"US"}]]'
```

Specific goal with event attribute filters:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/timeseries" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'goal_key=purchase' \
  --data-urlencode 'event_attribute=[[{"key":"revenue","operand":">","value":100},{"key":"currency","operand":"=","value":"USD"}]]'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "test_name": "Homepage CTA Button Color Test",
  "goal": {
    "goal_profile_id": 5678,
    "goal_key": "purchase",
    "goal_name": "Purchase",
    "goal_type": "revenue",
    "goal_value": "Purchase",
    "is_primary": true
  },
  "count": 2,
  "timeseries": [
    {
      "variant_id": "0",
      "converted": 12,
      "conversion": 8,
      "visitors": 150,
      "revenue": 1200,
      "currency": "USD",
      "created_at": "2024-01-15T00:00:00.000Z",
      "updated_at": "2024-01-15T00:00:00.000Z"
    },
    {
      "variant_id": "1",
      "converted": 18,
      "conversion": 12,
      "visitors": 150,
      "revenue": 1620,
      "currency": "USD",
      "created_at": "2024-01-15T00:00:00.000Z",
      "updated_at": "2024-01-15T00:00:00.000Z"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `test_id` | integer | Unique experiment ID |
| `test_name` | string | Experiment name |
| `primary_goal` | object \| null | Primary conversion goal definition, or `null` if none set |
| `goal` / `selected_goal` | object \| null | Goal used for this report |
| `query_start_date` | string | Present when `start_date` is requested |
| `query_end_date` | string | Present when `end_date` is requested |
| `effective_start_date` | string | Present when Public V2 expands a one-sided date range |
| `effective_end_date` | string | Present when Public V2 expands a one-sided date range |
| `count` | integer | Number of raw dashboard rows returned |
| `timeseries` | array | Raw dashboard chart rows returned by `/abtest/raw` |

### Timeseries row fields

Rows preserve the dashboard raw chart fields. Common fields include `variant_id`, `converted`, `conversion`, `visitors`, `revenue`, `quantity`, `no_of_order`, `currency`, `start_date`, `end_date`, `duration`, `created_at`, and `updated_at`. Revenue goals may include additional raw fields such as `sum_sq_revenue`, `sum_sq_orders`, `sum_revenue_orders_cross`, `gross_profit`, or `total_cogs`.

:::info Dashboard parity
This endpoint wraps `/abtest/raw` and does not recalculate chart math in Public V2. Use [Get Experiment Result](./get-experiment-result) for aggregate variant summaries, conversion rates, and optional breakdowns. Use this endpoint for charts and trends over time.
:::

### Filter safety

Public V2 validates `event_attribute`, `filter_by`, `custom_filter`, numeric frequency settings, and `tz` before forwarding to the dashboard raw route. Unsupported legacy `filters` are rejected with `400`.

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id`, malformed query parameters, unsupported filters, use of structured `filters`, or date parameters are malformed / out of order |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::tip Next step
Need aggregate totals instead of daily rows? Use [Get Experiment Result](./get-experiment-result). Need secondary metric rows? Use [Get Experiment Metrics](./get-experiment-metrics).
:::

</ApiEndpointLayout>
