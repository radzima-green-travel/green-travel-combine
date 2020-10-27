import React from 'react';

import {StyleSheet, ColorSchemeName} from 'react-native';
import {StackNavigationOptions} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'atoms';

export interface IOptions {
  colorScheme: ColorSchemeName;
}

export const getAppHeaderOptions = ({
  colorScheme,
}: IOptions): StackNavigationOptions => ({
  headerBackTitleVisible: false,
  headerTintColor: 'white',
  headerTitleAlign: 'center',
  cardStyle: {backgroundColor: colorScheme === 'light' ? '#fff' : '#000'},
  headerBackImage: () => <Icon name="chevron" color="white" size={32} />,
  headerBackground: () => (
    <LinearGradient
      start={{x: 0.0, y: 0.0}}
      end={{x: 1.0, y: 0.0}}
      colors={['#50A021', '#35C7A4']}
      style={StyleSheet.absoluteFill}
    />
  ),
  headerTitleStyle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
  },
  headerLeftContainerStyle: {paddingLeft: 16},
});
