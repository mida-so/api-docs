---
sidebar_position: 10
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Event"
  method="PATCH"
  endpoint="/v2/project/{project_key}/event/{event_id}"
  description="Update fields on a single event. Only the fields you include are changed — all other fields remain unchanged."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/YOUR_EVENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    event_text: 'Pricing CTA Clicked — Mobile',
    event_property: {device: 'mobile', button_id: 'hero-cta'}
  }}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `event_id` | The numeric event ID |

## Updatable fields

| Field | Type | Description |
|---|---|---|
| `event_text` | string | Rename the event |
| `event_property` | object or string | Replace the event's metadata |
| `url` | string | Update the associated page URL |
| `event_path` | string | Update the associated URL path |
| `session` | string | Update the session identifier |
| `status` | integer | `1` = active, `2` = soft-delete |

## Example: rename an event

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/9876" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_text": "Pricing CTA Clicked — Mobile"
  }'
```

## Example: update event metadata

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/9876" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "event_property": {"device": "mobile", "button_id": "hero-cta"}
  }'
```

## Success response

```json
{
  "success": true,
  "event_id": 9876
}
```

</ApiEndpointLayout>
