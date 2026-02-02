import { composeTestID } from 'core/helpers';
import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useThemeStyles } from 'core/hooks';
import { ObjectListViewMode } from '../../types';
import { Icon } from '../Icon/Icon';
import { objectListModeSwitchStyles } from './styles';

export interface ObjectListModeSwitchProps {
  testID: string;
  selectedMode: ObjectListViewMode;
  onPress?: (selectedMode: ObjectListViewMode) => void;
}

export const ObjectListModeSwitch: React.FC<ObjectListModeSwitchProps> = ({
  testID,
  selectedMode,
  onPress,
}) => {
  const position = useSharedValue(selectedMode === 'card' ? 1 : 0);
  const styles = useThemeStyles(objectListModeSwitchStyles);

  const indicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: position.value * 36,
        },
      ],
    };
  });

  // The component doesn't support animation on selectedMode prop change
  // Because it is used in FlatList header, which gets re-mounted on numColums change
  // But this doesn't happen with current usage

  // Keeping animated value outside component didn't work out because icons cannot be animated
  // The only way left is to use an alternative library like LegendList to avoid re-mounting
  const handlePress = (mode: ObjectListViewMode) => {
    position.value = withTiming(mode === 'card' ? 1 : 0, {
      duration: 300,
      easing: Easing.inOut(Easing.cubic),
    });

    requestAnimationFrame(() => {
      onPress?.(mode);
    });
  };

  return (
    <View style={styles.container} testID={testID}>
      <Animated.View style={[styles.indicator, indicatorStyle]} />
      <Pressable
        disabled={selectedMode === 'list'}
        style={styles.button}
        onPress={() => handlePress('list')}
        testID={composeTestID(testID, 'listModeButton')}>
        <Icon
          name="headlineView"
          size={20}
          style={
            selectedMode === 'list' ? styles.iconActive : styles.iconInactive
          }
        />
      </Pressable>
      <Pressable
        disabled={selectedMode === 'card'}
        style={styles.button}
        onPress={() => handlePress('card')}
        testID={composeTestID(testID, 'cardModeButton')}>
        <Icon
          name="gridView"
          size={20}
          style={
            selectedMode === 'card' ? styles.iconActive : styles.iconInactive
          }
        />
      </Pressable>
    </View>
  );
};
