---
sidebar_position: 3
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Details"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}"
  description="Return full details for one experiment, including its variants, goals, targeting rules, and configuration."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID (from [Create Experiment](./create-experiment) or [List Experiments](./list-experiments)) |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "experiment": {
    "test_id": 1234,
    "test_name": "Homepage CTA Button Color Test",
    "url": "https://example.com/",
    "status": 9,
    "created_at": "2024-01-15T10:30:00.000Z",
    "updated_at": "2024-01-20T14:22:00.000Z",
    "goal_profile_id": 99,
    "variants": [
      {
        "variant_id": 1,
        "name": "Control",
        "customCSS": "",
        "customJS": "",
        "data": []
      },
      {
        "variant_id": 2,
        "name": "Variant 1 — Red Button",
        "customCSS": ".cta-button { background-color: #FF5733 !important; }",
        "customJS": "",
        "data": []
      }
    ],
    "configuration": {
      "traffic_allocation": 100,
      "confidence_interval": 95
    },
    "targeting": {
      "devices": [],
      "browsers": [],
      "countries": []
    },
    "primary_goal": {
      "goal_profile_id": 99,
      "goal_name": "CTA Button Click",
      "goal_type": "clickOnElement",
      "goal_value": ".cta-button"
    }
  }
}
```

### Key response fields

| Field | Type | Description |
|---|---|---|
| `experiment.test_id` | integer | Unique experiment ID |
| `experiment.status` | integer | `9`=draft, `1`=live, `0`=inactive |
| `experiment.variants` | array | All variant objects including CSS/JS changes |
| `experiment.configuration` | object | Traffic allocation and confidence interval settings |
| `experiment.targeting` | object | Device, browser, country rules (empty array = all) |
| `experiment.primary_goal` | object | The primary conversion goal definition |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

:::info About targeting in the response
The `targeting.devices`, `targeting.browsers`, and `targeting.countries` fields return flat string arrays (e.g. `["desktop"]`, `["US", "CA"]`). An empty array means "all" — no restriction. These are the stored values as applied by the Mida tracking script.
:::

:::tip Next step
Ready to see how the experiment is performing? Use [Get Experiment Result](./get-experiment-result) to retrieve per-variant conversion data.
:::

</ApiEndpointLayout>
