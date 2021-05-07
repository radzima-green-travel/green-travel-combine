import React, {memo} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {Extrapolate} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';

interface IProps {
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.Value<number>;
  botttomInset: number;
}

export const ObjectDetailsMapButtons = memo(
  ({onShowLocationPress, bottomMenuPosition, botttomInset}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: Animated.interpolate(bottomMenuPosition, {
                  inputRange: [0, 1],
                  outputRange: [-(155 + botttomInset), 0],
                  extrapolate: Extrapolate.CLAMP,
                }),
              },
            ],
          },
        ]}>
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
