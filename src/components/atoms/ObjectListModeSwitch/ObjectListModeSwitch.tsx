import {composeTestID} from 'core/helpers';
import React from 'react';
import {Pressable, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useThemeStyles} from '../../../core/hooks';
import {ObjectListViewMode} from '../../types';
import {Icon} from '../Icon/Icon';
import {objectListModeSwitchStyles} from './styles';

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
