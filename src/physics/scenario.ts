import type { TwoBodyState } from './types';
import { DEFAULT_GRAVITY } from './verlet';

/** Synthetic equal-mass binary; barycentre at origin. Not a measured solar system. */
export function createCircularExperiment(): TwoBodyState {
  const massKg = 1e24;
  const separationM = 1e8;
  const speed = Math.sqrt(DEFAULT_GRAVITY.gravitationalConstant * massKg / (2 * separationM));
  return { timeS: 0, bodies: [
    { id: 'a', massKg, positionM: [-separationM / 2, 0, 0], velocityMps: [0, -speed, 0] },
    { id: 'b', massKg, positionM: [separationM / 2, 0, 0], velocityMps: [0, speed, 0] },
  ] };
}
