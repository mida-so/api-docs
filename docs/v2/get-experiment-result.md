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
| `goal_key` | string | Drill into a specific primary or secondary goal by `goal_key`. If omitted, the experiment's attached primary goal is used when present; otherwise the project's global primary goal from [Get Project Configuration](./get-project-configuration) is used. |
| `goal_profile_id` | string | Drill into a specific goal by internal goal ID. Prefer `goal_key` when available. |
| `filter_by` | string | Dashboard preset segment filter such as `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`. |
| `custom_filter` | string \| array | Dashboard custom segment rules in the same nested rule shape used by the dashboard segment builder. |
| `breakdown_by` | string | Segment results by a dashboard-supported dimension. See [Supported breakdowns](#supported-breakdowns). |
| `event_attribute` | array | Dashboard event attribute filters for event, revenue, and script goals. Use the dashboard nested condition shape. See [Event attribute filters](#event-attribute-filters). |
| `min_count` | number | Minimum matching event count per visitor for event-backed goals. Defaults to `1`. |
| `timeframe_days` | number | Event conversion window in days after test entry for event-backed goals. |
| `tz` | string | Dashboard timezone hour offset used for date filtering. Defaults to `0`. |
| `report_phase` | string | Which conversion period to include: `pre_deploy` (experiment split only), `post_deploy` (after [Set winner & serve](./serve-experiment-winner)), or `all_time` (both). Defaults to `pre_deploy` when the experiment is actively serving a winner. |

All query parameters are optional. Counts and conversion rates are produced by the same backend route as the Mida dashboard (`/abtest/conversion`). Date filters can be one-sided: if only `start_date` is supplied, results are filtered from that date through the current server date; if only `end_date` is supplied, results are filtered from the experiment creation date through that date. The previous Public V2 structured `filters` object is rejected for parity; use `filter_by` or `custom_filter`.

### Supported breakdowns

`device`, `browser`, `os`, `country`, `region`, `city`, `user_type`, `ref_page`, `landing_page`, `utm_campaign`, `utm_source`, `utm_medium`, `utm_content`, `utm_term`

UTM values are public aliases. Public V2 validates them against this allowlist, maps them to dashboard-safe `property.utm_*` values before calling `/abtest/conversion`, and rejects unsupported values with `400`.

`user_type` is derived from visitor age at test entry: `new` means the visitor record was created within 24 hours of the goal row timestamp; otherwise it is `returning`.

### Supported filters

Use the same filter inputs as the dashboard:

- `filter_by` for preset segments, for example `mobile`, `desktop`, `new`, `returning`, `paid`, `search`, `direct`, or `country-US`. Comma-separating different dimensions is AND (`desktop,country-US` = Desktop AND US); comma-separating multiple `country-XX` tokens is OR within country (`desktop,country-US,country-CA` = Desktop AND (US OR CA)).
- `custom_filter` for the dashboard's segment-builder rules in the same nested array shape: inner arrays are OR groups, outer arrays are AND groups.

#### `custom_filter` criteria

These are the same criteria the dashboard's Custom Segment form exposes:

| Criteria | Notes |
| --- | --- |
| `landing_page`, `ref_page`, `user_agent` | URL/string match against the visitor's landing page, referrer, or user-agent. |
| `queryparam` | Requires `key` (the query-string param name). |
| `source` | Fixed values: `direct`, `referral`, `social`, `search`, `nonpaid`, `paid`, `email`. |
| `device` | Fixed values: `mobile`, `desktop`, `tablet`. |
| `browser` | Fixed values: `chrome`, `firefox`, `safari`, `edge_chromium`, `edge_legacy`, `opera`, `ie`, `brave`, `vivaldi`, `yandex`, `chromium`, `samsung`, `uc`, `duckduckgo`, `silk`, `facebook`, `instagram`, `other`. |
| `os` | Fixed values: `windows`, `macos`, `ios`, `linux`. |
| `dayofweek` | Integer `0` (Monday) – `6` (Sunday). Also supports `>`, `>=`, `<`, `<=`. |
| `hourofday` | Integer `0` – `23`. Also supports `>`, `>=`, `<`, `<=`. |
| `visitor_type` | Fixed values: `new`, `returning`. |
| `country` | ISO 3166-1 alpha-2 uppercase (e.g. `US`, `GB`). Only `==`, `!=`, `**`, `!*`. |
| `v.visitor_id`, `v.uuid` | Visitor identifiers. 1–80 chars of `[A-Za-z0-9_-]`. Only `==`, `!=`, `**`, `!*`. |
| `attribute` | Visitor attribute. Requires `key`; supports extended operators including `gt`, `gte`, `lt`, `lte`, `bt`, `bf`, `days_gt`, `days_gte`, `days_lt`, `days_lte`. |
| `utm` | Requires `key` (the UTM param name). |

Operators (unless otherwise noted): `==`, `!=`, `**` (contains), `!*` (does not contain), `ex` (exists), `nx` (does not exist).

`region` and `city` are **not** `custom_filter` criteria — use a `filter_by` regional preset (`northamerica`, `europe`, `asiapacific`, `latinamerica`, `africa`, `middleeast`) or `breakdown_by=region`/`breakdown_by=city` to split results by them.

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
  --data-urlencode 'filter_by=mobile'
```

Custom segment — Desktop AND (US OR Canada) AND Chrome:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'custom_filter=[[{"criteria":"country","operator":"==","value":"US"},{"criteria":"country","operator":"==","value":"CA"}],[{"criteria":"device","operator":"==","value":"desktop"}],[{"criteria":"browser","operator":"==","value":"chrome"}]]'
```

Breakdown by device:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result?breakdown_by=device" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

Post-deploy results (after serving a winner):

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result?report_phase=post_deploy" \
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
  "stats_engine": "bayesian",
  "confidence_threshold_percent": 95,
  "serving_variant_id": "1",
  "is_serving": true,
  "report_phase": "pre_deploy",
  "traffic_allocation": 100,
  "distribution_mode": "equal",
  "is_mab": false,
  "total_visitors": 2980,
  "total_conversions": 268,
  "variants": [
    {
      "variant_id": "0",
      "name": "Control",
      "visitors": 1500,
      "conversions": 120,
      "conversion_rate": 8.0,
      "traffic_weight": 50,
      "variant_status": "active",
      "is_control": true
    },
    {
      "variant_id": "1",
      "name": "Red CTA Button",
      "visitors": 1480,
      "conversions": 148,
      "conversion_rate": 10.0,
      "improvement": 25.0,
      "traffic_weight": 50,
      "variant_status": "active",
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
| `stats_engine` | string | Statistical framework configured for this test: `"bayesian"` or `"frequentist"`. Mirrors the dashboard's per-test stats mode. Consumers (AI agents, dashboards, custom integrations) should speak in the matching framework — chance-to-beat-Control / expected loss for Bayesian tests, p-values / confidence intervals for Frequentist tests. |
| `confidence_threshold_percent` | number | Per-test deploy threshold (e.g. `95`). For Bayesian tests this is the chance-to-beat-Control needed to call a winner; for Frequentist tests this is the significance level (winners require `p < 1 - threshold/100`). |
| `serving_variant_id` | string \| null | When set, the variant id served at 100% after [Set winner & serve](./serve-experiment-winner). Omitted when not serving. |
| `is_serving` | boolean | `true` when `serving_variant_id` is set on the experiment. |
| `report_phase` | string | Echoes the `report_phase` query used (`pre_deploy`, `post_deploy`, or `all_time`). |
| `primary_goal` | object \| null | Primary conversion goal definition, or `null` if none set |
| `traffic_allocation` | number | Percent of eligible site visitors included in the experiment (0–100) |
| `distribution_mode` | string | Configured split mode: `"equal"`, `"custom"`, or `"mab"` |
| `is_mab` | boolean | `true` when smart optimization (MAB) is enabled |
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
| `traffic_weight` | number \| null | Configured share of experiment traffic for this arm (0–100). `null` when `is_mab` is `true`. |
| `variant_status` | string | `"active"` or `"paused"` (configured weight is 0) |
| `is_control` | boolean | Whether this is the control variant |

### Breakdown fields

Each breakdown item includes `criteria`, totals, conversion rate, and `variants` with lift calculated against Control within that segment.

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id`, malformed query parameters, unsupported filters, use of structured `filters`, or date parameters are malformed / out of order |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::info Serving a winner
To deploy a winning variant at 100% on the **same** experiment (without creating a separate deploy test), use [Serve Experiment Winner](./serve-experiment-winner). Then query with `report_phase=post_deploy` to read post-deploy stats, or `report_phase=all_time` for the full timeline.
:::

:::tip Next step
Need only configured traffic splits without result stats? Use [Get Experiment Distribution](./get-experiment-distribution). Need secondary goal results? Use [Get Experiment Metrics](./get-experiment-metrics). Done reviewing results? You can [deactivate the experiment](./update-experiment-status) (`status: 0`), [serve the winner](./serve-experiment-winner), or [get a public share link](./get-experiment-share-link) to send to stakeholders.
:::

</ApiEndpointLayout>
