---
sidebar_position: 1
hide_table_of_contents: true
hide_title: true
---
import ApiEndpointLayout from '@site/src/components/ApiEndpointLayout';

<ApiEndpointLayout
  title="Register Agent Account"
  method="POST"
  endpoint="/v2/agent/register"
  description="Step 1 of creating a Mida account from an AI agent, for a person who does not have one yet. Mida emails that person a 6-digit code. No account is created until the code is sent back with Claim Agent Account. No API key is needed."
  playgroundUrl="https://api-{region}.mida.so/v2/agent/register"
  defaultHeaders={{'Content-Type': 'application/json'}}
  defaultBody={{
    email: 'person@example.com',
    terms_accepted: true,
    client: 'Claude Code'
  }}
>

## Before you call it

- **Ask the person first.** Show them the [Mida terms](https://www.mida.so/terms) and ask which email address to register. Sending `terms_accepted: true` accepts those terms on their behalf.
- **Pick the region.** An account lives in one region and cannot move. Call `https://api-eu.mida.so` for people and sites in the EU, and `https://api-us.mida.so` otherwise.

## Body fields

| Field | Type | Required | Description |
|---|---|---|---|
| `email` | string | Yes | The person's email address. Addresses with a `+` alias and throwaway inboxes are refused |
| `terms_accepted` | boolean | Yes | Must be `true` |
| `name` | string | No | The person's name. Defaults to the part of the email before `@` |
| `client` | string | No | Your agent's name. It is shown in the email so the person knows who asked |

## Example

```bash
curl -X POST "https://api-{region}.mida.so/v2/agent/register" \
  -H "Content-Type: application/json" \
  -d '{"email": "person@example.com", "terms_accepted": true, "client": "Claude Code"}'
```

## Success response

```json
{
  "success": true,
  "claim_token": "3f9c…48 hex characters",
  "expires_in": 900,
  "next": "Mida emailed a 6-digit code to that address. Ask the person for it, then POST /v2/agent/claim with claim_token and code.",
  "no_code_arrived": "If nothing arrives within a few minutes, the address may already have a Mida account. That person creates an API key at https://app.mida.so (Settings, API)."
}
```

Keep `claim_token` and ask the person for the code from their inbox. The code and the token expire after 15 minutes.

## If the address already has an account

The response is the same, and no code is sent. Mida does not reveal which addresses have accounts. If the person sees no email within a few minutes, they most likely have an account already: they sign in at [app.mida.so](https://app.mida.so) and create an API key under Settings, API.

## Errors

| Status | `code` | Meaning |
|---|---|---|
| `400` | `invalid_email` | The address is malformed, uses a `+` alias, or cannot receive mail |
| `400` | `terms_required` | `terms_accepted` was not `true` |
| `429` | `rate_limited` | Too many attempts from this IP, for this address, or for this email domain in the last hour |
| `503` | `unavailable` | Registration is temporarily unavailable. Try again shortly |

</ApiEndpointLayout>
