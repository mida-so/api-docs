---
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="List Saved Target Accounts"
  method="GET"
  endpoint="/v2/project/{project_key}/personalization/saved-accounts"
  description="Companies this project has targeted before, most recently used first. An account already listed has been researched already, so reusing it is cheaper and starts warm."
  playgroundUrl="https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/saved-accounts"
  defaultHeaders={{Authorization: 'Bearer YOUR_GENERATED_API_KEY'}}
>

## Path parameters

| Parameter | Description |
|---|---|
| `project_key` | Your project's API key |

## Query parameters

| Parameter | Description |
|---|---|
| `search` | Optional filter on name, domain or industry |

## Example

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/personalization/saved-accounts?search=saas" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

## Notes

- Every company added to any campaign on this project is saved here, so the next campaign is a selection rather than another paste.
- Available only on accounts with Personalization switched on. Others get `403`.

</ApiEndpointLayout>
