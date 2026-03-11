---
sidebar_position: 1
hide_table_of_contents: true
---

# Mida API V2 Documentation

This site documents the public V2 API endpoints for experiment, event, and goal management.

## Why this docs setup

- Clean navigation focused on endpoints
- Simple markdown-based authoring
- Easy maintenance as API changes
- Fast local preview and static build

## Base URL

Use your API domain (for example):

```text
https://api-{region}.mida.so/v2
```

Replace `{region}` with `us` or `eu` depending on your account (US or EU).

## Authentication

V2 endpoints use:

- `project_key` in path: `/project/{project_key}/...`
- API key in one of:
  - `Authorization: Bearer <api_key>` (recommended)
  - `x-api-key: <api_key>`
  - `api-key: <api_key>`


