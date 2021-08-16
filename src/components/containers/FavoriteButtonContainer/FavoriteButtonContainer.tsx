import {useToggleFavorite} from 'core/hooks';
import React, {memo, useCallback, useMemo} from 'react';
import {StyleProp, TouchableOpacity, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBookmarksIds} from 'core/selectors';
import {find} from 'lodash';
const onAnimationEndDefault = () => {};

interface IProps {
  objectId?: string;
  style?: StyleProp<ViewStyle>;
  children: (isFavorite: boolean) => React.ReactNode;
  removeWithAnimation?: boolean;
  onAnimationEnd?: () => void;
  onFavoriteToggle?: (nextIsFavorite: boolean) => void;
}

export const FavoriteButtonContainer = memo(
  ({
    children,
    objectId,
    style,
    removeWithAnimation = false,
    onAnimationEnd = onAnimationEndDefault,
    onFavoriteToggle,
  }: IProps) => {
    const bookmarksIds = useSelector(selectBookmarksIds);

    const isFavorite = useMemo(
      () => (objectId ? find(bookmarksIds, id => id === objectId) : false),
      [bookmarksIds, objectId],
    );

    const toggleFavorite = useToggleFavorite({
      removeWithAnimation: removeWithAnimation,
      onAnimationEnd: onAnimationEnd,
    });

    const onPress = useCallback(() => {
      if (objectId) {
        const nextIsFavorite = !isFavorite;
        onFavoriteToggle?.(nextIsFavorite);
        toggleFavorite({objectId, needToAdd: nextIsFavorite});
      }
    }, [isFavorite, objectId, onFavoriteToggle, toggleFavorite]);

    return (
      <TouchableOpacity
        hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
        style={style}
        onPress={onPress}
        activeOpacity={0.8}>
        {children(Boolean(isFavorite))}
      </TouchableOpacity>
    );
  },
);
