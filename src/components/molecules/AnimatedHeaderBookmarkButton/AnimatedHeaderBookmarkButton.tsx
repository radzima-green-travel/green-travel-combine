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
        objectId={objectId}
        testID={TestIDs.HeaderBookmarkButton}>
        {isFavorite => (
          <>
            <Animated.View style={[styles.iconContainer, {opacity}]} />
            <View style={styles.iconWrapper}>
              <Icon
                style={styles.icon}
                width={14}
                height={18}
                color={COLORS.logCabin}
                name={isFavorite ? 'bookmarkFilled' : 'bookmark'}
              />
            </View>
          </>
        )}
      </FavoriteButtonContainer>
    );
  },
);
