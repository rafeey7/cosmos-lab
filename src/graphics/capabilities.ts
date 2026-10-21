export function hasWebGL2(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return context !== null;
  } catch { return false; }
}
