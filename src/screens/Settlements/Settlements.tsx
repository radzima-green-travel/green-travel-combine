import React from 'react';
import {View} from 'react-native';
import {SuspenseView, Button, ScreenContent} from 'atoms';
import {useThemeStyles, useTranslation} from 'core/hooks';
import {TestIDs} from 'core/types';
import {screenOptions} from './screenOptions';
import {themeStyles} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {SearchBar} from './components';

export const Settlements = () => {
  const styles = useThemeStyles(themeStyles);
  const {t} = useTranslation('filters');

  return (
    <View style={styles.container}>
      <SuspenseView>
        <ScreenContent>
          <SearchBar onChange={() => {}} value="" />
          <ScrollView></ScrollView>
          <Button
            text={t('settlements.apply')}
            textStyle={styles.button}
            testID={TestIDs.ApplyButton}
          />
        </ScreenContent>
      </SuspenseView>
    </View>
  );
};

Settlements.screenOptions = screenOptions;
