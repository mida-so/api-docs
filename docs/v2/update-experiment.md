---
sidebar_position: 6
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Experiment"
  method="PATCH"
  endpoint="/v2/project/{project_key}/experiment/{test_id}"
  description="Update an experiment's name, URL, variants, configuration, custom code, or targeting. Only fields you include are changed; all other fields remain unchanged."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    test_name: 'Homepage CTA Button Color Test (Revised)',
    configuration: {
      traffic_allocation: 80,
      confidence_interval: 95
    }
  }}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Updatable fields

| Field | Type | Description |
|---|---|---|
| `test_name` | string | New display name for the experiment |
| `url` | string | Change the test page URL |
| `variants` | array | Replace treatment variant definitions using the same shape as Create Experiment |
| `control` | object | Update Control nickname/custom JS/custom CSS helper fields |
| `control_attr` | object/string | Raw Control attributes (`name`, `js`, `css`) if you are not using `control` |
| `custom_js` | string | Experiment-wide JavaScript applied to all assigned visitors, including Control |
| `custom_css` | string | Experiment-wide CSS applied to all assigned visitors, including Control |
| `configuration` | object | Update traffic, statistics, automation, or trigger settings |
| `targeting` | object | Update experiment-level targeting rules |
| `tags` | array | Experiment tags for organization |

Partial updates are shallow at the top level: omit a top-level field to leave it unchanged. When you send arrays such as `variants`, `tags`, or grouped targeting rules, the provided array becomes the new value for that field.

## Variants and Control

Use the same variant rules as [Create Experiment](./create-experiment):

- Do not include Control in `variants`.
- Treatment names must be exact fixed strings: `Variant 1`, `Variant 2`, and so on, aligned with array position.
- Use `nickname` for human-friendly labels.
- Use `variants[].customJS` / `variants[].customCSS` for variant-specific code.
- Use top-level `custom_js` / `custom_css` for experiment-wide code.
- Use `control` or `control_attr` for Control-specific nickname/code.

```json
{
  "variants": [
    {
      "name": "Variant 1",
      "nickname": "Red CTA Button",
      "customCSS": ".cta-button { background-color: #FF5733 !important; color: #fff !important; }",
      "customJS": "",
      "data": []
    }
  ],
  "control": {
    "nickname": "Original CTA",
    "customJS": "",
    "customCSS": ""
  }
}
```

### Configuration fields

| Field | Type | Description |
|---|---|---|
| `traffic_allocation` | integer | Percentage of visitors included in the test. `0`–`100`. |
| `confidence_interval` | integer | Statistical confidence threshold. Typically `95`. |
| `start_test_date` | string | Auto-start date in ISO 8601 format. |
| `end_test_date` | string | Auto-end date in ISO 8601 format. |
| `is_mab` | integer | `1` enables Multi-Armed Bandit mode. |
| `is_autopilot` | integer | `1` enables autopilot traffic allocation. |
| `distribution` | object/string | Variant traffic distribution settings. |
| `bayesian` | integer | `1` for Bayesian statistics, `0` for frequentist. |
| `dom_change_path` | string | DOM change execution mode. |
| `trigger_variant_change` | string | When variant code should execute on dynamic/SPAs. |
| `completion_visitor` | integer | Stop when this many unique visitors have entered. |
| `completion_conversion` | integer | Stop when this many conversions have been tracked. |
| `completion_stats_significant_flag` | integer | `1` = stop when statistical significance is reached. |
| `completion_after_period` | integer | Stop after this many days. |
| `integration` | array | Connected integrations to receive experiment data. |

### Targeting fields

Use the same public targeting keys as Create Experiment. Top-level `targeting` applies to the whole experiment; `variants[].targeting` applies only to personalization variants.

Common keys include `referral_rule`, `allowed_country`, `allowed_region`, `allowed_city`, `device_rule`, `browser_rule`, `os_rule`, `user_rule`, `browser_language_rule`, `segment_rule`, `event_rule`, `parameter_rule`, `ga4_rule`, `cookie_rule`, `schedule_rule`, and experiment-only `url_rule`.

`cookie_rule` and `schedule_rule` are browser-runtime rules. Server-side SDK experiments cannot enforce them.

## Example: reduce traffic allocation

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "configuration": {
      "traffic_allocation": 50
    }
  }'
```

## Example: target desktop visitors only

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "targeting": {
      "device_rule": ["desktop"]
    }
  }'
```

## Example: update targeting with parameters

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "targeting": {
      "allowed_country": [
        { "name": "United States", "code": "US", "rule": "whitelist" }
      ],
      "parameter_rule": [
        [
          { "criteria": "utm_campaign", "operator": "==", "value": "spring-sale" }
        ]
      ]
    }
  }'
```

## Example: update a variant

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "variants": [
      {
        "name": "Variant 1",
        "nickname": "Short headline",
        "customJS": "document.querySelector(\"h1\").textContent = \"Start testing faster\";",
        "customCSS": "",
        "data": []
      }
    ]
  }'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid field values or malformed request body |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::info Updating live experiments
Changing variants, targeting, or traffic allocation on a live experiment can affect assignment and reporting. For major content changes, prefer updating drafts or creating a new experiment.
:::

:::tip Next step
To start, pause, or end the experiment, use [Update Experiment Status](./update-experiment-status).
:::

</ApiEndpointLayout>
