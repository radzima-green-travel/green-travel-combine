import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {FavoriteButtonContainer} from '../../containers';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {themeStyles} from './styles';
import {Animated, View} from 'react-native';

interface IProps {
  objectId: string;
  opacity: Animated.AnimatedInterpolation;
}

export const AnimatedHeaderBookmarkButton = memo(
  ({objectId, opacity}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <FavoriteButtonContainer objectId={objectId}>
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
