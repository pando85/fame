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

  const fuseOptions = {
    ignoreDiacritics: true,
    threshold: 0.4,
    keys: [
      'content.metadata.title',
    ],
  };

  const fuse = React.useMemo(() => new Fuse(items, fuseOptions), [items]);

  const filteredItems = React.useMemo(() => {
    let result = items;

    if (selectedTag) {
      result = result.filter(item => {
        const tags = item.content.metadata.frontMatter.tags as string[] | undefined;
        return tags?.includes(selectedTag);
      });
    }

    if (searchTerm) {
      const searchResults = fuse.search(searchTerm).map(result => result.item);
      if (selectedTag) {
        const searchSet = new Set(searchResults);
        result = result.filter(item => searchSet.has(item));
      } else {
        result = searchResults;
      }
    }

    if (!searchTerm && !selectedTag) {
      result = [...items].sort((a, b) =>
        a.content.metadata.title.localeCompare(b.content.metadata.title)
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

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleClearTag = () => {
    setSelectedTag(null);
  };

  return (
    <BlogLayout>
      <div className={styles['search-container']}>
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
      </div>
      {allTags.length > 0 && (
        <div className={styles['tags-container']}>
          {allTags.map(tag => (
            <button
              key={tag}
              className={`${styles['tag-button']} ${selectedTag === tag ? styles['tag-button-active'] : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              className={styles['clear-tag-button']}
              onClick={handleClearTag}
            >
              ✕
            </button>
          )}
        </div>
      )}
      <div className={styles.container}>
        <BlogPostItems
          items={filteredItems.map(item => ({
            ...item,
          }))}
        />
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
