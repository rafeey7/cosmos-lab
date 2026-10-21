import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';
import type { RenderSnapshot } from '../contracts/render';
import { hasWebGL2 } from './capabilities';
const Scene = lazy(() => import('./Scene'));
const fallback = <p role="status">Tampilan 3D tidak tersedia. Data SI dan langkah eksperimen tetap dapat digunakan.</p>;
class GraphicsBoundary extends Component<{children: ReactNode}, {failed: boolean}> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? fallback : this.props.children; }
}
export function Viewport({ snapshot }: { snapshot: RenderSnapshot }) {
  const [available] = useState(hasWebGL2);
  const [lost, setLost] = useState(false);
  const container = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = container.current;
    const onLost = (event: Event) => { event.preventDefault(); setLost(true); };
    node?.addEventListener('webglcontextlost', onLost, true);
    return () => node?.removeEventListener('webglcontextlost', onLost, true);
  }, []);
  return <section ref={container} className="viewport" aria-label="Pratinjau dua benda">
    {!available || lost ? fallback : <GraphicsBoundary><Suspense fallback={<p>Memuat pratinjau…</p>}><Scene snapshot={snapshot} /></Suspense></GraphicsBoundary>}
  </section>;
}
