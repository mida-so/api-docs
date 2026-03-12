---
sidebar_position: 12
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Goals"
  method="GET"
  endpoint="/v2/project/{project_key}/goals"
  description="Return all goal profiles for the selected project. Goals define what counts as a conversion in your experiments."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goals?limit=50&offset=0"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `50` | Max results to return. Maximum `500`. |
| `offset` | integer | `0` | Number of records to skip (for pagination). |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goals?limit=50&offset=0" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "company_id": 1001,
  "count": 2,
  "goals": [
    {
      "goal_profile_id": 3003,
      "goal_key": "cta_button_click",
      "goal_name": "CTA Button Click",
      "goal_type": "clickOnElement",
      "goal_value": ".cta-button",
      "goal_purpose": "sell",
      "element_url": "https://example.com/"
    },
    {
      "goal_profile_id": 3004,
      "goal_key": "signup_page_view",
      "goal_name": "Signup Page View",
      "goal_type": "pageview",
      "goal_value": "https://example.com/signup",
      "goal_purpose": "sell",
      "element_url": null
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `goals` | array | List of goal profile objects |
| `goals[].goal_profile_id` | integer | Unique goal ID — use this in other goal endpoints |
| `goals[].goal_key` | string | Slug identifier for use when referencing goals in experiments |
| `goals[].goal_name` | string | Human-readable display name |
| `goals[].goal_type` | string | The type of conversion tracked (see [Create Goal](./create-goal) for all types) |
| `goals[].goal_value` | string | The selector, URL, or value that triggers this goal |
| `goals[].element_url` | string\|null | Optional page URL associated with the goal element |
| `count` | integer | Total number of goals returned |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |

:::tip Next step
Use the `goal_key` from this list to reference an existing goal when [creating an experiment](./create-experiment) — pass it as `primary_goal_key` instead of defining the goal inline.
:::

</ApiEndpointLayout>
