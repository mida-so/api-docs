---
sidebar_position: 7
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Events"
  method="GET"
  endpoint="/v2/project/{project_key}/events"
  description="Return all custom events for the selected project. Only active, non-internal events are returned — mirrors the Events dashboard view."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/events?limit=50&offset=0"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Query parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `limit` | integer | `50` | Max results to return. Maximum `500`. |
| `offset` | integer | `0` | Number of records to skip (for pagination). |
| `event_text` | string | _(all)_ | Exact match filter on event name. |
| `start_date` | string | _(all time)_ | Filter events on or after this date. Format: `YYYY-MM-DD`. |
| `end_date` | string | _(all time)_ | Filter events on or before this date. Format: `YYYY-MM-DD`. |

## What this endpoint returns

This endpoint applies the same filters as the Events dashboard:

- Only events with `event_type = 2` (custom tracked events)
- Only active rows (`status = 1`)
- Excludes rows with `visitor_id = 0`
- Excludes internal events prefixed with `!`
- Excludes derived goal events prefixed with `goal_`

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/events?limit=50&offset=0" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Example: filter by date range

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/events?start_date=2024-01-01&end_date=2024-01-31" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "company_id": 1001,
  "count": 2,
  "events": [
    {
      "event_id": 9876,
      "event_text": "Pricing CTA Clicked",
      "event_property": "{\"button_id\":\"hero-cta\"}",
      "created_at": "2024-01-15T10:30:00.000Z"
    },
    {
      "event_id": 9877,
      "event_text": "Signup Started",
      "event_property": null,
      "created_at": "2024-01-15T10:35:00.000Z"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `events` | array | List of event objects |
| `events[].event_id` | integer | Unique event ID — use this in other event endpoints |
| `events[].event_text` | string | The event name |
| `events[].event_property` | string\|null | JSON-encoded metadata attached to the event |
| `events[].created_at` | string | ISO 8601 creation timestamp |
| `count` | integer | Total number of events returned |

</ApiEndpointLayout>
