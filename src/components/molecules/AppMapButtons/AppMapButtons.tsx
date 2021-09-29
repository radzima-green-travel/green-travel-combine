import React, {memo, useState} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';
import {SCREEN_HEIGHT} from 'services/PlatformService';

interface IProps {
  onSearchPress: () => void;
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.SharedValue<number>;
}

export const AppMapButtons = memo(
  ({onSearchPress, onShowLocationPress, bottomMenuPosition}: IProps) => {
    const styles = useThemeStyles(themeStyles);
    const [buttonsOffset, setButtonsOffset] = useState(140);

    const animatedStyles = useAnimatedStyle(() => {
      const diff = SCREEN_HEIGHT - bottomMenuPosition.value;
      const translateY = diff < buttonsOffset ? 0 : (diff - buttonsOffset) * -1;
      return {
        transform: [{translateY}],
      };
    });

    return (
      <Animated.View
        onLayout={({nativeEvent}) =>
          setButtonsOffset(
            SCREEN_HEIGHT -
              nativeEvent.layout.y -
              nativeEvent.layout.height -
              16,
          )
        }
        style={[styles.container, animatedStyles]}>
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
