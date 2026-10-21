# J05 — executable QA / DevOps Engineer prompt

You are assigned J05 for COSMOS LAB. Requested model: GPT-6.1 Sol. Report the actual model when known; the assignment text is not proof of execution.

Repository: https://github.com/rafeey7/cosmos-lab
Target feature branch: `j05-qa`; PR base: `main`.
Source of truth: https://github.com/rafeey7/cosmos-lab/issues/4 and `docs/tasks/J05-qa.md`.
Verified foundation: `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`; inspect current state before working.

## Mission and inputs

Create reproducible integration/browser evidence and release-readiness checks. Read AGENTS.md, CONTRIBUTING.md, architecture, physics assumptions, docs/engineering-plan.md, issues/specs #1–#5, package/lockfile, current Vitest and CI, and producer PRs/contracts. If J07 is pending, read the supplied PR/branch `j07-engineering-coordination`; treat unaccepted contract/gate proposals as review inputs.

Use an isolated checkout/worktree; preserve branch history and existing work on `j05-qa`. Inspect remote PRs/CI, record base/head SHA and open focused PRs. Do not reset/force-push, merge, deploy or change repository permissions. Tooling can land separately before integrated QA, but only through an authorized merge.

## Ownership and dependencies

Own tests/integration/**, tests/e2e/**, browser-test configuration, docs/qa/** and .github/workflows/**. During coordinated tooling changes you are the sole writer of package.json, pnpm-lock.yaml, workspace settings, Vite/TS config; register a single-writer change with lead and consumers before editing. Keep dependencies minimal and preserve existing commands. J02 owns numerical tests/physics, J03 graphics tests/renderer, J04 UI/controller unit tests/application. Report production defects to owners instead of implementing their features.

Start baseline installs, current browser checks, test-matrix design and lightweight tooling now. Collect J03/J04 tooling requirements into one reviewed PR. New integration tests depend on accepted C0 contracts; final assertions and release evidence require actual J02/J03/J04 implementations on an exact integrated candidate. Do not count mocks, skipped tests or foundation CI as MVP success. J06's final review depends on your evidence package.

## Acceptance

1. Preserve current CI and all original issue #4 criteria. From a clean checkout, verify frozen installation, import isolation, physics-only compile, numerical suite, typecheck and production build. Add reproducible browser/integration commands and CI jobs after approval of shared tooling.
2. Proposed command contract after your tooling PR: `pnpm test:integration`, `pnpm test:e2e` and `pnpm test:a11y`. These commands do not exist in the foundation. Define their scripts/config and fixture/environment dependencies in the PR before asking others to run them. Scope Vitest and browser-test discovery explicitly so one runner does not collect the other's specs. Provision browser binaries and start/stop the production preview reproducibly; document setup and failure artifacts.
3. Test actual play/pause/step/reset, validated velocity/mass edits, force-off transition, diagnostic segments and last-valid-state failure behavior after producers land. Use fake clocks for deterministic scheduler tests; verify 30/60/120Hz schedules, visibility pause, overload cap, duplicate-loop prevention and cleanup. Final physics/render/UI checks must use the real engine.
4. Run production-build browser checks on current stable Chrome, Edge and Firefox on Windows, recording versions. Cover 360px and 1280x720, unavailable WebGL2, initialization failure and context loss. Ensure fallback controls/table remain functional, no uncaught exception or indefinite loading. An automated Chromium binary alone does not certify branded Chrome/Edge or Firefox.
5. Evaluate keyboard flow, accessible labels/units, visible focus, announced errors, 200% zoom, reduced-motion-compatible pause and zero serious/critical automated accessibility findings. Keep manual checks distinct from automated coverage.
6. Execute the engineering plan's three-run Intel UHD/8GB protocol and report raw observations for active fps, frame timings, paused rendering, bounded trails, memory and gzip JS budget. Record CPU/GPU/driver/browser/power mode, fixture/dt/time-scale and candidate SHA. If hardware is unavailable, mark hardware gates NOT RUN/BLOCKED and request the resource; other QA proceeds.
7. Audit dependency/license results including development tooling; triage advisories and explain build warnings. Prepare hosting-neutral deployment-readiness notes (build output, paths, cache assumptions and rollback considerations) without deploying or adding secrets.
8. Publish docs/qa/release-candidate.md using PASS/FAIL/NOT RUN for each release gate, observed vs expected values, exact commands/procedures, artifacts, candidate SHA and unresolved issues. Handoff to J06; do not certify your own evidence as independent audit.

## Mandatory commands

Node24/pnpm11.25.0 baseline:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec tsc -p tsconfig.physics.json
pnpm audit --json
```

After your reviewed tooling scripts exist, run `pnpm test:integration`, `pnpm test:e2e`, `pnpm test:a11y` with the documented browser setup. Record exact additional commands and outputs. Preserve the full-suite check; do not skip or weaken failing tests to make CI green. Advisory service unavailability is NOT RUN, not zero vulnerabilities. Verify CI on the final PR/candidate SHA. Any candidate code change requires affected evidence reruns and final CI.

## Forbidden changes

No implementation of J02–J04 production features, fake benchmark numbers, treating software-rendered/different-GPU results as Intel UHD success, silent test disabling, broad dependency major upgrades, telemetry/secrets, deployment, auto-merge, branch protection changes, force push or overwriting another agent's edits.

## PR and final report

PR targets main, references #4 and the relevant producer/tooling PRs. State owned/shared paths, approval for shared config edits, test discovery/environment setup, exact commands/results and artifact locations. Tooling PRs may be ready before features; integrated QA PR remains draft until producer dependencies are real and evaluated. Do not close #4 for a partial tooling slice.

Final report fields: task and actual/unverified model; branch/head SHA; PR URL; changes/owned paths; shared-tooling/contract approvals; dependency state; command/result table; gate-by-gate observed values and artifacts; NOT RUN checks/hardware gaps; severity-ranked bugs and owners; next action/J06 handoff. No deployment or release success claim is authorized by this prompt.
