import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(root, 'src/components/RecipeItem/styles.module.css'), 'utf8');
const component = readFileSync(join(root, 'src/components/RecipeItem/index.tsx'), 'utf8');

function rule(selector) {
  const pattern = new RegExp('\\.' + selector + '\\s*\\{([^}]*)\\}');
  const result = css.match(pattern);
  assert.ok(result, 'Expected CSS rule .' + selector);
  return result[1];
}

test('recipe cards preserve dimensions regardless of the search indicator', () => {
  const card = rule('cardContainer');
  assert.match(card, /aspect-ratio:\s*2\s*\/\s*1\s*;/);
  assert.match(card, /width:\s*100%\s*;/);
  assert.match(card, /position:\s*relative\s*;/);
  assert.match(card, /overflow:\s*hidden\s*;/);
  assert.match(rule('cardTitle'), /margin:\s*0\s*;/);

  // The indicator is positioned over the image, not in document flow.
  const badge = rule('matchHint');
  assert.match(badge, /position:\s*absolute\s*;/);
  assert.match(badge, /width:\s*1\.75rem\s*;/);
  assert.match(badge, /height:\s*1\.75rem\s*;/);
});

test('match indicator is icon-only and retains accessible ingredient details', () => {
  assert.match(component, /aria-label=\{matchHint\.description\}/);
  assert.match(component, /title=\{matchHint\.description\}/);
  assert.match(component, /role="img"/);
  assert.match(component, /matchHint\.kind === 'ingredient'/);
  assert.doesNotMatch(component, /matchHintText|\{matchHint\.label\}/);
});
