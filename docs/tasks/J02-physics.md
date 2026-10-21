# J02 — Physics

Branch: `j02-physics`. Status: ready for follow-up, not completed.

Own `src/physics` and numerical tests. Preserve SI readonly contracts and the pure deterministic velocity Verlet engine. Foundation kernel already exists; review and extend it, do not replace it with a renderer-coupled library.

Acceptance:
- [ ] Add eccentric Kepler reference, barycentre and angular-momentum checks with justified absolute/relative tolerances.
- [ ] Verify second-order convergence and velocity reversal behavior for smooth noncolliding cases.
- [ ] Specify safe dt selection and a close-encounter stop contract; document endpoint-only guard limitations.
- [ ] Test overflow, threshold equality and invalid runtime payloads; never silently soften gravity.
- [ ] Pass physics DOM-isolation compile, import guard, Vitest and production build.

No N-body expansion, relativity or UI controls. Coordinate any GravityConfig/state change with J03/J04. PR must include numeric worst-case errors and independent reference equations.
