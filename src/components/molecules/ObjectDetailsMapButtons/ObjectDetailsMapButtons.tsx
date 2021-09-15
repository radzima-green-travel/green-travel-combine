import React, {memo} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.SharedValue<number>;
  botttomInset: number;
}

export const ObjectDetailsMapButtons = memo(
  ({onShowLocationPress, bottomMenuPosition, botttomInset}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const animatedStyles = useAnimatedStyle(() => {
      const translateY = interpolate(
        bottomMenuPosition.value,
        [-1, 0],
        [0, -(165 + botttomInset)],
      );
      return {
        transform: [{translateY}],
      };
    });
    return (
      <Animated.View style={[styles.container, animatedStyles]}>
        <MapButtonContainer
          style={styles.showLocationButton}
          onPress={onShowLocationPress}>
          <Icon
            style={styles.icon}
            name="showLocation"
            width={19.5}
            height={19}
            color={COLORS.logCabin}
          />
        </MapButtonContainer>
      </Animated.View>
    );
  },
);
