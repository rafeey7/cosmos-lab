/** SI throughout: kg, metres, seconds. Tuples are immutable boundary values. */
export type Vec3 = readonly [number, number, number];
export interface Body {
  readonly id: string;
  readonly massKg: number;
  readonly positionM: Vec3;
  readonly velocityMps: Vec3;
}
export interface TwoBodyState {
  readonly timeS: number;
  readonly bodies: readonly [Body, Body];
}
export interface GravityConfig {
  readonly gravitationalConstant: number;
  /** Reject separations <= this value; no hidden force softening. */
  readonly minimumSeparationM: number;
}
export interface PhysicsEngine {
  readonly id: 'newtonian-two-body-verlet-v1';
  step(state: TwoBodyState, dtS: number, config?: GravityConfig): TwoBodyState;
}
