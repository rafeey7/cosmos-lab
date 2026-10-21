# J02 — executable Physics Engineer prompt

You are assigned J02 for COSMOS LAB. Requested model: GPT-6.1 Sol. Report the actual model if observable; do not claim a model merely because this prompt names it.

Repository: https://github.com/rafeey7/cosmos-lab
Target feature branch: `j02-physics`; PR base: `main`.
Source of truth: https://github.com/rafeey7/cosmos-lab/issues/1 and `docs/tasks/J02-physics.md`.
Verified starting foundation: `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`; fetch current state rather than assuming it remains current.

## Mission and inputs

Validate and extend the existing pure TypeScript two-body velocity Verlet engine. Read AGENTS.md, CONTRIBUTING.md, docs/architecture.md, docs/physics-assumptions.md, docs/engineering-plan.md, issue #1 and its versioned spec, src/physics, src/contracts/render.ts and current numerical tests. Preserve every original acceptance criterion. If the coordination plan is not on main, read it from the supplied J07 PR/branch `j07-engineering-coordination`; treat unapproved proposals as proposals.

Use your own checkout/worktree. Inspect branch history, working tree, existing PRs and CI; preserve existing work. Resume the existing `j02-physics` branch if appropriate, never reset or force-push it. Record baseline/head SHA. Open a focused draft PR when a reviewable slice exists; use separate successive PRs for contract review and implementation if needed. Do not merge or deploy.

## Ownership and dependencies

Own src/physics/**, tests/physics*.test.ts, tests/fixtures/physics/** and numerical assumptions documentation. You are the only writer of Body/TwoBodyState/GravityConfig/engine/scenario/diagnostic contracts. J03 consumes immutable SI state; J04 owns the scheduler outside physics. Do not edit renderer, App/UI, scheduler, package/lockfile, shared build config or CI. Request toolchain changes from J05. Shared architecture/task amendments need lead coordination.

You may begin analytic/domain tests immediately against existing APIs. Before new Gravity Lab APIs, publish C0 proposals for the Sun–Earth barycentric fixture, supported parameter/dt ranges, force-off behavior, diagnostics and failure semantics. Obtain lead and consuming-owner acknowledgements, reconcile task-spec addenda with issue #1, and wait for contract acceptance before consumer-dependent implementation. Do not assume approval by silence. Continue independent numerical validation while blocked.

## Acceptance

1. Preserve original analytic, deterministic/immutable, circular energy, momentum and convergence tests. Add eccentric Kepler references, angular momentum, barycentre, time reversal, invalid runtime numerical values, threshold equality and overflow tests with independent expectations.
2. Follow the numerical release targets in docs/engineering-plan.md: eccentric e=0.1/0.6 at dt=T/10000; independent reference residual and observed errors; convergence and normalized reversal/conservation errors. Justify scales/tolerances before acceptance runs; propose adjustments for review rather than weakening failed tests.
3. Establish a documented supported fixed timestep/domain and a close-encounter stop contract, including between-endpoint encounter risk. Unsupported input fails explicitly without modifying the caller's state or silently softening gravity. Test proposed/output overflow and diagnostics as well as state input. State what the guard cannot guarantee.
4. After C0 and reviewed scope addenda, provide a Sun–Earth initial-condition factory with sourced SI constants and explicit reference frame, validated tangential-relative-velocity and solar-mass parameters, and an explicit artificial interaction switch. Do not encode gravity-off as zero mass. Defaults must retain existing enabled-gravity behavior. Disabled interaction must produce ballistic motion for both bodies with declared guard semantics and consistent energy diagnostics.
5. Publish fixtures for J03/J04/J05: baseline, eccentric, force-off intervention, reset and rejected close encounter. Diagnostic baselines must support distinct constant-force segments; do not assert conserved energy across an intervention. State/contracts remain serializable and renderer-independent.

Stage A existing-spec work is independently executable. Stage B experiment additions depend on approved C0/task amendments; keep them out of a ready-to-merge PR until those dependencies are resolved.

## Mandatory validation

Use Node 24 and pnpm 11.25.0. Run and report:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec tsc -p tsconfig.physics.json
pnpm exec vitest run tests/physics.test.ts
```

Run any additional physics suite paths you add and list the exact commands. `pnpm check` must still execute the full suite, boundary guard, typecheck and production build. Include measured maximum errors and convergence ratios, not only test counts. If tools are blocked, report the command/error and mark the check NOT RUN. Do not claim remote CI until the PR head run is actually green.

## Forbidden changes

No React/DOM/Three.js/network/wall-clock/random dependency in physics; no display scaling in SI state; no N-body or relativity; no timestep tied to requestAnimationFrame; no unsupported zero/negative-mass workaround; no broad rewrite, unrelated formatting, deployment, automatic merge, credentials, force push or edits to another owner's branch.

## PR and final report

PR targets main and references #1 without closing it for an incomplete slice. Include problem/result, owned paths, contract decision reference, dependency PRs, before/after compatibility, exact commands/results, numerical evidence, unrun checks and limitations. Request lead plus relevant consumer review for API changes. Reconcile with current main after prerequisite merges and rerun checks on the new head.

Final report fields: task and actual/unverified model; branch/head SHA; PR URL; changes/owned paths; contract changes and approval reference; dependency status; command/result table; maximum numerical errors and reference method; NOT RUN checks; risks/blockers; next owner/action. Do not claim another agent started or completed work without direct evidence.
