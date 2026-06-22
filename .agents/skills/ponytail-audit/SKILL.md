---
name: ponytail-audit
description: >
  Whole-repo audit for over-engineering. Scans the entire codebase: a ranked
  list of what to delete, simplify, or replace with stdlib/native equivalents.
  Use when the user says "audit this codebase", "find bloat", "ponytail-audit",
  or "/ponytail-audit". One-shot report, does not apply fixes.
---

ponytail-review, repo-wide. Scan the whole tree instead of a diff. Rank
findings biggest cut first.

## Tags

- `delete:` dead code, unused flexibility, speculative feature. Replacement: nothing.
- `stdlib:` hand-rolled thing the standard library ships. Name the function.
- `native:` dependency or code doing what the platform already does. Name the feature.
- `yagni:` abstraction with one implementation, config nobody sets, layer with one caller.
- `shrink:` same logic, fewer lines. Show the shorter form.

## Output format

```
## Ponytail Audit

| # | File | Tag | Finding | Est. lines saved |
|---|------|-----|---------|------------------|
| 1 | ... | delete: | ... | ~XX |
```

Sort by estimated lines saved, descending. One-shot report only.
