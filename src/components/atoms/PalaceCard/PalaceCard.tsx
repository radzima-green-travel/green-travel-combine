import React from 'react';

import {View, Image} from 'react-native';
import {TextElemets} from '../TextElemets';

import {styles} from './styles';

export interface PalaceCardProps {
  image: string | number;
  title: string;
  root: string;
}

function PalaceCard({image, title}: PalaceCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={image as any} style={styles.image} resizeMode="cover" />
      </View>
      <View style={styles.textContainer}>
        <TextElemets.H1 style={styles.title}>{title}</TextElemets.H1>
      </View>
    </View>
  );
}

export default React.memo(PalaceCard);
