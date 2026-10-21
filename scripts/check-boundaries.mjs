import { readdir, readFile } from 'node:fs/promises';
import { resolve, dirname, relative } from 'node:path';
const root = resolve('src/physics');
async function visit(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = resolve(dir, entry.name);
    if (entry.isDirectory()) { await visit(file); continue; }
    if (!entry.name.endsWith('.ts')) continue;
    const source = await readFile(file, 'utf8');
    for (const match of source.matchAll(/(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g)) {
      const spec = match[1];
      if (!spec.startsWith('.') || relative(root, resolve(dirname(file), spec)).startsWith('..')) {
        throw new Error(`Physics boundary violation: ${file} -> ${spec}`);
      }
    }
  }
}
await visit(root);
console.log('Physics imports stay inside src/physics. Run tsc -p tsconfig.physics.json for DOM isolation.');
