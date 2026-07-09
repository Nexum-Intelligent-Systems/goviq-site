# intelligence

Auto-derived module: everything under `src/app/intelligence/` plus `src/components/intelligence/`.

**App directory:** `src/app/intelligence/` (13 `.tsx` files) + **components directory:** `src/components/intelligence/` (2 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["intelligence/anomalies/page.tsx :: AnomalyDetectionPage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n3["intelligence/benchmarking/page.tsx :: BenchmarkingPage"] -->|useQuery| n4["useQuery api.analytics.engine.getBenchmarks"]
  n4 -->|reads/writes| n5[("analytics_benchmarks")]
  n3["intelligence/benchmarking/page.tsx :: BenchmarkingPage"] -->|useQuery| n6["useQuery api.analytics.engine.getRoutePerformance"]
  n6 -->|reads/writes| n7[("analytics_routePerformance")]
  n8["intelligence/competition/page.tsx :: CompetitionPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n12["intelligence/compliance/page.tsx :: ComplianceScorecardPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n12["intelligence/compliance/page.tsx :: ComplianceScorecardPage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n13["intelligence/frameworks/page.tsx :: FrameworkEffectivenessPage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n13["intelligence/frameworks/page.tsx :: FrameworkEffectivenessPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n14["intelligence/lifecycle/page.tsx :: LifecyclePage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n14["intelligence/lifecycle/page.tsx :: LifecyclePage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n15["intelligence/predictions/page.tsx :: PredictionsPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n16["intelligence/regional/page.tsx :: RegionalInsightsPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n16["intelligence/regional/page.tsx :: RegionalInsightsPage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n16["intelligence/regional/page.tsx :: RegionalInsightsPage"] -->|useQuery| n17["useQuery api.governance.organisations.listRegions"]
  n17 -->|reads/writes| n18[("gov_regions")]
  n19["intelligence/reports/page.tsx :: IntelligenceReportsPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n19["intelligence/reports/page.tsx :: IntelligenceReportsPage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n20["intelligence/routes/page.tsx :: RoutePerformancePage"] -->|useQuery| n1["useQuery api.sp_routerDecisions.listAll"]
  n1 -->|reads/writes| n2[("sp_routerDecisions")]
  n20["intelligence/routes/page.tsx :: RoutePerformancePage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n21["intelligence/suppliers/page.tsx :: SuppliersPage"] -->|useQuery| n22["useQuery api.analytics.engine.getSupplierScores"]
  n22 -->|reads/writes| n23[("analytics_supplierScores")]
  n21["intelligence/suppliers/page.tsx :: SuppliersPage"] -->|useQuery| n9["useQuery api.sp_procurements.list"]
  n9 -->|reads/writes| n10[("sp_procurements")]
  n9 -->|reads/writes| n11[("sp_serviceCategories")]
  n24["intelligence/PulseDashboard.tsx :: PulseDashboard"] -->|useQuery| n25["useQuery api.analytics.pulse.getPulseData"]
  n25 -->|reads/writes| n10[("sp_procurements")]
  n25 -->|reads/writes| n2[("sp_routerDecisions")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `sp_routerDecisions.listAll` | query | `sp_routerDecisions` | — |
| `analytics.engine.getBenchmarks` | query | `analytics_benchmarks` | — |
| `analytics.engine.getRoutePerformance` | query | `analytics_routePerformance` | — |
| `sp_procurements.list` | query | `sp_procurements`, `sp_serviceCategories` | — |
| `governance.organisations.listRegions` | query | `gov_regions` | — |
| `analytics.engine.getSupplierScores` | query | `analytics_supplierScores` | — |
| `analytics.pulse.getPulseData` | query | `sp_procurements`, `sp_routerDecisions` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `intelligence/anomalies/page.tsx` | AnomalyDetectionPage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/benchmarking/page.tsx` | BenchmarkingPage | useQuery | `api.analytics.engine.getBenchmarks` |
| `intelligence/benchmarking/page.tsx` | BenchmarkingPage | useQuery | `api.analytics.engine.getRoutePerformance` |
| `intelligence/competition/page.tsx` | CompetitionPage | useQuery | `api.sp_procurements.list` |
| `intelligence/compliance/page.tsx` | ComplianceScorecardPage | useQuery | `api.sp_procurements.list` |
| `intelligence/compliance/page.tsx` | ComplianceScorecardPage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/frameworks/page.tsx` | FrameworkEffectivenessPage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/frameworks/page.tsx` | FrameworkEffectivenessPage | useQuery | `api.sp_procurements.list` |
| `intelligence/lifecycle/page.tsx` | LifecyclePage | useQuery | `api.sp_procurements.list` |
| `intelligence/lifecycle/page.tsx` | LifecyclePage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/predictions/page.tsx` | PredictionsPage | useQuery | `api.sp_procurements.list` |
| `intelligence/regional/page.tsx` | RegionalInsightsPage | useQuery | `api.sp_procurements.list` |
| `intelligence/regional/page.tsx` | RegionalInsightsPage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/regional/page.tsx` | RegionalInsightsPage | useQuery | `api.governance.organisations.listRegions` |
| `intelligence/reports/page.tsx` | IntelligenceReportsPage | useQuery | `api.sp_procurements.list` |
| `intelligence/reports/page.tsx` | IntelligenceReportsPage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/routes/page.tsx` | RoutePerformancePage | useQuery | `api.sp_routerDecisions.listAll` |
| `intelligence/routes/page.tsx` | RoutePerformancePage | useQuery | `api.sp_procurements.list` |
| `intelligence/suppliers/page.tsx` | SuppliersPage | useQuery | `api.analytics.engine.getSupplierScores` |
| `intelligence/suppliers/page.tsx` | SuppliersPage | useQuery | `api.sp_procurements.list` |
| `intelligence/PulseDashboard.tsx` | PulseDashboard | useQuery | `api.analytics.pulse.getPulseData` |
