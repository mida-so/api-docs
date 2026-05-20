---
sidebar_position: 3
hide_table_of_contents: false
---

# SDK Catalog

Mida provides server-side SDKs for all major languages and platforms. Each SDK exposes the same three core methods: `getExperiment`, `setEvent`, and `isFeatureEnabled`.

All SDKs are open source under the MIT license and hosted in the [mida-so GitHub organization](https://github.com/mida-so).

---

## Available SDKs

| Language / Platform | Install | GitHub |
|---|---|---|
| **Node.js** | `npm install mida-node` | [mida-so/mida-node](https://github.com/mida-so/mida-node) |
| **Python** | `pip install mida-python` | [mida-so/mida-python](https://github.com/mida-so/mida-python) |
| **PHP** | `composer require mida-so/mida-php` | [mida-so/mida-php](https://github.com/mida-so/mida-php) |
| **Ruby** | `gem install mida-ruby` | [mida-so/mida-ruby](https://github.com/mida-so/mida-ruby) |
| **Flutter** | Add to `pubspec.yaml` — see README | [mida-so/mida-flutter](https://github.com/mida-so/mida-flutter) |

---

## Core API (all SDKs)

All SDKs share the same method names and argument shapes. Language-specific syntax varies — see each README for full examples.

### Initialize

```javascript
// Node.js
const Mida = require('mida-node');
const mida = new Mida('YOUR_PROJECT_KEY');
```

Create one instance per application, not per request.

---

### `getExperiment(experimentKey, distinctId)`

Returns the variant name assigned to this user for the given experiment.

| Argument | Type | Description |
|---|---|---|
| `experimentKey` | string | The experiment key from the dashboard |
| `distinctId` | string | A stable unique identifier for the user |

**Returns:** `'Control'`, `'Variant 1'`, `'Variant 2'`, … or `null` if the user is not in the experiment (outside traffic allocation, targeting rules, etc.)

```javascript
const variant = await mida.getExperiment('checkout-flow-v2', userId);

if (variant === 'Control') {
  // original
} else if (variant === 'Variant 1') {
  // treatment
}
```

:::warning null means not bucketed
Always handle the `null` / falsy case — the user may be outside the traffic split or the experiment may not be live yet.
:::

---

### `setEvent(eventName, distinctId [, properties])`

Records a conversion event for a user. The `eventName` must match the goal name configured in the Mida dashboard.

| Argument | Type | Description |
|---|---|---|
| `eventName` | string | Name of the event (must match the dashboard goal) |
| `distinctId` | string | Same stable user ID passed to `getExperiment` |
| `properties` | object | Optional. Include `revenue`, `quantity`, `currency` for purchase events |

```javascript
// Custom event
await mida.setEvent('signup_completed', userId);

// Purchase / revenue
await mida.setEvent('Purchase', userId, {
  revenue: 49.99,
  quantity: 1,
  currency: 'USD'
});
```

---

### `isFeatureEnabled(featureKey [, distinctId])`

Returns `true` or `false` for a feature flag. Useful for gradual rollouts and kill switches without a full A/B split.

```javascript
const enabled = await mida.isFeatureEnabled('new-checkout', userId);

if (enabled) {
  // show new checkout
}
```

---

### `setAttribute(distinctId, attributes)`

Sets user attributes that can be used for targeting and segmentation in the dashboard.

```javascript
await mida.setAttribute(userId, {
  plan: 'pro',
  country: 'US',
  company: 'Acme Corp'
});
```

---

## Using the same user ID everywhere

The `distinctId` is the bucketing key — Mida hashes it with the experiment key to deterministically assign a variant. Use the **same value** across all SDK calls for a user:

- A database user ID (e.g. `42`, or `'user_42'`) is the most stable choice
- For anonymous visitors, generate a UUID on first visit and persist it (cookie, local storage, or session)
- Do not use email addresses — they can change

---

## Combining server-side bucketing with client-side goal tracking

If the conversion event happens on a webpage (e.g. a thank-you page after checkout), you can track it client-side through the Mida browser script instead of calling `setEvent()` from your server. Both approaches write to the same `goal` table and appear in the same dashboard results.

---

## Self-hosted script

If you prefer to self-host the Mida frontend tracking script rather than loading it from `cdn.mida.so`, the source is available at [mida-so/mida-script](https://github.com/mida-so/mida-script).

---

## Need a language that's not listed?

Open an issue in the closest SDK repo or contact [hello@mida.so](mailto:hello@mida.so). The bucketing algorithm is deterministic and straightforward to port — contributions are welcome.
