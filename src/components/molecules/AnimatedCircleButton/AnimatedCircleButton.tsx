import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {View, TouchableOpacity, StyleProp, ViewStyle} from 'react-native';
import {buttonHitSlop, themeStyles} from './styles';
import {IconProps, Icon} from 'atoms/Icon';
import Animated from 'react-native-reanimated';
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
        hitSlop={buttonHitSlop}>
        <Animated.View style={[styles.iconContainer, style]} />
        <View style={styles.iconWrapper}>
          <Icon style={styles.icon} size={24} testID={testID} {...icon} />
        </View>
      </TouchableOpacity>
    );
  },
);
