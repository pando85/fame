/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RecipeItem from '../../components/RecipeItem';
import {
  BlogPostProvider,
} from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItems';


type SearchProps = Props & {
  returnSearch?: string;
  matchLabels?: Record<string, string>;
};

export default function BlogPostItems({
  items,
  returnSearch = '',
  matchLabels = {},
}: SearchProps): JSX.Element {
  return (
    <>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <RecipeItem
            returnSearch={returnSearch}
            matchLabel={matchLabels[BlogPostContent.metadata.permalink]}
          />
        </BlogPostProvider>
      ))}
    </>
  );
}
