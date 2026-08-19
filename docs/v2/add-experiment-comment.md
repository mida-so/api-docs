---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Add Experiment Comment"
  method="POST"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/discussion"
  description="Post a comment to the Discussion on an experiment's report. The test's assigned members are notified by email, exactly as for a comment made in the dashboard. Requires a signed-in author (an MCP connection); plain API keys can read the thread but not post."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/TEST_ID/discussion"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The experiment id |

## Body parameters

| Field | Type | Description |
|---|---|---|
| `comment` | string | **Required.** Plain text, up to 5000 characters |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/34567/discussion" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"comment": "Calling this Friday unless mobile diverges."}'
```

## Success response

```json
{
  "success": true,
  "test_id": 34567,
  "comment": "Calling this Friday unless mobile diverges.",
  "note": "Posted to the Discussion on the report. Assigned members are being notified by email."
}
```

## Errors

| Status | Meaning |
|---|---|
| `400` | Empty comment, over 5000 characters, or no signed-in author on the connection |
| `404` | Experiment not in this project |

</ApiEndpointLayout>
