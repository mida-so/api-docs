---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Delete Project"
  method="DEL"
  endpoint="/v2/project/{project_key}"
  description="Soft-delete a project. The project disappears from list / get responses but all experiments, events, and visitor data are retained for billing, history, and compliance. There is no hard-delete endpoint — for a permanent wipe (e.g. GDPR) contact Mida support."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `project_key` | string | The project to delete |

## Example

```bash
curl -X DELETE "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "project_key": "PROJECT_KEY_AAAAAAAAAA",
  "status": 2,
  "message": "Project deleted (soft delete; data retained)"
}
```

`status: 2` is Mida's convention for deleted rows — the same flag used by the experiments / events / goals delete endpoints.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Project not found |

:::caution
Deleting a project hides it from the dashboard and all API listings. Live experiments running on this project's `widget_key` will stop being served (the script returns no test config). If you only want to pause testing, use [Update Project](./update-project) with a different `allowed_website` value, or pause individual experiments via [Update Experiment Status](./update-experiment-status) instead.
:::

</ApiEndpointLayout>
