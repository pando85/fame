/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RecipeItem from '../../components/RecipeItem';
import type { SearchMatchHint } from '../../components/RecipeItem';
import {
  BlogPostProvider,
} from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItems';


type SearchProps = Props & {
  returnSearch?: string;
  matchHints?: Record<string, SearchMatchHint | null>;
};

export default function BlogPostItems({
  items,
  returnSearch = '',
  matchHints = {},
}: SearchProps): JSX.Element {
  return (
    <>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <RecipeItem
            returnSearch={returnSearch}
            matchHint={matchHints[BlogPostContent.metadata.permalink]}
          />
        </BlogPostProvider>
      ))}
    </>
  );
}
