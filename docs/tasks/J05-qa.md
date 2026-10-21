# J05 — QA

Branch: `j05-qa`. Status: ready for follow-up, not completed.

Own regression coverage and reproducible hardware/browser evidence. Start from foundation CI; assess integrated J02–J04 before release.

Acceptance:
- [ ] Run frozen install, isolation checks, numerical tests and production build from a clean checkout; link remote CI run.
- [ ] Test Chrome/Edge and Firefox with WebGL2, unavailable WebGL2, forced context loss, keyboard and 360px layout.
- [ ] Measure on Intel UHD/8GB: exact CPU/GPU/driver/browser, viewport, DPR, build SHA and procedure.
- [ ] Record cold-load JS transfer, idle GPU/frame behavior and tab/process RAM over 10 minutes; investigate leaks.
- [ ] For a future continuous loop, target >=30 fps, bounded catch-up and <=256 trail points/body; these targets are not yet measured.
- [ ] File reproducible bugs and distinguish automated tests from manual/hardware claims.

No unconditional performance pass from a different GPU or headless software renderer. Block release on numerical regression or unusable fallback.
