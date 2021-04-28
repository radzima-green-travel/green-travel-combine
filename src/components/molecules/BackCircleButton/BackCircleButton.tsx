import {useNavigation} from '@react-navigation/core';
import {COLORS} from 'assets';
import {Icon} from 'atoms';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {themeStyles, TOP} from './styles';

interface IProps {
  onPress: () => void;
}

export const BackCircleButton = memo(({onPress}: IProps) => {
  const navigation = useNavigation();
  const styles = useThemeStyles(themeStyles);

  const {top} = useSafeAreaInsets();

  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
        navigation.goBack();
      }}
      activeOpacity={0.8}
      style={[styles.iconContainer, {top: TOP + top}]}>
      <Icon size={24} color={COLORS.logCabin} name="chevron" />
    </TouchableOpacity>
  );
});
