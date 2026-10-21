import { expect, it } from 'vitest';
import { toRenderSnapshot } from '../src/contracts/render';
import { LOW_PRESET } from '../src/graphics/presets';
import { createCircularExperiment } from '../src/physics';

it('converts SI positions only at the render boundary without aliasing', () => {
  const state = createCircularExperiment();
  const snapshot = toRenderSnapshot(state, 1e7);
  expect(snapshot.bodies.map(b => b.position)).toEqual([[-5, 0, 0], [5, 0, 0]]);
  expect(snapshot.timeS).toBe(state.timeS);
  expect(snapshot.bodies[0]!.position).not.toBe(state.bodies[0].positionM);
  expect(state.bodies[0].positionM[0]).toBe(-5e7);
});
it.each([0, -1, NaN, Infinity])('rejects invalid visual scale %s', scale => {
  expect(() => toRenderSnapshot(createCircularExperiment(), scale)).toThrow(RangeError);
});
it('enforces the baseline low quality budget', () => {
  expect(LOW_PRESET).toMatchObject({ dpr: 1, shadows: false, antialias: false, maxBodies: 2, maxTrailPoints: 256, powerPreference: 'low-power' });
  expect(LOW_PRESET.sphereWidthSegments).toBeLessThanOrEqual(16);
});
