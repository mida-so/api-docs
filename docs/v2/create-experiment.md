---
sidebar_position: 1
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Experiment"
  method="POST"
  endpoint="/v2/project/{project_key}/create-experiment"
  description="Create a new A/B experiment for a project. The experiment is created in draft status by default."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/create-experiment"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    test_name: 'Homepage CTA Button Color Test',
    status: 9,
    url: 'https://example.com/',
    variants: [
      { name: 'Control', data: [] },
      { name: 'Variant 1 — Red Button', customCSS: '.cta-button { background-color: #FF5733 !important; }', customJS: '', data: [] }
    ],
    primary_goal: {
      goal_name: 'CTA Button Click',
      goal_type: 'clickOnElement',
      goal_value: '.cta-button'
    },
    configuration: {
      traffic_allocation: 100,
      confidence_interval: 95
    }
  }}
>

## Required fields

| Field | Type | Description |
|---|---|---|
| `test_name` | string | Display name for the experiment |
| `url` | string | The page URL being tested |
| `variants` | array | At least two variant objects — one Control and at least one treatment (see Variants section) |

## Variants

Each variant in the `variants` array represents a treatment arm. The **Control is always the first variant** (the original page, shown unchanged). Every additional object is a treatment you want to test against the Control.

:::info `data` is always required
Every variant object must include `"data": []`. For code-based experiments, pass an empty array. Only visual editor experiments populate the `data` array with DOM mutations.
:::

### Code-based experiments (most common via API)

Use `customCSS` and/or `customJS` to inject changes. Pass `data` as an empty array.

```json
[
  {
    "name": "Control",
    "data": []
  },
  {
    "name": "Variant 1 — Red Button",
    "customCSS": ".cta-button { background-color: #FF5733 !important; color: #fff !important; }",
    "customJS": "document.querySelector('.cta').textContent = 'Get Started Free';",
    "data": []
  }
]
```

### Visual DOM experiments

The `data` array holds DOM mutations produced by the Mida visual editor. Each entry replaces an element matched by a CSS selector with new HTML:

```json
{
  "name": "Variant 1",
  "data": [
    {
      "target": "h1.hero-title",
      "outerHTML": "<h1 class=\"hero-title\">New Headline Copy</h1>"
    }
  ]
}
```

You can combine `data` mutations with `customCSS`/`customJS` in the same variant.

## Goals

### Inline goal creation (recommended)

Pass `primary_goal` as an object to create the goal alongside the experiment. If a goal with the same `goal_name` and `goal_type` already exists for the project, it will be reused.

```json
{
  "primary_goal": {
    "goal_name": "CTA Button Click",
    "goal_type": "clickOnElement",
    "goal_value": ".cta-button"
  }
}
```

### Reference an existing goal by key

```json
{
  "primary_goal_key": "my-existing-goal-key"
}
```

### Goal types

| `goal_type` | What it tracks | `goal_value` |
|---|---|---|
| `clickOnElement` | Click on a CSS selector | `.buy-btn` |
| `clickOnText` | Click on an element containing specific text | `Add to cart` |
| `formSubmit` | Form submission | CSS selector of the `<form>` |
| `pageview` | URL path partial match | `/thank-you` |
| `pageviewExact` | Exact URL match | `https://example.com/thank-you` |
| `pageviewWildcard` | URL with `*` wildcards | `/products/*/confirm` |
| `pageviewRegex` | Regex URL pattern | `^/checkout/.+/success$` |
| `script` | Custom JS event — fires when your code calls the named event | Event name string |

### Secondary goals

Pass `secondary_goals` as an array to track additional metrics alongside the primary goal:

```json
{
  "secondary_goals": [
    { "goal_name": "Newsletter Signup", "goal_type": "formSubmit", "goal_value": "#signup-form" },
    { "goal_name": "Pricing Page View", "goal_type": "pageview", "goal_value": "/pricing" }
  ]
}
```

Or reference existing goals by key array:
```json
{ "secondary_goal_keys": ["signup-goal-key", "pricing-view-key"] }
```

## Optional fields

### Status

| Value | Behaviour |
|---|---|
| `9` | Draft — saved but not running (default) |
| `1` | Live — starts traffic split immediately on creation |
| `0` | Inactive — created in a deactivated state |

### Configuration

```json
{
  "configuration": {
    "traffic_allocation": 100,
    "confidence_interval": 95,
    "start_test_date": "2026-04-01T00:00:00Z",
    "end_test_date": "2026-04-30T23:59:59Z",
    "completion_visitor": 1000,
    "completion_conversion": 0,
    "completion_after_period": 30,
    "completion_stats_significant_flag": 1,
    "is_autopilot": 0,
    "is_mab": 0,
    "bayesian": 0
  }
}
```

| Field | Default | Description |
|---|---|---|
| `traffic_allocation` | `100` | % of visitors included in the test (0–100) |
| `confidence_interval` | `95` | Statistical confidence threshold |
| `start_test_date` | `null` | Auto-start date (ISO 8601) |
| `end_test_date` | `null` | Auto-end date (ISO 8601) |
| `completion_visitor` | `0` | Stop when this many unique visitors reached (0 = disabled) |
| `completion_conversion` | `0` | Stop when this many conversions reached (0 = disabled) |
| `completion_after_period` | `0` | Stop after N days (0 = disabled) |
| `completion_stats_significant_flag` | `0` | `1` = auto-stop when statistical significance is reached |
| `is_autopilot` | `0` | `1` = enable autopilot (Mida auto-allocates traffic to the winning variant) |
| `is_mab` | `0` | `1` = enable Multi-Armed Bandit mode |
| `bayesian` | `0` | `1` = use Bayesian statistics instead of frequentist |

### Targeting

Restrict which visitors are included in the experiment. All rules are optional — omit any field to include all visitors of that type.

```json
{
  "targeting": {
    "url_rules": [
      { "type": "contains", "value": "/pricing" },
      { "type": "exact", "value": "https://example.com/pricing" }
    ],
    "device_rules": [
      { "type": "is", "value": "desktop" }
    ],
    "country_rules": [
      { "type": "is", "value": "US" },
      { "type": "is", "value": "CA" }
    ]
  }
}
```

**`url_rules`** — Filter by page URL:

| `type` | Behaviour |
|---|---|
| `contains` | URL contains the value string |
| `exact` | URL exactly matches the value |
| `starts_with` | URL starts with the value |
| `regex` | URL matches the regex pattern |

**`device_rules`** — Filter by device type. Supported `value`: `"desktop"`, `"mobile"`, `"tablet"`.

**`country_rules`** — Filter by visitor country. Use ISO 3166-1 alpha-2 codes (e.g. `"US"`, `"GB"`, `"DE"`).

:::info Targeting after creation
After the experiment is created, you can update device, browser, and country targeting via the [Update Experiment](./update-experiment) endpoint. URL-based targeting changes require recreating the experiment or using the dashboard.
:::

### Idempotency

Pass `idempotency_key` (or the `x-idempotency-key` header) to safely retry requests without creating duplicates. The same key returns the original response for 24 hours.

```json
{ "idempotency_key": "deploy-2026-04-01-homepage-cta" }
```

## Example

```bash
curl --request POST \
  --url https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/create-experiment \
  --header 'Authorization: Bearer YOUR_GENERATED_API_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "test_name": "Homepage CTA Button Color Test",
    "status": 9,
    "url": "https://example.com/",
    "variants": [
      {
        "name": "Control",
        "data": []
      },
      {
        "name": "Variant 1 — Red Button",
        "customCSS": ".cta-button { background-color: #FF5733 !important; color: #fff !important; }",
        "customJS": "",
        "data": []
      }
    ],
    "primary_goal": {
      "goal_name": "CTA Button Click",
      "goal_type": "clickOnElement",
      "goal_value": ".cta-button"
    },
    "configuration": {
      "traffic_allocation": 100,
      "confidence_interval": 95
    }
  }'
```

## Success response

```json
{
  "success": true,
  "status": 9,
  "test_id": 28222,
  "company_id": 1001,
  "goal_profile_id": 8936,
  "secondary_goals_count": 0,
  "warnings": []
}
```

Save the `test_id` — you will use it in every subsequent call for this experiment.

:::tip No goal provided?
If you omit `primary_goal` and `primary_goal_key`, the experiment is still created but `warnings` will include `"No goal payload provided. Draft was created without a primary goal mapping."` You can add a goal later via the Update Experiment endpoint.
:::

## Error responses

| Status | Meaning |
|---|---|
| `400` | Missing required field (`test_name`, `url`, or `variants`), invalid `status` value, or malformed request body |
| `401` | Invalid or missing API key |
| `403` | Plan limit reached — upgrade your plan to create more experiments |
| `406` | Idempotency key conflict — a different experiment was already created with this key |
| `500` | Server error |

:::tip Next step
After creating your experiment, use [Update Experiment Status](./update-experiment-status) to launch it (`status: 1`), or [Get Experiment Details](./get-experiment-details) to verify the experiment was created correctly.
:::

</ApiEndpointLayout>
