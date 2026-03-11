---
sidebar_position: 14
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Goal Details"
  method="GET"
  endpoint="/v2/project/{project_key}/goal/{goal_profile_id}"
  description="Return the full definition of a single goal profile by its ID."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/YOUR_GOAL_PROFILE_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `goal_profile_id` | The numeric goal profile ID (from [Create Goal](./create-goal) or [List Goals](./list-goals)) |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/3003" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "goal": {
    "goal_profile_id": 3003,
    "goal_key": "cta_button_click",
    "goal_name": "CTA Button Click",
    "goal_type": "clickOnElement",
    "goal_value": ".cta-button",
    "goal_purpose": "sell",
    "element_url": "https://example.com/",
    "status": 1,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `goal.goal_profile_id` | integer | Unique goal ID |
| `goal.goal_key` | string | Slug identifier |
| `goal.goal_name` | string | Display name |
| `goal.goal_type` | string | Conversion type (see [Create Goal](./create-goal) for all types) |
| `goal.goal_value` | string | The selector, URL, or trigger value |
| `goal.goal_purpose` | string | Intent of the goal |
| `goal.element_url` | string\|null | Associated page URL |
| `goal.status` | integer | `1` = active, `2` = deleted |
| `goal.created_at` | string | ISO 8601 creation timestamp |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Goal not found or belongs to a different project |

</ApiEndpointLayout>
