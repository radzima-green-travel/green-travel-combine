import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {FavoriteButtonContainer} from '../../containers';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {themeStyles} from './styles';
import {Animated, TextStyle, View} from 'react-native';
import {TestIDs} from 'core/types';

interface IProps {
  objectId: string;
  opacity: Animated.AnimatedInterpolation;
  onFavoriteToggle: (nextIsFavorite: boolean) => void;
}

export const AnimatedHeaderBookmarkButton = memo(
  ({objectId, opacity, onFavoriteToggle}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <FavoriteButtonContainer
        onFavoriteToggle={onFavoriteToggle}
        loadingIndicatorColor={(styles.icon as TextStyle).color as string}
        objectId={objectId}>
        {isFavorite => (
          <>
            <Animated.View style={[styles.iconContainer, {opacity}]} />
            <View style={styles.iconWrapper}>
              <Icon
                style={styles.icon}
                width={24}
                height={24}
                color={COLORS.logCabin}
                name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
                testID={TestIDs.HeaderBookmarkButton}
              />
            </View>
          </>
        )}
      </FavoriteButtonContainer>
    );
  },
);
