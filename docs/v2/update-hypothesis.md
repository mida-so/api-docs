---
sidebar_position: 20
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Hypothesis"
  method="PATCH"
  endpoint="/v2/project/{project_key}/hypotheses/{hypothesis_id}"
  description="Change the wording or the ratings on an existing hypothesis. Fields you leave out are not touched."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4021"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

Send only what you want to change. Anything you leave out keeps its current value, so rewording an
observation will not wipe the ratings.

To clear a text field, send it as an empty string.

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `hypothesis_id` | integer | The ID from [List Hypotheses](./list-hypotheses) |

## Body parameters

Same fields as [Create Hypothesis](./create-hypothesis), all optional. Send at least one.

| Parameter | Type | Description |
|---|---|---|
| `observation` | string | What you saw happening. Empty string clears it |
| `problem` | string | Why you think it is a problem. Empty string clears it |
| `solution` | string | The change you want to test. Empty string clears it |
| `confidence` | integer | 1 to 5 |
| `importance` | integer | 1 to 5 |
| `difficulty` | integer | 1 to 5 |
| `hypothesis_url` | string | Link to supporting research |

## Example

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4021" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"importance": 3, "solution": "Show one plan by default with a switcher for the rest."}'
```

## Success response

The full hypothesis after the change, in the same shape as [Get Hypothesis
Details](./get-hypothesis-details).

```json
{
  "success": true,
  "hypothesis": {
    "hypothesis_id": 4021,
    "observation": "62% of pricing page visitors on mobile never scroll past the first plan.",
    "problem": "The plan comparison is three screens tall on a phone.",
    "solution": "Show one plan by default with a switcher for the rest.",
    "confidence": 4,
    "importance": 3,
    "difficulty": 2,
    "hypothesis_url": "https://www.notion.so/pricing-mobile-research",
    "archived": false,
    "created_at": "2026-07-02T09:14:00.000Z",
    "updated_at": "2026-08-24T06:20:00.000Z",
    "linked_test_ids": [34707, 34755]
  }
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | Empty body, a rating outside 1 to 5, text over 5000 characters, or a `hypothesis_url` that is not a URL |
| `401` | Invalid or missing API key |
| `404` | No hypothesis with that ID in this project |

</ApiEndpointLayout>
