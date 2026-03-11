---
sidebar_position: 4
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Result"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/result"
  description="Return the conversion results for an experiment — visitors, conversions, and conversion rate per variant, with relative improvement over the control."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/result"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Query parameters

| Parameter | Type | Description |
|---|---|---|
| `start_date` | string | Filter conversions from this date (format: `YYYY-MM-DD`) |
| `end_date` | string | Filter conversions up to this date (format: `YYYY-MM-DD`) |

Both date parameters are optional. When omitted, all data for the experiment is returned.

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

With date filtering:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/result?start_date=2024-01-15&end_date=2024-02-15" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "test_name": "Homepage CTA Button Color Test",
  "status": "live",
  "status_code": 1,
  "start_date": "2024-01-15T10:30:00.000Z",
  "end_date": null,
  "days_running": 15,
  "primary_goal": {
    "goal_name": "CTA Button Click",
    "goal_type": "clickOnElement",
    "goal_value": ".cta-button"
  },
  "total_visitors": 2980,
  "total_conversions": 268,
  "variants": [
    {
      "variant_id": "0",
      "name": "Control",
      "visitors": 1500,
      "conversions": 120,
      "conversion_rate": 8.0,
      "is_control": true
    },
    {
      "variant_id": "1",
      "name": "Red CTA Button",
      "visitors": 1480,
      "conversions": 148,
      "conversion_rate": 10.0,
      "improvement": 25.0,
      "is_control": false
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `test_id` | integer | Unique experiment ID |
| `test_name` | string | Experiment name |
| `status` | string | `live`, `draft`, or `inactive` |
| `status_code` | integer | Raw status value (`1`=live, `9`=draft, `0`=inactive) |
| `start_date` | string | When the experiment was created |
| `end_date` | string \| null | When the experiment was concluded, or `null` if still running |
| `days_running` | integer | Number of days the experiment has been running |
| `primary_goal` | object \| null | Primary conversion goal definition, or `null` if none set |
| `total_visitors` | integer | Total visitors across all variants |
| `total_conversions` | integer | Total conversions across all variants |
| `variants` | array | Per-variant result objects (control listed first) |

### Variant fields

| Field | Type | Description |
|---|---|---|
| `variant_id` | string | Variant identifier (`"0"` = control) |
| `name` | string | Variant display name |
| `visitors` | integer | Unique visitors assigned to this variant |
| `conversions` | integer | Number of visitors who converted |
| `conversion_rate` | number | Conversion rate as a percentage (e.g. `10.0` = 10%) |
| `improvement` | number | Relative lift vs the control in percent (e.g. `25.0` = +25%). Only present on non-control variants when the control has data. |
| `is_control` | boolean | Whether this is the control variant |

## Error responses

| Status | Meaning |
|---|---|
| `400` | Invalid `test_id`, or date parameters are malformed / out of order |
| `401` | Invalid or missing API key |
| `404` | Experiment not found or belongs to a different project |

</ApiEndpointLayout>
