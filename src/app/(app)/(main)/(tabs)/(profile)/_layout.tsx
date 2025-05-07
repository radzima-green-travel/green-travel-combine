import {useTranslation} from 'core/hooks';
import {Stack} from 'expo-router';
import {useScreenOptions} from 'core/hooks/navigation';
import {DEFAULT_TRANSITION} from 'core/constants';
import React from 'react';

export const unstable_settings = {
  initialRouteName: 'profile',
};

export default function HomeStackLayout() {
  const {t} = useTranslation('common');

  const screenOptions = useScreenOptions({
    title: t('tabs.profile'),
    animation: DEFAULT_TRANSITION,
  });

  return <Stack screenOptions={screenOptions} />;
}
