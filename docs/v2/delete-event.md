---
sidebar_position: 11
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Event"
  method="DELETE"
  endpoint="/v2/project/{project_key}/event/{event_id}"
  description="Soft-delete an event by setting its status to inactive. The event record is preserved in the database but will no longer appear in the Events dashboard or API list responses."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/YOUR_EVENT_ID"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `event_id` | The numeric event ID to delete |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event/9876" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "event_id": 9876,
  "deleted": true
}
```

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `404` | Event not found or belongs to a different project |

:::info Soft delete
This operation sets `status = 2` on the event record. The data is not permanently removed and historical tracking data associated with this event remains intact.
:::

</ApiEndpointLayout>
