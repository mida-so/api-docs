---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Team Members"
  method="GET"
  endpoint="/v2/project/{project_key}/account/members"
  description="Everyone on the account that owns this project, with their role, whether they can make changes, membership kind, status and last login. Read-only: roles are managed under Team settings in the dashboard."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/account/members"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/account/members" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "count": 3,
  "members": [
    {
      "name": "Alicia",
      "email": "alicia@example.com",
      "role": 0,
      "role_label": "Owner",
      "can_edit": true,
      "status": "active",
      "membership": "direct",
      "last_login_at": "2026-08-18T09:12:44.000Z"
    },
    {
      "name": "Ethan",
      "email": "ethan@example.com",
      "role": 1,
      "role_label": "Admin",
      "can_edit": true,
      "status": "active",
      "membership": "invited member",
      "last_login_at": "2026-08-19T02:03:10.000Z"
    },
    {
      "name": "Sam",
      "email": "sam@example.com",
      "role": 3,
      "role_label": "Viewer",
      "can_edit": false,
      "status": "invited",
      "membership": "invited member",
      "last_login_at": null
    }
  ]
}
```

## Fields

| Field | Description |
|---|---|
| `role` / `role_label` | `0` Owner, `1` Admin, `2` Editor, `3` Viewer |
| `can_edit` | `true` for Owner, Admin and Editor; `false` for Viewer |
| `status` | `active`, or `invited` for a pending invitation |
| `membership` | `direct` (their own account) or `invited member` (joined via a team invite) |
| `is_you` | Present and `true` on the caller's own row when the connection identifies a user (MCP). Absent for plain API keys |

</ApiEndpointLayout>
