---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Experiment Comment"
  method="DELETE"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/discussion/{comment_id}"
  description="Delete one comment from an experiment's Discussion. Allowed for the comment's own author, or an Owner/Admin moderating the thread."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/TEST_ID/discussion/COMMENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The experiment id |
| `comment_id` | The comment's id from Get Experiment Discussion |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34567/discussion/984" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 34567,
  "comment_id": 984,
  "deleted_preview": "Mobile is flat so far — desktop carrying the lift."
}
```

## Errors

| Status | Meaning |
|---|---|
| `403` | Not the author, and not an Owner or Admin |
| `404` | No such comment on this experiment |

</ApiEndpointLayout>
