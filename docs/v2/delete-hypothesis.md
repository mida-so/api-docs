---
sidebar_position: 21
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Hypothesis"
  method="DELETE"
  endpoint="/v2/project/{project_key}/hypotheses/{hypothesis_id}"
  description="Remove an idea from the backlog. A hypothesis that experiments were run from cannot be deleted."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4034"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

The idea comes off the backlog. It stops appearing in [List
Hypotheses](./list-hypotheses), and it stays readable by ID so any past experiment that came from it
still shows why it was run.

If any experiment is linked to the hypothesis, the request is refused. That row is the recorded
reason those experiments were run, and deleting it would leave results nobody can explain. Detach it
from each experiment first with [Link Hypothesis to Experiment](./link-hypothesis-to-experiment),
or keep it as the record.

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `hypothesis_id` | integer | The ID from [List Hypotheses](./list-hypotheses) |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/hypotheses/4034" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "deleted": true,
  "hypothesis_id": 4034
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | The hypothesis is linked to one or more experiments. The message lists them |
| `401` | Invalid or missing API key |
| `404` | No hypothesis with that ID in this project |

A refusal names the experiments in the way:

```json
{
  "error": "This hypothesis is the recorded reason for 2 experiments (34707, 34755). Unlink it from them first, or keep it as the record of why they were run."
}
```

</ApiEndpointLayout>
