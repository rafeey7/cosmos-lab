# COSMOS LAB agent instructions

Scope: this repository. Build a lightweight browser science foundation, not a full feature suite.

- Inspect existing changes and tasks before editing. Preserve other contributors' work.
- `src/physics` is pure TypeScript: no DOM, React, Three.js, renderer, wall-clock, random source or network. Use kg/m/s; never rescale physics values for display.
- Preserve readonly contracts and deterministic positive fixed-dt velocity Verlet. Reject invalid inputs; never silently clamp a singularity or fabricate a successful step.
- Rendering consumes snapshots through `src/contracts/render.ts`. Keep WebGL2, lazy 3D loading and the low preset as the baseline. No per-frame React state updates, unbounded trails, shadows or postprocessing in low.
- Use task branches specified in `docs/tasks`. Make contract changes explicit in docs and tests; graphics/UI should not rewrite the engine.
- Required validation: `pnpm check` plus `pnpm exec tsc -p tsconfig.physics.json`. Add meaningful analytic/conservation tests for physics changes. Browser performance requires actual hardware evidence.
- Report exact tests run and remaining failures. Never claim GitHub creation, push, remote CI, deployment or hardware performance without direct verification.
- Do not deploy, introduce secrets, or expand foundation scope incidentally. Keep documentation and lockfile current.
