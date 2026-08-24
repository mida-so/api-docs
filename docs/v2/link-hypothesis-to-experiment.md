---
sidebar_position: 22
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Link Hypothesis to Experiment"
  method="POST"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/hypothesis"
  description="Attach a hypothesis to an existing experiment, so its result reads against what it was meant to prove. Send hypothesis_id 0 to detach."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34707/hypothesis"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

An experiment holds one hypothesis. Attaching a second one replaces the first, it does not add to
it. One hypothesis can be attached to many experiments, which is how a single idea tested three
different ways stays recognisable as one idea.

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `test_id` | integer | The experiment ID |

## Body parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `hypothesis_id` | integer | yes | The hypothesis to attach. Send `0` or `null` to detach whatever is attached now |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34707/hypothesis" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"hypothesis_id": 4021}'
```

Detach:

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34707/hypothesis" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"hypothesis_id": 0}'
```

## Success response

```json
{
  "success": true,
  "test_id": 34707,
  "test_name": "Pricing page mobile plan card",
  "hypothesis_id": 4021,
  "linked": true
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `hypothesis_id` | integer\|null | What is attached now. `null` after a detach |
| `linked` | boolean | `false` after a detach |

## Error responses

| Status | Meaning |
|---|---|
| `400` | `test_id` is missing or not valid |
| `401` | Invalid or missing API key |
| `404` | The experiment or the hypothesis does not exist in this project |
| `400` | The hypothesis is archived. Restore it before attaching it to a test |

:::tip For a new experiment, do it in one call
[Create Experiment](./create-experiment) takes a `hypothesis` object or a `hypothesis_id` directly.
Use this endpoint for experiments that already exist.
:::

</ApiEndpointLayout>
