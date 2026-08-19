---
sidebar_position: 4
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Project Configuration"
  method="PATCH"
  endpoint="/v2/project/{project_key}/configuration"
  description="Update project-level Global Settings: the default primary goal, secondary metrics, stats engine, and confidence level that every newly created experiment inherits. Partial update: send only the fields you want to change. Existing experiments are not touched."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/configuration"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Body parameters

All fields are optional, but at least one must be present.

| Field | Type | Description |
|---|---|---|
| `analysis_method` | string | `"1"` Bayesian (default), `"0"` Frequentist |
| `frequentist_type` | string | Frequentist only: `"0"` one-tailed, `"2"` two-tailed |
| `confidence_level` | number | Confidence threshold percent, 50–99 |
| `primary_goal_key` | string \| null | `goal_key` of the default primary goal. `null` clears it. Must belong to this project |
| `secondary_goals` | array | **Replaces** the whole secondary metric list. Entries are `{ "goal_key": "..." }` for goals, or `{ "text": "...", "name": "..." }` for built-in metrics (`BounceRate`, `_engagement`, `_pageview`) and custom event names. `[]` clears the list |
| `weekly_ai_summary_enabled` | boolean | Weekly AI summary email |
| `skip_pre_publish_check` | boolean | Skip the pre-publish QA check |

## Example

Set the confidence level to 90% without touching anything else:

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/configuration" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"confidence_level": 90}'
```

Set a default primary goal and secondary metrics:

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/configuration" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "primary_goal_key": "cta_button_click",
    "secondary_goals": [
      {"goal_key": "add_to_cart"},
      {"text": "BounceRate", "name": "Bounce Rate"}
    ]
  }'
```

## Success response

Returns the full configuration now in force, in the same shape as Get Project Configuration:

```json
{
  "success": true,
  "configuration": {
    "analysis_method": "1",
    "frequentist_type": "0",
    "confidence_level": "90",
    "primary_goal_id": 3003,
    "secondary_goals": [
      { "type": 2, "text": "goal_3004", "name": "Add to Cart", "attributeFilter": null },
      { "type": 2, "text": "BounceRate", "name": "Bounce Rate", "attributeFilter": null }
    ],
    "weekly_ai_summary_enabled": false,
    "skip_pre_publish_check": false
  }
}
```

## Errors

| Status | Meaning |
|---|---|
| `400` | Invalid field value, or no recognised field in the body |
| `404` | A `goal_key` / `goal_profile_id` that does not belong to this project |

</ApiEndpointLayout>
