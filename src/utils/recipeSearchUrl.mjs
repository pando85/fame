/**
 * Keep search state in shareable URLs and carry it through the recipe detail
 * page. Only q/tag are persisted; no arbitrary redirect targets are accepted.
 */
export function readSearchFilters(search = '') {
  const params = new URLSearchParams(search);
  return { query: params.get('q') ?? '', tag: params.get('tag') ?? '' };
}

export function serializeSearchFilters(query = '', tag = '') {
  const params = new URLSearchParams();
  if (query.trim()) params.set('q', query.trim());
  if (tag) params.set('tag', tag);
  return params.toString();
}

export function buildSearchUrl(query = '', tag = '') {
  const search = serializeSearchFilters(query, tag);
  return '/' + (search ? '?' + search : '');
}

export function createRecipeLink(permalink, search) {
  if (!search) return permalink;
  const params = new URLSearchParams();
  params.set('fromSearch', search);
  return permalink + (permalink.includes('?') ? '&' : '?') + params.toString();
}

export function getReturnUrl(search = '') {
  const fromSearch = new URLSearchParams(search).get('fromSearch');
  if (!fromSearch || fromSearch.length > 500) return '/';
  const { query, tag } = readSearchFilters(fromSearch);
  return buildSearchUrl(query, tag);
}
