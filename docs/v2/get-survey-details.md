---
sidebar_position: 31
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Survey Details"
  method="GET"
  endpoint="/v2/project/{project_key}/survey/{survey_id}"
  description="One survey: its questions and branching, when it asks, its look, limits and page targeting."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

The survey, plus `answers_per_question`: how many answers each question (by number) has.

```json
{
  "success": true,
  "survey": {
    "survey_id": 42,
    "name": "Who is visiting",
    "status": "live",
    "questions": [
      {
        "qid": 1,
        "type": "choice",
        "text": "Are you visiting as a student or instructor?",
        "options": [
          { "id": 0, "text": "Student", "positive": false },
          { "id": 1, "text": "Instructor", "positive": false, "next": 3 }
        ],
        "multi": false,
        "save_as": "visitor_role"
      },
      { "qid": 2, "type": "yesno", "text": "Would you use a free Education Plan?", "next": "end" },
      { "qid": 3, "type": "yesno", "text": "Would you teach your class with Mida?" }
    ],
    "trigger": "time",
    "delay": 10,
    "sample": 100,
    "accent": "#4f46e5",
    "thanks": "Thanks for your feedback!",
    "intro": "",
    "position": "br",
    "layout": "steps",
    "pageviews": { "from": 1, "to": 25 },
    "repeat": "once",
    "targeting": { "url_rule": [{ "type": "contains", "value": "/blog/" }] },
    "created_at": "2026-10-28T09:12:00.000Z",
    "updated_at": "2026-10-28T09:12:00.000Z",
    "started_at": null,
    "ended_at": null,
    "answers_per_question": { "1": 8, "2": 5, "3": 2 }
  }
}
```

`status` is `draft`, `live`, `paused`, `ended` or `archived`. In `next`, `options[].next` and
`branch`, a number is a question number, not a `qid`.

## Questions and branching

Questions are numbered from 1 in the order they are asked. Branching rules, `filters` and `compare`
all name a question by that number, never by an internal id, so you can read a survey, change it
and send it back.

| Field | Type | Description |
|---|---|---|
| `qid` | integer | Returned on read. Send it back when editing a question, so its answers stay attached to it |
| `type` | string | `choice`, `yesno`, `nps`, `scale` or `text` |
| `text` | string | The question. Max 200 characters |
| `options` | array | `choice` only: 2 to 8 answers, each `{ "id", "text" }`, plus optional `ask` and `next` |
| `options[].ask` | string | Picking this answer opens a text box with this label, like "Please specify" on Other. One per question |
| `multi` | boolean | `choice` only: people may pick several answers |
| `min`, `max` | integer | `scale` only: 1 to 5, 1 to 7 or 0 to 10 |
| `minLabel`, `maxLabel` | string | Optional end labels for `scale` and `nps` |
| `optional`, `short` | boolean | `text` only: people can skip it (default `true`); a one-line box |
| `save_as` | string | Optional, click questions only, paid plans only: saves the answer to the visitor under this attribute name, so segment rules can target it in later tests. On a free plan a save with it is refused with `403` and `"code": "save_as_paid_only"` |
| `next` | integer or `"end"` | Where everyone goes after this question: a later question's number, or `"end"` |
| `options[].next` | integer or `"end"` | Single choice: where people who pick this answer go |
| `branch` | object | Yes / No: `{ "yes", "no" }`. NPS: `{ "detractor", "passive", "promoter" }`. Each a later question's number or `"end"` |

Branching is on paid plans. On a free plan, saving a survey with any jump is refused with `403`
and `"code": "branching_paid_only"`; a survey that asks its questions in order saves as usual.

An answer's own rule wins over the question's `next`. With neither, people go on to the next
question in order. Jumps only go forward, so a survey can't loop: a rule pointing back is refused
with `400`. The first question must be one people answer with a click, not `text`. A survey has 1 to
10 questions. Longer surveys get fewer finished answers, so keep it short and let branching show
each person only the questions that fit them.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
