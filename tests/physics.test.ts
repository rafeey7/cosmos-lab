import { describe, expect, it } from 'vitest';
import { accelerations, createCircularExperiment, DEFAULT_GRAVITY, diagnostics, engine, stepVelocityVerlet, type TwoBodyState } from '../src/physics';

describe('SI two-body velocity Verlet contract', () => {
  it('matches an analytically solvable one-step problem in all axes', () => {
    const state: TwoBodyState = { timeS: 0, bodies: [
      { id: 'a', massKg: 2, positionM: [0, 0, 0], velocityMps: [0, 0, 0] },
      { id: 'b', massKg: 3, positionM: [1, 2, 2], velocityMps: [0, 0, 0] },
    ] };
    const config = { gravitationalConstant: 1, minimumSeparationM: 0 };
    const initial = accelerations(state, config);
    expect(initial[0][0]).toBeCloseTo(1 / 9, 14);
    expect(initial[0][1]).toBeCloseTo(2 / 9, 14);
    expect(initial[1][2]).toBeCloseTo(-4 / 27, 14);
    const next = stepVelocityVerlet(state, 0.1, config);
    expect(next.bodies[0].positionM[0]).toBeCloseTo(0.5 / 9 * 0.01, 14);
    const d = next.bodies[1].positionM.map((x, i) => x - next.bodies[0].positionM[i]!);
    const r = Math.hypot(...d);
    expect(next.bodies[0].velocityMps[0]).toBeCloseTo(0.05 * (1 / 9 + 3 * d[0]! / r ** 3), 14);
    expect(next.timeS).toBe(0.1);
  });

  it('is deterministic, immutable and satisfies engine interface', () => {
    const state = createCircularExperiment();
    for (const body of state.bodies) { Object.freeze(body.positionM); Object.freeze(body.velocityMps); Object.freeze(body); }
    Object.freeze(state.bodies); Object.freeze(state);
    const before = JSON.stringify(state);
    expect(engine.id).toBe('newtonian-two-body-verlet-v1');
    expect(engine.step(state, 60)).toEqual(engine.step(state, 60));
    expect(JSON.stringify(state)).toBe(before);
    expect(engine.step(state, 60).bodies[0]).not.toBe(state.bodies[0]);
  });

  it.each([0, -1, NaN, Infinity])('rejects invalid timestep %s', dt => {
    expect(() => engine.step(createCircularExperiment(), dt)).toThrow(RangeError);
  });

  it('rejects invalid bodies, configuration and collision domain', () => {
    const state = createCircularExperiment();
    for (const massKg of [0, -1, NaN, Infinity]) {
      expect(() => engine.step({ ...state, bodies: [{ ...state.bodies[0], massKg }, state.bodies[1]] }, 60)).toThrow(RangeError);
    }
    expect(() => engine.step({ ...state, bodies: [state.bodies[0], state.bodies[0]] }, 60)).toThrow(RangeError);
    expect(() => engine.step({ ...state, bodies: [state.bodies[0], { ...state.bodies[1], positionM: state.bodies[0].positionM }] }, 60)).toThrow(RangeError);
    expect(() => engine.step(state, 60, { ...DEFAULT_GRAVITY, minimumSeparationM: -1 })).toThrow(RangeError);
    expect(() => engine.step(state, 60, { ...DEFAULT_GRAVITY, gravitationalConstant: NaN })).toThrow(RangeError);
    expect(() => engine.step({ ...state, timeS: Infinity }, 60)).toThrow(RangeError);
    expect(() => engine.step({ ...state, bodies: [{ ...state.bodies[0], velocityMps: [NaN, 0, 0] }, state.bodies[1]] }, 60)).toThrow(RangeError);
  });

  it('conserves momentum for unequal masses', () => {
    let state = createCircularExperiment();
    state = { ...state, bodies: [{ ...state.bodies[0], massKg: 2e24 }, state.bodies[1]] };
    const before = diagnostics(state).momentumKgMps;
    for (let i = 0; i < 1000; i++) state = engine.step(state, 60);
    const after = diagnostics(state).momentumKgMps;
    const scale = 2e24 * 1000;
    after.forEach((p, i) => expect(Math.abs(p - before[i]!) / scale).toBeLessThan(1e-12));
  });

  it('keeps circular-orbit energy bounded over ten periods', () => {
    let state = createCircularExperiment();
    const initial = diagnostics(state);
    const period = 2 * Math.PI * Math.sqrt(initial.separationM ** 3 / (DEFAULT_GRAVITY.gravitationalConstant * 2e24));
    const dt = period / 1000;
    let worst = 0;
    for (let i = 0; i < 10000; i++) {
      state = engine.step(state, dt);
      worst = Math.max(worst, Math.abs((diagnostics(state).energyJ - initial.energyJ) / initial.energyJ));
    }
    expect(worst).toBeLessThan(1e-8);
  });

  it('shows second-order convergence to the analytic circular orbit', () => {
    const initial = createCircularExperiment();
    const period = 2 * Math.PI * Math.sqrt(1e24 / (DEFAULT_GRAVITY.gravitationalConstant * 2e24));
    function error(steps: number) {
      let state = initial;
      for (let i = 0; i < steps; i++) state = engine.step(state, period / steps);
      return Math.hypot(...state.bodies[0].positionM.map((x, i) => x - initial.bodies[0].positionM[i]!));
    }
    expect(error(200) / error(400)).toBeGreaterThan(3.8);
    expect(error(200) / error(400)).toBeLessThan(4.2);
  });
});
