import React, {memo} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {styles} from './styles';
import {COLORS} from 'assets';
import Animated, {Extrapolate} from 'react-native-reanimated';

interface IProps {
  onSearchPress: () => void;
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.Value<number>;
}

export const AppMapButtons = memo(
  ({onSearchPress, onShowLocationPress, bottomMenuPosition}: IProps) => {
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
          <Icon name="search" width={20} height={20} color={COLORS.logCabin} />
        </MapButtonContainer>
        <MapButtonContainer
          style={styles.showLocationButton}
          onPress={onShowLocationPress}>
          <Icon
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
