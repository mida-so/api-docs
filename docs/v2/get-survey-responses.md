---
sidebar_position: 37
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Survey Responses"
  method="GET"
  endpoint="/v2/project/{project_key}/survey/{survey_id}/responses"
  description="One row per person who answered, newest first, with where they came from."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID/responses"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `limit` | integer | no | Rows per page, 1 to 100. Default 50 |
| `offset` | integer | no | Rows to skip, for paging |
| `filters` | JSON array | no | Only people who gave all of these answers, up to 5. Each `{ "question", "is" }`: a question number and the answer: a choice answer's `id`, `"yes"` / `"no"`, an NPS group (`"promoter"`, `"passive"`, `"detractor"`) or a score. Open-text questions can't be filtered on |
| `start_date` | string | no | `YYYY-MM-DD`, in the timezone of the `tz` header (hours from UTC, default 0) |
| `end_date` | string | no | `YYYY-MM-DD` |
| `segment` | string | no | A quick segment, as on the experiment report: `new`, `returning`, `desktop`, `mobile`, `direct`, `referral`, `social`, or `country-XX` |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42/responses?limit=2" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "responses": [
    {
      "answered_at": "2026-10-27 21:08:54",
      "answers": { "1": "Instructor", "3": "Yes" },
      "device": "Mobile",
      "source": "chatgpt.com",
      "country": "DZ",
      "email": ""
    },
    {
      "answered_at": "2026-10-27 13:07:51",
      "answers": { "1": "Student", "2": "No" },
      "device": "Desktop",
      "source": "google.com",
      "country": "US",
      "email": ""
    }
  ],
  "more": true
}
```

- `answers` is keyed by question number. A question the person wasn't asked, or skipped, is left out.
- `source` is the `utm_source` of their landing page, `google (ads)` or `facebook (ads)` for an ad
  click, otherwise the referring site, or `Direct`.
- `email` is filled only when your site identified the visitor with `mida.identify`. An email
  typed into an open-text answer shows in `answers`, not here.
- `more` is `true` when another page follows: call again with `offset` increased by `limit`.

## Error responses

| Status | Meaning |
|---|---|
| `400` | A filter that names no question or an answer that question doesn't have, or an unknown segment |
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
