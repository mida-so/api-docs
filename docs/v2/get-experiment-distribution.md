---
sidebar_position: 3.5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Distribution"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/distribution"
  description="Return configured per-variant traffic splits for an experiment — a compact alternative to Get Experiment Details when you only need allocation weights."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/distribution"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/distribution" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "test_name": "Homepage CTA Button Color Test",
  "status": "live",
  "traffic_allocation": 100,
  "distribution_mode": "custom",
  "is_mab": false,
  "variants": [
    {
      "variant_id": "0",
      "name": "Control",
      "traffic_weight": 50,
      "variant_status": "active"
    },
    {
      "variant_id": "1",
      "name": "Red CTA Button",
      "traffic_weight": 50,
      "variant_status": "active"
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
| `traffic_allocation` | number | Percent of eligible site visitors included in the experiment (0–100). The remainder is excluded from the test entirely. |
| `distribution_mode` | string | How traffic is split among arms: `"equal"` (default even split), `"custom"` (saved custom distribution), or `"mab"` (multi-armed bandit — dynamic splits). |
| `is_mab` | boolean | `true` when smart optimization (MAB) is enabled. |
| `variants` | array | Per-variant distribution objects (control listed first) |

### Variant fields

| Field | Type | Description |
|---|---|---|
| `variant_id` | string | Variant identifier (`"0"` = control) |
| `name` | string | Variant display name |
| `traffic_weight` | number \| null | Configured share of experiment traffic for this arm (0–100). Sums to 100 across active arms for `equal` and `custom` modes. `null` when `is_mab` is `true` because splits are computed dynamically. |
| `variant_status` | string | `"active"` when `traffic_weight` is greater than 0, or `"paused"` when the configured weight is 0. For MAB tests, always `"active"`. |

:::info Configured vs realized traffic
`traffic_weight` reflects the **configured** split saved in experiment settings — not realized visitor counts from results. To compare configured allocation against actual traffic share, combine this endpoint with [Get Experiment Result](./get-experiment-result) or [Get Experiment Timeseries](./get-experiment-timeseries).
:::

:::info MAB tests
When `distribution_mode` is `"mab"`, per-variant `traffic_weight` is `null`. Use realized visitor shares from result or timeseries endpoints to describe current MAB allocation.
:::

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id` |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::tip Next step
Need conversion stats alongside configured splits? Use [Get Experiment Result](./get-experiment-result) — each variant row also includes `traffic_weight` and `variant_status`.
:::

</ApiEndpointLayout>
