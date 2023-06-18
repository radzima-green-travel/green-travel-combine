import React from 'react';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {Icon} from '../../components/atoms';

export const screenOptions = (
  onGoBack: () => void,
): NativeStackNavigationOptions => {
  return {
    headerLeft: () => (
      <TouchableOpacity activeOpacity={0.8} onPress={onGoBack}>
        <Icon name="chevron" color="white" size={24} />
      </TouchableOpacity>
    ),
  };
};
