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
  description="Update an experiment's name, URL, configuration, or targeting. Only fields you include are changed — all other fields remain unchanged."
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
| `configuration` | object | Update traffic or confidence settings (see below) |
| `targeting` | object | Update device/browser/country targeting (see below) |
| `tags` | array | Experiment tags for organization |

### Configuration fields

| Field | Type | Description |
|---|---|---|
| `traffic_allocation` | integer | Percentage of visitors included in the test. `0`–`100`. |
| `confidence_interval` | integer | Statistical confidence threshold. Typically `95`. |

### Targeting fields

| Field | Type | Description |
|---|---|---|
| `devices` | array | Limit to devices: `"desktop"`, `"mobile"`, `"tablet"`. Empty = all devices. |
| `browsers` | array | Limit to browsers: `"chrome"`, `"firefox"`, `"safari"`, `"edge"`. Empty = all. |
| `countries` | array | ISO 3166-1 alpha-2 country codes to include. Empty = all countries. |

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
      "devices": ["desktop"]
    }
  }'
```

## Success response

```json
{
  "success": true,
  "test_id": 1234
}
```

:::info Variants cannot be updated via this endpoint
To change variant CSS, JS, or visual editor changes, use the Mida dashboard. This endpoint is for metadata and configuration changes only.
:::

</ApiEndpointLayout>
