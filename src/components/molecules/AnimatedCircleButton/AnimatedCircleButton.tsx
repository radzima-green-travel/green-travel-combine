import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {themeStyles} from './styles';
import {IconProps, Icon} from 'atoms/Icon';
import Animated from 'react-native-reanimated';
import {composeTestID, getPlatformsTestID} from 'core/helpers';
interface IProps {
  style?: StyleProp<ViewStyle>;
  icon: IconProps;
  testID: string;
  onPress?: () => void;
}
export const AnimatedCircleButton = memo(
  ({icon, testID, onPress, style}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={styles.container}
        {...getPlatformsTestID(testID)}
        hitSlop={15}>
        <Animated.View style={[styles.iconContainer, style]} />
        <View style={styles.iconWrapper}>
          <Icon
            style={styles.icon}
            size={24}
            testID={composeTestID(testID, 'icon')}
            {...icon}
          />
        </View>
      </TouchableOpacity>
    );
  },
);
