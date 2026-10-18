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

test('recipe card dimensions do not depend on title or matching hint content', () => {
  const card = rule('cardContainer');
  assert.match(card, /\\baspect-ratio:\\s*2\\s*\\/\\s*1\\s*;/);
  assert.match(card, /\\bwidth:\\s*100%\\s*;/);
  assert.match(card, /\\bposition:\\s*relative\\s*;/);
  assert.match(card, /\\boverflow:\\s*hidden\\s*;/);
  assert.match(rule('cardTitle'), /\\bmargin:\\s*0\\s*;/);

  // Badge is taken out of normal document flow, unlike the old label.
  const badge = rule('matchHint');
  assert.match(badge, /\\bposition:\\s*absolute\\s*;/);
  assert.match(badge, /\\bwidth:\\s*1\\.75rem\\s*;/);
  assert.match(badge, /\\bheight:\\s*1\\.75rem\\s*;/);
});

test('match indicator is icon-only with accessible ingredient details', () => {
  assert.match(component, /aria-label=\\{matchHint\\.description\\}/);
  assert.match(component, /title=\\{matchHint\\.description\\}/);
  assert.match(component, /role="img"/);
  assert.match(component, /matchHint\\.kind === 'ingredient'/);
  assert.doesNotMatch(component, /matchHintText|\\{matchHint\\.label\\}/);
});
