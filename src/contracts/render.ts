import type { TwoBodyState, Vec3 } from '../physics';
export interface RenderBody { readonly id: string; readonly position: Vec3 }
export interface RenderSnapshot { readonly timeS: number; readonly bodies: readonly RenderBody[] }
/** Visual scale is applied only here. SI physics values never change. */
export function toRenderSnapshot(state: TwoBodyState, metresPerUnit: number): RenderSnapshot {
  if (!Number.isFinite(metresPerUnit) || metresPerUnit <= 0) throw new RangeError('Invalid render scale');
  return { timeS: state.timeS, bodies: state.bodies.map(body => ({ id: body.id,
    position: body.positionM.map(x => x / metresPerUnit) as unknown as Vec3,
  })) };
}
