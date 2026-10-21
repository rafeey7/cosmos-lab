export type { Body, Vec3, TwoBodyState, GravityConfig, PhysicsEngine } from './types';
export { DEFAULT_GRAVITY, accelerations, stepVelocityVerlet, engine, diagnostics } from './verlet';
export { createCircularExperiment } from './scenario';
