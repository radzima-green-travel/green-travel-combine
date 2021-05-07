import React, {memo} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  onSearchPress: () => void;
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.Value<number>;
}

export const AppMapButtons = memo(
  ({onSearchPress, onShowLocationPress, bottomMenuPosition}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: Animated.interpolate(bottomMenuPosition, {
                  inputRange: [0, 0.5, 1],
                  outputRange: [-60, 0, 0],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          },
        ]}>
        <MapButtonContainer onPress={onSearchPress}>
          <Icon
            style={styles.icon}
            name="search"
            width={20}
            height={20}
            color={COLORS.logCabin}
          />
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
