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
      { name: 'Variant 1', nickname: 'Red Button', customCSS: '.cta-button { background-color: #FF5733 !important; }', customJS: '', data: [] }
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
| `variants` | array | One or more treatment variant objects — **do not include a "Control" entry** (see Variants section) |

## Variants

The `variants` array contains only your **treatment variants**. **Do not include a "Control" entry.** Control is the original page and is added automatically.

:::info `data` is always required
Every variant object must include `"data": []`. For code-based experiments, pass an empty array. Visual-editor experiments populate `data` with DOM changes.
:::

### Names and labels

Treatment variant names must be exact fixed strings:

| Array position | Required `name` | Human label |
|---|---|---|
| `variants[0]` | `Variant 1` | Put labels like `Red CTA` in `nickname` |
| `variants[1]` | `Variant 2` | Put labels like `Short headline` in `nickname` |
| `variants[11]` | `Variant 12` | Continue the same pattern |

There is no special API naming scheme for `Variant A` or `Red Button`. Use `nickname` for those labels.

```json
[
  {
    "name": "Variant 1",
    "nickname": "Red CTA Button",
    "customCSS": ".cta-button { background-color: #FF5733 !important; color: #fff !important; }",
    "customJS": "document.querySelector('.cta-button').textContent = 'Get Started Free';",
    "data": []
  }
]
```

### Control and custom code

Experiment-wide code uses top-level `custom_js` and `custom_css`. It runs for all assigned visitors, including Control.

Variant-specific code uses `variants[].customJS` and `variants[].customCSS`. Control-specific code can be passed with a top-level `control` helper object:

```json
{
  "custom_css": "body { scroll-behavior: smooth; }",
  "control": {
    "nickname": "Original CTA",
    "customCSS": ".cta-button { outline: 2px solid transparent; }",
    "customJS": ""
  }
}
```

The underlying raw API field for Control is `control_attr`, stored as JSON with `name`, `js`, and `css`.

### Variant `data` changes

`data` is an ordered array of visual-editor DOM change objects. If selectors are uncertain, prefer `data: []` with `customCSS` or `customJS`.

```json
{
  "name": "Variant 1",
  "nickname": "Headline and CTA update",
  "data": [
    {
      "target": "h1.hero-title",
      "textContent": "New headline copy"
    },
    {
      "target": ".promo-banner",
      "style": "display: none;"
    },
    {
      "refEl": ".hero",
      "dir": "a",
      "htmlBlock": "<p class=\"proof\">Trusted by 5,000 teams</p>"
    }
  ]
}
```

Supported readable shapes:

| Change | Shape |
|---|---|
| Modify existing element | `{ target, innerText/textContent/innerHTML/outerHTML/src/href/style/class, sitewide?, pageUrl? }` |
| Hide element | `{ target, style: "display: none;", sitewide?, pageUrl? }` |
| Remove element | `{ rm, sitewide?, pageUrl? }` |
| Insert HTML | `{ refEl, dir: "a" or "b" or "p", htmlBlock, sitewide?, pageUrl? }` |
| Move element | `{ oriEl, refEl, dir: "a" or "b", sitewide?, pageUrl? }` |
| Split URL redirect | `{ url, relay_param? }` |

For page-specific visual changes, use `sitewide: false` with `pageUrl`. The browser runtime compares origin and pathname and ignores query parameters.

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
| `pageview` | URL or path partial match | `/thank-you` |
| `pageviewExact` | Exact URL match | `https://example.com/thank-you` |
| `pageviewWildcard` | URL with `*` wildcards | `/products/*/confirm` |
| `pageviewRegex` | Regex URL pattern | `^/checkout/.+/success$` |
| `clickOnElement` | Click on a CSS selector | `.buy-btn` |
| `clickOnText` | Click on an element containing specific text | `Add to cart` |
| `externalLink` | Click on an external URL/domain | `stripe.com` |
| `formSubmit` | Form submission | CSS selector of the `<form>` |
| `elementAppears` | Element becomes visible in the DOM | `.success-message` |
| `scrolling` | Visitor reaches a scroll depth percentage | `75` |
| `duration` | Visitor stays for a number of seconds | `30` |
| `event` | Custom event name | `signup_completed` |
| `revenue` | Purchase or order event name | `Purchase` |
| `script` | Manual trigger identifier | `purchase_complete` |

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

`configuration` controls traffic, statistics, scheduling, and automation. Include only the fields you need.

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
    "distribution": "manual",
    "bayesian": 1,
    "dom_change_path": "immediate",
    "trigger_variant_change": "immediate",
    "integration": ["ga4"]
  }
}
```

| Field | Default | Description |
|---|---|---|
| `traffic_allocation` | `100` | % of visitors included in the test (0–100) |
| `confidence_interval` | `95` | Statistical confidence threshold |
| `start_test_date` | `null` | Auto-start date (ISO 8601) |
| `end_test_date` | `null` | Auto-end date (ISO 8601) |
| `is_mab` | `0` | `1` = enable Multi-Armed Bandit mode |
| `is_autopilot` | `0` | `1` = enable autopilot traffic allocation |
| `distribution` | `null` | Variant traffic distribution settings |
| `bayesian` | `1` | `1` = Bayesian statistics; `0` = frequentist statistics |
| `dom_change_path` | `null` | DOM change execution mode, commonly configured by the dashboard |
| `trigger_variant_change` | `null` | When variant code should execute on dynamic/SPAs |
| `completion_visitor` | `0` | Stop when this many unique visitors reached (0 = disabled) |
| `completion_conversion` | `0` | Stop when this many conversions reached (0 = disabled) |
| `completion_stats_significant_flag` | `0` | `1` = auto-stop when statistical significance is reached |
| `completion_after_period` | `0` | Stop after N days (0 = disabled) |
| `integration` | `[]` | Connected integrations to receive experiment data |

### Targeting

Top-level `targeting` applies to the whole experiment. For personalization, `variants[].targeting` applies only to that personalization variant.

Use plain public keys, without `test_` prefixes. All rules are optional; omit a field to include all visitors for that dimension.

```json
{
  "targeting": {
    "allowed_country": [
      { "name": "United States", "code": "US", "rule": "whitelist" }
    ],
    "device_rule": ["desktop", "mobile"],
    "browser_rule": ["chrome", "safari"],
    "parameter_rule": [
      [
        { "criteria": "utm_campaign", "operator": "==", "value": "spring-sale" }
      ]
    ]
  }
}
```

Common targeting fields:

| Field | Scope | Notes |
|---|---|---|
| `referral_rule` | Experiment or personalization variant | Referral source matching |
| `allowed_country` | Experiment or personalization variant | `[{ "name": "United States", "code": "US", "rule": "whitelist" }]`; use `blacklist` to exclude |
| `allowed_region` | Experiment or personalization variant | `[{ "name": "California (US)", "rule": "equal" }]`; `notEqual` excludes |
| `allowed_city` | Experiment or personalization variant | `[{ "name": "San Francisco (California)", "rule": "equal" }]` |
| `device_rule` | Experiment or personalization variant | `desktop`, `mobile`, `tablet` |
| `browser_rule` | Experiment or personalization variant | `chrome`, `safari`, `firefox`, `edge`, `ie`, `opera` |
| `os_rule` | Experiment or personalization variant | `windows`, `macOS`, `linux`, `chromeOS`, `ios`, `android` |
| `user_rule` | Experiment or personalization variant | `new` or `returning`; evaluated on entry, assigned visitors keep their experience |
| `browser_language_rule` | Experiment or personalization variant | ISO language codes such as `en` or `fr` |
| `segment_rule` | Experiment or personalization variant | Grouped visitor attribute conditions |
| `event_rule` | Experiment or personalization variant | Event history conditions |
| `parameter_rule` | Experiment or personalization variant | Grouped query parameter conditions |
| `ga4_rule` | Experiment or personalization variant | Existing GA4 audience IDs from connected GA4 configuration |
| `cookie_rule` | Experiment or personalization variant | Browser-only cookie conditions |
| `schedule_rule` | Experiment or personalization variant | Browser-only schedule windows |
| `url_rule` | Experiment only | Advanced URL matching, most often for split URL tests |

For `parameter_rule`, `cookie_rule`, and `segment_rule`, the outer array is AND logic and each inner array is OR logic. Parameter and cookie conditions use `{ id?, criteria, operator, value? }`. Supported operators include `ex`, `nx`, `==`, `!=`, `**`, `!*`, numeric comparisons (`gt`, `gte`, `lt`, `lte`, `>`, `>=`, `<`, `<=`), booleans (`bt`, `bf`), and date-day comparisons (`days_gt`, `days_gte`, `days_lt`, `days_lte`).

Segment conditions use the same grouped shape. `criteria` can be built-ins such as `name`, `email`, `company_name`, URL values such as `utm_campaign`, `utm_medium`, `utm_source`, `utm_term`, `ref`, or custom properties that your site sends through `identify()`.

`event_rule` uses this shape:

```json
[
  {
    "rule": "equal",
    "name": "signup_completed",
    "attributes": [[{ "key": "plan", "operand": "=", "value": "pro" }]],
    "min_count": 1,
    "timeframe_days": 30
  }
]
```

`attributes` is OR-of-AND groups. Use event names returned by [List Events](./list-events). `min_count` defaults to `1`; `timeframe_days` of `0` or omitted means lifetime.

Supported attribute operands are `=`, `!=`, `>`, `<`, `>=`, and `<=`.

`schedule_rule` is evaluated in the visitor's local timezone and supports overnight ranges:

```json
{
  "schedule_groups": [
    {
      "days": ["monday", "tuesday", "wednesday", "thursday", "friday"],
      "time_ranges": [{ "start": "09:00", "end": "17:00" }]
    }
  ]
}
```

:::info Browser-only rules
`cookie_rule` and `schedule_rule` are evaluated by the browser runtime. Server-side SDK experiments cannot enforce them.
:::

### Idempotency

Pass `idempotency_key` (or the `x-idempotency-key` header) to safely retry requests without creating duplicates. The same key returns the original response for 24 hours.

```json
{ "idempotency_key": "deploy-2026-04-01-homepage-cta" }
```

## Experiment types

`test_type` defaults to a standard A/B test when omitted. Set it explicitly when creating a split URL, personalization, or multivariate test.

| `test_type` | Use case | Variant details |
|---|---|---|
| `abtest` | Test changes on the same URL | Use `customJS`, `customCSS`, or `data` |
| `split` | Redirect traffic to different URLs | Put `{ "url": "https://example.com/new-page" }` in `variants[].data[0]` |
| `personalization` | Show targeted experiences to specific audiences | Add `targeting` to each personalization variant |
| `mvt` | Multivariate testing | Set `variant.layer` to group combinations |

### Split URL example

```json
{
  "test_name": "Homepage Split URL Test",
  "test_type": "split",
  "url": "https://example.com/",
  "variants": [
    {
      "name": "Variant 1",
      "nickname": "New homepage",
      "data": [{ "url": "https://example.com/new-homepage", "relay_param": true }]
    }
  ]
}
```

### Personalization variant example

```json
{
  "test_name": "Paid Search Homepage Personalization",
  "test_type": "personalization",
  "url": "https://example.com/",
  "variants": [
    {
      "name": "Variant 1",
      "nickname": "Google Ads message",
      "customJS": "document.querySelector('h1').textContent = 'Built for teams from Google Ads';",
      "data": [],
      "targeting": {
        "parameter_rule": [[{ "criteria": "utm_source", "operator": "==", "value": "google" }]]
      }
    }
  ]
}
```

### MVT example

```json
{
  "test_name": "Hero MVT",
  "test_type": "mvt",
  "url": "https://example.com/",
  "variants": [
    {
      "name": "Variant 1",
      "nickname": "Headline A",
      "layer": "headline",
      "customJS": "document.querySelector('h1').textContent = 'Ship tests faster';",
      "data": []
    },
    {
      "name": "Variant 2",
      "nickname": "CTA B",
      "layer": "cta",
      "customJS": "document.querySelector('.cta-button').textContent = 'Start testing';",
      "data": []
    }
  ]
}
```

## Plan limits (free &amp; Agency Lite) {#public-v2-plan-limits}

For accounts on **Sandbox** (`paid_plan` **300**) or **Agency Lite** (`paid_plan` **305**), the API applies the same caps as the Mida app (specific internal company IDs may be exempt).

| Limit | Value | When it applies |
|---|---|---|
| Concurrent **live** experiments | **2** per project | Experiments with `status: 1`, `is_completed: 0`, and not deploy experiments (`is_deploy` not set). Counted when you create as live (`status: 1`) or when you [activate](./update-experiment-status) an experiment. Draft (`9`) or inactive (`0`) experiments do not count until they are live. |
| Goals per project | **2** goal profiles | Creating **new** goals via inline `primary_goal` / `secondary_goals`, or any insert that would add another row to the project’s goal library. Referencing existing goals by key does not consume additional slots. |

Paid plans above these tiers are not limited by these checks in the Public API.

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
        "name": "Variant 1",
        "nickname": "Red Button",
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
| `403` | [Plan limit](#public-v2-plan-limits) — too many concurrent **live** experiments for the project, or too many **goals** when creating new goal profiles |
| `404` | Project not found |
| `500` | Server error |

:::tip Next step
After creating your experiment, use [Update Experiment Status](./update-experiment-status) to launch it (`status: 1`), or [Get Experiment Details](./get-experiment-details) to verify the experiment was created correctly.
:::

</ApiEndpointLayout>
