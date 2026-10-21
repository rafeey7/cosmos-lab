# J03 — Graphics

Branch: `j03-graphics`. Status: ready for follow-up, not completed.

Own `src/graphics` and `src/contracts/render.ts`. Consume immutable snapshots; never integrate forces or convert SI state in place.

Acceptance:
- [ ] Verify WebGL2 initialization, no-WebGL2 and runtime context-loss fallback on actual browsers.
- [ ] Preserve default low preset, DPR 1, unlit low-poly bodies, no shadows/postprocessing/textures.
- [ ] Add a bounded trail only if needed (<=256 points/body), with complete resource disposal.
- [ ] Verify scale conversion at extreme supported positions and demand invalidation without idle rendering.
- [ ] Record bundle sizes, draw calls and memory on Intel UHD/8GB; propose budget changes only with evidence.

No WebGPU requirement, high preset, cinematic effects or physics changes. WebGPU may be a separate future proposal; WebGL2 must remain usable. Depend on J02 for any contract evolution.
