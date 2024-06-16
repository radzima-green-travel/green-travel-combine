import React from 'react';
import {Text, View} from 'react-native';

import {useThemeStyles} from 'core/hooks';

import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';

export const Filters = () => {
  const styles = useThemeStyles(themeStyles);

  return (
    <View style={styles.container}>
      <Text>TEST</Text>
    </View>
  );
};

Filters.screenOptions = screenOptions;
