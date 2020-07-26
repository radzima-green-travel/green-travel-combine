import React from 'react';
import {View} from 'react-native';
import {ImageCarousel, IconButton} from 'atoms';
import {styles} from './styles';

interface Props {
  images: Array<string>;
}

export const PlaceDetailsImageSlider = ({images}: Props) => {
  return (
    <View>
      <ImageCarousel images={images} />
      <IconButton
        style={styles.crossButton}
        icon={{name: 'cross', width: 16, height: 16, color: '#D9D9D9'}}
      />
      <IconButton
        style={styles.markerMapButton}
        icon={{name: 'mapMarkerGray', width: 16, height: 20}}
      />
    </View>
  );
};
