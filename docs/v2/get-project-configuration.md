---
sidebar_position: 3
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Project Configuration"
  method="GET"
  endpoint="/v2/project/{project_key}/configuration"
  description="Return project-level Global Settings: default primary goal, secondary metrics, stats engine, and confidence threshold. Experiments without an attached primary goal use this default when you call Get Experiment Result or Get Experiment Timeseries without goal_key."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/configuration"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/configuration" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "configuration": {
    "analysis_method": "1",
    "frequentist_type": "0",
    "confidence_level": "95",
    "stats_engine": "bayesian",
    "confidence_threshold_percent": 95,
    "weekly_ai_summary_enabled": false,
    "primary_goal_id": 3003,
    "primary_goal": {
      "goal_profile_id": 3003,
      "goal_key": "cta_button_click",
      "goal_name": "CTA Button Click",
      "goal_type": "clickOnElement",
      "goal_value": ".cta-button"
    },
    "secondary_goals": [
      {
        "type": 2,
        "text": "goal_3004",
        "name": "Add to Cart",
        "goal_profile_id": 3004,
        "goal_key": "add_to_cart",
        "goal_type": "event",
        "goal_value": "AddToCart"
      },
      {
        "type": 2,
        "text": "Purchase",
        "name": "Purchase",
        "event_name": "Purchase"
      }
    ]
  }
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `configuration.analysis_method` | string | `1` = Bayesian (dashboard default), `0` = Frequentist |
| `configuration.frequentist_type` | string | When Frequentist: `0` = one-tailed, `2` = two-tailed |
| `configuration.confidence_level` | string | Deploy threshold as configured in Global Settings (e.g. `95`) |
| `configuration.stats_engine` | string | `bayesian` or `frequentist` — derived from `analysis_method` |
| `configuration.confidence_threshold_percent` | number | Same as `confidence_level`, numeric |
| `configuration.weekly_ai_summary_enabled` | boolean | Whether weekly AI summary emails are enabled |
| `configuration.primary_goal_id` | integer \| null | Global default primary goal profile ID |
| `configuration.primary_goal` | object \| null | Resolved goal profile for `primary_goal_id` |
| `configuration.secondary_goals` | array | Secondary metrics from Global Settings. Goal entries (`text` = `goal_<id>`) include resolved `goal_profile_id`, `goal_key`, `goal_type`, and `goal_value`. Event entries include `event_name`. |

### Default goal resolution for experiment results

When you call [Get Experiment Result](./get-experiment-result) or [Get Experiment Timeseries](./get-experiment-timeseries) **without** `goal_key` or `goal_profile_id`:

1. If the experiment has an attached primary goal, that goal is used.
2. Otherwise, if `configuration.primary_goal` is set, that global default is used.
3. The response `selected_goal.goal_source` is `global_default` when the global goal was applied.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Project not found |

</ApiEndpointLayout>
