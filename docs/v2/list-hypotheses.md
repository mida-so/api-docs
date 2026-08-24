---
sidebar_position: 17
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Hypotheses"
  method="GET"
  endpoint="/v2/project/{project_key}/hypotheses"
  description="Return the project's hypothesis backlog: the ideas the team wrote down, how they rated each one, and which experiments came out of them."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses?limit=50&offset=0"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

A hypothesis is the reason an experiment exists. It holds what the team observed, the problem they
think it causes, and the change they want to try, plus their own 1 to 5 ratings for confidence,
importance and difficulty.

Newest updates come first.

## Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `search` | string | none | Only return hypotheses whose observation, problem or solution contains this text. |
| `limit` | integer | `50` | Max results to return. Maximum `200`. |
| `offset` | integer | `0` | Number of records to skip (for pagination). |
| `include_archived` | boolean | `false` | Also return ideas that were archived, each marked `"archived": true`. Archived ideas are off the backlog, so they are left out by default. |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses?limit=50&offset=0" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "hypotheses": [
    {
      "hypothesis_id": 4021,
      "observation": "62% of pricing page visitors on mobile never scroll past the first plan.",
      "problem": "The plan comparison is three screens tall on a phone, so the cheaper plan is all most people ever see.",
      "solution": "Collapse the comparison into a single card with a plan switcher.",
      "confidence": 4,
      "importance": 5,
      "difficulty": 2,
      "hypothesis_url": "https://www.notion.so/pricing-mobile-research",
      "archived": false,
      "created_at": "2026-07-02T09:14:00.000Z",
      "updated_at": "2026-08-19T04:31:00.000Z",
      "linked_test_ids": [34707, 34755]
    },
    {
      "hypothesis_id": 4034,
      "observation": "Support gets asked whether the trial needs a card about twice a week.",
      "problem": null,
      "solution": "Say \"no card needed\" directly under the signup button.",
      "confidence": 3,
      "importance": 4,
      "difficulty": 1,
      "hypothesis_url": null,
      "archived": false,
      "created_at": "2026-08-11T02:00:00.000Z",
      "updated_at": "2026-08-11T02:00:00.000Z",
      "linked_test_ids": []
    }
  ],
  "count": 2,
  "total": 34,
  "limit": 50,
  "offset": 0,
  "has_more": false,
  "next_offset": 2
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `hypotheses` | array | The backlog, most recently updated first |
| `hypotheses[].hypothesis_id` | integer | Unique ID. Use it in the other hypothesis endpoints |
| `hypotheses[].observation` | string\|null | What the team saw happening |
| `hypotheses[].problem` | string\|null | Why they think it is a problem |
| `hypotheses[].solution` | string\|null | The change they want to test |
| `hypotheses[].confidence` | integer\|null | The team's own rating, 1 to 5. `null` means unrated |
| `hypotheses[].importance` | integer\|null | The team's own rating, 1 to 5. `null` means unrated |
| `hypotheses[].difficulty` | integer\|null | The team's own rating, 1 to 5. `null` means unrated |
| `hypotheses[].hypothesis_url` | string\|null | Link to supporting research |
| `hypotheses[].archived` | boolean | `true` when the idea was taken off the backlog. Only appears if you asked for archived ideas |
| `hypotheses[].linked_test_ids` | array | Experiments run from this hypothesis. An empty array means nobody has tested it yet |
| `count` | integer | Number of hypotheses in this page of results |
| `total` | integer | Number of hypotheses matching the filters, so the backlog size unless you asked for archived ones |
| `has_more` | boolean | Whether more results exist past this page |
| `next_offset` | integer | Pass as `offset` to fetch the next page |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Project not found |

:::tip Deciding what to test next
An entry with a high `importance`, a low `difficulty` and an empty `linked_test_ids` is an idea the
team believes in and has not tried yet. Those are the ones worth picking up first.

Ratings are the team's own judgement. Read them, and do not fill them in on their behalf.
:::

</ApiEndpointLayout>
