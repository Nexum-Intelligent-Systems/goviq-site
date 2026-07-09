# Classification

Auto-classifying uploaded documents by discipline/type, plus the human confirm/reclassify gate.

**Files:** `src/convex/classify.ts`, `src/convex/classifyAction.ts`, `src/convex/classifyData.ts`

## Bind map

```mermaid
flowchart LR
  n0["projects/[id]/page.tsx :: ConfirmRow"] -->|useMutation| n1["useMutation api.classify.confirmDocument"]
  n0["projects/[id]/page.tsx :: ConfirmRow"] -->|useMutation| n2["useMutation api.classify.reclassifyDocument"]
  n2 -->|reads/writes| n3[("audit_log")]
  n2 -->|reads/writes| n4[("classifier_feedback")]
```

## Convex functions

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `classify.confirmDocument` | mutation | — | — |
| `classify.reclassifyDocument` | mutation | `audit_log`, `classifier_feedback` | — |
| `classify.listForConfirmation` | query | `documents` | — |
| `classify.canStartScan` | query | `documents` | — |
| `classifyAction.classifyOneDocument` | internalAction | — | `classifyData.markClassifying`, `classifyData.loadDocument`, `mutations.appendAudit`, `classifyData.saveTextPreview`, `classifyData.saveClassification`, `classifyData.autoConfirmDocument`, `classifyData.checkAndAdvance` |
| `classifyData.loadDocument` | internalQuery | — | — |
| `classifyData.loadProjectDocuments` | internalQuery | `documents` | — |
| `classifyData.loadProject` | internalQuery | — | — |
| `classifyData.markClassifying` | internalMutation | — | — |
| `classifyData.saveTextPreview` | internalMutation | — | — |
| `classifyData.saveClassification` | internalMutation | `documents`, `audit_log` | — |
| `classifyData.autoConfirmDocument` | internalMutation | — | — |
| `classifyData.checkAndAdvance` | internalMutation | — | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `projects/[id]/page.tsx` | ConfirmRow | useMutation | `api.classify.confirmDocument` |
| `projects/[id]/page.tsx` | ConfirmRow | useMutation | `api.classify.reclassifyDocument` |
