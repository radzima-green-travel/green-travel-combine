import {useCallback} from 'react';

import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useRequestLoading,
  useHomeAnalytics,
  useColorScheme,
  useOnRequestError,
} from 'core/hooks';
import {CardItem} from 'core/types';
import {selectHomePageData} from 'core/selectors';
import {getAnalyticsNavigationScreenName} from 'core/helpers';
import {getHomePageDataRequest, refreshHomePageDataRequest} from 'core/actions';
import {HomeScreenNavigationProps} from '../types';
import {useSnackbar} from 'atoms';

export const useHome = () => {
  const dispatch = useDispatch();
  const {navigate} = useNavigation<HomeScreenNavigationProps>();
  const theme = useColorScheme();
  const homeData = useSelector(selectHomePageData);
  const {show, ...snackBarProps} = useSnackbar();

  const {
    listRef,
    sendSelectCardEvent,
    sendSelectAllEvent,
    sendSaveCardEvent,
    sendUnsaveCardEvent,
  } = useHomeAnalytics();

  const {loading} = useRequestLoading(getHomePageDataRequest);
  const {errorTexts} = useOnRequestError(getHomePageDataRequest, '');
  const {loading: refreshing} = useRequestLoading(refreshHomePageDataRequest);

  const getHomePageData = useCallback(() => {
    dispatch(getHomePageDataRequest());
  }, [dispatch]);

  const refreshHomePageData = useCallback(() => {
    dispatch(refreshHomePageDataRequest());
  }, [dispatch]);

  const navigateToObjectsList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('ObjectsList', {categoryId, title});
    },
    [navigate],
  );

  const onCategoryPress = useCallback(
    (category: CardItem, parentCategoryName: string) => {
      navigateToObjectsList({categoryId: category.id, title: category.name});
      sendSelectCardEvent(category.name, parentCategoryName);
    },
    [navigateToObjectsList, sendSelectCardEvent],
  );

  const onAllObjectsPress = useCallback(
    (data: {categoryId: string; title: string}) => {
      sendSelectAllEvent(data.title);
      navigateToObjectsList(data);
    },
    [navigateToObjectsList, sendSelectAllEvent],
  );

  const navigateToCategoriesList = useCallback(
    ({categoryId, title}: {categoryId: string; title: string}) => {
      navigate('CategoriesList', {categoryId, title});
      sendSelectAllEvent(title);
    },
    [navigate, sendSelectAllEvent],
  );

  const navigateToObjectDetails = useCallback(
    ({id, name, analyticsMetadata}: CardItem) => {
      navigate('ObjectDetails', {
        objectId: id,

        analytics: {
          fromScreenName: getAnalyticsNavigationScreenName(),
        },
      });
      sendSelectCardEvent(name, analyticsMetadata.categoryName);
    },
    [navigate, sendSelectCardEvent],
  );

  const sendIsFavoriteChangedEvent = useCallback(
    ({
      object: {name, analyticsMetadata},
      nextIsFavorite,
    }: {
      object: CardItem;
      nextIsFavorite: boolean;
    }) => {
      if (nextIsFavorite) {
        sendSaveCardEvent(name, analyticsMetadata.categoryName);
      } else {
        sendUnsaveCardEvent(name, analyticsMetadata.categoryName);
      }
    },
    [sendSaveCardEvent, sendUnsaveCardEvent],
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
    listRef,
    getHomePageData,
    refreshHomePageData,
    refreshing,
    navigateToObjectDetails,
    onCategoryPress,
    onAllObjectsPress,
    navigateToCategoriesList,
    sendIsFavoriteChangedEvent,
    homeData,
    theme,
    snackBarProps,
  };
};
