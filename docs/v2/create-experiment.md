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
    status: 'draft',
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
| `variants` | array | At least one variant object (see Variants section) |

## Variants

Each variant in the `variants` array represents a treatment arm. The **Control** is your first variant (original page). Add more objects for each variation you want to test.

### Code-based experiments (most common via API)

Use `customCSS` and/or `customJS` to inject changes. Leave `data` as an empty array.

```json
{
  "name": "Variant 1",
  "customCSS": "h1 { color: #FF5733; font-size: 2rem; }",
  "customJS": "document.querySelector('.cta').textContent = 'Get Started Free';",
  "data": []
}
```

### Visual DOM experiments

The `data` array holds DOM mutations made via the visual editor. Each entry has a `target` (CSS selector) and `outerHTML` (the replacement HTML).

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

| `goal_type` | `goal_value` |
|---|---|
| `clickOnElement` | CSS selector (e.g. `.buy-btn`) |
| `clickOnText` | Text to match (e.g. `Add to cart`) |
| `formSubmit` | CSS selector of the `<form>` |
| `pageview` | URL path (partial match) |
| `pageviewExact` | Exact URL |
| `pageviewWildcard` | URL with `*` wildcards |
| `pageviewRegex` | Regex pattern |
| `script` | Custom JS expression that returns `true` |

### Secondary goals

Pass `secondary_goals` as an array to track additional metrics:

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

### Status / Mode

| Value | Behaviour |
|---|---|
| `draft` | Saved but not running (default) |
| `live` | Starts traffic split immediately on creation |
| `inactive` | Created in paused state |

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
| `traffic_allocation` | `100` | % of visitors included in the test |
| `confidence_interval` | `95` | Statistical confidence threshold |
| `start_test_date` | `null` | Auto-start date (ISO 8601) |
| `end_test_date` | `null` | Auto-end date (ISO 8601) |
| `completion_visitor` | `0` | Stop when this many unique visitors reached |
| `completion_conversion` | `0` | Stop when this many conversions reached |
| `completion_after_period` | `0` | Stop after N days |
| `completion_stats_significant_flag` | `0` | Auto-stop when stat sig reached |
| `is_autopilot` | `0` | Enable autopilot variant selection |
| `is_mab` | `0` | Enable Multi-Armed Bandit mode |
| `bayesian` | `0` | Use Bayesian statistics |

### Targeting

Restrict which visitors see the experiment:

```json
{
  "targeting": {
    "url_rules": [{ "type": "contains", "value": "/pricing" }],
    "device_rules": [{ "type": "is", "value": "desktop" }],
    "country_rules": [{ "type": "is", "value": "US" }]
  }
}
```

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
    "status": "draft",
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
  "status": "draft",
  "test_id": 28222,
  "company_id": 1001,
  "goal_profile_id": 8936,
  "secondary_goals_count": 0,
  "warnings": []
}
```

:::tip No goal provided?
If you omit `primary_goal` and `primary_goal_key`, the experiment is still created but `warnings` will include `"No goal payload provided. Draft was created without a primary goal mapping."` You can add a goal later via the Update Experiment endpoint.
:::

</ApiEndpointLayout>
