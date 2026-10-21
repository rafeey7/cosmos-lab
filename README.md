# COSMOS LAB

Open-source browser physics lab. **Foundation stage**, with one synthetic two-body experiment, a pure TypeScript SI physics kernel and an intentionally small React/Three.js preview. No backend, authentication, telemetry or deployment is configured.

## Run locally

Use Node.js 24 LTS and pnpm 11.25.0 (`npm install -g pnpm@11.25.0`).

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm exec tsc -p tsconfig.physics.json
```

`pnpm test:watch` runs Vitest interactively; `pnpm build` typechecks and creates `dist/`; `pnpm preview` serves that build locally. `private: true` prevents accidental npm publication; it does not determine GitHub visibility.

## Foundation included

- React 19, TypeScript strict mode, Vite, Three.js and React Three Fiber 9.
- Immutable two-body state in kg, m and s; pure velocity Verlet, validation and energy/momentum diagnostics.
- Tested SI-to-render adapter; physics has no React, Three.js, DOM or external imports.
- Explicit WebGL2 baseline (no WebGPU dependency); unavailable/lost graphics falls back to SI data and working controls.
- Low preset: DPR 1, two low-poly unlit spheres, no textures/shadows/postprocessing, demand rendering, lazy-loaded 3D bundle.
- Vitest numerical contracts and GitHub Actions CI configuration.

## Hardware target and limits

Target: Intel UHD integrated graphics and 8 GB system RAM in a current WebGL2-capable browser. This is a design target, **not a verified performance claim**. The foundation draws only after user actions and has no continuous simulation loop. Native GPU/driver, context-loss behavior and long-session RAM must be measured in J05. WebGPU may be evaluated later; WebGL2 remains the compatibility path. WebGL1 is not supported by this Three.js baseline.

Physics takes fixed simulation seconds, independent of animation frames. The UI advances 60 s per click and exposes the complete state table. Sphere radius is a display aid; this is not a collision or full astronomy simulator. There is no automatic timestep adaptation or close-encounter solver.

## Project map

| Path | Responsibility |
| --- | --- |
| `src/physics/` | Standalone SI contracts, scenario, Verlet, diagnostics |
| `src/contracts/render.ts` | Read-only SI-to-display boundary |
| `src/graphics/` | WebGL2 capability check, fallback, R3F scene, low preset |
| `src/App.tsx` | Minimal experiment shell and SI data |
| `tests/` | Numerical and interface contracts |
| `scripts/check-boundaries.mjs` | Physics import isolation guard |
| `.github/workflows/ci.yml` | Install, isolation, tests and production build |
| `docs/architecture.md` | Ownership and extension rules |
| `docs/physics-assumptions.md` | Equations, units and numerical limits |
| `docs/tasks/` | J02–J06 specs and named branches |

See [CONTRIBUTING](CONTRIBUTING.md), [AGENTS](AGENTS.md), and [task specs](docs/tasks/README.md). MIT licensed; dependency licenses remain their own.
