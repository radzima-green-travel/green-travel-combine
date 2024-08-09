import {useRequestLoading} from 'react-redux-help-kit';
import {useToggleFavorite} from './useToggleFavorite';
import {useSelector} from 'react-redux';
import {useCallback, useMemo} from 'react';
import {find} from 'lodash';
import {selectBookmarksIds} from 'core/selectors';
import {syncAndGetBookmarksRequest} from 'core/actions';
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
  const bookmarksIds = useSelector(selectBookmarksIds);
  const {loading: favoritesSynchronizing} = useRequestLoading(
    syncAndGetBookmarksRequest,
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
