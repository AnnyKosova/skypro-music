'use client';

import { data } from '@/app/data';
import { formatTime } from '@/utils/time';
import cn from 'classnames';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import styles from './CenterBlock.module.css';

export const CenterBlock = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const uniqueAuthors = useMemo(() => {
    const authors = [...new Set(data.map((track) => track.author))].filter(
      (author) => author !== '-',
    );
    return authors.sort();
  }, []);

  const uniqueYears = useMemo(() => {
    const years = [
      ...new Set(data.map((track) => track.release_date.split('-')[0])),
    ].sort((a, b) => b.localeCompare(a));
    return years;
  }, []);

  const uniqueGenres = useMemo(() => {
    const genres = [...new Set(data.flatMap((track) => track.genre))].sort();
    return genres;
  }, []);

  const handleFilterClick = (filterType: string) => {
    console.log('Filter clicked:', filterType);
    setActiveFilter(activeFilter === filterType ? null : filterType);
  };

  const renderFilterList = () => {
    if (!activeFilter) {
      console.log('No active filter');
      return null;
    }

    let items: string[] = [];

    switch (activeFilter) {
      case 'author':
        items = uniqueAuthors;
        break;
      case 'year':
        items = uniqueYears;
        break;
      case 'genre':
        items = uniqueGenres;
        break;
      default:
        return null;
    }

    console.log('Rendering filter list:', activeFilter, 'Items:', items.length);

    return (
      <div className={styles.filter__list}>
        {items.map((item, index) => (
          <div key={index} className={styles.filter__item}>
            {item}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки ({data.length})</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__buttons}>
          <div className={styles.filter__buttonContainer}>
            <div
              className={cn(styles.filter__button, {
                [styles.active]: activeFilter === 'author',
              })}
              onClick={() => handleFilterClick('author')}
            >
              исполнителю
            </div>
            {activeFilter === 'author' && renderFilterList()}
          </div>
          <div className={styles.filter__buttonContainer}>
            <div
              className={cn(styles.filter__button, {
                [styles.active]: activeFilter === 'year',
              })}
              onClick={() => handleFilterClick('year')}
            >
              году выпуска
            </div>
            {activeFilter === 'year' && renderFilterList()}
          </div>
          <div className={styles.filter__buttonContainer}>
            <div
              className={cn(styles.filter__button, {
                [styles.active]: activeFilter === 'genre',
              })}
              onClick={() => handleFilterClick('genre')}
            >
              жанру
            </div>
            {activeFilter === 'genre' && renderFilterList()}
          </div>
        </div>
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={cn(styles.playlistTitle__col, styles.col01)}>
            Трек
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col02)}>
            Исполнитель
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col03)}>
            Альбом
          </div>
          <div className={cn(styles.playlistTitle__col, styles.col04)}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>
        <div className={styles.content__playlist}>
          {data.map((track) => (
            <div key={track._id} className={styles.playlist__item}>
              <div className={styles.playlist__track}>
                <div className={styles.track__title}>
                  <div className={styles.track__titleImage}>
                    <svg className={styles.track__titleSvg}>
                      <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                    </svg>
                  </div>
                  <div className={styles['track__title-text']}>
                    <Link className={styles.track__titleLink} href="#">
                      {track.name}
                      <span className={styles.track__titleSpan}></span>
                    </Link>
                  </div>
                </div>
                <div className={styles.track__author}>
                  <Link className={styles.track__authorLink} href="#">
                    {track.author}
                  </Link>
                </div>
                <div className={styles.track__album}>
                  <Link className={styles.track__albumLink} href="#">
                    {track.album}
                  </Link>
                </div>
                <div className={styles.track__time}>
                  <svg className={styles.track__timeSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                  </svg>
                  <span className={styles.track__timeText}>
                    {formatTime(track.duration_in_seconds)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
