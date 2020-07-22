import React from 'react';
import {View} from 'react-native';
import {TextElemets, Searchbar} from 'atoms';
import {styles} from './styles';

import {useTranslation} from 'react-i18next';

export const HomeSearch = () => {
  const {t} = useTranslation('home');

  return (
    <View style={styles.container}>
      <TextElemets.H2 style={styles.text}>
        {t('Where are we going?')}
      </TextElemets.H2>
      <Searchbar />
    </View>
  );
};
