import React from 'react';
import {ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';

import {ScreenContent, TextElemets, Button} from 'atoms';
import {
  PlaceDetailsImageSlider,
  RouteMetrics,
  RouteDetailsBikeRental,
} from 'molecules';
const Image = require('../PlaceDetails/mockImage.jpg');

import {styles} from './styles';

export const RouteDetailsFull = () => {
  const {t} = useTranslation('route-details');

  return (
    <ScrollView style={styles.container}>
      <PlaceDetailsImageSlider images={[Image, Image, Image, Image]} />
      <ScreenContent style={styles.contentContainer}>
        <TextElemets.H1>{t('routeName')}</TextElemets.H1>
        <RouteMetrics containerStyle={styles.metricsContainer} />
        <Button label={t('howToGetThere')} />
        <RouteDetailsBikeRental />
      </ScreenContent>
    </ScrollView>
  );
};
