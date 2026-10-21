# Physics assumptions and numerical contract

## Model and units

Two positive point masses in an isolated inertial Cartesian 3D frame, with Newtonian pair gravity only. Position in metres, mass in kilograms, velocity in m/s, acceleration in m/s², time and dt in seconds, energy in joules, momentum in kg·m/s. JavaScript numbers use IEEE-754 double precision. Default G = 6.67430 × 10^-11 m³·kg^-1·s^-2, following the [NIST 2022 CODATA value](https://physics.nist.gov/cgi-bin/cuu/Value?bg). No relativistic effects, expansion, tides, spin, drag, collisions, radiation or external force.

For d = x₂ − x₁, r = |d|:

```text
a₁ = G m₂ d / r³
a₂ = −G m₁ d / r³
x' = x + v dt + ½ a dt²
v' = v + ½ (a + a(x')) dt
E = Σ ½ m |v|² − G m₁ m₂/r
P = Σ m v
```

Both positions advance using old accelerations before either new acceleration is computed; both velocities then advance using the old/new average. This is velocity Verlet, globally second-order for smooth forces at a fixed timestep. Positions and velocities are synchronized at the same simulation time.

## Domain and failure semantics

Default minimum separation is 1 m. Separations <= that limit, zero/negative/nonfinite masses, repeated/empty IDs, nonfinite vectors/time, invalid G/threshold/dt, and detected overflow throw RangeError. The limit is a rejection guard, not softening or a collision radius. Finite positive dt alone does not imply accuracy: a large step can jump through a close encounter without endpoint detection. No adaptive timestep, swept collision check or close-encounter regularization exists. J02 must specify how future continuous execution stops before leaving the valid domain.

## Reference experiment and acceptance

Equal masses m = 10²⁴ kg separated by r = 10⁸ m; barycentre at origin. Each body's speed is sqrt(Gm/(2r)); period is 2π sqrt(r³/(G·2m)). This is synthetic, not ephemeris data. UI dt = 60 s. Visual position scale = 10⁷ metres per scene unit; drawn radius is illustrative.

Tests include an analytic unequal-mass 3D acceleration/one-step case, immutable/deterministic output, invalid input rejection, momentum over 1000 steps, circular energy over ten periods at 1000 steps/period (maximum relative error < 10^-8), and convergence against a full analytic circular orbit (200 vs 400 steps, position-error ratio 3.8–4.2). Those tolerances describe this fixture only; they do not guarantee arbitrary-orbit accuracy. J02 adds eccentric, reversibility, barycentre and angular-momentum cases. J06 reviews assumptions independently.
