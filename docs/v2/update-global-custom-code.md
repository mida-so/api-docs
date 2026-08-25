---
sidebar_position: 6
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Update Global Custom Code"
  method="PATCH"
  endpoint="/v2/project/{project_key}/global-custom-code"
  description="Install JavaScript or CSS into Global Custom Code, which already runs on every page with the Mida pixel. Prefer append_js / append_css so existing code is kept. Use js / css only when you mean to replace the whole file. This is how a custom event is installed without changing the customer's site."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/global-custom-code"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Body parameters

Send at least one field. Do not send `append_js` and `js` together (same for CSS).

| Field | Type | Description |
|---|---|---|
| `append_js` | string | JavaScript to **add** to whatever is already in Global Custom JS. Use this for a new event snippet |
| `append_css` | string | CSS to **add** to whatever is already in Global Custom CSS |
| `js` | string | **Replaces** all of Global Custom JS. Send the complete file, including everything that should stay |
| `css` | string | **Replaces** all of Global Custom CSS. Send the complete file, including everything that should stay |

A snippet that is already in the file is a no-op (`already_present: true`) rather than a second copy. The result must fit in MySQL `TEXT` (65,535 bytes) or the request is refused and nothing is written.

This is not [Create Event](./create-event). That records one occurrence for one identified visitor. This installs tracking so the event fires on the site.

## Example

Add a custom event that fires on every page. Existing Global JS is kept:

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/global-custom-code" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "append_js": "window.mdq = window.mdq || [];\nwindow.mdq.push([\"track\", \"signup_click\", { \"value\": 1 }]);"
  }'
```

A click listener, after you have a real selector:

```bash
curl -X PATCH "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/global-custom-code" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "append_js": "document.addEventListener(\"click\", function (e) {\n  var el = e.target.closest(\".signup-btn\");\n  if (!el) return;\n  window.mdq = window.mdq || [];\n  window.mdq.push([\"track\", \"signup_click\", { value: 1 }]);\n});"
  }'
```

Read first with [Get Global Custom Code](./get-global-custom-code) if you need to rewrite rather than append.

## Success response

```json
{
  "success": true,
  "js_bytes": 156,
  "css_bytes": 0,
  "appended_js": true,
  "replaced_js": false,
  "appended_css": false,
  "replaced_css": false,
  "note": "Saved (appended JavaScript). It runs on every page with the Mida pixel, so nothing on their site needs to change. A custom event shows on /events the first time it fires."
}
```

If that exact snippet is already in the file:

```json
{
  "success": true,
  "already_present": true,
  "js_bytes": 156,
  "css_bytes": 0,
  "note": "That snippet is already in Global Custom Code, so nothing was changed."
}
```

The event appears on [List Events](./list-events) the first time it fires.

## Errors

| Status | Meaning |
|---|---|
| `400` | No recognised field, empty append, `append_js` and `js` sent together, or the result would exceed 65,535 bytes |
| `401` | Invalid or missing API key |
| `404` | Project not found |

</ApiEndpointLayout>
