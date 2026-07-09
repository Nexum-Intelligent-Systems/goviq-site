# GovIQ-Main — Bind Maps

Generated from source by `tools/bind-map/generate-bind-map.mjs`. Do not hand-edit — re-run the generator after code changes:

```
node tools/bind-map/generate-bind-map.mjs --config tools/bind-map/goviq-main.config.mjs
```

Each edge below is derived from an actual `useQuery`/`useMutation`/`useAction(api.*)` call and the matching Convex function body — not hand-drawn.

| Module | Convex functions referenced | UI bindings found |
|---|---|---|
| [admin](./admin.md) | 124 | 144 |
| [assessments](./assessments.md) | 5 | 7 |
| [audit-report](./audit-report.md) | 1 | 1 |
| [auth](./auth.md) | 3 | 3 |
| [budget](./budget.md) | 27 | 36 |
| [buildings](./buildings.md) | 20 | 21 |
| [buyer](./buyer.md) | 9 | 9 |
| [capital](./capital.md) | 117 | 153 |
| [contracts](./contracts.md) | 31 | 46 |
| [copilot](./copilot.md) | 0 | 0 |
| [dashboard](./dashboard.md) | 8 | 12 |
| [docroute](./docroute.md) | 0 | 0 |
| [docs](./docs.md) | 19 | 26 |
| [esign](./esign.md) | 2 | 2 |
| [eval](./eval.md) | 45 | 56 |
| [frameworks](./frameworks.md) | 17 | 23 |
| [goods](./goods.md) | 19 | 20 |
| [intelligence](./intelligence.md) | 7 | 21 |
| [invite](./invite.md) | 2 | 2 |
| [mini-comp](./mini-comp.md) | 21 | 21 |
| [offline](./offline.md) | 0 | 0 |
| [onboarding](./onboarding.md) | 1 | 1 |
| [planning](./planning.md) | 5 | 5 |
| [portal](./portal.md) | 41 | 44 |
| [portal-preview](./portal-preview.md) | 0 | 0 |
| [premises-assurance](./premises-assurance.md) | 0 | 0 |
| [privacy](./privacy.md) | 0 | 0 |
| [procurement](./procurement.md) | 39 | 47 |
| [profile](./profile.md) | 3 | 3 |
| [redactiq](./redactiq.md) | 13 | 17 |
| [route](./route.md) | 2 | 2 |
| [router](./router.md) | 25 | 30 |
| [service-requests](./service-requests.md) | 2 | 3 |
| [services](./services.md) | 93 | 141 |
| [sign](./sign.md) | 4 | 4 |
| [supplier](./supplier.md) | 44 | 48 |
| [supplier-profiles](./supplier-profiles.md) | 2 | 2 |
| [works](./works.md) | 35 | 39 |

See [PROCESS-FLOW.md](./PROCESS-FLOW.md) for the auto-derived cross-module dependency graph (which modules fan out into which backend subsystems, and which subsystems are the shared backbones).

## Known limitations of this generator

- Auto mode only derives modules from **directories** directly under `src/app/` — loose top-level files (`page.tsx`, `layout.tsx`, `SidebarLayout.tsx`, etc., the app shell/landing page) are not scanned as a module.
- Each module also scans `src/components/<same-or-aliased-name>/` for hook calls (this repo colocates a lot of binding logic in shared components imported by pages, not just in `src/app/**/page.tsx` itself) — but only when that directory name matches the app module name (or a configured alias). A component under a differently-named `src/components/` folder, or a shared component used by multiple modules, will attribute to whichever (if any) matching module scan finds it, and may be missed entirely if no `src/components/` subfolder matches.
- Convex functions are resolved **on demand**, only for `api.*` paths an actual UI hook call references (~600 across this app) — not exhaustively parsed like verifiq's smaller `convex/` tree. `convex/` here has 1,459 function files across ~40 top-level directories (capital alone has 203); a full inventory of every exported function (used or not) would need a separate, heavier pass — worth doing as a follow-up 'dead code' audit if useful, distinct from this UI bind map.
- A binding shows as 'unresolved' when the generator can't find `convex/<path-from-api-call>.ts` or can't find that export inside it — this can mean the path resolves through a re-export/barrel file the generator doesn't follow, or a Convex naming convention (e.g. component-scoped APIs) outside the plain `api.folder.file.function` pattern. Treat unresolved rows as 'needs a human look', not 'broken'.
- Table access is inferred from `ctx.db.query("table")` / `ctx.db.insert("table", ...)` in the resolved function's body only — cross-function table access (function A calls function B which touches a table) is captured one hop via the Triggers column, not recursively.
- Same component-attribution and hook-pattern caveats as verifiq (see that repo's bind-map README) apply here too.
