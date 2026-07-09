# admin

Auto-derived module: everything under `src/app/admin/` plus `src/components/admin/`.

**App directory:** `src/app/admin/` (62 `.tsx` files) + **components directory:** `src/components/admin/` (7 `.tsx` files)

## Bind map

```mermaid
flowchart LR
  n0["admin/api-keys/page.tsx :: ApiKeysPage"] -->|useMutation| n1["useMutation api.apiKeys.manage.createApiKey"]
  n1 -->|reads/writes| n2[("sp_apiKeys")]
  n0["admin/api-keys/page.tsx :: ApiKeysPage"] -->|useMutation| n3["useMutation api.apiKeys.manage.revokeApiKey"]
  n4["admin/approvals/page.tsx :: ApprovalsPage"] -->|useQuery| n5["useQuery api.procurements.listPendingOverrides.listPendingOverrides"]
  n5 -->|reads/writes| n6[("sp_procurements")]
  n4["admin/approvals/page.tsx :: ApprovalsPage"] -->|useMutation| n7["useMutation api.procurements.approveOverride.approveOverride"]
  n7 -->|reads/writes| n8[("sp_auditEvents")]
  n4["admin/approvals/page.tsx :: ApprovalsPage"] -->|useMutation| n9["useMutation api.procurements.rejectOverride.rejectOverride"]
  n4["admin/approvals/page.tsx :: ApprovalsPage"] -->|useQuery| n10["useQuery api.sp_procurements.listUsers"]
  n10 -->|reads/writes| n11[("sp_users")]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useQuery| n13["useQuery api.building_admin.getBuilding"]
  n13 -->|reads/writes| n14[("building_compliance")]
  n13 -->|reads/writes| n15[("building_documents")]
  n13 -->|reads/writes| n16[("building_systems")]
  n13 -->|reads/writes| n17[("building_risk_snapshots")]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useMutation| n18["useMutation api.building_admin.updateBuildingGeo"]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useMutation| n19["useMutation api.building_compliance.addCompliance"]
  n19 -->|reads/writes| n14[("building_compliance")]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useMutation| n20["useMutation api.building_compliance.deleteCompliance"]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useMutation| n21["useMutation api.building_docs.addDocument"]
  n21 -->|reads/writes| n15[("building_documents")]
  n12["admin/buildings/[id]/page.tsx :: BuildingDetailPage"] -->|useMutation| n22["useMutation api.building_docs.deleteDocument"]
  n23["admin/buildings/import/page.tsx :: BuildingPassportImportPage"] -->|useAction| n24["useAction api.buildings.importPassport.parseAndDryRun"]
  n23["admin/buildings/import/page.tsx :: BuildingPassportImportPage"] -->|useMutation| n25["useMutation api.buildings.commitPassportImport.commitImport"]
  n25 -->|reads/writes| n26[("passportImportBatches")]
  n25 -->|reads/writes| n27[("buildings")]
  n25 -->|reads/writes| n28[("worksHistory")]
  n25 -->|reads/writes| n29[("drawingRegisterLinks")]
  n25 -->|reads/writes| n30[("dataQualityIssues")]
  n25 -.->|triggers| n31["buildings.commitPassportImport.emitAuditChunk"]
  n32["admin/buildings/passport-v2/page.tsx :: PassportV2ImportPage"] -->|useMutation| n33["useMutation api.files.generateUploadUrl.generateUploadUrl"]
  n32["admin/buildings/passport-v2/page.tsx :: PassportV2ImportPage"] -->|useAction| n34["useAction api.buildings.passport_v2.parseAndDryRun.parseAndDryRun"]
  n34 -.->|triggers| n35["buildings.passport_v2.internal.authCheck"]
  n34 -.->|triggers| n36["buildings.passport_v2.internal.loadBuildingsByAssetCodes"]
  n34 -.->|triggers| n37["buildings.passport_v2.internal.loadAssignmentsForBuildings"]
  n34 -.->|triggers| n38["buildings.passport_v2.internal.loadSystemsForBuildings"]
  n34 -.->|triggers| n39["buildings.passport_v2.internal.loadComplianceForBuildings"]
  n34 -.->|triggers| n40["buildings.passport_v2.internal.loadWorksForBuildings"]
  n34 -.->|triggers| n41["buildings.passport_v2.internal.loadDrawingsForBuildings"]
  n34 -.->|triggers| n42["buildings.passport_v2.internal.loadContactsForBuildings"]
  n34 -.->|triggers| n43["buildings.passport_v2.internal.savePlan"]
  n32["admin/buildings/passport-v2/page.tsx :: PassportV2ImportPage"] -->|useMutation| n44["useMutation api.buildings.passport_v2.commitPlan.commitPlan"]
  n44 -->|reads/writes| n27[("buildings")]
  n44 -->|reads/writes| n45[("buildingAssignments")]
  n44 -->|reads/writes| n28[("worksHistory")]
  n44 -->|reads/writes| n46[("buildingContacts")]
  n44 -->|reads/writes| n16[("building_systems")]
  n44 -->|reads/writes| n14[("building_compliance")]
  n44 -->|reads/writes| n47[("building_drawings")]
  n32["admin/buildings/passport-v2/page.tsx :: PassportV2ImportPage"] -->|useMutation| n48["useMutation api.governance.selfBootstrap.selfBootstrap"]
  n48 -->|reads/writes| n49[("gov_roles")]
  n48 -->|reads/writes| n50[("gov_memberships")]
  n48 -->|reads/writes| n51[("gov_organisations")]
  n52["admin/campuses/[id]/page.tsx :: CampusDetailPage"] -->|useQuery| n53["useQuery api.campus_admin.getCampus"]
  n53 -->|reads/writes| n27[("buildings")]
  n52["admin/campuses/[id]/page.tsx :: CampusDetailPage"] -->|useMutation| n54["useMutation api.campus_admin.updateCampusGeo"]
  n52["admin/campuses/[id]/page.tsx :: CampusDetailPage"] -->|useMutation| n55["useMutation api.building_admin.createBuilding"]
  n55 -->|reads/writes| n27[("buildings")]
  n52["admin/campuses/[id]/page.tsx :: CampusDetailPage"] -->|useMutation| n56["useMutation api.building_admin.toggleBuildingActive"]
  n57["admin/campuses/page.tsx :: admin/campuses/page.tsx"] -->|useQuery| n58["useQuery api.campus_admin.listCampuses"]
  n58 -->|reads/writes| n59[("campuses")]
  n60["admin/campuses/page.tsx :: CampusesPage"] -->|useMutation| n61["useMutation api.campus_admin.createCampus"]
  n61 -->|reads/writes| n59[("campuses")]
  n60["admin/campuses/page.tsx :: CampusesPage"] -->|useMutation| n62["useMutation api.campus_admin.toggleCampusActive"]
  n63["admin/capital/change-orders/page.tsx :: ChangeOrdersContent"] -->|useQuery| n64["useQuery api.capital.authorities.listMine"]
  n65["admin/capital/thresholds/page.tsx :: CapitalThresholdsContent"] -->|useQuery| n66["useQuery api.capital.thresholds.list"]
  n65["admin/capital/thresholds/page.tsx :: CapitalThresholdsContent"] -->|useQuery| n67["useQuery api.capital.thresholds.listOverrides"]
  n68["admin/compliance/page.tsx :: ComplianceScorecardPage"] -->|useQuery| n69["useQuery api.governance.session.resolve"]
  n69 -->|reads/writes| n11[("sp_users")]
  n69 -->|reads/writes| n70[("gov_ssoMappings")]
  n69 -->|reads/writes| n50[("gov_memberships")]
  n71["admin/etenders/compliance/page.tsx :: ETendersCompliancePage"] -->|useQuery| n72["useQuery api.etenders.complianceReport.getComplianceReport"]
  n72 -->|reads/writes| n73[("sp_eTendersRequirements")]
  n72 -->|reads/writes| n74[("sp_rftInstances")]
  n72 -->|reads/writes| n75[("sp_eTendersAwardCompliance")]
  n72 -->|reads/writes| n76[("sp_eTendersCorrigenda")]
  n77["admin/etenders/page.tsx :: EtendersRefRow"] -->|useMutation| n78["useMutation api.sp_rft.updateEtendersRef"]
  n79["admin/etenders/page.tsx :: EtendersAdminPage"] -->|useQuery| n80["useQuery api.sp_rft.listAllRfts"]
  n80 -->|reads/writes| n74[("sp_rftInstances")]
  n81["admin/geo-proposals/page.tsx :: GeoProposalsPage"] -->|useMutation| n82["useMutation api.geo_proposals.adoptGeoProposal"]
  n81["admin/geo-proposals/page.tsx :: GeoProposalsPage"] -->|useMutation| n83["useMutation api.geo_proposals.rejectGeoProposal"]
  n84["admin/governance/approvals/page.tsx :: ApprovalsContent"] -->|useQuery| n85["useQuery api.governance.approvals.listPending"]
  n85 -->|reads/writes| n86[("gov_approvalRequests")]
  n84["admin/governance/approvals/page.tsx :: ApprovalsContent"] -->|useQuery| n87["useQuery api.governance.approvals.listAll"]
  n87 -->|reads/writes| n86[("gov_approvalRequests")]
  n84["admin/governance/approvals/page.tsx :: ApprovalsContent"] -->|useMutation| n88["useMutation api.governance.approvals.approve"]
  n84["admin/governance/approvals/page.tsx :: ApprovalsContent"] -->|useMutation| n89["useMutation api.governance.approvals.reject"]
  n90["admin/governance/audit/page.tsx :: AuditContent"] -->|useQuery| n91["useQuery api.governance.audit.listEvents"]
  n91 -->|reads/writes| n92[("gov_auditEvents")]
  n93["admin/governance/buildings/page.tsx :: BuildingsContent"] -->|useQuery| n94["useQuery api.governance.buildings.list"]
  n94 -->|reads/writes| n95[("gov_buildingProfiles")]
  n93["admin/governance/buildings/page.tsx :: BuildingsContent"] -->|useMutation| n96["useMutation api.governance.buildings.createProfile"]
  n96 -->|reads/writes| n27[("buildings")]
  n96 -->|reads/writes| n95[("gov_buildingProfiles")]
  n97["admin/governance/compliance-docs/page.tsx :: StatusPill"] -->|useQuery| n98["useQuery api.governance.complianceDocs.listDocs"]
  n98 -->|reads/writes| n99[("gov_complianceDocs")]
  n100["admin/governance/compliance-docs/page.tsx :: ComplianceDocsPage"] -->|useQuery| n101["useQuery api.governance.complianceDocs.getOverview"]
  n101 -->|reads/writes| n99[("gov_complianceDocs")]
  n100["admin/governance/compliance-docs/page.tsx :: ComplianceDocsPage"] -->|useQuery| n98["useQuery api.governance.complianceDocs.listDocs"]
  n98 -->|reads/writes| n99[("gov_complianceDocs")]
  n100["admin/governance/compliance-docs/page.tsx :: ComplianceDocsPage"] -->|useMutation| n102["useMutation api.governance.complianceDocs.setStatus"]
  n102 -->|reads/writes| n103[("gov_complianceDocVersions")]
  n104["admin/governance/frameworks/page.tsx :: FrameworksContent"] -->|useQuery| n105["useQuery api.governance.frameworks.list"]
  n105 -->|reads/writes| n106[("gov_frameworks")]
  n105 -->|reads/writes| n107[("gov_frameworkVersions")]
  n104["admin/governance/frameworks/page.tsx :: FrameworksContent"] -->|useMutation| n108["useMutation api.governance.frameworks.createFramework"]
  n108 -->|reads/writes| n106[("gov_frameworks")]
  n109["admin/governance/imports/[id]/page.tsx :: ImportDetailContent"] -->|useQuery| n110["useQuery api.governance.imports.getBatchDetail"]
  n110 -->|reads/writes| n111[("gov_buildingImportRows")]
  n110 -->|reads/writes| n112[("gov_buildingImportExceptions")]
  n109["admin/governance/imports/[id]/page.tsx :: ImportDetailContent"] -->|useMutation| n113["useMutation api.governance.imports.resolveException"]
  n114["admin/governance/imports/page.tsx :: admin/governance/imports/page.tsx"] -->|useQuery| n115["useQuery api.governance.imports.listBatches"]
  n115 -->|reads/writes| n116[("gov_buildingImports")]
  n117["admin/governance/imports/page.tsx :: ImportsContent"] -->|useQuery| n115["useQuery api.governance.imports.listBatches"]
  n115 -->|reads/writes| n116[("gov_buildingImports")]
  n117["admin/governance/imports/page.tsx :: ImportsContent"] -->|useMutation| n118["useMutation api.governance.imports.approveBatch"]
  n117["admin/governance/imports/page.tsx :: ImportsContent"] -->|useMutation| n119["useMutation api.governance.imports.promoteBatch"]
  n119 -->|reads/writes| n111[("gov_buildingImportRows")]
  n119 -->|reads/writes| n95[("gov_buildingProfiles")]
  n119 -->|reads/writes| n120[("gov_buildingProfileVersions")]
  n117["admin/governance/imports/page.tsx :: ImportsContent"] -->|useMutation| n121["useMutation api.governance.imports.rollbackBatch"]
  n121 -->|reads/writes| n111[("gov_buildingImportRows")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useQuery| n123["useQuery api.governance.memberships.listMembers"]
  n123 -->|reads/writes| n50[("gov_memberships")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useQuery| n124["useQuery api.governance.memberships.listJoinRequests"]
  n124 -->|reads/writes| n125[("gov_joinRequests")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useQuery| n126["useQuery api.governance.memberships.listInvites"]
  n126 -->|reads/writes| n127[("gov_invites")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useQuery| n128["useQuery api.governance.memberships.listRolesForOrg"]
  n128 -->|reads/writes| n49[("gov_roles")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useQuery| n129["useQuery api.governance.memberships.listDepartmentsForOrg"]
  n129 -->|reads/writes| n130[("gov_departments")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useMutation| n131["useMutation api.governance.memberships.inviteUser"]
  n131 -->|reads/writes| n127[("gov_invites")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useMutation| n132["useMutation api.governance.memberships.approveJoinRequest"]
  n132 -->|reads/writes| n50[("gov_memberships")]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useMutation| n133["useMutation api.governance.memberships.rejectJoinRequest"]
  n122["admin/governance/members/page.tsx :: MembersContent"] -->|useMutation| n134["useMutation api.governance.memberships.deactivateMember"]
  n135["admin/governance/members/page.tsx :: EditMemberModal"] -->|useMutation| n136["useMutation api.governance.memberships.updateMember"]
  n135["admin/governance/members/page.tsx :: EditMemberModal"] -->|useMutation| n137["useMutation api.governance.memberships.updateUserProfile"]
  n137 -->|reads/writes| n50[("gov_memberships")]
  n135["admin/governance/members/page.tsx :: EditMemberModal"] -->|useMutation| n136["useMutation api.governance.memberships.updateMember"]
  n138["admin/governance/notifications/page.tsx :: NotificationsPage"] -->|useQuery| n139["useQuery api.governance.notifications.listForUser"]
  n139 -->|reads/writes| n140[("gov_notifications")]
  n138["admin/governance/notifications/page.tsx :: NotificationsPage"] -->|useQuery| n141["useQuery api.governance.notifications.getSummary"]
  n141 -->|reads/writes| n140[("gov_notifications")]
  n138["admin/governance/notifications/page.tsx :: NotificationsPage"] -->|useMutation| n142["useMutation api.governance.notifications.markAllRead"]
  n142 -->|reads/writes| n140[("gov_notifications")]
  n138["admin/governance/notifications/page.tsx :: NotificationsPage"] -->|useMutation| n143["useMutation api.governance.notifications.markRead"]
  n144["admin/governance/organisations/feature-flags/page.tsx :: FeatureFlagsAdminPage"] -->|useMutation| n145["useMutation api.admin.featureFlags.setOrgFeatureFlag"]
  n146["admin/governance/organisations/page.tsx :: OrganisationsPage"] -->|useMutation| n147["useMutation api.governance.organisations.create"]
  n147 -->|reads/writes| n51[("gov_organisations")]
  n148["admin/governance/organisations/requests/page.tsx :: RequestsContent"] -->|useQuery| n128["useQuery api.governance.memberships.listRolesForOrg"]
  n128 -->|reads/writes| n49[("gov_roles")]
  n149["admin/governance/profile/page.tsx :: ChangePasswordPanel"] -->|useQuery| n150["useQuery api.auth.canChangePassword.default"]
  n150 -.->|"? not resolved"| n151["unresolved — see Notes"]
  n149["admin/governance/profile/page.tsx :: ChangePasswordPanel"] -->|useMutation| n152["useMutation api.auth.changePassword.default"]
  n152 -.->|"? not resolved"| n153["unresolved — see Notes"]
  n154["admin/governance/profile/page.tsx :: MyDetailsEditor"] -->|useMutation| n155["useMutation api.governance.userProvisioning.updateMySpUserProfile"]
  n155 -->|reads/writes| n11[("sp_users")]
  n156["admin/governance/regions/page.tsx :: HealthRegionsPage"] -->|useQuery| n157["useQuery api.governance.organisations.listRegionsHierarchy"]
  n157 -->|reads/writes| n158[("gov_regions")]
  n157 -->|reads/writes| n51[("gov_organisations")]
  n156["admin/governance/regions/page.tsx :: HealthRegionsPage"] -->|useMutation| n159["useMutation api.governance.organisations.seedHealthRegions"]
  n159 -->|reads/writes| n158[("gov_regions")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useQuery| n161["useQuery api.governance.rolesMatrix.listRolesWithMemberCount"]
  n161 -->|reads/writes| n49[("gov_roles")]
  n161 -->|reads/writes| n50[("gov_memberships")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useQuery| n162["useQuery api.governance.rolesMatrix.listOrgsWithMemberCount"]
  n162 -->|reads/writes| n51[("gov_organisations")]
  n162 -->|reads/writes| n50[("gov_memberships")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useQuery| n163["useQuery api.governance.rolesMatrix.checkHseDemoStatus"]
  n163 -->|reads/writes| n51[("gov_organisations")]
  n163 -->|reads/writes| n50[("gov_memberships")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useQuery| n157["useQuery api.governance.organisations.listRegionsHierarchy"]
  n157 -->|reads/writes| n158[("gov_regions")]
  n157 -->|reads/writes| n51[("gov_organisations")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useQuery| n164["useQuery api.governance.rolesMatrix.listMembersWithRoles"]
  n164 -->|reads/writes| n50[("gov_memberships")]
  n160["admin/governance/roles/page.tsx :: RolesAccessPage"] -->|useMutation| n165["useMutation api.governance.seedHseDemoUi.runSeedHseDemo"]
  n165 -.->|triggers| n166["governance.seedHseDemo.seedHseDemoOrgsAndUsers"]
  n167["admin/governance/rules/page.tsx :: RulesContent"] -->|useQuery| n168["useQuery api.router_admin.listRulesets"]
  n168 -->|reads/writes| n169[("router_rulesets")]
  n170["admin/governance/validation/page.tsx :: ValidationContent"] -->|useQuery| n171["useQuery api.governance.buildings.getValidationQueue"]
  n171 -->|reads/writes| n120[("gov_buildingProfileVersions")]
  n170["admin/governance/validation/page.tsx :: ValidationContent"] -->|useMutation| n172["useMutation api.governance.buildings.validateVersion"]
  n172 -->|reads/writes| n173[("gov_buildingValidationReviews")]
  n174["admin/import/[id]/page.tsx :: ImportJobDetailPage"] -->|useQuery| n175["useQuery api.import_admin.getImportJob"]
  n175 -->|reads/writes| n176[("import_rows")]
  n174["admin/import/[id]/page.tsx :: ImportJobDetailPage"] -->|useMutation| n177["useMutation api.import_admin.processImportJob"]
  n177 -->|reads/writes| n176[("import_rows")]
  n177 -->|reads/writes| n59[("campuses")]
  n177 -->|reads/writes| n27[("buildings")]
  n177 -->|reads/writes| n178[("geo_proposals")]
  n179["admin/import/page.tsx :: admin/import/page.tsx"] -->|useQuery| n180["useQuery api.import_admin.listImportJobs"]
  n180 -->|reads/writes| n181[("import_jobs")]
  n182["admin/import/page.tsx :: ImportPage"] -->|useQuery| n180["useQuery api.import_admin.listImportJobs"]
  n180 -->|reads/writes| n181[("import_jobs")]
  n182["admin/import/page.tsx :: ImportPage"] -->|useMutation| n183["useMutation api.import_admin.createImportJob"]
  n183 -->|reads/writes| n181[("import_jobs")]
  n183 -->|reads/writes| n176[("import_rows")]
  n182["admin/import/page.tsx :: ImportPage"] -->|useMutation| n177["useMutation api.import_admin.processImportJob"]
  n177 -->|reads/writes| n176[("import_rows")]
  n177 -->|reads/writes| n59[("campuses")]
  n177 -->|reads/writes| n27[("buildings")]
  n177 -->|reads/writes| n178[("geo_proposals")]
  n182["admin/import/page.tsx :: ImportPage"] -->|useMutation| n184["useMutation api.import_admin.deleteImportJob"]
  n184 -->|reads/writes| n176[("import_rows")]
  n185["admin/intelligence/page.tsx :: IntelligenceDashboardPage"] -->|useQuery| n69["useQuery api.governance.session.resolve"]
  n69 -->|reads/writes| n11[("sp_users")]
  n69 -->|reads/writes| n70[("gov_ssoMappings")]
  n69 -->|reads/writes| n50[("gov_memberships")]
  n186["admin/ogp/[id]/page.tsx :: OGPArrangementDetailPage"] -->|useMutation| n187["useMutation api.ogp_admin.markArrangementReviewed"]
  n186["admin/ogp/[id]/page.tsx :: OGPArrangementDetailPage"] -->|useAction| n188["useAction api.admin_actionsUi.triggerOgpSeedFromUi"]
  n188 -.->|triggers| n189["admin_actions.runOgpSeedNow"]
  n186["admin/ogp/[id]/page.tsx :: OGPArrangementDetailPage"] -->|useAction| n190["useAction api.admin_actionsUi.triggerOgpEnrichFromUi"]
  n190 -.->|triggers| n191["admin_actions.runOgpEnrichNow"]
  n192["admin/ogp/page.tsx :: OGPAdminPage"] -->|useQuery| n193["useQuery api.ogp_admin.listArrangementsForAdminPlus"]
  n193 -->|reads/writes| n194[("ogp_arrangements")]
  n192["admin/ogp/page.tsx :: OGPAdminPage"] -->|useAction| n188["useAction api.admin_actionsUi.triggerOgpSeedFromUi"]
  n188 -.->|triggers| n189["admin_actions.runOgpSeedNow"]
  n192["admin/ogp/page.tsx :: OGPAdminPage"] -->|useAction| n190["useAction api.admin_actionsUi.triggerOgpEnrichFromUi"]
  n190 -.->|triggers| n191["admin_actions.runOgpEnrichNow"]
  n195["admin/policies/[id]/page.tsx :: PolicyDetailPage"] -->|useQuery| n196["useQuery api.policy_admin.getPolicy"]
  n195["admin/policies/[id]/page.tsx :: PolicyDetailPage"] -->|useMutation| n197["useMutation api.policy_admin.updatePolicy"]
  n197 -->|reads/writes| n198[("org_policy_change_log")]
  n195["admin/policies/[id]/page.tsx :: PolicyDetailPage"] -->|useQuery| n199["useQuery api.policy_admin.getPolicyChangeLog"]
  n199 -->|reads/writes| n198[("org_policy_change_log")]
  n200["admin/policies/page.tsx :: admin/policies/page.tsx"] -->|useQuery| n201["useQuery api.policy_admin.listPolicies"]
  n201 -->|reads/writes| n202[("org_policies")]
  n203["admin/policies/page.tsx :: PoliciesPage"] -->|useMutation| n204["useMutation api.policy_admin.createPolicy"]
  n204 -->|reads/writes| n202[("org_policies")]
  n204 -->|reads/writes| n198[("org_policy_change_log")]
  n203["admin/policies/page.tsx :: PoliciesPage"] -->|useMutation| n205["useMutation api.policy_admin.togglePolicyActive"]
  n205 -->|reads/writes| n198[("org_policy_change_log")]
  n206["admin/policy-templates/page.tsx :: PolicyTemplatesPage"] -->|useQuery| n207["useQuery api.policy_templates.admin.listTemplates"]
  n207 -->|reads/writes| n208[("org_policy_templates")]
  n206["admin/policy-templates/page.tsx :: PolicyTemplatesPage"] -->|useMutation| n209["useMutation api.policy_templates.admin.propagateTemplateChanges"]
  n209 -->|reads/writes| n202[("org_policies")]
  n209 -->|reads/writes| n198[("org_policy_change_log")]
  n210["admin/portal/accounts/[id]/page.tsx :: PortalAccountDetailPage"] -->|useQuery| n211["useQuery api.portal.admin.getAccountDetail"]
  n211 -->|reads/writes| n212[("portal_frameworkInvitations")]
  n211 -->|reads/writes| n213[("portal_subscriptions")]
  n211 -->|reads/writes| n214[("portal_docExpiry")]
  n210["admin/portal/accounts/[id]/page.tsx :: PortalAccountDetailPage"] -->|useMutation| n215["useMutation api.portal.admin.setTierOverride"]
  n215 -->|reads/writes| n216[("portal_auditEvents")]
  n217["admin/portal/accounts/page.tsx :: PortalAccountsPage"] -->|useQuery| n218["useQuery api.portal.admin.listAccounts"]
  n218 -->|reads/writes| n219[("portal_supplierAccounts")]
  n218 -->|reads/writes| n212[("portal_frameworkInvitations")]
  n217["admin/portal/accounts/page.tsx :: PortalAccountsPage"] -->|useQuery| n220["useQuery api.portal.admin.getSubscriptionStats"]
  n220 -->|reads/writes| n219[("portal_supplierAccounts")]
  n221["admin/portal/integrity/page.tsx :: IntegrityPage"] -->|useQuery| n222["useQuery api.portal.admin.verifySubmissionIntegrity"]
  n222 -->|reads/writes| n223[("portal_responses")]
  n221["admin/portal/integrity/page.tsx :: IntegrityPage"] -->|useQuery| n224["useQuery api.portal.admin.getAuditLog"]
  n224 -->|reads/writes| n216[("portal_auditEvents")]
  n225["admin/portal/invitations/page.tsx :: InvitationAnalyticsPage"] -->|useQuery| n226["useQuery api.portal.admin.getInvitationAnalytics"]
  n226 -->|reads/writes| n212[("portal_frameworkInvitations")]
  n227["admin/portal/invites/page.tsx :: PlatformInvitesPage"] -->|useQuery| n228["useQuery api.portal.admin.listPlatformInvites"]
  n228 -->|reads/writes| n229[("portal_platformInvites")]
  n227["admin/portal/invites/page.tsx :: PlatformInvitesPage"] -->|useMutation| n230["useMutation api.portal.admin.sendPlatformInvite"]
  n230 -->|reads/writes| n11[("sp_users")]
  n230 -->|reads/writes| n229[("portal_platformInvites")]
  n230 -->|reads/writes| n216[("portal_auditEvents")]
  n231["admin/portal/subscriptions/page.tsx :: SubscriptionsPage"] -->|useQuery| n220["useQuery api.portal.admin.getSubscriptionStats"]
  n220 -->|reads/writes| n219[("portal_supplierAccounts")]
  n232["admin/router/impact/page.tsx :: ImpactPage"] -->|useQuery| n168["useQuery api.router_admin.listRulesets"]
  n168 -->|reads/writes| n169[("router_rulesets")]
  n233["admin/router/integrity/page.tsx :: IntegrityPage"] -->|useQuery| n234["useQuery api.router_sweep_admin.listDecisionsWithDrift"]
  n234 -->|reads/writes| n235[("router_decisions")]
  n233["admin/router/integrity/page.tsx :: IntegrityPage"] -->|useQuery| n236["useQuery api.router_sweep_admin.listDecisionsNotReplayed"]
  n236 -->|reads/writes| n235[("router_decisions")]
  n233["admin/router/integrity/page.tsx :: IntegrityPage"] -->|useMutation| n237["useMutation api.router_engine.replayDecision"]
  n237 -->|reads/writes| n169[("router_rulesets")]
  n238["admin/AdminTemplateManager.tsx :: AdminTemplateManager"] -->|useQuery| n239["useQuery api.docTemplates.listTemplates.listTemplates"]
  n239 -->|reads/writes| n240[("core_docTemplates")]
  n238["admin/AdminTemplateManager.tsx :: AdminTemplateManager"] -->|useMutation| n241["useMutation api.docTemplates.seedUi.seedTemplatesFromUi"]
  n241 -.->|triggers| n242["docTemplates.seed.seed"]
  n238["admin/AdminTemplateManager.tsx :: AdminTemplateManager"] -->|useMutation| n243["useMutation api.docTemplates.setTemplateFile.setTemplateFile"]
  n243 -->|reads/writes| n240[("core_docTemplates")]
  n238["admin/AdminTemplateManager.tsx :: AdminTemplateManager"] -->|useMutation| n33["useMutation api.files.generateUploadUrl.generateUploadUrl"]
  n244["admin/GovernanceBootstrap.tsx :: GovernanceBootstrap"] -->|useMutation| n245["useMutation api.governance.seedRolesUi.seedRolesFromUi"]
  n245 -.->|triggers| n246["governance.seedRoles.seed"]
  n244["admin/GovernanceBootstrap.tsx :: GovernanceBootstrap"] -->|useMutation| n247["useMutation api.governance.bootstrap.bootstrapOrg"]
  n247 -->|reads/writes| n11[("sp_users")]
  n247 -->|reads/writes| n248[("sp_organisations")]
  n247 -->|reads/writes| n49[("gov_roles")]
  n247 -->|reads/writes| n51[("gov_organisations")]
  n247 -->|reads/writes| n50[("gov_memberships")]
  n249["admin/ImportUploadButton.tsx :: ImportUploadButton"] -->|useMutation| n250["useMutation api.governance.importUpload.generateUploadUrl"]
  n249["admin/ImportUploadButton.tsx :: ImportUploadButton"] -->|useMutation| n251["useMutation api.governance.importUpload.createBatchFromUpload"]
  n251 -->|reads/writes| n50[("gov_memberships")]
  n251 -->|reads/writes| n116[("gov_buildingImports")]
  n252["admin/NationalAdminPanel.tsx :: NationalAdminPanel"] -->|useQuery| n253["useQuery api.governance.approvals.countPending"]
  n253 -->|reads/writes| n86[("gov_approvalRequests")]
  n254["admin/NotificationBell.tsx :: NotificationBell"] -->|useQuery| n255["useQuery api.governance.notifications.countUnread"]
  n255 -->|reads/writes| n140[("gov_notifications")]
  n254["admin/NotificationBell.tsx :: NotificationBell"] -->|useQuery| n139["useQuery api.governance.notifications.listForUser"]
  n139 -->|reads/writes| n140[("gov_notifications")]
  n254["admin/NotificationBell.tsx :: NotificationBell"] -->|useMutation| n143["useMutation api.governance.notifications.markRead"]
  n254["admin/NotificationBell.tsx :: NotificationBell"] -->|useMutation| n142["useMutation api.governance.notifications.markAllRead"]
  n142 -->|reads/writes| n140[("gov_notifications")]
  n254["admin/NotificationBell.tsx :: NotificationBell"] -->|useMutation| n256["useMutation api.governance.notifications.archive"]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useQuery| n85["useQuery api.governance.approvals.listPending"]
  n85 -->|reads/writes| n86[("gov_approvalRequests")]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useQuery| n87["useQuery api.governance.approvals.listAll"]
  n87 -->|reads/writes| n86[("gov_approvalRequests")]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useQuery| n258["useQuery api.governance.userProvisioning.listInvites"]
  n258 -->|reads/writes| n127[("gov_invites")]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useMutation| n88["useMutation api.governance.approvals.approve"]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useMutation| n89["useMutation api.governance.approvals.reject"]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useMutation| n259["useMutation api.governance.userProvisioning.sendInvite"]
  n259 -->|reads/writes| n127[("gov_invites")]
  n259 -.->|triggers| n260["email.dispatchInviteEmail.dispatchInviteEmail"]
  n257["admin/OrgManagementPanel.tsx :: OrgManagementPanel"] -->|useMutation| n261["useMutation api.governance.userProvisioning.revokeInvite"]
```

## Convex functions referenced by this module's UI

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `apiKeys.manage.createApiKey` | mutation | `sp_apiKeys` | — |
| `apiKeys.manage.revokeApiKey` | mutation | — | — |
| `procurements.listPendingOverrides.listPendingOverrides` | query | `sp_procurements` | — |
| `procurements.approveOverride.approveOverride` | mutation | `sp_auditEvents` | — |
| `procurements.rejectOverride.rejectOverride` | mutation | — | — |
| `sp_procurements.listUsers` | query | `sp_users` | — |
| `building_admin.getBuilding` | query | `building_compliance`, `building_documents`, `building_systems`, `building_risk_snapshots` | — |
| `building_admin.updateBuildingGeo` | mutation | — | — |
| `building_compliance.addCompliance` | mutation | `building_compliance` | — |
| `building_compliance.deleteCompliance` | mutation | — | — |
| `building_docs.addDocument` | mutation | `building_documents` | — |
| `building_docs.deleteDocument` | mutation | — | — |
| `buildings.importPassport.parseAndDryRun` | action | — | — |
| `buildings.commitPassportImport.commitImport` | mutation | `passportImportBatches`, `buildings`, `worksHistory`, `drawingRegisterLinks`, `dataQualityIssues` | `buildings.commitPassportImport.emitAuditChunk` |
| `files.generateUploadUrl.generateUploadUrl` | mutation | — | — |
| `buildings.passport_v2.parseAndDryRun.parseAndDryRun` | action | — | `buildings.passport_v2.internal.authCheck`, `buildings.passport_v2.internal.loadBuildingsByAssetCodes`, `buildings.passport_v2.internal.loadAssignmentsForBuildings`, `buildings.passport_v2.internal.loadSystemsForBuildings`, `buildings.passport_v2.internal.loadComplianceForBuildings`, `buildings.passport_v2.internal.loadWorksForBuildings`, `buildings.passport_v2.internal.loadDrawingsForBuildings`, `buildings.passport_v2.internal.loadContactsForBuildings`, `buildings.passport_v2.internal.savePlan` |
| `buildings.passport_v2.commitPlan.commitPlan` | mutation | `buildings`, `buildingAssignments`, `worksHistory`, `buildingContacts`, `building_systems`, `building_compliance`, `building_drawings` | — |
| `governance.selfBootstrap.selfBootstrap` | mutation | `gov_roles`, `gov_memberships`, `gov_organisations` | — |
| `campus_admin.getCampus` | query | `buildings` | — |
| `campus_admin.updateCampusGeo` | mutation | — | — |
| `building_admin.createBuilding` | mutation | `buildings` | — |
| `building_admin.toggleBuildingActive` | mutation | — | — |
| `campus_admin.listCampuses` | query | `campuses` | — |
| `campus_admin.createCampus` | mutation | `campuses` | — |
| `campus_admin.toggleCampusActive` | mutation | — | — |
| `capital.authorities.listMine` | query | — | — |
| `capital.thresholds.list` | query | — | — |
| `capital.thresholds.listOverrides` | query | — | — |
| `governance.session.resolve` | query | `sp_users`, `gov_ssoMappings`, `gov_memberships` | — |
| `etenders.complianceReport.getComplianceReport` | query | `sp_eTendersRequirements`, `sp_rftInstances`, `sp_eTendersAwardCompliance`, `sp_eTendersCorrigenda` | — |
| `sp_rft.updateEtendersRef` | mutation | — | — |
| `sp_rft.listAllRfts` | query | `sp_rftInstances` | — |
| `geo_proposals.adoptGeoProposal` | mutation | — | — |
| `geo_proposals.rejectGeoProposal` | mutation | — | — |
| `governance.approvals.listPending` | query | `gov_approvalRequests` | — |
| `governance.approvals.listAll` | query | `gov_approvalRequests` | — |
| `governance.approvals.approve` | mutation | — | — |
| `governance.approvals.reject` | mutation | — | — |
| `governance.audit.listEvents` | query | `gov_auditEvents` | — |
| `governance.buildings.list` | query | `gov_buildingProfiles` | — |
| `governance.buildings.createProfile` | mutation | `buildings`, `gov_buildingProfiles` | — |
| `governance.complianceDocs.listDocs` | query | `gov_complianceDocs` | — |
| `governance.complianceDocs.getOverview` | query | `gov_complianceDocs` | — |
| `governance.complianceDocs.setStatus` | mutation | `gov_complianceDocVersions` | — |
| `governance.frameworks.list` | query | `gov_frameworks`, `gov_frameworkVersions` | — |
| `governance.frameworks.createFramework` | mutation | `gov_frameworks` | — |
| `governance.imports.getBatchDetail` | query | `gov_buildingImportRows`, `gov_buildingImportExceptions` | — |
| `governance.imports.resolveException` | mutation | — | — |
| `governance.imports.listBatches` | query | `gov_buildingImports` | — |
| `governance.imports.approveBatch` | mutation | — | — |
| `governance.imports.promoteBatch` | mutation | `gov_buildingImportRows`, `gov_buildingProfiles`, `gov_buildingProfileVersions` | — |
| `governance.imports.rollbackBatch` | mutation | `gov_buildingImportRows` | — |
| `governance.memberships.listMembers` | query | `gov_memberships` | — |
| `governance.memberships.listJoinRequests` | query | `gov_joinRequests` | — |
| `governance.memberships.listInvites` | query | `gov_invites` | — |
| `governance.memberships.listRolesForOrg` | query | `gov_roles` | — |
| `governance.memberships.listDepartmentsForOrg` | query | `gov_departments` | — |
| `governance.memberships.inviteUser` | mutation | `gov_invites` | — |
| `governance.memberships.approveJoinRequest` | mutation | `gov_memberships` | — |
| `governance.memberships.rejectJoinRequest` | mutation | — | — |
| `governance.memberships.deactivateMember` | mutation | — | — |
| `governance.memberships.updateMember` | mutation | — | — |
| `governance.memberships.updateUserProfile` | mutation | `gov_memberships` | — |
| `governance.notifications.listForUser` | query | `gov_notifications` | — |
| `governance.notifications.getSummary` | query | `gov_notifications` | — |
| `governance.notifications.markAllRead` | mutation | `gov_notifications` | — |
| `governance.notifications.markRead` | mutation | — | — |
| `admin.featureFlags.setOrgFeatureFlag` | mutation | — | — |
| `governance.organisations.create` | mutation | `gov_organisations` | — |
| `auth.canChangePassword.default` | *unresolved* | — | — |
| `auth.changePassword.default` | *unresolved* | — | — |
| `governance.userProvisioning.updateMySpUserProfile` | mutation | `sp_users` | — |
| `governance.organisations.listRegionsHierarchy` | query | `gov_regions`, `gov_organisations` | — |
| `governance.organisations.seedHealthRegions` | mutation | `gov_regions` | — |
| `governance.rolesMatrix.listRolesWithMemberCount` | query | `gov_roles`, `gov_memberships` | — |
| `governance.rolesMatrix.listOrgsWithMemberCount` | query | `gov_organisations`, `gov_memberships` | — |
| `governance.rolesMatrix.checkHseDemoStatus` | query | `gov_organisations`, `gov_memberships` | — |
| `governance.rolesMatrix.listMembersWithRoles` | query | `gov_memberships` | — |
| `governance.seedHseDemoUi.runSeedHseDemo` | mutation | — | `governance.seedHseDemo.seedHseDemoOrgsAndUsers` |
| `router_admin.listRulesets` | query | `router_rulesets` | — |
| `governance.buildings.getValidationQueue` | query | `gov_buildingProfileVersions` | — |
| `governance.buildings.validateVersion` | mutation | `gov_buildingValidationReviews` | — |
| `import_admin.getImportJob` | query | `import_rows` | — |
| `import_admin.processImportJob` | mutation | `import_rows`, `campuses`, `buildings`, `geo_proposals` | — |
| `import_admin.listImportJobs` | query | `import_jobs` | — |
| `import_admin.createImportJob` | mutation | `import_jobs`, `import_rows` | — |
| `import_admin.deleteImportJob` | mutation | `import_rows` | — |
| `ogp_admin.markArrangementReviewed` | mutation | — | — |
| `admin_actionsUi.triggerOgpSeedFromUi` | action | — | `admin_actions.runOgpSeedNow` |
| `admin_actionsUi.triggerOgpEnrichFromUi` | action | — | `admin_actions.runOgpEnrichNow` |
| `ogp_admin.listArrangementsForAdminPlus` | query | `ogp_arrangements` | — |
| `policy_admin.getPolicy` | query | — | — |
| `policy_admin.updatePolicy` | mutation | `org_policy_change_log` | — |
| `policy_admin.getPolicyChangeLog` | query | `org_policy_change_log` | — |
| `policy_admin.listPolicies` | query | `org_policies` | — |
| `policy_admin.createPolicy` | mutation | `org_policies`, `org_policy_change_log` | — |
| `policy_admin.togglePolicyActive` | mutation | `org_policy_change_log` | — |
| `policy_templates.admin.listTemplates` | query | `org_policy_templates` | — |
| `policy_templates.admin.propagateTemplateChanges` | mutation | `org_policies`, `org_policy_change_log` | — |
| `portal.admin.getAccountDetail` | query | `portal_frameworkInvitations`, `portal_subscriptions`, `portal_docExpiry` | — |
| `portal.admin.setTierOverride` | mutation | `portal_auditEvents` | — |
| `portal.admin.listAccounts` | query | `portal_supplierAccounts`, `portal_frameworkInvitations` | — |
| `portal.admin.getSubscriptionStats` | query | `portal_supplierAccounts` | — |
| `portal.admin.verifySubmissionIntegrity` | query | `portal_responses` | — |
| `portal.admin.getAuditLog` | query | `portal_auditEvents` | — |
| `portal.admin.getInvitationAnalytics` | query | `portal_frameworkInvitations` | — |
| `portal.admin.listPlatformInvites` | query | `portal_platformInvites` | — |
| `portal.admin.sendPlatformInvite` | mutation | `sp_users`, `portal_platformInvites`, `portal_auditEvents` | — |
| `router_sweep_admin.listDecisionsWithDrift` | query | `router_decisions` | — |
| `router_sweep_admin.listDecisionsNotReplayed` | query | `router_decisions` | — |
| `router_engine.replayDecision` | mutation | `router_rulesets` | — |
| `docTemplates.listTemplates.listTemplates` | query | `core_docTemplates` | — |
| `docTemplates.seedUi.seedTemplatesFromUi` | mutation | — | `docTemplates.seed.seed` |
| `docTemplates.setTemplateFile.setTemplateFile` | mutation | `core_docTemplates` | — |
| `governance.seedRolesUi.seedRolesFromUi` | mutation | — | `governance.seedRoles.seed` |
| `governance.bootstrap.bootstrapOrg` | mutation | `sp_users`, `sp_organisations`, `gov_roles`, `gov_organisations`, `gov_memberships` | — |
| `governance.importUpload.generateUploadUrl` | mutation | — | — |
| `governance.importUpload.createBatchFromUpload` | mutation | `gov_memberships`, `gov_buildingImports` | — |
| `governance.approvals.countPending` | query | `gov_approvalRequests` | — |
| `governance.notifications.countUnread` | query | `gov_notifications` | — |
| `governance.notifications.archive` | mutation | — | — |
| `governance.userProvisioning.listInvites` | query | `gov_invites` | — |
| `governance.userProvisioning.sendInvite` | mutation | `gov_invites` | `email.dispatchInviteEmail.dispatchInviteEmail` |
| `governance.userProvisioning.revokeInvite` | mutation | — | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `admin/api-keys/page.tsx` | ApiKeysPage | useMutation | `api.apiKeys.manage.createApiKey` |
| `admin/api-keys/page.tsx` | ApiKeysPage | useMutation | `api.apiKeys.manage.revokeApiKey` |
| `admin/approvals/page.tsx` | ApprovalsPage | useQuery | `api.procurements.listPendingOverrides.listPendingOverrides` |
| `admin/approvals/page.tsx` | ApprovalsPage | useMutation | `api.procurements.approveOverride.approveOverride` |
| `admin/approvals/page.tsx` | ApprovalsPage | useMutation | `api.procurements.rejectOverride.rejectOverride` |
| `admin/approvals/page.tsx` | ApprovalsPage | useQuery | `api.sp_procurements.listUsers` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useQuery | `api.building_admin.getBuilding` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useMutation | `api.building_admin.updateBuildingGeo` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useMutation | `api.building_compliance.addCompliance` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useMutation | `api.building_compliance.deleteCompliance` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useMutation | `api.building_docs.addDocument` |
| `admin/buildings/[id]/page.tsx` | BuildingDetailPage | useMutation | `api.building_docs.deleteDocument` |
| `admin/buildings/import/page.tsx` | BuildingPassportImportPage | useAction | `api.buildings.importPassport.parseAndDryRun` |
| `admin/buildings/import/page.tsx` | BuildingPassportImportPage | useMutation | `api.buildings.commitPassportImport.commitImport` |
| `admin/buildings/passport-v2/page.tsx` | PassportV2ImportPage | useMutation | `api.files.generateUploadUrl.generateUploadUrl` |
| `admin/buildings/passport-v2/page.tsx` | PassportV2ImportPage | useAction | `api.buildings.passport_v2.parseAndDryRun.parseAndDryRun` |
| `admin/buildings/passport-v2/page.tsx` | PassportV2ImportPage | useMutation | `api.buildings.passport_v2.commitPlan.commitPlan` |
| `admin/buildings/passport-v2/page.tsx` | PassportV2ImportPage | useMutation | `api.governance.selfBootstrap.selfBootstrap` |
| `admin/campuses/[id]/page.tsx` | CampusDetailPage | useQuery | `api.campus_admin.getCampus` |
| `admin/campuses/[id]/page.tsx` | CampusDetailPage | useMutation | `api.campus_admin.updateCampusGeo` |
| `admin/campuses/[id]/page.tsx` | CampusDetailPage | useMutation | `api.building_admin.createBuilding` |
| `admin/campuses/[id]/page.tsx` | CampusDetailPage | useMutation | `api.building_admin.toggleBuildingActive` |
| `admin/campuses/page.tsx` | admin/campuses/page.tsx | useQuery | `api.campus_admin.listCampuses` |
| `admin/campuses/page.tsx` | CampusesPage | useMutation | `api.campus_admin.createCampus` |
| `admin/campuses/page.tsx` | CampusesPage | useMutation | `api.campus_admin.toggleCampusActive` |
| `admin/capital/change-orders/page.tsx` | ChangeOrdersContent | useQuery | `api.capital.authorities.listMine` |
| `admin/capital/thresholds/page.tsx` | CapitalThresholdsContent | useQuery | `api.capital.thresholds.list` |
| `admin/capital/thresholds/page.tsx` | CapitalThresholdsContent | useQuery | `api.capital.thresholds.listOverrides` |
| `admin/compliance/page.tsx` | ComplianceScorecardPage | useQuery | `api.governance.session.resolve` |
| `admin/etenders/compliance/page.tsx` | ETendersCompliancePage | useQuery | `api.etenders.complianceReport.getComplianceReport` |
| `admin/etenders/page.tsx` | EtendersRefRow | useMutation | `api.sp_rft.updateEtendersRef` |
| `admin/etenders/page.tsx` | EtendersAdminPage | useQuery | `api.sp_rft.listAllRfts` |
| `admin/geo-proposals/page.tsx` | GeoProposalsPage | useMutation | `api.geo_proposals.adoptGeoProposal` |
| `admin/geo-proposals/page.tsx` | GeoProposalsPage | useMutation | `api.geo_proposals.rejectGeoProposal` |
| `admin/governance/approvals/page.tsx` | ApprovalsContent | useQuery | `api.governance.approvals.listPending` |
| `admin/governance/approvals/page.tsx` | ApprovalsContent | useQuery | `api.governance.approvals.listAll` |
| `admin/governance/approvals/page.tsx` | ApprovalsContent | useMutation | `api.governance.approvals.approve` |
| `admin/governance/approvals/page.tsx` | ApprovalsContent | useMutation | `api.governance.approvals.reject` |
| `admin/governance/audit/page.tsx` | AuditContent | useQuery | `api.governance.audit.listEvents` |
| `admin/governance/buildings/page.tsx` | BuildingsContent | useQuery | `api.governance.buildings.list` |
| `admin/governance/buildings/page.tsx` | BuildingsContent | useMutation | `api.governance.buildings.createProfile` |
| `admin/governance/compliance-docs/page.tsx` | StatusPill | useQuery | `api.governance.complianceDocs.listDocs` |
| `admin/governance/compliance-docs/page.tsx` | ComplianceDocsPage | useQuery | `api.governance.complianceDocs.getOverview` |
| `admin/governance/compliance-docs/page.tsx` | ComplianceDocsPage | useQuery | `api.governance.complianceDocs.listDocs` |
| `admin/governance/compliance-docs/page.tsx` | ComplianceDocsPage | useMutation | `api.governance.complianceDocs.setStatus` |
| `admin/governance/frameworks/page.tsx` | FrameworksContent | useQuery | `api.governance.frameworks.list` |
| `admin/governance/frameworks/page.tsx` | FrameworksContent | useMutation | `api.governance.frameworks.createFramework` |
| `admin/governance/imports/[id]/page.tsx` | ImportDetailContent | useQuery | `api.governance.imports.getBatchDetail` |
| `admin/governance/imports/[id]/page.tsx` | ImportDetailContent | useMutation | `api.governance.imports.resolveException` |
| `admin/governance/imports/page.tsx` | admin/governance/imports/page.tsx | useQuery | `api.governance.imports.listBatches` |
| `admin/governance/imports/page.tsx` | ImportsContent | useQuery | `api.governance.imports.listBatches` |
| `admin/governance/imports/page.tsx` | ImportsContent | useMutation | `api.governance.imports.approveBatch` |
| `admin/governance/imports/page.tsx` | ImportsContent | useMutation | `api.governance.imports.promoteBatch` |
| `admin/governance/imports/page.tsx` | ImportsContent | useMutation | `api.governance.imports.rollbackBatch` |
| `admin/governance/members/page.tsx` | MembersContent | useQuery | `api.governance.memberships.listMembers` |
| `admin/governance/members/page.tsx` | MembersContent | useQuery | `api.governance.memberships.listJoinRequests` |
| `admin/governance/members/page.tsx` | MembersContent | useQuery | `api.governance.memberships.listInvites` |
| `admin/governance/members/page.tsx` | MembersContent | useQuery | `api.governance.memberships.listRolesForOrg` |
| `admin/governance/members/page.tsx` | MembersContent | useQuery | `api.governance.memberships.listDepartmentsForOrg` |
| `admin/governance/members/page.tsx` | MembersContent | useMutation | `api.governance.memberships.inviteUser` |
| `admin/governance/members/page.tsx` | MembersContent | useMutation | `api.governance.memberships.approveJoinRequest` |
| `admin/governance/members/page.tsx` | MembersContent | useMutation | `api.governance.memberships.rejectJoinRequest` |
| `admin/governance/members/page.tsx` | MembersContent | useMutation | `api.governance.memberships.deactivateMember` |
| `admin/governance/members/page.tsx` | EditMemberModal | useMutation | `api.governance.memberships.updateMember` |
| `admin/governance/members/page.tsx` | EditMemberModal | useMutation | `api.governance.memberships.updateUserProfile` |
| `admin/governance/members/page.tsx` | EditMemberModal | useMutation | `api.governance.memberships.updateMember` |
| `admin/governance/notifications/page.tsx` | NotificationsPage | useQuery | `api.governance.notifications.listForUser` |
| `admin/governance/notifications/page.tsx` | NotificationsPage | useQuery | `api.governance.notifications.getSummary` |
| `admin/governance/notifications/page.tsx` | NotificationsPage | useMutation | `api.governance.notifications.markAllRead` |
| `admin/governance/notifications/page.tsx` | NotificationsPage | useMutation | `api.governance.notifications.markRead` |
| `admin/governance/organisations/feature-flags/page.tsx` | FeatureFlagsAdminPage | useMutation | `api.admin.featureFlags.setOrgFeatureFlag` |
| `admin/governance/organisations/page.tsx` | OrganisationsPage | useMutation | `api.governance.organisations.create` |
| `admin/governance/organisations/requests/page.tsx` | RequestsContent | useQuery | `api.governance.memberships.listRolesForOrg` |
| `admin/governance/profile/page.tsx` | ChangePasswordPanel | useQuery | `api.auth.canChangePassword.default` |
| `admin/governance/profile/page.tsx` | ChangePasswordPanel | useMutation | `api.auth.changePassword.default` |
| `admin/governance/profile/page.tsx` | MyDetailsEditor | useMutation | `api.governance.userProvisioning.updateMySpUserProfile` |
| `admin/governance/regions/page.tsx` | HealthRegionsPage | useQuery | `api.governance.organisations.listRegionsHierarchy` |
| `admin/governance/regions/page.tsx` | HealthRegionsPage | useMutation | `api.governance.organisations.seedHealthRegions` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useQuery | `api.governance.rolesMatrix.listRolesWithMemberCount` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useQuery | `api.governance.rolesMatrix.listOrgsWithMemberCount` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useQuery | `api.governance.rolesMatrix.checkHseDemoStatus` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useQuery | `api.governance.organisations.listRegionsHierarchy` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useQuery | `api.governance.rolesMatrix.listMembersWithRoles` |
| `admin/governance/roles/page.tsx` | RolesAccessPage | useMutation | `api.governance.seedHseDemoUi.runSeedHseDemo` |
| `admin/governance/rules/page.tsx` | RulesContent | useQuery | `api.router_admin.listRulesets` |
| `admin/governance/validation/page.tsx` | ValidationContent | useQuery | `api.governance.buildings.getValidationQueue` |
| `admin/governance/validation/page.tsx` | ValidationContent | useMutation | `api.governance.buildings.validateVersion` |
| `admin/import/[id]/page.tsx` | ImportJobDetailPage | useQuery | `api.import_admin.getImportJob` |
| `admin/import/[id]/page.tsx` | ImportJobDetailPage | useMutation | `api.import_admin.processImportJob` |
| `admin/import/page.tsx` | admin/import/page.tsx | useQuery | `api.import_admin.listImportJobs` |
| `admin/import/page.tsx` | ImportPage | useQuery | `api.import_admin.listImportJobs` |
| `admin/import/page.tsx` | ImportPage | useMutation | `api.import_admin.createImportJob` |
| `admin/import/page.tsx` | ImportPage | useMutation | `api.import_admin.processImportJob` |
| `admin/import/page.tsx` | ImportPage | useMutation | `api.import_admin.deleteImportJob` |
| `admin/intelligence/page.tsx` | IntelligenceDashboardPage | useQuery | `api.governance.session.resolve` |
| `admin/ogp/[id]/page.tsx` | OGPArrangementDetailPage | useMutation | `api.ogp_admin.markArrangementReviewed` |
| `admin/ogp/[id]/page.tsx` | OGPArrangementDetailPage | useAction | `api.admin_actionsUi.triggerOgpSeedFromUi` |
| `admin/ogp/[id]/page.tsx` | OGPArrangementDetailPage | useAction | `api.admin_actionsUi.triggerOgpEnrichFromUi` |
| `admin/ogp/page.tsx` | OGPAdminPage | useQuery | `api.ogp_admin.listArrangementsForAdminPlus` |
| `admin/ogp/page.tsx` | OGPAdminPage | useAction | `api.admin_actionsUi.triggerOgpSeedFromUi` |
| `admin/ogp/page.tsx` | OGPAdminPage | useAction | `api.admin_actionsUi.triggerOgpEnrichFromUi` |
| `admin/policies/[id]/page.tsx` | PolicyDetailPage | useQuery | `api.policy_admin.getPolicy` |
| `admin/policies/[id]/page.tsx` | PolicyDetailPage | useMutation | `api.policy_admin.updatePolicy` |
| `admin/policies/[id]/page.tsx` | PolicyDetailPage | useQuery | `api.policy_admin.getPolicyChangeLog` |
| `admin/policies/page.tsx` | admin/policies/page.tsx | useQuery | `api.policy_admin.listPolicies` |
| `admin/policies/page.tsx` | PoliciesPage | useMutation | `api.policy_admin.createPolicy` |
| `admin/policies/page.tsx` | PoliciesPage | useMutation | `api.policy_admin.togglePolicyActive` |
| `admin/policy-templates/page.tsx` | PolicyTemplatesPage | useQuery | `api.policy_templates.admin.listTemplates` |
| `admin/policy-templates/page.tsx` | PolicyTemplatesPage | useMutation | `api.policy_templates.admin.propagateTemplateChanges` |
| `admin/portal/accounts/[id]/page.tsx` | PortalAccountDetailPage | useQuery | `api.portal.admin.getAccountDetail` |
| `admin/portal/accounts/[id]/page.tsx` | PortalAccountDetailPage | useMutation | `api.portal.admin.setTierOverride` |
| `admin/portal/accounts/page.tsx` | PortalAccountsPage | useQuery | `api.portal.admin.listAccounts` |
| `admin/portal/accounts/page.tsx` | PortalAccountsPage | useQuery | `api.portal.admin.getSubscriptionStats` |
| `admin/portal/integrity/page.tsx` | IntegrityPage | useQuery | `api.portal.admin.verifySubmissionIntegrity` |
| `admin/portal/integrity/page.tsx` | IntegrityPage | useQuery | `api.portal.admin.getAuditLog` |
| `admin/portal/invitations/page.tsx` | InvitationAnalyticsPage | useQuery | `api.portal.admin.getInvitationAnalytics` |
| `admin/portal/invites/page.tsx` | PlatformInvitesPage | useQuery | `api.portal.admin.listPlatformInvites` |
| `admin/portal/invites/page.tsx` | PlatformInvitesPage | useMutation | `api.portal.admin.sendPlatformInvite` |
| `admin/portal/subscriptions/page.tsx` | SubscriptionsPage | useQuery | `api.portal.admin.getSubscriptionStats` |
| `admin/router/impact/page.tsx` | ImpactPage | useQuery | `api.router_admin.listRulesets` |
| `admin/router/integrity/page.tsx` | IntegrityPage | useQuery | `api.router_sweep_admin.listDecisionsWithDrift` |
| `admin/router/integrity/page.tsx` | IntegrityPage | useQuery | `api.router_sweep_admin.listDecisionsNotReplayed` |
| `admin/router/integrity/page.tsx` | IntegrityPage | useMutation | `api.router_engine.replayDecision` |
| `admin/AdminTemplateManager.tsx` | AdminTemplateManager | useQuery | `api.docTemplates.listTemplates.listTemplates` |
| `admin/AdminTemplateManager.tsx` | AdminTemplateManager | useMutation | `api.docTemplates.seedUi.seedTemplatesFromUi` |
| `admin/AdminTemplateManager.tsx` | AdminTemplateManager | useMutation | `api.docTemplates.setTemplateFile.setTemplateFile` |
| `admin/AdminTemplateManager.tsx` | AdminTemplateManager | useMutation | `api.files.generateUploadUrl.generateUploadUrl` |
| `admin/GovernanceBootstrap.tsx` | GovernanceBootstrap | useMutation | `api.governance.seedRolesUi.seedRolesFromUi` |
| `admin/GovernanceBootstrap.tsx` | GovernanceBootstrap | useMutation | `api.governance.bootstrap.bootstrapOrg` |
| `admin/ImportUploadButton.tsx` | ImportUploadButton | useMutation | `api.governance.importUpload.generateUploadUrl` |
| `admin/ImportUploadButton.tsx` | ImportUploadButton | useMutation | `api.governance.importUpload.createBatchFromUpload` |
| `admin/NationalAdminPanel.tsx` | NationalAdminPanel | useQuery | `api.governance.approvals.countPending` |
| `admin/NotificationBell.tsx` | NotificationBell | useQuery | `api.governance.notifications.countUnread` |
| `admin/NotificationBell.tsx` | NotificationBell | useQuery | `api.governance.notifications.listForUser` |
| `admin/NotificationBell.tsx` | NotificationBell | useMutation | `api.governance.notifications.markRead` |
| `admin/NotificationBell.tsx` | NotificationBell | useMutation | `api.governance.notifications.markAllRead` |
| `admin/NotificationBell.tsx` | NotificationBell | useMutation | `api.governance.notifications.archive` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useQuery | `api.governance.approvals.listPending` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useQuery | `api.governance.approvals.listAll` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useQuery | `api.governance.userProvisioning.listInvites` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useMutation | `api.governance.approvals.approve` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useMutation | `api.governance.approvals.reject` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useMutation | `api.governance.userProvisioning.sendInvite` |
| `admin/OrgManagementPanel.tsx` | OrgManagementPanel | useMutation | `api.governance.userProvisioning.revokeInvite` |
