---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Install Health"
  method="GET"
  endpoint="/v2/project/{project_key}/install-health"
  description="Check whether the Mida tag on this project's site is installed and sending visitors. Call it after installing the tag and before building an experiment: a test on a site with no working tag collects nothing."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/install-health"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `project_key` | string | Your project key (the `key=` value in the Mida script tag). |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/install-health" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "available": true,
  "verdict": "no_test_collecting",
  "next_action": "The tag is healthy but nothing is serving: no experiment has recorded an exposure in 30 days. Check whether anything is live, and whether the project has default goals set, before building something new.",
  "installed_ever": true,
  "last_visitor_at": "2026-11-12T08:14:02.000Z",
  "days_since_last_visitor": 0,
  "visitors_24h": 41,
  "visitors_7d": 312,
  "tag_visitors_7d": null,
  "pixel_visitors_7d": null,
  "exposures_30d": 0,
  "last_exposure_at": null,
  "windows": { "traffic_days": 7, "goal_days": 30 }
}
```

### Verdicts

| `verdict` | Meaning | What to do |
|---|---|---|
| `not_installed` | The tag has never sent a visitor. | Install the tag, load a page on the site, then call this again. |
| `no_recent_traffic` | The tag sent visitors before, but none in the last 7 days. | Check whether the tag was removed. A quiet site reads the same way, so do not assume. |
| `tag_not_running` | Visitors are arriving only from the Shopify pixel, not the tag. | Add the tag to the theme. No experiment can enrol visitors until it is in. |
| `no_test_collecting` | The tag works. No experiment has recorded an exposure in 30 days. | Launch an experiment. |
| `healthy` | The tag works and experiment data is arriving. | Nothing to fix. |

### Response fields

| Field | Type | Description |
|---|---|---|
| `verdict` | string | One of the verdicts above |
| `next_action` | string | The recommended next step, in plain words |
| `installed_ever` | boolean | Whether the tag has ever sent a visitor |
| `last_visitor_at` | string \| null | When the most recent visitor was recorded (all time) |
| `visitors_24h`, `visitors_7d` | integer | Visitors recorded in the last day and the last 7 days. On Shopify these include the customer pixel |
| `tag_visitors_7d`, `pixel_visitors_7d` | integer \| null | The same 7 days split by source. `null` when the split was not read |
| `exposures_30d` | integer | Experiment exposures recorded in the last 30 days |
| `last_exposure_at` | string \| null | When the most recent exposure was recorded, within those 30 days |

## After installing the tag

A new visitor shows up within a few minutes of the first page view. Poll no more often than once every 30 seconds, and load a page on the site yourself if it has no traffic yet.

## Errors

| Status | Meaning |
|---|---|
| `401` | Missing or wrong API key |
| `404` | Project not found |
| `503` | Install health could not be read right now. This says nothing about whether the tag is installed; try again |

</ApiEndpointLayout>
