import { useState } from 'react';
import { createCircularExperiment, stepVelocityVerlet } from './physics';
import { toRenderSnapshot } from './contracts/render';
import { Viewport } from './graphics/Viewport';

export default function App() {
  const [state, setState] = useState(createCircularExperiment);
  const [error, setError] = useState('');
  function step() {
    try { setState(stepVelocityVerlet(state, 60)); setError(''); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Langkah gagal'); }
  }
  return <main>
    <header><span className="eyebrow">OPEN SCIENCE / FOUNDATION 0.1</span><h1>COSMOS LAB</h1>
      <p>Laboratorium gravitasi, dimulai dari dua benda.</p></header>
    <div className="layout"><Viewport snapshot={toRenderSnapshot(state, 1e7)} />
    <section className="panel"><span className="eyebrow">EKSPERIMEN 001</span><h2>Biner sirkular</h2>
      <p>Kontrak awal Newtonian dengan velocity Verlet. Preset <strong>low</strong>, WebGL2, render saat diperlukan.</p>
      <dl><dt>Waktu simulasi</dt><dd>{state.timeS} s</dd><dt>Langkah tetap</dt><dd>60 s</dd><dt>Massa per benda</dt><dd>1 × 10²⁴ kg</dd></dl>
      <div className="actions"><button onClick={step}>Langkah +60 s</button><button onClick={() => { setState(createCircularExperiment()); setError(''); }}>Reset</button></div>
      {error && <p role="alert">{error}</p>}
      <p className="note">Tahap fondasi. Ukuran bola dibesarkan untuk keterbacaan; posisi menggunakan 10⁷ m per unit tampilan.</p>
    </section></div>
    <section className="data"><h2>State fisika (SI)</h2><table><thead><tr><th>Benda</th><th>Massa (kg)</th><th>Posisi (m)</th><th>Kecepatan (m/s)</th></tr></thead>
      <tbody>{state.bodies.map(body => <tr key={body.id}><th>{body.id.toUpperCase()}</th><td>{body.massKg.toExponential(3)}</td><td>{body.positionM.map(x => x.toExponential(3)).join(', ')}</td><td>{body.velocityMps.map(x => x.toExponential(3)).join(', ')}</td></tr>)}</tbody></table></section>
    <footer>MIT · Tanpa akun, tanpa backend, tanpa pelacakan.</footer>
  </main>;
}
