---
sidebar_position: 16
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Goal"
  method="DELETE"
  endpoint="/v2/project/{project_key}/goal/{goal_profile_id}"
  description="Soft-delete a goal profile. The record is preserved in the database but will no longer appear in the Goals list or be selectable for new experiments."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/YOUR_GOAL_PROFILE_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `goal_profile_id` | The numeric goal profile ID to delete |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal/3003" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "goal_profile_id": 3003,
  "deleted": true
}
```

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Goal not found or belongs to a different project |

:::info Soft delete
This operation sets `status = 2` on the goal profile. The data is not permanently removed. Historical conversion data linked to this goal in past experiments is preserved.
:::

:::warning Check for experiment dependencies first
If this goal is currently set as the primary goal for any live experiment, deleting it may cause those experiments to stop tracking conversions. Check your active experiments before deleting a goal.
:::

</ApiEndpointLayout>
