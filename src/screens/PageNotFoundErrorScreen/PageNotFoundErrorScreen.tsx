import React, {useCallback} from 'react';

import {ErrorView} from 'molecules';

import {useTranslation} from 'react-i18next';
import {useRouter} from 'expo-router';

export const PageNotFoundErrorScreen = () => {
  const {t} = useTranslation('notFoundPage');
  const router = useRouter();

  const navigateToMainPage = useCallback(() => {
    router.navigate('/(home)');
  }, [router]);

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
