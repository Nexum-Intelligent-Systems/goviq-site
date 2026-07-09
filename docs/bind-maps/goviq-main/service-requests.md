# service-requests

Auto-derived module: everything under `src/app/service-requests/`.

**App directory:** `src/app/service-requests/` (2 `.tsx` files scanned; no matching `src/components/` subdirectory found)

## Bind map

```mermaid
flowchart LR
  n0["service-requests/new/page.tsx :: NewServiceRequestPage"] -->|useQuery| n1["useQuery api.serviceRequests.getPrimaryOrg"]
  n1 -->|reads/writes| n2[("sp_organisations")]
  n0["service-requests/new/page.tsx :: NewServiceRequestPage"] -->|useMutation| n3["useMutation api.serviceRequests.createServiceRequest"]
  n3 -->|reads/writes| n4[("sp_serviceRequests")]
  n5["service-requests/page.tsx :: service-requests/page.tsx"] -->|useQuery| n1["useQuery api.serviceRequests.getPrimaryOrg"]
  n1 -->|reads/writes| n2[("sp_organisations")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `serviceRequests.getPrimaryOrg` | query | `sp_organisations` | — |
| `serviceRequests.createServiceRequest` | mutation | `sp_serviceRequests` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `service-requests/new/page.tsx` | NewServiceRequestPage | useQuery | `api.serviceRequests.getPrimaryOrg` |
| `service-requests/new/page.tsx` | NewServiceRequestPage | useMutation | `api.serviceRequests.createServiceRequest` |
| `service-requests/page.tsx` | service-requests/page.tsx | useQuery | `api.serviceRequests.getPrimaryOrg` |
