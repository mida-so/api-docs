---
sidebar_position: 13
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Goal"
  method="POST"
  endpoint="/v2/project/{project_key}/goal"
  description="Create a goal profile for the selected project. Goals define what counts as a conversion: page visits, clicks, forms, scroll depth, events, revenue, or manual triggers."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    goal_name: 'CTA Button Click',
    goal_type: 'clickOnElement',
    goal_value: '.cta-button',
    goal_purpose: 'sell',
    element_url: 'https://example.com/'
  }}
>

## Required body fields

| Field | Type | Description |
|---|---|---|
| `goal_name` | string | Human-readable name for the goal (e.g., `"Signup Form Submit"`) |
| `goal_type` | string | The type of conversion to track (see table below) |
| `goal_value` | string | The selector, URL, text, or trigger value (depends on `goal_type`) |

## Goal types

Choose the goal type that matches the conversion behavior you want to measure. `goal_value` is interpreted differently for each type:

| `goal_type` | Tracks | `goal_value` guidance |
|---|---|---|
| `pageview` | URL or path partial match | URL/path such as `/thank-you` |
| `pageviewExact` | Exact URL match | Full exact URL such as `https://example.com/thank-you` |
| `pageviewWildcard` | URL wildcard match | Wildcard URL such as `/products/*/confirm` |
| `pageviewRegex` | Regex URL match | Regex such as `^/checkout/.+/success$` |
| `clickOnElement` | Clicks on a CSS selector | CSS selector such as `.cta-button` |
| `clickOnText` | Clicks on visible text | Text such as `Start Free Trial` |
| `externalLink` | Clicks to an external link | href substring or domain such as `stripe.com` |
| `formSubmit` | Form submissions | Form CSS selector such as `form#signup` |
| `elementAppears` | Element appears on the page | CSS selector such as `.success-message` |
| `scrolling` | Scroll depth reached | Percentage such as `75` |
| `duration` | Time on page | Seconds such as `30` |
| `event` | Custom event | Event name such as `signup_completed` |
| `revenue` | Purchase/order revenue event | Purchase or order event name such as `Purchase` or `order_processed` |
| `script` | Manual trigger | Manual trigger identifier; prefer `event` for named events |

For ecommerce revenue tracking, use the event name your integration or site sends for successful orders. Do not invent a new revenue event name unless your site also sends it.

## Optional fields

| Field | Type | Description |
|---|---|---|
| `goal_key` | string | Slug identifier (auto-generated if omitted). Must be unique per project. |
| `goal_purpose` | string | Intent of the goal. Default: `"sell"`. Other values: `"engage"`, `"generate"`. |
| `element_url` | string | The page URL where the element or form is located. Helps the Mida script know which page to listen on. |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "goal_name": "CTA Button Click",
    "goal_type": "clickOnElement",
    "goal_value": ".cta-button",
    "goal_purpose": "sell",
    "element_url": "https://example.com/"
  }'
```

## Example: pageview goal

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/goal" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "goal_name": "Reached Thank You Page",
    "goal_type": "pageview",
    "goal_value": "https://example.com/thank-you"
  }'
```

## Success response

```json
{
  "success": true,
  "goal_profile_id": 3003,
  "goal_key": "cta_button_click",
  "company_id": 1001
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `goal_profile_id` | integer | The newly created goal's ID — use this when referencing the goal in experiments |
| `goal_key` | string | The slug identifier for this goal |

:::tip Reference goals in experiments
After creating a goal, attach it to a new experiment using `primary_goal_key: "your-goal-key"` in [Create Experiment](./create-experiment), rather than redefining the goal inline each time. This lets you reuse the same goal across multiple experiments.
:::

## Plan limits (free &amp; Agency Lite) {#public-v2-plan-limits}

On **Sandbox** (`paid_plan` **300**) or **Agency Lite** (`paid_plan` **305**), each project may have at most **2** goal profiles. This endpoint returns **`403`** if that limit is already reached.

See [Create Experiment — Plan limits](./create-experiment#public-v2-plan-limits) for full detail (including concurrent live experiment limits).

## Error responses

| Status | Meaning |
|---|---|
| `400` | Missing required field (`goal_name`, `goal_type`, or `goal_value`) or invalid `goal_type` value |
| `401` | Invalid or missing API key |
| `403` | [Plan limit](./create-experiment#public-v2-plan-limits) — maximum goals per project reached |
| `406` | A goal with the same `goal_key` already exists for this project |

:::tip Next step
Now create an experiment that tracks this goal. Use [Create Experiment](./create-experiment) and pass `"primary_goal_key": "your-goal-key"`.
:::

</ApiEndpointLayout>
