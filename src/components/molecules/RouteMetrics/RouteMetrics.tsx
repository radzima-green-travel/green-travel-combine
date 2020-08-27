import React from 'react';
import {View} from 'react-native';

import {RouteMetric} from 'atoms';

import {styles} from './styles';

const mockData = [
  {metric: 'distance', value: '10 км'},
  {metric: 'time', value: '1,5 часа'},
  {metric: 'difficulty', value: 'легкий'},
];

export const RouteMetrics = ({data = mockData, containerStyle = {}}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}>
      {data.map((item) => (
        <RouteMetric key={item.metric} item={item} />
      ))}
    </View>
  );
};
