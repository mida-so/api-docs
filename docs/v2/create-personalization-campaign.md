---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Personalization Campaign"
  method="POST"
  endpoint="/v2/project/{project_key}/personalization/campaigns"
  description="Build a new Personalization campaign. Two strategies: accounts researches named companies and writes copy for each, personas writes one version per job role with no company list and no research. Returns a campaign to open, not a finished campaign, and never publishes."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Body parameters

| Field | Type | Description |
|---|---|---|
| `strategy` | string | **Required.** `"accounts"` or `"personas"` |
| `name` | string | Short campaign name. One is invented if you leave it out |
| `page_urls` | array | **Required.** Pages to personalize, on your own site. Take these from [Suggested Pages](personalization-suggested-pages) |
| `goal_profile_id` | number | The conversion that decides whether personalization worked. Optional, but the campaign cannot be launched without one |
| `accounts` | array | **Required when `strategy` is `accounts`.** Entries of `{ "name", "domain"?, "notes"? }` |
| `personas` | array | **Required when `strategy` is `personas`.** Entries of `{ "label", "description"? }` |
| `persona_param` | string | `personas` only. The URL parameter carrying the role: `utm_campaign` (default), `utm_term`, `utm_medium`, `utm_source` or `ref` |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "strategy": "accounts",
    "name": "Q3 enterprise outbound",
    "page_urls": ["https://yoursite.com/", "https://yoursite.com/pricing"],
    "goal_profile_id": 969,
    "accounts": [
      {"name": "Notion", "domain": "notion.so", "notes": "Evaluating against Optimizely."}
    ]
  }'
```

## Success response

```json
{
  "success": true,
  "abm_campaign_id": 41,
  "name": "Q3 enterprise outbound",
  "url": "/personalize/abm/41",
  "account_count": 1,
  "page_urls": ["https://yoursite.com/", "https://yoursite.com/pricing"],
  "building": true,
  "needs_goal": false
}
```

## Notes

- **Nothing goes live.** The campaign is built for review and someone launches it from the dashboard. To add to a campaign that is already running, use [Add Accounts](add-personalization-accounts) instead of creating a second one.
- The build is asynchronous and costs a few minutes per account. Poll [Get Campaign](get-personalization-campaign) rather than assuming it finished.
- `page_urls` must be on your project's own verified domains. The builder fetches each page, so anything else is refused and the response names what was refused and why.
- The two strategies are not the same product. Accounts are deep and slow, matched by an opaque token in a link you send. Personas are cheap and immediate, matched by a plain URL parameter your ad's destination already carries.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
