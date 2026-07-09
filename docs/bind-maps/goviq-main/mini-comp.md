# mini-comp

Auto-derived module: everything under `src/app/mini-comp/` plus `src/components/miniComp/`.

**App directory:** `src/app/mini-comp/` (4 `.tsx` files) + **components directory:** `src/components/miniComp/` (2 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n1["useMutation api.callOffs.setMiniCompWinner.setMiniCompWinner"]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n2["useMutation api.contracts.createFromMiniCompCallOff.createFromMiniCompCallOff"]
  n2 -->|reads/writes| n3[("sp_contracts")]
  n2 -->|reads/writes| n4[("sp_contractLots")]
  n2 -->|reads/writes| n5[("sp_contractEvents")]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n6["useMutation api.comms.standstillStart.standstillStart"]
  n6 -.->|triggers| n7["portal.standstillBridge.notifyPortalSuppliersOfStandstill"]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n8["useMutation api.comms.generateStandstillPack.generateStandstillPack"]
  n8 -->|reads/writes| n9[("sp_evaluationCriteria")]
  n8 -->|reads/writes| n10[("sp_evaluationScores")]
  n8 -->|reads/writes| n11[("sp_supplierResponses")]
  n8 -->|reads/writes| n12[("sp_commsArtifacts")]
  n8 -->|reads/writes| n13[("sp_commsEvents")]
  n8 -->|reads/writes| n14[("portal_frameworkInvitations")]
  n8 -.->|triggers| n15["portal.standstillBridge.notifyPortalSupplierOfArtifact"]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n16["useMutation api.comms.sendArtifacts.sendAllArtifacts"]
  n16 -->|reads/writes| n12[("sp_commsArtifacts")]
  n16 -->|reads/writes| n13[("sp_commsEvents")]
  n16 -.->|triggers| n17["email.dispatchOutcomeLetter.dispatchOutcomeLetter"]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n18["useMutation api.comms.sendArtifacts.sendArtifact"]
  n18 -->|reads/writes| n13[("sp_commsEvents")]
  n18 -.->|triggers| n17["email.dispatchOutcomeLetter.dispatchOutcomeLetter"]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n19["useMutation api.comms.finalizeArtifact.finalizeArtifact"]
  n19 -->|reads/writes| n13[("sp_commsEvents")]
  n0["mini-comp/[rftId]/award/page.tsx :: MiniCompAwardPage"] -->|useMutation| n20["useMutation api.callOffs.clearMiniCompStandstill.clearMiniCompStandstill"]
  n20 -->|reads/writes| n5[("sp_contractEvents")]
  n21["mini-comp/[rftId]/response/[responseId]/page.tsx :: MiniCompResponsePage"] -->|useMutation| n22["useMutation api.responses.autoFillEvidence.autoFillEvidence"]
  n22 -->|reads/writes| n23[("sp_evidenceItems")]
  n22 -->|reads/writes| n24[("sp_responseEvidenceLinks")]
  n22 -->|reads/writes| n25[("sp_evidenceFiles")]
  n21["mini-comp/[rftId]/response/[responseId]/page.tsx :: MiniCompResponsePage"] -->|useMutation| n26["useMutation api.responses.submit.submit"]
  n21["mini-comp/[rftId]/response/[responseId]/page.tsx :: MiniCompResponsePage"] -->|useMutation| n27["useMutation api.responses.saveAnswers.saveAnswers"]
  n21["mini-comp/[rftId]/response/[responseId]/page.tsx :: MiniCompResponsePage"] -->|useMutation| n28["useMutation api.responses.setConfirmations.setConfirmations"]
  n29["mini-comp/[rftId]/start/page.tsx :: MiniCompStartPage"] -->|useMutation| n30["useMutation api.responses.startOrResume.startOrResume"]
  n30 -->|reads/writes| n11[("sp_supplierResponses")]
  n31["mini-comp/page.tsx :: TYPE_LABELS"] -->|useQuery| n32["useQuery api.callOffs.listAll.listAll"]
  n32 -->|reads/writes| n33[("sp_callOffs")]
  n34["miniComp/AiDraftPanel.tsx :: AiDraftPanel"] -->|useQuery| n35["useQuery api.responses.getAiDraftForDiff.getAiDraftForDiff"]
  n34["miniComp/AiDraftPanel.tsx :: AiDraftPanel"] -->|useQuery| n36["useQuery api.rft.listQuestions.listQuestions"]
  n36 -->|reads/writes| n37[("sp_rftQuestions")]
  n34["miniComp/AiDraftPanel.tsx :: AiDraftPanel"] -->|useMutation| n38["useMutation api.responses.generateAiDraft.generateAiDraft"]
  n38 -->|reads/writes| n37[("sp_rftQuestions")]
  n38 -->|reads/writes| n24[("sp_responseEvidenceLinks")]
  n38 -->|reads/writes| n39[("sp_responseEvents")]
  n34["miniComp/AiDraftPanel.tsx :: AiDraftPanel"] -->|useMutation| n40["useMutation api.responses.applyAiDraft.applyAiDraft"]
  n40 -->|reads/writes| n39[("sp_responseEvents")]
  n41["miniComp/PricingTab.tsx :: PricingTab"] -->|useQuery| n42["useQuery api.pricing.listTemplate.listTemplate"]
  n42 -->|reads/writes| n43[("sp_rftPricingTemplate")]
  n41["miniComp/PricingTab.tsx :: PricingTab"] -->|useQuery| n44["useQuery api.responses.getById.getById"]
  n41["miniComp/PricingTab.tsx :: PricingTab"] -->|useMutation| n45["useMutation api.responses.savePricing.savePricing"]
  n45 -->|reads/writes| n43[("sp_rftPricingTemplate")]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `callOffs.setMiniCompWinner.setMiniCompWinner` | mutation | — | — |
| `contracts.createFromMiniCompCallOff.createFromMiniCompCallOff` | mutation | `sp_contracts`, `sp_contractLots`, `sp_contractEvents` | — |
| `comms.standstillStart.standstillStart` | mutation | — | `portal.standstillBridge.notifyPortalSuppliersOfStandstill` |
| `comms.generateStandstillPack.generateStandstillPack` | mutation | `sp_evaluationCriteria`, `sp_evaluationScores`, `sp_supplierResponses`, `sp_commsArtifacts`, `sp_commsEvents`, `portal_frameworkInvitations` | `portal.standstillBridge.notifyPortalSupplierOfArtifact` |
| `comms.sendArtifacts.sendAllArtifacts` | mutation | `sp_commsArtifacts`, `sp_commsEvents` | `email.dispatchOutcomeLetter.dispatchOutcomeLetter` |
| `comms.sendArtifacts.sendArtifact` | mutation | `sp_commsEvents` | `email.dispatchOutcomeLetter.dispatchOutcomeLetter` |
| `comms.finalizeArtifact.finalizeArtifact` | mutation | `sp_commsEvents` | — |
| `callOffs.clearMiniCompStandstill.clearMiniCompStandstill` | mutation | `sp_contractEvents` | — |
| `responses.autoFillEvidence.autoFillEvidence` | mutation | `sp_evidenceItems`, `sp_responseEvidenceLinks`, `sp_evidenceFiles` | — |
| `responses.submit.submit` | mutation | — | — |
| `responses.saveAnswers.saveAnswers` | mutation | — | — |
| `responses.setConfirmations.setConfirmations` | mutation | — | — |
| `responses.startOrResume.startOrResume` | mutation | `sp_supplierResponses` | — |
| `callOffs.listAll.listAll` | query | `sp_callOffs` | — |
| `responses.getAiDraftForDiff.getAiDraftForDiff` | query | — | — |
| `rft.listQuestions.listQuestions` | query | `sp_rftQuestions` | — |
| `responses.generateAiDraft.generateAiDraft` | mutation | `sp_rftQuestions`, `sp_responseEvidenceLinks`, `sp_responseEvents` | — |
| `responses.applyAiDraft.applyAiDraft` | mutation | `sp_responseEvents` | — |
| `pricing.listTemplate.listTemplate` | query | `sp_rftPricingTemplate` | — |
| `responses.getById.getById` | query | — | — |
| `responses.savePricing.savePricing` | mutation | `sp_rftPricingTemplate` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.callOffs.setMiniCompWinner.setMiniCompWinner` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.contracts.createFromMiniCompCallOff.createFromMiniCompCallOff` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.comms.standstillStart.standstillStart` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.comms.generateStandstillPack.generateStandstillPack` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.comms.sendArtifacts.sendAllArtifacts` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.comms.sendArtifacts.sendArtifact` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.comms.finalizeArtifact.finalizeArtifact` |
| `mini-comp/[rftId]/award/page.tsx` | MiniCompAwardPage | useMutation | `api.callOffs.clearMiniCompStandstill.clearMiniCompStandstill` |
| `mini-comp/[rftId]/response/[responseId]/page.tsx` | MiniCompResponsePage | useMutation | `api.responses.autoFillEvidence.autoFillEvidence` |
| `mini-comp/[rftId]/response/[responseId]/page.tsx` | MiniCompResponsePage | useMutation | `api.responses.submit.submit` |
| `mini-comp/[rftId]/response/[responseId]/page.tsx` | MiniCompResponsePage | useMutation | `api.responses.saveAnswers.saveAnswers` |
| `mini-comp/[rftId]/response/[responseId]/page.tsx` | MiniCompResponsePage | useMutation | `api.responses.setConfirmations.setConfirmations` |
| `mini-comp/[rftId]/start/page.tsx` | MiniCompStartPage | useMutation | `api.responses.startOrResume.startOrResume` |
| `mini-comp/page.tsx` | TYPE_LABELS | useQuery | `api.callOffs.listAll.listAll` |
| `miniComp/AiDraftPanel.tsx` | AiDraftPanel | useQuery | `api.responses.getAiDraftForDiff.getAiDraftForDiff` |
| `miniComp/AiDraftPanel.tsx` | AiDraftPanel | useQuery | `api.rft.listQuestions.listQuestions` |
| `miniComp/AiDraftPanel.tsx` | AiDraftPanel | useMutation | `api.responses.generateAiDraft.generateAiDraft` |
| `miniComp/AiDraftPanel.tsx` | AiDraftPanel | useMutation | `api.responses.applyAiDraft.applyAiDraft` |
| `miniComp/PricingTab.tsx` | PricingTab | useQuery | `api.pricing.listTemplate.listTemplate` |
| `miniComp/PricingTab.tsx` | PricingTab | useQuery | `api.responses.getById.getById` |
| `miniComp/PricingTab.tsx` | PricingTab | useMutation | `api.responses.savePricing.savePricing` |
