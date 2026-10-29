---
sidebar_position: 32
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Survey"
  method="POST"
  endpoint="/v2/project/{project_key}/create-survey"
  description="Create an on-site survey as a draft. Nobody sees it until you set it live."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/create-survey"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

A new survey is always a draft. Review it in the dashboard, then set it live with
[Update Survey Status](./update-survey-status). Sending `status` with any value other than `draft`
is refused.

## Body parameters

`name` and `questions` are required. Everything else has a default.

| Parameter | Type | Description |
|---|---|---|
| `name` | string | Only your team sees it. Max 120 characters |
| `questions` | array | 1 to 10 questions. See [Questions and branching](#questions-and-branching) |
| `trigger` | string | When to ask: `time` (after `delay` seconds on the page, the default), `pageviews` (on page views `pageviews.from` to `pageviews.to` of a visit) or `js` (when the site calls `mdq.push(['showSurvey', SURVEY_ID])`) |
| `delay` | integer | Seconds on the page before asking, 0 to 600. Default `10` |
| `pageviews` | object | `{ "from", "to" }` for `trigger: "pageviews"` |
| `repeat` | string | `once` (default): each visitor is asked once. `until_answered`: asked again on later visits until they answer |
| `sample` | integer | Percent of matching visitors asked, 1 to 100. Default `100` |
| `limit` | object | `{ "total", "per_day" }` respondents. `total` ends the survey when reached; `per_day` stops it for the rest of the UTC day. `0` means no limit |
| `targeting` | object | Which pages and visitors, with the same rules as an experiment: `url_rule`, `parameter_rule`, `cookie_rule` and segment rules. Leave it out to ask on every page |
| `intro` | string | Optional line above the first question. Max 200 characters |
| `thanks` | string | Thank-you message. Default "Thanks for your feedback!" |
| `accent` | string | Hex color, like `#4f46e5` |
| `position` | string | `br` (bottom right, default), `bl`, `bc` or `center` (a pop-up) |
| `layout` | string | `card` shows two or three rating questions on one card. Anything else, and any survey that branches, asks one question at a time |

## Example

Ask blog readers who they are. Instructors skip the Education Plan question and go straight to the
teaching one. Students answer the Education Plan question, and then the survey ends.

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/create-survey" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Who is visiting",
    "questions": [
      {
        "type": "choice",
        "text": "Are you visiting as a student or instructor?",
        "options": [
          { "text": "Student" },
          { "text": "Instructor", "next": 3 }
        ],
        "save_as": "visitor_role"
      },
      { "type": "yesno", "text": "Would you use a free Education Plan?", "next": "end" },
      { "type": "yesno", "text": "Would you teach your class with Mida?" }
    ],
    "targeting": { "url_rule": [{ "type": "contains", "value": "/blog/" }] }
  }'
```

## Success response

```json
{
  "success": true,
  "survey": {
    "survey_id": 42,
    "name": "Who is visiting",
    "status": "draft",
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
    "ended_at": null
  }
}
```

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
| `save_as` | string | Optional, click questions only: saves the answer to the visitor under this attribute name, so segment rules can target it in later tests |
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
| `400` | A missing name, no questions or more than 10, open text as the first question, a branching rule that points back or nowhere, an invalid setting, or `status` other than `draft` |
| `401` | Invalid or missing API key |
| `403` with `code: branching_paid_only` | The survey branches and the account is on a free plan |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
