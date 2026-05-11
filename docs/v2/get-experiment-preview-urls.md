---
sidebar_position: 6
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Preview URLs"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/preview-urls"
  description="Return ready-to-share preview links for every variant of an experiment — Control plus all treatments. Each link forces the requested variant to render regardless of the visitor's normal bucketing or any active segment rules. Useful for QA, customer-support flows, or stakeholder review before launch."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/preview-urls"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Type | Description |
|---|---|---|
| `project_key` | string | Your project key (the `key=` value in the Mida script tag). |
| `test_id` | integer | Numeric experiment ID. Get this from [List Experiments](./list-experiments). |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/preview-urls" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "test_name": "Homepage CTA Button Color Test",
  "page_url": "https://example.com/",
  "variants": [
    {
      "variant_id": 0,
      "name": "Control",
      "preview_url": "https://example.com/?test-preview=1234&test-variant=0"
    },
    {
      "variant_id": 1,
      "name": "Variant 1",
      "preview_url": "https://example.com/?test-preview=1234&test-variant=Variant_1"
    }
  ]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `test_id` | integer | The experiment's ID |
| `test_name` | string | Experiment display name |
| `page_url` | string | The page URL the experiment runs on (taken from `test.url`, falling back to the first key in `test.data`) |
| `variants` | array | One entry per variant — Control first, treatments after |
| `variants[].variant_id` | integer | `0` for Control, `1+` for treatments |
| `variants[].name` | string | Variant name (e.g. `Control`, `Variant 1`) |
| `variants[].preview_url` | string | Full URL — open it in any browser to render that specific variant |

## How the preview URL works

Each link appends two query parameters to the experiment's page URL:

| Parameter | Value |
|---|---|
| `test-preview` | The numeric `test_id` |
| `test-variant` | `0` for Control, or the treatment name with spaces replaced by `_` (for example `Variant 1` becomes `Variant_1`) |

When the Mida script loads on a page with these parameters, it bypasses normal traffic allocation, segment rules, and country/device targeting, then renders the requested variant directly. Control is rendered through the experiment's `control_attr` and is always available as `variant_id=0`.

Treatment tokens are based on the fixed API variant name, not the nickname:

| Variant name | Preview token |
|---|---|
| `Control` | `0` |
| `Variant 1` | `Variant_1` |
| `Variant 12` | `Variant_12` |

## Base URL rules

A/B tests and personalization previews use the experiment URL as the base URL. If the experiment URL contains wildcards, replace them with concrete path values before opening the preview link.

For split URL tests, the Control preview uses the experiment URL. Treatment previews use the treatment redirect URL from `variants[].data[0].url`.

:::info Preview session
The Mida script must be installed on the previewed page. Preview state persists in `sessionStorage` and `window.name` for the same tab; close the tab or clear `sessionStorage` to exit preview mode.
:::

## Error responses

| Status | Meaning |
|---|---|
| `400` | `test_id` missing or non-numeric |
| `401` | Invalid or missing API key |
| `403` | Project is inactive |
| `404` | Experiment not found in this project (or already deleted) |
| `409` | Experiment has no page URL configured — cannot build a preview link. Set `url` via [Update Experiment](./update-experiment). |

:::tip Next step
Send the Control + Variant URLs to your customer or QA team. They'll see the exact rendering Mida produces in the live experiment, without having to be in the test's traffic bucket.
:::

</ApiEndpointLayout>
