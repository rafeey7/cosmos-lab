import { Canvas } from '@react-three/fiber';
import type { RenderSnapshot } from '../contracts/render';
import { LOW_PRESET } from './presets';

export default function Scene({ snapshot }: { snapshot: RenderSnapshot }) {
  return <Canvas frameloop="demand" dpr={LOW_PRESET.dpr} shadows={false}
    gl={{ antialias: LOW_PRESET.antialias, powerPreference: LOW_PRESET.powerPreference }}
    camera={{ position: [0, 0, 14], fov: 45 }}>
    <color attach="background" args={['#101c2e']} />
    {snapshot.bodies.map((body, i) => <mesh key={body.id} position={[...body.position]}>
      <sphereGeometry args={[0.32, LOW_PRESET.sphereWidthSegments, LOW_PRESET.sphereHeightSegments]} />
      <meshBasicMaterial color={i === 0 ? '#6bdcca' : '#ffb56b'} />
    </mesh>)}
  </Canvas>;
}
