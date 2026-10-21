import type { Body, GravityConfig, PhysicsEngine, TwoBodyState, Vec3 } from './types';

export const DEFAULT_GRAVITY: GravityConfig = Object.freeze({
  gravitationalConstant: 6.67430e-11,
  minimumSeparationM: 1,
});

const finite = (x: number) => Number.isFinite(x);
function validate(state: TwoBodyState, config: GravityConfig): void {
  if (!finite(state.timeS) || state.bodies.length !== 2) throw new RangeError('Invalid two-body state');
  if (!finite(config.gravitationalConstant) || config.gravitationalConstant <= 0 ||
      !finite(config.minimumSeparationM) || config.minimumSeparationM < 0) throw new RangeError('Invalid gravity config');
  if (state.bodies[0].id === state.bodies[1].id) throw new RangeError('Body IDs must be unique');
  for (const body of state.bodies) {
    if (!body.id || !finite(body.massKg) || body.massKg <= 0 || body.positionM.length !== 3 ||
        body.velocityMps.length !== 3 || !body.positionM.every(finite) || !body.velocityMps.every(finite)) {
      throw new RangeError('Invalid SI body values');
    }
  }
}

export function accelerations(state: TwoBodyState, config = DEFAULT_GRAVITY): readonly [Vec3, Vec3] {
  validate(state, config);
  const [a, b] = state.bodies;
  const d: Vec3 = [b.positionM[0] - a.positionM[0], b.positionM[1] - a.positionM[1], b.positionM[2] - a.positionM[2]];
  const r = Math.hypot(...d);
  if (!finite(r) || r <= config.minimumSeparationM) throw new RangeError('Separation outside point-mass domain');
  // Divide successively to avoid overflowing r^3 for astronomical coordinates.
  const factor = config.gravitationalConstant / r / r;
  const onA = d.map(x => (x / r) * factor * b.massKg) as unknown as Vec3;
  const onB = d.map(x => -(x / r) * factor * a.massKg) as unknown as Vec3;
  if (![...onA, ...onB].every(finite)) throw new RangeError('Acceleration overflow');
  return [onA, onB];
}

/** Pure velocity Verlet. One fixed SI timestep; returns fresh state or throws. */
export function stepVelocityVerlet(state: TwoBodyState, dtS: number, config = DEFAULT_GRAVITY): TwoBodyState {
  if (!finite(dtS) || dtS <= 0) throw new RangeError('dtS must be finite and positive');
  const previous = accelerations(state, config);
  const drift = (body: Body, a: Vec3): Body => ({
    ...body,
    positionM: body.positionM.map((x, i) => x + body.velocityMps[i]! * dtS + 0.5 * a[i]! * dtS * dtS) as unknown as Vec3,
  });
  const next: TwoBodyState = { timeS: state.timeS + dtS, bodies: [drift(state.bodies[0], previous[0]), drift(state.bodies[1], previous[1])] };
  const current = accelerations(next, config);
  const kick = (body: Body, a: Vec3, b: Vec3): Body => ({
    ...body,
    velocityMps: body.velocityMps.map((v, i) => v + 0.5 * (a[i]! + b[i]!) * dtS) as unknown as Vec3,
  });
  const result: TwoBodyState = { ...next, bodies: [kick(next.bodies[0], previous[0], current[0]), kick(next.bodies[1], previous[1], current[1])] };
  validate(result, config);
  return result;
}

export function diagnostics(state: TwoBodyState, config = DEFAULT_GRAVITY) {
  accelerations(state, config);
  const [a, b] = state.bodies;
  const separationM = Math.hypot(...a.positionM.map((x, i) => x - b.positionM[i]!));
  const kinetic = state.bodies.reduce((sum, body) => sum + 0.5 * body.massKg * body.velocityMps.reduce((s, v) => s + v * v, 0), 0);
  const momentumKgMps: Vec3 = [0, 1, 2].map(i => a.massKg * a.velocityMps[i]! + b.massKg * b.velocityMps[i]!) as unknown as Vec3;
  return { energyJ: kinetic - config.gravitationalConstant * a.massKg * b.massKg / separationM, momentumKgMps, separationM };
}

export const engine: PhysicsEngine = Object.freeze({ id: 'newtonian-two-body-verlet-v1', step: stepVelocityVerlet });
