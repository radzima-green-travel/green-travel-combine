import React, {memo} from 'react';
import {StyleProp, TouchableOpacity, View, ViewStyle} from 'react-native';
import {LoadingView} from 'atoms';
import {COLORS} from 'assets';
import {styles} from './styles';
import {getPlatformsTestID} from 'core/helpers';
import {useFavorite} from 'core/hooks';
import {TestIDs} from 'core/types';
const onAnimationEndDefault = () => {};

interface IProps {
  objectId?: string;
  style?: StyleProp<ViewStyle>;
  children: (isFavorite: boolean) => React.ReactNode;
  removeWithAnimation?: boolean;
  onAnimationEnd?: () => void;
  onFavoriteToggle?: (nextIsFavorite: boolean) => void;
  loadingIndicatorColor?: string;
  testID?: string;
}

export const FavoriteButtonContainer = memo(
  ({
    children,
    objectId,
    style,
    removeWithAnimation = false,
    onAnimationEnd = onAnimationEndDefault,
    onFavoriteToggle,
    testID,
    loadingIndicatorColor = COLORS.white,
  }: IProps) => {
    const {toggleFavoriteHandler, isFavorite, favoritesSynchronizing} =
      useFavorite({
        objectId,
        onFavoriteToggle,
        removeWithAnimation: removeWithAnimation,
        onAnimationEnd: onAnimationEnd,
      });

    return (
      <View {...getPlatformsTestID(testID)}>
        <View style={favoritesSynchronizing && styles.opaque}>
          <TouchableOpacity
            testID={TestIDs.FavoriteButton}
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
            style={style}
            onPress={toggleFavoriteHandler}
            disabled={favoritesSynchronizing}
            activeOpacity={0.8}>
            {children(Boolean(isFavorite))}
          </TouchableOpacity>
        </View>

        {favoritesSynchronizing ? (
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
