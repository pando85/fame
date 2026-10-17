import assert from 'node:assert/strict';
import test from 'node:test';

import { createRecipeSearch, isUnsupportedExclusion, listRecipeResults } from '../src/utils/createRecipeSearch.mjs';
import {
  buildSearchUrl, createRecipeLink, getReturnUrl, readSearchFilters, serializeSearchFilters,
} from '../src/utils/recipeSearchUrl.mjs';
import { ingredientIndex, recipes } from './fixtures/recipe-search-fixture.mjs';

// Regression tests must not read from recetas/. Editing the production menu
// must not change expectations about how the search algorithm behaves.
const search = createRecipeSearch(recipes, ingredientIndex);
const getTitles = results => results.map(({ item }) => item.recipe.content.metadata.title);
const titlesFor = query => getTitles(search.search(query));
const filteredTitles = (query, tag) => getTitles(listRecipeResults(recipes, search, query, tag));

test('prioritizes exact titles over ingredient matches', () => {
  assert.deepEqual(titlesFor('arroz'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(titlesFor('pollo').slice(0, 2), [
    'Pollo asado y noodles', 'Pollo tikka masala',
  ]);
  assert.ok(titlesFor('pollo').includes('Arroz meloso'));
});

test('matches any ingredient position even with long lists', () => {
  const example = {
    content: { metadata: { title: 'Verduras salteadas', frontMatter: { tags: [] } } },
  };
  const longIndex = [{ title: 'Verduras salteadas', ingredients: [
    '- Zanahoria', '- Cebolla', '- Ajo',
    ...Array.from({ length: 50 }, (_, n) => '- Otro ingrediente ' + n),
    '- Champiñones',
  ].join('\n') }];
  assert.deepEqual(getTitles(createRecipeSearch([example], longIndex).search('champiñones')), [
    'Verduras salteadas',
  ]);
  assert.ok(titlesFor('champiñones').includes('Pollo asado y noodles'));
});

test('exact ingredient matches exclude similar but irrelevant words', () => {
  assert.deepEqual(titlesFor('queso'), ['Lasaña']);
  assert.deepEqual(titlesFor('pasta'), ['Pollo asado y noodles']);
  assert.deepEqual(titlesFor('tomate'), [
    'Albóndigas', 'Lasaña', 'Pollo tikka masala', 'Caldo de verduras',
  ]);
  assert.ok(!titlesFor('pollo').includes('Rodaballo salvaje al horno'));
  assert.ok(!titlesFor('tomate').includes('Cookies de chocolate'));
  assert.ok(!titlesFor('pasta').includes('Tortilla de patata'));
});

test('accent, singular/plural, typing prefixes and typo fallback', () => {
  assert.deepEqual(titlesFor('albondigas'), ['Albóndigas']);
  assert.deepEqual(titlesFor('albodigas'), ['Albóndigas']);
  assert.deepEqual(titlesFor('pizz'), ['Pizza']);
  assert.deepEqual(titlesFor('calabacin'), ['Crema de calabacín']);
  assert.ok(titlesFor('huevos').includes('Crepes dulces'));
  assert.ok(titlesFor('tomtae').includes('Lasaña'));
  assert.deepEqual(titlesFor('no-existe-esta-receta'), []);
});

test('multiple ingredient terms require every word regardless of order', () => {
  for (const query of ['pollo arroz', 'pollo y arroz', 'arroz pollo', 'pollo con arroz']) {
    assert.deepEqual(titlesFor(query), ['Arroz meloso', 'Risotto']);
  }
  assert.deepEqual(titlesFor('pollo berenjena'), []);
});

test('searches in tags, including when not present in the recipe title', () => {
  assert.deepEqual(titlesFor('postre'), [
    'Bizcocho de plátano y dátiles', 'Cookies de chocolate',
    'Crème brûlée', 'Flan de huevo',
  ]);
  assert.deepEqual(titlesFor('desayuno'), [
    'Crepes dulces', 'Muesli -o granola- casero 1.0',
  ]);
  assert.deepEqual(titlesFor('pescado'), ['Rodaballo salvaje al horno']);
  assert.ok(!titlesFor('postre').includes('Cocido'));
});

test('combines search with selected tags without changing ranking', () => {
  assert.deepEqual(filteredTitles('tomate', 'plato principal'), [
    'Albóndigas', 'Lasaña', 'Pollo tikka masala',
  ]);
  assert.deepEqual(filteredTitles('pollo arroz', 'plato principal'), ['Arroz meloso', 'Risotto']);
  assert.deepEqual(filteredTitles('queso', 'postre'), []);
  assert.deepEqual(filteredTitles('postre', 'postre'), titlesFor('postre'));
  assert.deepEqual(filteredTitles('', 'desayuno'), [
    'Crepes dulces', 'Muesli -o granola- casero 1.0',
  ]);
});

test('does not invent negative ingredient, dietary or cooking-time results', () => {
  for (const query of ['sin huevo', 'sin gluten', 'sin lactosa']) {
    assert.equal(isUnsupportedExclusion(query), true);
    assert.deepEqual(titlesFor(query), []);
  }
  // Explicit "sin" in the title is different from inferring absence from a list.
  assert.deepEqual(titlesFor('sin tahini'), ['Hummus sin tahini']);
  assert.deepEqual(titlesFor('vegano'), []);
  assert.deepEqual(titlesFor('30 minutos'), []);
});

test('explains matching ingredients, tags and explicit title exclusions', () => {
  const rice = search.search('pollo').find(({ item }) =>
    item.recipe.content.metadata.title === 'Arroz meloso');
  assert.match(rice.matchLabel, /contramuslos de pollo/i);

  const fish = search.search('pescado')[0];
  assert.equal(fish.matchLabel, 'Etiqueta: pescado');
  assert.equal(search.search('sin tahini')[0].matchLabel, 'Indicado expresamente en el título');
});

test('retains query and tag through recipe navigation', () => {
  const query = 'pollo y arroz';
  const filters = serializeSearchFilters(query, 'plato principal');
  const link = createRecipeLink('/Arroz%20meloso', filters);
  const home = getReturnUrl(link.slice(link.indexOf('?')));
  assert.equal(home, buildSearchUrl(query, 'plato principal'));
  assert.deepEqual(readSearchFilters(home.slice(1)), { query, tag: 'plato principal' });
  assert.equal(createRecipeLink('/Pizza', ''), '/Pizza');
});

test('URL round trips preserve accents, spaces, empty searches and filter-only searches', () => {
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
    const returnUrl = getReturnUrl(recipeUrl.slice(recipeUrl.indexOf('?')));
    assert.equal(returnUrl, buildSearchUrl(query, tag));
    assert.deepEqual(readSearchFilters(returnUrl.slice(1)), { query, tag });
  }
});

test('return URL ignores untrusted external targets and overly long values', () => {
  assert.equal(getReturnUrl('?fromSearch=' + encodeURIComponent('https://bad.example')), '/');
  assert.equal(getReturnUrl('?fromSearch=' + 'a'.repeat(501)), '/');
});
