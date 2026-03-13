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
  description="Record a custom event for a specific visitor. The event is tied to a visitor record in Mida — identify the visitor using their Mida UUID, email, or your own user ID."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY', 'Content-Type': 'application/json'}}
  defaultBody={{
    event_name: 'purchase_completed',
    mida_uuid: 'YOUR_VISITOR_UUID',
    properties: { amount: 199.99, plan: 'pro' }
  }}
>

## How it works

Every event in Mida is tied to a visitor. When you call this endpoint, Mida looks up the visitor using the identifier you provide, then records the event against that visitor.

This means before recording an event via the API, you need a way to identify the visitor. There are three options:

| Identifier | How it works |
|---|---|
| `mida_uuid` | Capture `await mida.uuid()` in the browser and store it in your own database. Pass it here when you need to record an event for that visitor. |
| `email` | Works if you previously called `mida.identify({ email: '...' })` client-side. Mida will find the visitor by their email. |
| `id` | Works if you previously called `mida.identify({ id: '...' })` client-side with your own user ID. Your backend can then use the same user ID to record events — no UUID storage needed. |

:::tip Recommended for logged-in users
Add `mida.identify({ id: currentUser.id })` to your login flow. After that, your backend can always record events using your own user IDs — simple and requires no extra storage.
:::

:::warning Visitor must exist first
If no Mida visitor record matches the identifier you provide, the request returns `400`. The visitor must have been seen on your website at least once before.
:::

---

## Request body

| Field | Type | Required | Description |
|---|---|---|---|
| `event_name` | string | ✅ Yes | Name of the event (e.g. `purchase_completed`, `form_submitted`, `plan_upgraded`) |
| `mida_uuid` | string | ⚠️ One required | Mida-generated visitor UUID |
| `email` | string | ⚠️ One required | Visitor's email (requires prior `mida.identify({ email })` call) |
| `id` | string | ⚠️ One required | Your own user ID (requires prior `mida.identify({ id })` call) |
| `properties` | object | No | Any additional metadata to attach to the event |

---

## Example: identify by `mida_uuid`

```bash
curl --request POST \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "event_name": "purchase_completed",
    "mida_uuid": "85a35aca4df9",
    "properties": {
      "amount": 199.99,
      "plan": "pro"
    }
  }'
```

## Example: identify by your own user ID

```bash
curl --request POST \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/event" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "event_name": "plan_upgraded",
    "id": "user_12345",
    "properties": {
      "from_plan": "starter",
      "to_plan": "pro"
    }
  }'
```

## Success response

```json
{
  "success": true,
  "message": "Event recorded successfully"
}
```

## Error responses

| Status | Meaning |
|---|---|
| `400` | `event_name` is missing, or none of `mida_uuid`, `email`, `id` was provided |
| `400` | Visitor not found — no Mida record matches the identifier you provided |
| `401` | Invalid or missing API key |
| `500` | Server error |

</ApiEndpointLayout>
