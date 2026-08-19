---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get My Access"
  method="GET"
  endpoint="/v2/project/{project_key}/account/my-access"
  description="The caller's own effective role on this project: what they are allowed to do, and why. Answers 'am I view-only?' for the current connection."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/account/my-access"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/account/my-access" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

For a signed-in user (MCP connections carry the user's identity):

```json
{
  "success": true,
  "authenticated_as": "user",
  "role": 1,
  "role_label": "Admin",
  "can_edit": true,
  "note": "Can view and change experiments, goals, events and settings on this project."
}
```

For a plain project API key:

```json
{
  "success": true,
  "authenticated_as": "project API key",
  "role": null,
  "role_label": null,
  "can_edit": true,
  "note": "An API key acts on the project directly and has no person attached, so it has no team role. Team roles apply to people signed in to the dashboard or connected over MCP."
}
```

Roles resolve through all three membership paths — a direct account, a team invitation, or an agency link — the same way the dashboard resolves them.

</ApiEndpointLayout>
