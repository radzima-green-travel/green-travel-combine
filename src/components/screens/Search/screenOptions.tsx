import {StackNavigationOptions} from '@react-navigation/stack';
import {HeaderSearchbar} from 'atoms';
import React from 'react';

export const screenOptions: StackNavigationOptions = {
  headerTitle: () => <HeaderSearchbar />,
  headerTitleContainerStyle: {
    width: '100%',
    paddingLeft: 48,
    paddingRight: 16,
  },
  headerLeftContainerStyle: {paddingLeft: 16, marginBottom: 14},
};
