/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import BlogLayout from '@theme/BlogLayout';
import SearchMetadata from '@theme/SearchMetadata';
import type { Props } from '@theme/BlogListPage';
import BlogPostItems from '@theme/BlogPostItems';

import styles from './styles.module.css';
import recipeIngredients from '../../generated/recipe-ingredients.json';
import { createRecipeSearch, isUnsupportedExclusion, listRecipeResults } from '../../utils/createRecipeSearch.mjs';
import { readSearchFilters, buildSearchUrl, serializeSearchFilters } from '../../utils/recipeSearchUrl.mjs';


function BlogListPageMetadata(props: Props): JSX.Element {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === '/';
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): JSX.Element {
  const { items } = props;
  const location = useLocation();
  // Static Docusaurus HTML is rendered without query parameters. Restore them
  // after hydration to avoid a different recipe list on server and client.
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [filtersRestored, setFiltersRestored] = React.useState(false);

  React.useEffect(() => {
    const filters = readSearchFilters(location.search);
    setSearchTerm(filters.query);
    setSelectedTag(filters.tag || null);
    setFiltersRestored(true);
  }, [location.search]);

  // Do not overwrite an incoming query before it has been restored.
  React.useEffect(() => {
    if (!filtersRestored) return;
    const url = buildSearchUrl(searchTerm, selectedTag ?? '');
    if (window.location.pathname === '/' &&
        window.location.pathname + window.location.search !== url) {
      window.history.replaceState(window.history.state, '', url);
    }
  }, [filtersRestored, searchTerm, selectedTag]);

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    items.forEach(item => {
      const tags = item.content.metadata.frontMatter.tags as string[] | undefined;
      if (tags) {
        tags.forEach(tag => tagSet.add(tag));
      }
    });
    return Array.from(tagSet).sort();
  }, [items]);

  const fuse = React.useMemo(() => createRecipeSearch(items, recipeIngredients), [items]);

  const filteredResults = React.useMemo(
    () => listRecipeResults(items, fuse, searchTerm, selectedTag ?? ''),
    [fuse, items, searchTerm, selectedTag],
  );

  const filteredItems = filteredResults.map(({ item }) => item.recipe);
  const matchHints = Object.fromEntries(filteredResults.map(({ item, matchHint }) =>
    [item.recipe.content.metadata.permalink, matchHint],
  ));
  const returnSearch = serializeSearchFilters(searchTerm, selectedTag ?? '');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <BlogLayout>
      <div className={styles['filters-container']}>
        <div className={styles['search-input-container']}>
          <input
            type="text"
            id="searchInput"
            aria-label="Buscar recetas por nombre, ingredientes o etiquetas"
            placeholder="Buscar recetas..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchTerm && (
            <button
              id="clearSearchButton"
              className={styles['clear-search-button']}
              onClick={handleClearSearch}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#999999"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
        {allTags.length > 0 && (
          <div className={styles['tag-select-container']}>
            <select
              id="tagSelect"
              value={selectedTag || ''}
              onChange={(e) => setSelectedTag(e.target.value || null)}
              className={styles['tag-select']}
            >
              <option value="">Todas las etiquetas</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      {(searchTerm || selectedTag) && (
        <p role="status" aria-live="polite">
          {isUnsupportedExclusion(searchTerm)
            ? 'Para «sin …» solo mostramos recetas que lo indican en su título; revisa siempre los ingredientes si hay alergias o intolerancias.'
            : `${filteredItems.length} ${filteredItems.length === 1 ? 'receta encontrada' : 'recetas encontradas'}`}
        </p>
      )}
      <div className={styles.container}>
        {filteredItems.length === 0 ? (
          <p role="status">No se encontraron recetas que coincidan con la búsqueda.</p>
        ) : (
          <BlogPostItems items={filteredItems} returnSearch={returnSearch} matchHints={matchHints} />
        )}
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): JSX.Element {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}>
      <BlogListPageMetadata {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
