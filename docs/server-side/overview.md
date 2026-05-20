---
sidebar_position: 1
hide_table_of_contents: false
---

# Server-side Testing Overview

Mida offers two ways to run experiments, depending on where your variant logic lives.

## Client-side vs Server-side

| | Client-side | Server-side |
|---|---|---|
| **Where variants run** | Browser (Mida JS script) | Your app/server (SDK) |
| **What you can test** | Page appearance — CSS, text, HTML, redirects | Backend logic — pricing, algorithms, APIs, mobile app rendering |
| **Flicker risk** | Yes (mitigated by Mida's anti-flicker) | None — response is already the right variant |
| **Setup** | Install Mida script → use REST API or dashboard | Create in dashboard → install SDK → call `getExperiment()` |
| **Requires Mida script on page** | Yes | No (but recommended for goal tracking) |
| **Platforms** | Websites | Node.js, Python, PHP, Ruby, Flutter, Android, iOS |

Most Mida users start with **client-side** experiments — they require no code beyond the Mida script and are managed entirely through the dashboard or REST API.

**Server-side** testing is the right choice when:

- Variant differences are in backend logic (pricing engine, recommendation algorithm, search ranking, etc.)
- You're testing across platforms — web, iOS, Android — and need a single bucketing source of truth
- You need zero-flicker rendering for highly sensitive pages
- You're running experiments inside a mobile app where no browser is involved

---

## How server-side testing works in Mida

```
1. You create the experiment in the dashboard (server-side type)
2. Mida assigns a stable experiment_key (e.g. "homepage-pricing-v2")
3. On each request, your server calls the SDK:
      variant = await mida.getExperiment(experimentKey, distinctUserId)
4. Your code branches on "Control", "Variant 1", "Variant 2", …
5. When a conversion happens, you call:
      await mida.setEvent(eventName, distinctUserId)
6. Results appear in the Mida dashboard as usual
```

The SDK handles **bucketing** (deterministically assigning a user to a variant), **session continuity** (same user always gets same variant), and **goal tracking** — so the dashboard stats work the same as client-side experiments.

---

## Experiment key vs Project key

| Key | What it is | Where to find it |
|-----|------------|-----------------|
| **Project key** | Identifies your Mida site/project | Dashboard → Settings → API |
| **Experiment key** | Identifies a specific server-side experiment | Dashboard → Experiment → SDK panel |

Both are needed for SDK usage. The REST API uses **Project key** for management. The SDK uses **Project key** (to init the client) and **Experiment key** (to get variant assignments).

---

## Variant names are the contract

Mida uses the same fixed naming convention for both client-side and server-side experiments:

| Role | Name | Notes |
|------|------|-------|
| Original experience | `Control` | Do not include in `create-experiment` variants array |
| First treatment | `Variant 1` | |
| Second treatment | `Variant 2` | |
| Nth treatment | `Variant N` | |

Your SDK code must branch on these exact strings — they are the interface between the dashboard configuration and your application code.

```javascript
const variant = await mida.getExperiment('my-experiment-key', userId);

if (variant === 'Control') {
  // original logic
} else if (variant === 'Variant 1') {
  // treatment logic
}
```

---

## Goal tracking

Server-side experiments track goals the same way as client-side ones — by event name. Call `setEvent()` from your server when a conversion happens.

| Event type | `setEvent()` call |
|---|---|
| Custom event | `mida.setEvent('signup_completed', userId)` |
| Revenue / purchase | `mida.setEvent('Purchase', userId, { revenue: 49.99, quantity: 1, currency: 'USD' })` |

The event name must match what you configured as the goal in the Mida dashboard.

:::info Goal tracking from browser
If the conversion happens on a web page (e.g. reaching a thank-you URL), you can still track it client-side through the Mida script — no need to call `setEvent()` from the server.
:::

---

## Next steps

- **[Quickstart →](./quickstart)** — set up your first server-side experiment in 5 steps
- **[SDK catalog →](./sdks)** — install instructions for Node.js, Python, PHP, Ruby, Flutter, and more
- **[REST API →](/docs/intro)** — manage experiments, goals, and events programmatically
