export default {
  title: "GovIQ-Main",
  configName: "goviq-main.config.mjs",
  repoRoot: "/workspace/goviq-main",
  schemaDir: "convex/schema",
  convexDir: "convex",
  appDir: "src/app",
  componentsDir: "src/components",
  componentDirAliases: { "mini-comp": "miniComp" },
  outDir: "/home/user/goviq-site/docs/bind-maps/goviq-main",
  mode: "auto",
  // Not product modules: dev/test scaffolding and non-page route handlers
  // (api/ has no .tsx components for the UI-binding scan to find).
  excludeAppDirs: ["api", "_dev", "e2e-harness", "test-harness", "diag"],
  moduleNotes: {
    capital: [
      "This app directory is one UI surface over a much larger backend: `convex/capital/` alone has 203 function files. Only the functions actually referenced by `src/app/capital/**` (plus `src/components/capital/**`) are resolved here — see the root README's 'Known limitations' for why this is on purpose (exhaustively parsing 1,459 Convex files was not tractable in one pass).",
    ],
    copilot: [
      "0 bindings is real, not a detection gap — confirmed by direct inspection. `src/app/copilot/page.tsx` does not use Convex hooks at all; it calls `fetch(\"/api/copilot\", ...)`, a Next.js API route (`src/app/api/copilot/route.ts`), which presumably talks to Convex and/or an LLM server-side. This generator only traces client-side `api.*` hook calls, so a fetch-to-API-route module like this one needs its bind map drawn by hand (or a second generator pass over `src/app/api/**/route.ts`) if you want that path documented too.",
    ],
  },
  limitations: [
    "Auto mode only derives modules from **directories** directly under `src/app/` — loose top-level files (`page.tsx`, `layout.tsx`, `SidebarLayout.tsx`, etc., the app shell/landing page) are not scanned as a module.",
    "Each module also scans `src/components/<same-or-aliased-name>/` for hook calls (this repo colocates a lot of binding logic in shared components imported by pages, not just in `src/app/**/page.tsx` itself) — but only when that directory name matches the app module name (or a configured alias). A component under a differently-named `src/components/` folder, or a shared component used by multiple modules, will attribute to whichever (if any) matching module scan finds it, and may be missed entirely if no `src/components/` subfolder matches.",
    "Convex functions are resolved **on demand**, only for `api.*` paths an actual UI hook call references (~600 across this app) — not exhaustively parsed like verifiq's smaller `convex/` tree. `convex/` here has 1,459 function files across ~40 top-level directories (capital alone has 203); a full inventory of every exported function (used or not) would need a separate, heavier pass — worth doing as a follow-up 'dead code' audit if useful, distinct from this UI bind map.",
    "A binding shows as 'unresolved' when the generator can't find `convex/<path-from-api-call>.ts` or can't find that export inside it — this can mean the path resolves through a re-export/barrel file the generator doesn't follow, or a Convex naming convention (e.g. component-scoped APIs) outside the plain `api.folder.file.function` pattern. Treat unresolved rows as 'needs a human look', not 'broken'.",
    "Table access is inferred from `ctx.db.query(\"table\")` / `ctx.db.insert(\"table\", ...)` in the resolved function's body only — cross-function table access (function A calls function B which touches a table) is captured one hop via the Triggers column, not recursively.",
    "Same component-attribution and hook-pattern caveats as verifiq (see that repo's bind-map README) apply here too.",
  ],
};
