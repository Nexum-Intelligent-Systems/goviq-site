# Learning Loop

Feedback/lessons-learnt capture used to tune future classification and review runs.

**Files:** `src/convex/learningData.ts`

## Bind map

```mermaid
flowchart LR
  n0["(no UI bindings found for this module)"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|

## All Convex functions in this module (not just UI-called)

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `learningData.recordQuestionCoverage` | internalMutation | `question_coverage` | — |
| `learningData.recordLearningEvent` | internalMutation | `learning_events` | — |
| `learningData.recordLearningEventStatus` | internalMutation | — | — |
| `learningData.getQuestionCoverage` | query | `question_coverage` | — |
