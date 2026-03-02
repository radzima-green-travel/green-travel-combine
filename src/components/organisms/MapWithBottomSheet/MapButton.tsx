import { Button, Icon } from 'atoms';
import { useThemeStyles, useTranslation } from 'core/hooks';
import React from 'react';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { themeStyles } from './styles';

interface MapButtonProps {
  onPress: () => void;
  mapBottomSheetSnapIndex: SharedValue<number>;
}

export const MapButton: React.FC<MapButtonProps> = ({
  onPress,
  mapBottomSheetSnapIndex,
}) => {
  const { t } = useTranslation('search');
  const styles = useThemeStyles(themeStyles);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: withTiming(mapBottomSheetSnapIndex.value > 1.99 ? 1 : 0, {
          duration: 150,
        }),
      },
    ],
  }));

  return (
    <Animated.View style={animatedStyle} pointerEvents="box-none">
      <Button
        elevated
        testID="mapButton"
        text={t('map')}
        style={styles.bottomButton}
        onPress={onPress}
        renderIcon={textStyle => <Icon name="map" style={textStyle} />}
      />
    </Animated.View>
  );
};
