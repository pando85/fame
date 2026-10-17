/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Fuse from 'fuse.js';

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

const normalizeRecipeTitle = (title: string): string =>
  title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es')
    .replace(/[^a-z0-9]+/g, ' ').trim();

const indexedIngredientsByTitle = new Map(
  recipeIngredients.map(({ title, ingredients }) => [normalizeRecipeTitle(title), ingredients]),
);


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
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

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

  const searchableItems = React.useMemo(() => items.map(item => ({
    recipe: item,
    title: item.content.metadata.title,
    ingredients: indexedIngredientsByTitle.get(
      normalizeRecipeTitle(item.content.metadata.title),
    ) ?? '',
  })), [items]);

  const fuse = React.useMemo(() => new Fuse(searchableItems, {
    ignoreDiacritics: true,
    threshold: 0.4,
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'ingredients', weight: 0.3 },
    ],
  }), [searchableItems]);

  const filteredItems = React.useMemo(() => {
    let result = searchTerm
      ? fuse.search(searchTerm).map(({ item }) => item.recipe)
      : [...items];

    if (selectedTag) {
      result = result.filter(item => {
        const tags = item.content.metadata.frontMatter.tags as string[] | undefined;
        return tags?.includes(selectedTag);
      });
    }

    if (!searchTerm) {
      result.sort((a, b) =>
        a.content.metadata.title.localeCompare(b.content.metadata.title, 'es')
      );
    }

    return result;
  }, [fuse, items, searchTerm, selectedTag]);

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
      <div className={styles.container}>
        {filteredItems.length === 0 ? (
          <p role="status">No se encontraron recetas que coincidan con la búsqueda.</p>
        ) : (
          <BlogPostItems items={filteredItems} />
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
