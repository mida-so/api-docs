---
sidebar_position: 34
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Survey Status"
  method="PATCH"
  endpoint="/v2/project/{project_key}/survey/{survey_id}/status"
  description="Set a survey live, pause it, or end it."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID/status"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

## Body parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | yes | `live`, `paused` or `ended` |

- **live**: visitors on the survey's pages start being asked. Needs a paid plan, at least one
  question, and fewer than 20 live surveys in the project. A survey that already reached its
  `limit.total` can't go live until the limit is raised.
- **paused**: only a live survey can be paused. Set it live again to resume.
- **ended**: a live or paused survey stops for good. Its results stay.

## Example

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42/status" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "status": "live" }'
```

## Success response

The survey as saved, with its new `status` and `started_at` or `ended_at`, in the same shape as
[Get Survey Details](./get-survey-details).

## Error responses

| Status | Meaning |
|---|---|
| `400` | A status other than `live`, `paused` or `ended`; a change the survey's current status doesn't allow; no questions; the response limit already reached; or 20 surveys already live |
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
