# Contributing

Start from a J02–J06 task specification. Create the named branch from current `main`; keep changes within the task's ownership. Agree cross-boundary interface changes in the task/PR before implementation.

1. Install Node 24 and pinned pnpm, then `pnpm install --frozen-lockfile`.
2. Run `pnpm check` and `pnpm exec tsc -p tsconfig.physics.json`.
3. Document new equations, units, tolerances, failure modes and measured performance.
4. Open a focused PR with task link, validation output and limitations. Do not claim an unrun check passed.

Physics changes need an independent analytic or conservation-based check, not only snapshots of implementation output. UI/graphics changes need keyboard, small-screen and WebGL2/fallback checks. Do not commit credentials, machine-specific data, node_modules or dist. Dependencies require a reason and lockfile update. No external analytics, heavy assets or hosted services without an explicit design decision.

CI configuration does not imply a successful remote CI run. Deployment is a separate future task. Contributions are supplied under MIT.
