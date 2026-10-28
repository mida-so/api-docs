---
sidebar_position: 36
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Survey Results"
  method="GET"
  endpoint="/v2/project/{project_key}/survey/{survey_id}/results"
  description="The survey's report: the funnel and every question's answers, filtered to a group or compared across groups."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID/results"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Required | Description |
|---|---|---|---|
| `filters` | JSON array | no | Only people who gave all of these answers, up to 5. Each `{ "question", "is" }`: a question number and the answer: a choice answer's `id`, `"yes"` / `"no"`, an NPS group (`"promoter"`, `"passive"`, `"detractor"`) or a score. Open-text questions can't be filtered on |
| `start_date` | string | no | `YYYY-MM-DD`, in the timezone of the `tz` header (hours from UTC, default 0) |
| `end_date` | string | no | `YYYY-MM-DD` |
| `segment` | string | no | A quick segment, as on the experiment report: `new`, `returning`, `desktop`, `mobile`, `direct`, `referral`, `social`, or `country-XX` |
| `compare` | integer | no | A question number. Every other question's answers are split by that question's answers, for example students versus instructors. Works with choice, Yes / No, NPS and rating questions |

## Example

What did instructors say? That is question 1, answer id 1:

```bash
curl -G "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42/results" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --data-urlencode 'filters=[{"question":1,"is":1}]'
```

## Success response

```json
{
  "success": true,
  "funnel": { "shown": 2, "answered": 2, "completed": 2 },
  "questions": [
    {
      "question": 1,
      "qid": 1,
      "type": "choice",
      "text": "Are you visiting as a student or instructor?",
      "n": 2,
      "multi": false,
      "options": [
        { "id": 0, "text": "Student", "n": 0 },
        { "id": 1, "text": "Instructor", "n": 2 }
      ]
    },
    { "question": 2, "qid": 2, "type": "yesno", "text": "Would you use a free Education Plan?", "n": 0, "yes": 0, "no": 0 },
    { "question": 3, "qid": 3, "type": "yesno", "text": "Would you teach your class with Mida?", "n": 2, "yes": 1, "no": 1 }
  ],
  "written_answers": [],
  "filters": [{ "question": 1, "is": 1 }]
}
```

- `funnel.shown`: visitors the survey was shown to. `answered`: answered at least one question.
  `completed`: answered every question on their own path. In a survey that branches, that path
  depends on their answers. An optional open-text question can be skipped.
- Each question carries `n`, the number of answers, plus its type's counts: `options[].n` for
  choice (a multiple-choice answer counts once per pick), `yes` / `no`, `counts` by score with
  `mean` for ratings, and `nps` with `promoters`, `passives` and `detractors` for NPS.
- `written_answers`: the newest open-text answers, and what people wrote after a choice with `ask`.

With `compare`, the response also has:

```json
"compare": {
  "question": 1,
  "groups": [
    { "key": "o0", "label": "Student", "is": 0, "n": 6 },
    { "key": "o1", "label": "Instructor", "is": 1, "n": 2 }
  ],
  "questions": {
    "2": { "o0": { "type": "yesno", "n": 3, "yes": 1, "no": 2 }, "o1": { "type": "yesno", "n": 0, "yes": 0, "no": 0 } }
  },
  "note": "Groups under 30 people are too small to compare reliably."
}
```

`questions` is keyed by question number, then by group `key`. A group under 30 people is too small
to compare: report its counts ("1 of 3 students") rather than a percentage.

## Error responses

| Status | Meaning |
|---|---|
| `400` | A filter or `compare` that names no question, an answer that question doesn't have, an open-text filter, more than 5 filters, or an unknown segment |
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
