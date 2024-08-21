import {useNavigation} from '@react-navigation/core';
import {useThemeStyles} from 'core/hooks';
import React, {memo} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {themeStyles, TOP} from './styles';
import {AnimatedCircleButton} from '../AnimatedCircleButton';
import {composeTestID} from 'core/helpers';

interface IProps {
  onPress: () => void;
  testID: string;
}

export const BackCircleButton = memo(({onPress, testID}: IProps) => {
  const navigation = useNavigation();
  const styles = useThemeStyles(themeStyles);

  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.iconContainer, {top: TOP + top}]}>
      <AnimatedCircleButton
        icon={{
          name: 'chevronMediumLeft',
        }}
        testID={composeTestID(testID, 'backButton')}
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
