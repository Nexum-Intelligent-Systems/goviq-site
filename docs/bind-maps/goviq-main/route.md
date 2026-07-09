# route

Auto-derived module: everything under `src/app/route/`.

**App directory:** `src/app/route/` (1 `.tsx` files scanned; no matching `src/components/` subdirectory found)

## Bind map

```mermaid
flowchart LR
  n0["route/new/page.tsx :: RouteIntakeContent"] -->|useMutation| n1["useMutation api.assessments.create"]
  n1 -->|reads/writes| n2[("assessment_drafts")]
  n1 -->|reads/writes| n3[("assessment_events")]
  n0["route/new/page.tsx :: RouteIntakeContent"] -->|useMutation| n4["useMutation api.assessments.update"]
  n4 -->|reads/writes| n3[("assessment_events")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `assessments.create` | mutation | `assessment_drafts`, `assessment_events` | — |
| `assessments.update` | mutation | `assessment_events` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `route/new/page.tsx` | RouteIntakeContent | useMutation | `api.assessments.create` |
| `route/new/page.tsx` | RouteIntakeContent | useMutation | `api.assessments.update` |
