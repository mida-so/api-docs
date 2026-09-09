---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Set the Goal on a Personalization Campaign"
  method="PATCH"
  endpoint="/v2/project/{project_key}/personalization/campaigns/{campaign_id}"
  description="Attach a goal to a campaign that already exists, or change the one it has. A campaign cannot be launched without a goal, and a campaign created without one reports needs_goal until this is called."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `campaign_id` | The campaign to set the goal on. From [List Personalization Campaigns](list-personalization-campaigns) |

## Body parameters

| Field | Type | Description |
|---|---|---|
| `goal_profile_id` | number | **Required.** The goal that decides whether the personalization worked. From [List Goals](list-goals); create one first with [Create Goal](create-goal) if none fits |

## Example

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "goal_profile_id": 969 }'
```

## Success response

```json
{
  "success": true,
  "abm_campaign_id": 23,
  "name": "B2B Growth Marketers",
  "url": "/personalize/abm/23",
  "goal": {
    "goal_profile_id": 969,
    "goal_name": "Created an account",
    "goal_type": "script"
  },
  "previous_goal_profile_id": null,
  "changed": true,
  "launched": false,
  "needs_goal": false,
  "_note": "The campaign can now be launched from its page once the copy has been reviewed."
}
```

## Response fields

| Field | Description |
|---|---|
| `goal` | The goal now on the campaign |
| `previous_goal_profile_id` | The goal that was there before, or `null` if the campaign had none |
| `changed` | `false` when the campaign already had this exact goal |
| `launched` | Whether the campaign is live. On a live campaign the new goal takes effect immediately |

## Notes

- **The goal must belong to this project.** A goal from another project on the same account returns `400`; the campaign is never pointed at another site's goal.
- **On a live campaign this takes effect now.** Conversions count toward the new goal from this call onward. Conversions already recorded stay attributed to the goal that was set at the time.
- The goal lands on the campaign's generated experiment as well, which is what actually records conversions, so a change here is a change in the results you read back.
- Only `goal_profile_id` can be changed through this endpoint. Other campaign fields are edited from the dashboard.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
