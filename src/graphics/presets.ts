export const LOW_PRESET = Object.freeze({
  id: 'low', dpr: 1, antialias: false, shadows: false,
  sphereWidthSegments: 16, sphereHeightSegments: 12,
  powerPreference: 'low-power' as const,
  maxBodies: 2, maxTrailPoints: 256,
});
