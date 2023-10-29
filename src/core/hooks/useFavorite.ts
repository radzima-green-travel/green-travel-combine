import {useRequestLoading} from 'react-redux-help-kit';
import {useToggleFavorite} from './useToggleFavorite';
import {useSelector} from 'react-redux';
import {useCallback, useMemo} from 'react';
import {find} from 'lodash';
import {selectBookmarksIdsFromFavorites} from 'core/selectors';
import {syncAndGetFavoritesRequest} from 'core/reducers';
import {hapticFeedbackService} from 'services/HapticFeedbackService';

export function useFavorite({
  objectId,
  onFavoriteToggle,
  removeWithAnimation,
  onAnimationEnd,
}: {
  objectId?: string;
  onFavoriteToggle?: (isFavorite: boolean) => void;
  removeWithAnimation?: boolean;
  onAnimationEnd?: () => void;
}) {
  const bookmarksIds = useSelector(selectBookmarksIdsFromFavorites);
  const {loading: favoritesSynchronizing} = useRequestLoading(
    syncAndGetFavoritesRequest,
  );

  const isFavorite = useMemo(
    () => (objectId ? find(bookmarksIds, id => id === objectId) : false),
    [bookmarksIds, objectId],
  );
  const toggleFavorite = useToggleFavorite({
    removeWithAnimation,
    onAnimationEnd,
  });

  const toggleFavoriteHandler = useCallback(() => {
    if (objectId) {
      hapticFeedbackService.trigger();
      const nextIsFavorite = !isFavorite;
      onFavoriteToggle?.(nextIsFavorite);
      toggleFavorite({objectId, needToAdd: nextIsFavorite});
    }
  }, [isFavorite, objectId, onFavoriteToggle, toggleFavorite]);

  return {toggleFavoriteHandler, favoritesSynchronizing, isFavorite};
}
