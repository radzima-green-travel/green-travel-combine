import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateBookmarksRequest } from 'core/actions';
import { LayoutAnimation } from 'react-native';

const onAnimationEndDefault = () => {};

export function useToggleFavorite({
  removeWithAnimation = false,
  onAnimationEnd = onAnimationEndDefault,
} = {}) {
  const dispatch = useDispatch();

  return useCallback(
    ({ objectId, needToAdd }: { objectId: string; needToAdd: boolean }) => {
      if (needToAdd) {
        dispatch(
          updateBookmarksRequest({
            objectId,
            data: { timestamp: Date.now(), status: true },
          }),
        );
      } else {
        if (removeWithAnimation) {
          LayoutAnimation.configureNext(
            {
              duration: 400,
              update: {
                type: LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.opacity,
              },
              delete: {
                type: LayoutAnimation.Types.easeOut,
                property: LayoutAnimation.Properties.opacity,
              },
            },
            onAnimationEnd,
          );
        }
        dispatch(
          updateBookmarksRequest({
            objectId,
            data: { timestamp: Date.now(), status: false },
          }),
        );
      }
    },
    [dispatch, removeWithAnimation, onAnimationEnd],
  );
}
