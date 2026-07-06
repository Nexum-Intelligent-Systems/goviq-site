# GovIQ-Main

GovIQ platform: Next.js (App Router) deployed on Vercel, plus the marketing
deploy (`gov-iq-main`). Domain: Irish government/construction compliance,
TGD corpus onboarding.
<!-- TODO(verify): confirm package manager and workspace layout. -->

## Commands

<!-- TODO(verify): confirm against package.json. CI workflows are named
     install / detect / compliance. -->
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Build (catches deploy-breaking errors locally): `npm run build`

## Deployment guardrails — read before touching routes

- **`/docs/review/read/[slug]` and `/docs/review/view/[slug]` must remain
  statically prerendered** (`generateStaticParams` + `dynamicParams = false`).
  In 2026-06 a runtime Lambda for these routes hit Vercel's 250 MB uncompressed
  function limit (254 MB, `NOW_SANDBOX_WORKER_MAX_UNCOMPRESSED_FUNCTION_SIZE`)
  and blocked all deploys until PR #683 made them static. Any change that
  reintroduces a runtime path for these routes will break production deploys.
- After pushing route/config changes, verify the Vercel deployment via the
  Vercel MCP (project `prj_TrOaABAn9K0XtOtSNOVsElPZRGqp`, team
  `liams-projects-eb2f3bfa`): deployment state must reach READY, and check
  build logs (`errorsOnly`) on ERROR.

## CI caveats

- GitHub Actions runs have failed for billing (out-of-credit) reasons in the
  past, not code reasons. Before diagnosing a "failure", check whether the run
  actually executed; report billing blockages to Liam instead of pushing
  speculative fixes.

## Git and PR rules

- Branch from `main`; open PRs as drafts. One concern per PR.
- **Superseded-PR authority**: if this PR's work has already merged elsewhere,
  close it with a one-line comment linking the merged PR — do not leave
  superseded drafts open awaiting confirmation.
- Scope work to ONE repo before starting: corpus/pipeline work has previously
  produced parallel PRs in GovIQ-Main, document-parser, and verifiq for the
  same feature, leaving zombie drafts. If the work belongs in another repo,
  say so and stop rather than opening a scoping PR here.
- Never end a cloud session without pushing.

## PR watching

- At most one watcher session for this repo; prefer `subscribe_pr_activity`
  with an hourly `send_later` fallback. Stop when the PR merges or closes.
