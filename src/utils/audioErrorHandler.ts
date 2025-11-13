import { AppDispatch } from '@/store/store';
import { setIsPlaying } from '@/store/features/trackSlice';

/**
 * Обработчик ошибок воспроизведения аудио
 * Логирует ошибку и останавливает воспроизведение
 */
export const handleAudioPlayError = (
  error: unknown,
  dispatch: AppDispatch,
): void => {
  console.error('Ошибка воспроизведения:', error);
  dispatch(setIsPlaying(false));
};
