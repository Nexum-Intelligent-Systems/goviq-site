# esign

Auto-derived module: everything under `src/app/esign/`.

**App directory:** `src/app/esign/` (3 `.tsx` files scanned; no matching `src/components/` subdirectory found)

## Bind map

```mermaid
flowchart LR
  n0["esign/create/page.tsx :: CreateEnvelopePage"] -->|useMutation| n1["useMutation api.esign.envelopes.generateUploadUrl"]
  n0["esign/create/page.tsx :: CreateEnvelopePage"] -->|useMutation| n2["useMutation api.esign.envelopes.createEnvelope"]
  n2 -->|reads/writes| n3[("sign_envelopes")]
  n2 -->|reads/writes| n4[("sign_signatories")]
  n2 -.->|triggers| n5["esign.signatories.triggerNextSignatory"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `esign.envelopes.generateUploadUrl` | mutation | — | — |
| `esign.envelopes.createEnvelope` | mutation | `sign_envelopes`, `sign_signatories` | `esign.signatories.triggerNextSignatory` |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `esign/create/page.tsx` | CreateEnvelopePage | useMutation | `api.esign.envelopes.generateUploadUrl` |
| `esign/create/page.tsx` | CreateEnvelopePage | useMutation | `api.esign.envelopes.createEnvelope` |
