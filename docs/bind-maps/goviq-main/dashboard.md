# dashboard

Auto-derived module: everything under `src/app/dashboard/` plus `src/components/dashboard/`.

**App directory:** `src/app/dashboard/` (1 `.tsx` files) + **components directory:** `src/components/dashboard/` (6 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n1["useQuery api.sp_procurements.list"]
  n1 -->|reads/writes| n2[("sp_procurements")]
  n1 -->|reads/writes| n3[("sp_serviceCategories")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n4["useQuery api.works_packages.list"]
  n4 -->|reads/writes| n5[("works_packages")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n6["useQuery api.framework.list.list"]
  n6 -->|reads/writes| n7[("sp_frameworks")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n8["useQuery api.callOffs.listAll.listAll"]
  n8 -->|reads/writes| n9[("sp_callOffs")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n10["useQuery api.procurements.listPendingOverrides.listPendingOverrides"]
  n10 -->|reads/writes| n2[("sp_procurements")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n11["useQuery api.sp_procurements.goodsStats"]
  n11 -->|reads/writes| n2[("sp_procurements")]
  n0["dashboard/page.tsx :: DashboardPage"] -->|useQuery| n12["useQuery api.sp_procurements.listGoods"]
  n12 -->|reads/writes| n2[("sp_procurements")]
  n13["dashboard/AuditPulse.tsx :: AuditPulse"] -->|useQuery| n14["useQuery api.audit.dashboard.getLatestIntegritySweep"]
  n14 -->|reads/writes| n15[("gov_auditEvents")]
  n16["dashboard/DeadlineTicker.tsx :: DeadlineTicker"] -->|useQuery| n1["useQuery api.sp_procurements.list"]
  n1 -->|reads/writes| n2[("sp_procurements")]
  n1 -->|reads/writes| n3[("sp_serviceCategories")]
  n17["dashboard/SpendPipelineChart.tsx :: SpendPipelineChart"] -->|useQuery| n1["useQuery api.sp_procurements.list"]
  n1 -->|reads/writes| n2[("sp_procurements")]
  n1 -->|reads/writes| n3[("sp_serviceCategories")]
  n17["dashboard/SpendPipelineChart.tsx :: SpendPipelineChart"] -->|useQuery| n4["useQuery api.works_packages.list"]
  n4 -->|reads/writes| n5[("works_packages")]
  n18["dashboard/ThresholdBurnRate.tsx :: ThresholdBurnRate"] -->|useQuery| n1["useQuery api.sp_procurements.list"]
  n1 -->|reads/writes| n2[("sp_procurements")]
  n1 -->|reads/writes| n3[("sp_serviceCategories")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `sp_procurements.list` | query | `sp_procurements`, `sp_serviceCategories` | — |
| `works_packages.list` | query | `works_packages` | — |
| `framework.list.list` | query | `sp_frameworks` | — |
| `callOffs.listAll.listAll` | query | `sp_callOffs` | — |
| `procurements.listPendingOverrides.listPendingOverrides` | query | `sp_procurements` | — |
| `sp_procurements.goodsStats` | query | `sp_procurements` | — |
| `sp_procurements.listGoods` | query | `sp_procurements` | — |
| `audit.dashboard.getLatestIntegritySweep` | query | `gov_auditEvents` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.sp_procurements.list` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.works_packages.list` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.framework.list.list` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.callOffs.listAll.listAll` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.procurements.listPendingOverrides.listPendingOverrides` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.sp_procurements.goodsStats` |
| `dashboard/page.tsx` | DashboardPage | useQuery | `api.sp_procurements.listGoods` |
| `dashboard/AuditPulse.tsx` | AuditPulse | useQuery | `api.audit.dashboard.getLatestIntegritySweep` |
| `dashboard/DeadlineTicker.tsx` | DeadlineTicker | useQuery | `api.sp_procurements.list` |
| `dashboard/SpendPipelineChart.tsx` | SpendPipelineChart | useQuery | `api.sp_procurements.list` |
| `dashboard/SpendPipelineChart.tsx` | SpendPipelineChart | useQuery | `api.works_packages.list` |
| `dashboard/ThresholdBurnRate.tsx` | ThresholdBurnRate | useQuery | `api.sp_procurements.list` |
