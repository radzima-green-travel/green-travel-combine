import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {styles} from './styles';

export const RouteMetric = ({item: {metric, value}}) => {
  const {t} = useTranslation('route-details');

  return (
    <View style={styles.container}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.metric}>{t(metric)}</Text>
    </View>
  );
};
