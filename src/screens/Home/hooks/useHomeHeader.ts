import { useNavigation } from '@react-navigation/native';
import {
  getAnalyticsNavigationScreenName,
  getPartOfTheDay,
} from 'core/helpers';
import { useTranslation } from 'core/hooks';
import type { HomeScreenNavigationProps } from '../types';

export const useHomeHeader = () => {
  const navigation = useNavigation<HomeScreenNavigationProps>();
  const { t } = useTranslation('home');
  const partOfTheDay = getPartOfTheDay();

  const openSearch = () => {
    navigation.navigate('Search');

    return false;
  };

  const openFilters = () => {
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

        return { redirectHandled: true };
      },
    });
  };

  return {
    title: t(`greeting.${partOfTheDay}`),
    openSearch,
    openFilters,
  };
};
