---
sidebar_position: 9
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Event Details"
  method="GET"
  endpoint="/v2/project/{project_key}/event/{event_id}"
  description="Return the full details of a single event by its ID."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/YOUR_EVENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `event_id` | The numeric event ID (from [Create Event](./create-event) or [List Events](./list-events)) |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/9876" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "event": {
    "event_id": 9876,
    "event_type": 2,
    "event_text": "Pricing CTA Clicked",
    "event_property": "{\"button_id\":\"hero-cta\",\"placement\":\"above-fold\"}",
    "url": "https://example.com/pricing",
    "event_path": "/pricing",
    "status": 1,
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `event.event_id` | integer | Unique event ID |
| `event.event_type` | integer | Event type — `2` for custom tracked events |
| `event.event_text` | string | The event name |
| `event.event_property` | string\|null | JSON-encoded metadata |
| `event.url` | string | The page URL associated with this event |
| `event.status` | integer | `1` = active, `2` = deleted |
| `event.created_at` | string | ISO 8601 creation timestamp |

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Event not found or belongs to a different project |

</ApiEndpointLayout>
