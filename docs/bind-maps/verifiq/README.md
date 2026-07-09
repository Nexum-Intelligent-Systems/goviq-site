# VerifIQ — Bind Maps

Generated from source by `tools/bind-map/generate-bind-map.mjs`. Do not hand-edit — re-run the generator after code changes:

```
node tools/bind-map/generate-bind-map.mjs --config tools/bind-map/verifiq.config.mjs
```

Each edge below is derived from an actual `useQuery`/`useMutation`/`useAction(api.*)` call and the matching Convex function body — not hand-drawn.

| Module | Convex functions | UI bindings found |
|---|---|---|
| [Auth](./auth.md) | 0 | 0 |
| [Ingest & Upload](./ingest-upload.md) | 11 | 4 |
| [Classification](./classification.md) | 13 | 2 |
| [Review Orchestration](./review-orchestration.md) | 20 | 1 |
| [Project & Dashboard](./project-dashboard.md) | 15 | 6 |
| [Reporting & Export](./reporting-export.md) | 2 | 0 |
| [Planning Conditions](./planning-conditions.md) | 4 | 0 |
| [Learning Loop](./learning-loop.md) | 4 | 0 |
| [Platform / Infra](./platform.md) | 3 | 0 |

## Known limitations of this generator

- Detects only `useQuery`/`useMutation`/`useAction(api.*)` calls — library-specific hooks (e.g. Convex Auth's `useAuthActions()`) and non-React callers (HTTP routes, crons, scripts) are not auto-detected. See the `Notes` section on individual module pages for hand-verified exceptions.
- Table access is inferred from `ctx.db.query("table")` / `ctx.db.insert("table", ...)` calls in a function body. `.patch()`/`.get()`/`.delete()` calls on an id are not resolved to a table unless a `.query("table")` on the same handler already established it — usually true in this codebase, but not guaranteed.
- Component attribution is line-based (nearest preceding top-level `function`/`const Name` declaration above the hook call), not full AST scope resolution — accurate for this codebase's one-major-component-per-page style, but would need a real parser (e.g. ts-morph) for deeply nested subcomponents.
