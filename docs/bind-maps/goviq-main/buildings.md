# buildings

Auto-derived module: everything under `src/app/buildings/` plus `src/components/buildings/`.

**App directory:** `src/app/buildings/` (12 `.tsx` files) + **components directory:** `src/components/buildings/` (23 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["buildings/[id]/page.tsx :: BuildingProfilePage"] -->|useQuery| n1["useQuery api.building_admin.getBuilding"]
  n1 -->|reads/writes| n2[("building_compliance")]
  n1 -->|reads/writes| n3[("building_documents")]
  n1 -->|reads/writes| n4[("building_systems")]
  n1 -->|reads/writes| n5[("building_risk_snapshots")]
  n0["buildings/[id]/page.tsx :: BuildingProfilePage"] -->|useMutation| n6["useMutation api.building_admin.updateBuilding"]
  n6 -.->|triggers| n7["buildings.riskRecompute.recompute"]
  n0["buildings/[id]/page.tsx :: BuildingProfilePage"] -->|useMutation| n8["useMutation api.building_systems.addSystem"]
  n8 -->|reads/writes| n4[("building_systems")]
  n0["buildings/[id]/page.tsx :: BuildingProfilePage"] -->|useMutation| n9["useMutation api.building_systems.deleteSystem"]
  n10["buildings/duplicates/page.tsx :: BuildingDuplicatesPage"] -->|useQuery| n11["useQuery api.building_admin.findBuildingDuplicateClusters"]
  n11 -->|reads/writes| n12[("buildings")]
  n10["buildings/duplicates/page.tsx :: BuildingDuplicatesPage"] -->|useQuery| n13["useQuery api.building_admin.buildingRegistryFilterOptions"]
  n13 -->|reads/writes| n14[("campuses")]
  n13 -->|reads/writes| n15[("gov_regions")]
  n10["buildings/duplicates/page.tsx :: BuildingDuplicatesPage"] -->|useMutation| n16["useMutation api.building_admin.batchDeactivateBuildings"]
  n17["buildings/import/page.tsx :: BuildingImportPage"] -->|useMutation| n18["useMutation api.building_admin.bulkCreateBuildings"]
  n18 -->|reads/writes| n12[("buildings")]
  n18 -->|reads/writes| n19[("worksHistory")]
  n18 -->|reads/writes| n20[("drawingRegisterLinks")]
  n21["buildings/intelligence/page.tsx :: BuildingIntelligencePage"] -->|useMutation| n22["useMutation api.buildings.analytics.snapshotEstateKpis"]
  n22 -->|reads/writes| n12[("buildings")]
  n22 -->|reads/writes| n5[("building_risk_snapshots")]
  n22 -->|reads/writes| n2[("building_compliance")]
  n22 -->|reads/writes| n23[("building_estate_kpi_snapshots")]
  n24["buildings/BuildingDigitalPassport.tsx :: BuildingDigitalPassport"] -->|useMutation| n25["useMutation api.buildings.lifecycle.recordCondition"]
  n25 -->|reads/writes| n26[("building_condition_history")]
  n25 -->|reads/writes| n27[("building_lifecycle_events")]
  n28["buildings/BuildingList.tsx :: BuildingList"] -->|useQuery| n29["useQuery api.buildings.list.list"]
  n29 -->|reads/writes| n12[("buildings")]
  n30["buildings/BuildingRiskPanel.tsx :: BuildingRiskPanel"] -->|useQuery| n31["useQuery api.buildings.get.get"]
  n31 -->|reads/writes| n4[("building_systems")]
  n31 -->|reads/writes| n3[("building_documents")]
  n31 -->|reads/writes| n5[("building_risk_snapshots")]
  n30["buildings/BuildingRiskPanel.tsx :: BuildingRiskPanel"] -->|useMutation| n32["useMutation api.buildings.computeRisk.computeAndStore"]
  n32 -->|reads/writes| n5[("building_risk_snapshots")]
  n33["buildings/BuildingTimeline.tsx :: BuildingTimeline"] -->|useQuery| n34["useQuery api.buildings.lifecycle.listEvents"]
  n34 -->|reads/writes| n27[("building_lifecycle_events")]
  n35["buildings/BuildingTimeline.tsx :: EstateActivityFeed"] -->|useQuery| n36["useQuery api.buildings.lifecycle.listRecentAcrossEstate"]
  n36 -->|reads/writes| n27[("building_lifecycle_events")]
  n37["buildings/CampusSelect.tsx :: CampusSelect"] -->|useQuery| n38["useQuery api.campuses.list.list"]
  n38 -->|reads/writes| n14[("campuses")]
  n39["buildings/ConditionTrendChart.tsx :: ConditionTrendChart"] -->|useQuery| n40["useQuery api.buildings.lifecycle.getConditionHistory"]
  n40 -->|reads/writes| n26[("building_condition_history")]
  n41["buildings/PortfolioHealthOverview.tsx :: PortfolioHealthOverview"] -->|useQuery| n42["useQuery api.buildings.analytics.getPortfolioStats"]
  n42 -->|reads/writes| n12[("buildings")]
  n42 -->|reads/writes| n5[("building_risk_snapshots")]
  n42 -->|reads/writes| n2[("building_compliance")]
  n43["buildings/wizard/BuildingFormWizard.tsx :: BuildingFormWizard"] -->|useMutation| n44["useMutation api.building_admin.createBuilding"]
  n44 -->|reads/writes| n12[("buildings")]
  n43["buildings/wizard/BuildingFormWizard.tsx :: BuildingFormWizard"] -->|useMutation| n6["useMutation api.building_admin.updateBuilding"]
  n6 -.->|triggers| n7["buildings.riskRecompute.recompute"]
  n43["buildings/wizard/BuildingFormWizard.tsx :: BuildingFormWizard"] -->|useQuery| n45["useQuery api.campus_admin.listCampuses"]
  n45 -->|reads/writes| n14[("campuses")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `building_admin.getBuilding` | query | `building_compliance`, `building_documents`, `building_systems`, `building_risk_snapshots` | — |
| `building_admin.updateBuilding` | mutation | — | `buildings.riskRecompute.recompute` |
| `building_systems.addSystem` | mutation | `building_systems` | — |
| `building_systems.deleteSystem` | mutation | — | — |
| `building_admin.findBuildingDuplicateClusters` | query | `buildings` | — |
| `building_admin.buildingRegistryFilterOptions` | query | `campuses`, `gov_regions` | — |
| `building_admin.batchDeactivateBuildings` | mutation | — | — |
| `building_admin.bulkCreateBuildings` | mutation | `buildings`, `worksHistory`, `drawingRegisterLinks` | — |
| `buildings.analytics.snapshotEstateKpis` | mutation | `buildings`, `building_risk_snapshots`, `building_compliance`, `building_estate_kpi_snapshots` | — |
| `buildings.lifecycle.recordCondition` | mutation | `building_condition_history`, `building_lifecycle_events` | — |
| `buildings.list.list` | query | `buildings` | — |
| `buildings.get.get` | query | `building_systems`, `building_documents`, `building_risk_snapshots` | — |
| `buildings.computeRisk.computeAndStore` | mutation | `building_risk_snapshots` | — |
| `buildings.lifecycle.listEvents` | query | `building_lifecycle_events` | — |
| `buildings.lifecycle.listRecentAcrossEstate` | query | `building_lifecycle_events` | — |
| `campuses.list.list` | query | `campuses` | — |
| `buildings.lifecycle.getConditionHistory` | query | `building_condition_history` | — |
| `buildings.analytics.getPortfolioStats` | query | `buildings`, `building_risk_snapshots`, `building_compliance` | — |
| `building_admin.createBuilding` | mutation | `buildings` | — |
| `campus_admin.listCampuses` | query | `campuses` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `buildings/[id]/page.tsx` | BuildingProfilePage | useQuery | `api.building_admin.getBuilding` |
| `buildings/[id]/page.tsx` | BuildingProfilePage | useMutation | `api.building_admin.updateBuilding` |
| `buildings/[id]/page.tsx` | BuildingProfilePage | useMutation | `api.building_systems.addSystem` |
| `buildings/[id]/page.tsx` | BuildingProfilePage | useMutation | `api.building_systems.deleteSystem` |
| `buildings/duplicates/page.tsx` | BuildingDuplicatesPage | useQuery | `api.building_admin.findBuildingDuplicateClusters` |
| `buildings/duplicates/page.tsx` | BuildingDuplicatesPage | useQuery | `api.building_admin.buildingRegistryFilterOptions` |
| `buildings/duplicates/page.tsx` | BuildingDuplicatesPage | useMutation | `api.building_admin.batchDeactivateBuildings` |
| `buildings/import/page.tsx` | BuildingImportPage | useMutation | `api.building_admin.bulkCreateBuildings` |
| `buildings/intelligence/page.tsx` | BuildingIntelligencePage | useMutation | `api.buildings.analytics.snapshotEstateKpis` |
| `buildings/BuildingDigitalPassport.tsx` | BuildingDigitalPassport | useMutation | `api.buildings.lifecycle.recordCondition` |
| `buildings/BuildingList.tsx` | BuildingList | useQuery | `api.buildings.list.list` |
| `buildings/BuildingRiskPanel.tsx` | BuildingRiskPanel | useQuery | `api.buildings.get.get` |
| `buildings/BuildingRiskPanel.tsx` | BuildingRiskPanel | useMutation | `api.buildings.computeRisk.computeAndStore` |
| `buildings/BuildingTimeline.tsx` | BuildingTimeline | useQuery | `api.buildings.lifecycle.listEvents` |
| `buildings/BuildingTimeline.tsx` | EstateActivityFeed | useQuery | `api.buildings.lifecycle.listRecentAcrossEstate` |
| `buildings/CampusSelect.tsx` | CampusSelect | useQuery | `api.campuses.list.list` |
| `buildings/ConditionTrendChart.tsx` | ConditionTrendChart | useQuery | `api.buildings.lifecycle.getConditionHistory` |
| `buildings/PortfolioHealthOverview.tsx` | PortfolioHealthOverview | useQuery | `api.buildings.analytics.getPortfolioStats` |
| `buildings/wizard/BuildingFormWizard.tsx` | BuildingFormWizard | useMutation | `api.building_admin.createBuilding` |
| `buildings/wizard/BuildingFormWizard.tsx` | BuildingFormWizard | useMutation | `api.building_admin.updateBuilding` |
| `buildings/wizard/BuildingFormWizard.tsx` | BuildingFormWizard | useQuery | `api.campus_admin.listCampuses` |
