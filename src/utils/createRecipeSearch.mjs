/**
 * Small, deterministic search for a personal recipe collection.
 *
 * Exact title / ingredient / tag words take precedence over prefixes. Typo
 * tolerance is a last resort, so "pasta" never becomes "patata" when a real
 * ingredient match exists.
 */
export const normalizeText = (value) =>
  String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es').replace(/[^a-z0-9]+/g, ' ').trim();

const words = (value) => normalizeText(value).split(' ').filter(Boolean);
const ignoredWords = new Set(['a', 'al', 'con', 'de', 'del', 'el', 'en', 'la', 'las', 'lo', 'los', 'para', 'por', 'un', 'una', 'y']);

export const isUnsupportedExclusion = (query) => /^sin\s+\S/i.test(normalizeText(query));

const equivalentWord = (a, b) => {
  if (a === b) return true;
  const variants = (word) => {
    const forms = new Set([word]);
    if (word.endsWith('ces') && word.length > 4) forms.add(word.slice(0, -3) + 'z');
    if (word.endsWith('es') && word.length > 4) forms.add(word.slice(0, -2));
    if (word.endsWith('s') && word.length > 3) forms.add(word.slice(0, -1));
    return forms;
  };
  for (const form of variants(a)) {
    if (variants(b).has(form)) return true;
  }
  return false;
};

/** Single insertion, deletion, substitution or adjacent transposition. */
const isOneTypoAway = (a, b) => {
  if (a === b || Math.min(a.length, b.length) < 4 || Math.abs(a.length - b.length) > 1) return false;
  if (a.length === b.length) {
    const differences = [];
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) differences.push(i);
    return differences.length === 1 ||
      (differences.length === 2 &&
        differences[1] === differences[0] + 1 &&
        a[differences[0]] === b[differences[1]] &&
        a[differences[1]] === b[differences[0]]);
  }
  const [shorter, longer] = a.length < b.length ? [a, b] : [b, a];
  let i = 0, j = 0, skipped = false;
  while (i < shorter.length && j < longer.length) {
    if (shorter[i] === longer[j]) { i++; j++; continue; }
    if (skipped) return false;
    skipped = true;
    j++;
  }
  return true;
};

const matchWord = (needle, haystack, allowTypos) => {
  if (haystack === needle) return 0;
  if (equivalentWord(needle, haystack)) return 0.1;
  if (needle.length >= 2 && haystack.startsWith(needle)) return 1;
  if (allowTypos && isOneTypoAway(needle, haystack)) return 4;
  return Infinity;
};

const matchField = (term, tokens, allowTypos) =>
  Math.min(Infinity, ...tokens.map(token => matchWord(term, token, allowTypos)));

const linesOfIngredients = (raw) => raw.split(/\r?\n/)
  .filter(line => /^\s*[-*]\s+/.test(line))
  .map(line => line.replace(/^\s*[-*]\s+/, '').trim());

const readTags = (item) => item.content.metadata.frontMatter.tags ?? [];

function rankRecipe(record, queryWords, normalizedQuery, allowTypos) {
  const title = record.titleWords;
  const ingredients = record.ingredientWords;
  const tags = record.tagWords;
  const matches = [];

  for (const term of queryWords) {
    const choices = [
      { type: 'title', strength: matchField(term, title, allowTypos), penalty: 0 },
      ...ingredients.map((tokens, index) => ({
        type: 'ingredient', index, strength: matchField(term, tokens, allowTypos), penalty: 2,
      })),
      ...tags.map((tokens, index) => ({
        type: 'tag', index, strength: matchField(term, tokens, allowTypos), penalty: 3,
      })),
    ];
    const best = choices.reduce((a, b) => (a.strength + a.penalty <= b.strength + b.penalty ? a : b));
    if (!Number.isFinite(best.strength)) return null; // All query words are required.
    matches.push(best);
  }

  const titleMatchesAll = queryWords.every(term => Number.isFinite(matchField(term, title, allowTypos)));
  const score = matches.reduce((sum, match) => sum + match.strength + match.penalty, 0)
    - (record.normalizedTitle === normalizedQuery ? 10 : 0)
    - (titleMatchesAll ? 1 : 0);

  const ingredientMatch = matches.find(match => match.type === 'ingredient');
  const tagMatch = matches.find(match => match.type === 'tag');
  let matchLabel = 'Coincide con el título';
  if (ingredientMatch) {
    matchLabel = queryWords.length > 1
      ? 'Ingredientes: ' + queryWords.join(', ')
      : 'Ingrediente: ' + record.ingredientLines[ingredientMatch.index];
  } else if (tagMatch) {
    matchLabel = 'Etiqueta: ' + record.tags[tagMatch.index];
  }
  return { item: { recipe: record.recipe }, score, matchLabel };
}

export function createRecipeSearch(items, ingredientIndex) {
  const ingredientsByTitle = new Map(
    ingredientIndex.map(({ title, ingredients }) => [normalizeText(title), ingredients]),
  );
  const records = items.map(recipe => {
    const title = recipe.content.metadata.title;
    const tags = readTags(recipe);
    const ingredientLines = linesOfIngredients(ingredientsByTitle.get(normalizeText(title)) ?? '');
    return {
      recipe, title, tags, normalizedTitle: normalizeText(title), titleWords: words(title),
      ingredientLines, ingredientWords: ingredientLines.map(words), tagWords: tags.map(words),
    };
  });

  const search = (query) => {
    if (isUnsupportedExclusion(query)) return [];
    const normalizedQuery = normalizeText(query);
    const terms = words(query).filter(term => !ignoredWords.has(term));
    if (!terms.length) return [];

    const exact = records.map(record => rankRecipe(record, terms, normalizedQuery, false)).filter(Boolean);
    const found = exact.length
      ? exact
      : records.map(record => rankRecipe(record, terms, normalizedQuery, true)).filter(Boolean);
    return found.sort((a, b) => a.score - b.score ||
      a.item.recipe.content.metadata.title.localeCompare(b.item.recipe.content.metadata.title, 'es'));
  };

  return { search };
}
