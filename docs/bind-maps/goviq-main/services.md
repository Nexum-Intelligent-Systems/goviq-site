# services

Auto-derived module: everything under `src/app/services/` plus `src/components/services/`.

**App directory:** `src/app/services/` (53 `.tsx` files) + **components directory:** `src/components/services/` (13 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useQuery| n4["useQuery api.sp_evaluation.getPlan"]
  n4 -->|reads/writes| n5[("sp_evaluationPlans")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useQuery| n6["useQuery api.packs.getLatestArtifacts.getLatestArtifacts"]
  n6 -->|reads/writes| n3[("sp_rftInstances")]
  n6 -->|reads/writes| n7[("sp_packArtifacts")]
  n6 -->|reads/writes| n8[("sp_routerDecisions")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useMutation| n9["useMutation api.award_contract.awardIntent.awardIntent"]
  n9 -->|reads/writes| n8[("sp_routerDecisions")]
  n9 -->|reads/writes| n10[("sp_awards")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useMutation| n11["useMutation api.award_contract.standstillStart.standstillStart"]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useMutation| n12["useMutation api.award_contract.awardConfirm.awardConfirm"]
  n12 -->|reads/writes| n13[("sp_contracts")]
  n12 -->|reads/writes| n14[("sp_contractLots")]
  n12 -->|reads/writes| n15[("sp_contractEvents")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useMutation| n16["useMutation api.award_contract.debriefGenerate.debriefGenerate"]
  n16 -->|reads/writes| n17[("sp_evaluationAggregates")]
  n16 -->|reads/writes| n18[("sp_debriefs")]
  n16 -->|reads/writes| n19[("sp_supplierProfiles")]
  n16 -->|reads/writes| n20[("sp_evaluationScores")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useMutation| n21["useMutation api.rftLifecycle.advanceStatus.forceEvaluation"]
  n21 -->|reads/writes| n22[("sp_auditEvents")]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useAction| n23["useAction api.packs.generateEvaluationDocx.generateEvaluationDocx"]
  n23 -.->|triggers| n24["packs.getRegenContext.getRegenContext"]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useAction| n25["useAction api.packs.generateAgreementForms.generateAgreementFormDocx"]
  n25 -.->|triggers| n24["packs.getRegenContext.getRegenContext"]
  n0["services/[id]/award/page.tsx :: AwardPage"] -->|useAction| n26["useAction api.packs.generateMf2Docx.generateMf2Docx"]
  n26 -.->|triggers| n24["packs.getRegenContext.getRegenContext"]
  n27["services/[id]/components/EvaluationFormsPanel.tsx :: EvaluationFormsPanel"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n28["services/[id]/components/evaluation-forms/AwardDefaultsSection.tsx :: AwardDefaultsSection"] -->|useMutation| n29["useMutation api.sp_procurements.saveAwardDefaults"]
  n29 -->|reads/writes| n22[("sp_auditEvents")]
  n30["services/[id]/components/evaluation-forms/ComplianceSection.tsx :: ComplianceSection"] -->|useMutation| n31["useMutation api.sp_procurements.saveComplianceDefaults"]
  n31 -->|reads/writes| n22[("sp_auditEvents")]
  n32["services/[id]/components/evaluation-forms/ScoringSection.tsx :: ScoringSection"] -->|useMutation| n33["useMutation api.sp_evaluation.saveCriteria"]
  n33 -->|reads/writes| n3[("sp_rftInstances")]
  n33 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n33 -->|reads/writes| n35[("sp_rftAwardModel")]
  n33 -->|reads/writes| n22[("sp_auditEvents")]
  n32["services/[id]/components/evaluation-forms/ScoringSection.tsx :: ScoringSection"] -->|useAction| n36["useAction api.ai.suggestEvalCriteria.suggestEvalCriteria"]
  n37["services/[id]/components/evaluation-forms/SelectionSection.tsx :: SelectionSection"] -->|useMutation| n38["useMutation api.sp_procurements.saveSuitabilityCriteria"]
  n38 -->|reads/writes| n22[("sp_auditEvents")]
  n39["services/[id]/components/evaluation-forms/TimelineSection.tsx :: TimelineSection"] -->|useMutation| n40["useMutation api.sp_procurements.saveTenderDates"]
  n40 -->|reads/writes| n22[("sp_auditEvents")]
  n41["services/[id]/contract/page.tsx :: ContractPage"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n41["services/[id]/contract/page.tsx :: ContractPage"] -->|useMutation| n42["useMutation api.award_contract.contractVerify.contractVerify"]
  n42 -->|reads/writes| n15[("sp_contractEvents")]
  n41["services/[id]/contract/page.tsx :: ContractPage"] -->|useMutation| n43["useMutation api.award_contract.contractEventAdd.contractEventAdd"]
  n43 -->|reads/writes| n15[("sp_contractEvents")]
  n41["services/[id]/contract/page.tsx :: ContractPage"] -->|useMutation| n44["useMutation api.award_contract.contractPerformanceUpdate.contractPerformanceUpdate"]
  n44 -->|reads/writes| n15[("sp_contractEvents")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n46["useQuery api.eval.legacyEvaluationPlan.getPlan"]
  n46 -->|reads/writes| n5[("sp_evaluationPlans")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n47["useQuery api.eval.shellFacade.getCriteriaForProcurement"]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n48["useQuery api.eval.shellFacade.getAuditLogsForProcurement"]
  n48 -->|reads/writes| n22[("sp_auditEvents")]
  n48 -->|reads/writes| n49[("gov_auditEvents")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useQuery| n50["useQuery api.eval.shellFacade.getPackForProcurement"]
  n50 -->|reads/writes| n51[("eval_evaluationReports")]
  n50 -->|reads/writes| n52[("sp_governancePacks")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n53["useMutation api.eval.shellFacade.createPlan"]
  n53 -->|reads/writes| n3[("sp_rftInstances")]
  n53 -->|reads/writes| n5[("sp_evaluationPlans")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n54["useMutation api.eval.shellFacade.addPanelMember"]
  n54 -->|reads/writes| n55[("sp_evaluationPanels")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n56["useMutation api.eval.shellFacade.declareConflict"]
  n56 -->|reads/writes| n57[("sp_conflictDeclarations")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n58["useMutation api.eval.shellFacade.saveScore"]
  n58 -->|reads/writes| n20[("sp_evaluationScores")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n59["useMutation api.eval.shellFacade.computeAggregates"]
  n59 -->|reads/writes| n20[("sp_evaluationScores")]
  n59 -->|reads/writes| n17[("sp_evaluationAggregates")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n60["useMutation api.eval.shellFacade.closePlan"]
  n60 -->|reads/writes| n20[("sp_evaluationScores")]
  n60 -->|reads/writes| n17[("sp_evaluationAggregates")]
  n45["services/[id]/evaluation/page.tsx :: EvaluationPage"] -->|useMutation| n61["useMutation api.eval.shellFacade.generatePack"]
  n61 -->|reads/writes| n52[("sp_governancePacks")]
  n62["services/[id]/evaluation/tabs/ResultsTab.tsx :: ResultsTab"] -->|useMutation| n63["useMutation api.eval.tenderScoring.compileLeaderboard"]
  n63 -->|reads/writes| n64[("eval_tenderSubmissions")]
  n63 -->|reads/writes| n65[("eval_tenderScores")]
  n63 -.->|triggers| n66["eval.workflowNotifications.notifyLeaderboardCompiled"]
  n62["services/[id]/evaluation/tabs/ResultsTab.tsx :: ResultsTab"] -->|useMutation| n67["useMutation api.eval.tenderScoring.revealScores"]
  n62["services/[id]/evaluation/tabs/ResultsTab.tsx :: ResultsTab"] -->|useMutation| n68["useMutation api.eval.tenderScoring.signLeaderboard"]
  n68 -.->|triggers| n69["eval.metrics.computeAuditScore"]
  n68 -.->|triggers| n70["eval.metrics.computePerformanceMetrics"]
  n62["services/[id]/evaluation/tabs/ResultsTab.tsx :: ResultsTab"] -->|useMutation| n71["useMutation api.eval.tenderScoring.confirmAwardToLpo"]
  n71 -.->|triggers| n72["eval.workflowNotifications.notifyStandstillStarted"]
  n73["services/[id]/evaluation/tabs/disagreements/AltFlagsSection.tsx :: AltFlagsSection"] -->|useMutation| n74["useMutation api.eval.altScreenings.runAltScreening"]
  n74 -->|reads/writes| n64[("eval_tenderSubmissions")]
  n74 -->|reads/writes| n75[("eval_altScreenings")]
  n73["services/[id]/evaluation/tabs/disagreements/AltFlagsSection.tsx :: AltFlagsSection"] -->|useMutation| n76["useMutation api.eval.altScreenings.resolveAltFlags"]
  n77["services/[id]/evaluation/tabs/disagreements/CredentialFlagsSection.tsx :: CredentialFlagsSection"] -->|useMutation| n78["useMutation api.eval.credentialExpiry.resolveCredentialFlag"]
  n77["services/[id]/evaluation/tabs/disagreements/CredentialFlagsSection.tsx :: CredentialFlagsSection"] -->|useMutation| n79["useMutation api.eval.credentialExpiry.sendRenewalNotice"]
  n79 -.->|triggers| n80["email.sendEmail.sendEmail"]
  n81["services/[id]/evaluation/tabs/disagreements/DisputeSectionsWrapper.tsx :: DisputeSectionsWrapper"] -->|useMutation| n82["useMutation api.eval.disputeHandling.recordQsRefusal"]
  n83["services/[id]/evaluation/tabs/disagreements/UnrevealSection.tsx :: UnrevealSection"] -->|useMutation| n67["useMutation api.eval.tenderScoring.revealScores"]
  n83["services/[id]/evaluation/tabs/disagreements/UnrevealSection.tsx :: UnrevealSection"] -->|useMutation| n84["useMutation api.eval.tenderScoring.unrevelScores"]
  n85["services/[id]/evaluation/tabs/setup/SectionG_TenderDocsGate.tsx :: SectionG_TenderDocsGate"] -->|useMutation| n86["useMutation api.eval.tenderProjects.signTenderDocsDeclaration"]
  n85["services/[id]/evaluation/tabs/setup/SectionG_TenderDocsGate.tsx :: SectionG_TenderDocsGate"] -->|useMutation| n87["useMutation api.eval.tenderProjects.enterRftAndTimeLock"]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n89["useQuery api.router.legacyReexports.getDecision"]
  n89 -->|reads/writes| n8[("sp_routerDecisions")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useMutation| n90["useMutation api.procurements.publish.publish"]
  n90 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n90 -->|reads/writes| n3[("sp_rftInstances")]
  n90 -->|reads/writes| n92[("sp_rftKPIs")]
  n90 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n90 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n90 -->|reads/writes| n95[("tp_packs")]
  n90 -->|reads/writes| n96[("tp_goods_line_items")]
  n90 -->|reads/writes| n97[("sp_spendAggregation")]
  n90 -->|reads/writes| n22[("sp_auditEvents")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n98["useQuery api.sp_evaluation.getCriteria"]
  n98 -->|reads/writes| n3[("sp_rftInstances")]
  n98 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n99["useQuery api.sp_scope.getScope"]
  n99 -->|reads/writes| n3[("sp_rftInstances")]
  n99 -->|reads/writes| n100[("sp_rftSpecSections")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n101["useQuery api.sp_pricing.getScheduleWithItems"]
  n101 -->|reads/writes| n3[("sp_rftInstances")]
  n101 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n101 -->|reads/writes| n102[("sp_rftPricingItems")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n103["useQuery api.packs.validateIttFields.validateIttFields"]
  n103 -->|reads/writes| n3[("sp_rftInstances")]
  n103 -->|reads/writes| n8[("sp_routerDecisions")]
  n103 -->|reads/writes| n104[("sp_ittBuilderFields")]
  n103 -->|reads/writes| n35[("sp_rftAwardModel")]
  n103 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n103 -->|reads/writes| n100[("sp_rftSpecSections")]
  n103 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n88["services/[id]/page.tsx :: ProcurementDetailPageClient"] -->|useQuery| n105["useQuery api.sp_governance.getPack"]
  n105 -->|reads/writes| n52[("sp_governancePacks")]
  n106["services/[id]/scope-document/page.tsx :: ScopeDocumentPage"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n106["services/[id]/scope-document/page.tsx :: ScopeDocumentPage"] -->|useQuery| n99["useQuery api.sp_scope.getScope"]
  n99 -->|reads/writes| n3[("sp_rftInstances")]
  n99 -->|reads/writes| n100[("sp_rftSpecSections")]
  n106["services/[id]/scope-document/page.tsx :: ScopeDocumentPage"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useQuery| n108["useQuery api.sp_serviceCategories.listActive"]
  n108 -->|reads/writes| n109[("sp_serviceCategories")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useQuery| n105["useQuery api.sp_governance.getPack"]
  n105 -->|reads/writes| n52[("sp_governancePacks")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useQuery| n110["useQuery api.sp_governance.getAuditLogs"]
  n110 -->|reads/writes| n22[("sp_auditEvents")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useMutation| n111["useMutation api.sp_governance.generatePack"]
  n111 -->|reads/writes| n8[("sp_routerDecisions")]
  n111 -->|reads/writes| n112[("sp_routerAnswers")]
  n111 -->|reads/writes| n3[("sp_rftInstances")]
  n111 -->|reads/writes| n100[("sp_rftSpecSections")]
  n111 -->|reads/writes| n92[("sp_rftKPIs")]
  n111 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n111 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n111 -->|reads/writes| n35[("sp_rftAwardModel")]
  n111 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n111 -->|reads/writes| n102[("sp_rftPricingItems")]
  n111 -->|reads/writes| n5[("sp_evaluationPlans")]
  n111 -->|reads/writes| n113[("sp_procurementSnapshots")]
  n111 -->|reads/writes| n114[("sp_validationRuns")]
  n111 -->|reads/writes| n22[("sp_auditEvents")]
  n111 -->|reads/writes| n52[("sp_governancePacks")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useMutation| n115["useMutation api.overlays.applyToProcurement.applyToProcurement"]
  n115 -->|reads/writes| n116[("sp_serviceOverlays")]
  n115 -->|reads/writes| n3[("sp_rftInstances")]
  n115 -->|reads/writes| n117[("sp_kpiLibrary")]
  n115 -->|reads/writes| n118[("sp_selectionCriteriaLibrary")]
  n115 -->|reads/writes| n92[("sp_rftKPIs")]
  n115 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n115 -->|reads/writes| n119[("sp_awardModelLibrary")]
  n115 -->|reads/writes| n35[("sp_rftAwardModel")]
  n115 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n115 -->|reads/writes| n120[("sp_pricingModelLibrary")]
  n115 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n115 -->|reads/writes| n102[("sp_rftPricingItems")]
  n115 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n107["services/[id]/tabs/AuditTab.tsx :: AuditTab"] -->|useMutation| n90["useMutation api.procurements.publish.publish"]
  n90 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n90 -->|reads/writes| n3[("sp_rftInstances")]
  n90 -->|reads/writes| n92[("sp_rftKPIs")]
  n90 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n90 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n90 -->|reads/writes| n95[("tp_packs")]
  n90 -->|reads/writes| n96[("tp_goods_line_items")]
  n90 -->|reads/writes| n97[("sp_spendAggregation")]
  n90 -->|reads/writes| n22[("sp_auditEvents")]
  n121["services/[id]/tabs/AuditTab.tsx :: GovernanceAuditPanel"] -->|useAction| n122["useAction api.packs.regenerateOutputs.regenerateOutputs"]
  n121["services/[id]/tabs/AuditTab.tsx :: GovernanceAuditPanel"] -->|useQuery| n103["useQuery api.packs.validateIttFields.validateIttFields"]
  n103 -->|reads/writes| n3[("sp_rftInstances")]
  n103 -->|reads/writes| n8[("sp_routerDecisions")]
  n103 -->|reads/writes| n104[("sp_ittBuilderFields")]
  n103 -->|reads/writes| n35[("sp_rftAwardModel")]
  n103 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n103 -->|reads/writes| n100[("sp_rftSpecSections")]
  n103 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n123["services/[id]/tabs/AwardContractTab.tsx :: AwardContractRedirect"] -->|useQuery| n124["useQuery api.award_contract.queries.getAwardByProcurement"]
  n124 -->|reads/writes| n3[("sp_rftInstances")]
  n124 -->|reads/writes| n10[("sp_awards")]
  n125["services/[id]/tabs/DebriefTab.tsx :: DebriefTab"] -->|useMutation| n16["useMutation api.award_contract.debriefGenerate.debriefGenerate"]
  n16 -->|reads/writes| n17[("sp_evaluationAggregates")]
  n16 -->|reads/writes| n18[("sp_debriefs")]
  n16 -->|reads/writes| n19[("sp_supplierProfiles")]
  n16 -->|reads/writes| n20[("sp_evaluationScores")]
  n126["services/[id]/tabs/DocumentSetupTab.tsx :: DocumentSetupTab"] -->|useQuery| n127["useQuery api.packs.getIttReadiness.getIttReadiness"]
  n128["services/[id]/tabs/EvaluationCriteriaTab.tsx :: EvaluationCriteriaTab"] -->|useQuery| n98["useQuery api.sp_evaluation.getCriteria"]
  n98 -->|reads/writes| n3[("sp_rftInstances")]
  n98 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n129["services/[id]/tabs/EvaluationCriteriaTab.tsx :: IttOutstandingCard"] -->|useQuery| n103["useQuery api.packs.validateIttFields.validateIttFields"]
  n103 -->|reads/writes| n3[("sp_rftInstances")]
  n103 -->|reads/writes| n8[("sp_routerDecisions")]
  n103 -->|reads/writes| n104[("sp_ittBuilderFields")]
  n103 -->|reads/writes| n35[("sp_rftAwardModel")]
  n103 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n103 -->|reads/writes| n100[("sp_rftSpecSections")]
  n103 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n130["services/[id]/tabs/OverviewTab.tsx :: OverviewTab"] -->|useMutation| n131["useMutation api.sp_procurements.update"]
  n131 -->|reads/writes| n22[("sp_auditEvents")]
  n130["services/[id]/tabs/OverviewTab.tsx :: OverviewTab"] -->|useQuery| n108["useQuery api.sp_serviceCategories.listActive"]
  n108 -->|reads/writes| n109[("sp_serviceCategories")]
  n130["services/[id]/tabs/OverviewTab.tsx :: OverviewTab"] -->|useQuery| n98["useQuery api.sp_evaluation.getCriteria"]
  n98 -->|reads/writes| n3[("sp_rftInstances")]
  n98 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n130["services/[id]/tabs/OverviewTab.tsx :: OverviewTab"] -->|useMutation| n115["useMutation api.overlays.applyToProcurement.applyToProcurement"]
  n115 -->|reads/writes| n116[("sp_serviceOverlays")]
  n115 -->|reads/writes| n3[("sp_rftInstances")]
  n115 -->|reads/writes| n117[("sp_kpiLibrary")]
  n115 -->|reads/writes| n118[("sp_selectionCriteriaLibrary")]
  n115 -->|reads/writes| n92[("sp_rftKPIs")]
  n115 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n115 -->|reads/writes| n119[("sp_awardModelLibrary")]
  n115 -->|reads/writes| n35[("sp_rftAwardModel")]
  n115 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n115 -->|reads/writes| n120[("sp_pricingModelLibrary")]
  n115 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n115 -->|reads/writes| n102[("sp_rftPricingItems")]
  n115 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n130["services/[id]/tabs/OverviewTab.tsx :: OverviewTab"] -->|useMutation| n90["useMutation api.procurements.publish.publish"]
  n90 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n90 -->|reads/writes| n3[("sp_rftInstances")]
  n90 -->|reads/writes| n92[("sp_rftKPIs")]
  n90 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n90 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n90 -->|reads/writes| n95[("tp_packs")]
  n90 -->|reads/writes| n96[("tp_goods_line_items")]
  n90 -->|reads/writes| n97[("sp_spendAggregation")]
  n90 -->|reads/writes| n22[("sp_auditEvents")]
  n132["services/[id]/tabs/ScopePricingTab.tsx :: ScopePricingTab"] -->|useQuery| n99["useQuery api.sp_scope.getScope"]
  n99 -->|reads/writes| n3[("sp_rftInstances")]
  n99 -->|reads/writes| n100[("sp_rftSpecSections")]
  n132["services/[id]/tabs/ScopePricingTab.tsx :: ScopePricingTab"] -->|useQuery| n101["useQuery api.sp_pricing.getScheduleWithItems"]
  n101 -->|reads/writes| n3[("sp_rftInstances")]
  n101 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n101 -->|reads/writes| n102[("sp_rftPricingItems")]
  n133["services/[id]/tabs/ScopePricingTab.tsx :: ScopeTabWrapper"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n133["services/[id]/tabs/ScopePricingTab.tsx :: ScopeTabWrapper"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n133["services/[id]/tabs/ScopePricingTab.tsx :: ScopeTabWrapper"] -->|useMutation| n134["useMutation api.sp_scope.writeCompiledScopeFromItems"]
  n134 -->|reads/writes| n3[("sp_rftInstances")]
  n134 -->|reads/writes| n100[("sp_rftSpecSections")]
  n134 -->|reads/writes| n22[("sp_auditEvents")]
  n133["services/[id]/tabs/ScopePricingTab.tsx :: ScopeTabWrapper"] -->|useMutation| n135["useMutation api.pricing.generateServicePricing.generateServicePricing"]
  n135 -->|reads/writes| n100[("sp_rftSpecSections")]
  n135 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n133["services/[id]/tabs/ScopePricingTab.tsx :: ScopeTabWrapper"] -->|useMutation| n136["useMutation api.scopeBackground.generateBackgroundSection"]
  n136 -->|reads/writes| n3[("sp_rftInstances")]
  n136 -->|reads/writes| n137[("sp_procurementContext")]
  n136 -->|reads/writes| n100[("sp_rftSpecSections")]
  n138["services/[id]/tabs/ScopePricingTab.tsx :: PricingTabWrapper"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n138["services/[id]/tabs/ScopePricingTab.tsx :: PricingTabWrapper"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n138["services/[id]/tabs/ScopePricingTab.tsx :: PricingTabWrapper"] -->|useMutation| n139["useMutation api.pricing.acceptPricing.acceptPricing"]
  n140["services/[id]/tabs/TenderDocumentsTab.tsx :: TenderDocumentsTab"] -->|useMutation| n90["useMutation api.procurements.publish.publish"]
  n90 -->|reads/writes| n91[("sp_procurementOverlaySnapshots")]
  n90 -->|reads/writes| n3[("sp_rftInstances")]
  n90 -->|reads/writes| n92[("sp_rftKPIs")]
  n90 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n90 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n90 -->|reads/writes| n95[("tp_packs")]
  n90 -->|reads/writes| n96[("tp_goods_line_items")]
  n90 -->|reads/writes| n97[("sp_spendAggregation")]
  n90 -->|reads/writes| n22[("sp_auditEvents")]
  n141["services/page.tsx :: services/page.tsx"] -->|useQuery| n142["useQuery api.sp_procurements.list"]
  n142 -->|reads/writes| n143[("sp_procurements")]
  n142 -->|reads/writes| n109[("sp_serviceCategories")]
  n144["services/page.tsx :: ServicesDashboard"] -->|useQuery| n142["useQuery api.sp_procurements.list"]
  n142 -->|reads/writes| n143[("sp_procurements")]
  n142 -->|reads/writes| n109[("sp_serviceCategories")]
  n144["services/page.tsx :: ServicesDashboard"] -->|useQuery| n145["useQuery api.sp_procurements.stats"]
  n145 -->|reads/writes| n143[("sp_procurements")]
  n146["services/ContractLifecyclePanel.tsx :: ContractLifecyclePanel"] -->|useQuery| n147["useQuery api.sp_contracts.getByProcurement"]
  n147 -->|reads/writes| n13[("sp_contracts")]
  n146["services/ContractLifecyclePanel.tsx :: ContractLifecyclePanel"] -->|useQuery| n148["useQuery api.sp_contracts.getLegacyAwardDecision"]
  n148 -->|reads/writes| n149[("sp_awardDecisions")]
  n146["services/ContractLifecyclePanel.tsx :: ContractLifecyclePanel"] -->|useQuery| n124["useQuery api.award_contract.queries.getAwardByProcurement"]
  n124 -->|reads/writes| n3[("sp_rftInstances")]
  n124 -->|reads/writes| n10[("sp_awards")]
  n146["services/ContractLifecyclePanel.tsx :: ContractLifecyclePanel"] -->|useMutation| n150["useMutation api.sp_contracts.createFromAward"]
  n150 -->|reads/writes| n149[("sp_awardDecisions")]
  n150 -->|reads/writes| n10[("sp_awards")]
  n150 -->|reads/writes| n3[("sp_rftInstances")]
  n150 -->|reads/writes| n13[("sp_contracts")]
  n150 -->|reads/writes| n92[("sp_rftKPIs")]
  n150 -->|reads/writes| n151[("sp_contractKPIs")]
  n150 -->|reads/writes| n152[("sp_contractMilestones")]
  n150 -->|reads/writes| n153[("sp_spendLedger")]
  n150 -->|reads/writes| n154[("sp_procurementMetrics")]
  n150 -->|reads/writes| n22[("sp_auditEvents")]
  n155["services/ContractLifecyclePanel.tsx :: ContractRow"] -->|useQuery| n156["useQuery api.sp_contracts.getMilestones"]
  n156 -->|reads/writes| n152[("sp_contractMilestones")]
  n155["services/ContractLifecyclePanel.tsx :: ContractRow"] -->|useQuery| n157["useQuery api.sp_contracts.getKPIs"]
  n157 -->|reads/writes| n151[("sp_contractKPIs")]
  n155["services/ContractLifecyclePanel.tsx :: ContractRow"] -->|useQuery| n158["useQuery api.sp_contracts.getPerformanceReports"]
  n158 -->|reads/writes| n159[("sp_contractPerformanceReports")]
  n160["services/SaqBuilderTab.tsx :: SaqBuilderTab"] -->|useQuery| n161["useQuery api.eval.queries.listCampaigns"]
  n161 -->|reads/writes| n162[("eval_saqCampaigns")]
  n161 -->|reads/writes| n163[("eval_saqSubmissions")]
  n160["services/SaqBuilderTab.tsx :: SaqBuilderTab"] -->|useMutation| n164["useMutation api.eval.saqCampaigns.createSaqCampaign"]
  n164 -->|reads/writes| n162[("eval_saqCampaigns")]
  n160["services/SaqBuilderTab.tsx :: SaqBuilderTab"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n165["services/ScopeDocumentTab.tsx :: ScopeDocumentTab"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n165["services/ScopeDocumentTab.tsx :: ScopeDocumentTab"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n166["services/SubmissionTracker.tsx :: SubmissionUploadPanel"] -->|useQuery| n167["useQuery api.tenderResponses.attachReturnDocuments.getAttachmentUrls"]
  n166["services/SubmissionTracker.tsx :: SubmissionUploadPanel"] -->|useMutation| n168["useMutation api.tenderResponses.attachReturnDocuments.generateReturnUploadUrl"]
  n166["services/SubmissionTracker.tsx :: SubmissionUploadPanel"] -->|useMutation| n169["useMutation api.tenderResponses.attachReturnDocuments.attachDocument"]
  n166["services/SubmissionTracker.tsx :: SubmissionUploadPanel"] -->|useMutation| n170["useMutation api.tenderResponses.attachReturnDocuments.removeDocument"]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useQuery| n172["useQuery api.tenderResponses.listByProcurement.listByProcurement"]
  n172 -->|reads/writes| n173[("sp_rftSubmissions")]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useQuery| n2["useQuery api.sp_rft.getRft"]
  n2 -->|reads/writes| n3[("sp_rftInstances")]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useMutation| n174["useMutation api.tenderResponses.registerResponse.registerResponse"]
  n174 -->|reads/writes| n3[("sp_rftInstances")]
  n174 -->|reads/writes| n173[("sp_rftSubmissions")]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useMutation| n175["useMutation api.tenderResponses.updateStatus.updateStatus"]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useMutation| n176["useMutation api.tenderResponses.openSubmissionWindow.openSubmissionWindow"]
  n176 -->|reads/writes| n3[("sp_rftInstances")]
  n176 -->|reads/writes| n22[("sp_auditEvents")]
  n171["services/SubmissionTracker.tsx :: SubmissionTracker"] -->|useMutation| n177["useMutation api.tenderResponses.closeSubmissionWindow.closeSubmissionWindow"]
  n177 -->|reads/writes| n3[("sp_rftInstances")]
  n177 -->|reads/writes| n173[("sp_rftSubmissions")]
  n177 -->|reads/writes| n22[("sp_auditEvents")]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useMutation| n179["useMutation api.sp_procurements.create"]
  n179 -->|reads/writes| n143[("sp_procurements")]
  n179 -->|reads/writes| n22[("sp_auditEvents")]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useMutation| n180["useMutation api.procurementContext.setBuilding.setBuilding"]
  n180 -->|reads/writes| n137[("sp_procurementContext")]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useMutation| n181["useMutation api.router.routeAndPersist.routeAndPersist"]
  n181 -->|reads/writes| n112[("sp_routerAnswers")]
  n181 -->|reads/writes| n109[("sp_serviceCategories")]
  n181 -->|reads/writes| n182[("procurement_modifications")]
  n181 -->|reads/writes| n8[("sp_routerDecisions")]
  n181 -->|reads/writes| n22[("sp_auditEvents")]
  n181 -.->|triggers| n183["ogp_frameworkValidation.checkFramework"]
  n181 -.->|triggers| n184["ogp_frameworkValidation.recordFrameworkValidation"]
  n181 -.->|triggers| n185["sp_aggregation.computeAggregation"]
  n181 -.->|triggers| n186["sp_aggregation.recordAggregationCheck"]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useQuery| n108["useQuery api.sp_serviceCategories.listActive"]
  n108 -->|reads/writes| n109[("sp_serviceCategories")]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useQuery| n187["useQuery api.buildings.list.list"]
  n187 -->|reads/writes| n188[("buildings")]
  n178["services/steps/BasicDetailsStep.tsx :: BasicDetailsStep"] -->|useQuery| n189["useQuery api.sp_procurements.recentTitlesSample"]
  n189 -->|reads/writes| n143[("sp_procurements")]
  n190["services/steps/EvaluationSetupStep.tsx :: EvaluationSetupStep"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n190["services/steps/EvaluationSetupStep.tsx :: EvaluationSetupStep"] -->|useQuery| n98["useQuery api.sp_evaluation.getCriteria"]
  n98 -->|reads/writes| n3[("sp_rftInstances")]
  n98 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n190["services/steps/EvaluationSetupStep.tsx :: EvaluationSetupStep"] -->|useMutation| n33["useMutation api.sp_evaluation.saveCriteria"]
  n33 -->|reads/writes| n3[("sp_rftInstances")]
  n33 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n33 -->|reads/writes| n35[("sp_rftAwardModel")]
  n33 -->|reads/writes| n22[("sp_auditEvents")]
  n190["services/steps/EvaluationSetupStep.tsx :: EvaluationSetupStep"] -->|useAction| n36["useAction api.ai.suggestEvalCriteria.suggestEvalCriteria"]
  n191["services/steps/PricingSetupStep.tsx :: PricingSetupStep"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n191["services/steps/PricingSetupStep.tsx :: PricingSetupStep"] -->|useQuery| n101["useQuery api.sp_pricing.getScheduleWithItems"]
  n101 -->|reads/writes| n3[("sp_rftInstances")]
  n101 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n101 -->|reads/writes| n102[("sp_rftPricingItems")]
  n191["services/steps/PricingSetupStep.tsx :: PricingSetupStep"] -->|useMutation| n192["useMutation api.sp_pricing.createSchedule"]
  n192 -->|reads/writes| n3[("sp_rftInstances")]
  n192 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n192 -->|reads/writes| n102[("sp_rftPricingItems")]
  n191["services/steps/PricingSetupStep.tsx :: PricingSetupStep"] -->|useMutation| n193["useMutation api.sp_pricing.bulkAddItems"]
  n193 -->|reads/writes| n102[("sp_rftPricingItems")]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useQuery| n89["useQuery api.router.legacyReexports.getDecision"]
  n89 -->|reads/writes| n8[("sp_routerDecisions")]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useQuery| n99["useQuery api.sp_scope.getScope"]
  n99 -->|reads/writes| n3[("sp_rftInstances")]
  n99 -->|reads/writes| n100[("sp_rftSpecSections")]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useQuery| n101["useQuery api.sp_pricing.getScheduleWithItems"]
  n101 -->|reads/writes| n3[("sp_rftInstances")]
  n101 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n101 -->|reads/writes| n102[("sp_rftPricingItems")]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useQuery| n98["useQuery api.sp_evaluation.getCriteria"]
  n98 -->|reads/writes| n3[("sp_rftInstances")]
  n98 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n194["services/steps/ReviewSummaryStep.tsx :: ReviewSummaryStep"] -->|useMutation| n111["useMutation api.sp_governance.generatePack"]
  n111 -->|reads/writes| n8[("sp_routerDecisions")]
  n111 -->|reads/writes| n112[("sp_routerAnswers")]
  n111 -->|reads/writes| n3[("sp_rftInstances")]
  n111 -->|reads/writes| n100[("sp_rftSpecSections")]
  n111 -->|reads/writes| n92[("sp_rftKPIs")]
  n111 -->|reads/writes| n93[("sp_rftSelectionCriteria")]
  n111 -->|reads/writes| n34[("sp_rftAwardCriteria")]
  n111 -->|reads/writes| n35[("sp_rftAwardModel")]
  n111 -->|reads/writes| n94[("sp_rftPricingSchedules")]
  n111 -->|reads/writes| n102[("sp_rftPricingItems")]
  n111 -->|reads/writes| n5[("sp_evaluationPlans")]
  n111 -->|reads/writes| n113[("sp_procurementSnapshots")]
  n111 -->|reads/writes| n114[("sp_validationRuns")]
  n111 -->|reads/writes| n22[("sp_auditEvents")]
  n111 -->|reads/writes| n52[("sp_governancePacks")]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useQuery| n1["useQuery api.sp_procurements.get"]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useQuery| n99["useQuery api.sp_scope.getScope"]
  n99 -->|reads/writes| n3[("sp_rftInstances")]
  n99 -->|reads/writes| n100[("sp_rftSpecSections")]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useMutation| n196["useMutation api.sp_scope.saveScope"]
  n196 -->|reads/writes| n3[("sp_rftInstances")]
  n196 -->|reads/writes| n100[("sp_rftSpecSections")]
  n196 -->|reads/writes| n22[("sp_auditEvents")]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useMutation| n197["useMutation api.cpv.procurementCpvs.saveConfirmedCpvs"]
  n197 -->|reads/writes| n198[("procurementCpvs")]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useQuery| n199["useQuery api.procurementContext.setBuilding.getByProcurement"]
  n199 -->|reads/writes| n137[("sp_procurementContext")]
  n195["services/steps/ScopeGenerationStep.tsx :: ScopeGenerationStep"] -->|useAction| n200["useAction api.ai.generateScopeBlocks.generateScopeBlocks"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `sp_procurements.get` | query | — | — |
| `sp_rft.getRft` | query | `sp_rftInstances` | — |
| `sp_evaluation.getPlan` | query | `sp_evaluationPlans` | — |
| `packs.getLatestArtifacts.getLatestArtifacts` | query | `sp_rftInstances`, `sp_packArtifacts`, `sp_routerDecisions` | — |
| `award_contract.awardIntent.awardIntent` | mutation | `sp_routerDecisions`, `sp_awards` | — |
| `award_contract.standstillStart.standstillStart` | mutation | — | — |
| `award_contract.awardConfirm.awardConfirm` | mutation | `sp_contracts`, `sp_contractLots`, `sp_contractEvents` | — |
| `award_contract.debriefGenerate.debriefGenerate` | mutation | `sp_evaluationAggregates`, `sp_debriefs`, `sp_supplierProfiles`, `sp_evaluationScores` | — |
| `rftLifecycle.advanceStatus.forceEvaluation` | mutation | `sp_auditEvents` | — |
| `packs.generateEvaluationDocx.generateEvaluationDocx` | action | — | `packs.getRegenContext.getRegenContext` |
| `packs.generateAgreementForms.generateAgreementFormDocx` | action | — | `packs.getRegenContext.getRegenContext` |
| `packs.generateMf2Docx.generateMf2Docx` | action | — | `packs.getRegenContext.getRegenContext` |
| `sp_procurements.saveAwardDefaults` | mutation | `sp_auditEvents` | — |
| `sp_procurements.saveComplianceDefaults` | mutation | `sp_auditEvents` | — |
| `sp_evaluation.saveCriteria` | mutation | `sp_rftInstances`, `sp_rftAwardCriteria`, `sp_rftAwardModel`, `sp_auditEvents` | — |
| `ai.suggestEvalCriteria.suggestEvalCriteria` | action | — | — |
| `sp_procurements.saveSuitabilityCriteria` | mutation | `sp_auditEvents` | — |
| `sp_procurements.saveTenderDates` | mutation | `sp_auditEvents` | — |
| `award_contract.contractVerify.contractVerify` | mutation | `sp_contractEvents` | — |
| `award_contract.contractEventAdd.contractEventAdd` | mutation | `sp_contractEvents` | — |
| `award_contract.contractPerformanceUpdate.contractPerformanceUpdate` | mutation | `sp_contractEvents` | — |
| `eval.legacyEvaluationPlan.getPlan` | query | `sp_evaluationPlans` | — |
| `eval.shellFacade.getCriteriaForProcurement` | query | — | — |
| `eval.shellFacade.getAuditLogsForProcurement` | query | `sp_auditEvents`, `gov_auditEvents` | — |
| `eval.shellFacade.getPackForProcurement` | query | `eval_evaluationReports`, `sp_governancePacks` | — |
| `eval.shellFacade.createPlan` | mutation | `sp_rftInstances`, `sp_evaluationPlans` | — |
| `eval.shellFacade.addPanelMember` | mutation | `sp_evaluationPanels` | — |
| `eval.shellFacade.declareConflict` | mutation | `sp_conflictDeclarations` | — |
| `eval.shellFacade.saveScore` | mutation | `sp_evaluationScores` | — |
| `eval.shellFacade.computeAggregates` | mutation | `sp_evaluationScores`, `sp_evaluationAggregates` | — |
| `eval.shellFacade.closePlan` | mutation | `sp_evaluationScores`, `sp_evaluationAggregates` | — |
| `eval.shellFacade.generatePack` | mutation | `sp_governancePacks` | — |
| `eval.tenderScoring.compileLeaderboard` | mutation | `eval_tenderSubmissions`, `eval_tenderScores` | `eval.workflowNotifications.notifyLeaderboardCompiled` |
| `eval.tenderScoring.revealScores` | mutation | — | — |
| `eval.tenderScoring.signLeaderboard` | mutation | — | `eval.metrics.computeAuditScore`, `eval.metrics.computePerformanceMetrics` |
| `eval.tenderScoring.confirmAwardToLpo` | mutation | — | `eval.workflowNotifications.notifyStandstillStarted` |
| `eval.altScreenings.runAltScreening` | mutation | `eval_tenderSubmissions`, `eval_altScreenings` | — |
| `eval.altScreenings.resolveAltFlags` | mutation | — | — |
| `eval.credentialExpiry.resolveCredentialFlag` | mutation | — | — |
| `eval.credentialExpiry.sendRenewalNotice` | mutation | — | `email.sendEmail.sendEmail` |
| `eval.disputeHandling.recordQsRefusal` | mutation | — | — |
| `eval.tenderScoring.unrevelScores` | mutation | — | — |
| `eval.tenderProjects.signTenderDocsDeclaration` | mutation | — | — |
| `eval.tenderProjects.enterRftAndTimeLock` | mutation | — | — |
| `router.legacyReexports.getDecision` | query | `sp_routerDecisions` | — |
| `procurements.publish.publish` | mutation | `sp_procurementOverlaySnapshots`, `sp_rftInstances`, `sp_rftKPIs`, `sp_rftSelectionCriteria`, `sp_rftPricingSchedules`, `tp_packs`, `tp_goods_line_items`, `sp_spendAggregation`, `sp_auditEvents` | — |
| `sp_evaluation.getCriteria` | query | `sp_rftInstances`, `sp_rftAwardCriteria` | — |
| `sp_scope.getScope` | query | `sp_rftInstances`, `sp_rftSpecSections` | — |
| `sp_pricing.getScheduleWithItems` | query | `sp_rftInstances`, `sp_rftPricingSchedules`, `sp_rftPricingItems` | — |
| `packs.validateIttFields.validateIttFields` | query | `sp_rftInstances`, `sp_routerDecisions`, `sp_ittBuilderFields`, `sp_rftAwardModel`, `sp_rftAwardCriteria`, `sp_rftSpecSections`, `sp_rftPricingSchedules` | — |
| `sp_governance.getPack` | query | `sp_governancePacks` | — |
| `sp_serviceCategories.listActive` | query | `sp_serviceCategories` | — |
| `sp_governance.getAuditLogs` | query | `sp_auditEvents` | — |
| `sp_governance.generatePack` | mutation | `sp_routerDecisions`, `sp_routerAnswers`, `sp_rftInstances`, `sp_rftSpecSections`, `sp_rftKPIs`, `sp_rftSelectionCriteria`, `sp_rftAwardCriteria`, `sp_rftAwardModel`, `sp_rftPricingSchedules`, `sp_rftPricingItems`, `sp_evaluationPlans`, `sp_procurementSnapshots`, `sp_validationRuns`, `sp_auditEvents`, `sp_governancePacks` | — |
| `overlays.applyToProcurement.applyToProcurement` | mutation | `sp_serviceOverlays`, `sp_rftInstances`, `sp_kpiLibrary`, `sp_selectionCriteriaLibrary`, `sp_rftKPIs`, `sp_rftSelectionCriteria`, `sp_awardModelLibrary`, `sp_rftAwardModel`, `sp_rftAwardCriteria`, `sp_pricingModelLibrary`, `sp_rftPricingSchedules`, `sp_rftPricingItems`, `sp_procurementOverlaySnapshots` | — |
| `packs.regenerateOutputs.regenerateOutputs` | action | — | — |
| `award_contract.queries.getAwardByProcurement` | query | `sp_rftInstances`, `sp_awards` | — |
| `packs.getIttReadiness.getIttReadiness` | query | — | — |
| `sp_procurements.update` | mutation | `sp_auditEvents` | — |
| `sp_scope.writeCompiledScopeFromItems` | mutation | `sp_rftInstances`, `sp_rftSpecSections`, `sp_auditEvents` | — |
| `pricing.generateServicePricing.generateServicePricing` | mutation | `sp_rftSpecSections`, `sp_rftPricingSchedules` | — |
| `scopeBackground.generateBackgroundSection` | mutation | `sp_rftInstances`, `sp_procurementContext`, `sp_rftSpecSections` | — |
| `pricing.acceptPricing.acceptPricing` | mutation | — | — |
| `sp_procurements.list` | query | `sp_procurements`, `sp_serviceCategories` | — |
| `sp_procurements.stats` | query | `sp_procurements` | — |
| `sp_contracts.getByProcurement` | query | `sp_contracts` | — |
| `sp_contracts.getLegacyAwardDecision` | query | `sp_awardDecisions` | — |
| `sp_contracts.createFromAward` | mutation | `sp_awardDecisions`, `sp_awards`, `sp_rftInstances`, `sp_contracts`, `sp_rftKPIs`, `sp_contractKPIs`, `sp_contractMilestones`, `sp_spendLedger`, `sp_procurementMetrics`, `sp_auditEvents` | — |
| `sp_contracts.getMilestones` | query | `sp_contractMilestones` | — |
| `sp_contracts.getKPIs` | query | `sp_contractKPIs` | — |
| `sp_contracts.getPerformanceReports` | query | `sp_contractPerformanceReports` | — |
| `eval.queries.listCampaigns` | query | `eval_saqCampaigns`, `eval_saqSubmissions` | — |
| `eval.saqCampaigns.createSaqCampaign` | mutation | `eval_saqCampaigns` | — |
| `tenderResponses.attachReturnDocuments.getAttachmentUrls` | query | — | — |
| `tenderResponses.attachReturnDocuments.generateReturnUploadUrl` | mutation | — | — |
| `tenderResponses.attachReturnDocuments.attachDocument` | mutation | — | — |
| `tenderResponses.attachReturnDocuments.removeDocument` | mutation | — | — |
| `tenderResponses.listByProcurement.listByProcurement` | query | `sp_rftSubmissions` | — |
| `tenderResponses.registerResponse.registerResponse` | mutation | `sp_rftInstances`, `sp_rftSubmissions` | — |
| `tenderResponses.updateStatus.updateStatus` | mutation | — | — |
| `tenderResponses.openSubmissionWindow.openSubmissionWindow` | mutation | `sp_rftInstances`, `sp_auditEvents` | — |
| `tenderResponses.closeSubmissionWindow.closeSubmissionWindow` | mutation | `sp_rftInstances`, `sp_rftSubmissions`, `sp_auditEvents` | — |
| `sp_procurements.create` | mutation | `sp_procurements`, `sp_auditEvents` | — |
| `procurementContext.setBuilding.setBuilding` | mutation | `sp_procurementContext` | — |
| `router.routeAndPersist.routeAndPersist` | mutation | `sp_routerAnswers`, `sp_serviceCategories`, `procurement_modifications`, `sp_routerDecisions`, `sp_auditEvents` | `ogp_frameworkValidation.checkFramework`, `ogp_frameworkValidation.recordFrameworkValidation`, `sp_aggregation.computeAggregation`, `sp_aggregation.recordAggregationCheck` |
| `buildings.list.list` | query | `buildings` | — |
| `sp_procurements.recentTitlesSample` | query | `sp_procurements` | — |
| `sp_pricing.createSchedule` | mutation | `sp_rftInstances`, `sp_rftPricingSchedules`, `sp_rftPricingItems` | — |
| `sp_pricing.bulkAddItems` | mutation | `sp_rftPricingItems` | — |
| `sp_scope.saveScope` | mutation | `sp_rftInstances`, `sp_rftSpecSections`, `sp_auditEvents` | — |
| `cpv.procurementCpvs.saveConfirmedCpvs` | mutation | `procurementCpvs` | — |
| `procurementContext.setBuilding.getByProcurement` | query | `sp_procurementContext` | — |
| `ai.generateScopeBlocks.generateScopeBlocks` | action | — | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `services/[id]/award/page.tsx` | AwardPage | useQuery | `api.sp_procurements.get` |
| `services/[id]/award/page.tsx` | AwardPage | useQuery | `api.sp_rft.getRft` |
| `services/[id]/award/page.tsx` | AwardPage | useQuery | `api.sp_evaluation.getPlan` |
| `services/[id]/award/page.tsx` | AwardPage | useQuery | `api.packs.getLatestArtifacts.getLatestArtifacts` |
| `services/[id]/award/page.tsx` | AwardPage | useMutation | `api.award_contract.awardIntent.awardIntent` |
| `services/[id]/award/page.tsx` | AwardPage | useMutation | `api.award_contract.standstillStart.standstillStart` |
| `services/[id]/award/page.tsx` | AwardPage | useMutation | `api.award_contract.awardConfirm.awardConfirm` |
| `services/[id]/award/page.tsx` | AwardPage | useMutation | `api.award_contract.debriefGenerate.debriefGenerate` |
| `services/[id]/award/page.tsx` | AwardPage | useMutation | `api.rftLifecycle.advanceStatus.forceEvaluation` |
| `services/[id]/award/page.tsx` | AwardPage | useAction | `api.packs.generateEvaluationDocx.generateEvaluationDocx` |
| `services/[id]/award/page.tsx` | AwardPage | useAction | `api.packs.generateAgreementForms.generateAgreementFormDocx` |
| `services/[id]/award/page.tsx` | AwardPage | useAction | `api.packs.generateMf2Docx.generateMf2Docx` |
| `services/[id]/components/EvaluationFormsPanel.tsx` | EvaluationFormsPanel | useQuery | `api.sp_procurements.get` |
| `services/[id]/components/evaluation-forms/AwardDefaultsSection.tsx` | AwardDefaultsSection | useMutation | `api.sp_procurements.saveAwardDefaults` |
| `services/[id]/components/evaluation-forms/ComplianceSection.tsx` | ComplianceSection | useMutation | `api.sp_procurements.saveComplianceDefaults` |
| `services/[id]/components/evaluation-forms/ScoringSection.tsx` | ScoringSection | useMutation | `api.sp_evaluation.saveCriteria` |
| `services/[id]/components/evaluation-forms/ScoringSection.tsx` | ScoringSection | useAction | `api.ai.suggestEvalCriteria.suggestEvalCriteria` |
| `services/[id]/components/evaluation-forms/SelectionSection.tsx` | SelectionSection | useMutation | `api.sp_procurements.saveSuitabilityCriteria` |
| `services/[id]/components/evaluation-forms/TimelineSection.tsx` | TimelineSection | useMutation | `api.sp_procurements.saveTenderDates` |
| `services/[id]/contract/page.tsx` | ContractPage | useQuery | `api.sp_procurements.get` |
| `services/[id]/contract/page.tsx` | ContractPage | useMutation | `api.award_contract.contractVerify.contractVerify` |
| `services/[id]/contract/page.tsx` | ContractPage | useMutation | `api.award_contract.contractEventAdd.contractEventAdd` |
| `services/[id]/contract/page.tsx` | ContractPage | useMutation | `api.award_contract.contractPerformanceUpdate.contractPerformanceUpdate` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.sp_procurements.get` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.sp_rft.getRft` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.eval.legacyEvaluationPlan.getPlan` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.eval.shellFacade.getCriteriaForProcurement` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.eval.shellFacade.getAuditLogsForProcurement` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useQuery | `api.eval.shellFacade.getPackForProcurement` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.createPlan` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.addPanelMember` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.declareConflict` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.saveScore` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.computeAggregates` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.closePlan` |
| `services/[id]/evaluation/page.tsx` | EvaluationPage | useMutation | `api.eval.shellFacade.generatePack` |
| `services/[id]/evaluation/tabs/ResultsTab.tsx` | ResultsTab | useMutation | `api.eval.tenderScoring.compileLeaderboard` |
| `services/[id]/evaluation/tabs/ResultsTab.tsx` | ResultsTab | useMutation | `api.eval.tenderScoring.revealScores` |
| `services/[id]/evaluation/tabs/ResultsTab.tsx` | ResultsTab | useMutation | `api.eval.tenderScoring.signLeaderboard` |
| `services/[id]/evaluation/tabs/ResultsTab.tsx` | ResultsTab | useMutation | `api.eval.tenderScoring.confirmAwardToLpo` |
| `services/[id]/evaluation/tabs/disagreements/AltFlagsSection.tsx` | AltFlagsSection | useMutation | `api.eval.altScreenings.runAltScreening` |
| `services/[id]/evaluation/tabs/disagreements/AltFlagsSection.tsx` | AltFlagsSection | useMutation | `api.eval.altScreenings.resolveAltFlags` |
| `services/[id]/evaluation/tabs/disagreements/CredentialFlagsSection.tsx` | CredentialFlagsSection | useMutation | `api.eval.credentialExpiry.resolveCredentialFlag` |
| `services/[id]/evaluation/tabs/disagreements/CredentialFlagsSection.tsx` | CredentialFlagsSection | useMutation | `api.eval.credentialExpiry.sendRenewalNotice` |
| `services/[id]/evaluation/tabs/disagreements/DisputeSectionsWrapper.tsx` | DisputeSectionsWrapper | useMutation | `api.eval.disputeHandling.recordQsRefusal` |
| `services/[id]/evaluation/tabs/disagreements/UnrevealSection.tsx` | UnrevealSection | useMutation | `api.eval.tenderScoring.revealScores` |
| `services/[id]/evaluation/tabs/disagreements/UnrevealSection.tsx` | UnrevealSection | useMutation | `api.eval.tenderScoring.unrevelScores` |
| `services/[id]/evaluation/tabs/setup/SectionG_TenderDocsGate.tsx` | SectionG_TenderDocsGate | useMutation | `api.eval.tenderProjects.signTenderDocsDeclaration` |
| `services/[id]/evaluation/tabs/setup/SectionG_TenderDocsGate.tsx` | SectionG_TenderDocsGate | useMutation | `api.eval.tenderProjects.enterRftAndTimeLock` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_procurements.get` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.router.legacyReexports.getDecision` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_rft.getRft` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useMutation | `api.procurements.publish.publish` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_evaluation.getCriteria` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_scope.getScope` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_pricing.getScheduleWithItems` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.packs.validateIttFields.validateIttFields` |
| `services/[id]/page.tsx` | ProcurementDetailPageClient | useQuery | `api.sp_governance.getPack` |
| `services/[id]/scope-document/page.tsx` | ScopeDocumentPage | useQuery | `api.sp_procurements.get` |
| `services/[id]/scope-document/page.tsx` | ScopeDocumentPage | useQuery | `api.sp_scope.getScope` |
| `services/[id]/scope-document/page.tsx` | ScopeDocumentPage | useQuery | `api.sp_rft.getRft` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useQuery | `api.sp_serviceCategories.listActive` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useQuery | `api.sp_governance.getPack` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useQuery | `api.sp_governance.getAuditLogs` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useMutation | `api.sp_governance.generatePack` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useMutation | `api.overlays.applyToProcurement.applyToProcurement` |
| `services/[id]/tabs/AuditTab.tsx` | AuditTab | useMutation | `api.procurements.publish.publish` |
| `services/[id]/tabs/AuditTab.tsx` | GovernanceAuditPanel | useAction | `api.packs.regenerateOutputs.regenerateOutputs` |
| `services/[id]/tabs/AuditTab.tsx` | GovernanceAuditPanel | useQuery | `api.packs.validateIttFields.validateIttFields` |
| `services/[id]/tabs/AwardContractTab.tsx` | AwardContractRedirect | useQuery | `api.award_contract.queries.getAwardByProcurement` |
| `services/[id]/tabs/DebriefTab.tsx` | DebriefTab | useMutation | `api.award_contract.debriefGenerate.debriefGenerate` |
| `services/[id]/tabs/DocumentSetupTab.tsx` | DocumentSetupTab | useQuery | `api.packs.getIttReadiness.getIttReadiness` |
| `services/[id]/tabs/EvaluationCriteriaTab.tsx` | EvaluationCriteriaTab | useQuery | `api.sp_evaluation.getCriteria` |
| `services/[id]/tabs/EvaluationCriteriaTab.tsx` | IttOutstandingCard | useQuery | `api.packs.validateIttFields.validateIttFields` |
| `services/[id]/tabs/OverviewTab.tsx` | OverviewTab | useMutation | `api.sp_procurements.update` |
| `services/[id]/tabs/OverviewTab.tsx` | OverviewTab | useQuery | `api.sp_serviceCategories.listActive` |
| `services/[id]/tabs/OverviewTab.tsx` | OverviewTab | useQuery | `api.sp_evaluation.getCriteria` |
| `services/[id]/tabs/OverviewTab.tsx` | OverviewTab | useMutation | `api.overlays.applyToProcurement.applyToProcurement` |
| `services/[id]/tabs/OverviewTab.tsx` | OverviewTab | useMutation | `api.procurements.publish.publish` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopePricingTab | useQuery | `api.sp_scope.getScope` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopePricingTab | useQuery | `api.sp_pricing.getScheduleWithItems` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopeTabWrapper | useQuery | `api.sp_rft.getRft` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopeTabWrapper | useQuery | `api.sp_procurements.get` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopeTabWrapper | useMutation | `api.sp_scope.writeCompiledScopeFromItems` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopeTabWrapper | useMutation | `api.pricing.generateServicePricing.generateServicePricing` |
| `services/[id]/tabs/ScopePricingTab.tsx` | ScopeTabWrapper | useMutation | `api.scopeBackground.generateBackgroundSection` |
| `services/[id]/tabs/ScopePricingTab.tsx` | PricingTabWrapper | useQuery | `api.sp_procurements.get` |
| `services/[id]/tabs/ScopePricingTab.tsx` | PricingTabWrapper | useQuery | `api.sp_rft.getRft` |
| `services/[id]/tabs/ScopePricingTab.tsx` | PricingTabWrapper | useMutation | `api.pricing.acceptPricing.acceptPricing` |
| `services/[id]/tabs/TenderDocumentsTab.tsx` | TenderDocumentsTab | useMutation | `api.procurements.publish.publish` |
| `services/page.tsx` | services/page.tsx | useQuery | `api.sp_procurements.list` |
| `services/page.tsx` | ServicesDashboard | useQuery | `api.sp_procurements.list` |
| `services/page.tsx` | ServicesDashboard | useQuery | `api.sp_procurements.stats` |
| `services/ContractLifecyclePanel.tsx` | ContractLifecyclePanel | useQuery | `api.sp_contracts.getByProcurement` |
| `services/ContractLifecyclePanel.tsx` | ContractLifecyclePanel | useQuery | `api.sp_contracts.getLegacyAwardDecision` |
| `services/ContractLifecyclePanel.tsx` | ContractLifecyclePanel | useQuery | `api.award_contract.queries.getAwardByProcurement` |
| `services/ContractLifecyclePanel.tsx` | ContractLifecyclePanel | useMutation | `api.sp_contracts.createFromAward` |
| `services/ContractLifecyclePanel.tsx` | ContractRow | useQuery | `api.sp_contracts.getMilestones` |
| `services/ContractLifecyclePanel.tsx` | ContractRow | useQuery | `api.sp_contracts.getKPIs` |
| `services/ContractLifecyclePanel.tsx` | ContractRow | useQuery | `api.sp_contracts.getPerformanceReports` |
| `services/SaqBuilderTab.tsx` | SaqBuilderTab | useQuery | `api.eval.queries.listCampaigns` |
| `services/SaqBuilderTab.tsx` | SaqBuilderTab | useMutation | `api.eval.saqCampaigns.createSaqCampaign` |
| `services/SaqBuilderTab.tsx` | SaqBuilderTab | useQuery | `api.sp_procurements.get` |
| `services/ScopeDocumentTab.tsx` | ScopeDocumentTab | useQuery | `api.sp_rft.getRft` |
| `services/ScopeDocumentTab.tsx` | ScopeDocumentTab | useQuery | `api.sp_procurements.get` |
| `services/SubmissionTracker.tsx` | SubmissionUploadPanel | useQuery | `api.tenderResponses.attachReturnDocuments.getAttachmentUrls` |
| `services/SubmissionTracker.tsx` | SubmissionUploadPanel | useMutation | `api.tenderResponses.attachReturnDocuments.generateReturnUploadUrl` |
| `services/SubmissionTracker.tsx` | SubmissionUploadPanel | useMutation | `api.tenderResponses.attachReturnDocuments.attachDocument` |
| `services/SubmissionTracker.tsx` | SubmissionUploadPanel | useMutation | `api.tenderResponses.attachReturnDocuments.removeDocument` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useQuery | `api.tenderResponses.listByProcurement.listByProcurement` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useQuery | `api.sp_rft.getRft` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useMutation | `api.tenderResponses.registerResponse.registerResponse` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useMutation | `api.tenderResponses.updateStatus.updateStatus` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useMutation | `api.tenderResponses.openSubmissionWindow.openSubmissionWindow` |
| `services/SubmissionTracker.tsx` | SubmissionTracker | useMutation | `api.tenderResponses.closeSubmissionWindow.closeSubmissionWindow` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useMutation | `api.sp_procurements.create` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useMutation | `api.procurementContext.setBuilding.setBuilding` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useMutation | `api.router.routeAndPersist.routeAndPersist` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useQuery | `api.sp_serviceCategories.listActive` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useQuery | `api.buildings.list.list` |
| `services/steps/BasicDetailsStep.tsx` | BasicDetailsStep | useQuery | `api.sp_procurements.recentTitlesSample` |
| `services/steps/EvaluationSetupStep.tsx` | EvaluationSetupStep | useQuery | `api.sp_procurements.get` |
| `services/steps/EvaluationSetupStep.tsx` | EvaluationSetupStep | useQuery | `api.sp_evaluation.getCriteria` |
| `services/steps/EvaluationSetupStep.tsx` | EvaluationSetupStep | useMutation | `api.sp_evaluation.saveCriteria` |
| `services/steps/EvaluationSetupStep.tsx` | EvaluationSetupStep | useAction | `api.ai.suggestEvalCriteria.suggestEvalCriteria` |
| `services/steps/PricingSetupStep.tsx` | PricingSetupStep | useQuery | `api.sp_procurements.get` |
| `services/steps/PricingSetupStep.tsx` | PricingSetupStep | useQuery | `api.sp_pricing.getScheduleWithItems` |
| `services/steps/PricingSetupStep.tsx` | PricingSetupStep | useMutation | `api.sp_pricing.createSchedule` |
| `services/steps/PricingSetupStep.tsx` | PricingSetupStep | useMutation | `api.sp_pricing.bulkAddItems` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useQuery | `api.sp_procurements.get` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useQuery | `api.router.legacyReexports.getDecision` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useQuery | `api.sp_scope.getScope` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useQuery | `api.sp_pricing.getScheduleWithItems` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useQuery | `api.sp_evaluation.getCriteria` |
| `services/steps/ReviewSummaryStep.tsx` | ReviewSummaryStep | useMutation | `api.sp_governance.generatePack` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useQuery | `api.sp_procurements.get` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useQuery | `api.sp_scope.getScope` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useMutation | `api.sp_scope.saveScope` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useMutation | `api.cpv.procurementCpvs.saveConfirmedCpvs` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useQuery | `api.procurementContext.setBuilding.getByProcurement` |
| `services/steps/ScopeGenerationStep.tsx` | ScopeGenerationStep | useAction | `api.ai.generateScopeBlocks.generateScopeBlocks` |
