---
name: ponytail-debt
description: >
  Harvest every `ponytail:` comment in the codebase into a debt ledger, so
  deliberate shortcuts get tracked. Use when the user says "ponytail debt",
  "/ponytail-debt", "what did ponytail defer", or "list the shortcuts".
  One-shot report, changes nothing.
---

Every deliberate ponytail shortcut is marked with a `ponytail:` comment naming
its ceiling and upgrade path. This collects them into one ledger.

## Scan

`grep -rnE '(#|//) ?ponytail:' .` (skip node_modules, .git, build output)

## Output format

```
## Ponytail Debt Ledger

| # | File:Line | Shortcut | Ceiling | Upgrade path |
|---|-----------|----------|---------|--------------|
| 1 | ... | ... | ... | ... |
```

One-shot report only. Changes nothing.
