import React, {memo} from 'react';
import {View} from 'react-native';
import {IconButton, TextElemets, PalaceCard} from 'atoms';
import {styles} from './styles';

import {useTranslation} from 'react-i18next';

interface Props {
  places: Array<object>;
}

export const HomeInterestingPlaces = memo(({places = []}: Props) => {
  const {t} = useTranslation('home');

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <TextElemets.H2>{t('Interesting around')}</TextElemets.H2>
        <IconButton
          icon={{name: 'marker', width: 18, height: 18}}
          style={styles.button}
        />
      </View>
      {places.map(({image, title, root}: any) => (
        <PalaceCard key={title} image={image} title={title} root={root} />
      ))}
    </View>
  );
});
