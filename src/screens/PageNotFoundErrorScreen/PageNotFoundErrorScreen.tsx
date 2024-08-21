import React, {useCallback} from 'react';

import {ErrorView} from 'molecules';

import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {PageNotFoundErrorScreenNavigationProps} from './types';

export const PageNotFoundErrorScreen = () => {
  const {t} = useTranslation('notFoundPage');
  const navigation = useNavigation<PageNotFoundErrorScreenNavigationProps>();

  const navigateToMainPage = useCallback(() => {
    navigation.navigate('TabNavigator', {
      screen: 'HomeNavigator',
      params: {
        screen: 'Home',
      },
    });
  }, [navigation]);

  return (
    <ErrorView
      testID="errorView"
      onButtonPress={navigateToMainPage}
      buttonText={t('buttonText')}
      error={{
        text: t('text'),
        title: t('title'),
      }}
    />
  );
};
