import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Animated, View} from 'react-native';
import {themeStyles} from './styles';
import {IconsNames} from 'atoms/Icon';

interface IProps {
  opacity: Animated.AnimatedInterpolation;
  iconName: IconsNames;
  testID: string;
}
export const AnimatedCircleButton = memo(
  ({opacity, iconName, testID}: IProps) => {
    const styles = useThemeStyles(themeStyles);

    return (
      <View>
        <Animated.View style={[styles.iconContainer, {opacity}]} />
        <View style={styles.iconWrapper}>
          <Icon
            style={styles.icon}
            size={24}
            color={COLORS.logCabin}
            name={iconName}
            testID={testID}
          />
        </View>
      </View>
    );
  },
);
