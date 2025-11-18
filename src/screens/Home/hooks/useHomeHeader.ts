import {useNavigation} from '@react-navigation/native';
import {getAnalyticsNavigationScreenName, getPartOfTheDay} from 'core/helpers';
import {useTranslation} from 'core/hooks';
import {useCallback} from 'react';
import type {HomeScreenNavigationProps} from '../types';

export const useHomeHeader = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const {t} = useTranslation('home');
  const partOfTheDay = getPartOfTheDay();

  const openSearch = useCallback(() => {
    navigation.navigate('Search');

    return false;
  }, [navigation]);

  const openFilters = useCallback(() => {
    navigation.navigate('Filter', {
      initialFilters: undefined,
      initialQuery: '',
      searchOptions: undefined,
      analytics: {
        fromScreenName: getAnalyticsNavigationScreenName(),
      },
      onApply: appliedFilters => {
        navigation.navigate('Search', {
          appliedFilters,
        });

        return {redirectHandled: true};
      },
    });
  }, [navigation]);

  return {
    title: t(`greeting.${partOfTheDay}`),
    openSearch,
    openFilters,
  };
};
