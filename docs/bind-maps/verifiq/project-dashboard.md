# Project & Dashboard

Project CRUD, status, findings, and report reads that back the dashboard and project page.

**Files:** `src/convex/projectData.ts`, `src/convex/mutations.ts`

## Bind map

```mermaid
flowchart LR
  n0["page.tsx :: SignInBox"] -->|useQuery| n1["useQuery api.mutations.viewer"]
  n2["page.tsx :: Dashboard"] -->|useQuery| n3["useQuery api.projectData.listProjects"]
  n3 -->|reads/writes| n4[("projects")]
  n2["page.tsx :: Dashboard"] -->|useMutation| n5["useMutation api.mutations.createOwnProject"]
  n5 -->|reads/writes| n6[("users")]
  n5 -->|reads/writes| n4[("projects")]
  n7["projects/[id]/page.tsx :: ProjectPage"] -->|useQuery| n8["useQuery api.projectData.getProjectStatus"]
  n8 -->|reads/writes| n9[("findings")]
  n7["projects/[id]/page.tsx :: ProjectPage"] -->|useQuery| n10["useQuery api.projectData.getProjectFindings"]
  n10 -->|reads/writes| n9[("findings")]
  n7["projects/[id]/page.tsx :: ProjectPage"] -->|useQuery| n11["useQuery api.projectData.getProjectReport"]
  n11 -->|reads/writes| n12[("reports")]
  n11 -->|reads/writes| n13[("report_findings")]
```

## Convex functions

| Function | Kind | Tables touched | Triggers |
|---|---|---|---|
| `mutations.createUser` | mutation | `users` | — |
| `mutations.createOwnProject` | mutation | `users`, `projects` | — |
| `mutations.createProject` | internalMutation | `projects` | — |
| `mutations.addDocument` | internalMutation | `documents` | — |
| `mutations.insertFinding` | internalMutation | `findings` | — |
| `mutations.appendAudit` | internalMutation | `audit_log` | — |
| `mutations.viewer` | query | — | — |
| `mutations.getFindingByIssue` | internalQuery | `findings` | — |
| `mutations.listAudit` | internalQuery | `audit_log` | — |
| `projectData.getProjectStatus` | query | `findings` | — |
| `projectData.getProjectFindings` | query | `findings` | — |
| `projectData.getProjectReport` | query | `reports`, `report_findings` | — |
| `projectData.searchFindings` | query | `findings` | — |
| `projectData.searchDocuments` | query | `documents` | — |
| `projectData.listProjects` | query | `projects` | — |

## UI bindings

| Page | Component | Hook | Convex function |
|---|---|---|---|
| `page.tsx` | SignInBox | useQuery | `api.mutations.viewer` |
| `page.tsx` | Dashboard | useQuery | `api.projectData.listProjects` |
| `page.tsx` | Dashboard | useMutation | `api.mutations.createOwnProject` |
| `projects/[id]/page.tsx` | ProjectPage | useQuery | `api.projectData.getProjectStatus` |
| `projects/[id]/page.tsx` | ProjectPage | useQuery | `api.projectData.getProjectFindings` |
| `projects/[id]/page.tsx` | ProjectPage | useQuery | `api.projectData.getProjectReport` |
