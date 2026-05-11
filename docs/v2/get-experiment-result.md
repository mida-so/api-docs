---
sidebar_position: 4
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Result"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/result"
  description="Return dashboard-parity conversion results for an experiment, with optional goal drilldowns, dashboard-compatible filters, and breakdowns."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/result"
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
| `start_date` | string | Filter conversions from this date. Format: `YYYY-MM-DD`. |
| `end_date` | string | Filter conversions through this date. Format: `YYYY-MM-DD`. |
| `goal_key` | string | Drill into a specific primary or secondary goal by `goal_key`. If omitted, the experiment primary goal is used. |
| `goal_profile_id` | string | Drill into a specific goal by internal goal ID. Prefer `goal_key` when available. |
| `filterBy` / `filter_by` | string | Dashboard preset segment filter such as `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`. |
| `custom_filter` | string \| array | Dashboard custom segment rules in the same nested rule shape used by the dashboard segment builder. |
| `breakdownBy` / `breakdown_by` | string | Segment results by a dashboard-supported dimension. See [Supported breakdowns](#supported-breakdowns). |
| `event_attribute` | array | Dashboard event attribute filters for event, revenue, and script goals. Use the dashboard nested condition shape. See [Event attribute filters](#event-attribute-filters). |
| `minCount` | number | Minimum matching event count per visitor for event-backed goals. Defaults to `1`. |
| `timeframeDays` | number | Event conversion window in days after test entry for event-backed goals. |
| `tz` | string | Dashboard timezone hour offset used for date filtering. Defaults to `0`. |

All query parameters are optional. Counts and conversion rates are produced by the same backend route as the Mida dashboard (`/abtest/conversion`). Date filters can be one-sided: if only `start_date` is supplied, results are filtered from that date through the current server date; if only `end_date` is supplied, results are filtered from the experiment creation date through that date. The previous Public V2 structured `filters` object is rejected for parity; use `filterBy`/`filter_by` or `custom_filter`.

### Supported breakdowns

`device`, `browser`, `os`, `country`, `region`, `city`, `user_type`, `ref_page`, `landing_page`, `utm_campaign`, `utm_source`, `utm_medium`, `utm_content`, `utm_term`

UTM values are public aliases. Public V2 validates them against this allowlist, maps them to dashboard-safe `property.utm_*` values before calling `/abtest/conversion`, and rejects unsupported values with `400`.

`user_type` is derived from visitor age at test entry: `new` means the visitor record was created within 24 hours of the goal row timestamp; otherwise it is `returning`.

### Supported filters

Use the same filter inputs as the dashboard:

- `filterBy` / `filter_by` for preset segments, for example `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`.
- `custom_filter` for saved/custom segment rules, for example `[[{"criteria":"device","operator":"==","value":"mobile"}]]`.

### Event attribute filters

`event_attribute` must be valid JSON in the nested dashboard shape: an outer OR array containing inner AND arrays of filter objects. Each object supports `key`, `operand`, and `value`; `operator` is accepted as an alias for `operand`.

Supported operands are `=`, `!=`, `>`, `<`, `>=`, `<=`, `**` (contains), `!*` (does not contain), `ex` (exists), and `nx` (does not exist). Keys may contain only letters, numbers, `_`, `.`, and `-`, up to 80 characters. Values are capped at 500 characters.

## Examples

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

With date filtering:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result?start_date=2024-01-15&end_date=2024-02-15" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

Filtered to mobile traffic:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'filterBy=mobile'
```

Breakdown by device:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result?breakdown_by=device" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

Specific goal with event attribute filters:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result" \
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
  "status": "live",
  "status_code": 1,
  "start_date": "2024-01-15T10:30:00.000Z",
  "end_date": null,
  "days_running": 15,
  "primary_goal": {
    "goal_name": "CTA Button Click",
    "goal_type": "clickOnElement",
    "goal_value": ".cta-button"
  },
  "total_visitors": 2980,
  "total_conversions": 268,
  "variants": [
    {
      "variant_id": "0",
      "name": "Control",
      "visitors": 1500,
      "conversions": 120,
      "conversion_rate": 8.0,
      "is_control": true
    },
    {
      "variant_id": "1",
      "name": "Red CTA Button",
      "visitors": 1480,
      "conversions": 148,
      "conversion_rate": 10.0,
      "improvement": 25.0,
      "is_control": false
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `test_id` | integer | Unique experiment ID |
| `test_name` | string | Experiment name |
| `status` | string | Human-readable label: `"draft"`, `"live"`, or `"inactive"` |
| `status_code` | integer | Numeric status: `9`=draft, `1`=live, `0`=inactive |
| `start_date` | string | When the experiment was created (ISO 8601) |
| `end_date` | string \| null | The date the experiment was formally concluded, or `null`. See note below. |
| `days_running` | integer | Days since creation. If the experiment is concluded, counts to the `end_date`; otherwise counts to now. |
| `primary_goal` | object \| null | Primary conversion goal definition, or `null` if none set |
| `total_visitors` | integer | Total visitors across all variants |
| `total_conversions` | integer | Total conversions across all variants |
| `variants` | array | Per-variant result objects (control listed first) |
| `breakdown_by` | string | Present when `breakdown_by` is requested |
| `breakdowns` | array | Per-segment totals and variant results, present when `breakdown_by` is requested |

:::info About `end_date` and `is_completed`
`end_date` is only populated when the experiment has been **formally concluded** from the Mida dashboard (marked as complete). Deactivating an experiment via the API (`status: 0`) stops data collection but does **not** set `end_date` — it remains `null`. The `days_running` calculation uses `end_date` if set, otherwise counts to the current time.
:::

### Variant fields

| Field | Type | Description |
|---|---|---|
| `variant_id` | string | Variant identifier (`"0"` = control) |
| `name` | string | Variant display name |
| `visitors` | integer | Unique visitors assigned to this variant |
| `conversions` | integer | Number of visitors who converted |
| `conversion_rate` | number | Conversion rate as a percentage (e.g. `10.0` = 10%) |
| `improvement` | number | Relative lift vs the control in percent (e.g. `25.0` = +25%). Only present on non-control variants when the control has data. |
| `is_control` | boolean | Whether this is the control variant |

### Breakdown fields

Each breakdown item includes `criteria`, totals, conversion rate, and `variants` with lift calculated against Control within that segment.

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id`, malformed query parameters, unsupported filters, use of structured `filters`, or date parameters are malformed / out of order |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::tip Next step
Need secondary goal results? Use [Get Experiment Metrics](./get-experiment-metrics). Done reviewing results? You can [deactivate the experiment](./update-experiment-status) (`status: 0`) or [get a public share link](./get-experiment-share-link) to send to stakeholders.
:::

</ApiEndpointLayout>
