import React, {memo, useState} from 'react';
import {MapButtonContainer, Icon} from 'atoms';
import {themeStyles} from './styles';
import {COLORS} from 'assets';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {useThemeStyles} from 'core/hooks';
import {SCREEN_HEIGHT} from 'services/PlatformService';
import {composeTestID} from 'core/helpers';

interface IProps {
  onShowLocationPress: () => void;
  bottomMenuPosition: Animated.SharedValue<number>;
  botttomInset: number;
  isUserLocationFocused: boolean;
  testID: string;
}

export const ObjectDetailsMapButtons = memo(
  ({
    onShowLocationPress,
    bottomMenuPosition,
    isUserLocationFocused,
    testID,
  }: IProps) => {
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
        <MapButtonContainer
          testID={composeTestID(testID, 'buttonContainer')}
          style={styles.showLocationButton}
          onPress={onShowLocationPress}>
          <Icon
            style={styles.icon}
            name={isUserLocationFocused ? 'showLocationFilled' : 'showLocation'}
            size={24}
            color={COLORS.logCabin}
          />
        </MapButtonContainer>
      </Animated.View>
    );
  },
);
