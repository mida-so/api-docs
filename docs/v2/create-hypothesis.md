---
sidebar_position: 19
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Hypothesis"
  method="POST"
  endpoint="/v2/project/{project_key}/hypotheses"
  description="Add an idea to the project's backlog, with the reasoning behind it and how you rate it."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

## Body parameters

Send at least one of `observation`, `problem` or `solution`. A hypothesis with only ratings and no
words is a row nobody can read back later, so it is rejected.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `observation` | string | one of three | What you saw happening. Max 5000 characters |
| `problem` | string | one of three | Why you think it is a problem. Max 5000 characters |
| `solution` | string | one of three | The change you want to test. Max 5000 characters |
| `confidence` | integer | no | How sure you are, 1 to 5 |
| `importance` | integer | no | How much it matters, 1 to 5 |
| `difficulty` | integer | no | How hard it is to build, 1 to 5 |
| `hypothesis_url` | string | no | Link to supporting research. Must start with `http://` or `https://` |

Ratings are whole numbers from 1 to 5. A value outside that range is refused rather than rounded
into it, because a rating nobody chose is worse than no rating at all. Leave a rating out and it
comes back as `null`, meaning unrated.

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "observation": "62% of pricing page visitors on mobile never scroll past the first plan.",
    "problem": "The plan comparison is three screens tall on a phone.",
    "solution": "Collapse the comparison into a single card with a plan switcher.",
    "confidence": 4,
    "importance": 5,
    "difficulty": 2,
    "hypothesis_url": "https://www.notion.so/pricing-mobile-research"
  }'
```

## Success response

```json
{
  "success": true,
  "hypothesis": {
    "hypothesis_id": 4021,
    "observation": "62% of pricing page visitors on mobile never scroll past the first plan.",
    "problem": "The plan comparison is three screens tall on a phone.",
    "solution": "Collapse the comparison into a single card with a plan switcher.",
    "confidence": 4,
    "importance": 5,
    "difficulty": 2,
    "hypothesis_url": "https://www.notion.so/pricing-mobile-research",
    "archived": false,
    "created_at": "2026-08-24T06:12:00.000Z",
    "updated_at": "2026-08-24T06:12:00.000Z",
    "linked_test_ids": []
  }
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | No wording given, a rating outside 1 to 5, text over 5000 characters, or a `hypothesis_url` that is not a URL |
| `401` | Invalid or missing API key |
| `404` | Project not found |

:::tip Creating the test at the same time
If you already know the test you want to run, you do not need this endpoint first. [Create
Experiment](./create-experiment) accepts a `hypothesis` object and saves both in one call, so the
experiment can never end up with its reasoning missing.
:::

</ApiEndpointLayout>
