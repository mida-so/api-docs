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
  description="Create a goal profile for the selected project. Goals define what counts as a conversion — clicks, page views, form submissions, or custom events."
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

| `goal_type` | Tracks | `goal_value` example |
|---|---|---|
| `clickOnElement` | Clicks on a CSS selector | `.cta-button`, `#hero-cta`, `[data-testid="buy-now"]` |
| `clickOnText` | Clicks on any element matching visible text | `Start Free Trial` |
| `formSubmit` | Form submissions matching a selector | `form#signup`, `form.checkout-form` |
| `pageview` | Visits to a URL (partial match) | `https://example.com/pricing` |
| `pageviewExact` | Visits where the full URL matches exactly | `https://example.com/pricing?plan=pro` |
| `pageviewWildcard` | Visits matching a wildcard URL pattern | `https://example.com/blog/*` |
| `pageviewRegex` | Visits matching a regular expression | `^https://example\.com/blog/.+$` |
| `script` | Manual trigger from custom JavaScript code | `signup_completed` |

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
