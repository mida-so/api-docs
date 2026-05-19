---
sidebar_position: 3
hide_table_of_contents: false
---

# Mida MCP Integration

Mida MCP lets AI assistants work with your Mida projects through the Model Context Protocol. After connecting it, you can ask an MCP-capable client to list experiments, create draft tests, inspect results, create goals, and record custom events.

Unlike API-key based integrations, Mida MCP uses remote OAuth through the Mida dashboard. During normal setup you do not paste a Mida API key or project key into your AI client.

:::info MCP endpoint
Use this endpoint:

```text
https://mcp.mida.so/mcp
```
:::

---

## Prerequisites

- A Mida dashboard account with access to at least one active project.
- An MCP client that supports remote HTTP MCP with OAuth.
- Browser popups and redirects allowed for the MCP client, `app.mida.so`, and `mcp.mida.so`.
- The Mida script installed on your website if you want previews, experiment traffic, and goals to run on the live site.

Remote HTTP/OAuth MCP support varies by client and version. If your client cannot connect to a remote OAuth MCP server yet, use Cursor or Claude Code with remote MCP support. Advanced local stdio setup is possible for clients that only support local MCP, but that path requires API credentials and is not the recommended setup for normal users.

---

## How authorization works

1. Add the Mida MCP endpoint to your MCP client.
2. The client opens a Mida authorization page.
3. Mida sends you through your existing dashboard account/session when possible. If you are not signed in, you will be asked to sign in.
4. If one active project is available, Mida can select it automatically. If multiple projects are available, choose the project you want the AI client to use first.
5. Mida issues an MCP OAuth token to the client. The MCP server then calls the Mida backend with an internal token, so you do not need a Mida API key for MCP.

The selected project is just the starting project for the session. The MCP tools can later list available projects and switch the active project when you ask.

---

## Setup

### Cursor

In Cursor, open MCP settings and add a remote MCP server:

```json
{
  "mcpServers": {
    "mida": {
      "url": "https://mcp.mida.so/mcp"
    }
  }
}
```

Cursor should open the Mida dashboard authorization flow. Approve the connection, choose a project if prompted, then return to Cursor and confirm that the Mida tools are listed.

### Claude Code

If your Claude Code version supports remote HTTP MCP with OAuth, add Mida as an HTTP MCP server:

```bash
claude mcp add --transport http mida https://mcp.mida.so/mcp
```

Then follow the browser authorization prompt. If your CLI uses a different MCP command format, choose the remote HTTP transport and use `https://mcp.mida.so/mcp` as the server URL.

### Claude Desktop

Claude Desktop support for remote OAuth MCP depends on the version and release channel. If your version includes remote connectors or remote MCP servers, add Mida with:

```text
https://mcp.mida.so/mcp
```

If your version only supports local stdio MCP servers, remote OAuth will not work directly. In that case, either use Cursor/Claude Code for remote MCP or use the advanced local stdio package setup documented in the MCP server package. The local fallback requires `MIDA_API_KEY` and `MIDA_PROJECT_KEY`, while the recommended remote setup does not.

### VS Code

For VS Code builds or extensions that support MCP remote HTTP servers, add Mida as an HTTP server:

```json
{
  "servers": {
    "mida": {
      "type": "http",
      "url": "https://mcp.mida.so/mcp"
    }
  }
}
```

If your VS Code MCP client does not support remote OAuth yet, use Cursor/Claude Code remote MCP or a documented local stdio fallback.

---

## Available tools

### Context and projects

| Tool | What it does |
|---|---|
| `get_mida_api_context` | Returns Mida-specific guidance for experiment lifecycle, variant naming, goal types, targeting, preview URLs, and result fields. Use this when the assistant needs exact Mida behavior. |
| `list_projects` | Lists the Mida projects available to your connected dashboard account. |
| `select_project` | Switches the active project for future MCP calls in the current session. |
| `get_project_configuration` | Returns Global Settings for the active project: default primary goal, secondary metrics, stats engine, and confidence threshold. |

### Experiments

| Tool | What it does |
|---|---|
| `list_experiments` | Lists experiments for the active project with user-friendly statuses such as `draft`, `live`, and `inactive`. |
| `get_experiment` | Gets detailed experiment information by `test_id`. |
| `create_experiment` | Creates a draft A/B test, personalization, split URL test, or multivariate test. It requires a test name, URL, and at least one treatment variant. |
| `update_experiment_status` | Changes an experiment status using labels such as `live`, `inactive`, `paused`, or `draft`. |
| `get_experiment_result` | Gets visitors, conversions, conversion rates, and improvement versus Control when available. If the experiment has no attached goal, uses the project's global primary goal from Global Settings. Also reports `stats_engine` and attaches statistical insights by default. |
| `compute_experiment_statistics` | Computes the same Bayesian or Frequentist insights as `get_experiment_result` from arbitrary aggregate counts. Use it to roll up timeseries rows, custom date ranges, or manually summed segments into a single decision summary that matches the dashboard. |

### Goals and events

| Tool | What it does |
|---|---|
| `list_goals` | Lists reusable conversion goals for the active project. Use returned `goal_key` values when attaching goals to experiments. |
| `create_goal` | Creates a reusable conversion goal, such as pageview, click, form submit, scroll depth, duration, event, revenue, or script goals. |
| `delete_goal` | Deletes or archives a reusable goal by `goal_profile_id`. |
| `list_events` | Lists tracked custom event names summarized from recorded visitor events. |
| `create_event` | Records a custom event for an already identified visitor by Mida UUID, email, or external ID. |

---

## Example prompts

- "List my live experiments in Mida."
- "Create a draft A/B test on `https://example.com/pricing` that changes the hero CTA copy to `Start free trial`, and use my existing signup goal."
- "Create a personalization for mobile visitors in the United States that shows a shorter hero section. Keep it as a draft."
- "Generate preview URLs for test `12345`, including Control and Variant 1."
- "What is my project's default primary goal?"
- "Analyze the results for test `12345` and summarize the conversion rate and lift versus Control."
- "Create a pageview goal for `/thank-you` named `Signup completed`."
- "Record an event named `DemoBooked` for the visitor with email `customer@example.com`."

For complex creation prompts, include the target URL, desired change, conversion goal, and whether the experiment should remain a draft or go live.

---

## Safety notes

- Create experiments as `draft` by default. Ask explicitly before launching an experiment as `live`.
- Control is implicit. Do not add Control to the `variants` array when creating experiments.
- Treatment names must be `Variant 1`, `Variant 2`, and so on. Put human-friendly labels such as `Blue CTA` or `Short Hero` in `nickname`.
- Preview URLs use `test-variant=0` for Control. Treatment preview tokens replace spaces with underscores, such as `Variant_1` or `Variant_2`.
- Targeting can silently exclude traffic. Only create targeting rules that the user explicitly described, and check them first when an experiment receives no traffic.
- Use `get_mida_api_context` when you need the full Mida-specific details for goal types, targeting shapes, preview URL rules, variant data, or result fields.

---

## Troubleshooting

### OAuth popup or redirect is blocked

Allow popups and redirects for your MCP client, `app.mida.so`, and `mcp.mida.so`. Sign in to the Mida dashboard in the same browser, then reconnect the MCP server.

### The wrong project is selected

Ask the assistant to list projects, then select the correct project:

```text
List my Mida projects, then switch to the project for example.com.
```

### No active projects are available

MCP only authorizes active Mida projects that your dashboard account can access. Create or reactivate a project in the dashboard, or ask an account owner to grant access.

### Mida tools do not appear in the client

Check that the server URL is exactly `https://mcp.mida.so/mcp`, reconnect the MCP server, and confirm that your client supports remote HTTP MCP with OAuth. If the client only supports local stdio MCP, remote OAuth tools will not appear.

### The client does not support remote OAuth MCP

Use Cursor or Claude Code with remote MCP support. If you must use a local-only client, use the documented local stdio package setup; that fallback requires `MIDA_API_KEY` and `MIDA_PROJECT_KEY` and is separate from the recommended OAuth flow.

### An experiment has no traffic

Check that the experiment is `live`, the Mida script is installed on the target page, the URL pattern matches the page visitors are viewing, traffic allocation is not zero, and targeting rules are not too narrow.

### A preview URL does not render the variant

Make sure the Mida script is installed on the previewed page. Use `test-variant=0` for Control and `Variant_N` for treatments, such as `Variant_1`. For split URL tests, preview treatment variants on the destination URL rather than the original experiment URL.
