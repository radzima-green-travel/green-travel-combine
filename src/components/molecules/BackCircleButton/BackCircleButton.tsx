import {useNavigation} from '@react-navigation/core';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {themeStyles, TOP} from './styles';
import {AnimatedCircleButton} from '../AnimatedCircleButton';
import {TestIDs} from 'core/types';

interface IProps {
  onPress: () => void;
}

export const BackCircleButton = memo(({onPress}: IProps) => {
  const navigation = useNavigation();
  const styles = useThemeStyles(themeStyles);

  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.iconContainer, {top: TOP + top}]}>
      <AnimatedCircleButton
        icon={{
          name: 'chevronMediumLeft',
        }}
        testID={TestIDs.HeaderBackButton}
        onPress={() => {
          if (navigation.canGoBack()) {
            navigation.goBack();
          }
          onPress?.();
        }}
      />
    </View>
  );
});
