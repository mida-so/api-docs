---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Global Custom Code"
  method="GET"
  endpoint="/v2/project/{project_key}/global-custom-code"
  description="Return the project's Global Custom Code: JavaScript and CSS that already run on every page with the Mida pixel. Empty strings mean nothing is set yet. Call this before appending a custom-event snippet so existing code is kept."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/global-custom-code"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/global-custom-code" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "js": "window.mdq = window.mdq || [];\nwindow.mdq.push([\"track\", \"signup\", { \"value\": 1 }]);",
  "css": "",
  "js_bytes": 78,
  "css_bytes": 0,
  "note": "This already runs on every page with the Mida pixel. To add a custom event, APPEND with update_global_custom_code (append_js) so the existing code stays."
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `js` | string | Current Global Custom JavaScript. Empty string if none is set |
| `css` | string | Current Global Custom CSS. Empty string if none is set |
| `js_bytes` | number | UTF-8 byte length of `js` |
| `css_bytes` | number | UTF-8 byte length of `css` |
| `note` | string | Guidance for agents: prefer appending rather than replacing |

Each file is stored as MySQL `TEXT` (65,535 bytes). This code runs on every page where the Mida pixel is installed, which is why a custom event does not need a change on the customer's site.

To add a snippet, [Update Global Custom Code](./update-global-custom-code) with `append_js` rather than replacing `js`.

## Error responses

| Status | Meaning |
|---|---|
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Project not found |

</ApiEndpointLayout>
