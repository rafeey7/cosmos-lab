# J04 — executable Product UI Engineer prompt

You are assigned J04 for COSMOS LAB. Requested model: Claude Sonnet 5.5. Use an actual Claude-capable session or a CEO-approved named substitute; report the actual model only when verified.

Repository: https://github.com/rafeey7/cosmos-lab
Target feature branch: `j04-product-ui`; PR base: `main`.
Source of truth: https://github.com/rafeey7/cosmos-lab/issues/3 and `docs/tasks/J04-product-ui.md`.
Verified foundation: `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`; inspect current branches/PRs before assuming the base.

## Mission and inputs

Build the incremental accessible Gravity Lab interface and experiment controller. Read AGENTS.md, CONTRIBUTING.md, docs/architecture.md, docs/physics-assumptions.md, docs/engineering-plan.md, issue #3 and its spec, App, physics API and render snapshot/viewport contracts. Obtain approved J02 parameter/dt/scenario/diagnostic contracts and J03 viewport/reset/intervention contract. If the plan has not merged, read the supplied J07 PR/branch `j07-engineering-coordination` and distinguish proposals from accepted APIs.

Use your own checkout/worktree. Preserve existing changes and history on `j04-product-ui`; do not reset/force-push or share another agent's working directory. Record base/head SHA and relevant existing PRs/CI. Produce separate focused PRs for independently reviewable slices; do not merge or deploy.

## Ownership and dependencies

Own src/App.tsx, src/main.tsx, src/styles.css, index.html, new src/ui/** and src/simulation/**, tests/ui/** and tests/simulation/**. The scheduler/controller is outside src/physics and outside renderer. Do not edit physics, src/contracts/render.ts, src/graphics, CI, shared test/build configuration or dependency files; ask J02/J03 for API changes and J05 for tooling. Shared architecture/task amendments require lead review.

Start with accessible existing step/reset/error behavior and a controller proposal. New parameter controls, gravity mode and continuous runner depend on C0: J02 supplies validated SI APIs/ranges; J03 supplies agreed snapshot/epoch props; you own lifecycle semantics. Publish controller decisions and obtain acknowledgements before integration. Test with agreed mocks while producers are pending; do not ship mock physics as the experiment. Reconcile Stage B scope in a reviewed task-spec addendum without dropping any issue #3 criterion.

## Acceptance

1. Preserve keyboard-operable step/reset and last-valid-state error behavior. Explicitly label physical units and frame. Fields edit drafts, reject NaN/infinity/out-of-range values, show announced errors and never corrupt the active state. Do not invent unsupported parameter limits; use J02's published contract.
2. After C0, Apply creates a new paused initial condition with selected velocity/mass, new epoch, cleared trails and diagnostics. Reset restores those applied parameters with gravity enabled and t=0. Gravity toggle pauses at a step boundary, retains current positions/velocities/time and starts a new diagnostic segment; conservation comparisons do not cross interventions. Show that removing the pair interaction is an artificial experiment.
3. Continuous play depends on an accepted controller contract. Use fixed physics dt, explicit time-scale, <=8 substeps/frame, <=250 ms admitted wall delta, bounded accumulator/backlog, pause on hidden tab and explicit resume. Never enlarge physics dt to catch up. Expose slower-than-requested status under overload. Step while paused advances one dt. Clear clock/accumulator on pause/reset; duplicate Play cannot start another loop; numerical failure stops on the last successful step.
4. Keep authoritative running state outside per-frame React updates. Publish views/metrics at a bounded agreed rate (proposed <=10Hz) and immediately after user commands/errors. J03 owns render invalidation. Make cleanup cancel loops and subscriptions.
5. Incrementally expose Playground controls and a Science Mode data view: simulation time, dt/time-scale, relative speed/separation, energy and other approved diagnostics with units, mode/segment and validity. Use the same physics run in both views. Show model limits and illustrative radii. No fabricated metric values or prerecorded orbital paths.
6. HTML data and all core controls must work when WebGL2 is absent or context is lost. Meet the plan's keyboard/focus/error, 360px, 200% zoom and accessibility criteria. Add focused tests for step, reset, apply, invalid inputs, engine errors, play/pause, hidden tab, overload and cleanup; mock clocks, not the physics in final integration tests.

## Mandatory validation

Use Node24/pnpm11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec tsc -p tsconfig.physics.json
```

List and run exact UI/controller test paths added. Request required DOM/accessibility/test dependencies from J05 before changing shared tooling. When browser tooling is merged, run its documented UI/fallback/keyboard suite against a production build. Record manual keyboard/360px/zoom checks separately with browser/version and SHA. Report remote CI for the latest head, not a prior base.

## Forbidden changes

No physics or render-contract ownership takeover, hardcoded fake trajectories, direct G=0/mass=0 workaround, SI display scaling passed into engine, variable wall-clock physics timestep, unbounded catch-up/history, per-frame React state updates, accounts/cloud/analytics/tutorial expansion, deployment, merge, credentials, force push or unrelated rewrites.

## PR and final report

PR targets main and references #3. Include interaction before/after, owned paths, accepted contract references and dependency PRs, screenshots/accessibility evidence, command/results, error/reset semantics and remaining limitations. Keep draft while J02/J03 dependencies are unresolved; do not close the issue for a partial UI slice. After prerequisites merge, incorporate main and rerun checks against actual producers.

Final report fields: task and actual/unverified model; branch/head SHA; PR URL; changes/owned paths; contract decisions/approvals; dependency status; command/results; interaction/accessibility evidence; NOT RUN checks; risks/blockers; next owner/action. State explicitly whether tests used mocks or integrated implementations.
