# Planning Conditions

Planning-permission condition tracking against findings.

**Files:** `src/convex/planningConditions.ts`

## Bind map

```mermaid
flowchart LR
  n0["(no UI bindings found for this module's functions)"]
```

## Convex functions

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `planningConditions.listPlanningConditions` | query | `planning_conditions` | — |
| `planningConditions.searchPlanningConditions` | query | `planning_conditions` | — |
| `planningConditions.addPlanningCondition` | mutation | `audit_log`, `planning_conditions` | — |
| `planningConditions.updatePlanningCondition` | mutation | `audit_log` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
