# docs

Auto-derived module: everything under `src/app/docs/` plus `src/components/docs/`.

**App directory:** `src/app/docs/` (9 `.tsx` files) + **components directory:** `src/components/docs/` (11 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["docs/FtsScheduleParticularsPanel.tsx :: FtsScheduleParticularsPanel"] -->|useQuery| n1["useQuery api.packs.tenderScheduleParticulars.getTenderScheduleParticulars"]
  n1 -->|reads/writes| n2[("sp_tenderScheduleParticulars")]
  n0["docs/FtsScheduleParticularsPanel.tsx :: FtsScheduleParticularsPanel"] -->|useQuery| n3["useQuery api.packs.tenderScheduleParticulars.validateTenderScheduleParticulars"]
  n3 -->|reads/writes| n2[("sp_tenderScheduleParticulars")]
  n0["docs/FtsScheduleParticularsPanel.tsx :: FtsScheduleParticularsPanel"] -->|useMutation| n4["useMutation api.packs.tenderScheduleParticulars.saveTenderScheduleParticulars"]
  n4 -->|reads/writes| n2[("sp_tenderScheduleParticulars")]
  n0["docs/FtsScheduleParticularsPanel.tsx :: FtsScheduleParticularsPanel"] -->|useMutation| n5["useMutation api.packs.tenderScheduleParticulars.finaliseTenderScheduleParticulars"]
  n5 -->|reads/writes| n2[("sp_tenderScheduleParticulars")]
  n6["docs/GenerateDocsPanel.tsx :: GenerateDocsPanel"] -->|useQuery| n7["useQuery api.docTemplates.listTemplates.listTemplates"]
  n7 -->|reads/writes| n8[("core_docTemplates")]
  n6["docs/GenerateDocsPanel.tsx :: GenerateDocsPanel"] -->|useMutation| n9["useMutation api.docJobs.enqueue.enqueue"]
  n9 -->|reads/writes| n10[("core_docGenerationJobs")]
  n6["docs/GenerateDocsPanel.tsx :: GenerateDocsPanel"] -->|useAction| n11["useAction api.docRender.runBatch.runBatch"]
  n11 -.->|triggers| n12["docRender.runOnce.runOnce"]
  n13["docs/GenerateDocsPanel.tsx :: JobRow"] -->|useQuery| n14["useQuery api.docJobs.getStatus.getStatus"]
  n14 -->|reads/writes| n10[("core_docGenerationJobs")]
  n15["docs/GoodsTenderPackPanel.tsx :: GoodsTenderPackPanel"] -->|useQuery| n7["useQuery api.docTemplates.listTemplates.listTemplates"]
  n7 -->|reads/writes| n8[("core_docTemplates")]
  n15["docs/GoodsTenderPackPanel.tsx :: GoodsTenderPackPanel"] -->|useMutation| n9["useMutation api.docJobs.enqueue.enqueue"]
  n9 -->|reads/writes| n10[("core_docGenerationJobs")]
  n15["docs/GoodsTenderPackPanel.tsx :: GoodsTenderPackPanel"] -->|useAction| n11["useAction api.docRender.runBatch.runBatch"]
  n11 -.->|triggers| n12["docRender.runOnce.runOnce"]
  n15["docs/GoodsTenderPackPanel.tsx :: GoodsTenderPackPanel"] -->|useAction| n16["useAction api.docRender.buildBatchZip.buildBatchZip"]
  n16 -.->|triggers| n17["docJobs.getBatchStatus.getBatchStatus"]
  n16 -.->|triggers| n18["docArtifacts.saveBatchZip.saveBatchZip"]
  n19["docs/IttBuilderPanel.tsx :: IttBuilderPanel"] -->|useQuery| n20["useQuery api.packs.getIttReadiness.getIttReadiness"]
  n19["docs/IttBuilderPanel.tsx :: IttBuilderPanel"] -->|useMutation| n21["useMutation api.packs.saveIttBuilderFields.saveIttBuilderFields"]
  n21 -->|reads/writes| n22[("sp_ittBuilderFields")]
  n23["docs/ProjectDocumentsChecklist.tsx :: AddCustomForm"] -->|useMutation| n24["useMutation api.docCompliance.mutations.addCustomComplianceItem"]
  n24 -->|reads/writes| n25[("tp_docComplianceItems")]
  n26["docs/ProjectDocumentsChecklist.tsx :: CategorySection"] -->|useMutation| n27["useMutation api.docCompliance.mutations.toggleComplianceItem"]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useAction| n29["useAction api.packs.regenerateOutputs.regenerateOutputs"]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useAction| n30["useAction api.packs.compilePack.compilePack"]
  n30 -.->|triggers| n31["packs.getRegenContext.getRegenContext"]
  n30 -.->|triggers| n32["packs.resolveScopeContent.resolveScopeContent"]
  n30 -.->|triggers| n33["packs.resolvePricingContent.resolvePricingContent"]
  n30 -.->|triggers| n34["packs.seedEvalCriteria.seedEvalCriteria"]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useAction| n35["useAction api.ai.generateScopeDocument.generateScopeDocument"]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useQuery| n36["useQuery api.packs.getLatestArtifacts.getLatestArtifacts"]
  n36 -->|reads/writes| n37[("sp_rftInstances")]
  n36 -->|reads/writes| n38[("sp_packArtifacts")]
  n36 -->|reads/writes| n39[("sp_routerDecisions")]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useQuery| n40["useQuery api.sp_procurements.get"]
  n28["docs/ServicesTenderPackPanel.tsx :: ServicesTenderPackPanel"] -->|useQuery| n41["useQuery api.etenders.eTendersWorkflow.getETendersStatus"]
  n41 -->|reads/writes| n37[("sp_rftInstances")]
  n42["docs/WorksTenderPackPanel.tsx :: WorksTenderPackPanel"] -->|useQuery| n7["useQuery api.docTemplates.listTemplates.listTemplates"]
  n7 -->|reads/writes| n8[("core_docTemplates")]
  n42["docs/WorksTenderPackPanel.tsx :: WorksTenderPackPanel"] -->|useMutation| n9["useMutation api.docJobs.enqueue.enqueue"]
  n9 -->|reads/writes| n10[("core_docGenerationJobs")]
  n42["docs/WorksTenderPackPanel.tsx :: WorksTenderPackPanel"] -->|useAction| n11["useAction api.docRender.runBatch.runBatch"]
  n11 -.->|triggers| n12["docRender.runOnce.runOnce"]
  n42["docs/WorksTenderPackPanel.tsx :: WorksTenderPackPanel"] -->|useAction| n16["useAction api.docRender.buildBatchZip.buildBatchZip"]
  n16 -.->|triggers| n17["docJobs.getBatchStatus.getBatchStatus"]
  n16 -.->|triggers| n18["docArtifacts.saveBatchZip.saveBatchZip"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `packs.tenderScheduleParticulars.getTenderScheduleParticulars` | query | `sp_tenderScheduleParticulars` | — |
| `packs.tenderScheduleParticulars.validateTenderScheduleParticulars` | query | `sp_tenderScheduleParticulars` | — |
| `packs.tenderScheduleParticulars.saveTenderScheduleParticulars` | mutation | `sp_tenderScheduleParticulars` | — |
| `packs.tenderScheduleParticulars.finaliseTenderScheduleParticulars` | mutation | `sp_tenderScheduleParticulars` | — |
| `docTemplates.listTemplates.listTemplates` | query | `core_docTemplates` | — |
| `docJobs.enqueue.enqueue` | mutation | `core_docGenerationJobs` | — |
| `docRender.runBatch.runBatch` | action | — | `docRender.runOnce.runOnce` |
| `docJobs.getStatus.getStatus` | query | `core_docGenerationJobs` | — |
| `docRender.buildBatchZip.buildBatchZip` | action | — | `docJobs.getBatchStatus.getBatchStatus`, `docArtifacts.saveBatchZip.saveBatchZip` |
| `packs.getIttReadiness.getIttReadiness` | query | — | — |
| `packs.saveIttBuilderFields.saveIttBuilderFields` | mutation | `sp_ittBuilderFields` | — |
| `docCompliance.mutations.addCustomComplianceItem` | mutation | `tp_docComplianceItems` | — |
| `docCompliance.mutations.toggleComplianceItem` | mutation | — | — |
| `packs.regenerateOutputs.regenerateOutputs` | action | — | — |
| `packs.compilePack.compilePack` | action | — | `packs.getRegenContext.getRegenContext`, `packs.resolveScopeContent.resolveScopeContent`, `packs.resolvePricingContent.resolvePricingContent`, `packs.seedEvalCriteria.seedEvalCriteria` |
| `ai.generateScopeDocument.generateScopeDocument` | action | — | — |
| `packs.getLatestArtifacts.getLatestArtifacts` | query | `sp_rftInstances`, `sp_packArtifacts`, `sp_routerDecisions` | — |
| `sp_procurements.get` | query | — | — |
| `etenders.eTendersWorkflow.getETendersStatus` | query | `sp_rftInstances` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `docs/FtsScheduleParticularsPanel.tsx` | FtsScheduleParticularsPanel | useQuery | `api.packs.tenderScheduleParticulars.getTenderScheduleParticulars` |
| `docs/FtsScheduleParticularsPanel.tsx` | FtsScheduleParticularsPanel | useQuery | `api.packs.tenderScheduleParticulars.validateTenderScheduleParticulars` |
| `docs/FtsScheduleParticularsPanel.tsx` | FtsScheduleParticularsPanel | useMutation | `api.packs.tenderScheduleParticulars.saveTenderScheduleParticulars` |
| `docs/FtsScheduleParticularsPanel.tsx` | FtsScheduleParticularsPanel | useMutation | `api.packs.tenderScheduleParticulars.finaliseTenderScheduleParticulars` |
| `docs/GenerateDocsPanel.tsx` | GenerateDocsPanel | useQuery | `api.docTemplates.listTemplates.listTemplates` |
| `docs/GenerateDocsPanel.tsx` | GenerateDocsPanel | useMutation | `api.docJobs.enqueue.enqueue` |
| `docs/GenerateDocsPanel.tsx` | GenerateDocsPanel | useAction | `api.docRender.runBatch.runBatch` |
| `docs/GenerateDocsPanel.tsx` | JobRow | useQuery | `api.docJobs.getStatus.getStatus` |
| `docs/GoodsTenderPackPanel.tsx` | GoodsTenderPackPanel | useQuery | `api.docTemplates.listTemplates.listTemplates` |
| `docs/GoodsTenderPackPanel.tsx` | GoodsTenderPackPanel | useMutation | `api.docJobs.enqueue.enqueue` |
| `docs/GoodsTenderPackPanel.tsx` | GoodsTenderPackPanel | useAction | `api.docRender.runBatch.runBatch` |
| `docs/GoodsTenderPackPanel.tsx` | GoodsTenderPackPanel | useAction | `api.docRender.buildBatchZip.buildBatchZip` |
| `docs/IttBuilderPanel.tsx` | IttBuilderPanel | useQuery | `api.packs.getIttReadiness.getIttReadiness` |
| `docs/IttBuilderPanel.tsx` | IttBuilderPanel | useMutation | `api.packs.saveIttBuilderFields.saveIttBuilderFields` |
| `docs/ProjectDocumentsChecklist.tsx` | AddCustomForm | useMutation | `api.docCompliance.mutations.addCustomComplianceItem` |
| `docs/ProjectDocumentsChecklist.tsx` | CategorySection | useMutation | `api.docCompliance.mutations.toggleComplianceItem` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useAction | `api.packs.regenerateOutputs.regenerateOutputs` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useAction | `api.packs.compilePack.compilePack` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useAction | `api.ai.generateScopeDocument.generateScopeDocument` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useQuery | `api.packs.getLatestArtifacts.getLatestArtifacts` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useQuery | `api.sp_procurements.get` |
| `docs/ServicesTenderPackPanel.tsx` | ServicesTenderPackPanel | useQuery | `api.etenders.eTendersWorkflow.getETendersStatus` |
| `docs/WorksTenderPackPanel.tsx` | WorksTenderPackPanel | useQuery | `api.docTemplates.listTemplates.listTemplates` |
| `docs/WorksTenderPackPanel.tsx` | WorksTenderPackPanel | useMutation | `api.docJobs.enqueue.enqueue` |
| `docs/WorksTenderPackPanel.tsx` | WorksTenderPackPanel | useAction | `api.docRender.runBatch.runBatch` |
| `docs/WorksTenderPackPanel.tsx` | WorksTenderPackPanel | useAction | `api.docRender.buildBatchZip.buildBatchZip` |
