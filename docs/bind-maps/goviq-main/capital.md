# capital

Auto-derived module: everything under `src/app/capital/` plus `src/components/capital/`.

**App directory:** `src/app/capital/` (7 `.tsx` files) + **components directory:** `src/components/capital/` (39 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["capital/[id]/page.tsx :: CapitalProjectContent"] -->|useQuery| n1["useQuery api.capital.projects.getProject"]
  n0["capital/[id]/page.tsx :: CapitalProjectContent"] -->|useQuery| n2["useQuery api.capital.authorities.listMine"]
  n0["capital/[id]/page.tsx :: CapitalProjectContent"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n4["capital/[id]/page.tsx :: EditProjectForm"] -->|useMutation| n5["useMutation api.capital.projects.updateProject"]
  n6["capital/[id]/page.tsx :: ArchiveButton"] -->|useMutation| n7["useMutation api.capital.projects.archiveProject"]
  n8["capital/design-team/page.tsx :: AddMemberModal"] -->|useQuery| n9["useQuery api.capital.people.listOrganisationPeople"]
  n9 -->|reads/writes| n10[("gov_memberships")]
  n8["capital/design-team/page.tsx :: AddMemberModal"] -->|useMutation| n11["useMutation api.capital.designTeam.addMember"]
  n12["capital/design-team/page.tsx :: FirmMembersSection"] -->|useQuery| n13["useQuery api.capital.designTeam.listMembers"]
  n12["capital/design-team/page.tsx :: FirmMembersSection"] -->|useQuery| n9["useQuery api.capital.people.listOrganisationPeople"]
  n9 -->|reads/writes| n10[("gov_memberships")]
  n14["capital/design-team/page.tsx :: FirmCard"] -->|useMutation| n15["useMutation api.capital.designTeam.archiveFirm"]
  n16["capital/design-team/page.tsx :: NewFirmModal"] -->|useMutation| n17["useMutation api.capital.designTeam.createFirm"]
  n18["capital/design-team/page.tsx :: AuthorityDesignTeamContent"] -->|useQuery| n19["useQuery api.capital.designTeam.listFirms"]
  n20["capital/design-team/page.tsx :: DesignTeamPageContent"] -->|useQuery| n2["useQuery api.capital.authorities.listMine"]
  n21["capital/intake/page.tsx :: IntakeContent"] -->|useQuery| n2["useQuery api.capital.authorities.listMine"]
  n21["capital/intake/page.tsx :: IntakeContent"] -->|useQuery| n22["useQuery api.capital.shifSubmissions.listFacilityTypes"]
  n21["capital/intake/page.tsx :: IntakeContent"] -->|useMutation| n23["useMutation api.capital.ideaIntake.submitIdea"]
  n24["capital/new/page.tsx :: CapitalNewProjectContent"] -->|useQuery| n25["useQuery api.capital.projects.getInitiationOptions"]
  n24["capital/new/page.tsx :: CapitalNewProjectContent"] -->|useMutation| n26["useMutation api.capital.projects.createProject"]
  n27["capital/page.tsx :: CapitalProjectsContent"] -->|useQuery| n2["useQuery api.capital.authorities.listMine"]
  n28["capital/page.tsx :: ProjectTable"] -->|useQuery| n29["useQuery api.capital.projects.listProjects"]
  n30["capital/page.tsx :: SeedDemoButton"] -->|useMutation| n31["useMutation api.capital.seed.demoSligo.seedDemoForCaller"]
  n31 -.->|triggers| n32["capital.seed.demoSligo.seedSligoDemo"]
  n33["capital/ApprovalSignOffThread.tsx :: ApprovalSignOffActions"] -->|useMutation| n34["useMutation api.capital.approvals.signApproval"]
  n34 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n33["capital/ApprovalSignOffThread.tsx :: ApprovalSignOffActions"] -->|useMutation| n36["useMutation api.capital.approvals.rejectApproval"]
  n36 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n33["capital/ApprovalSignOffThread.tsx :: ApprovalSignOffActions"] -->|useMutation| n37["useMutation api.capital.approvalMessages.postMessage"]
  n38["capital/AuditSection.tsx :: AuditSection"] -->|useQuery| n39["useQuery api.capital.auditExport.getIntegrityStatus"]
  n38["capital/AuditSection.tsx :: AuditSection"] -->|useQuery| n40["useQuery api.capital.auditExport.listAuditExportBundles"]
  n38["capital/AuditSection.tsx :: AuditSection"] -->|useQuery| n41["useQuery api.capital.auditExport.getAuditFeed"]
  n38["capital/AuditSection.tsx :: AuditSection"] -->|useQuery| n42["useQuery api.capital.auditExport.getDecisionPackData"]
  n38["capital/AuditSection.tsx :: AuditSection"] -->|useAction| n43["useAction api.capital.auditExport.exportAuditChain"]
  n43 -.->|triggers| n44["capital.auditExport.gatherProjectAuditEvents"]
  n43 -.->|triggers| n45["capital.auditExport.recordAuditExport"]
  n46["capital/CapitalAdvanceReadinessCard.tsx :: RecordPlanningConsentModal"] -->|useMutation| n47["useMutation api.capital.stageRecords.recordPlanningConsentRef"]
  n48["capital/CapitalAdvanceReadinessCard.tsx :: CapitalAdvanceReadinessCard"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n49["capital/CapitalApprovalMatrix.tsx :: CapitalApprovalMatrix"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n49["capital/CapitalApprovalMatrix.tsx :: CapitalApprovalMatrix"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n49["capital/CapitalApprovalMatrix.tsx :: CapitalApprovalMatrix"] -->|useQuery| n51["useQuery api.capital.thresholds.resolveForProject"]
  n52["capital/CapitalBusinessCaseWizard.tsx :: CapitalBusinessCaseWizard"] -->|useQuery| n53["useQuery api.capital.businessCases.getForProject"]
  n52["capital/CapitalBusinessCaseWizard.tsx :: CapitalBusinessCaseWizard"] -->|useMutation| n54["useMutation api.capital.businessCases.createBusinessCase"]
  n52["capital/CapitalBusinessCaseWizard.tsx :: CapitalBusinessCaseWizard"] -->|useMutation| n55["useMutation api.capital.businessCases.updateSection"]
  n52["capital/CapitalBusinessCaseWizard.tsx :: CapitalBusinessCaseWizard"] -->|useMutation| n56["useMutation api.capital.businessCases.markComplete"]
  n57["capital/CapitalChecksheetPanel.tsx :: CapitalChecksheetPanel"] -->|useQuery| n58["useQuery api.capital.checksheets.getChecksheetForProject"]
  n57["capital/CapitalChecksheetPanel.tsx :: CapitalChecksheetPanel"] -->|useMutation| n59["useMutation api.capital.checksheets.createChecksheet"]
  n57["capital/CapitalChecksheetPanel.tsx :: CapitalChecksheetPanel"] -->|useMutation| n60["useMutation api.capital.checksheets.setChecksheetItem"]
  n57["capital/CapitalChecksheetPanel.tsx :: CapitalChecksheetPanel"] -->|useMutation| n61["useMutation api.capital.checksheets.issueChecksheetToEm"]
  n62["capital/CapitalGateChecklist.tsx :: CapitalGateChecklist"] -->|useQuery| n63["useQuery api.capital.stageRecords.getArtefactGateForStage"]
  n62["capital/CapitalGateChecklist.tsx :: CapitalGateChecklist"] -->|useQuery| n63["useQuery api.capital.stageRecords.getArtefactGateForStage"]
  n64["capital/CapitalGateResponseActions.tsx :: SubmitGateResponseModal"] -->|useMutation| n65["useMutation api.capital.gateResponses.submitForReview"]
  n66["capital/CapitalGateResponseActions.tsx :: ReviewGateResponseActions"] -->|useMutation| n67["useMutation api.capital.gateResponses.acceptResponse"]
  n67 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n66["capital/CapitalGateResponseActions.tsx :: ReviewGateResponseActions"] -->|useMutation| n68["useMutation api.capital.gateResponses.returnResponse"]
  n68 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n69["capital/CapitalGatesPanel.tsx :: StageGateDetailPanel"] -->|useMutation| n70["useMutation api.capital.stageRecords.returnStageRecord"]
  n70 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n69["capital/CapitalGatesPanel.tsx :: StageGateDetailPanel"] -->|useMutation| n71["useMutation api.capital.stageRecords.submitStageRecord"]
  n72["capital/CapitalGatesPanel.tsx :: CapitalGatesPanel"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n72["capital/CapitalGatesPanel.tsx :: CapitalGatesPanel"] -->|useMutation| n73["useMutation api.capital.stageRecords.approveStageRecord"]
  n73 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n74["capital/CapitalPendingSignOff.tsx :: CapitalPendingSignOffPanel"] -->|useQuery| n75["useQuery api.capital.approvalMessages.getSignOffInbox"]
  n74["capital/CapitalPendingSignOff.tsx :: CapitalPendingSignOffPanel"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n74["capital/CapitalPendingSignOff.tsx :: CapitalPendingSignOffPanel"] -->|useQuery| n76["useQuery api.capital.artefactsDraft.listForProject"]
  n77["capital/CapitalShifBuilderPanel.tsx :: CapitalShifBuilderPanel"] -->|useQuery| n78["useQuery api.capital.shifSubmissions.getSubmissionForProject"]
  n77["capital/CapitalShifBuilderPanel.tsx :: CapitalShifBuilderPanel"] -->|useQuery| n22["useQuery api.capital.shifSubmissions.listFacilityTypes"]
  n77["capital/CapitalShifBuilderPanel.tsx :: CapitalShifBuilderPanel"] -->|useMutation| n79["useMutation api.capital.shifSubmissions.createSubmission"]
  n77["capital/CapitalShifBuilderPanel.tsx :: CapitalShifBuilderPanel"] -->|useMutation| n80["useMutation api.capital.shifSubmissions.updateSubmission"]
  n77["capital/CapitalShifBuilderPanel.tsx :: CapitalShifBuilderPanel"] -->|useMutation| n81["useMutation api.capital.shifSubmissions.markPrerequisitesReady"]
  n82["capital/CapitalShifFormBuilder.tsx :: CapitalShifFormBuilder"] -->|useQuery| n78["useQuery api.capital.shifSubmissions.getSubmissionForProject"]
  n82["capital/CapitalShifFormBuilder.tsx :: CapitalShifFormBuilder"] -->|useMutation| n83["useMutation api.capital.shifSubmissions.saveShifForm"]
  n82["capital/CapitalShifFormBuilder.tsx :: CapitalShifFormBuilder"] -->|useAction| n84["useAction api.capital.shifFormGenerate.generateShifFormDocx"]
  n84 -.->|triggers| n85["capital.shifSubmissions.getSubmissionRowInternal"]
  n84 -.->|triggers| n86["capital.shifSubmissions.recordShifDocx"]
  n87["capital/CapitalSoaBuilderPanel.tsx :: CapitalSoaBuilderPanel"] -->|useQuery| n88["useQuery api.capital.soaBuilder.getSoaForProject"]
  n87["capital/CapitalSoaBuilderPanel.tsx :: CapitalSoaBuilderPanel"] -->|useMutation| n89["useMutation api.capital.soaBuilder.generateSoa"]
  n87["capital/CapitalSoaBuilderPanel.tsx :: CapitalSoaBuilderPanel"] -->|useMutation| n90["useMutation api.capital.soaBuilder.updateSoaBrief"]
  n87["capital/CapitalSoaBuilderPanel.tsx :: CapitalSoaBuilderPanel"] -->|useMutation| n91["useMutation api.capital.soaBuilder.updateSoaLine"]
  n87["capital/CapitalSoaBuilderPanel.tsx :: CapitalSoaBuilderPanel"] -->|useMutation| n92["useMutation api.capital.soaBuilder.markSoaComplete"]
  n93["capital/CapitalStageGateThread.tsx :: CapitalStageGateThread"] -->|useQuery| n94["useQuery api.capital.gateResponses.listStageGateMessages"]
  n95["capital/ChangeOrderInboxPanel.tsx :: ChangeOrderInboxPanel"] -->|useQuery| n96["useQuery api.capital.changeOrderReads.listInboxForRole"]
  n97["capital/EvidenceSection.tsx :: EvidenceSection"] -->|useQuery| n98["useQuery api.capital.evidence.listForProject"]
  n99["capital/EvidenceSection.tsx :: EvidenceForm"] -->|useMutation| n100["useMutation api.capital.evidence.createEvidenceItem"]
  n99["capital/EvidenceSection.tsx :: EvidenceForm"] -->|useMutation| n101["useMutation api.capital.evidence.generateEvidenceUploadUrl"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useQuery| n103["useQuery api.capital.handover.listForProject"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useQuery| n1["useQuery api.capital.projects.getProject"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useQuery| n105["useQuery api.capital.handover.getPpr"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useMutation| n106["useMutation api.capital.handover.seedHandoverChecklist"]
  n102["capital/HandoverSection.tsx :: HandoverSection"] -->|useMutation| n107["useMutation api.capital.handover.updateHandoverItem"]
  n108["capital/HandoverSection.tsx :: DefectsRegisterCard"] -->|useMutation| n109["useMutation api.capital.handover.updateDefectStatus"]
  n110["capital/HandoverSection.tsx :: DefectForm"] -->|useMutation| n111["useMutation api.capital.handover.createDefect"]
  n112["capital/HandoverSection.tsx :: PprCard"] -->|useMutation| n113["useMutation api.capital.handover.submitPpr"]
  n114["capital/HandoverSection.tsx :: HandoverForm"] -->|useMutation| n115["useMutation api.capital.handover.addHandoverItem"]
  n116["capital/ShifSection.tsx :: ShifSection"] -->|useQuery| n117["useQuery api.capital.shif.getShifForProject"]
  n118["capital/ShifSection.tsx :: ShifForm"] -->|useMutation| n119["useMutation api.capital.shif.upsertShifAssessment"]
  n120["capital/capitalApprovalActions.tsx :: RequestApprovalModal"] -->|useMutation| n121["useMutation api.capital.approvals.requestApproval"]
  n122["capital/capitalApprovalActions.tsx :: SignApprovalModal"] -->|useMutation| n34["useMutation api.capital.approvals.signApproval"]
  n34 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n123["capital/capitalApprovalActions.tsx :: RejectApprovalModal"] -->|useMutation| n36["useMutation api.capital.approvals.rejectApproval"]
  n36 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n124["capital/capitalApprovalActions.tsx :: WithdrawApprovalModal"] -->|useMutation| n125["useMutation api.capital.approvals.withdrawApproval"]
  n126["capital/capitalApprovalActions.tsx :: ApprovalsSection"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n127["capital/capitalArtefacts.tsx :: CapitalUploadArtefactModal"] -->|useMutation| n128["useMutation api.files.generateUploadUrl.generateUploadUrl"]
  n127["capital/capitalArtefacts.tsx :: CapitalUploadArtefactModal"] -->|useMutation| n129["useMutation api.capital.artefactsDraft.createDraftArtefact"]
  n130["capital/capitalArtefacts.tsx :: ArtefactsSection"] -->|useQuery| n76["useQuery api.capital.artefactsDraft.listForProject"]
  n130["capital/capitalArtefacts.tsx :: ArtefactsSection"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n131["capital/capitalChangeOrderModals.tsx :: RequestChangeOrderModal"] -->|useMutation| n132["useMutation api.capital.changeOrders.requestChangeOrderApproval"]
  n132 -.->|triggers| n133["gov.webhooks.emit"]
  n134["capital/capitalChangeOrderModals.tsx :: SignChangeOrderModal"] -->|useMutation| n135["useMutation api.capital.changeOrderSignoff.signChangeOrderApproval"]
  n135 -.->|triggers| n133["gov.webhooks.emit"]
  n136["capital/capitalChangeOrderModals.tsx :: RejectChangeOrderModal"] -->|useMutation| n137["useMutation api.capital.changeOrderSignoff.rejectChangeOrderApproval"]
  n137 -.->|triggers| n133["gov.webhooks.emit"]
  n138["capital/capitalChangeOrderModals.tsx :: WithdrawChangeOrderModal"] -->|useMutation| n139["useMutation api.capital.changeOrderSignoff.withdrawChangeOrderApproval"]
  n139 -.->|triggers| n133["gov.webhooks.emit"]
  n140["capital/capitalChangeOrderModals.tsx :: GenerateChangeOrderFormButton"] -->|useAction| n141["useAction api.capital.changeOrderForm.generateChangeOrderForm"]
  n141 -.->|triggers| n142["capital.changeOrderFormPersist.getChangeOrderForForm"]
  n141 -.->|triggers| n143["capital.changeOrderFormPersist.recordChangeOrderForm"]
  n144["capital/capitalChangeOrderModals.tsx :: ChangeOrdersForVariation"] -->|useQuery| n145["useQuery api.capital.changeOrderReads.listForVariation"]
  n144["capital/capitalChangeOrderModals.tsx :: ChangeOrdersForVariation"] -->|useQuery| n145["useQuery api.capital.changeOrderReads.listForVariation"]
  n146["capital/capitalContractExecution.tsx :: EotRowActions"] -->|useMutation| n147["useMutation api.capital.eots.grantEot"]
  n146["capital/capitalContractExecution.tsx :: EotRowActions"] -->|useMutation| n148["useMutation api.capital.eots.rejectEot"]
  n146["capital/capitalContractExecution.tsx :: EotRowActions"] -->|useMutation| n149["useMutation api.capital.eots.withdrawEot"]
  n150["capital/capitalContractExecution.tsx :: RequestEotModal"] -->|useMutation| n151["useMutation api.capital.eots.requestEot"]
  n152["capital/capitalContractExecution.tsx :: EotsSection"] -->|useQuery| n153["useQuery api.capital.eots.listForContract"]
  n154["capital/capitalContractExecution.tsx :: CreateDraftPaymentModal"] -->|useMutation| n155["useMutation api.capital.payments.createDraftPayment"]
  n156["capital/capitalContractExecution.tsx :: PaymentsSection"] -->|useQuery| n157["useQuery api.capital.payments.listForContract"]
  n156["capital/capitalContractExecution.tsx :: PaymentsSection"] -->|useMutation| n158["useMutation api.capital.payments.certifyPayment"]
  n156["capital/capitalContractExecution.tsx :: PaymentsSection"] -->|useMutation| n159["useMutation api.capital.payments.recordPaymentPaid"]
  n160["capital/capitalContractExecution.tsx :: WorksProgrammeSection"] -->|useQuery| n161["useQuery api.capital.worksProgramme.listForContract"]
  n160["capital/capitalContractExecution.tsx :: WorksProgrammeSection"] -->|useMutation| n162["useMutation api.capital.worksProgramme.acceptProgramme"]
  n160["capital/capitalContractExecution.tsx :: WorksProgrammeSection"] -->|useMutation| n163["useMutation api.capital.worksProgramme.rejectProgramme"]
  n164["capital/capitalDesignTeamPanel.tsx :: AssignFirmModal"] -->|useQuery| n19["useQuery api.capital.designTeam.listFirms"]
  n164["capital/capitalDesignTeamPanel.tsx :: AssignFirmModal"] -->|useMutation| n165["useMutation api.capital.designTeam.assignFirmToProject"]
  n166["capital/capitalDesignTeamPanel.tsx :: DesignTeamPanel"] -->|useQuery| n167["useQuery api.capital.designTeam.listProjectAssignments"]
  n168["capital/capitalProgrammeModal.tsx :: SubmitProgrammeModal"] -->|useMutation| n169["useMutation api.capital.worksProgramme.submitProgramme"]
  n170["capital/capitalProjectSections.tsx :: ProjectOverviewSection"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n170["capital/capitalProjectSections.tsx :: ProjectOverviewSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n171["capital/capitalProjectSections.tsx :: StageRecordsSection"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n172["capital/capitalProjectSections.tsx :: ApprovalsSection"] -->|useQuery| n3["useQuery api.capital.approvals.listForProject"]
  n173["capital/capitalProjectSections.tsx :: ContractSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n174["capital/capitalProjectSections.tsx :: ContractVariations"] -->|useQuery| n175["useQuery api.capital.variations.listForContract"]
  n176["capital/capitalProjectSections.tsx :: ProcurementSection"] -->|useQuery| n177["useQuery api.capital.routerIntegration.inspectS5RouterGate"]
  n176["capital/capitalProjectSections.tsx :: ProcurementSection"] -->|useMutation| n178["useMutation api.capital.routerIntegration.recordContractAward"]
  n179["capital/capitalProjectSections.tsx :: CostRiskSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n180["capital/capitalProjectSections.tsx :: RiskRegisterCard"] -->|useQuery| n181["useQuery api.capital.riskRegister.listForContract"]
  n182["capital/capitalProjectSections.tsx :: CreateRiskForm"] -->|useMutation| n183["useMutation api.capital.riskRegister.createRisk"]
  n184["capital/capitalProjectSections.tsx :: DesignSection"] -->|useQuery| n167["useQuery api.capital.designTeam.listProjectAssignments"]
  n185["capital/capitalRiskRegister.tsx :: AddRiskModal"] -->|useMutation| n183["useMutation api.capital.riskRegister.createRisk"]
  n186["capital/capitalRiskRegister.tsx :: EditRiskModal"] -->|useMutation| n187["useMutation api.capital.riskRegister.updateRisk"]
  n188["capital/capitalRiskRegister.tsx :: RiskRegisterCard"] -->|useMutation| n189["useMutation api.capital.riskRegister.reviewRisk"]
  n188["capital/capitalRiskRegister.tsx :: RiskRegisterCard"] -->|useQuery| n181["useQuery api.capital.riskRegister.listForContract"]
  n190["capital/capitalRiskRegister.tsx :: CostRiskSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n191["capital/capitalStageActions.tsx :: CreateStageModal"] -->|useQuery| n192["useQuery api.capital.people.listAuthorityPeople"]
  n191["capital/capitalStageActions.tsx :: CreateStageModal"] -->|useMutation| n193["useMutation api.capital.stageRecords.createStageRecord"]
  n194["capital/capitalStageActions.tsx :: SubmitStageWithNoteModal"] -->|useMutation| n71["useMutation api.capital.stageRecords.submitStageRecord"]
  n195["capital/capitalStageActions.tsx :: SubmitS6BModal"] -->|useMutation| n71["useMutation api.capital.stageRecords.submitStageRecord"]
  n196["capital/capitalStageActions.tsx :: ReturnStageModal"] -->|useMutation| n70["useMutation api.capital.stageRecords.returnStageRecord"]
  n70 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n197["capital/capitalStageActions.tsx :: StagesSection"] -->|useQuery| n50["useQuery api.capital.stageRecords.listForProject"]
  n197["capital/capitalStageActions.tsx :: StagesSection"] -->|useMutation| n73["useMutation api.capital.stageRecords.approveStageRecord"]
  n73 -.->|triggers| n35["email.sendEmail.sendEmail"]
  n198["capital/capitalVariationActions.tsx :: ContractVariationsTable"] -->|useQuery| n175["useQuery api.capital.variations.listForContract"]
  n199["capital/capitalVariationActions.tsx :: ContractSection"] -->|useQuery| n104["useQuery api.capital.contracts.listForProject"]
  n200["capital/capitalVariationModals.tsx :: RequestVariationModal"] -->|useMutation| n201["useMutation api.capital.variations.requestVariation"]
  n201 -.->|triggers| n202["analytics.variationIntelligence.mutations.recordVariationPrediction"]
  n203["capital/capitalVariationModals.tsx :: IssuePIModal"] -->|useMutation| n204["useMutation api.capital.variations.issuePI"]
  n205["capital/capitalVariationModals.tsx :: RecordQuoteModal"] -->|useMutation| n206["useMutation api.capital.variations.recordQuote"]
  n207["capital/capitalVariationModals.tsx :: RecordDtEvaluationModal"] -->|useMutation| n208["useMutation api.capital.variations.recordDtEvaluation"]
  n209["capital/capitalVariationModals.tsx :: IssueErDeterminationModal"] -->|useMutation| n210["useMutation api.capital.variations.issueErDetermination"]
  n210 -.->|triggers| n202["analytics.variationIntelligence.mutations.recordVariationPrediction"]
  n210 -.->|triggers| n211["analytics.variationIntelligence.contractorBenchmarks.updateContractorBenchmark"]
  n212["capital/capitalVariationModals.tsx :: WithdrawVariationModal"] -->|useMutation| n213["useMutation api.capital.variations.withdrawVariation"]
  n214["capital/capitalVariationModals.tsx :: RejectVariationModal"] -->|useMutation| n215["useMutation api.capital.variations.rejectVariation"]
  n216["capital/capitalVariationModals.tsx :: DiscussionThread"] -->|useMutation| n217["useMutation api.capital.variationDiscussions.postMessage"]
  n216["capital/capitalVariationModals.tsx :: DiscussionThread"] -->|useMutation| n218["useMutation api.capital.variationDiscussions.resolveDiscussion"]
  n219["capital/capitalVariationModals.tsx :: VariationDiscussionsPanel"] -->|useQuery| n220["useQuery api.capital.variationDiscussions.listForVariation"]
  n219["capital/capitalVariationModals.tsx :: VariationDiscussionsPanel"] -->|useMutation| n221["useMutation api.capital.variationDiscussions.openDiscussion"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `capital.projects.getProject` | query | — | — |
| `capital.authorities.listMine` | query | — | — |
| `capital.approvals.listForProject` | query | — | — |
| `capital.projects.updateProject` | mutation | — | — |
| `capital.projects.archiveProject` | mutation | — | — |
| `capital.people.listOrganisationPeople` | query | `gov_memberships` | — |
| `capital.designTeam.addMember` | mutation | — | — |
| `capital.designTeam.listMembers` | query | — | — |
| `capital.designTeam.archiveFirm` | mutation | — | — |
| `capital.designTeam.createFirm` | mutation | — | — |
| `capital.designTeam.listFirms` | query | — | — |
| `capital.shifSubmissions.listFacilityTypes` | query | — | — |
| `capital.ideaIntake.submitIdea` | mutation | — | — |
| `capital.projects.getInitiationOptions` | query | — | — |
| `capital.projects.createProject` | mutation | — | — |
| `capital.projects.listProjects` | query | — | — |
| `capital.seed.demoSligo.seedDemoForCaller` | mutation | — | `capital.seed.demoSligo.seedSligoDemo` |
| `capital.approvals.signApproval` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.approvals.rejectApproval` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.approvalMessages.postMessage` | mutation | — | — |
| `capital.auditExport.getIntegrityStatus` | query | — | — |
| `capital.auditExport.listAuditExportBundles` | query | — | — |
| `capital.auditExport.getAuditFeed` | query | — | — |
| `capital.auditExport.getDecisionPackData` | query | — | — |
| `capital.auditExport.exportAuditChain` | action | — | `capital.auditExport.gatherProjectAuditEvents`, `capital.auditExport.recordAuditExport` |
| `capital.stageRecords.recordPlanningConsentRef` | mutation | — | — |
| `capital.stageRecords.listForProject` | query | — | — |
| `capital.thresholds.resolveForProject` | query | — | — |
| `capital.businessCases.getForProject` | query | — | — |
| `capital.businessCases.createBusinessCase` | mutation | — | — |
| `capital.businessCases.updateSection` | mutation | — | — |
| `capital.businessCases.markComplete` | mutation | — | — |
| `capital.checksheets.getChecksheetForProject` | query | — | — |
| `capital.checksheets.createChecksheet` | mutation | — | — |
| `capital.checksheets.setChecksheetItem` | mutation | — | — |
| `capital.checksheets.issueChecksheetToEm` | mutation | — | — |
| `capital.stageRecords.getArtefactGateForStage` | query | — | — |
| `capital.gateResponses.submitForReview` | mutation | — | — |
| `capital.gateResponses.acceptResponse` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.gateResponses.returnResponse` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.stageRecords.returnStageRecord` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.stageRecords.submitStageRecord` | mutation | — | — |
| `capital.stageRecords.approveStageRecord` | mutation | — | `email.sendEmail.sendEmail` |
| `capital.approvalMessages.getSignOffInbox` | query | — | — |
| `capital.artefactsDraft.listForProject` | query | — | — |
| `capital.shifSubmissions.getSubmissionForProject` | query | — | — |
| `capital.shifSubmissions.createSubmission` | mutation | — | — |
| `capital.shifSubmissions.updateSubmission` | mutation | — | — |
| `capital.shifSubmissions.markPrerequisitesReady` | mutation | — | — |
| `capital.shifSubmissions.saveShifForm` | mutation | — | — |
| `capital.shifFormGenerate.generateShifFormDocx` | action | — | `capital.shifSubmissions.getSubmissionRowInternal`, `capital.shifSubmissions.recordShifDocx` |
| `capital.soaBuilder.getSoaForProject` | query | — | — |
| `capital.soaBuilder.generateSoa` | mutation | — | — |
| `capital.soaBuilder.updateSoaBrief` | mutation | — | — |
| `capital.soaBuilder.updateSoaLine` | mutation | — | — |
| `capital.soaBuilder.markSoaComplete` | mutation | — | — |
| `capital.gateResponses.listStageGateMessages` | query | — | — |
| `capital.changeOrderReads.listInboxForRole` | query | — | — |
| `capital.evidence.listForProject` | query | — | — |
| `capital.evidence.createEvidenceItem` | mutation | — | — |
| `capital.evidence.generateEvidenceUploadUrl` | mutation | — | — |
| `capital.handover.listForProject` | query | — | — |
| `capital.contracts.listForProject` | query | — | — |
| `capital.handover.getPpr` | query | — | — |
| `capital.handover.seedHandoverChecklist` | mutation | — | — |
| `capital.handover.updateHandoverItem` | mutation | — | — |
| `capital.handover.updateDefectStatus` | mutation | — | — |
| `capital.handover.createDefect` | mutation | — | — |
| `capital.handover.submitPpr` | mutation | — | — |
| `capital.handover.addHandoverItem` | mutation | — | — |
| `capital.shif.getShifForProject` | query | — | — |
| `capital.shif.upsertShifAssessment` | mutation | — | — |
| `capital.approvals.requestApproval` | mutation | — | — |
| `capital.approvals.withdrawApproval` | mutation | — | — |
| `files.generateUploadUrl.generateUploadUrl` | mutation | — | — |
| `capital.artefactsDraft.createDraftArtefact` | mutation | — | — |
| `capital.changeOrders.requestChangeOrderApproval` | mutation | — | `gov.webhooks.emit` |
| `capital.changeOrderSignoff.signChangeOrderApproval` | mutation | — | `gov.webhooks.emit` |
| `capital.changeOrderSignoff.rejectChangeOrderApproval` | mutation | — | `gov.webhooks.emit` |
| `capital.changeOrderSignoff.withdrawChangeOrderApproval` | mutation | — | `gov.webhooks.emit` |
| `capital.changeOrderForm.generateChangeOrderForm` | action | — | `capital.changeOrderFormPersist.getChangeOrderForForm`, `capital.changeOrderFormPersist.recordChangeOrderForm` |
| `capital.changeOrderReads.listForVariation` | query | — | — |
| `capital.eots.grantEot` | mutation | — | — |
| `capital.eots.rejectEot` | mutation | — | — |
| `capital.eots.withdrawEot` | mutation | — | — |
| `capital.eots.requestEot` | mutation | — | — |
| `capital.eots.listForContract` | query | — | — |
| `capital.payments.createDraftPayment` | mutation | — | — |
| `capital.payments.listForContract` | query | — | — |
| `capital.payments.certifyPayment` | mutation | — | — |
| `capital.payments.recordPaymentPaid` | mutation | — | — |
| `capital.worksProgramme.listForContract` | query | — | — |
| `capital.worksProgramme.acceptProgramme` | mutation | — | — |
| `capital.worksProgramme.rejectProgramme` | mutation | — | — |
| `capital.designTeam.assignFirmToProject` | mutation | — | — |
| `capital.designTeam.listProjectAssignments` | query | — | — |
| `capital.worksProgramme.submitProgramme` | mutation | — | — |
| `capital.variations.listForContract` | query | — | — |
| `capital.routerIntegration.inspectS5RouterGate` | query | — | — |
| `capital.routerIntegration.recordContractAward` | mutation | — | — |
| `capital.riskRegister.listForContract` | query | — | — |
| `capital.riskRegister.createRisk` | mutation | — | — |
| `capital.riskRegister.updateRisk` | mutation | — | — |
| `capital.riskRegister.reviewRisk` | mutation | — | — |
| `capital.people.listAuthorityPeople` | query | — | — |
| `capital.stageRecords.createStageRecord` | mutation | — | — |
| `capital.variations.requestVariation` | mutation | — | `analytics.variationIntelligence.mutations.recordVariationPrediction` |
| `capital.variations.issuePI` | mutation | — | — |
| `capital.variations.recordQuote` | mutation | — | — |
| `capital.variations.recordDtEvaluation` | mutation | — | — |
| `capital.variations.issueErDetermination` | mutation | — | `analytics.variationIntelligence.mutations.recordVariationPrediction`, `analytics.variationIntelligence.contractorBenchmarks.updateContractorBenchmark` |
| `capital.variations.withdrawVariation` | mutation | — | — |
| `capital.variations.rejectVariation` | mutation | — | — |
| `capital.variationDiscussions.postMessage` | mutation | — | — |
| `capital.variationDiscussions.resolveDiscussion` | mutation | — | — |
| `capital.variationDiscussions.listForVariation` | query | — | — |
| `capital.variationDiscussions.openDiscussion` | mutation | — | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `capital/[id]/page.tsx` | CapitalProjectContent | useQuery | `api.capital.projects.getProject` |
| `capital/[id]/page.tsx` | CapitalProjectContent | useQuery | `api.capital.authorities.listMine` |
| `capital/[id]/page.tsx` | CapitalProjectContent | useQuery | `api.capital.approvals.listForProject` |
| `capital/[id]/page.tsx` | EditProjectForm | useMutation | `api.capital.projects.updateProject` |
| `capital/[id]/page.tsx` | ArchiveButton | useMutation | `api.capital.projects.archiveProject` |
| `capital/design-team/page.tsx` | AddMemberModal | useQuery | `api.capital.people.listOrganisationPeople` |
| `capital/design-team/page.tsx` | AddMemberModal | useMutation | `api.capital.designTeam.addMember` |
| `capital/design-team/page.tsx` | FirmMembersSection | useQuery | `api.capital.designTeam.listMembers` |
| `capital/design-team/page.tsx` | FirmMembersSection | useQuery | `api.capital.people.listOrganisationPeople` |
| `capital/design-team/page.tsx` | FirmCard | useMutation | `api.capital.designTeam.archiveFirm` |
| `capital/design-team/page.tsx` | NewFirmModal | useMutation | `api.capital.designTeam.createFirm` |
| `capital/design-team/page.tsx` | AuthorityDesignTeamContent | useQuery | `api.capital.designTeam.listFirms` |
| `capital/design-team/page.tsx` | DesignTeamPageContent | useQuery | `api.capital.authorities.listMine` |
| `capital/intake/page.tsx` | IntakeContent | useQuery | `api.capital.authorities.listMine` |
| `capital/intake/page.tsx` | IntakeContent | useQuery | `api.capital.shifSubmissions.listFacilityTypes` |
| `capital/intake/page.tsx` | IntakeContent | useMutation | `api.capital.ideaIntake.submitIdea` |
| `capital/new/page.tsx` | CapitalNewProjectContent | useQuery | `api.capital.projects.getInitiationOptions` |
| `capital/new/page.tsx` | CapitalNewProjectContent | useMutation | `api.capital.projects.createProject` |
| `capital/page.tsx` | CapitalProjectsContent | useQuery | `api.capital.authorities.listMine` |
| `capital/page.tsx` | ProjectTable | useQuery | `api.capital.projects.listProjects` |
| `capital/page.tsx` | SeedDemoButton | useMutation | `api.capital.seed.demoSligo.seedDemoForCaller` |
| `capital/ApprovalSignOffThread.tsx` | ApprovalSignOffActions | useMutation | `api.capital.approvals.signApproval` |
| `capital/ApprovalSignOffThread.tsx` | ApprovalSignOffActions | useMutation | `api.capital.approvals.rejectApproval` |
| `capital/ApprovalSignOffThread.tsx` | ApprovalSignOffActions | useMutation | `api.capital.approvalMessages.postMessage` |
| `capital/AuditSection.tsx` | AuditSection | useQuery | `api.capital.auditExport.getIntegrityStatus` |
| `capital/AuditSection.tsx` | AuditSection | useQuery | `api.capital.auditExport.listAuditExportBundles` |
| `capital/AuditSection.tsx` | AuditSection | useQuery | `api.capital.auditExport.getAuditFeed` |
| `capital/AuditSection.tsx` | AuditSection | useQuery | `api.capital.auditExport.getDecisionPackData` |
| `capital/AuditSection.tsx` | AuditSection | useAction | `api.capital.auditExport.exportAuditChain` |
| `capital/CapitalAdvanceReadinessCard.tsx` | RecordPlanningConsentModal | useMutation | `api.capital.stageRecords.recordPlanningConsentRef` |
| `capital/CapitalAdvanceReadinessCard.tsx` | CapitalAdvanceReadinessCard | useQuery | `api.capital.approvals.listForProject` |
| `capital/CapitalApprovalMatrix.tsx` | CapitalApprovalMatrix | useQuery | `api.capital.approvals.listForProject` |
| `capital/CapitalApprovalMatrix.tsx` | CapitalApprovalMatrix | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/CapitalApprovalMatrix.tsx` | CapitalApprovalMatrix | useQuery | `api.capital.thresholds.resolveForProject` |
| `capital/CapitalBusinessCaseWizard.tsx` | CapitalBusinessCaseWizard | useQuery | `api.capital.businessCases.getForProject` |
| `capital/CapitalBusinessCaseWizard.tsx` | CapitalBusinessCaseWizard | useMutation | `api.capital.businessCases.createBusinessCase` |
| `capital/CapitalBusinessCaseWizard.tsx` | CapitalBusinessCaseWizard | useMutation | `api.capital.businessCases.updateSection` |
| `capital/CapitalBusinessCaseWizard.tsx` | CapitalBusinessCaseWizard | useMutation | `api.capital.businessCases.markComplete` |
| `capital/CapitalChecksheetPanel.tsx` | CapitalChecksheetPanel | useQuery | `api.capital.checksheets.getChecksheetForProject` |
| `capital/CapitalChecksheetPanel.tsx` | CapitalChecksheetPanel | useMutation | `api.capital.checksheets.createChecksheet` |
| `capital/CapitalChecksheetPanel.tsx` | CapitalChecksheetPanel | useMutation | `api.capital.checksheets.setChecksheetItem` |
| `capital/CapitalChecksheetPanel.tsx` | CapitalChecksheetPanel | useMutation | `api.capital.checksheets.issueChecksheetToEm` |
| `capital/CapitalGateChecklist.tsx` | CapitalGateChecklist | useQuery | `api.capital.stageRecords.getArtefactGateForStage` |
| `capital/CapitalGateChecklist.tsx` | CapitalGateChecklist | useQuery | `api.capital.stageRecords.getArtefactGateForStage` |
| `capital/CapitalGateResponseActions.tsx` | SubmitGateResponseModal | useMutation | `api.capital.gateResponses.submitForReview` |
| `capital/CapitalGateResponseActions.tsx` | ReviewGateResponseActions | useMutation | `api.capital.gateResponses.acceptResponse` |
| `capital/CapitalGateResponseActions.tsx` | ReviewGateResponseActions | useMutation | `api.capital.gateResponses.returnResponse` |
| `capital/CapitalGatesPanel.tsx` | StageGateDetailPanel | useMutation | `api.capital.stageRecords.returnStageRecord` |
| `capital/CapitalGatesPanel.tsx` | StageGateDetailPanel | useMutation | `api.capital.stageRecords.submitStageRecord` |
| `capital/CapitalGatesPanel.tsx` | CapitalGatesPanel | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/CapitalGatesPanel.tsx` | CapitalGatesPanel | useMutation | `api.capital.stageRecords.approveStageRecord` |
| `capital/CapitalPendingSignOff.tsx` | CapitalPendingSignOffPanel | useQuery | `api.capital.approvalMessages.getSignOffInbox` |
| `capital/CapitalPendingSignOff.tsx` | CapitalPendingSignOffPanel | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/CapitalPendingSignOff.tsx` | CapitalPendingSignOffPanel | useQuery | `api.capital.artefactsDraft.listForProject` |
| `capital/CapitalShifBuilderPanel.tsx` | CapitalShifBuilderPanel | useQuery | `api.capital.shifSubmissions.getSubmissionForProject` |
| `capital/CapitalShifBuilderPanel.tsx` | CapitalShifBuilderPanel | useQuery | `api.capital.shifSubmissions.listFacilityTypes` |
| `capital/CapitalShifBuilderPanel.tsx` | CapitalShifBuilderPanel | useMutation | `api.capital.shifSubmissions.createSubmission` |
| `capital/CapitalShifBuilderPanel.tsx` | CapitalShifBuilderPanel | useMutation | `api.capital.shifSubmissions.updateSubmission` |
| `capital/CapitalShifBuilderPanel.tsx` | CapitalShifBuilderPanel | useMutation | `api.capital.shifSubmissions.markPrerequisitesReady` |
| `capital/CapitalShifFormBuilder.tsx` | CapitalShifFormBuilder | useQuery | `api.capital.shifSubmissions.getSubmissionForProject` |
| `capital/CapitalShifFormBuilder.tsx` | CapitalShifFormBuilder | useMutation | `api.capital.shifSubmissions.saveShifForm` |
| `capital/CapitalShifFormBuilder.tsx` | CapitalShifFormBuilder | useAction | `api.capital.shifFormGenerate.generateShifFormDocx` |
| `capital/CapitalSoaBuilderPanel.tsx` | CapitalSoaBuilderPanel | useQuery | `api.capital.soaBuilder.getSoaForProject` |
| `capital/CapitalSoaBuilderPanel.tsx` | CapitalSoaBuilderPanel | useMutation | `api.capital.soaBuilder.generateSoa` |
| `capital/CapitalSoaBuilderPanel.tsx` | CapitalSoaBuilderPanel | useMutation | `api.capital.soaBuilder.updateSoaBrief` |
| `capital/CapitalSoaBuilderPanel.tsx` | CapitalSoaBuilderPanel | useMutation | `api.capital.soaBuilder.updateSoaLine` |
| `capital/CapitalSoaBuilderPanel.tsx` | CapitalSoaBuilderPanel | useMutation | `api.capital.soaBuilder.markSoaComplete` |
| `capital/CapitalStageGateThread.tsx` | CapitalStageGateThread | useQuery | `api.capital.gateResponses.listStageGateMessages` |
| `capital/ChangeOrderInboxPanel.tsx` | ChangeOrderInboxPanel | useQuery | `api.capital.changeOrderReads.listInboxForRole` |
| `capital/EvidenceSection.tsx` | EvidenceSection | useQuery | `api.capital.evidence.listForProject` |
| `capital/EvidenceSection.tsx` | EvidenceForm | useMutation | `api.capital.evidence.createEvidenceItem` |
| `capital/EvidenceSection.tsx` | EvidenceForm | useMutation | `api.capital.evidence.generateEvidenceUploadUrl` |
| `capital/HandoverSection.tsx` | HandoverSection | useQuery | `api.capital.handover.listForProject` |
| `capital/HandoverSection.tsx` | HandoverSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/HandoverSection.tsx` | HandoverSection | useQuery | `api.capital.projects.getProject` |
| `capital/HandoverSection.tsx` | HandoverSection | useQuery | `api.capital.handover.getPpr` |
| `capital/HandoverSection.tsx` | HandoverSection | useMutation | `api.capital.handover.seedHandoverChecklist` |
| `capital/HandoverSection.tsx` | HandoverSection | useMutation | `api.capital.handover.updateHandoverItem` |
| `capital/HandoverSection.tsx` | DefectsRegisterCard | useMutation | `api.capital.handover.updateDefectStatus` |
| `capital/HandoverSection.tsx` | DefectForm | useMutation | `api.capital.handover.createDefect` |
| `capital/HandoverSection.tsx` | PprCard | useMutation | `api.capital.handover.submitPpr` |
| `capital/HandoverSection.tsx` | HandoverForm | useMutation | `api.capital.handover.addHandoverItem` |
| `capital/ShifSection.tsx` | ShifSection | useQuery | `api.capital.shif.getShifForProject` |
| `capital/ShifSection.tsx` | ShifForm | useMutation | `api.capital.shif.upsertShifAssessment` |
| `capital/capitalApprovalActions.tsx` | RequestApprovalModal | useMutation | `api.capital.approvals.requestApproval` |
| `capital/capitalApprovalActions.tsx` | SignApprovalModal | useMutation | `api.capital.approvals.signApproval` |
| `capital/capitalApprovalActions.tsx` | RejectApprovalModal | useMutation | `api.capital.approvals.rejectApproval` |
| `capital/capitalApprovalActions.tsx` | WithdrawApprovalModal | useMutation | `api.capital.approvals.withdrawApproval` |
| `capital/capitalApprovalActions.tsx` | ApprovalsSection | useQuery | `api.capital.approvals.listForProject` |
| `capital/capitalArtefacts.tsx` | CapitalUploadArtefactModal | useMutation | `api.files.generateUploadUrl.generateUploadUrl` |
| `capital/capitalArtefacts.tsx` | CapitalUploadArtefactModal | useMutation | `api.capital.artefactsDraft.createDraftArtefact` |
| `capital/capitalArtefacts.tsx` | ArtefactsSection | useQuery | `api.capital.artefactsDraft.listForProject` |
| `capital/capitalArtefacts.tsx` | ArtefactsSection | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/capitalChangeOrderModals.tsx` | RequestChangeOrderModal | useMutation | `api.capital.changeOrders.requestChangeOrderApproval` |
| `capital/capitalChangeOrderModals.tsx` | SignChangeOrderModal | useMutation | `api.capital.changeOrderSignoff.signChangeOrderApproval` |
| `capital/capitalChangeOrderModals.tsx` | RejectChangeOrderModal | useMutation | `api.capital.changeOrderSignoff.rejectChangeOrderApproval` |
| `capital/capitalChangeOrderModals.tsx` | WithdrawChangeOrderModal | useMutation | `api.capital.changeOrderSignoff.withdrawChangeOrderApproval` |
| `capital/capitalChangeOrderModals.tsx` | GenerateChangeOrderFormButton | useAction | `api.capital.changeOrderForm.generateChangeOrderForm` |
| `capital/capitalChangeOrderModals.tsx` | ChangeOrdersForVariation | useQuery | `api.capital.changeOrderReads.listForVariation` |
| `capital/capitalChangeOrderModals.tsx` | ChangeOrdersForVariation | useQuery | `api.capital.changeOrderReads.listForVariation` |
| `capital/capitalContractExecution.tsx` | EotRowActions | useMutation | `api.capital.eots.grantEot` |
| `capital/capitalContractExecution.tsx` | EotRowActions | useMutation | `api.capital.eots.rejectEot` |
| `capital/capitalContractExecution.tsx` | EotRowActions | useMutation | `api.capital.eots.withdrawEot` |
| `capital/capitalContractExecution.tsx` | RequestEotModal | useMutation | `api.capital.eots.requestEot` |
| `capital/capitalContractExecution.tsx` | EotsSection | useQuery | `api.capital.eots.listForContract` |
| `capital/capitalContractExecution.tsx` | CreateDraftPaymentModal | useMutation | `api.capital.payments.createDraftPayment` |
| `capital/capitalContractExecution.tsx` | PaymentsSection | useQuery | `api.capital.payments.listForContract` |
| `capital/capitalContractExecution.tsx` | PaymentsSection | useMutation | `api.capital.payments.certifyPayment` |
| `capital/capitalContractExecution.tsx` | PaymentsSection | useMutation | `api.capital.payments.recordPaymentPaid` |
| `capital/capitalContractExecution.tsx` | WorksProgrammeSection | useQuery | `api.capital.worksProgramme.listForContract` |
| `capital/capitalContractExecution.tsx` | WorksProgrammeSection | useMutation | `api.capital.worksProgramme.acceptProgramme` |
| `capital/capitalContractExecution.tsx` | WorksProgrammeSection | useMutation | `api.capital.worksProgramme.rejectProgramme` |
| `capital/capitalDesignTeamPanel.tsx` | AssignFirmModal | useQuery | `api.capital.designTeam.listFirms` |
| `capital/capitalDesignTeamPanel.tsx` | AssignFirmModal | useMutation | `api.capital.designTeam.assignFirmToProject` |
| `capital/capitalDesignTeamPanel.tsx` | DesignTeamPanel | useQuery | `api.capital.designTeam.listProjectAssignments` |
| `capital/capitalProgrammeModal.tsx` | SubmitProgrammeModal | useMutation | `api.capital.worksProgramme.submitProgramme` |
| `capital/capitalProjectSections.tsx` | ProjectOverviewSection | useQuery | `api.capital.approvals.listForProject` |
| `capital/capitalProjectSections.tsx` | ProjectOverviewSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/capitalProjectSections.tsx` | StageRecordsSection | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/capitalProjectSections.tsx` | ApprovalsSection | useQuery | `api.capital.approvals.listForProject` |
| `capital/capitalProjectSections.tsx` | ContractSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/capitalProjectSections.tsx` | ContractVariations | useQuery | `api.capital.variations.listForContract` |
| `capital/capitalProjectSections.tsx` | ProcurementSection | useQuery | `api.capital.routerIntegration.inspectS5RouterGate` |
| `capital/capitalProjectSections.tsx` | ProcurementSection | useMutation | `api.capital.routerIntegration.recordContractAward` |
| `capital/capitalProjectSections.tsx` | CostRiskSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/capitalProjectSections.tsx` | RiskRegisterCard | useQuery | `api.capital.riskRegister.listForContract` |
| `capital/capitalProjectSections.tsx` | CreateRiskForm | useMutation | `api.capital.riskRegister.createRisk` |
| `capital/capitalProjectSections.tsx` | DesignSection | useQuery | `api.capital.designTeam.listProjectAssignments` |
| `capital/capitalRiskRegister.tsx` | AddRiskModal | useMutation | `api.capital.riskRegister.createRisk` |
| `capital/capitalRiskRegister.tsx` | EditRiskModal | useMutation | `api.capital.riskRegister.updateRisk` |
| `capital/capitalRiskRegister.tsx` | RiskRegisterCard | useMutation | `api.capital.riskRegister.reviewRisk` |
| `capital/capitalRiskRegister.tsx` | RiskRegisterCard | useQuery | `api.capital.riskRegister.listForContract` |
| `capital/capitalRiskRegister.tsx` | CostRiskSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/capitalStageActions.tsx` | CreateStageModal | useQuery | `api.capital.people.listAuthorityPeople` |
| `capital/capitalStageActions.tsx` | CreateStageModal | useMutation | `api.capital.stageRecords.createStageRecord` |
| `capital/capitalStageActions.tsx` | SubmitStageWithNoteModal | useMutation | `api.capital.stageRecords.submitStageRecord` |
| `capital/capitalStageActions.tsx` | SubmitS6BModal | useMutation | `api.capital.stageRecords.submitStageRecord` |
| `capital/capitalStageActions.tsx` | ReturnStageModal | useMutation | `api.capital.stageRecords.returnStageRecord` |
| `capital/capitalStageActions.tsx` | StagesSection | useQuery | `api.capital.stageRecords.listForProject` |
| `capital/capitalStageActions.tsx` | StagesSection | useMutation | `api.capital.stageRecords.approveStageRecord` |
| `capital/capitalVariationActions.tsx` | ContractVariationsTable | useQuery | `api.capital.variations.listForContract` |
| `capital/capitalVariationActions.tsx` | ContractSection | useQuery | `api.capital.contracts.listForProject` |
| `capital/capitalVariationModals.tsx` | RequestVariationModal | useMutation | `api.capital.variations.requestVariation` |
| `capital/capitalVariationModals.tsx` | IssuePIModal | useMutation | `api.capital.variations.issuePI` |
| `capital/capitalVariationModals.tsx` | RecordQuoteModal | useMutation | `api.capital.variations.recordQuote` |
| `capital/capitalVariationModals.tsx` | RecordDtEvaluationModal | useMutation | `api.capital.variations.recordDtEvaluation` |
| `capital/capitalVariationModals.tsx` | IssueErDeterminationModal | useMutation | `api.capital.variations.issueErDetermination` |
| `capital/capitalVariationModals.tsx` | WithdrawVariationModal | useMutation | `api.capital.variations.withdrawVariation` |
| `capital/capitalVariationModals.tsx` | RejectVariationModal | useMutation | `api.capital.variations.rejectVariation` |
| `capital/capitalVariationModals.tsx` | DiscussionThread | useMutation | `api.capital.variationDiscussions.postMessage` |
| `capital/capitalVariationModals.tsx` | DiscussionThread | useMutation | `api.capital.variationDiscussions.resolveDiscussion` |
| `capital/capitalVariationModals.tsx` | VariationDiscussionsPanel | useQuery | `api.capital.variationDiscussions.listForVariation` |
| `capital/capitalVariationModals.tsx` | VariationDiscussionsPanel | useMutation | `api.capital.variationDiscussions.openDiscussion` |

## Notes

- This app directory is one UI surface over a much larger backend: `convex/capital/` alone has 203 function files. Only the functions actually referenced by `src/app/capital/**` (plus `src/components/capital/**`) are resolved here — see the root README's 'Known limitations' for why this is on purpose (exhaustively parsing 1,459 Convex files was not tractable in one pass).
