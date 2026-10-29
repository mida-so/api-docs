---
sidebar_position: 33
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Survey"
  method="PATCH"
  endpoint="/v2/project/{project_key}/survey/{survey_id}"
  description="Change a survey's questions, settings or targeting. Only the fields you send change."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/SURVEY_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
>

Send only the fields to change. `questions` replaces the whole list, so read the survey with
[Get Survey Details](./get-survey-details) first and send every question back, each with its `qid`.

A question that keeps its `qid` keeps its answers. If a question already has answers and you change
its wording, type or answers, it starts over as a new question with a new `qid`, and its old answers
stay with the old wording. Changing branching, labels or `save_as` does not start it over.

Editing a live survey changes what visitors see from their next page view. Status is not changed
here: use [Update Survey Status](./update-survey-status).

## Body parameters

Any of the fields from [Create Survey](./create-survey#body-parameters):

| Parameter | Type | Description |
|---|---|---|
| `name` | string | Only your team sees it. Max 120 characters |
| `questions` | array | 1 to 10 questions. See [Questions and branching](./get-survey-details#questions-and-branching) |
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

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/survey/42" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{ "thanks": "Thanks! We read every answer.", "limit": { "total": 500, "per_day": 0 } }'
```

## Success response

The survey as saved, in the same shape as [Get Survey Details](./get-survey-details).

## Error responses

| Status | Meaning |
|---|---|
| `400` | An invalid question, setting or branching rule, `status` in the body, or an archived survey |
| `401` | Invalid or missing API key |
| `403` with `code: branching_paid_only` | The survey branches and the account is on a free plan |
| `403` with `code: save_as_paid_only` | A question saves its answer to the visitor and the account is on a free plan |
| `403` | Surveys need a paid plan, or the key's user is a Viewer (for changes) |
| `404` | Project or survey not found. A survey from another project is not found |

</ApiEndpointLayout>
