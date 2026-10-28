---
sidebar_position: 30
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Surveys"
  method="GET"
  endpoint="/v2/project/{project_key}/surveys"
  description="The project's on-site surveys, with how many people saw and answered each."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/surveys"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `status` | string | no | Only surveys in this status: `draft`, `live`, `paused`, `ended` or `archived` |
| `include_archived` | boolean | no | `true` also lists archived surveys. They are left out otherwise |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/surveys" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "allowed": true,
  "reason": "",
  "surveys": [
    {
      "survey_id": 42,
      "name": "Who is visiting",
      "status": "live",
      "questions": 3,
      "trigger": "time",
      "shown": 299,
      "answered": 8,
      "created_at": "2026-10-22T03:10:00.000Z",
      "started_at": "2026-10-22T03:15:00.000Z",
      "ended_at": null
    }
  ]
}
```

`shown` counts visitors the survey was shown to, and `answered` those who answered at least one
question. `allowed` is `false`, with a `reason`, when the account's plan does not include surveys.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
