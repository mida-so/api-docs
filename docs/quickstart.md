---
sidebar_position: 2
hide_table_of_contents: false
---

# Quickstart: Create and Launch an Experiment

This guide walks you through the full experiment lifecycle using the Mida API: create a draft, launch it, read results, and stop it when you are done. Copy-paste the curl commands and replace the placeholder values.

**You'll need:**
- Your **Project Key** — from Dashboard → Settings → API
- Your **API Key** — from Dashboard → Settings → API Keys
- Your **region** — `us` or `eu`

---

## Step 1 — Create the experiment

Create an experiment in status `9` (draft). The experiment is saved but not yet running.

```bash
curl --request POST \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/create-experiment" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{
    "test_name": "Homepage CTA Button Color Test",
    "url": "https://example.com/",
    "variants": [
      {
        "name": "Variant 1",
        "nickname": "Red CTA Button",
        "customCSS": ".cta-button { background-color: #FF5733 !important; color: #fff !important; }",
        "customJS": "",
        "data": []
      }
    ],
    "primary_goal": {
      "goal_name": "CTA Button Click",
      "goal_type": "clickOnElement",
      "goal_value": ".cta-button"
    },
    "configuration": {
      "traffic_allocation": 100,
      "confidence_interval": 95
    }
  }'
```

**Response:**

```json
{
  "success": true,
  "status": 9,
  "test_id": 28222,
  "company_id": 1001,
  "goal_profile_id": 8936,
  "secondary_goals_count": 0,
  "warnings": []
}
```

**Save the `test_id`** — you'll use it in every subsequent step.

:::info Variants explained
- **Do not include Control in `variants`.** The original page is added automatically.
- Treatment variant names must be exact: `Variant 1`, `Variant 2`, and so on. Use `nickname` for human-friendly labels like `"Red CTA Button"`.
- Use `customCSS` and/or `customJS` for code-based changes. Keep `data: []` unless you are sending visual-editor DOM changes.
:::

---

## Step 2 — Launch the experiment

Set status to `1` (live) to begin splitting traffic between variants.

```bash
curl --request PATCH \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/28222/status" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{"status": 1}'
```

**Response:**

```json
{
  "success": true,
  "test_id": 28222,
  "status": 1
}
```

The experiment is now live. Visitors to the test URL will be split between Control and your variant.

---

## Step 3 — Check results

After visitors have arrived and conversions have been tracked, retrieve per-variant results:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/28222/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

**Response:**

```json
{
  "success": true,
  "test_id": 28222,
  "test_name": "Homepage CTA Button Color Test",
  "status": 1,
  "days_running": 7,
  "total_visitors": 2980,
  "total_conversions": 268,
  "variants": [
    {
      "variant_id": "0",
      "name": "Control",
      "visitors": 1500,
      "conversions": 120,
      "conversion_rate": 8.0,
      "is_control": true
    },
    {
      "variant_id": "1",
      "name": "Variant 1",
      "nickname": "Red CTA Button",
      "visitors": 1480,
      "conversions": 148,
      "conversion_rate": 10.0,
      "improvement": 25.0,
      "is_control": false
    }
  ]
}
```

The `improvement` field shows relative lift vs the control. Here, Variant 1 converts 25% better than Control.

---

## Step 4 — Deactivate the experiment

When you have a winner, deactivate the experiment with status `0`:

```bash
curl --request PATCH \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/28222/status" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{"status": 0}'
```

:::info Reactivating
Setting status `0` stops data collection but preserves all results. You can restart the experiment at any time by setting status back to `1`.
:::

---

## Common patterns

### Filter results by date range

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/28222/result?start_date=2024-01-15&end_date=2024-02-15" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

### Create experiment with a pre-existing goal

If you've already created a goal and have its key, reference it directly:

```bash
--data '{
  "test_name": "Pricing Page Headline Test",
  "url": "https://example.com/pricing",
  "variants": [
    {
      "name": "Variant 1",
      "nickname": "Larger headline",
      "customCSS": "h1 { font-size: 2.5rem; }",
      "data": []
    }
  ],
  "primary_goal_key": "cta_button_click"
}'
```

### Preview before launch

Use the [Preview URLs](./v2/get-experiment-preview-urls) endpoint to generate QA links for Control and each treatment. The preview URL format is:

```text
https://example.com/?test-preview=28222&test-variant=Variant_1
```

Control uses `test-variant=0`. Treatment variants use their fixed name with spaces replaced by underscores, such as `Variant_1` or `Variant_12`.

### Create experiment and launch immediately

Pass `"status": 1` in the create request to skip the draft step:

```bash
--data '{
  "test_name": "Homepage Hero Test",
  "status": 1,
  "url": "https://example.com/",
  "variants": [...]
}'
```

### Prevent duplicate experiments (idempotency)

Pass a unique `idempotency_key` to safely retry without creating duplicates. Same key returns the original response for 24 hours:

```bash
--data '{
  ...
  "idempotency_key": "deploy-2026-04-01-homepage-cta"
}'
```

---

## Status codes reference

| Code | Meaning |
|---|---|
| `9` | Draft — saved, not running |
| `1` | Live — actively running |
| `0` | Inactive — stopped, data preserved, can be restarted |

---

## Goal types reference

When setting a `primary_goal` inline, use one of these `goal_type` values:

| `goal_type` | What it tracks | `goal_value` example |
|---|---|---|
| `clickOnElement` | Click on a CSS selector | `.buy-btn` |
| `clickOnText` | Click on an element with matching text | `Add to cart` |
| `formSubmit` | Form submission | `form#signup` |
| `pageview` | URL partial match | `/thank-you` |
| `pageviewExact` | Exact URL match | `https://example.com/thank-you` |
| `pageviewWildcard` | URL with `*` wildcards | `/products/*/confirm` |
| `pageviewRegex` | Regex URL pattern | `^/checkout/.+/success$` |
| `event` | Custom event name | `signup_completed` |
| `revenue` | Purchase or order event | `Purchase` |
| `script` | Manual trigger identifier | `purchase_complete` |

---

## What's next

- **[MCP Integration](./mcp-integration)** — connect Mida to AI assistants with dashboard OAuth
- **[Create Experiment](./v2/create-experiment)** — full reference for all fields including targeting, secondary goals, and advanced configuration
- **[Update Experiment Status](./v2/update-experiment-status)** — all status transitions and constraints
- **[Get Experiment Result](./v2/get-experiment-result)** — full result response schema
- **[Create Goal](./v2/create-goal)** — create reusable goals to share across experiments
