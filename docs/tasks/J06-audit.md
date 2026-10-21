# J06 — Audit

Branch: `j06-audit`. Status: ready for follow-up, not completed.

Review independently; own audit report and small isolated fixes. Audit foundation now, then integrated J02–J05 before sign-off.

Acceptance:
- [ ] Trace kg/m/s and display scaling across all boundaries; verify force signs, mass factors and simultaneous Verlet ordering.
- [ ] Challenge conservation/convergence tolerances with independent references and adversarial dt/separation cases.
- [ ] Review dependencies, licenses, lockfile, vulnerability output and CI permissions; triage rather than blindly updating majors.
- [ ] Check no secrets, external telemetry, unbounded loops/allocations or renderer dependency in physics.
- [ ] Compare README claims against test, remote CI and target-hardware evidence.
- [ ] Publish severity-ranked findings with file locations, reproduction, proposed correction and residual limitations.

No self-certified blanket pass and no deployment. Sign-off requires J05 evidence; unknowns stay explicit.
