import React, {useEffect} from 'react';
import {ScreenContent} from 'atoms';
import {HomeCategoriesBar, HomeSearch, HomeInterestingPlaces} from 'molecules';
import {ScrollView} from 'react-native';

import {CATEGORIES, PLACES} from './mock';
import {styles} from './styles';
import {objectsApiService} from 'services/ObjectsApiService';

export const Home = () => {
  useEffect(() => {
    objectsApiService.getObject().then(console.log);
  }, []);
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
