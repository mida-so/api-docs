---
sidebar_position: 7
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Pre-Publish Check"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/pre-publish-check"
  description="Run Mida's setup rules over a saved experiment before launching it: the same checks the dashboard runs on each step of the experiment wizard. Returns what blocks launch and what is worth a second look. It changes nothing."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/pre-publish-check"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `project_key` | string | Your project key (the `key=` value in the Mida script tag). |
| `test_id` | integer | Numeric experiment ID. Get this from [List Experiments](./list-experiments). |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/pre-publish-check" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "ready": false,
  "blockers": [
    {
      "id": "goal_assigned",
      "step": "Goal",
      "field": "goal_profile_id",
      "status": "fail",
      "title": "Conversion goal",
      "detail": "No goal set — pick or create a goal so the test can measure something."
    }
  ],
  "warnings": [],
  "passed": 12,
  "checked_steps": ["Profile", "Targeting", "Goal", "Configuration", "Summary"],
  "not_covered": "This reads the saved configuration only. It does not load the page, so it cannot tell whether a selector still matches the live site or whether the variant renders correctly. Open a preview URL to check that."
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `ready` | boolean | `true` when nothing blocks launch |
| `blockers` | array | Problems to fix before launching |
| `warnings` | array | Worth reviewing. They do not block launch |
| `blockers[].id`, `warnings[].id` | string | Stable identifier of the check |
| `blockers[].step` | string | The setup step the check belongs to: `Profile`, `Targeting`, `Goal`, `Configuration` or `Summary` |
| `blockers[].field` | string \| null | The setting the check is about, when there is one |
| `blockers[].title`, `blockers[].detail` | string | The check and what it found, as the dashboard words them |
| `passed` | integer | How many checks passed |
| `not_covered` | string | What this check does not look at |

## What it covers

Name and page URL, page targeting and audience rules, the goal, the traffic split, variant code and selectors, and overlap with other live experiments in the project.

It reads the saved configuration only. It does not load the page, so `ready: true` does not mean the variant renders correctly. Open the links from [Get Experiment Preview URLs](./get-experiment-preview-urls) to check that.

## Errors

| Status | Meaning |
|---|---|
| `401` | Missing or wrong API key |
| `404` | Project or experiment not found in this project |
| `429` | More than 20 checks in a minute for this account |

</ApiEndpointLayout>
