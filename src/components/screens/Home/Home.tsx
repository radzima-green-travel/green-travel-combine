import React, {useEffect} from 'react';
import {ScreenContent} from 'atoms';
import {HomeSectionBar} from 'molecules';
import {ScrollView} from 'react-native';

import {CATEGORIES, PLACES} from './mock';
import {styles} from './styles';
import {getObjects} from 'api/native';

export const Home = () => {
  useEffect(() => {
    getObjects().then(console.log);
  }, []);
  return (
    <ScrollView
      style={styles.scrollSontainer}
      keyboardShouldPersistTaps="handled">
      <ScreenContent style={styles.contentContainer}>
        {CATEGORIES.map(({title}) => (
          <HomeSectionBar title={title} content={PLACES} />
        ))}
      </ScreenContent>
    </ScrollView>
  );
};
