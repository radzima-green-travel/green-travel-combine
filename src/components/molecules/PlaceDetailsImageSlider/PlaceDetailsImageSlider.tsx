import React from 'react';
import {View} from 'react-native';
import {ImageSlider, IconButton} from 'atoms';
import {styles} from './styles';

interface Props {
  images: Array<string>;
  isFavorite: boolean;
  onBookmarkPress: () => void;
  onMarkerPress: () => void;
}

export const PlaceDetailsImageSlider = ({
  images,
  isFavorite,
  onMarkerPress,
  onBookmarkPress,
}: Props) => {
  return (
    <View>
      <ImageSlider images={images} />
      <IconButton
        style={styles.leftButton}
        icon={{name: 'marker', width: 18, height: 22, color: '#393939'}}
        onPress={onMarkerPress}
      />
      <IconButton
        style={styles.rightButton}
        icon={{
          name: isFavorite ? 'bookmarkFilled' : 'bookmark',
          width: 14,
          height: 18,
          color: '#080908',
        }}
        onPress={onBookmarkPress}
      />
    </View>
  );
};
