---
sidebar_position: 5
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Get Experiment Share Link"
  method="GET"
  endpoint="/v2/project/{project_key}/experiment/{test_id}/share-link"
  description="Return the public share link for an experiment's results page. Share links let anyone view experiment results without logging in."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/YOUR_EXPERIMENT_ID/share-link"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |
| `test_id` | The numeric experiment ID |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/1234/share-link" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Success response

```json
{
  "success": true,
  "test_id": 1234,
  "company_id": 1001,
  "share_link": "https://us.mida.so/share/abResult/1234/AbC123xY",
  "is_public": true
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `share_link` | string | The full public URL to the experiment results page |
| `is_public` | boolean | Whether the share link is currently enabled |
| `test_id` | integer | The experiment ID |
| `company_id` | integer | Company that owns the experiment |

## About share links

Share links provide a read-only view of your experiment's live results — variant performance, conversion rates, and statistical significance — without requiring the viewer to have a Mida account. They are useful for:

- Sharing results with stakeholders or clients
- Embedding result URLs in reports or dashboards
- Archiving experiment outcomes after the test ends

:::info Share link must be enabled first
If `is_public` is `false`, the share link is disabled and the URL will not load. Enable sharing from the experiment's settings in the Mida dashboard before distributing the link.
:::

</ApiEndpointLayout>
