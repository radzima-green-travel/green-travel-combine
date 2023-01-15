import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {Animated, View} from 'react-native';
import {themeStyles} from './styles';
import {TestIDs} from 'core/types';

interface IProps {
  opacity: Animated.AnimatedInterpolation;
}
export const AnimatedBackCircleButton = memo(({opacity}: IProps) => {
  const styles = useThemeStyles(themeStyles);

  return (
    <View>
      <Animated.View style={[styles.iconContainer, {opacity}]} />
      <View style={styles.iconWrapper}>
        <Icon
          style={styles.icon}
          size={24}
          color={COLORS.logCabin}
          name="chevron"
          testID={TestIDs.HeaderBackButton}
        />
      </View>
    </View>
  );
});
