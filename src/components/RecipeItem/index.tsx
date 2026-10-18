import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

import {
  useBlogPost,
} from '@docusaurus/plugin-content-blog/client';
import { createRecipeLink } from '../../utils/recipeSearchUrl.mjs';

export type SearchMatchHint = {
  kind: 'ingredient' | 'tag';
  label: string;
  description: string;
};

type Props = {
  className?: string;
  returnSearch?: string;
  matchHint?: SearchMatchHint | null;
};

import styles from './styles.module.css';


export default function RecipeItem({
  className,
  returnSearch = '',
  matchHint,
}: Props): JSX.Element {
  const { metadata, assets } = useBlogPost();
  const image = assets.image ?? metadata.frontMatter.image;
  const { permalink } = metadata;
  const { title } = metadata;
  return (
    <div className={clsx(styles.container, 'col col--4', className)}>
      <Link
        className={clsx('card', styles.cardContainer)}
        href={createRecipeLink(permalink, returnSearch)}
        style={{ backgroundImage: `url(${image})` }}>

        <h1 className={styles.cardTitle} title={title}>
          {title}
        </h1>
        {matchHint && (
          <span
            className={styles.matchHint}
            title={matchHint.description}
            role="img"
            aria-label={matchHint.description}>
            {matchHint.kind === 'ingredient' ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 4 13C4 5 14 3 21 3c0 7-2 17-10 17Z" />
                <path d="M4 21c0-6 6-12 12-12" />
              </svg>
            ) : (
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20.59 13.41 13.41 20.59a2 2 0 0 1-2.82 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
                <circle cx="7" cy="7" r="1.5" />
              </svg>
            )}
          </span>
        )}
      </Link>
    </div>
  );
}
