/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import RecipeItem from '../../components/RecipeItem';
import {BlogPostProvider} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/BlogPostItems';


export default function BlogPostItems({
  items,
}: Props): JSX.Element {
  // TODO: Fix sorted issues in Firefox
  //const sorted_items = items.sort((a, b) => a.content.metadata.title > b.content.metadata.title);
  const sorted_items = items;
  return (
    <>
      {sorted_items.map(({content: BlogPostContent}) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <RecipeItem />
        </BlogPostProvider>
      ))}
    </>
  );
}
