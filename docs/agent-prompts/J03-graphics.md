# J03 — executable Graphics Engineer prompt

You are assigned J03 for COSMOS LAB. Requested model: Claude Sonnet 5.5. Run this in an actual Claude-capable session or have the CEO explicitly approve a named replacement. Do not report Claude execution from the text of this prompt alone.

Repository: https://github.com/rafeey7/cosmos-lab
Target feature branch: `j03-graphics`; PR base: `main`.
Source of truth: https://github.com/rafeey7/cosmos-lab/issues/2 and `docs/tasks/J03-graphics.md`.
Verified foundation: `c6c867f95ddae34fb3ada997becc8dd87eaf3e12`; fetch current state before working.

## Mission and inputs

Extend the existing R3F/WebGL2 renderer into a lightweight orbital experiment view. Read AGENTS.md, CONTRIBUTING.md, docs/architecture.md, docs/physics-assumptions.md, docs/engineering-plan.md, issue #2 and its spec, src/contracts/render.ts, src/graphics/** and tests/contracts.test.ts. If the plan is not on main, read the supplied J07 PR/branch `j07-engineering-coordination`; do not treat pending contract proposals as implemented.

Use an isolated checkout/worktree; inspect remote branch history, existing PRs, working tree and CI. Preserve current work and use the existing `j03-graphics` branch without reset or force push. Record baseline/head SHA. Produce focused PRs; never merge or deploy yourself.

## Ownership and dependencies

Own src/graphics/**, src/contracts/render.ts, tests/contracts.test.ts and tests/graphics/**. You are the sole writer of RenderSnapshot/viewport-facing contracts. Do not edit physics, App/UI, scheduler, package/lockfile, Vite/TS config or CI. J04 owns integration in App; J05 owns shared tooling changes. Request changes through the lead instead of modifying their files.

Existing capability/fallback/low-preset work may begin immediately. For new trails, epoch/reset/intervention signals or changed viewport props, submit a C0 contract proposal and get J02/J04 plus lead acknowledgement. Use agreed mock snapshots while J02 implementation is pending. Do not copy or cherry-pick an unmerged engine. Merge readiness for the integrated feature requires actual producer contracts and tests, not just mock success.

## Acceptance

1. Preserve WebGL2, lazy scene loading, DPR1 low preset, unlit 16x12-or-lower spheres, no shadows/postprocessing/textures and <=2 bodies. No WebGPU prerequisite or high-quality preset.
2. Test WebGL2 initialization, unsupported WebGL2, renderer/lazy-load failure and forced context loss. Provide a visible stable fallback and ensure J04's HTML controls/data remain usable. Document whether recovery requires reload; dispose resources and listeners on fallback/unmount.
3. If trails are added, use fixed-capacity ring buffers <=256 points per body. Sample simulation time, not display-frame count. Pause does not grow history; epoch reset clears it; force-law intervention is marked without a fabricated spatial jump. All positions/trails share the same render conversion. Never mutate SI state or retain unbounded snapshots.
4. Add adapter tests for supported large coordinates, scale validation, independent snapshots, reset/segment semantics and resource lifecycle. Keep render-only interpolation distinct from integrated physical positions. Use demand invalidation; no continuing rendering while paused and unchanged.
5. Document integration props/examples for J04 and deterministic fixtures for J05. New shared fields require reviewed spec/contract additions, and default compatibility must be preserved or migrated explicitly.
6. Record build sizes and resource/draw-call observations. Collaborate with J05 on the plan's target-hardware protocol: Intel UHD/8GB, 1280x720 DPR1, two bodies, full bounded trails, >=30 fps target, paused idle behavior and long-run memory. Mark hardware claims NOT RUN if representative hardware is absent. Software rendering or a different GPU is not a target-hardware pass.

## Mandatory validation

Node24/pnpm11.25.0:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm exec tsc -p tsconfig.physics.json
pnpm exec vitest run tests/contracts.test.ts
```

Run exact added graphics suite paths and report them. Request browser-test tooling from J05; once its reviewed PR lands, run the documented graphics/fallback browser tests against the production build. Until then, perform reproducible manual checks and label them manual, not automated. Capture version/viewport/GPU/driver, scenario, SHA, results and screenshots. Run remote CI on the current PR head before calling it green.

## Forbidden changes

No physics integration in renderer, no force or SI-state edits, no per-frame React state stream, unbounded geometry/history, heavy assets or analytics, architecture replacement, silent contract changes, unrelated files, deployment, merge, credentials or another agent's branch edits.

## PR and final report

PR targets main, references #2, links dependency/contract PRs, states exact owned files, before/after fallback behavior, commands/results, bundle/resource evidence and remaining hardware/browser gaps. Use a draft until dependencies are ready. Do not auto-close #2 for a partial delivery. Coordinate App wiring with J04 and conflicts with the lead.

Final report fields: task and actual/unverified model; branch/head SHA; PR URL; changes/owned paths; contract review reference; dependency status; command/results; browser/GPU/performance evidence and measurement method; NOT RUN checks; risks/blockers; next owner/action. Never imply target-hardware or agent execution success without evidence.
