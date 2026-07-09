# onboarding

Auto-derived module: everything under `src/app/onboarding/`.

**App directory:** `src/app/onboarding/` (4 `.tsx` files scanned; no matching `src/components/` subdirectory found)

## Bind map

```mermaid
flowchart LR
  n0["onboarding/page.tsx :: OnboardingPage"] -->|useMutation| n1["useMutation api.governance.userProvisioning.ensureUser"]
  n1 -->|reads/writes| n2[("sp_users")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `governance.userProvisioning.ensureUser` | mutation | `sp_users` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `onboarding/page.tsx` | OnboardingPage | useMutation | `api.governance.userProvisioning.ensureUser` |
