'use client';

import { getSelectionById } from '@/api/selectionsApi';
import { getAllTracks, getFavoriteTracks } from '@/api/tracksApi';
import styles from '@/components/CenterBlock/CenterBlock.module.css';
import { MainLayout } from '@/components/MainLayout/MainLayout';
import { Search } from '@/components/Search/Search';
import { Track } from '@/components/Track/Track';
import { setFavoriteTracks, setPlaylist } from '@/store/features/trackSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { Selection } from '@/types/selection';
import { Track as TrackType } from '@/types/track';
import { use, useEffect, useMemo, useRef, useState } from 'react';

export default function SelectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const dispatch = useAppDispatch();
  const { accessToken, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const hasLoadedFavorites = useRef(false);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Кастомные названия для отображения (соответствуют картинкам)
  const customTitles: Record<number, string> = {
    2: 'Плейлист дня',
    3: '100 танцевальных хитов',
    4: 'Инди-заряд',
  };

  useEffect(() => {
    const loadSelection = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Загружаем данные подборки и все треки параллельно
        const [selectionData, allTracksData] = await Promise.all([
          getSelectionById(Number(resolvedParams.id)),
          getAllTracks(),
        ]);

        if (!selectionData) {
          throw new Error('Подборка не найдена');
        }

        // Фильтруем треки по ID из подборки
        const selectionTracks = allTracksData.filter((track) =>
          selectionData.items.includes(track._id),
        );

        // Сохраняем подборку с полными данными треков
        const fullSelection: Selection = {
          ...selectionData,
          items: selectionTracks,
        };

        setSelection(fullSelection);
        dispatch(setPlaylist(selectionTracks));
      } catch (error) {
        setError((error as Error).message);
        console.error('Ошибка загрузки подборки:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSelection();
  }, [resolvedParams.id, dispatch]);

  useEffect(() => {
    const loadFavoriteTracks = async () => {
      if (
        isAuthenticated &&
        accessToken &&
        !hasLoadedFavorites.current &&
        favoriteTracks.length === 0
      ) {
        hasLoadedFavorites.current = true;
        try {
          const tracks = await getFavoriteTracks(accessToken);
          dispatch(setFavoriteTracks(tracks));
        } catch (error) {
          console.error('Ошибка загрузки избранных треков:', error);
        }
      }
    };

    loadFavoriteTracks();
  }, [isAuthenticated, accessToken, dispatch, favoriteTracks.length]);

  // Фильтрация треков по поисковому запросу
  const filteredTracks = useMemo(() => {
    if (!selection?.items) {
      return [];
    }

    if (!searchQuery.trim()) {
      return selection.items;
    }

    const query = searchQuery.toLowerCase().trim();
    return selection.items.filter((track: TrackType) =>
      track.name.toLowerCase().includes(query),
    );
  }, [selection?.items, searchQuery]);

  return (
    <MainLayout>
      <div className={styles.centerblock}>
        <Search value={searchQuery} onChange={setSearchQuery} />
        <h2 className={styles.centerblock__h2}>
          {customTitles[Number(resolvedParams.id)] ||
            selection?.name ||
            'Подборка'}
        </h2>

        {isLoading && (
          <div className={styles.centerblock__loading}>
            Загрузка подборки...
          </div>
        )}

        {error && (
          <div className={styles.centerblock__error}>Ошибка: {error}</div>
        )}

        {!isLoading && !error && selection && (
          <div className={styles.centerblock__content}>
            <div className={styles.content__playlist}>
              <Track isHeader={true} />
              {filteredTracks.length > 0 ? (
                filteredTracks.map((track) => (
                  <Track key={track._id} track={track} />
                ))
              ) : (
                <div className={styles.centerblock__empty}>
                  Треки не найдены. Попробуйте изменить поисковый запрос.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
