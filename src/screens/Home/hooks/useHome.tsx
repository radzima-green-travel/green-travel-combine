import { useCallback } from 'react';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  useRequestLoading,
  useColorScheme,
  useOnRequestError,
} from 'core/hooks';
import { HomePageCategory } from 'core/types';
import { selectHomePageData } from 'core/selectors';
import {
  getHomePageDataRequest,
  refreshHomePageDataRequest,
} from 'core/actions';
import { HomeScreenNavigationProps } from '../types';
import { useSnackbar } from 'atoms';
import { useHomeAnalytics } from './useHomeAnalytics';

export const useHome = () => {
  const dispatch = useDispatch();
  const { navigate } = useNavigation<HomeScreenNavigationProps>();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomePageData);
  const { show, ...snackBarProps } = useSnackbar();

  const {
    sendTrackPageLifeTimeEvent,
    sendMainScreenViewEvent,
    sendMainScreenCategoryViewEvent,
  } = useHomeAnalytics();

  useFocusEffect(sendTrackPageLifeTimeEvent);
  useFocusEffect(sendMainScreenViewEvent);

  const { loading } = useRequestLoading(getHomePageDataRequest);
  const { errorTexts } = useOnRequestError(getHomePageDataRequest, '');
  const { loading: refreshing } = useRequestLoading(refreshHomePageDataRequest);

  const getHomePageData = useCallback(() => {
    dispatch(getHomePageDataRequest());
  }, [dispatch]);

  const refreshHomePageData = useCallback(() => {
    dispatch(refreshHomePageDataRequest());
  }, [dispatch]);

  const navigateToObjectsList = useCallback(
    ({ categoryId, title }: { categoryId: string; title: string }) => {
      navigate('ObjectsList', {
        appliedFilters: {
          categories: [categoryId],
        },
        title,
      });
    },
    [navigate],
  );

  const onCategoryPress = useCallback(
    (category: HomePageCategory) => {
      navigateToObjectsList({ categoryId: category.id, title: category.name });
      sendMainScreenCategoryViewEvent(category.analyticsMetadata.name);
    },
    [navigateToObjectsList, sendMainScreenCategoryViewEvent],
  );

  useOnRequestError(refreshHomePageDataRequest, 'home', errorLabel => {
    show({
      title: errorLabel.text,
      type: 'error',
    });
  });

  return {
    loading,
    errorTexts,
    getHomePageData,
    refreshHomePageData,
    refreshing,
    onCategoryPress,
    homeData,
    theme,
    snackBarProps,
  };
};
