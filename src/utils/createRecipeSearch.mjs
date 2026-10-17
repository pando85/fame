import Fuse from 'fuse.js';

const normalizeRecipeTitle = (title) =>
  title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
    .replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Search recipe titles and full ingredient lists.
 * Fuse's default location-based scoring only searches near the start of a string;
 * that rejects valid matches for ingredients late in a long recipe list.
 */
export function createRecipeSearch(items, ingredientIndex) {
  const ingredientsByTitle = new Map(
    ingredientIndex.map(({ title, ingredients }) => [normalizeRecipeTitle(title), ingredients]),
  );

  const searchableItems = items.map(item => ({
    recipe: item,
    title: item.content.metadata.title,
    ingredients: ingredientsByTitle.get(normalizeRecipeTitle(item.content.metadata.title)) ?? '',
  }));

  return new Fuse(searchableItems, {
    ignoreDiacritics: true,
    ignoreLocation: true,
    threshold: 0.4,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'ingredients', weight: 0.3 },
    ],
  });
}
