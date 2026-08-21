---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Suggested Pages to Personalize"
  method="GET"
  endpoint="/v2/project/{project_key}/personalization/suggested-pages"
  description="Which of your own pages are worth personalizing, ranked, with a reason each. Candidates come from your real traffic over the last 60 days, so these are pages that exist and get visited."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/suggested-pages"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Query parameters

| Parameter | Description |
|---|---|
| `account` | Optional, repeatable. Company names to rank the pages for. The ranking is much sharper with them than without |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/suggested-pages?account=Notion&account=Klaviyo" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Notes

- Call this before creating a campaign instead of assuming the homepage. Personalizing the wrong page produces a whole campaign of copy nobody reads.
- Pages not on your project's verified domains are filtered out, because the campaign builder would refuse them anyway.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
