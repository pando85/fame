import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildRecipeIngredientIndex, getRecipeTitle } from './generate-recipe-ingredient-index.mjs';
import { createRecipeSearch, isUnsupportedExclusion } from '../src/utils/createRecipeSearch.mjs';
import {
  buildSearchUrl, createRecipeLink, getReturnUrl, readSearchFilters, serializeSearchFilters,
} from '../src/utils/recipeSearchUrl.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const ingredients = buildRecipeIngredientIndex(join(root, 'recetas'));
const tagsByTitle = new Map(readdirSync(join(root, 'recetas'))
  .filter(filename => /\.mdx?$/.test(filename))
  .map(filename => {
    const source = readFileSync(join(root, 'recetas', filename), 'utf8');
    const tagText = source.match(/^tags:\s*\[([^\]]*)\]/m)?.[1] ?? '';
    return [getRecipeTitle(filename, source), tagText.split(',').map(value => value.trim()).filter(Boolean)];
  }));

const recipes = ingredients.map(({ title }) => ({
  content: { metadata: {
    title,
    permalink: '/' + encodeURIComponent(title),
    frontMatter: { tags: tagsByTitle.get(title) ?? [] },
  } },
}));
const search = createRecipeSearch(recipes, ingredients);
const titlesFor = query => search.search(query).map(({ item }) => item.recipe.content.metadata.title);

test('ingredient search finds recipes regardless of ingredient position', () => {
  assert.ok(titlesFor('pollo').includes('Arroz meloso'));
  assert.ok(titlesFor('champiñones').includes('Pollo asado y noodles'));
  assert.deepEqual(titlesFor('tomate').sort(), [
    'Albóndigas', 'Caldo de verduras', 'Lasaña', 'Pollo tikka masala',
  ].sort());
});

test('relevance excludes misleading fuzzy hits, including pasta vs patata', () => {
  assert.deepEqual(titlesFor('queso'), ['Lasaña']);
  assert.deepEqual(titlesFor('pasta'), ['Pollo asado y noodles']);
  assert.ok(!titlesFor('pollo').includes('Rodaballo salvaje al horno'));
  assert.ok(!titlesFor('tomate').includes('Cookies de chocolate'));
  assert.ok(!titlesFor('garbanzos').includes('Pizza'));
});

test('titles, diacritics, plurals, prefix typing and typos work', () => {
  assert.deepEqual(titlesFor('albondigas'), ['Albóndigas']);
  assert.deepEqual(titlesFor('albodigas'), ['Albóndigas']);
  assert.deepEqual(titlesFor('pizz'), ['Pizza']);
  assert.deepEqual(titlesFor('calabacin'), ['Crema de calabacín']);
  assert.ok(titlesFor('huevos').includes('Crepes dulces'));
  assert.ok(titlesFor('tomtae').includes('Lasaña'));
});

test('multiple ingredient searches use AND, with optional y / con', () => {
  assert.deepEqual(titlesFor('pollo arroz'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(titlesFor('pollo y arroz'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(titlesFor('arroz pollo'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(titlesFor('pollo berenjena'), []);
});

test('tags can be searched directly', () => {
  assert.ok(titlesFor('postre').includes('Flan de huevo'));
  assert.ok(titlesFor('desayuno').includes('Crepes dulces'));
  assert.ok(titlesFor('pescado').includes('Rodaballo salvaje al horno'));
  assert.ok(!titlesFor('postre').includes('Cocido'));
});

test('unsupported exclusions and attributes do not return unsafe guesses', () => {
  for (const query of ['sin huevo', 'sin gluten', 'sin lactosa']) {
    assert.ok(isUnsupportedExclusion(query));
    assert.deepEqual(titlesFor(query), []);
  }
  assert.deepEqual(titlesFor('vegano'), []);
  assert.deepEqual(titlesFor('30 minutos'), []);
  assert.deepEqual(titlesFor('sin tahini'), ['Hummus sin tahini']);
});

test('match explanation identifies the actual matching ingredient or tag', () => {
  const rice = search.search('pollo').find(({ item }) =>
    item.recipe.content.metadata.title === 'Arroz meloso');
  assert.match(rice.matchLabel, /contramuslos de pollo/i);
  const fish = search.search('pescado').find(({ item }) =>
    item.recipe.content.metadata.title === 'Rodaballo salvaje al horno');
  assert.equal(fish.matchLabel, 'Etiqueta: pescado');
});

test('search state and tag survive recipe navigation and safe return', () => {
  const query = 'pollo y arroz';
  const filters = serializeSearchFilters(query, 'plato principal');
  const recipeLink = createRecipeLink('/Arroz%20meloso', filters);
  const recipeQuery = recipeLink.slice(recipeLink.indexOf('?'));
  const home = getReturnUrl(recipeQuery);
  assert.equal(home, buildSearchUrl(query, 'plato principal'));
  assert.deepEqual(readSearchFilters(home.slice(1)), { query, tag: 'plato principal' });
  assert.equal(createRecipeLink('/Pizza', ''), '/Pizza');
  assert.equal(getReturnUrl('?fromSearch=' + encodeURIComponent('https://attacker.example')), '/');
  assert.equal(getReturnUrl('?fromSearch=' + 'a'.repeat(501)), '/');
});
