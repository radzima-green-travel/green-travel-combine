import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {addToFavorite, removeFromFavorite} from 'core/reducers';
import {LayoutAnimation} from 'react-native';

export function useToggleFavorite({
  removeWithAnimation = false,
  onAnimationEnd = () => {},
} = {}) {
  const dispatch = useDispatch();

  return useCallback(
    ({objectId, needToAdd}: {objectId: string; needToAdd: boolean}) => {
      if (needToAdd) {
        dispatch(addToFavorite(objectId));
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

        dispatch(removeFromFavorite(objectId));
      }
    },
    [dispatch, removeWithAnimation, onAnimationEnd],
  );
}
