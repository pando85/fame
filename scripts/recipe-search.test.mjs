import assert from 'node:assert/strict';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildRecipeIngredientIndex } from './generate-recipe-ingredient-index.mjs';
import { createRecipeSearch } from '../src/utils/createRecipeSearch.mjs';

const projectRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

const makeItems = recipes => recipes.map(({ title }) => ({
  content: {
    metadata: {
      title,
      frontMatter: {},
    },
  },
}));

const titlesFor = (search, query) =>
  search.search(query).map(({ item }) => item.recipe.content.metadata.title);

test('searching for an ingredient finds it even when it is far into a long list', () => {
  const ingredientIndex = [{
    title: 'Sopa de verduras',
    ingredients: [
      '- Agua', '- Caldo', '- Zanahoria', '- Puerro', '- Cebolla',
      ...Array.from({ length: 25 }, (_, index) => '- Ingrediente ' + index),
      '- Champiñones',
    ].join('\n'),
  }];
  const search = createRecipeSearch(makeItems(ingredientIndex), ingredientIndex);
  assert.deepEqual(titlesFor(search, 'champiñones'), ['Sopa de verduras']);
});

test('Arroz meloso is found by pollo despite not mentioning it in the title', () => {
  const ingredientIndex = buildRecipeIngredientIndex(join(projectRoot, 'recetas'));
  const search = createRecipeSearch(makeItems(ingredientIndex), ingredientIndex);
  assert.ok(titlesFor(search, 'pollo').includes('Arroz meloso'));
});

test('titles retain relevance, and ingredient matching ignores accents', () => {
  const ingredientIndex = [
    { title: 'Pizza', ingredients: '- Masa madre\n- Queso' },
    { title: 'Crema de calabacín', ingredients: '- Aceite\n- Mozzarella' },
    { title: 'Pollo asado', ingredients: '- Limón\n- Sal' },
  ];
  const search = createRecipeSearch(makeItems(ingredientIndex), ingredientIndex);
  assert.equal(titlesFor(search, 'pizza')[0], 'Pizza');
  assert.ok(titlesFor(search, 'limon').includes('Pollo asado'));
});

test('does not search recipe preparation instructions', () => {
  const ingredientIndex = [{ title: 'Tortilla', ingredients: '- Huevos\n- Patatas' }];
  const search = createRecipeSearch(makeItems(ingredientIndex), ingredientIndex);
  assert.deepEqual(titlesFor(search, 'hornear'), []);
});
