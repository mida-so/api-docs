---
sidebar_position: 18
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Hypothesis Details"
  method="GET"
  endpoint="/v2/project/{project_key}/hypotheses/{hypothesis_id}"
  description="Return one hypothesis, including every experiment that has been run from it."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4021"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `hypothesis_id` | integer | The ID from [List Hypotheses](./list-hypotheses) |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4021" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
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
    "created_at": "2026-07-02T09:14:00.000Z",
    "updated_at": "2026-08-19T04:31:00.000Z",
    "linked_test_ids": [34707, 34755]
  }
}
```

Field meanings are the same as in [List Hypotheses](./list-hypotheses#response-fields).

An archived hypothesis still resolves here, with `"archived": true`. It is the recorded reason a past test ran, so it stays readable even after it leaves the backlog.

## Error responses

| Status | Meaning |
|---|---|
| `400` | `hypothesis_id` is missing or not a positive integer |
| `401` | Invalid or missing API key |
| `404` | No hypothesis with that ID in this project |

:::tip Reading a result against its hypothesis
Pass any ID from `linked_test_ids` to [Get Experiment Result](./get-experiment-result). A variant
that won for a reason nobody predicted is a different finding from one that confirmed the theory,
and you can only tell the two apart if you read the hypothesis alongside the numbers.
:::

</ApiEndpointLayout>
