---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Experiment"
  method="DELETE"
  endpoint="/v2/project/{project_key}/experiment/{test_id}"
  description="Soft-delete an experiment. The record and its results are preserved, so this is recoverable — but the experiment disappears from the Experiments list and, if it was running, stops being served."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34762"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID to delete |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34762" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 34762,
  "test_name": "Homepage H1 - No-Devs Angle",
  "deleted": true,
  "was_live": false,
  "message": "Experiment deleted. This is a soft delete: the record is kept and can be restored."
}
```

## Response fields

| Field | Description |
|---|---|
| `test_name` | What was deleted, so you can confirm you removed the right experiment |
| `was_live` | `true` if the experiment was running. It has now stopped serving |
| `message` | Plain-language summary, differing for a live experiment |

## Notes

- **This is a soft delete.** The row and its recorded results are kept and excluded from every read, so nothing is destroyed and support can restore it. That is why there is no confirmation flag to pass.
- **Deleting a live experiment stops it being served.** Read the experiment first if you are not certain of its status, and prefer [Update Experiment Status](update-experiment-status) to pause something you may want back shortly.
- The delivery cache is cleared automatically when a live experiment is deleted, so visitors stop receiving it immediately rather than when the cache lapses.
- An experiment that is already deleted, or belongs to another project, returns `404`. Deleting twice is therefore safe but reports not-found the second time.

</ApiEndpointLayout>
