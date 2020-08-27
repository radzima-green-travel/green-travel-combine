import React from 'react';
import {View, Text} from 'react-native';

import {RouteMetrics} from '../RouteMetrics';

import {styles} from './styles';

export const BikeRentalWidget = ({data, title}) => (
  <View style={styles.contentContainer}>
    <Text style={styles.title}>{title}</Text>
    <View style={styles.metricsContainer}>
      <RouteMetrics data={data} />
    </View>
  </View>
);
