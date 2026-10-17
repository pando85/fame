import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { buildRecipeIngredientIndex, getRecipeTitle } from './generate-recipe-ingredient-index.mjs';
import { createRecipeSearch, isUnsupportedExclusion, listRecipeResults } from '../src/utils/createRecipeSearch.mjs';
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


test('search ranking favors exact titles and exact ingredients over fuzzy matches', () => {
  const rice = titlesFor('arroz');
  assert.equal(rice[0], 'Arroz meloso');
  assert.ok(rice.indexOf('Risotto') > rice.indexOf('Arroz meloso'));
  const chicken = titlesFor('pollo');
  assert.deepEqual(chicken.slice(0, 2).sort(), [
    'Pollo asado y noodles', 'Pollo tikka masala',
  ].sort());
  assert.ok(chicken.indexOf('Arroz meloso') > 1);
  assert.ok(!chicken.includes('Rodaballo salvaje al horno'));
  assert.deepEqual(titlesFor('pasta'), ['Pollo asado y noodles']);
});

test('no false matches if precise terms exist elsewhere in the catalogue', () => {
  const cheese = titlesFor('queso');
  assert.deepEqual(cheese, ['Lasaña']);
  assert.ok(!cheese.includes('Flan de huevo'));
  const tomato = titlesFor('tomate');
  assert.deepEqual(tomato, [
    'Albóndigas', 'Lasaña', 'Pollo tikka masala', 'Caldo de verduras',
  ]);
  assert.ok(!tomato.includes('Cookies de chocolate'));
  assert.deepEqual(titlesFor('sin huevo'), []);
});

test('tag filter combines with ingredient search and preserves relevance', () => {
  const titles = (query, tag) =>
    listRecipeResults(recipes, search, query, tag).map(
      ({ item }) => item.recipe.content.metadata.title,
    );
  assert.deepEqual(titles('tomate', 'plato principal'), [
    'Albóndigas', 'Lasaña', 'Pollo tikka masala',
  ]);
  assert.deepEqual(titles('pollo arroz', 'plato principal'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(titles('queso', 'postre'), []);
  assert.deepEqual(titles('postre', 'postre'), [
    'Bizcocho de plátano y dátiles', 'Cookies de chocolate',
    'Crème brûlée', 'Flan de huevo',
  ]);
  assert.deepEqual(titles('', 'desayuno'), ['Crepes dulces', 'Muesli -o granola- casero 1.0']);
});

test('search works with recipe index content independent of ingredient order', () => {
  const recipe = title => ({
    content: { metadata: { title, frontMatter: { tags: [] } } },
  });
  const index = [{ title: 'Verduras salteadas', ingredients: [
    '- Zanahoria', '- Cebolla', '- Ajo',
    ...Array.from({ length: 50 }, (_, i) => '- ingrediente ' + i),
    '- Champiñones',
  ].join('\n') }];
  const indexed = createRecipeSearch([recipe('Verduras salteadas')], index);
  assert.deepEqual(indexed.search('champiñones').map(({ item }) =>
    item.recipe.content.metadata.title), ['Verduras salteadas']);
});

test('URL round trips tolerate accents, spaces and nested parameters', () => {
  const examples = [
    ['pollo', 'plato principal'],
    ['calabacín', 'entrante'],
    ['masa madre', 'pan'],
    ['pollo y arroz', 'plato principal'],
    ['sin tahini', ''],
    ['tomate', ''],
    ['', 'postre'],
  ];
  for (const [query, tag] of examples) {
    const filters = serializeSearchFilters(query, tag);
    const recipeUrl = createRecipeLink('/Arroz%20meloso', filters);
    const back = getReturnUrl(recipeUrl.substring(recipeUrl.indexOf('?')));
    assert.equal(back, buildSearchUrl(query, tag));
    assert.deepEqual(readSearchFilters(back.slice(1)), { query, tag });
  }
  assert.equal(getReturnUrl('?fromSearch=' + encodeURIComponent('https://bad.example')), '/');
});
