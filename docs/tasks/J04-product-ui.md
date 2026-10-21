# J04 — Product UI

Branch: `j04-product-ui`. Status: ready for follow-up, not completed.

Own app shell, styling, validation messages and accessible controls. Consume PhysicsEngine and render snapshots.

Acceptance:
- [ ] Specify minimal pause/step/reset flow before adding continuous execution.
- [ ] Label every physics value and input with SI units, validate finite ranges, preserve last valid state on error.
- [ ] Make keyboard navigation, focus, error announcements and 360px mobile layout usable.
- [ ] Keep SI table and controls functional without 3D; explain illustrative radii and model limits.
- [ ] Add focused interaction tests for reset, step and engine failure handling.

No accounts, cloud storage, full tutorial system or analytics. Coordinate scheduler/stop semantics with J02 and rendering lifecycle with J03.
