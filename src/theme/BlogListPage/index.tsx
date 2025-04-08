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

  const fuseOptions = {
    ignoreDiacritics: true,
    threshold: 0.4,
    keys: [
      'content.metadata.title',
    ],
  };

  const fuse = React.useMemo(() => new Fuse(items, fuseOptions), [items]);

  const filteredItems = React.useMemo(() => {
    if (!searchTerm) {
      return [...items].sort((a, b) =>
        a.content.metadata.title.localeCompare(b.content.metadata.title)
      );
    }

    return fuse.search(searchTerm).map(result => result.item);
  }, [fuse, items, searchTerm]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  return (
    <BlogLayout>
      <div className={styles['search-container']}>
        <div className={styles['search-input-container']}>
          <input
            type="text"
            id="searchInput"
            placeholder="Search posts..."
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
