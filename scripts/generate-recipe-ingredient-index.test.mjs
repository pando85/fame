import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  buildRecipeIngredientIndex,
  extractIngredients,
  generateRecipeIngredientIndex,
  getRecipeTitle,
} from './generate-recipe-ingredient-index.mjs';

test('search index includes ingredients and subheadings but not preparation', () => {
  const source = '---\ntags: [principal]\n---\n\n## Ingredientes\n\n- 200 g de arroz\n### Para la salsa\n- Tomate\n\n## Elaboración\n\n1. Freír el pollo.';
  const ingredients = extractIngredients(source);
  assert.match(ingredients, /arroz/);
  assert.match(ingredients, /Tomate/);
  assert.doesNotMatch(ingredients, /pollo/);
  assert.doesNotMatch(ingredients, /Elaboración/);
});

test('recipe title follows optional front matter override', () => {
  assert.equal(getRecipeTitle('Albódingas.md', '---\ntitle: Albóndigas\n---\n'), 'Albóndigas');
  assert.equal(getRecipeTitle('Arroz meloso.md', '---\ntags: [arroz]\n---\n'), 'Arroz meloso');
});

test('generates a deterministic browser-importable index from Markdown', () => {
  const root = mkdtempSync(join(tmpdir(), 'fame-recipes-'));
  try {
    mkdirSync(join(root, 'recetas'));
    writeFileSync(join(root, 'recetas', 'B.md'), '## Ingredientes\n- Pimiento\n\n## Elaboración\n- Cocinar\n');
    writeFileSync(join(root, 'recetas', 'A.md'), '## Ingredientes\n- Arroz\n\n## Elaboración\n- Cocinar\n');
    assert.deepEqual(buildRecipeIngredientIndex(join(root, 'recetas')).map(recipe => recipe.title), ['A', 'B']);
    assert.equal(generateRecipeIngredientIndex(root), 2);
    const output = JSON.parse(readFileSync(join(root, 'src/generated/recipe-ingredients.json'), 'utf8'));
    assert.deepEqual(output.map(recipe => recipe.ingredients), ['- Arroz', '- Pimiento']);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('missing ingredients fail fast instead of silently dropping recipes', () => {
  const root = mkdtempSync(join(tmpdir(), 'fame-recipes-'));
  try {
    writeFileSync(join(root, 'Sin ingredientes.md'), '## Elaboración\n1. Cocinar\n');
    assert.throws(() => buildRecipeIngredientIndex(root), /Missing ingredient section/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
