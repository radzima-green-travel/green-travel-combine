import React from 'react';
import { View, Text } from 'react-native';
import { useScreenParams } from '@core/hooks/useScreenParams';
import { RouteScreenParams } from './params';

export function RouteScreen() {
  const { id } = useScreenParams(RouteScreenParams);

  return (
    <View className="flex-1 px-gutter pt-header-overlay">
      <Text className="text-2xl font-bold">{id}</Text>
    </View>
  );
}
