import React, {memo} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {useAnimatedStyle, interpolate} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  onSearchPress: () => void;
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.SharedValue<number>;
}

export const AppMapButtons = memo(
  ({onSearchPress, onShowLocationPress, bottomMenuPosition}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    const animatedStyles = useAnimatedStyle(() => {
      const translateY = interpolate(
        bottomMenuPosition.value,
        [-1, -0.5, 0],
        [0, 0, -75],
      );
      return {
        transform: [{translateY}],
      };
    });

    return (
      <Animated.View style={[styles.container, animatedStyles]}>
        <MapButtonContainer onPress={onSearchPress}>
          <Icon style={styles.icon} name="search" width={20} height={20} />
        </MapButtonContainer>
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
