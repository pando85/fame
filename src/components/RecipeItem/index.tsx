import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import type { Props } from '@theme/BlogPostItem/Header/Info';

import styles from './styles.module.css';


export default function RecipeItem({
  className,
}: Props): JSX.Element {
  const { metadata, assets } = useBlogPost();
  const image = assets.image ?? metadata.frontMatter.image;
  const { permalink } = metadata;
  const { title } = metadata;
  return (
    <div className={clsx(styles.container, 'col col--4', className)}>
      <Link
        className={clsx('card padding--xl', styles.cardContainer)}
        href={permalink}
        style={{ backgroundImage: `url(${image})` }}>

        <h1 className={clsx('text--truncate', styles.cardTitle)} title={title}>
          {title}
        </h1>
      </Link>
    </div>
  );
}
