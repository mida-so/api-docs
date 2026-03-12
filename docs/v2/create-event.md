---
sidebar_position: 8
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Create Event"
  method="POST"
  endpoint="/v2/project/{project_key}/event"
  description="Create a new custom event for the selected project. Events track specific user actions and can be used as conversion goals in experiments."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    event_text: 'Pricing CTA Clicked',
    event_property: {button_id: 'hero-cta', placement: 'above-fold'},
    url: 'https://example.com/pricing'
  }}
>

## Required body fields

| Field | Type | Description |
|---|---|---|
| `event_text` | string | The event name. Should be descriptive and consistent (e.g., `"Signup Started"`, `"Checkout Completed"`). |

## Optional fields

| Field | Type | Description |
|---|---|---|
| `event_property` | object or string | Arbitrary key/value metadata to attach to the event. Pass as an object — it will be stored as JSON. |
| `url` | string | The page URL where the event occurs. |
| `event_path` | string | The URL path (e.g., `/pricing`). |
| `session` | string | Session identifier if tracking within a specific session. |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_text": "Pricing CTA Clicked",
    "event_property": {"button_id": "hero-cta", "placement": "above-fold"},
    "url": "https://example.com/pricing"
  }'
```

## Success response

```json
{
  "success": true,
  "event_id": 9876,
  "event_text": "Pricing CTA Clicked",
  "script": "<script type=\"text/javascript\">\n  window.mdq = window.mdq || [];\n  window.mdq.push([\"track\", \"Pricing CTA Clicked\"]);\n</script>",
  "company_id": 1001
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `event_id` | integer | The newly created event's ID |
| `event_text` | string | The event name as stored |
| `script` | string | Ready-to-use tracking snippet for your website |
| `company_id` | integer | Your company ID |

:::tip Use the tracking snippet
The `script` field in the response contains a ready-to-use JavaScript snippet you can add to your website to fire this event from client-side code. Copy it directly into your page or tag manager.
:::

## Error responses

| Status | Meaning |
|---|---|
| `400` | Missing `event_text` or invalid field values |
| `401` | Invalid or missing API key |

:::tip Next step
To use this event as a conversion goal in an experiment, create a goal with `goal_type: "script"` and set `goal_value` to the event name (e.g. `"Pricing CTA Clicked"`). See [Create Goal](./create-goal).
:::

</ApiEndpointLayout>
