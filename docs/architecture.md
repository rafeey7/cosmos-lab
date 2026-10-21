# Architecture — foundation v1

Status: foundation implementation; J02–J06 remain follow-up work.

```text
React product shell -> physics engine -> immutable TwoBodyState (SI)
                                  -> toRenderSnapshot(scale)
                                  -> lazy WebGL2 R3F renderer
                         SI table remains usable without graphics
```

## Contracts

`Body` contains a unique nonempty ID, positive finite massKg, positionM and velocityMps readonly length-three tuples. `TwoBodyState` contains exactly two bodies and finite timeS. Negative time origins are allowed. `PhysicsEngine.step(state, dtS, config)` returns a new state at timeS + dtS or throws RangeError; dtS is finite and positive. The kernel validates current and proposed state. Callers retain the last valid state on failure.

`GravityConfig` exposes positive finite G and a nonnegative minimum separation, both in SI. `RenderSnapshot` contains IDs, simulation time and visually scaled positions only. Its coordinates are dimensionless scene units. No Three.js object may cross into physics. TypeScript readonly is a compile-time boundary, not runtime freezing; callers should treat returned values as immutable.

`tsconfig.physics.json` excludes DOM and ambient Node types. The import guard rejects external imports or relative imports outside physics. This is a maintenance guard, not a hostile-code security sandbox. CI runs both guards.

## Renderer and resource budget

Use stable React 19 / R3F 9; WebGLRenderer is explicitly WebGL2. WebGPU is not implemented in the foundation. This WebGL2 path fulfills the fallback compatibility requirement without requiring WebGPU detection or loading another renderer. With no usable WebGL2, display state in HTML and keep stepping/reset working. Capability probing releases its temporary context. Runtime context loss switches to the same fallback; renderer initialization and lazy-import failures are caught by an error boundary. Reload the page to retry graphics.

Low is the only shipped preset: DPR 1, 16×12 sphere segments, two bodies, unlit materials, no shadows, antialiasing, textures or postprocessing; demand rendering. Future trails must be ring buffers capped at 256 points. These are budgets; current code has no trails. Render snapshot changes invalidate demand rendering through R3F.

The preview is a lazy chunk. A future continuous runner belongs outside the physics kernel: fixed dt accumulator, explicit time-scale, pause on visibility loss, bounded catch-up (proposed maximum 8 substeps/frame), clamp wall-clock stalls without silently changing physics dt. None of that scheduler is shipped yet. A worker is optional only after profiling; its protocol should use serializable SI snapshots. Never use requestAnimationFrame timestamps as physics timestep values.

## Ownership and integration

- J02 owns physics and numerical evidence.
- J03 owns graphics, capabilities and the render adapter, consuming the kernel contract.
- J04 owns the product shell, inputs and accessibility, consuming both contracts.
- J05 owns cross-platform validation and regression evidence.
- J06 independently audits units, algorithm, dependencies and claims.

All task branches start from the same foundation main. Specs record dependencies and merge criteria. No backend or deployment is part of this milestone.

## Primary references

- [React Three Fiber installation and React compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction)
- [Three.js WebGLRenderer](https://threejs.org/docs/pages/WebGLRenderer)
- [Vite runtime requirements](https://vite.dev/guide/)
