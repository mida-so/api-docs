---
sidebar_position: 2
hide_table_of_contents: false
---

# Server-side Quickstart

This guide walks you through running your first server-side A/B experiment with Mida. The example uses Node.js, but the same steps apply to every SDK — only the installation command and syntax differ.

**You'll need:**
- A Mida account with an active project
- The **Project key** from Dashboard → Settings → API
- Node.js installed (or your preferred language — see [SDK catalog](./sdks))

---

## Step 1 — Create a server-side experiment in the dashboard

Server-side experiments are created in the Mida dashboard, not via the REST API.

1. Open your project → **Experiments → New Experiment**
2. Choose **Server-side Test**
3. Give the experiment a name and set up your variants (`Variant 1`, `Variant 2`, …)
4. Configure your primary goal (click, event, revenue, etc.)
5. Save as draft — do **not** launch yet

The dashboard will generate an **Experiment key** (e.g. `homepage-pricing-v2`). Copy it — you'll use it in your code.

---

## Step 2 — Install the SDK

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="node" label="Node.js" default>

```bash
npm install mida-node
```

</TabItem>
<TabItem value="python" label="Python">

```bash
pip install mida-python
```

</TabItem>
<TabItem value="php" label="PHP">

```bash
composer require mida-so/mida-php
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```bash
gem install mida-ruby
```

</TabItem>
</Tabs>

---

## Step 3 — Initialize the client

Pass your **Project key** once when your application starts.

<Tabs>
<TabItem value="node" label="Node.js" default>

```javascript
const Mida = require('mida-node');
const mida = new Mida('YOUR_PROJECT_KEY');
```

</TabItem>
<TabItem value="python" label="Python">

```python
from mida import Mida
mida = Mida('YOUR_PROJECT_KEY')
```

</TabItem>
<TabItem value="php" label="PHP">

```php
require 'vendor/autoload.php';
use Mida\Mida;
$mida = new Mida('YOUR_PROJECT_KEY');
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
require 'mida'
mida = Mida.new('YOUR_PROJECT_KEY')
```

</TabItem>
</Tabs>

---

## Step 4 — Get the variant assignment

Call `getExperiment()` on each request, passing the **Experiment key** and a **distinct user ID** (any stable string that uniquely identifies the user — a database ID, session ID, or anonymous UUID all work).

<Tabs>
<TabItem value="node" label="Node.js" default>

```javascript
const variant = await mida.getExperiment('YOUR_EXPERIMENT_KEY', userId);

if (variant === 'Control') {
  // Original experience — nothing changes
} else if (variant === 'Variant 1') {
  // Treatment experience
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
variant = mida.get_experiment('YOUR_EXPERIMENT_KEY', user_id)

if variant == 'Control':
    pass  # Original experience
elif variant == 'Variant 1':
    pass  # Treatment experience
```

</TabItem>
<TabItem value="php" label="PHP">

```php
$variant = $mida->getExperiment('YOUR_EXPERIMENT_KEY', $userId);

if ($variant === 'Control') {
    // Original experience
} elseif ($variant === 'Variant 1') {
    // Treatment experience
}
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
variant = mida.get_experiment('YOUR_EXPERIMENT_KEY', user_id)

case variant
when 'Control'
  # Original experience
when 'Variant 1'
  # Treatment experience
end
```

</TabItem>
</Tabs>

:::info Variant names are fixed
Always use the exact strings `Control`, `Variant 1`, `Variant 2`, etc. These match what you configured in the dashboard and cannot be renamed in your code.
:::

---

## Step 5 — Track conversions

Call `setEvent()` whenever a conversion happens for the user. The event name must match the goal you set up in the dashboard.

<Tabs>
<TabItem value="node" label="Node.js" default>

```javascript
// Custom event
await mida.setEvent('signup_completed', userId);

// Revenue / purchase
await mida.setEvent('Purchase', userId, {
  revenue: 49.99,
  quantity: 1,
  currency: 'USD'
});
```

</TabItem>
<TabItem value="python" label="Python">

```python
# Custom event
mida.set_event('signup_completed', user_id)

# Revenue / purchase
mida.set_event('Purchase', user_id, {
    'revenue': 49.99,
    'quantity': 1,
    'currency': 'USD'
})
```

</TabItem>
<TabItem value="php" label="PHP">

```php
// Custom event
$mida->setEvent('signup_completed', $userId);

// Revenue / purchase
$mida->setEvent('Purchase', $userId, [
    'revenue' => 49.99,
    'quantity' => 1,
    'currency' => 'USD'
]);
```

</TabItem>
<TabItem value="ruby" label="Ruby">

```ruby
# Custom event
mida.set_event('signup_completed', user_id)

# Revenue / purchase
mida.set_event('Purchase', user_id, { revenue: 49.99, quantity: 1, currency: 'USD' })
```

</TabItem>
</Tabs>

---

## Step 6 — Launch the experiment

Go back to the dashboard, open the experiment, and set its status to **Live**. Traffic will start splitting immediately.

You can also launch via the REST API:

```bash
curl --request PATCH \
  --url "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/TEST_ID/status" \
  --header "Authorization: Bearer YOUR_GENERATED_API_KEY" \
  --header "Content-Type: application/json" \
  --data '{"status": 1}'
```

---

## Step 7 — Read results

Results appear in the Mida dashboard under your experiment. You can also fetch them via the REST API:

```bash
curl "https://api-{region}.mida.so/v2/project/YOUR_PROJECT_KEY/experiment/TEST_ID/result" \
  -H "Authorization: Bearer YOUR_GENERATED_API_KEY"
```

---

## What's next

- **[SDK catalog →](./sdks)** — full list of supported languages with install commands and GitHub links
- **[Server-side overview →](./overview)** — how bucketing, variant names, and goal tracking work
- **[Get Experiment Result →](/docs/v2/get-experiment-result)** — full result response schema
