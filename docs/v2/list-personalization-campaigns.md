---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Personalization Campaigns"
  method="GET"
  endpoint="/v2/project/{project_key}/personalization/campaigns"
  description="This project's Personalization campaigns, newest first, with how many accounts each has, how many already have copy, and whether it is building or launched. Call this to find a campaign_id before adding accounts to one."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "campaigns": [
    {
      "abm_campaign_id": 23,
      "name": "TechSpo 2026",
      "status": "launched",
      "url": "/personalize/abm/23",
      "account_count": 12,
      "accounts_with_copy": 11,
      "launched": true,
      "building": true,
      "updated_at": "2026-08-21T04:12:08.000Z"
    }
  ]
}
```

## Response fields

| Field | Description |
|---|---|
| `account_count` | Companies on the campaign |
| `accounts_with_copy` | How many have usable copy. Lower than `account_count` while a build is running |
| `launched` | The campaign is serving. Accounts added to it publish as their copy finishes |
| `building` | A build is running now. Adding accounts while one runs queues them for the next build |

## Notes

- Returns the 15 most recently updated campaigns.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
