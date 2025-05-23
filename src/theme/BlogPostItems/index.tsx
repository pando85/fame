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


export default function BlogPostItems({
  items,
}: Props): JSX.Element {
  return (
    <>
      {items.map(({ content: BlogPostContent }) => (
        <BlogPostProvider
          key={BlogPostContent.metadata.permalink}
          content={BlogPostContent}>
          <RecipeItem />
        </BlogPostProvider>
      ))}
    </>
  );
}
