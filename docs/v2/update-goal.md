---
sidebar_position: 15
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Goal"
  method="PATCH"
  endpoint="/v2/project/{project_key}/goal/{goal_profile_id}"
  description="Update fields on a goal profile. Only the fields you include are changed — all other fields remain unchanged."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/YOUR_GOAL_PROFILE_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    goal_name: 'CTA Button Click — Above Fold',
    goal_value: '.cta-button.above-fold'
  }}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `goal_profile_id` | The numeric goal profile ID |

## Updatable fields

| Field | Type | Description |
|---|---|---|
| `goal_name` | string | Rename the goal |
| `goal_type` | string | Change the conversion type |
| `goal_value` | string | Change the selector, URL, or trigger value |
| `goal_purpose` | string | Update the intent (`"sell"`, `"engage"`, `"generate"`) |
| `goal_key` | string | Change the slug (must remain unique per project) |
| `element_url` | string | Update the associated page URL |

## Example: change goal selector

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/3003" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "goal_value": ".cta-button.above-fold"
  }'
```

## Example: change goal type from click to form submit

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/3003" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "goal_type": "formSubmit",
    "goal_value": "form#signup-form",
    "goal_name": "Signup Form Submit"
  }'
```

## Success response

```json
{
  "success": true,
  "goal_profile_id": 3003
}
```

:::warning Changing a goal affects linked experiments
If this goal is set as the primary goal for one or more active experiments, changing its `goal_type` or `goal_value` will immediately affect what those experiments track as conversions.
:::

</ApiEndpointLayout>
