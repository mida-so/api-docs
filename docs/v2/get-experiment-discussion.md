---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Discussion"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/discussion"
  description="The Discussion thread on an experiment's report: every comment with its author, time, and whether it was edited. This is where teams record decisions and caveats next to the numbers."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/TEST_ID/discussion"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The experiment id |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34567/discussion" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 34567,
  "test_name": "Pricing: Daily-cost framing on Growth plan",
  "count": 2,
  "comments": [
    {
      "comment_id": 981,
      "comment": "Calling this Friday unless mobile diverges.",
      "author_name": "Alicia",
      "created_at": "2026-08-18T10:04:12.000Z",
      "edited": false
    },
    {
      "comment_id": 984,
      "comment": "Mobile is flat so far — desktop carrying the lift.",
      "author_name": "Ethan",
      "created_at": "2026-08-19T02:41:55.000Z",
      "edited": true,
      "is_you": true
    }
  ]
}
```

Each comment carries a `source`: `user` (a person's own words), `agent` (written by the Mida Agent over MCP), or `routine` (posted automatically by a scheduled Agent routine). Non-`user` comments render in the dashboard with a "via Mida Agent" badge.

`is_you` appears on the caller's own comments when the connection identifies a user (MCP). Plain API keys read the thread anonymously.

</ApiEndpointLayout>
