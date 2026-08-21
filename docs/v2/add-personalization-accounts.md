---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Add Accounts to a Personalization Campaign"
  method="POST"
  endpoint="/v2/project/{project_key}/personalization/campaigns/{campaign_id}/accounts"
  description="Add companies to a campaign that already exists and get each one's link back immediately. The link is final on return, so it is safe to store or send straight away; the researched copy lands behind that same URL over the following minutes."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23/accounts"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `campaign_id` | The campaign to add to. From [List Personalization Campaigns](list-personalization-campaigns) |

## Body parameters

| Field | Type | Description |
|---|---|---|
| `accounts` | array | **Required.** Entries of `{ "name": string, "domain"?: string, "notes"?: string }` |
| `accounts[].name` | string | **Required.** Company name, e.g. `"Stripe"` |
| `accounts[].domain` | string | Company domain, e.g. `"stripe.com"`. Leave it out when you are not sure: research is keyed on the domain, so a wrong one researches a different company and every word of that account's copy is then about someone else |
| `accounts[].notes` | string | What you know about this account. Fed to both the research and the copy prompts, which makes it the highest-value field here: a detail from a real conversation shapes the copy more than anything the research finds on its own |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/campaigns/23/accounts" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "accounts": [
      {
        "name": "Klaviyo",
        "domain": "klaviyo.com",
        "notes": "On VWO today, moving off it over price. Cares about how long a test takes to set up, not about stats depth."
      }
    ]
  }'
```

## Success response

```json
{
  "success": true,
  "abm_campaign_id": 23,
  "campaign_name": "TechSpo 2026",
  "url": "/personalize/abm/23",
  "launched": true,
  "links_live": true,
  "added": [
    {
      "abm_campaign_account_id": 512,
      "name": "Klaviyo",
      "domain": "klaviyo.com",
      "notes": "On VWO today, moving off it over price...",
      "link": "https://yoursite.com/?m=k3Rt9vQ2mLpX7wZa1BcD"
    }
  ],
  "already_on_campaign": [],
  "pages": [
    "https://yoursite.com/",
    "https://yoursite.com/pricing"
  ],
  "building": true,
  "needs_goal": false,
  "_note": "The links work now and are final. Research and personalized copy are being written and take a few minutes per account; until then the link shows the page as it normally is. The campaign is live, so each link personalizes as soon as its copy lands."
}
```

## Response fields

| Field | Description |
|---|---|
| `added` | The accounts created, each with its final `link` |
| `already_on_campaign` | Companies that were on the campaign before this call. They are left exactly as they were, so copy you have already reviewed or edited is never rewritten. Their links are returned too |
| `links_live` | Whether these links personalize anything **right now**. `false` means the campaign is not launched and every link resolves to your ordinary page |
| `building` | A build started for the new accounts |
| `queued_behind_current_build` | A build was already running, so these accounts are queued and the next build writes their copy |
| `needs_goal` | The campaign has no goal, so it can record visits but never a conversion, and it cannot be launched |

## Notes

- **The link is final before the copy exists.** Each account's token is written with its row, so the address never changes. That is what makes this usable from an agent or a CRM workflow: store the link now, and the page fills in behind it.
- **Read `links_live` before sending anything.** On a campaign that is not launched, the link is real but shows your normal page. Sending it then is not personalization.
- **On a launched campaign this publishes.** Each company's page goes live as soon as its copy finishes. This is the one Personalization path that reaches a live page without someone clicking Launch.
- Copy is written only for the accounts being added, plus any on the campaign that never got usable copy. Accounts that already have copy are untouched, and a re-run does not re-buy their research.
- A campaign takes at most 200 accounts. Adding past that returns `400`.
- Persona campaigns are refused: they match on a URL parameter and have no company list, so an account added to one would never be served.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
