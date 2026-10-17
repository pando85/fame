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
import { createRecipeSearch, isUnsupportedExclusion } from '../../utils/createRecipeSearch.mjs';
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
  const [searchTerm, setSearchTerm] = React.useState(() => readSearchFilters(location.search).query);
  const [selectedTag, setSelectedTag] = React.useState<string | null>(
    () => readSearchFilters(location.search).tag || null,
  );

  // Keep the current search shareable, and let recipe details link back to it.
  React.useEffect(() => {
    const url = buildSearchUrl(searchTerm, selectedTag ?? '');
    if (window.location.pathname === '/' &&
        window.location.pathname + window.location.search !== url) {
      window.history.replaceState(window.history.state, '', url);
    }
  }, [searchTerm, selectedTag]);

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

  const filteredResults = React.useMemo(() => {
    let results = searchTerm
      ? fuse.search(searchTerm)
      : items.map(item => ({ item: { recipe: item }, matchLabel: '' }));

    if (selectedTag) {
      results = results.filter(({ item }) => {
        const tags = item.recipe.content.metadata.frontMatter.tags as string[] | undefined;
        return tags?.includes(selectedTag);
      });
    }
    if (!searchTerm) {
      results.sort((a, b) =>
        a.item.recipe.content.metadata.title.localeCompare(
          b.item.recipe.content.metadata.title, 'es',
        )
      );
    }
    return results;
  }, [fuse, items, searchTerm, selectedTag]);

  const filteredItems = filteredResults.map(({ item }) => item.recipe);
  const matchLabels = Object.fromEntries(filteredResults.map(({ item, matchLabel }) =>
    [item.recipe.content.metadata.permalink, matchLabel],
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
            ? 'Las búsquedas «sin …» no están disponibles: una lista de ingredientes no garantiza la ausencia de alérgenos.'
            : `${filteredItems.length} ${filteredItems.length === 1 ? 'receta encontrada' : 'recetas encontradas'}`}
        </p>
      )}
      <div className={styles.container}>
        {filteredItems.length === 0 ? (
          !isUnsupportedExclusion(searchTerm) && (
            <p role="status">No se encontraron recetas que coincidan con la búsqueda.</p>
          )
        ) : (
          <BlogPostItems items={filteredItems} returnSearch={returnSearch} matchLabels={matchLabels} />
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
