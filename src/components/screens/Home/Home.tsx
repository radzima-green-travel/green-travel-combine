import React from 'react';
import {ScreenContent} from 'atoms';
import {HomeCategoriesBar, HomeSearch, HomeInterestingPlaces} from 'molecules';
import {ScrollView} from 'react-native';

import {CATEGORIES, PLACES} from './mock';
import {styles} from './styles';

export const Home = () => {
  return (
    <ScrollView style={styles.scrollSontainer}>
      <ScreenContent style={styles.contentContainer}>
        <HomeSearch />
        <HomeCategoriesBar categories={CATEGORIES} />
        <HomeInterestingPlaces paces={PLACES} />
      </ScreenContent>
    </ScrollView>
  );
};
