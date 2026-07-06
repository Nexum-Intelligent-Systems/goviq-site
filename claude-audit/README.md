# Claude usage audit — deliverables

Audit date: 2026-07-06. Full findings were delivered in the session conversation;
this folder contains the actionable follow-ups.

## Status update (same day, after repo access was granted)

Two audit claims were corrected once the real repos were readable, and the
fixes have been delivered as PRs — the template folders below are therefore
**superseded**:

- **GovIQ-Main was already heavily configured** (11 KB root CLAUDE.md, 49 KB
  `.claude/CLAUDE.md`, settings allow/deny lists, 25 agents, hooks, skills).
  Only the genuinely missing pieces were added via
  [GovIQ-Main#696](https://github.com/Nexum-Intelligent-Systems/GovIQ-Main/pull/696):
  the docs-review static-prerender deploy guardrail, the CI-billing caveat,
  and the PR-hygiene rules.
- **verifiq already had a CLAUDE.md and `.claude/` agents/skills** but no
  `.claude/settings.json`. Added via
  [verifiq#60](https://github.com/Nexum-Intelligent-Systems/verifiq/pull/60):
  a permission allow/deny list mirroring GovIQ-Main's, plus a Git & PR
  Hygiene section.
- **The two zombie PRs (GovIQ-Main#690, document-parser#1) were already
  closed** on 2026-07-03 — no action was needed.

Still outstanding (only Liam can do these): delete the two broken routines
(section 1 below), and fix GitHub Actions billing.

## 1. Broken routines — manual cleanup required (you must do this)

Two recurring routines have been firing uselessly since 2026-06-05. They were
created from the claude.ai UI, and agents are not permitted to modify or delete
UI-created routines — so this needs ~2 minutes of your time:

Open **claude.ai → Claude Code → Routines** (or the Routines section of your
environment settings) and handle these two:

| Routine | Schedule | Problem | Action |
|---|---|---|---|
| `Error Scan` | Daily 08:00 | Prompt is literally the single word "Error"; ~30 wasted runs | Delete, or rewrite the prompt and point it at `LMD83/Procurement-Router` deliberately |
| `Git conflicts and errors check` | Every 4 hours | No repository source attached, so each run has no code to scan; ~180 wasted runs | Delete, or re-create with a repo source attached |

## 2. Per-repo Claude configuration drafts

Subfolders contain drafts for your two main repos. I could not read those
codebases from this session (repo access was denied), so the drafts are built
from what the audit surfaced about each repo — anything marked `TODO(verify)`
needs a quick check against the real code before committing.

To install in each repo:

```
cp verifiq/CLAUDE.md            <verifiq checkout>/CLAUDE.md
cp verifiq/settings.json        <verifiq checkout>/.claude/settings.json
cp GovIQ-Main/CLAUDE.md         <GovIQ-Main checkout>/CLAUDE.md
cp GovIQ-Main/settings.json     <GovIQ-Main checkout>/.claude/settings.json
```

Or just start a Claude Code session in each repo and say
"install the drafts from goviq-site/claude-audit, verifying the TODO items".
That session can confirm the actual commands (`npm run typecheck` vs `pnpm`,
test runner, etc.) before committing.

## 3. Standing-instruction changes these drafts encode

- **Superseded-PR authority**: sessions may close a draft PR once the work has
  merged elsewhere, so babysitting chains stop instead of running for days.
- **One watcher per repo**: consolidate PR babysitting into a single session
  per repo instead of several parallel hourly chains.
- **Small PRs**: one sprint / one concern per PR — cuts CI time and watcher cost.
- **Always push before a cloud session ends** — remote containers are ephemeral.
- **GovIQ-Main deploy guardrail**: `/docs/review/*` routes must stay statically
  prerendered (the 254 MB Lambda incident from PR #683 is written into that
  repo's CLAUDE.md so no session reintroduces it).
