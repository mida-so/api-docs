---
sidebar_position: 2
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Claim Agent Account"
  method="POST"
  endpoint="/v2/agent/claim"
  description="Step 2 of creating a Mida account from an AI agent. Send the 6-digit code the person received by email. Mida creates the account and its first project, and returns an API key and the project key."
  playgroundUrl="https://api-{region}.mida.so/v2/agent/claim"
  defaultHeaders={{'Content-Type': 'application/json'}}
  defaultBody={{
    claim_token: 'CLAIM_TOKEN_FROM_REGISTER',
    code: '123456'
  }}
>

## Body fields

| Field | Type | Required | Description |
|---|---|---|---|
| `claim_token` | string | Yes | The token returned by [Register Agent Account](./register-agent-account) |
| `code` | string | Yes | The 6 digits from the email |

Call the same region you registered with.

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/agent/claim" \
  -H "Content-Type: application/json" \
  -d '{"claim_token": "CLAIM_TOKEN_FROM_REGISTER", "code": "123456"}'
```

## Success response

```json
{
  "success": true,
  "api_key": "mk-v1-…",
  "api_key_note": "Shown once. Store it as a secret (an environment variable), never in source control.",
  "project_key": "YOUR_PROJECT_KEY",
  "region": "us",
  "api_base": "https://api-us.mida.so/v2",
  "auth_header": "Authorization: Bearer <api_key>",
  "dashboard": {
    "url": "https://us.mida.so",
    "sign_in": "The account has no password yet. The person sets one at https://us.mida.so/forgot-password with this email."
  },
  "next_steps": ["…"]
}
```

### Response fields

| Field | Type | Description |
|---|---|---|
| `api_key` | string | The account's first API key. It is shown once; store it as a secret. The person can revoke it in the dashboard under Settings, API |
| `project_key` | string | The key of the account's first project. Use it in every `/v2/project/{project_key}/…` call and in the install tag |
| `region` | string | `us` or `eu` |
| `api_base` | string | The base URL for all further calls |
| `dashboard.url` | string | Where the person signs in |
| `dashboard.sign_in` | string | How the person sets a password. The account is created without one |

## What to do next

1. [Get Install Health](./get-install-health) after adding the install tag to the site. The tag comes from `GET /v2/project/{project_key}/install-snippet`.
2. [Create Goal](./create-goal), then [Create Experiment](./create-experiment) as a draft.
3. [Get Pre-Publish Check](./get-pre-publish-check) and fix what it reports.
4. Ask the person before setting an experiment live. Launching changes what their visitors see.

## Errors

| Status | `code` | Meaning |
|---|---|---|
| `400` | `wrong_code` | The code is not right. The message says how many tries are left |
| `400` | `invalid_code`, `invalid_claim` | The code is not 6 digits, or the token is malformed |
| `403` | `signup_refused` | Mida could not create an account for this address. The person can sign up at app.mida.so/sign-up |
| `409` | `account_exists` | The address already has a Mida account |
| `410` | `claim_expired` | The claim expired, was used, had five wrong codes, or was never sent a code. Start again with Register Agent Account |
| `429` | `rate_limited` | Too many attempts. Try again later |

</ApiEndpointLayout>
