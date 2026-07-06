# VerifiQ

Construction-compliance verification platform (Irish building regulations:
TGDs, HSE design guides). TypeScript, with a Convex backend.
<!-- TODO(verify): confirm the frontend framework (Next.js?) and package manager. -->

## Commands

<!-- TODO(verify): confirm these against package.json — CI runs typecheck · lint · test,
     so matching npm scripts almost certainly exist. -->
- Typecheck: `npm run typecheck`
- Lint: `npm run lint`
- Tests: `npm test`

Run all three before pushing; CI runs the same trio and a red push costs a
full babysitting round-trip.

## Repository landmarks

- `convex/` — Convex backend functions. <!-- TODO(verify) -->
- `docs/` — regulatory corpus source documents (e.g. `docs/hse-design-guides`).
  These are data, not code: never reformat, "fix", or lint them.
- Corpus/question-selection logic lives near the stage-aware question selector.
  <!-- TODO(verify): add the actual path once known. -->

## Git and PR rules

- Branch from `main`; open PRs as drafts.
- **One concern per PR.** Do not batch multiple sprints into one PR — large PRs
  (e.g. the Sprints 2–7 PR) multiply CI time, review rounds, and watcher cost.
- **Superseded-PR authority**: if this PR's work has already merged via another
  PR, close this one with a one-line comment linking the merged PR. Do not
  leave superseded drafts open awaiting confirmation.
- Never end a cloud session without pushing — remote containers are ephemeral.

## PR watching

- At most **one** watcher session for this repo at a time. If asked to watch a
  PR, first check for an existing watcher and hand the PR to it rather than
  starting a parallel hourly chain.
- Prefer `subscribe_pr_activity` for events, with a single ~hourly `send_later`
  fallback; stop the moment the PR is merged or closed.
