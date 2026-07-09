export default {
  title: "VerifIQ",
  configName: "verifiq.config.mjs",
  repoRoot: "/workspace/verifiq/verifiq26",
  schemaFile: "src/convex/schema.ts",
  convexDir: "src/convex",
  appDir: "src/app",
  outDir: "/home/user/goviq-site/docs/bind-maps/verifiq",
  modules: [
    {
      slug: "auth",
      title: "Auth",
      description: "Sign-in (Convex Auth, email magic-code/OTP) and per-project access control.",
      convexFiles: ["auth.ts", "auth.config.ts", "authz.ts"],
      notes: [
        "This module shows 0 auto-detected functions/bindings — not because it's unused, but because `auth.ts` exports `{ auth, signIn, signOut, store, isAuthenticated }` via `convexAuth({...})` (a destructured export, not the generator's `export const x = query(...)` pattern), and `src/app/page.tsx` calls it through `useAuthActions()` from `@convex-dev/auth/react`, not `useMutation(api.auth.*)`. Real binding: `src/app/page.tsx` (root component) → `useAuthActions().signIn(\"email-otp\", { email })` / `.signOut()` → `convexAuth` in `src/convex/auth.ts` → Convex Auth's own session tables (via `authTables` spread into `schema.ts`).",
        "`authz.ts` (`assertProjectAccess`) is called from inside other modules' handlers (e.g. `reviewData.requestReview`), not from the UI directly — it's a shared guard, not an entry point.",
      ],
    },
    {
      slug: "ingest-upload",
      title: "Ingest & Upload",
      description: "Magic-code upload sessions, direct-to-storage upload URLs, and document registration (R2 + Convex hybrid).",
      convexFiles: ["uploadDirect.ts", "uploadDocs.ts", "uploadTokens.ts"],
    },
    {
      slug: "classification",
      title: "Classification",
      description: "Auto-classifying uploaded documents by discipline/type, plus the human confirm/reclassify gate.",
      convexFiles: ["classify.ts", "classifyAction.ts", "classifyData.ts"],
    },
    {
      slug: "review-orchestration",
      title: "Review Orchestration",
      description: "The council review pipeline: workflow state machine, job queue, and the review-dispatch entry points the UI calls.",
      convexFiles: ["workflow.ts", "jobs.ts", "review.ts", "reviewData.ts"],
    },
    {
      slug: "project-dashboard",
      title: "Project & Dashboard",
      description: "Project CRUD, status, findings, and report reads that back the dashboard and project page.",
      convexFiles: ["projectData.ts", "mutations.ts"],
    },
    {
      slug: "reporting-export",
      title: "Reporting & Export",
      description: "Build Readiness Report / audit workbook data assembly and export.",
      convexFiles: ["auditData.ts", "auditExport.ts"],
      notes: [
        "0 UI bindings found, and confirmed by direct search — no `.tsx` file under `src/app` references `api.auditData.*` or `api.auditExport.*`. Either this is dead/not-yet-wired code, or export is triggered another way (e.g. a server action, script, or planned future UI) worth confirming with the team.",
      ],
    },
    {
      slug: "planning-conditions",
      title: "Planning Conditions",
      description: "Planning-permission condition tracking against findings.",
      convexFiles: ["planningConditions.ts"],
    },
    {
      slug: "learning-loop",
      title: "Learning Loop",
      description: "Feedback/lessons-learnt capture used to tune future classification and review runs.",
      convexFiles: ["learningData.ts"],
    },
    {
      slug: "platform",
      title: "Platform / Infra",
      description: "Cross-cutting infrastructure: inference cache, scheduled crons, outbound email, and the public HTTP front door (/intake).",
      convexFiles: ["cache.ts", "crons.ts", "email.ts", "http.ts"],
      notes: [
        "These are not called from the app UI by design — `crons.ts` is scheduler-triggered, `email.ts` is called server-side from `auth.ts`, `http.ts` exposes `POST /intake` for the public marketing site (an external HTTP caller, not a React hook), and `cache.ts` is used internally by the review pipeline.",
      ],
    },
  ],
  limitations: [
    "Detects only `useQuery`/`useMutation`/`useAction(api.*)` calls — library-specific hooks (e.g. Convex Auth's `useAuthActions()`) and non-React callers (HTTP routes, crons, scripts) are not auto-detected. See the `Notes` section on individual module pages for hand-verified exceptions.",
    "Table access is inferred from `ctx.db.query(\"table\")` / `ctx.db.insert(\"table\", ...)` calls in a function body. `.patch()`/`.get()`/`.delete()` calls on an id are not resolved to a table unless a `.query(\"table\")` on the same handler already established it — usually true in this codebase, but not guaranteed.",
    "Component attribution is line-based (nearest preceding top-level `function`/`const Name` declaration above the hook call), not full AST scope resolution — accurate for this codebase's one-major-component-per-page style, but would need a real parser (e.g. ts-morph) for deeply nested subcomponents.",
  ],
};
