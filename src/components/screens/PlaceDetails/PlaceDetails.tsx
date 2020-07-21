import React from 'react';
import {ScrollView} from 'react-native';
import {PlaceDetailsImageSlider} from 'molecules';
const image = require('./mockImage.jpg');
export const PlaceDetails = () => {
  return (
    <ScrollView>
      <PlaceDetailsImageSlider images={[image, image, image, image]} />
    </ScrollView>
  );
};
