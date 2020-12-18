import React from 'react';
import {View} from 'react-native';
import {ImageSlider, IconButton} from 'atoms';
import {styles} from './styles';

interface Props {
  images: Array<string>;
}

export const PlaceDetailsImageSlider = ({images}: Props) => {
  return (
    <View>
      <ImageSlider images={images} />
      <IconButton
        style={styles.crossButton}
        icon={{name: 'cross', width: 16, height: 16, color: '#D9D9D9'}}
        onPress={() => false} // TODO implement onpress
      />
      <IconButton
        style={styles.markerMapButton}
        icon={{name: 'mapMarkerGray', width: 16, height: 20}}
        onPress={() => false} // TODO implement onpress
      />
    </View>
  );
};
