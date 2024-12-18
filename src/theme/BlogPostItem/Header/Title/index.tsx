/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import {
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItem/Header/Title';

import styles from './styles.module.css';

export default function BlogPostItemHeaderTitle({
  className,
}: Props): JSX.Element {
  const { assets, metadata, isBlogPostPage } = useBlogPost();
  const { permalink, title } = metadata;
  const image = assets.image ?? metadata.frontMatter.image;
  const TitleHeading = isBlogPostPage ? 'h1' : 'h2';
  return (
    <div className={clsx(styles.titleContainer, className)}>
      <img src={image} alt={title} className={styles.img} />
      <TitleHeading className={styles.title} itemProp="headline">
        {isBlogPostPage ? (
          title
        ) : (
          <Link itemProp="url" to={permalink}>
            {title}
          </Link>
        )}
      </TitleHeading>
    </div>
  );
}
