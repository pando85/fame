import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readdirSync, readFileSync } from 'node:fs';
import { join, parse } from 'node:path';

const rootDir = process.cwd();
const buildDir = join(rootDir, 'build');
const mainWorker = readFileSync(join(buildDir, 'sw.js'), 'utf8');

const manifestMatch = mainWorker.match(
  /(?:const|let|var)\s+precacheManifest\s*=\s*(\[[\s\S]*?\]);/,
);
assert.ok(manifestMatch, 'Docusaurus service worker must contain a precache manifest');

const manifest = JSON.parse(manifestMatch[1]);
const precachedUrls = new Set(
  manifest.map((entry) => (typeof entry === 'string' ? entry : entry.url)),
);

const recipePages = readdirSync(join(rootDir, 'recetas'))
  .filter((name) => /\.mdx?$/.test(name))
  .map((name) => `${parse(name).name}.html`);

for (const recipePage of recipePages) {
  assert.ok(
    precachedUrls.has(recipePage),
    `Recipe is missing from the production precache: ${recipePage}`,
  );
}

const customWorkerChunks = readdirSync(buildDir).filter(
  (name) => name.endsWith('.sw.js') && name !== 'sw.js',
);
assert.ok(customWorkerChunks.length > 0, 'Expected a bundled swCustom chunk');

const customWorkerSource = customWorkerChunks
  .map((name) => readFileSync(join(buildDir, name), 'utf8'))
  .join('\n');

assert.ok(
  !customWorkerSource.includes('__WB_MANIFEST'),
  'swCustom must not try to consume Docusaurus\' injected precache manifest',
);
assert.ok(
  !customWorkerSource.includes('precacheAndRoute'),
  'swCustom must not create a second Workbox precache controller/router',
);
assert.ok(
  customWorkerSource.includes('clients.claim'),
  'swCustom should claim the current client after explicit activation',
);

for (const runtimeCacheName of [
  'navigation-cache',
  'image-cache',
  'static-resources',
  'font-cache',
]) {
  assert.ok(
    !customWorkerSource.includes(runtimeCacheName),
    `swCustom must not overlap the Docusaurus precache with ${runtimeCacheName}`,
  );
}

if (process.env.CI) {
  const shallow = execFileSync('git', ['rev-parse', '--is-shallow-repository'], {
    encoding: 'utf8',
  }).trim();
  assert.equal(
    shallow,
    'false',
    'CI must checkout full Git history so inferred recipe dates stay stable',
  );
}

console.log(`Validated PWA precache for ${recipePages.length} recipes.`);
