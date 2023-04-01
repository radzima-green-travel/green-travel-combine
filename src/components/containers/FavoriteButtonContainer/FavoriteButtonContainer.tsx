import {useRequestLoading, useToggleFavorite} from 'core/hooks';
import React, {memo, useCallback, useMemo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {useSelector} from 'react-redux';
import {selectBookmarksIdsFromFavorites} from 'core/selectors';
import {find} from 'lodash';
import {hapticFeedbackService} from 'services/HapticFeedbackService';
import {syncAndGetFavoritesRequest} from 'core/reducers';
import {LoadingView} from 'atoms';
import {COLORS} from 'assets';
import {styles} from './styles';
const onAnimationEndDefault = () => {};

interface IProps {
  objectId?: string;
  style?: StyleProp<ViewStyle>;
  children: (isFavorite: boolean) => React.ReactNode;
  removeWithAnimation?: boolean;
  onAnimationEnd?: () => void;
  onFavoriteToggle?: (nextIsFavorite: boolean) => void;
  loadingIndicatorColor?: string;
}

export const FavoriteButtonContainer = memo(
  ({
    children,
    objectId,
    style,
    removeWithAnimation = false,
    onAnimationEnd = onAnimationEndDefault,
    onFavoriteToggle,
    loadingIndicatorColor = COLORS.white,
  }: IProps) => {
    const bookmarksIds = useSelector(selectBookmarksIdsFromFavorites);
    const {loading} = useRequestLoading(syncAndGetFavoritesRequest);

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
        hapticFeedbackService.trigger();
        const nextIsFavorite = !isFavorite;
        onFavoriteToggle?.(nextIsFavorite);
        toggleFavorite({objectId, needToAdd: nextIsFavorite});
      }
    }, [isFavorite, objectId, onFavoriteToggle, toggleFavorite]);

    return (
      <View>
        <View style={loading && styles.opaque}>
          <TouchableOpacity
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
            style={style}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}>
            {children(Boolean(isFavorite))}
          </TouchableOpacity>
        </View>

        {loading ? (
          <LoadingView
            size="small"
            color={loadingIndicatorColor}
            containerStyle={styles.loadingContainer}
          />
        ) : null}
      </View>
    );
  },
);
