---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Personalization Campaign"
  method="GET"
  endpoint="/v2/project/{project_key}/personalization/campaigns/{campaign_id}"
  description="One campaign in enough detail to answer how a build is going and what is left: the stage it reached, how many accounts were researched and had copy written, which failed and why, and whether it still needs a goal before it can be launched."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `campaign_id` | From [List Personalization Campaigns](list-personalization-campaigns) |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "abm_campaign_id": 23,
  "name": "TechSpo 2026",
  "status": "launched",
  "launched": true,
  "needs_goal": false,
  "account_count": 12,
  "accounts_with_copy": 11,
  "pipeline": {
    "status": "running",
    "stage": "copy",
    "research": { "total": 1, "done": 1, "failed": 0 },
    "copy": { "total": 1, "done": 0, "failed": 0 }
  }
}
```

## Notes

- Poll this rather than assuming a build finished. A build costs a few minutes per account because each company is researched on the live web first.
- The account list is capped, and the response says so when it is truncated. A shortened list read as complete is how you conclude an account is missing when it is merely unlisted.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
