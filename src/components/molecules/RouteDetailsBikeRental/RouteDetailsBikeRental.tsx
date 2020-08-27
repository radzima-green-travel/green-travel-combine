import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Icon} from 'atoms';
import {BikeRentalWidget} from 'molecules';

import {styles} from './styles';

const mockData = [
  {metric: 'bikeTime', value: '9.00 - 21.00'},
  {metric: 'bikePrice', value: '15 руб'},
];

export const RouteDetailsBikeRental = () => {
  const {t} = useTranslation('route-details');

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="bicycle" />
      </View>
      <BikeRentalWidget data={mockData} title={t('bikeRentalTitle')} />
    </View>
  );
};
